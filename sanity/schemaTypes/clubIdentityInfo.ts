import { defineType } from "sanity";

export const clubIdentityInfoType = defineType({
  name: "clubIdentityInfo",
  type: "document",
  title: "Club Identity Info",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description:
        "e.g., 'Who We Are', 'Our Foundation', 'The Hunters Mentality'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtext",
      type: "array",
      title: "Subtext",
      description:
        "Rich text content. Use the 'Highlight' button to style specific text with primary color.",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Medium", value: "medium" },
              { title: "Emphasis", value: "em" },
              {
                title: "Highlight (Primary Color)",
                value: "highlight",
              },
            ],
            annotations: [],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      type: "string",
      title: "Icon Name",
      description:
        "Enter the Iconify icon name (e.g., 'mdi:shield-outline', 'heroicons:star'). Find icons at:",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "iconifyUrl",
      type: "url",
      title: "Iconify Icons Website",
      description: "Quick access link to find icons",
      initialValue: "https://icon-sets.iconify.design/",
      readOnly: true,
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      description:
        "Order in which this item should appear (lower numbers appear first)",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .custom(async (value, context) => {
            if (value === undefined || value === null) return true;

            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2023-01-01" });

            // Get the current document ID without draft prefix
            const currentId = document?._id?.replace(/^drafts\./, "");

            // Check if another document has the same order value
            // Exclude both the published and draft versions of current document
            const existingDoc = await client.fetch(
              `*[_type == "clubIdentityInfo" && order == $order && !(_id in [$id, $draftId])][0]`,
              {
                order: value,
                id: currentId,
                draftId: `drafts.${currentId}`,
              }
            );

            if (existingDoc) {
              return `Order ${value} is already used by "${existingDoc.title}". Please choose a different order number.`;
            }

            return true;
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
      icon: "icon",
    },
    prepare({ title, order, icon }) {
      return {
        title: title,
        subtitle: `Order: ${order} | Icon: ${icon}`,
      };
    },
  },
});
