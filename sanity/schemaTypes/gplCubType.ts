import { defineType, defineField } from "sanity";

export const gplClubType = defineType({
  name: "gplClub",
  title: "Ghana Premier League Clubs",
  type: "document",
  fields: [
    defineField({
      name: "clubName",
      title: "Club Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "clubLogo",
      title: "Club Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "founded",
      title: "Year Founded",
      type: "number",
    }),
    defineField({
      name: "stadium",
      title: "Home Stadium",
      type: "string",
    }),
    defineField({
      name: "isActive",
      title: "Currently in GPL",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "clubName",
      media: "clubLogo",
      isActive: "isActive",
    },
    prepare({ title, media, isActive }) {
      return {
        title: title,
        subtitle: isActive ? "Active" : "Inactive",
        media: media,
      };
    },
  },
});
