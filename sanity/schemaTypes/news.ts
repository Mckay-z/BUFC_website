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
          { title: "Club News", value: "club-news" },
          { title: "Match Report", value: "match-report" },
          { title: "Player News", value: "player-news" },
          { title: "Transfer News", value: "transfer-news" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Article",
      type: "boolean",
      initialValue: false,
      description:
        "⭐ Only 4 articles can be featured at once. Marking this will automatically unfeature the oldest article if limit is reached.",
      validation: (Rule) =>
        Rule.custom(async (isFeatured, context) => {
          // Only validate if trying to set to true
          if (!isFeatured) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-01-01" });

          // Count current featured articles (excluding this document)
          const featuredCount = await client.fetch<number>(
            `count(*[_type == "news" && isFeatured == true && _id != $id])`,
            { id: document?._id }
          );

          if (featuredCount >= 4) {
            return "⚠️ Maximum 4 featured articles allowed. The oldest featured article will be automatically unfeatured when you publish.";
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
