"use client";

import { MatchHighlight } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import ImageFallback from "./ImageFallback";
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
    <div className="group bg-white rounded-[16px] overflow-hidden border border-neutral-3 hover:border-neutral-4 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-2">
        {thumbnailUrl ? (
          <>
            <Image
              src={thumbnailUrl}
              alt={highlight.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Minimal Overlay for depth */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

            {/* Video Type Badge (Left Top) */}
            {highlight.videoType && (
              <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-md border border-white/10">
                <span className="text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wide">
                  {highlight.videoType === "matchHighlight"
                    ? "Match"
                    : "Player"}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-4">
            <ImageFallback icon="mdi:video-outline" width="48" height="48" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        {/* Header: Competition & Matchday */}
        <div className="flex items-center justify-between mb-3">
          {/* Competition */}
          <div className="flex items-center gap-1.5 overflow-hidden">
            {highlight.competition?.icon && (
              <div className="relative w-4 h-4 shrink-0">
                <Image
                  src={urlFor(highlight.competition.icon).width(32).height(32).url()}
                  alt={highlight.competition.name || "Competition"}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-[11px] font-bold text-neutral-8 truncate uppercase tracking-tight">
              {highlight.competition?.shortName || highlight.competition?.name || "LEAGUE"}
            </span>
          </div>

          {/* Matchday */}
          {highlight.matchday && (
            <span className="text-[11px] font-medium text-prim-9 bg-prim-1 px-2 py-0.5 rounded-full shrink-0">
              {highlight.matchday}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-neutral-9 mb-3 line-clamp-2 leading-tight group-hover:text-prim-9 transition-colors">
          {highlight.title}
        </h3>

        <div className="mt-auto pt-3 flex items-end justify-between border-t border-neutral-2">
          {/* Metadata: Channel & Date */}
          <div className="flex flex-col gap-0.5">
            {highlight.channel && (
              <span className="text-[11px] font-semibold text-neutral-6 flex items-center gap-1">
                @{highlight.channel}
              </span>
            )}
            {highlight.publishedAt && (
              <span className="text-[11px] text-neutral-5">
                {formatDate(highlight.publishedAt)}
              </span>
            )}
          </div>

          {/* Watch Button */}
          {highlight.videoUrl && (
            <Link
              href={highlight.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-prim-9 text-white hover:bg-prim-8 text-xs font-bold px-5 py-1.5 rounded-full transition-colors duration-200"
            >
              Watch
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
