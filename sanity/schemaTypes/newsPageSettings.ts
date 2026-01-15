import { defineType } from "sanity";

export const newsPageSettingsType = defineType({
  name: "newsPageSettings",
  type: "document",
  title: "News Page Settings",
  fields: [
    {
      name: "newsPageBannerImage",
      type: "image",
      title: "News Page Banner Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Hero banner image at the top of the news page",
    },
    {
      name: "featuredNewsSectionTitle",
      title: "Featured News Section Title",
      type: "string",
      initialValue: "Featured News",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "featuredNewsSectionSubtext",
      title: "Featured News Section Subtext",
      type: "string",
      initialValue:
        "Find the most important and timely news about Bechem United FC",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "latestUpdatesSectionTitle",
      title: "Latest Updates Section Title",
      type: "string",
      initialValue: "Latest Updates",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "latestUpdatesSectionSubtext",
      title: "Latest Updates Section Subtext",
      type: "string",
      initialValue:
        "Catch up on recent news and developments from around the club",
      validation: (Rule) => Rule.required(),
    },
  ],
});
