import { defineField, defineType } from "sanity";

export const communityPageSettingsType = defineType({
    name: "communityPageSettings",
    title: "Community Page Settings",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Settings Title",
            type: "string",
            initialValue: "Community Page Settings",
            readOnly: true,
            description: "This is a singleton document - only one should exist",
        }),
        // Hero Section
        defineField({
            name: "heroTitle",
            title: "Hero Title",
            type: "string",
            initialValue: "Join Our Community",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroSubtitle",
            title: "Hero Subtitle",
            type: "string",
            initialValue: "Together we can achieve more",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroImage",
            title: "Hero Background Image",
            type: "image",
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "heroVideoUrl",
            title: "Hero Video URL (Optional)",
            type: "url",
        }),
        defineField({
            name: "joinButtonText",
            title: "Join Button Text",
            type: "string",
            initialValue: "Join Community",
        }),
        defineField({
            name: "signInButtonText",
            title: "Sign In Button Text",
            type: "string",
            initialValue: "Sign In",
        }),

        // Stats Section
        defineField({
            name: "statsTitle",
            title: "Stats Section Title",
            type: "string",
            initialValue: "Our Impact",
        }),
        defineField({
            name: "statsSubtext",
            title: "Stats Section Subtext",
            type: "string",
        }),

        // Featured Projects
        defineField({
            name: "featuredProjectsTitle",
            title: "Featured Projects Title",
            type: "string",
            initialValue: "Featured Projects",
        }),
        defineField({
            name: "featuredProjectsSubtext",
            title: "Featured Projects Subtext",
            type: "string",
        }),

        // Teaser / Activity Section
        defineField({
            name: "activityTeaserTitle",
            title: "Activity Teaser Title",
            type: "string",
            initialValue: "Buzz in the Community",
        }),
        defineField({
            name: "activityTeaserSubtext",
            title: "Activity Teaser Subtext",
            type: "string",
        }),

        // Benefits Section
        defineField({
            name: "benefitsTitle",
            title: "Benefits Section Title",
            type: "string",
            initialValue: "Why Join Us?",
        }),
        defineField({
            name: "benefitsSubtext",
            title: "Benefits Section Subtext",
            type: "string",
        }),

        // CTA Banner
        defineField({
            name: "ctaTitle",
            title: "CTA Banner Title",
            type: "string",
            initialValue: "Ready to make a difference?",
        }),
        defineField({
            name: "ctaSubtext",
            title: "CTA Banner Subtext",
            type: "string",
        }),
        defineField({
            name: "ctaButtonText",
            title: "CTA Button Text",
            type: "string",
            initialValue: "Get Involved Now",
        }),

        // Projects Page Specific
        defineField({
            name: "projectsPageTitle",
            title: "Projects Page Title",
            type: "string",
            initialValue: "Community Projects",
        }),
        defineField({
            name: "projectsPageSubtitle",
            title: "Projects Page Subtitle",
            type: "string",
            initialValue: "Explore our ongoing and completed initiatives driving positive change.",
        }),
        defineField({
            name: "projectsPageImage",
            title: "Projects Page Banner Image",
            type: "image",
            options: { hotspot: true },
        }),

        // Statistics
        defineField({
            name: "statistics",
            title: "Statistics",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "label", type: "string", title: "Label" },
                        { name: "value", type: "string", title: "Value" },
                    ],
                },
            ],
        }),

        // Hunters Hub Details
        defineField({
            name: "huntersHub",
            title: "Hunters Hub Details",
            type: "object",
            fields: [
                { name: "title", type: "string", title: "Title", initialValue: "Hunters Hub" },
                { name: "description", type: "string", title: "Description" },
                { name: "buttonText", type: "string", title: "Button Text", initialValue: "Create Free Account" },
                { name: "image", type: "image", title: "Card Header Image" },
            ],
        }),
    ],
    preview: {
        select: {
            title: "title",
        },
    },
});
