import { defineType } from "sanity";

export const wallOfFameCategoryType = defineType({
  name: "wallOfFameCategory",
  type: "document",
  title: "Wall of Fame Category",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Category Title",
      description: "e.g., 'Club Legends', 'Great Coaches', 'Captains of Honor'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtext",
      type: "string",
      title: "Subtext",
      description: "Description of this category",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "URL-friendly identifier for this category",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      description:
        "Order in which this category should appear (lower numbers appear first)",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .custom(async (value, context) => {
            if (value === undefined) return true;

            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2023-01-01" });

            // Get the current document's ID
            const currentId = document?._id?.replace(/^drafts\./, "");

            const duplicates = await client.fetch(
              `count(*[_type == "wallOfFameCategory" && order == $order && !(_id in [$id, $draftId])])`,
              {
                order: value,
                id: currentId,
                draftId: `drafts.${currentId}`,
              }
            );

            return duplicates === 0
              ? true
              : `Order ${value} is already used by another category. Please choose a different order.`;
          }),
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
      subtext: "subtext",
    },
    prepare({ title, order, subtext }) {
      return {
        title: title,
        subtitle: `Order: ${order} | ${subtext?.substring(0, 60)}...`,
      };
    },
  },
});
