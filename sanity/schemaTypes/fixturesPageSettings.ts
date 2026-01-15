import { defineType } from "sanity";

export const fixturesPageSettingsType = defineType({
  name: "fixturesPageSettings",
  type: "document",
  title: "Fixtures Page Settings",
  fields: [
    {
      name: "fixturesPageTitle",
      type: "string",
      title: "Fixtures Page Title",
      initialValue: "Fixtures",
    },
    {
      name: "fixturesPageBannerImage",
      type: "image",
      title: "Fixtures Page Banner Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "upcomingFixturesTitle",
      type: "string",
      title: "Upcoming Fixtures Section Title",
      initialValue: "What’s ahead",
    },
    {
      name: "upcomingFixturesSubtext",
      type: "string",
      title: "Upcoming Fixtures Section Subtext",
      initialValue: "Mark your calendar for these upcoming clashes",
    },
    {
      name: "resultsTitle",
      type: "string",
      title: "Results Section Title",
      initialValue: "RESULTS",
    },
    {
      name: "resultsSubtext",
      type: "string",
      title: "Results Section Subtext",
      initialValue: "Track our hunters' journey through the season",
    },
    {
      name: "fixturesViewMoreText",
      type: "string",
      title: "Fixtures View More Text",
      initialValue: "View More",
    },
    {
      name: "watchLiveCardText",
      type: "string",
      title: "Watch Live Card Text",
      initialValue:
        "Stream live matches or watch highlights from previous games",
    },
    {
      name: "watchLiveCtaText",
      type: "string",
      title: "Watch Live CTA Text",
      initialValue: "Watch Live",
    },
    {
      name: "highlightsCtaText",
      type: "string",
      title: "Highlights CTA Text",
      initialValue: "View Highlights",
    },    
  ],
});
