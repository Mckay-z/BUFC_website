/**
 * YouTube Helper Functions for Frontend
 * Extract video ID and thumbnail URL from YouTube URLs
 */

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
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

/**
 * Get YouTube thumbnail URL from video URL
 * Returns maxresdefault for best quality, falls back to hqdefault
 */
export function getYouTubeThumbnail(
  url: string,
  quality:
    | "maxresdefault"
    | "hqdefault"
    | "mqdefault"
    | "sddefault" = "maxresdefault"
): string | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Get multiple thumbnail quality options for fallback
 */
export function getYouTubeThumbnailWithFallback(url: string): {
  high: string;
  medium: string;
  default: string;
} | null {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return null;

  return {
    high: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    medium: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    default: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  };
}
