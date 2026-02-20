import { defineField, defineType } from "sanity";

export const communityProjectType = defineType({
    name: "communityProject",
    title: "Community Projects",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Project Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {
                list: [
                    { title: "Ongoing", value: "Ongoing" },
                    { title: "Completed", value: "Completed" },
                    { title: "Upcoming", value: "Upcoming" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Education", value: "Education" },
                    { title: "Health", value: "Health" },
                    { title: "Youth Development", value: "Youth Development" },
                    { title: "Infrastructure", value: "Infrastructure" },
                    { title: "Environment", value: "Environment" },
                    { title: "Other", value: "Other" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "featuredImage",
            title: "Featured Image",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "gallery",
            title: "Project Gallery",
            type: "array",
            of: [{ type: "image", options: { hotspot: true } }],
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "date",
        }),
        defineField({
            name: "endDate",
            title: "End Date",
            type: "date",
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
        }),
        defineField({
            name: "partners",
            title: "Partners",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "impactMetrics",
            title: "Impact Metrics",
            type: "object",
            fields: [
                { name: "peopleBenefited", title: "People Benefited", type: "string" },
                { name: "fundsRaised", title: "Funds Raised", type: "string" },
                { name: "volunteerHours", title: "Volunteer Hours", type: "string" },
                { name: "customMetric", title: "Custom Metric Label", type: "string" },
                { name: "customValue", title: "Custom Metric Value", type: "string" },
            ],
        }),
        defineField({
            name: "isFeatured",
            title: "Featured Project",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "title",
            media: "featuredImage",
            status: "status",
            category: "category",
        },
        prepare({ title, media, status, category }) {
            return {
                title,
                subtitle: `${status} | ${category}`,
                media,
            };
        },
    },
});
