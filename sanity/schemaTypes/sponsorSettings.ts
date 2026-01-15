import { defineField, defineType } from "sanity";

export const sponsorSettingsType = defineType({
  name: "sponsorSettings",
  title: "Sponsor Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Sponsor Settings",
      readOnly: true,
      description: "This is a singleton document - only one should exist",
    }),
    defineField({
      name: "sponsorSectionTitle",
      title: "Sponsor Section Title",
      type: "string",
      initialValue: "Proudly Partnered With Top Brands In Ghana.",
      validation: (Rule) => Rule.required(),
      description: "The main heading text for the sponsor section",
    }),
    defineField({
      name: "sponsors",
      title: "Sponsor Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Sponsor Name",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Name of the sponsor company",
            }),
            defineField({
              name: "logo",
              title: "Sponsor Logo",
              type: "image",
              validation: (Rule) => Rule.required(),
              description:
                "Upload the sponsor's logo (preferably transparent PNG / SVG)",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "website",
              title: "Website URL",
              type: "url",
              description: "Optional: Link to sponsor's website or any social media",
            }),
            defineField({
              name: "order",
              title: "Display Order",
              type: "number",
              description:
                "Order in which the logo should appear (lower numbers first). Must be unique.",
              validation: (Rule) =>
                Rule.required()
                  .integer()
                  .min(1)
                  .custom((currentOrder, context) => {
                    const sponsors = context.document?.sponsors as Array<{
                      order?: number;
                      _key?: string;
                    }>;
                    if (!sponsors || !currentOrder) return true;

                    // Get the current item's _key from the parent context
                    const parent = context.parent as { _key?: string };
                    const currentKey = parent?._key;

                    const duplicateOrder = sponsors.some(
                      (sponsor) =>
                        sponsor.order === currentOrder &&
                        sponsor._key !== currentKey
                    );

                    if (duplicateOrder) {
                      return "This order number is already used by another sponsor. Please choose a different number.";
                    }
                    return true;
                  }),
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
              order: "order",
            },
            prepare({ title, media, order }) {
              return {
                title: title || "Untitled Sponsor",
                subtitle: order ? `Order: ${order}` : "No order set",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      description: "Add sponsor logos here",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Sponsor Settings",
      };
    },
  },
});
