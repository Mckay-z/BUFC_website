/**
 * YouTube API Helper Functions
 * Extracts video data from YouTube using YouTube Data API v3
 */

// Extract YouTube video ID from various URL formats
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    // Standard youtube.com URLs
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // Shortened youtu.be URLs
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // Embedded URLs
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // URLs with additional parameters
    /(?:youtube\.com\/watch\?.*v=)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// YouTube API Response Types
interface YouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  channelTitle: string;
  tags?: string[];
  categoryId: string;
}

interface YouTubeVideoItem {
  kind: string;
  etag: string;
  id: string;
  snippet: YouTubeVideoSnippet;
}

interface YouTubeApiResponse {
  kind: string;
  etag: string;
  items: YouTubeVideoItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface YouTubeVideoData {
  title: string;
  description: string;
  publishedAt: string;
  channel: string;
  thumbnailUrl: string;
  thumbnailHighResUrl?: string;
}

// Fetch video data from YouTube API
export async function fetchYouTubeVideoData(
  videoId: string,
  apiKey: string
): Promise<YouTubeVideoData> {
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `YouTube API Error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data: YouTubeApiResponse = await response.json();

    if (!data.items || data.items.length === 0) {
      throw new Error("Video not found or is private/deleted");
    }

    const video = data.items[0];
    const snippet = video.snippet;

    return {
      title: snippet.title,
      description: snippet.description,
      publishedAt: snippet.publishedAt,
      channel: snippet.channelTitle,
      thumbnailUrl: snippet.thumbnails.high.url,
      thumbnailHighResUrl:
        snippet.thumbnails.maxres?.url || snippet.thumbnails.standard?.url,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch YouTube data: ${error.message}`);
    }
    throw new Error("Failed to fetch YouTube data: Unknown error");
  }
}

// Main function to get video data from URL
export async function getYouTubeDataFromUrl(
  url: string,
  apiKey: string
): Promise<YouTubeVideoData> {
  const videoId = extractYouTubeVideoId(url);

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  return fetchYouTubeVideoData(videoId, apiKey);
}
