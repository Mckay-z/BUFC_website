import { defineType } from "sanity";

export const historyType = defineType({
  name: "history",
  type: "document",
  title: "History Timeline",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Era Title",
      description:
        "e.g., 'Club Foundation Era', 'Glory Years', 'International Recognition'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startYear",
      type: "number",
      title: "Start Year",
      description: "The year this era began (e.g., 1966)",
      validation: (Rule) => Rule.required().min(1900).max(2100),
    },
    {
      name: "endYear",
      type: "number",
      title: "End Year",
      description:
        "The year this era ended (e.g., 2006). Use current year for ongoing eras.",
      validation: (Rule) =>
        Rule.required()
          .min(1900)
          .max(2100)
          .custom((endYear, context) => {
            const { parent } = context;
            const startYear = (parent as { startYear?: number })?.startYear;

            if (
              typeof startYear === "number" &&
              typeof endYear === "number" &&
              endYear < startYear
            ) {
              return "End year must be greater than or equal to start year";
            }

            return true;
          }),
    },
    {
      name: "description",
      type: "array",
      title: "Description",
      description:
        "Rich text content describing this era. Use formatting buttons for emphasis.",
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
        "Enter the Iconify icon name (e.g., 'mdi:trophy', 'heroicons:star'). Find icons at:https://icon-sets.iconify.design/",
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
  ],
  orderings: [
    {
      title: "Timeline (Earliest First)",
      name: "timelineAsc",
      by: [{ field: "startYear", direction: "asc" }],
    },
    {
      title: "Timeline (Latest First)",
      name: "timelineDesc",
      by: [{ field: "startYear", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      startYear: "startYear",
      endYear: "endYear",
      icon: "icon",
    },
    prepare({ title, startYear, endYear, icon }) {
      return {
        title: title,
        subtitle: `${startYear} - ${endYear} | Icon: ${icon}`,
      };
    },
  },
});
