import { defineType } from "sanity";

export const wallOfFameType = defineType({
  name: "wallOfFame",
  type: "document",
  title: "Wall of Fame",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "wallOfFameCategory" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "period",
      type: "string",
      title: "Period/Years",
      description: "In this format: '2016' 0R '2011-12' ",
    },
    {
      name: "image",
      type: "image",
      title: "Profile Image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Order within this category (lower numbers appear first)",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .custom(async (value, context) => {
            if (value === undefined) return true;

            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2023-01-01" });

            // Get the current document's ID and category
            const currentId = document?._id?.replace(/^drafts\./, "");
            const categoryId = (document?.category as { _ref?: string })?._ref;

            if (!categoryId) return true; // Skip validation if no category selected yet

            const duplicates = await client.fetch(
              `count(*[_type == "wallOfFame" && order == $order && category._ref == $categoryId && !(_id in [$id, $draftId])])`,
              {
                order: value,
                categoryId: categoryId,
                id: currentId,
                draftId: `drafts.${currentId}`,
              }
            );

            return duplicates === 0
              ? true
              : `Order ${value} is already used by another item in this category. Please choose a different order.`;
          }),
    },
  ],
  preview: {
    select: {
      title: "name",
      categoryTitle: "category.title",
      period: "period",
      media: "image",
    },
    prepare({ title, categoryTitle, period }) {
      return {
        title: title,
        subtitle: period
          ? `${categoryTitle || "No Category"} | ${period}`
          : categoryTitle || "No Category",
      };
    },
  },
});
