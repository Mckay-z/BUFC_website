import { defineField, defineType } from "sanity";

export const newsletterSettingsType = defineType({
  name: "newsletterSettings",
  title: "Newsletter Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Newsletter Settings",
      readOnly: true,
      description: "This is a singleton document - only one should exist",
    }),
    defineField({
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
      initialValue: "Never Miss A Moment",
      validation: (Rule) => Rule.required(),
      description: "Main heading for newsletter section",
    }),
    defineField({
      name: "sectionSubtext",
      title: "Section Subtext",
      type: "string",
      initialValue:
        "Get match updates, news, and exclusive offers delivered to your inbox.",
      validation: (Rule) => Rule.required(),
      description: "Description text for newsletter signup",
    }),
    defineField({
      name: "inputPlaceholder",
      title: "Email Input Placeholder",
      type: "string",
      initialValue: "Enter your email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "buttonText",
      title: "Subscribe Button Text",
      type: "string",
      initialValue: "Subscribe",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Newsletter Settings",
      };
    },
  },
});
