import { client } from "@/lib/sanity.client";
import {
  fixturesPageSettingsQuery,
  upcomingFixturesQuery,
  finishedFixturesQuery,
} from "@/lib/sanity.queries";
import { FixturesPageSettings, MatchFixture } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fixtures & Results | Bechem United FC",
  description:
    "View upcoming fixtures and recent match results for Bechem United FC",
};

export const revalidate = 60;

export default async function FixturesPage() {
  const [settings, upcomingFixtures, finishedFixtures] = await Promise.all([
    client.fetch<FixturesPageSettings>(fixturesPageSettingsQuery),
    client.fetch<MatchFixture[]>(upcomingFixturesQuery),
    client.fetch<MatchFixture[]>(finishedFixturesQuery),
  ]);

  // Debug logging
  console.log("Settings:", settings);
  console.log("Upcoming Fixtures:", upcomingFixtures);
  console.log("Finished Fixtures:", finishedFixtures);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString("en-US", { day: "2-digit" }),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
    };
  };

  const getCompetitionBadgeColor = (competition: string) => {
    const colors: Record<string, string> = {
      "Ghana Premier League": "bg-prim-3",
      "FA Cup": "bg-orange-500",
      "MTN FA Cup": "bg-orange-500",
      "CAF Champions League": "bg-blue-600",
      "CAF Confederation Cup": "bg-purple-600",
    };
    return colors[competition] || "bg-prim-3";
  };

  return (
    <main className="bg-neutral-1">
      {/* Page Header with Banner */}
      <PageHeader
        title={settings?.fixturesPageTitle || "Fixtures"}
        backgroundImage={settings?.fixturesPageBannerImage}
      />

      {/* Upcoming Fixtures Section */}
      {upcomingFixtures && upcomingFixtures.length > 0 ? (
        <section className="container-wide py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-neutral-text text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              {settings?.upcomingFixturesTitle || "WHAT'S AHEAD"}
            </h2>
            <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
              {settings?.upcomingFixturesSubtext ||
                "Mark your calendar for these upcoming clashes"}
            </p>
          </div>

          {/* Upcoming Fixtures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFixtures.map((fixture) => {
              const dateInfo = formatDate(fixture.matchDate);
              return (
                <article
                  key={fixture._id}
                  className="bg-neutral-2 rounded-[20px] overflow-hidden border border-neutral-3 hover:border-prim-3 transition-all duration-300"
                >
                  {/* Competition Badge */}
                  <div className="p-4 pb-0">
                    <span
                      className={`inline-block px-4 py-1.5 ${getCompetitionBadgeColor(fixture.competition)} text-white text-xs font-semibold rounded-full uppercase`}
                    >
                      {fixture.competition}
                    </span>
                    {fixture.matchday && (
                      <span className="ml-2 text-xs text-neutral-6">
                        {fixture.matchday}
                      </span>
                    )}
                  </div>

                  {/* Match Info */}
                  <div className="p-6 pt-4">
                    {/* Date Badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex flex-col items-center justify-center w-16 h-16 bg-prim-1 rounded-lg">
                        <span className="text-prim-3 text-2xl font-bold leading-none">
                          {dateInfo.day}
                        </span>
                        <span className="text-prim-3 text-xs font-semibold uppercase mt-1">
                          {dateInfo.month}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-neutral-7 text-sm">
                          {dateInfo.weekday}
                        </div>
                        <div className="text-neutral-text text-lg font-bold">
                          {dateInfo.time}
                        </div>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-text font-semibold text-base">
                          {fixture.homeTeam}
                        </span>
                        <span className="text-neutral-6 text-sm">Home</span>
                      </div>
                      <div className="h-px bg-neutral-4"></div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-text font-semibold text-base">
                          {fixture.awayTeam}
                        </span>
                        <span className="text-neutral-6 text-sm">Away</span>
                      </div>
                    </div>

                    {/* Venue */}
                    {fixture.venue && (
                      <div className="mt-4 flex items-center gap-2 text-neutral-7 text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{fixture.venue}</span>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="container-wide py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-neutral-text text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              WHAT&apos;S AHEAD
            </h2>
            <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
              No upcoming fixtures at the moment.
            </p>
          </div>
        </section>
      )}

      {/* Results Section */}
      {finishedFixtures && finishedFixtures.length > 0 ? (
        <section className="container-wide pb-16 md:pb-20">
          <div className="mb-8">
            <h2 className="text-neutral-text text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              {settings?.resultsTitle || "RESULTS"}
            </h2>
            <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
              {settings?.resultsSubtext ||
                "Track our hunters' journey through the season"}
            </p>
          </div>

          {/* Results Grid */}
          <div className="space-y-4">
            {finishedFixtures.slice(0, 10).map((fixture) => {
              const dateInfo = formatDate(fixture.matchDate);
              const isBechem =
                fixture.homeTeam.toLowerCase().includes("bechem") ||
                fixture.awayTeam.toLowerCase().includes("bechem");
              const bechemIsHome = fixture.homeTeam
                .toLowerCase()
                .includes("bechem");

              // Determine result (for Bechem)
              let result: "win" | "loss" | "draw" = "draw";
              if (
                fixture.homeScore !== undefined &&
                fixture.awayScore !== undefined
              ) {
                if (bechemIsHome) {
                  if (fixture.homeScore > fixture.awayScore) result = "win";
                  else if (fixture.homeScore < fixture.awayScore)
                    result = "loss";
                } else {
                  if (fixture.awayScore > fixture.homeScore) result = "win";
                  else if (fixture.awayScore < fixture.homeScore)
                    result = "loss";
                }
              }

              const resultColors = {
                win: "bg-green-100 border-green-500 text-green-700",
                loss: "bg-red-100 border-red-500 text-red-700",
                draw: "bg-yellow-100 border-yellow-500 text-yellow-700",
              };

              return (
                <article
                  key={fixture._id}
                  className="bg-neutral-2 rounded-[20px] border border-neutral-3 hover:border-prim-3 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Date Section */}
                    <div className="flex md:flex-col items-center justify-center gap-3 md:gap-2 p-4 md:p-6 md:w-32 bg-neutral-3">
                      <div className="flex flex-col items-center">
                        <span className="text-prim-3 text-xl md:text-2xl font-bold">
                          {dateInfo.day}
                        </span>
                        <span className="text-neutral-7 text-xs uppercase">
                          {dateInfo.month}
                        </span>
                      </div>
                      <div className="text-neutral-7 text-xs md:text-sm">
                        {dateInfo.weekday}
                      </div>
                    </div>

                    {/* Match Details */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span
                          className={`px-3 py-1 ${getCompetitionBadgeColor(fixture.competition)} text-white text-xs font-semibold rounded-full uppercase`}
                        >
                          {fixture.competition}
                        </span>
                        {fixture.matchday && (
                          <span className="text-xs text-neutral-6">
                            {fixture.matchday}
                          </span>
                        )}
                        {isBechem && (
                          <span
                            className={`ml-auto px-3 py-1 rounded-full text-xs font-bold border-2 ${resultColors[result]}`}
                          >
                            {result.toUpperCase()}
                          </span>
                        )}
                      </div>

                      {/* Score */}
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`text-base md:text-lg font-semibold ${bechemIsHome && isBechem
                                  ? "text-prim-3"
                                  : "text-neutral-text"
                                }`}
                            >
                              {fixture.homeTeam}
                            </span>
                            <span className="text-2xl md:text-3xl font-bold text-neutral-text ml-4">
                              {fixture.homeScore ?? "-"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-base md:text-lg font-semibold ${!bechemIsHome && isBechem
                                  ? "text-prim-3"
                                  : "text-neutral-text"
                                }`}
                            >
                              {fixture.awayTeam}
                            </span>
                            <span className="text-2xl md:text-3xl font-bold text-neutral-text ml-4">
                              {fixture.awayScore ?? "-"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Venue */}
                      {fixture.venue && (
                        <div className="mt-4 flex items-center gap-2 text-neutral-7 text-sm">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span>{fixture.venue}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* View More Button */}
          {finishedFixtures.length > 10 && (
            <div className="flex justify-center mt-8">
              <button className="px-8 py-3 bg-prim-3 text-white rounded-full font-semibold hover:bg-prim-4 transition-colors">
                {settings?.fixturesViewMoreText || "View More"}
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="container-wide pb-16 md:pb-20">
          <div className="mb-8">
            <h2 className="text-neutral-text text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              RESULTS
            </h2>
            <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
              No match results available yet.
            </p>
          </div>
        </section>
      )}

      {/* Watch Live / Highlights CTA Card */}
      <section className="container-wide pb-16 md:pb-20">
        <div className="bg-linear-to-r from-prim-3 to-prim-4 rounded-[30px] p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            {settings?.watchLiveCardText ||
              "Stream live matches or watch highlights from previous games"}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href="/pastHighlights"
              className="px-8 py-3 bg-white text-prim-3 rounded-full font-semibold hover:bg-neutral-1 transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
              {settings?.highlightsCtaText || "View Highlights"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
