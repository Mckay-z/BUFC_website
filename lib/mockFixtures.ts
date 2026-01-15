/**
 * Mock fixture data for Ghana Premier League 2026
 * This will be replaced with real API data later
 *
 * Each fixture includes:
 * - Unique ID
 * - Home and away team names (matching Sanity club names)
 * - Match date and time
 * - Competition info
 * - Matchday number
 */

export interface MockFixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string; // ISO 8601 format
  time: string; // 24-hour format (e.g., "15:00")
  competition: string;
  matchday: number;
}

// Ghana Premier League 2026 Mock Fixtures
export const mockFixtures: MockFixture[] = [
  {
    id: "gpl-2026-001",
    homeTeam: "Bechem United FC",
    awayTeam: "Asante Kotoko SC",
    date: "2026-01-20",
    time: "15:00",
    competition: "Ghana Premier League",
    matchday: 15,
  },
  {
    id: "gpl-2026-002",
    homeTeam: "Hearts of Oak SC",
    awayTeam: "Bechem United FC",
    date: "2026-02-01",
    time: "19:00",
    competition: "Ghana Premier League",
    matchday: 16,
  },
  {
    id: "gpl-2026-003",
    homeTeam: "Bechem United FC",
    awayTeam: "Medeama SC",
    date: "2026-02-10",
    time: "19:00",
    competition: "Ghana Premier League",
    matchday: 17,
  },
  {
    id: "gpl-2026-004",
    homeTeam: "Dreams FC",
    awayTeam: "Bechem United FC",
    date: "2026-02-20",
    time: "19:00",
    competition: "Ghana Premier League",
    matchday: 18,
  },
  {
    id: "gpl-2026-005",
    homeTeam: "Bechem United FC",
    awayTeam: "Vision FC",
    date: "2026-03-01",
    time: "15:00",
    competition: "Ghana Premier League",
    matchday: 19,
  },
  {
    id: "gpl-2026-006",
    homeTeam: "Aduana FC",
    awayTeam: "Bechem United FC",
    date: "2026-03-08",
    time: "15:00",
    competition: "Ghana Premier League",
    matchday: 20,
  },
  {
    id: "gpl-2026-007",
    homeTeam: "Bechem United FC",
    awayTeam: "Karela United FC",
    date: "2026-03-15",
    time: "19:00",
    competition: "Ghana Premier League",
    matchday: 21,
  },
  {
    id: "gpl-2026-008",
    homeTeam: "Heart of Lions FC",
    awayTeam: "Bechem United FC",
    date: "2026-03-22",
    time: "15:00",
    competition: "Ghana Premier League",
    matchday: 22,
  },
];

/**
 * Get upcoming fixtures sorted by date
 * @param limit - Optional limit on number of fixtures to return
 * @returns Array of fixtures starting from the next upcoming match
 */
export function getUpcomingFixtures(limit?: number): MockFixture[] {
  const now = new Date();

  // Filter and sort fixtures that are in the future
  const upcoming = mockFixtures
    .filter((fixture) => {
      const fixtureDateTime = new Date(`${fixture.date}T${fixture.time}:00`);
      return fixtureDateTime > now;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}:00`);
      const dateB = new Date(`${b.date}T${b.time}:00`);
      return dateA.getTime() - dateB.getTime();
    });

  return limit ? upcoming.slice(0, limit) : upcoming;
}

/**
 * Get the next immediate fixture
 * @returns The very next fixture to be played
 */
export function getNextFixture(): MockFixture | null {
  const upcoming = getUpcomingFixtures(1);
  return upcoming.length > 0 ? upcoming[0] : null;
}

/**
 * Calculate time remaining until a fixture
 * @param date - Date string in YYYY-MM-DD format
 * @param time - Time string in HH:MM format
 * @returns Object with days, hours, minutes, seconds
 */
export function getTimeUntilFixture(date: string, time: string) {
  const fixtureDateTime = new Date(`${date}T${time}:00`);
  const now = new Date();
  const difference = fixtureDateTime.getTime() - now.getTime();

  // If the fixture has passed, return zeros
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isPast: false };
}
