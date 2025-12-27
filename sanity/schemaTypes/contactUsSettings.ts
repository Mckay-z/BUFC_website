import { em } from "framer-motion/client";
import { defineField, defineType } from "sanity";

export const contactUsSettingsType = defineType({
  name: "contactUsSettings",
  title: "Contact Us Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Settings Title",
      type: "string",
      initialValue: "Contact Us Settings",
      readOnly: true,
      description: "This is a singleton document - only one should exist",
    }),
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      initialValue: "Contact Us",
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
    }),
    defineField({
      name: "contactFormTitle",
      title: "Contact Form Title",
      type: "string",
      initialValue: "Contact Information",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactFormSubtext",
      title: "Contact Form Subtext",
      type: "text",
      initialValue:
        "Have questions or feedback? Reach out to us to learn more about Bechem United FC, stay updated on the latest news.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number (start with number eg.050...)",
      type: "number",
      initialValue: 545464169,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailAddress",
      title: "Email Address",
      type: "string",
      initialValue: "info@bechemunited.com",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "locationAddress",
      title: "Location Address",
      type: "string",
      initialValue:
        "Bechem House, Kojo Thompson Rd P.O Box GP 21474, Adabraka, Accra Ghana",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapSectionTitle",
      title: "Map Section Title",
      type: "string",
      initialValue: "Locate Us",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapSectionSubtext",
      title: "Map Section Subtext",
      type: "string",
      initialValue:
        "Locate us easily on the map and reach out for more information about Bechem United FC",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      pageTitle: "pageTitle",
      pageBannerImage: "pageBannerImage",
      contactFormTitle: "contactFormTitle",
      contactFormSubtext: "contactFormSubtext",
      phoneNumber: "phoneNumber",
      emailAddress: "emailAddress",
      locationAddress: "locationAddress",
      mapSectionTitle: "mapSectionTitle",
      mapSectionSubtext: "mapSectionSubtext",
    },
  },
});
