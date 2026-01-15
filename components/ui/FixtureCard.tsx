import { FixtureWithClubData } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import ImageFallback from "./ImageFallBack";
import { Icon } from "@iconify/react";

interface FixtureCardProps {
  fixture: FixtureWithClubData;
}

/**
 * FixtureCard Component
 * Displays a compact fixture card with team logos, match details, and time
 * Used in the "What's ahead" section to show upcoming fixtures
 *
 * Mobile: 250px width, 160px height
 * Desktop: 340px width, 200px height
 */
export default function FixtureCard({ fixture }: FixtureCardProps) {
  // Format the date for display (e.g., "Sun | Feb 1, 2025")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const monthDay = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${dayName} | ${monthDay}`;
  };

  return (
    <div className="flex flex-col items-start gap-3 md:gap-4.5 w-62.5 md:w-85 h-40 md:h-50 px-4 md:px-8 py-5 rounded-[20px] md:rounded-[28px] border border-prim-2 bg-neutral-1 shrink-0">
      {/* Match Date and Time */}
      <div className="flex items-center justify-between w-full">
        <p className="text-neutral-8 text-xs md:text-sm font-medium">
          {formatDate(fixture.date)}
        </p>
        <p className="text-neutral-7 text-xs md:text-sm font-medium">
          {fixture.time}
        </p>
      </div>

      {/* Teams Display */}
      <div className="flex items-center justify-between w-full">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 md:gap-2.5 max-w-20 md:max-w-25">
          {/* Home Team Logo */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
            {fixture.homeClubData?.clubLogo ? (
              <Image
                src={urlFor(fixture.homeClubData.clubLogo)
                  .width(128)
                  .height(128)
                  .url()}
                alt={fixture.homeClubData.clubName}
                fill
                className="object-contain"
              />
            ) : (
              <ImageFallback
                icon="mdi:shield-outline"
                width="48"
                height="48"
                className="bg-neutral-3"
              />
            )}
          </div>
          {/* Home Team Name */}
          <p className="text-neutral-9 text-[10px] md:text-xs font-semibold text-center line-clamp-2">
            {fixture.homeClubData?.clubName || fixture.homeTeam}
          </p>
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center shrink-0 mx-2">
          <span className="text-neutral-6 text-base md:text-xl font-bold italic">
            VS
          </span>
        </div>

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 md:gap-2.5 max-w-20 md:max-w-25">
          {/* Away Team Logo */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
            {fixture.awayClubData?.clubLogo ? (
              <Image
                src={urlFor(fixture.awayClubData.clubLogo)
                  .width(128)
                  .height(128)
                  .url()}
                alt={fixture.awayClubData.clubName}
                fill
                className="object-contain"
              />
            ) : (
              <ImageFallback
                icon="mdi:shield-outline"
                width="48"
                height="48"
                className="bg-neutral-3"
              />
            )}
          </div>
          {/* Away Team Name */}
          <p className="text-neutral-9 text-[10px] md:text-xs font-semibold text-center line-clamp-2">
            {fixture.awayClubData?.clubName || fixture.awayTeam}
          </p>
        </div>
      </div>

      {/* Competition Badge */}
      <div className="flex items-center gap-1.5 md:gap-2">
        <Icon
          icon="mdi:soccer-field"
          className="w-4 h-4 md:w-5 md:h-5 text-primary"
        />
        <p className="text-neutral-7 text-[10px] md:text-xs font-medium">
          {fixture.competition}
        </p>
      </div>
    </div>
  );
}
