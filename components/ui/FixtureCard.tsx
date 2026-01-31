import { FixtureWithClubData } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import ImageFallback from "./ImageFallback";
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
    <div className="relative flex flex-col items-start gap-3 md:gap-4.5 w-62.5 md:w-85 h-40 md:h-50 px-4 md:px-8 py-5 rounded-3xl md:rounded-[28px] border border-prim-2 text-prim-1 shrink-0">
      {/* Match Date and Time */}
      <div className="flex items-center justify-between w-full">
        <p className=" text-xs md:text-sm font-semibold">
          {formatDate(fixture.date)}
        </p>
        <p className=" text-xs md:text-sm font-semibold">{fixture.time}</p>
      </div>

      {/* Teams Display */}
      <div className="flex items-center justify-around w-full">
        {/* Home Team */}
        <div className="flex flex-col items-center gap-2 md:gap-2.5 max-w-20 md:max-w-25">
          {/* Home Team Logo */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
            {fixture.homeClubData?.clubLogo ? (
              <Image
                src={urlFor(fixture.homeClubData.clubLogo)
                  .width(256)
                  .height(256)
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
          <p className="text-xs md:text-sm font-semibold text-center">
            {/* {fixture.homeClubData?.clubName || fixture.homeTeam} */}Home
          </p>
        </div>

        {/* VS Divider */}
        <Image
          src="/img/vs_logo.png"
          alt="VS Logo"
          width={1000}
          height={1000}
          className="w-14 md:w-21.25 object-cover object-center"
        />

        {/* Away Team */}
        <div className="flex flex-col items-center gap-2 md:gap-2.5 max-w-20 md:max-w-25">
          {/* Away Team Logo */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
            {fixture.awayClubData?.clubLogo ? (
              <Image
                src={urlFor(fixture.awayClubData.clubLogo)
                  .width(256)
                  .height(256)
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
          <p className="text-xs md:text-sm font-semibold text-center">
            {/* {fixture.awayClubData?.clubName || fixture.awayTeam} */}Away
          </p>
        </div>
      </div>

      {/* Is Fixture Featured */}
      {fixture.isFeatured && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex-center gap-1 text-primary-hover rounded-full">
          <Icon icon="mdi:thunder" className="w-3.25 h-3.25 md:w-6 md:h-6" />
          <p className="text-xs md:text-sm font-semibold">Featured</p>
        </div>
      )}
    </div>
  );
}
