import { defineField, defineType } from "sanity";

export const pastHighlightsSettingsType = defineType({
  name: "pastHighlightsSettings",
  type: "document",
  title: "Past Highlights Settings",
  fields: [
    defineField({
      name: "pageTitle",
      type: "string",
      title: "Page Title",
      initialValue: "Past Highlights",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageBanner",
      type: "image",
      title: "Page Banner Image",
      options: {
        hotspot: true,
      },
      description: "Hero banner image at the top of the past highlights page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionTitle",
      type: "string",
      title: "Section Title",
      initialValue: "MATCH ARCHIVES",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sectionSubtitle",
      type: "string",
      title: "Section Subtitle",
      initialValue:
        "Browse team or player highlights from this season and beyond",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "viewMoreText",
      type: "string",
      title: "View More Button Text",
      initialValue: "View More",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "watchLiveCard",
      type: "object",
      title: "Watch Live Card",
      description: "Settings for the 'Watch Live' call-to-action card",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Card Title",
          initialValue: "Don't Miss The Action Live",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          type: "string",
          title: "Card Description",
          initialValue:
            "Catch every goal, save, and celebration as it happens. Watch our matches live.",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "buttonText",
          type: "string",
          title: "Button Text",
          initialValue: "Watch Live Now",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "watchLiveBtnIconName",
          title:
            "Watch Live Button Icon Name. Pick icons from Iconify (https://icon-sets.iconify.design/)",
          type: "string",
          initialValue: "fluent:live-24-regular",
          description:
            "Name of the icon to use for the watch live button (e.g., PlayIcon, LiveIcon)",
        }),
        defineField({
          name: "backgroundImage",
          type: "image",
          title: "Background Image",
          options: {
            hotspot: true,
          },
          description: "Background image for the watch live card",
        }),
      ],
    }),
  ],
});
