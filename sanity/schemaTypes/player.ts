import { defineType, defineField } from "sanity";

export const playerType = defineType({
  name: "player",
  title: "Player Information",
  type: "document",
  fields: [
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jerseyNumber",
      title: "Jersey Number",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(99),
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      options: {
        list: [
          { title: "Goalkeeper", value: "goalkeeper" },
          { title: "Defender", value: "defender" },
          { title: "Midfielder", value: "midfielder" },
          { title: "Forward", value: "forward" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "positionDetail",
      title: "Position Detail",
      type: "string",
      description: "eg., Center-Back, Left Winger",
    }),
    {
      name: "photo",
      title: "Player Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "photoBanner",
      title: "Player Photo Banner",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    defineField({
      name: "biography",
      title: "Biography",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      type: "object",
      fields: [
        { name: "facebook", title: "Facebook", type: "url" },
        { name: "instagram", title: "Instagram", type: "url" },
        { name: "twitter", title: "Twitter", type: "url" },
        { name: "tiktok", title: "TikTok", type: "url" },
      ],
    }),
    defineField({
      name: "dateOfBirth",
      title: "Date of Birth",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nationality",
      title: "Nationality",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "height",
      title: "Height (m)",
      type: "number",
    }),
    defineField({
      name: "strongFoot",
      title: "Strong Foot",
      type: "string",
      options: {
        list: ["Left", "Right", "Both"],
      },
    }),

    // COMMON STATISTICS
    defineField({
      name: "commonStatistics",
      title: "Common Statistics",
      type: "object",
      fields: [
        { name: "matchesPlayed", title: "Matches Played", type: "number" },
        { name: "goalsScored", title: "Goals Scored", type: "number" },
        { name: "assists", title: "Assists", type: "number" },
        { name: "minutesPlayed", title: "Minutes Played", type: "number" },
        {
          name: "speedIn30Meters",
          title: "Speed in 30 Meters",
          type: "number",
        },
        { name: "yellowCards", title: "Yellow Cards", type: "number" },
        { name: "redCards", title: "Red Cards", type: "number" },
      ],
    }),

    // GOALKEEPER STATISTICS
    defineField({
      name: "goalkeeperStats",
      title: "Goalkeeper Statistics",
      type: "object",
      hidden: ({ document }) => document?.position !== "goalkeeper",
      fields: [
        { name: "cleanSheets", title: "Clean Sheets", type: "number" },
        { name: "saves", title: "Saves", type: "number" },
        { name: "goalsConceded", title: "Goals Conceded", type: "number" },
      ],
    }),

    // DEFENDER STATISTICS
    defineField({
      name: "defenderStats",
      title: "Defender Statistics",
      type: "object",
      hidden: ({ document }) => document?.position !== "defender",
      fields: [
        {
          name: "tacklesAndInterceptions",
          title: "Tackles & Interceptions",
          type: "number",
        },
        { name: "blocks", title: "Blocks", type: "number" },
        { name: "clearances", title: "Clearances", type: "number" },
      ],
    }),

    // MIDFIELDER STATISTICS
    defineField({
      name: "midfielderStats",
      title: "Midfielder Statistics",
      type: "object",
      hidden: ({ document }) => document?.position !== "midfielder",
      fields: [
        { name: "shotsOnTarget", title: "Shots on Target", type: "number" },
        {
          name: "tacklesAndInterceptions",
          title: "Tackles & Interceptions",
          type: "number",
        },
        { name: "dribbles", title: "Successful Dribbles", type: "number" },
      ],
    }),

    // FORWARD STATISTICS
    defineField({
      name: "forwardStats",
      title: "Forward Statistics",
      type: "object",
      hidden: ({ document }) => document?.position !== "forward",
      fields: [
        { name: "shotsOnTarget", title: "Shots on Target", type: "number" },
        {
          name: "tacklesAndInterceptions",
          title: "Tackles & Interceptions",
          type: "number",
        },
        { name: "dribbles", title: "Successful Dribbles", type: "number" },
      ],
    }),

    // CAREER EXPERIENCE
    defineField({
      name: "careerExperience",
      title: "Professional Career",
      type: "array",
      of: [
        {
          type: "object",
          name: "careerEntry",
          title: "Career Entry",
          fields: [
            {
              name: "isGPLClub",
              title: "Is this a Ghana Premier League Club?",
              type: "boolean",
              initialValue: true,
            },
            {
              name: "gplClubReference",
              title: "Select GPL Club",
              type: "reference",
              to: [{ type: "gplClub" }],
              hidden: ({ parent }) => !parent?.isGPLClub,
            },
            {
              name: "customClubName",
              title: "Club Name",
              type: "string",
              hidden: ({ parent }) => parent?.isGPLClub !== false,
            },
            {
              name: "customClubLogo",
              title: "Upload Club Logo",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.isGPLClub !== false,
            },
            {
              name: "role",
              title: "Role/Position",
              type: "string",
              options: {
                list: [
                  { title: "Goalkeeper", value: "goalkeeper" },
                  { title: "Defender", value: "defender" },
                  { title: "Midfielder", value: "midfielder" },
                  { title: "Forward", value: "forward" },
                ],
              },
            },
            {
              name: "startYear",
              title: "Start Year",
              type: "number",
            },
            {
              name: "endYear",
              title: "End Year",
              type: "number",
            },
            {
              name: "isCurrent",
              title: "Current Club",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "achievements",
              title: "Achievements",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
          preview: {
            select: {
              isGPL: "isGPLClub",
              gplClub: "gplClubReference.clubName",
              customClub: "customClubName",
              startYear: "startYear",
              endYear: "endYear",
              isCurrent: "isCurrent",
              gplLogo: "gplClubReference.clubLogo",
              customLogo: "customClubLogo",
            },
            prepare({
              isGPL,
              gplClub,
              customClub,
              startYear,
              endYear,
              isCurrent,
              gplLogo,
              customLogo,
            }) {
              const clubName = isGPL ? gplClub : customClub;
              const yearRange = `${startYear || ""} - ${isCurrent ? "Present" : endYear || ""}`;
              return {
                title: clubName || "Unnamed Club",
                subtitle: yearRange,
                media: isGPL ? gplLogo : customLogo,
              };
            },
          },
        },
      ],
    }),
  ],
});
