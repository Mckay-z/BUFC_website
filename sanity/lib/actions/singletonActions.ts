import { DocumentActionsResolver } from "sanity";

// List of singleton document types
const SINGLETON_TYPES = [
  "homePageSettings",
  "contactUsSettings",
  "galleryPageSettings",
  "footerSettings",
  "newsletterSettings",
  "sponsorSettings",
  "liveMatchesSettings",
  "clubIdentitySettings",
  "newsPageSettings",
  "clubPageSettings",
  "fixturesPageSettings",
  "pastHighlightsSettings",
  "playersPageSettings",
  "shopPageSettings",
];

// Remove the "Delete" action for singleton documents
export const singletonActions: DocumentActionsResolver = (prev, context) => {
  const isSingleton = SINGLETON_TYPES.includes(context.schemaType);

  if (!isSingleton) {
    return prev;
  }

  // Filter out the delete action for singletons
  return prev.filter((action) => action.action !== "delete");
};
