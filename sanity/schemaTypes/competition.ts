import { defineType, defineField } from "sanity";

export const competitionType = defineType({
  name: "competition",
  type: "document",
  title: "Competition",
  description: "Football competitions and tournaments (GPL, FA Cup, etc.)",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Competition Name",
      description: "Full name (e.g., Ghana Premier League)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      type: "string",
      title: "Short Name",
      description: "Abbreviated name (e.g., GPL)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      type: "image",
      title: "Competition Icon/Logo",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "competitionType",
      type: "string",
      title: "Competition Type",
      options: {
        list: [
          { title: "League", value: "league" },
          { title: "Cup", value: "cup" },
          { title: "Friendly", value: "friendly" },
          { title: "Tournament", value: "tournament" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Active",
      description: "Is this competition currently active?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "shortName",
      media: "icon",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: subtitle || "No short name",
        media: selection.media,
      };
    },
  },
});
