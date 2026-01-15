import { defineType, defineField } from "sanity";

export const matchHighlightType = defineType({
  name: "matchHighlight",
  type: "document",
  title: "Match Highlight",
  fields: [
    defineField({
      name: "videoUrl",
      type: "url",
      title: "Video URL",
      description: "YouTube, Vimeo, or other video platform URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Video Title",
      description: "Auto-filled from YouTube or enter manually",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "Auto-filled from YouTube or enter manually",
    }),
    defineField({
      name: "competition",
      type: "reference",
      title: "Competition",
      to: [{ type: "competition" }],
      description: "Select the competition (GPL, FA Cup, etc.)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "matchday",
      type: "string",
      title: "Matchday",
      description: "e.g., Matchday 13, Round 16, etc.",
      placeholder: "Matchday 13",
    }),
    defineField({
      name: "videoType",
      type: "string",
      title: "Video Type",
      options: {
        list: [
          { title: "Match Highlight", value: "matchHighlight" },
          { title: "Player Highlight", value: "playerHighlight" },
        ],
      },
    }),
    defineField({
      name: "thumbnail",
      type: "image",
      title: "Thumbnail",
      description:
        "Upload a custom thumbnail (optional - YouTube thumbnail will be used if not provided)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "thumbnailUrl",
      type: "url",
      title: "YouTube Thumbnail URL",
      description:
        "Auto-filled from YouTube API - used if no custom thumbnail is uploaded",
      readOnly: true,
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      description: "Auto-filled from YouTube or enter manually",
    }),
    defineField({
      name: "channel",
      type: "string",
      title: "Channel",
      description: "Auto-filled from YouTube (e.g., @BUFC-TV)",
    }),
    defineField({
      name: "relatedPlayer",
      type: "reference",
      title: "Related Player",
      to: [{ type: "player" }],
      description: "If this is a player highlight video",
      hidden: ({ parent }) => parent?.videoType !== "playerHighlight",
    }),
  ],
  preview: {
    select: {
      title: "title",
      competition: "competition.shortName",
      media: "thumbnail",
    },
    prepare(selection) {
      const { title, competition } = selection;
      return {
        title: title,
        subtitle: competition || "No competition",
        media: selection.media,
      };
    },
  },
});
