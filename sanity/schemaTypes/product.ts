import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Store Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "otherImages",
      title: "Other Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "price",
      title: "Price (GH₵)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Jerseys & Kits", value: "jerseys" },
          { title: "Lifestyle & Casual", value: "lifestyle" },
          { title: "Accessories", value: "accessories" },
        ],
      },
    }),
    defineField({
      name: "productType",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Home Jersey", value: "home-jersey" },
          { title: "Away Jersey", value: "away-jersey" },
          { title: "Training Kit", value: "training-kit" },
          { title: "Other", value: "other" },
        ],
      },
      description:
        "Specify if this is a home jersey, away jersey, or training kit for homepage display",
      hidden: ({ document }) => document?.category !== "jerseys",
    }),
    defineField({
      name: "displayTitle",
      title: "Display Title (for cards)",
      type: "string",
      description:
        "Short title shown on product cards (e.g., 'Home Jersey'). If empty, uses full product name.",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["S", "M", "L", "XL", "2XL"],
      },
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
