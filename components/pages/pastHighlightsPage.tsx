"use client";

import { useState } from "react";
import { PastHighlightsSettings, MatchHighlight } from "@/lib/types";
import PageHeader from "../layout/PageHeader";
import SectionHeader from "../layout/sectionHeader";
import PastHighlightCard from "../ui/PastHighlightCard";
import WatchLiveCard from "../ui/WatchLiveCard";
import Button from "../ui/Button";

interface PastHighlightsPageProps {
  settings: PastHighlightsSettings;
  highlights: MatchHighlight[];
}

export default function PastHighlightsPage({
  settings,
  highlights,
}: PastHighlightsPageProps) {
  const [visibleCount, setVisibleCount] = useState(12);

  const visibleHighlights = highlights.slice(0, visibleCount);
  const hasMore = visibleCount < highlights.length;

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, highlights.length));
  };

  return (
    <main>
      {/* Page Header */}
      <PageHeader
        title={settings.pageTitle}
        backgroundImage={settings.pageBanner}
      />

      {/* Past Highlights Section */}
      <section className="container-wide py-16 md:py-20 lg:py-28">
        <div className="flex flex-col gap-12 md:gap-16">
          {/* Section Header */}
          <SectionHeader
            title={settings.sectionTitle}
            subtext={settings.sectionSubtitle}
          />

          {/* Highlights Grid */}
          {highlights.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                {visibleHighlights.map((highlight) => (
                  <PastHighlightCard
                    key={highlight._id}
                    highlight={highlight}
                  />
                ))}
              </div>

              {/* View More Button */}
              {hasMore && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleViewMore}
                    buttonClassName="min-w-[200px]"
                  >
                    {settings.viewMoreText}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <p className="text-neutral-6 text-lg text-center">
                No highlights available at the moment. Check back soon!
              </p>
            </div>
          )}
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
