/**
 * Custom Sanity Document Action: Fetch YouTube Data
 * Adds a button to the matchHighlight document to auto-populate fields from YouTube
 */

import { DocumentActionComponent, DocumentActionsContext } from "sanity";
import { getYouTubeDataFromUrl } from "../youtube/youtubeApi";
import { YOUTUBE_API_KEY } from "../youtube/config";

interface MatchHighlightDocument {
  _id: string;
  _type: string;
  videoUrl?: string;
  title?: string;
  description?: string;
  publishedAt?: string;
  channel?: string;
}

export const fetchYouTubeDataAction = (
  context: DocumentActionsContext
): DocumentActionComponent => {
  return (props) => {
    const { type, draft, published } = props;
    const client = context.getClient({ apiVersion: "2024-01-01" });

    // Only show this action for matchHighlight documents
    if (type !== "matchHighlight") {
      return null;
    }

    return {
      label: "Fetch from YouTube",
      icon: () => "▶️",
      onHandle: async () => {
        const doc = (draft || published) as MatchHighlightDocument | undefined;

        if (!doc) {
          props.onComplete();
          return;
        }

        // Check if document has been saved
        if (!doc._id || doc._id.includes("template")) {
          alert(
            "⚠️ Please save the document first before fetching YouTube data"
          );
          props.onComplete();
          return;
        }

        const videoUrl = doc.videoUrl;

        if (!videoUrl) {
          alert("Please enter a YouTube URL first");
          props.onComplete();
          return;
        }

        // Get API key - use config file as fallback
        const apiKey =
          process.env.NEXT_PUBLIC_SANITY_STUDIO_YOUTUBE_API_KEY ||
          YOUTUBE_API_KEY;

        console.log("Environment check:", {
          hasApiKey: !!apiKey,
          apiKeySource: process.env.NEXT_PUBLIC_SANITY_STUDIO_YOUTUBE_API_KEY
            ? "env"
            : "config",
          envKeys: Object.keys(process.env).filter((k) =>
            k.includes("YOUTUBE")
          ),
        });

        if (!apiKey) {
          alert("YouTube API key not found in environment or config file.");
          props.onComplete();
          return;
        }

        try {
          // Fetch data from YouTube
          const youtubeData = await getYouTubeDataFromUrl(videoUrl, apiKey);

          // Patch the document using the authenticated Studio client
          await client
            .patch(doc._id)
            .set({
              title: youtubeData.title,
              description: youtubeData.description,
              publishedAt: youtubeData.publishedAt,
              channel: youtubeData.channel,
              thumbnailUrl: youtubeData.thumbnailUrl,
            })
            .commit();

          // Show success notification
          alert(
            `✅ Successfully fetched and updated!\n\nTitle: ${youtubeData.title}\nChannel: ${youtubeData.channel}\nPublished: ${new Date(youtubeData.publishedAt).toLocaleDateString()}\n\n💡 YouTube thumbnail URL saved. You can upload a custom thumbnail if you prefer.`
          );
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          alert(`❌ Error: ${errorMessage}`);
        }

        props.onComplete();
      },
    };
  };
};
