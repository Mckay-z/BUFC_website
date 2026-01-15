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
      name: "heroNewsBtnText",
      title: "Hero News Button Text",
      type: "string",
      initialValue: "Full Story",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsSectionTitle",
      title: "News Section Title?",
      type: "string",
      initialValue: "LATEST FROM HUNTERS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsSectionSubtext",
      title: "News Section Subtext",
      type: "string",
      initialValue:
        "Stay updated with the latest news, match reports, and announcements from Bechem United FC",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsContentTitle",
      title: "News & Updates Content Title",
      type: "string",
      initialValue: "NEWS & UPDATES",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsContentSubtext",
      title: "News & Updates Content Subtext",
      type: "text",
      rows: 5,
      initialValue:
        "Welcome to the home of Bechem United FC news. Here you'll find everything from match day coverage and player spotlights to community initiatives and youth development programs that define who we are.\n\nThe Hunters are more than a team—we're a community. Stay updated with news that matters, from the pitch to the people who make this club special.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "newsContentBtnText",
      title: "News & Updates Content Button Text",
      type: "string",
      initialValue: "Discover More",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fixtureSectionTitle",
      title: "Fixtures Section Title",
      type: "string",
      initialValue: "UPCOMING FIXTURES",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fixtureSectionSubtext",
      title: "Fixtures Section Subtext",
      type: "string",
      initialValue:
        "Don't miss a moment of the action. Check out our upcoming matches and get your tickets early.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "moreFixturesTitle",
      title: "More Fixtures Title",
      type: "string",
      initialValue: "What's Ahead",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "moreFixturesSubtext",
      title: "More Fixtures Subtext",
      type: "string",
      initialValue: "Mark your calendar for these upcoming clashes",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fixtureSectionBtnText",
      title: "Fixtures Section Button Text",
      type: "string",
      initialValue: "Full Schedule",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shopSectionTitle",
      title: "Shop Section Title",
      type: "string",
      initialValue: "OUR CLUB STORE",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shopSectionSubtext",
      title: "Shop Section Subtext",
      type: "string",
      initialValue:
        "Discover the latest official merchandise, new collections, and exclusive Bechem United FC store updates.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shopSectionBtnText",
      title: "Shop Section Button Text",
      type: "string",
      initialValue: "Visit Store",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photoHighlightsTitle",
      title: "Photo Highlights Title",
      type: "string",
      initialValue: "PHOTO HIGHLIGHTS",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photoHighlightsSubtext",
      title: "Photo Highlights Subtext",
      type: "string",
      initialValue:
        "Relive the best moments from recent matches, training sessions, and club events.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photoHighlightsBtnText",
      title: "Photo Highlights Button Text",
      type: "string",
      initialValue: "Explore Gallery",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
