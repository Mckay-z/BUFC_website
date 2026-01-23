"use client";

import { useState, useMemo } from "react";
import { PastHighlightsSettings, MatchHighlight } from "@/lib/types";
import PageHeader from "../layout/PageHeader";
import SectionHeader from "../layout/sectionHeader";
import PastHighlightCard from "../ui/PastHighlightCard";
import WatchLiveCard from "../ui/WatchLiveCard";
import { Icon } from "@iconify/react";
import Button from "../ui/Button";

interface PastHighlightsPageProps {
  settings: PastHighlightsSettings;
  highlights: MatchHighlight[];
}

export default function PastHighlightsPage({
  settings,
  highlights,
}: PastHighlightsPageProps) {
  const [filterType, setFilterType] = useState<"team" | "player">("team");
  const [selectedSeason, setSelectedSeason] = useState("2024/25");

  // Mock seasons for dropdown - in a real app this might come from props or API
  const seasons = ["2024/25", "2023/24"];

  const filteredHighlights = useMemo(() => {
    return highlights.filter((h) => {
      // 1. Filter by Type
      if (filterType === "team" && h.videoType === "playerHighlight")
        return false;
      if (filterType === "player" && h.videoType === "matchHighlight")
        return false;

      // 2. Filter by Season (Mock logic: Assuming all are 2024/25 for now unless publishedAt is old)
      // proper implementation would check h.season or date range
      return true;
    });
  }, [highlights, filterType, selectedSeason]);

  // Group by Month
  const groupedHighlights = useMemo(() => {
    const groups: Record<string, MatchHighlight[]> = {};

    filteredHighlights.forEach((h) => {
      if (!h.publishedAt) return;
      const date = new Date(h.publishedAt);
      const monthYear = date
        .toLocaleString("en-US", { month: "long" })
        .toUpperCase(); // e.g. "DECEMBER"

      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(h);
    });

    // Sort months (current implementation relies on order of appearance or we can sort explicitly if needed)
    // For now, assuming highlights are already sorted by date desc from the parent/query
    return groups;
  }, [filteredHighlights]);

  const monthKeys = Object.keys(groupedHighlights);

  return (
    <main className="bg-[#F1EFF6]">
      {/* Page Header */}
      <PageHeader
        title={settings.pageTitle}
        backgroundImage={settings.pageBanner}
      />

      {/* Match Archives Section */}
      <section className="container-wide py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          {/* Title & Subtext */}
          <div>
            <span className="block text-sm font-bold tracking-wider text-neutral-8 uppercase mb-2">
              MATCH ARCHIVES
            </span>
            <h2 className="text-neutral-6 text-base md:text-lg max-w-xl">
              Browse team or player highlights from this season and beyond.
            </h2>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            {/* Team/Player Toggle */}
            <div className="bg-white p-1 rounded-full border border-neutral-3 flex items-center">
              <button
                onClick={() => setFilterType("team")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filterType === "team"
                  ? "bg-prim-9 text-white shadow-md"
                  : "text-neutral-6 hover:text-prim-9"
                  }`}
              >
                Team
              </button>
              <button
                onClick={() => setFilterType("player")}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${filterType === "player"
                  ? "bg-prim-9 text-white shadow-md"
                  : "text-neutral-6 hover:text-prim-9"
                  }`}
              >
                Player
              </button>
            </div>

            {/* Season Dropdown */}
            <div className="bg-white border border-neutral-3 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-prim-3 transition-colors">
              <span className="text-sm font-semibold text-neutral-8">
                {selectedSeason}
              </span>
              <Icon icon="ph:caret-down-bold" className="text-neutral-8" />
            </div>
          </div>
        </div>

        {/* Grouped Highlights */}
        <div className="bg-white rounded-[40px] p-6 md:p-8 lg:p-10 shadow-sm">
          <div className="flex flex-col gap-12">
            {monthKeys.length > 0 ? (
              monthKeys.map((month) => (
                <div key={month}>
                  {/* Month Label */}
                  <div className="relative mb-6">
                    <div className="inline-block bg-prim-9 text-white px-6 py-2 text-sm font-bold uppercase tracking-wider -skew-x-12 transform shadow-md">
                      <span className="skew-x-12 inline-block">{month}</span>
                    </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                    {groupedHighlights[month].map((highlight) => (
                      <PastHighlightCard
                        key={highlight._id}
                        highlight={highlight}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 border border-neutral-2 border-dashed rounded-2xl">
                <Icon
                  icon="ph:video-camera-slash"
                  className="text-neutral-4 w-12 h-12 mb-3"
                />
                <p className="text-neutral-5 text-lg font-medium">
                  No highlights found for this selection.
                </p>
              </div>
            )}
          </div>

          {/* View More (Optional placeholder if pagination is needed later) */}
          <div className="flex justify-end mt-8 border-t border-neutral-2 pt-6">
            <button className="flex items-center gap-2 text-base font-medium text-neutral-8 hover:text-prim-9 transition-colors group cursor-pointer">
              View More
              <Icon
                icon="ph:arrow-circle-right-light"
                width="24"
                height="24"
                className="text-neutral-8 group-hover:text-prim-9 transition-colors"
              />
            </button>
          </div>
        </div>
      </section>

      {/* Watch Live Card Section */}
      {settings.watchLiveCard && (
        <section className="container-wide pb-16 md:pb-20 lg:pb-28">
          <WatchLiveCard
            title={settings.watchLiveCard.title}
            description={settings.watchLiveCard.description}
            buttonText={settings.watchLiveCard.buttonText}
            backgroundImage={settings.watchLiveCard.backgroundImage}
          />
        </section>
      )}
    </main>
  );
}
