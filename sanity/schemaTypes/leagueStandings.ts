import { defineField, defineType } from "sanity";

export default defineType({
    name: "leagueStandings",
    title: "League Standings",
    type: "document",
    fields: [
        defineField({
            name: "rank",
            title: "Rank",
            type: "number",
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "teamName",
            title: "Team Name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "teamLogo",
            title: "Team Logo",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "played",
            title: "Played",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "won",
            title: "Won",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "drawn",
            title: "Drawn",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "lost",
            title: "Lost",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "gf",
            title: "Goals For (GF)",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "ga",
            title: "Goals Against (GA)",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "gd",
            title: "Goal Difference (GD)",
            type: "number",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "points",
            title: "Points",
            type: "number",
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: "lastFive",
            title: "Last 5 Games",
            type: "array",
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "Win (W)", value: "W" },
                    { title: "Draw (D)", value: "D" },
                    { title: "Loss (L)", value: "L" },
                ],
            },
            validation: (Rule) => Rule.max(5),
        }),
        defineField({
            name: "isHighlight",
            title: "Highlight Team (Bechem United)",
            type: "boolean",
            description: "If true, this row will be highlighted in the table.",
            initialValue: false,
        }),
    ],
    orderings: [
        {
            title: "Rank",
            name: "rankAsc",
            by: [{ field: "rank", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "teamName",
            subtitle: "rank",
            media: "teamLogo",
        },
        prepare({ title, subtitle, media }) {
            return {
                title: `${subtitle}. ${title}`,
                media,
            };
        },
    },
});
