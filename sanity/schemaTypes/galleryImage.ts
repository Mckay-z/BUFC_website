import { defineField, defineType } from "sanity";

interface GalleryImageDocument {
  isFeatured?: boolean;
  featuredPriority?: number;
}

export const galleryImageType = defineType({
  name: "galleryImage",
  title: "Gallery Images",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Image Title/Caption",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "A descriptive title for this image",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "altText",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for accessibility (SEO)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "uploadDate",
      title: "Upload/Event Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      description: "Date this photo was taken or posted",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Match Day", value: "match-day" },
          { title: "Team Photos", value: "team-photos" },
          { title: "Trophy Moments", value: "trophy-moments" },
          { title: "Our Fans", value: "our-fans" },
          { title: "Training Session", value: "training-session" },
          { title: "Behind the Scenes", value: "behind-the-scenes" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Image",
      type: "boolean",
      initialValue: false,
      description:
        "⭐ Mark as featured to show in the hero section of Gallery page",
    }),
    defineField({
      name: "featuredPriority",
      title: "Featured Priority (1-7)",
      type: "number",
      description:
        "Priority for featured images (1 = center big image, 2-7 = side images). Only applies if marked as featured.",
      validation: (Rule) =>
        Rule.custom((priority, context) => {
          const isFeatured = (context.document as GalleryImageDocument)
            ?.isFeatured;

          if (!isFeatured && priority) {
            return "Priority only applies to featured images";
          }

          if (isFeatured && priority) {
            if (priority < 1 || priority > 7) {
              return "Priority must be between 1 and 7";
            }
          }

          return true;
        }),
      hidden: ({ document }) => !document?.isFeatured,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      category: "category",
      isFeatured: "isFeatured",
      priority: "featuredPriority",
      date: "uploadDate",
    },
    prepare(selection) {
      const { title, media, category, isFeatured, priority, date } = selection;
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "";

      let subtitle = category || "Uncategorized";
      if (isFeatured) {
        subtitle = `⭐ Featured${priority ? ` (Priority ${priority})` : ""} • ${subtitle}`;
      }

      return {
        title: title,
        subtitle: `${subtitle} • ${formattedDate}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Upload Date, Newest First",
      name: "uploadDateDesc",
      by: [{ field: "uploadDate", direction: "desc" }],
    },
    {
      title: "Featured Priority",
      name: "featuredPriority",
      by: [
        { field: "isFeatured", direction: "desc" },
        { field: "featuredPriority", direction: "asc" },
      ],
    },
  ],
});
