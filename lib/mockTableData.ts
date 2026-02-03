import { SanityImage } from "./types";

export interface TableEntry {
    rank: number;
    teamName: string;
    teamLogo?: SanityImage;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gf: number;
    ga: number;
    gd: number;
    points: number;
    lastFive: ("W" | "D" | "L")[];
    isHighlight?: boolean;
}

export const mockLeagueTable: TableEntry[] = [
    { rank: 1, teamName: "Aduana Stars", played: 12, won: 7, drawn: 2, lost: 3, gf: 15, ga: 7, gd: 8, points: 23, lastFive: ["W", "D", "W", "W", "L"] },
    { rank: 2, teamName: "Medeama SC", played: 12, won: 6, drawn: 5, lost: 1, gf: 17, ga: 11, gd: 6, points: 23, lastFive: ["D", "W", "W", "W", "L"] },
    { rank: 3, teamName: "Heart of Lions", played: 12, won: 6, drawn: 5, lost: 1, gf: 14, ga: 7, gd: 7, points: 23, lastFive: ["D", "W", "W", "W", "L"] },
    { rank: 4, teamName: "Bibiani Gold Stars", played: 12, won: 7, drawn: 1, lost: 4, gf: 12, ga: 13, gd: -1, points: 22, lastFive: ["L", "W", "W", "L", "W"] },
    { rank: 5, teamName: "Asante Kotoko SC", played: 12, won: 6, drawn: 3, lost: 3, gf: 14, ga: 9, gd: 5, points: 21, lastFive: ["D", "W", "W", "L", "W"] },
    { rank: 6, teamName: "Hearts of Oak SC", played: 12, won: 6, drawn: 3, lost: 3, gf: 11, ga: 9, gd: 2, points: 21, lastFive: ["D", "W", "W", "L", "W"] },
    { rank: 7, teamName: "Samartex", played: 12, won: 4, drawn: 6, lost: 2, gf: 8, ga: 7, gd: 1, points: 18, lastFive: ["L", "W", "L", "D", "W"] },
    { rank: 8, teamName: "Karela United", played: 12, won: 4, drawn: 5, lost: 3, gf: 13, ga: 14, gd: -1, points: 17, lastFive: ["L", "D", "L", "W", "D"] },
    { rank: 9, teamName: "Young Apostles", played: 12, won: 4, drawn: 4, lost: 4, gf: 11, ga: 12, gd: -1, points: 16, lastFive: ["W", "L", "L", "W", "L"] },
    { rank: 10, teamName: "Nsoatreman", played: 12, won: 3, drawn: 5, lost: 4, gf: 12, ga: 13, gd: -1, points: 14, lastFive: ["D", "W", "L", "D", "W"] },
    { rank: 11, teamName: "Vision FC", played: 12, won: 3, drawn: 5, lost: 4, gf: 12, ga: 14, gd: -2, points: 14, lastFive: ["D", "L", "D", "D", "L"] },
    { rank: 12, teamName: "Nations FC", played: 12, won: 3, drawn: 4, lost: 5, gf: 10, ga: 12, gd: -2, points: 13, lastFive: ["D", "L", "L", "W", "L"] },
    { rank: 13, teamName: "Legon Cities FC", played: 12, won: 3, drawn: 3, lost: 6, gf: 11, ga: 12, gd: -1, points: 12, lastFive: ["D", "W", "W", "D", "W"] },
    { rank: 14, teamName: "Berekum Chelsea", played: 12, won: 3, drawn: 3, lost: 6, gf: 11, ga: 16, gd: -5, points: 12, lastFive: ["D", "W", "L", "W", "L"] },
    { rank: 15, teamName: "Basake Holy Stars", played: 12, won: 3, drawn: 3, lost: 6, gf: 10, ga: 17, gd: -7, points: 12, lastFive: ["D", "L", "L", "W", "L"] },
    { rank: 16, teamName: "Dreams FC", played: 12, won: 3, drawn: 2, lost: 7, gf: 11, ga: 14, gd: -3, points: 11, lastFive: ["D", "W", "W", "L", "L"] },
    { rank: 17, teamName: "Bechem United FC", played: 12, won: 2, drawn: 4, lost: 6, gf: 9, ga: 12, gd: -3, points: 10, lastFive: ["D", "W", "D", "L", "L"], isHighlight: true },
    { rank: 18, teamName: "Techiman Eleven Wonders", played: 12, won: 1, drawn: 3, lost: 8, gf: 8, ga: 17, gd: -9, points: 6, lastFive: ["L", "L", "L", "W", "W"] },
];
