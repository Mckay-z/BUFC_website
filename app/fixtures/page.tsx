import { client } from "@/lib/sanity.client";
import {
  fixturesPageSettingsQuery,
  gplClubsByNamesQuery,
  leagueTableQuery,
} from "@/lib/sanity.queries";
import { FixturesPageSettings, MatchFixture, GPLClub } from "@/lib/types";
import { Metadata } from "next";
import { convertAndEnrichMatchFixtures, convertBackendFixture } from "@/lib/fixtureHelpers";
import { groq } from "next-sanity";
import FixturesContent from "@/components/pages/FixturesContent";
import { TableEntry } from "@/lib/mockTableData";
import { fixtureService, BackendFixture, LeagueEntry } from "@/lib/api/fixtures";

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

  // Try fetching from custom backend first
  let backendUpcoming: BackendFixture[] = [];
  let backendResults: BackendFixture[] = [];
  let backendTable: LeagueEntry[] = [];

  try {
    const results = await Promise.allSettled([
      fixtureService.getUpcoming(),
      fixtureService.getResults(),
      fixtureService.getLeagueTable(),
    ]);

    if (results[0].status === 'fulfilled') backendUpcoming = results[0].value;
    if (results[1].status === 'fulfilled') backendResults = results[1].value;
    if (results[2].status === 'fulfilled') backendTable = results[2].value;
  } catch (err) {
    console.error("Failed to fetch from backend API, falling back to Sanity:", err);
  }

  const [settings, allMatchFixtures, leagueTableData] = await Promise.all([
    client.fetch<FixturesPageSettings>(fixturesPageSettingsQuery),
    client.fetch<MatchFixture[]>(groq`*[_type == "matchFixture"] | order(matchDate asc)`),
    client.fetch<TableEntry[]>(leagueTableQuery),
  ]);

  // Merge/Prioritize Backend Data
  let finalLeagueTable: TableEntry[] = backendTable.length > 0 ? backendTable.map(entry => ({
    rank: entry.position,
    teamName: entry.team,
    played: entry.played,
    won: entry.won,
    drawn: entry.drawn,
    lost: entry.lost,
    gf: entry.gf,
    ga: entry.ga,
    gd: entry.gd,
    points: entry.points,
    lastFive: [], // Backend might not provide this yet
    isHighlight: entry.team === "Bechem United FC"
  } as TableEntry)) : (leagueTableData || []);

  if (!finalLeagueTable || finalLeagueTable.length === 0) {
    const { mockLeagueTable } = await import("@/lib/mockTableData");
    finalLeagueTable = mockLeagueTable as TableEntry[];
  }

  // Process Fixtures
  let matchFixtures: MatchFixture[] = allMatchFixtures || [];
  if (backendUpcoming.length > 0 || backendResults.length > 0) {
    const convertedBackend = [...backendUpcoming, ...backendResults].map(convertBackendFixture);
    matchFixtures = convertedBackend.map(f => ({
      _id: f.id,
      _type: "matchFixture",
      competition: f.competition,
      matchday: String(f.matchday),
      homeTeam: f.homeTeam,
      awayTeam: f.awayTeam,
      homeLogo: f.homeLogo,
      awayLogo: f.awayLogo,
      matchDate: `${f.date}T${f.time}:00Z`,
      status: (new Date(`${f.date}T${f.time}:00Z`) > new Date()) ? "upcoming" : "finished",
      homeScore: f.homeScore || 0,
      awayScore: f.awayScore || 0,
    } as MatchFixture));
  }

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
