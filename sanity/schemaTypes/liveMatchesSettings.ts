import { defineField, defineType } from "sanity";

export const liveMatchesSettingsType = defineType({
  name: "liveMatchesSettings",
  title: "Live Matches & Replays Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Live Matches & Replays Settings",
      readOnly: true,
      description: "This is a singleton document - only one should exist",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "LIVE MATCHES & REPLAYS",
      validation: (Rule) => Rule.required(),
      description: "The main heading for this section",
    }),
    defineField({
      name: "sectionSubtext",
      title: "Section Subtext",
      type: "string",
      initialValue:
        "Tune in for live action or revisit your favorite goals and celebrations.",
      validation: (Rule) => Rule.required(),
      description: "Description text below the heading",
    }),
    defineField({
      name: "videoThumbnail",
      title: "Video Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Thumbnail image for the video player",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube or external video URL for live/replay matches",
    }),
    defineField({
      name: "isLive",
      title: "Show Live Indicator",
      type: "boolean",
      initialValue: false,
      description: "Display 'LIVE' badge on the video thumbnail",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Live Matches & Replays Settings",
      };
    },
  },
});
