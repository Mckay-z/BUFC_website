import { defineField, defineType } from "sanity";

export const trophyType = defineType({
  name: "trophy",
  title: "Trophy",
  type: "document",
  fields: [
    defineField({
      name: "tag",
      title: "Tag/Label",
      type: "string",
      description: 'Short contextual label (e.g., "Super Cup Finalist")',
    }),
    defineField({
      name: "name",
      title: "Trophy Name",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., Ghana FA Cup Winners",
    }),
    defineField({
      name: "year",
      title: "Year/Season",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., 2016, 2010-11, 2017",
    }),
    defineField({
      name: "image",
      title: "Trophy Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Brief description of the achievement",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "year",
      media: "image",
      order: "year",
    },
    prepare(selection) {
      const { title, subtitle, media, order } = selection;
      return {
        title: `${title} (${order})`,
        subtitle: subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
