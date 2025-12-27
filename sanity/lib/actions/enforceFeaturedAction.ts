import { defineAction } from "sanity";
import { client } from "../client";

export const enforceFeaturedAction = defineAction({
  name: "enforce-featured-limit",
  title: "Feature Article",
  description: "Mark as featured (max 4 allowed)",
  onHandle: async ({ draft, published, context }) => {
    const doc = draft || published;

    if (!doc || doc._type !== "news") {
      return;
    }

    // Check if trying to mark as featured
    if (draft?.isFeatured === true) {
      // Count current featured articles (excluding this one)
      const featuredCount = await client.fetch<number>(
        `count(*[_type == "news" && isFeatured == true && _id != $id])`,
        { id: doc._id }
      );

      if (featuredCount >= 4) {
        // Find the oldest featured article
        const oldestFeatured = await client.fetch<{ _id: string }>(
          `*[_type == "news" && isFeatured == true && _id != $id] | order(publishedAt asc) [0] {
            _id
          }`,
          { id: doc._id }
        );

        if (oldestFeatured) {
          // Unfeature the oldest article
          await client
            .patch(oldestFeatured._id)
            .set({ isFeatured: false })
            .commit();

          context.toast.success(
            "Oldest featured article was automatically unfeatured to maintain the limit of 4"
          );
        }
      }
    }
  },
});
