import { defineType } from "sanity";

export const matchFixtureType = defineType({
  name: "matchFixture",
  type: "document",
  title: "Match/Fixture",
  fields: [
    {
      name: "competition",
      type: "string",
      title: "Competition",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "matchday",
      type: "string",
      title: "Matchday",
    },
    {
      name: "homeTeam",
      type: "string",
      title: "Home Team",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "awayTeam",
      type: "string",
      title: "Away Team",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "matchDate",
      type: "datetime",
      title: "Match Date & Time",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "venue",
      type: "string",
      title: "Venue",
    },
    {
      name: "status",
      type: "string",
      title: "Match Status",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Live", value: "live" },
          { title: "Finished", value: "finished" },
          { title: "Postponed", value: "postponed" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      initialValue: "upcoming",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "homeScore",
      type: "number",
      title: "Home Score",
      hidden: ({ parent }) => parent?.status === "upcoming",
    },
    {
      name: "awayScore",
      type: "number",
      title: "Away Score",
      hidden: ({ parent }) => parent?.status === "upcoming",
    },
    {
      name: "scorers",
      type: "array",
      title: "Goal Scorers",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "player",
              type: "string",
              title: "Player Name",
            },
            {
              name: "minute",
              type: "string",
              title: "Minute",
            },
            {
              name: "team",
              type: "string",
              title: "Team",
              options: {
                list: [
                  { title: "Home", value: "home" },
                  { title: "Away", value: "away" },
                ],
              },
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.status === "upcoming",
    },
    {
      name: "ticketUrl",
      type: "url",
      title: "Ticket Purchase URL",
    },
    {
      name: "highlightVideo",
      type: "reference",
      title: "Highlight Video",
      to: [{ type: "matchHighlight" }],
      hidden: ({ parent }) => parent?.status === "upcoming",
    },
  ],
  preview: {
    select: {
      homeTeam: "homeTeam",
      awayTeam: "awayTeam",
      matchDate: "matchDate",
      status: "status",
    },
    prepare({ homeTeam, awayTeam, matchDate, status }) {
      return {
        title: `${homeTeam} vs ${awayTeam}`,
        subtitle: `${new Date(matchDate).toLocaleDateString()} - ${status}`,
      };
    },
  },
});
