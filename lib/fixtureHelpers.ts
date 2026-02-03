import { client } from "./sanity.client";
import { gplClubsByNamesQuery } from "./sanity.queries";
import { GPLClub, Fixture, FixtureWithClubData, MatchFixture } from "./types";

/**
 * Enriches fixture data with club information from Sanity
 *
 * This function takes an array of fixtures (from mock data or API)
 * and fetches the corresponding GPL club data from Sanity based on team names.
 * It matches club logos and stadium information to the fixtures.
 *
 * @param fixtures - Array of basic fixture data
 * @returns Array of fixtures enriched with club data (logos, stadiums, etc.)
 */
export async function enrichFixturesWithClubData(
  fixtures: Fixture[]
): Promise<FixtureWithClubData[]> {
  // Extract all unique team names from fixtures
  const teamNames = new Set<string>();
  fixtures.forEach((fixture) => {
    teamNames.add(fixture.homeTeam);
    teamNames.add(fixture.awayTeam);
  });

  // Fetch club data from Sanity for all team names
  const clubs: GPLClub[] = await client.fetch(gplClubsByNamesQuery, {
    clubNames: Array.from(teamNames),
  });

  // Create a map of club names to club data for quick lookup
  const clubMap = new Map<string, GPLClub>();
  clubs.forEach((club) => {
    clubMap.set(club.clubName, club);
  });

  // Enrich each fixture with club data
  const enrichedFixtures: FixtureWithClubData[] = fixtures.map((fixture) => {
    return {
      ...fixture,
      homeClubData: clubMap.get(fixture.homeTeam) || null,
      awayClubData: clubMap.get(fixture.awayTeam) || null,
    };
  });

  return enrichedFixtures;
}

/**
 * Converts MatchFixture (from Sanity) to Fixture and enriches it with club data
 *
 * @param matchFixtures - Array of MatchFixture from Sanity
 * @returns Array of FixtureWithClubData
 */
export async function convertAndEnrichMatchFixtures(
  matchFixtures: MatchFixture[]
): Promise<FixtureWithClubData[]> {
  const convertedFixtures: Fixture[] = matchFixtures.map((mf) => {
    const date = new Date(mf.matchDate);
    const dateStr = date.toISOString().split("T")[0];
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return {
      id: mf._id,
      homeTeam: mf.homeTeam,
      awayTeam: mf.awayTeam,
      date: dateStr,
      time: timeStr,
      competition: mf.competition,
      matchday: mf.matchday ? parseInt(mf.matchday) : 0,
      venue: mf.venue,
    };
  });

  return enrichFixturesWithClubData(convertedFixtures);
}
