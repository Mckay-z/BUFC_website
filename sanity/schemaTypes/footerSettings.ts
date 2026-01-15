import { defineType, defineField } from "sanity";

export default defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Footer Settings",
      readOnly: true,
      description: "This is a singleton document - only one should exist",
    }),
    defineField({
      name: "description",
      title: "Footer Description",
      type: "text",
      description: "Main description text that appears under the logo",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "location",
          title: "Location",
          type: "string",
        },
        {
          name: "locationUrlOnMap",
          title: "Location URL on Map",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Phone number with country code (e.g., +233 (545) 464169)",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        },
        {
          name: "twitter",
          title: "Twitter/X URL",
          type: "url",
        },
        {
          name: "youtube",
          title: "YouTube URL",
          type: "url",
        },
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        },
        {
          name: "pinterest",
          title: "Pinterest URL",
          type: "url",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
