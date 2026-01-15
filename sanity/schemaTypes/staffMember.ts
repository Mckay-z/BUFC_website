import { defineType } from "sanity";

export const staffMemberType = defineType({
  name: "staffMember",
  type: "document",
  title: "Staff Member",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Full Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      type: "string",
      title: "Role",
      options: {
        list: [
          { title: "President & Owner", value: "president" },
          { title: "CEO", value: "ceo" },
          { title: "Administrative Manager", value: "administrativeManager" },
          { title: "Head Coach", value: "headCoach" },
          { title: "Team Manager", value: "teamManager" },
          {
            title: "Public Relations Officer",
            value: "publicRelationsOfficer",
          },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "customRole",
      type: "string",
      title: "Custom Role Title",
      description: "If 'Other' is selected, specify the role here",
      hidden: ({ parent }) => parent?.role !== "other",
    },
    {
      name: "image",
      type: "image",
      title: "Profile Image",
      options: {
        hotspot: true,
      },
    },
    // {
    //   name: "bio",
    //   type: "text",
    //   title: "Biography",
    // },
    {
      name: "bio",
      type: "array",
      title: "Biography",
      description:
        "Rich text content. Use the 'Highlight' button to style specific text with primary color.",
      of: [
        {
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Medium", value: "medium" },
              { title: "Emphasis", value: "em" },
              {
                title: "Highlight (Primary Color)",
                value: "highlight",
              },
            ],
            annotations: [],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "socialMediaLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        {
          name: "linkedIn",
          title: "LinkedIn URL",
          type: "url",
        },
        {
          name: "email",
          title: "Email Address",
          type: "string",
          validation: (Rule) => Rule.email(),
        },
        {
          name: "phone",
          title: "Phone Number",
          description: "Phone number with country code (e.g., +233545464169)",
          type: "string",
        },
      ],
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      description:
        "Order in which this item should appear (lower numbers appear first)",
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .custom(async (value, context) => {
            if (value === undefined || value === null) return true;

            const { document, getClient } = context;
            const client = getClient({ apiVersion: "2023-01-01" });

            // Get the current document ID without draft prefix
            const currentId = document?._id?.replace(/^drafts\./, "");

            // Check if another document has the same order value
            // Exclude both the published and draft versions of current document
            const existingDoc = await client.fetch(
              `*[_type == "staffMember" && order == $order && !(_id in [$id, $draftId])][0]`,
              {
                order: value,
                id: currentId,
                draftId: `drafts.${currentId}`,
              }
            );

            if (existingDoc) {
              return `Order ${value} is already used by "${existingDoc.name}". Please choose a different order number.`;
            }

            return true;
          }),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ? `${order}. ` : ""}${title}`,
        subtitle,
        media,
      };
    },
  },
});
