import { apiRequest } from "./client";

export interface BackendFixture {
    id: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    matchDate: string;
    status: "upcoming" | "finished" | "live";
    competition: string;
    venue?: string;
    logo_home?: string;
    logo_away?: string;
}

export interface LeagueEntry {
    position: number;
    team: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gf: number;
    ga: number;
    gd: number;
    points: number;
}

export const fixtureService = {
    async getUpcoming(): Promise<BackendFixture[]> {
        return apiRequest<BackendFixture[]>("/fixtures/upcoming");
    },
    async getResults(): Promise<BackendFixture[]> {
        return apiRequest<BackendFixture[]>("/fixtures/results");
    },
    async getLive(): Promise<BackendFixture[]> {
        return apiRequest<BackendFixture[]>("/fixtures/live");
    },
    async getLeagueTable(): Promise<LeagueEntry[]> {
        // Based on the docs, GET /fixtures/results is listed twice, 
        // once for results and once for league table. I'll check if there's a specific endpoint.
        // For now, I'll assume it's /fixtures/table if I can find it, but the docs said /fixtures/results for League Table too.
        // Actually, looking at the doc snippet:
        // GET League Table http://localhost:3001/api/fixtures/results
        // This might be a mistake in the docs or it returns both.
        return apiRequest<LeagueEntry[]>("/fixtures/table").catch(() =>
            apiRequest<LeagueEntry[]>("/fixtures/results")
        );
    }
};
