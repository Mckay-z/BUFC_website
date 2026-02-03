import { client } from "@/lib/sanity.client";
import {
  fixturesPageSettingsQuery,
  gplClubsByNamesQuery,
  leagueTableQuery,
} from "@/lib/sanity.queries";
import { FixturesPageSettings, MatchFixture, GPLClub } from "@/lib/types";
import { Metadata } from "next";
import { convertAndEnrichMatchFixtures } from "@/lib/fixtureHelpers";
import { groq } from "next-sanity";
import FixturesContent from "@/components/pages/FixturesContent";
import { TableEntry } from "@/lib/mockTableData";

export const metadata: Metadata = {
  title: "Fixtures & Results | Bechem United FC",
  description: "View upcoming fixtures, recent match results and league table for Bechem United FC",
};

export const revalidate = 60;

interface FixturesPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function FixturesPage({
  searchParams,
}: FixturesPageProps) {
  const params = await searchParams;
  const initialTab = params.tab || "fixtures";

  const [settings, allMatchFixtures, leagueTableData] = await Promise.all([
    client.fetch<FixturesPageSettings>(fixturesPageSettingsQuery),
    client.fetch<MatchFixture[]>(groq`*[_type == "matchFixture"] | order(matchDate asc)`),
    client.fetch<TableEntry[]>(leagueTableQuery),
  ]);

  // Use sanity data if available, otherwise fallback to mock
  let finalLeagueTable = leagueTableData;
  if (!finalLeagueTable || finalLeagueTable.length === 0) {
    const { mockLeagueTable } = await import("@/lib/mockTableData");
    finalLeagueTable = mockLeagueTable as TableEntry[];
  }

  // fallback to mock if no matches in sanity
  let matchFixtures = allMatchFixtures;
  if (!matchFixtures || matchFixtures.length === 0) {
    const { mockFixtures } = await import("@/lib/mockFixtures");
    matchFixtures = mockFixtures.map(m => ({
      _id: m.id,
      _type: "matchFixture",
      competition: m.competition,
      matchday: String(m.matchday),
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      matchDate: `${m.date}T${m.time}:00Z`,
      status: (new Date(`${m.date}T${m.time}:00Z`) > new Date()) ? "upcoming" : "finished",
      homeScore: 0,
      awayScore: 0,
    } as MatchFixture));
  }

  const upcomingFixtures = matchFixtures.filter(f => f.status.toLowerCase() === "upcoming");
  const finishedFixtures = matchFixtures.filter(f => f.status.toLowerCase() === "finished");

  const allTeamNames = new Set<string>();
  matchFixtures.forEach(f => { allTeamNames.add(f.homeTeam); allTeamNames.add(f.awayTeam); });

  const clubs: GPLClub[] = await client.fetch(gplClubsByNamesQuery, {
    clubNames: Array.from(allTeamNames),
  });

  const clubMap = new Map<string, GPLClub>();
  clubs.forEach((club) => clubMap.set(club.clubName, club));

  const stats = {
    played: finishedFixtures.length,
    won: finishedFixtures.filter(f => {
      if (f.homeTeam === "Bechem United FC") return (f.homeScore || 0) > (f.awayScore || 0);
      return (f.awayScore || 0) > (f.homeScore || 0);
    }).length,
    drawn: finishedFixtures.filter(f => (f.homeScore || 0) === (f.awayScore || 0)).length,
    lost: finishedFixtures.filter(f => {
      if (f.homeTeam === "Bechem United FC") return (f.homeScore || 0) < (f.awayScore || 0);
      return (f.awayScore || 0) < (f.homeScore || 0);
    }).length,
  };

  const enrichedUpcoming = await convertAndEnrichMatchFixtures(upcomingFixtures);

  return (
    <main >
      <FixturesContent
        settings={settings}
        enrichedUpcoming={enrichedUpcoming}
        finishedFixtures={finishedFixtures}
        clubMap={clubMap}
        stats={stats}
        initialTab={initialTab}
        leagueTable={finalLeagueTable}
      />
    </main>
  );
}
