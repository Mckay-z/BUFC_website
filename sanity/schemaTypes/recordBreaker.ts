import { defineField, defineType } from "sanity";

export const recordBreakerType = defineType({
  name: "recordBreaker",
  title: "Record Breaker",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Record Title",
      type: "string",
      description: 'E.g., "First Premier League Goal", "Goals - Top Scorer"',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "recordType",
      title: "Record Type",
      type: "string",
      options: {
        list: [
          { title: "Individual Achievement", value: "individual" },
          { title: "Team Achievement", value: "team" },
          { title: "Season Milestone", value: "season" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "player",
      title: "Player (if individual record)",
      type: "string",
      description: "Name of the player who achieved the record",
      hidden: ({ document }) => document?.recordType !== "individual",
    }),
    defineField({
      name: "customSubtext",
      title: "Custom Subtext (if not a player)",
      type: "string",
      description: "Use for team efforts, seasons, or other contexts",
      placeholder: 'E.g., "Unbeaten Home Record (2020)", "Team Effort (2019)"',
      hidden: ({ document }) => document?.recordType === "individual",
    }),
    defineField({
      name: "year",
      title: "Year Achieved",
      type: "number",
      validation: (Rule) => Rule.required().min(1900).max(2100),
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "customSubtext",
      playerName: "player.name",
      year: "year",
    },
    prepare({ title, subtitle, playerName, year }) {
      return {
        title: title,
        subtitle: playerName
          ? `${playerName} (${year})`
          : subtitle
            ? `${subtitle} (${year})`
            : `${year}`,
      };
    },
  },
});
