"use client";

import { MatchHighlight } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import ImageFallback from "./ImageFallBack";
import { getYouTubeThumbnail } from "@/lib/youtubeHelpers";

interface PastHighlightCardProps {
  highlight: MatchHighlight;
}

export default function PastHighlightCard({
  highlight,
}: PastHighlightCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get thumbnail URL - priority order:
  // 1. Custom uploaded Sanity image
  // 2. YouTube thumbnail URL from API fetch
  // 3. Extract from video URL as fallback
  const getThumbnailUrl = () => {
    if (highlight.thumbnail) {
      return urlFor(highlight.thumbnail).width(600).height(340).url();
    }
    if (highlight.thumbnailUrl) {
      return highlight.thumbnailUrl;
    }
    if (highlight.videoUrl) {
      return getYouTubeThumbnail(highlight.videoUrl, "hqdefault");
    }
    return null;
  };

  const thumbnailUrl = getThumbnailUrl();

  return (
    <div className="group rounded-[20px] overflow-hidden bg-neutral-2 border border-neutral-3 hover:border-prim-3 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden">
        {thumbnailUrl ? (
          <>
            <Image
              src={thumbnailUrl}
              alt={highlight.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

            {/* Play Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-prim-3/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-prim-6 group-hover:scale-110 transition-all duration-300">
                <Icon
                  icon="ph:play-fill"
                  width="24"
                  height="24"
                  className="text-white ml-0.5"
                />
              </div>
            </div>

            {/* Video Type Badge */}
            {highlight.videoType && (
              <div className="absolute top-3 left-3 px-3 py-1.5 bg-neutral-9/80 backdrop-blur-sm rounded-full">
                <span className="text-white text-xs font-medium uppercase">
                  {highlight.videoType === "matchHighlight" &&
                    "Match Highlight"}
                  {highlight.videoType === "playerHighlight" &&
                    "Player Highlight"}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full bg-neutral-3 flex items-center justify-center">
            <ImageFallback icon="mdi:video-outline" width="64" height="64" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Competition & Matchday Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Competition Info */}
          {highlight.competition && (
            <div className="flex items-center gap-2">
              {highlight.competition.icon && (
                <div className="relative w-5 h-5 md:w-6 md:h-6 shrink-0">
                  <Image
                    src={urlFor(highlight.competition.icon)
                      .width(32)
                      .height(32)
                      .url()}
                    alt={highlight.competition.name || "Competition"}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-xs md:text-sm font-medium text-neutral-text">
                {highlight.competition.shortName || highlight.competition.name}
              </span>
            </div>
          )}

          {/* Matchday */}
          {highlight.matchday && (
            <span className="text-xs md:text-sm text-neutral-6">
              {highlight.matchday}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm md:text-base font-semibold text-neutral-text mb-2 line-clamp-2 group-hover:text-prim-3 transition-colors duration-300">
          {highlight.title}
        </h3>

        {/* Related Player Info */}
        {highlight.relatedPlayer &&
          highlight.videoType === "playerHighlight" && (
            <div className="flex items-center gap-2 mb-2">
              {highlight.relatedPlayer.photo && (
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={urlFor(highlight.relatedPlayer.photo)
                      .width(32)
                      .height(32)
                      .url()}
                    alt={highlight.relatedPlayer.fullName || "Player"}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <span className="text-xs text-neutral-6">
                #{highlight.relatedPlayer.jerseyNumber}{" "}
                {highlight.relatedPlayer.fullName}
              </span>
            </div>
          )}

        {/* Description */}
        {highlight.description && (
          <p className="text-xs md:text-sm text-neutral-6 line-clamp-2 mb-3">
            {highlight.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-3">
          {/* Date & Channel */}
          <div className="flex items-center gap-2 text-xs text-neutral-6">
            {highlight.publishedAt && (
              <span>{formatDate(highlight.publishedAt)}</span>
            )}
            {highlight.channel && highlight.publishedAt && <span>•</span>}
            {highlight.channel && (
              <span className="flex items-center gap-1">
                <Icon icon="mdi:youtube" width="14" height="14" />
                {highlight.channel}
              </span>
            )}
          </div>

          {/* Watch Link */}
          {highlight.videoUrl && (
            <Link
              href={highlight.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-prim-3 hover:text-prim-6 transition-colors duration-300"
            >
              Watch
              <Icon
                icon="material-symbols:play-arrow-rounded"
                width="18"
                height="18"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
