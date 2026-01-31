import { defineField, defineType } from "sanity";

export const newsType = defineType({
  name: "news",
  title: "News Articles",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "authorImage",
      title: "Image of Author",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Club News", value: "Club News" },
          { title: "Player News", value: "Player News" },
          { title: "Transfer News", value: "Transfer News" },
          { title: "Match Report", value: "Match Report" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Article",
      type: "boolean",
      initialValue: false,
      description:
        "⭐ Maximum 4 featured articles allowed (1 large hero + 3 smaller cards). Unfeature an existing article before featuring a new one.",
      validation: (Rule) =>
        Rule.custom(async (isFeatured, context) => {
          // Only validate if trying to set to true
          if (!isFeatured) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-01-01" });

          // Get the base document ID (without draft prefix)
          const baseId = document?._id?.replace(/^drafts\./, "");
          const draftId = `drafts.${baseId}`;

          // Check if this document (draft or published) is already featured
          const currentDoc = await client.fetch(
            `*[_id in [$id, $draftId]][0]{isFeatured}`,
            { id: baseId, draftId },
          );

          // If already featured, allow it
          if (currentDoc?.isFeatured === true) return true;

          // Count current featured articles (excluding both draft and published versions of this document)
          const featuredCount = (await client.fetch(
            `count(*[_type == "news" && isFeatured == true && !(_id in [$id, $draftId])])`,
            { id: baseId, draftId },
          )) as number;

          if (featuredCount >= 4) {
            return "❌ Maximum 4 featured articles allowed. Please unfeature one of the existing featured articles before featuring this one.";
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      category: "category",
      isFeatured: "isFeatured",
    },
    prepare(selection) {
      const { title, media, category, isFeatured } = selection;
      return {
        title: `${isFeatured ? "⭐ " : ""}${title}`,
        subtitle: category
          ? `${category}${isFeatured ? " • Featured" : ""}`
          : isFeatured
            ? "Featured"
            : "",
        media,
      };
    },
  },
});
