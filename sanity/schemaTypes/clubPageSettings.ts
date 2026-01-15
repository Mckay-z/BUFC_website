import { defineType } from "sanity";

export const clubPageSettingsType = defineType({
  name: "clubPageSettings",
  type: "document",
  title: "Club Page Settings",
  fields: [
    {
      name: "clubNameOnBanner",
      type: "string",
      title: "Club Name on Banner",
      initialValue: "Bechem United FC",
    },
    {
      name: "clubSloganOnBanner",
      type: "string",
      title: "Club Slogan on Banner",
      initialValue: "Vision With Precision",
    },
    {
      name: "clubPageBannerImage",
      type: "image",
      title: "Club Page Banner Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Hero banner image at the top of the club page",
    },
    {
      name: "sections",
      type: "object",
      title: "Page Sections",
      fields: [
        {
          name: "clubIdentityTitle",
          type: "string",
          title: "Club Identity Section Title",
          initialValue: "CLUB IDENTITY",
        },
        {
          name: "clubIdentitySubtitle",
          type: "string",
          title: "Club Identity Section Subtitle",
          initialValue:
            "Get to know Bechem United FC - our history, values, and vision for the future",
        },
        {
          name: "pillarsTitle",
          type: "string",
          title: "Pillars Section Title",
          initialValue: "OUR PILLARS",
        },
        {
          name: "pillarsSubtitle",
          type: "string",
          title: "Pillars Section Subtitle",
          initialValue: "The foundation that drives our pursuit of excellence",
        },
        {
          name: "managementTitle",
          type: "string",
          title: "Management Section Title",
          initialValue: "THE TEAM BEHIND THE TEAM",
        },
        {
          name: "managementSubtitle",
          type: "string",
          title: "Management Section Subtitle",
          initialValue:
            "Meet the leadership preserving our legacy and building our future since 1966",
        },
        {
          name: "historyTitle",
          type: "string",
          title: "History Section Title",
          initialValue: "OUR HISTORY",
        },
        {
          name: "historySubtitle",
          type: "string",
          title: "History Section Subtitle",
          initialValue:
            "From humble beginnings to FA Cup champions - the remarkable journey of the Hunters",
        },
        {
          name: "facilitiesTitle",
          type: "string",
          title: "Facilities Section Title",
          initialValue: "OUR FACILITIES",
        },
        {
          name: "facilitiesSubtitle",
          type: "string",
          title: "Facilities Section Subtitle",
          initialValue:
            "World-class infrastructure where champions train and compete",
        },
        {
          name: "trophiesTitle",
          type: "string",
          title: "Trophy Cabinet Title",
          initialValue: "TROPHY CABINET",
        },
        {
          name: "trophiesSubtitle",
          type: "string",
          title: "Trophy Cabinet Subtitle",
          initialValue:
            "Celebrating our victories, milestones, and achievements since 1966",
        },
        {
          name: "wallOfFameTitle",
          type: "string",
          title: "Wall of Fame Title",
          initialValue: "WALL OF FAME",
        },
        {
          name: "wallOfFameSubtitle",
          type: "string",
          title: "Wall of Fame Subtitle",
          initialValue: "Our Heroes, Coaches & Captains",
        },
      ],
    },
    {
      name: "joinHuntersPack",
      type: "object",
      title: "Join The Hunters Pack Section",
      description:
        "This section appears on all club page tabs (Profile, History, Facilities, Honors)",
      fields: [
        {
          name: "title",
          type: "string",
          title: "Section Title",
          initialValue: "JOIN THE HUNTERS PACK",
        },
        {
          name: "description",
          type: "text",
          title: "Description",
          rows: 3,
          initialValue:
            "Become part of our legacy. Join The Hunters Pack and support our journey to greatness.",
        },
        {
          name: "buttonText",
          type: "string",
          title: "Button Text",
          initialValue: "BECOME A MEMBER",
        },
        {
          name: "images",
          type: "array",
          title: "Gallery Images",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "image",
                  type: "image",
                  title: "Image",
                  options: { hotspot: true },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "order",
                  type: "number",
                  title: "Display Order",
                  validation: (Rule) => Rule.required().min(1).max(4),
                  description: "Order in which this image should appear (1-4)",
                },
              ],
              preview: {
                select: {
                  media: "image",
                  order: "order",
                },
                prepare(selection) {
                  const { media, order } = selection;
                  return {
                    title: `Image ${order}`,
                    media: media,
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.max(4).required(),
          description: "Exactly 4 images for the gallery (required)",
        },
      ],
    },
  ],
});
