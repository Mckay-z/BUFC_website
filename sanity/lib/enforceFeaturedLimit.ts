import { SanityClient } from "@sanity/client";

/**
 * Enforces a maximum of 4 featured news articles.
 * When a new article is marked as featured and there are already 4,
 * the oldest featured article will be unfeatured.
 */
export async function enforceFeaturedLimit(
  client: SanityClient,
  currentDocId: string
) {
  try {
    // Query all featured articles, sorted by publishedAt (oldest first)
    const featuredArticles = await client.fetch<
      { _id: string; publishedAt: string }[]
    >(
      `*[_type == "news" && isFeatured == true && _id != $currentDocId] | order(publishedAt asc) {
        _id,
        publishedAt
      }`,
      { currentDocId }
    );

    // If we have 4 or more featured articles, unfeature the oldest one
    if (featuredArticles.length >= 4) {
      const oldestFeatured = featuredArticles[0];

      await client
        .patch(oldestFeatured._id)
        .set({ isFeatured: false })
        .commit();

      console.log(`Unfeatured oldest article: ${oldestFeatured._id}`);
      return { unfeatured: oldestFeatured._id };
    }

    return { unfeatured: null };
  } catch (error) {
    console.error("Error enforcing featured limit:", error);
    throw error;
  }
}
