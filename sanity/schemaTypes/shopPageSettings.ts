import { defineType } from "sanity";

export const shopPageSettingsType = defineType({
  name: "shopPageSettings",
  type: "document",
  title: "Shop Page Settings",
  fields: [
    {
      name: "pageTitle",
      type: "string",
      title: "Page Title",
      initialValue: "Shop",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pageBanner",
      type: "image",
      title: "Page Banner Image",
      options: {
        hotspot: true,
      },
      description: "Hero banner image at the top of the shop page",
    },
    {
      name: "sectionTitle",
      type: "string",
      title: "Section Title",
      initialValue: "OUR CLUB STORE",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sectionSubtext",
      type: "string",
      title: "Section Subtext",
      initialValue:
        "Discover the latest official merchandise, new collections, and exclusive Bechem United FC store updates.",
      validation: (Rule) => Rule.required(),
    },
  ],
});
