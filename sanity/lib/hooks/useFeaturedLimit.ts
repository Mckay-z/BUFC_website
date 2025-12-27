import { useEffect } from "react";
import { useClient } from "sanity";

/**
 * Hook to enforce featured article limit in Sanity Studio
 */
export function useFeaturedLimit(documentId: string, isFeatured: boolean) {
  const client = useClient({ apiVersion: "2023-01-01" });

  useEffect(() => {
    if (!isFeatured) return;

    const enforceLimitOnPublish = async () => {
      try {
        // Count current featured articles (excluding this one)
        const featuredCount = await client.fetch<number>(
          `count(*[_type == "news" && isFeatured == true && _id != $id])`,
          { id: documentId }
        );

        if (featuredCount >= 4) {
          // Get the oldest featured article
          const oldestFeatured = await client.fetch<{
            _id: string;
            title: string;
          }>(
            `*[_type == "news" && isFeatured == true && _id != $id] | order(publishedAt asc) [0] {
              _id,
              title
            }`,
            { id: documentId }
          );

          if (oldestFeatured) {
            // Unfeature it
            await client
              .patch(oldestFeatured._id)
              .set({ isFeatured: false })
              .commit();

            console.log(`Automatically unfeatured: ${oldestFeatured.title}`);
          }
        }
      } catch (error) {
        console.error("Error enforcing featured limit:", error);
      }
    };

    enforceLimitOnPublish();
  }, [isFeatured, documentId, client]);
}
