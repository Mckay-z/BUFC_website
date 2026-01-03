import { defineField, defineType } from "sanity";

export const homePageSettingsType = defineType({
  name: "homePageSettings",
  title: "Home Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Home Page Settings",
      readOnly: true,
      description: "This is a singleton document - only one should exist",
    }),
    defineField({
      name: "newsUpdatesSectionTitle",
      title: "News & Updates Section Title",
      type: "string",
      initialValue: "NEWS & UPDATES",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsUpdatesSectionContent",
      title: "News & Updates Section Content",
      type: "text",
      rows: 5,
      initialValue:
        "Welcome to the home of Bechem United FC news. Here you'll find everything from match day coverage and player spotlights to community initiatives and youth development programs that define who we are.\n\nThe Hunters are more than a team—we're a community. Stay updated with news that matters, from the pitch to the people who make this club special.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsUpdatesSectionLinkText",
      title: "News & Updates Link Text",
      type: "string",
      initialValue: "Discover more",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsOnHomePageTitle",
      title: "What is the News On Home Page Title?",
      type: "string",
      initialValue: "LATEST FROM HUNTERS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsOnHomePageSubtext",
      title: "What is the News On Home Page Subtext?",
      type: "string",
      initialValue:
        "Stay updated with the latest news, match reports, and announcements from Bechem United FC",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shopOnHomePageTitle",
      title: "What is the Shop On Home Page Title?",
      type: "string",
      initialValue: "OUR CLUB STORE",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shopOnHomePageSubtext",
      title: "What is the Shop On Home Page Subtext?",
      type: "string",
      initialValue:
        "Discover the latest official merchandise, new collections, and exclusive Bechem United FC store updates.",
      validation: (Rule) => Rule.required(),
    }),
    
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
