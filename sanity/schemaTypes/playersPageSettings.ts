import { defineType } from "sanity";

export const playersPageSettingsType = defineType({
  name: "playersPageSettings",
  type: "document",
  title: "Players Page Settings",
  fields: [
    {
      name: "pageTitle",
      type: "string",
      title: "Page Title",
      initialValue: "Players",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pageBanner",
      type: "image",
      title: "Page Banner Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Hero banner image at the top of the players page",
    },
    {
      name: "inputPlaceholderText",
      type: "string",
      title: "Search Input Placeholder Text",
      initialValue: "Search by name or jersey number",
      validation: (Rule) => Rule.required(),
    },
  ],
});
