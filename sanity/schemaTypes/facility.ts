import { defineType } from "sanity";

export const facilityType = defineType({
  name: "facility",
  type: "document",
  title: "Facility",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Facility Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tag",
      title: "Tag",
      type: "string",
      description: "Short descriptive phrase (e.g., \"Where Champions Train\", \"Strategic Hub\", etc.)",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "image",
      type: "image",
      title: "Facility Image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "features",
      type: "object",
      title: "Basic Specifications",
      description: "Standard facility information (optional fields)",
      fields: [
        {
          name: "since",
          type: "number",
          title: "Since (Year Established)",
          description: "Year the facility was founded or established",
          validation: (Rule) => Rule.min(1900).max(2100),
        },
        {
          name: "location",
          type: "string",
          title: "Location",
          description: "Physical location of the facility",
        },
        {
          name: "capacity",
          type: "number",
          title: "Capacity",
          description: "Maximum capacity (e.g., stadium seating, training ground capacity)",
          validation: (Rule) => Rule.min(0),
        },
      ],
    },
    {
      name: "additionalSpecifications",
      type: "array",
      title: "Additional Specifications",
      description: "Add custom specifications for this facility",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Specification Title",
              validation: (Rule) => Rule.required(),
              description: "Add a title for the specification",
            },
            {
              name: "value",
              type: "string",
              title: "Value",
              validation: (Rule) => Rule.required(),
              description: "Add the corresponding value/details",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "value",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tag",
      media: "image",
    },
  },
});
