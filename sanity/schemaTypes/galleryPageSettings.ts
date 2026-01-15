import { defineField, defineType } from "sanity";

export const galleryPageSettingsType = defineType({
  name: "galleryPageSettings",
  title: "Gallery Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Gallery Page Settings",
      readOnly: true,
      description: "This is a singleton document - only one should exist",
    }),
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      initialValue: "Gallery",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pageBannerImage",
      title: "Page Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Hero banner image at the top of the gallery page",
    }),
    defineField({
      name: "featuredSectionTitle",
      title: "Featured Section Title",
      type: "string",
      initialValue: "Featured Moments",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredSectionSubtext",
      title: "Featured Section Subtext",
      type: "text",
      initialValue:
        "Our most memorable matches, celebrations, and behind-the-scenes moments",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "loadMoreButtonText",
      title: "Load More Button Text",
      type: "string",
      initialValue: "Load More Photos",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
