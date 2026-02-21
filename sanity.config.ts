// Sanity configuration file

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/studioStructure";
import { singletonActions } from "./sanity/lib/actions/singletonActions";
import { fetchYouTubeDataAction } from "./sanity/lib/actions/fetchYouTubeData";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      const singletonFiltered = singletonActions(prev, context);
      // Add YouTube fetch action for matchHighlight documents
      if (context.schemaType === "matchHighlight") {
        return [...singletonFiltered, fetchYouTubeDataAction(context)];
      }
      return singletonFiltered;
    },
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  form: {
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources;
      },
    },
  },
});
