// ─── Community Hub Mock Data (client-side store) ─────────────────────────────
// In production this would connect to a real-time backend (e.g. Supabase, Firebase)

import { User } from "@/lib/api/types";
import { Post, PostAuthor } from "./types";

const NOW = Date.now();
const mins = (n: number) => new Date(NOW - n * 60000).toISOString();

const CLUB: PostAuthor = {
    id: "club",
    name: "Bechem United FC",
    role: "admin",
    badge: "Moderator",
};

const KWAME: PostAuthor = { id: "u1", name: "Kwame Boateng", role: "fan", badge: "Gold Member" };
const AMA: PostAuthor = { id: "u2", name: "Ama Sarpong", role: "fan", badge: "Silver Member" };
const KOFI: PostAuthor = { id: "u3", name: "Kofi Mensah", role: "fan", badge: "Fan" };
const ABENA: PostAuthor = { id: "u4", name: "Abena Owusu", role: "fan", badge: "Gold Member" };

const initialReactions = (likes: number, fire: number, heart: number) => [
    { type: "like" as const, count: likes, reacted: false },
    { type: "fire" as const, count: fire, reacted: false },
    { type: "heart" as const, count: heart, reacted: false },
    { type: "celebrate" as const, count: 0, reacted: false },
];

export const SEED_POSTS: Post[] = [
    {
        id: "p1",
        author: CLUB,
        content:
            "🏆 BIG MATCH DAY! Bechem United FC takes on Asante Kotoko at the Nana Fosu Agyemang Park. Gates open at 3pm. Let's fill the stadium and make our home ground LOUD! 💛💜 #TheHunters #GhanaFA",
        image: "/img/fans.jpg",
        createdAt: mins(5),
        reactions: initialReactions(142, 89, 54),
        comments: [
            {
                id: "c1",
                author: KWAME,
                content: "I'll be there with my brothers! Section A in full force 🔥",
                createdAt: mins(4),
                likes: 12,
                likedByMe: false,
            },
            {
                id: "c2",
                author: AMA,
                content: "Can't make it in person but I'll be watching on TV. HUNTERS! 💜",
                createdAt: mins(3),
                likes: 5,
                likedByMe: false,
            },
        ],
        commentsOpen: false,
        type: "announcement",
        pinned: true,
        tags: ["match-day", "announcements"],
    },
    {
        id: "p2",
        author: KWAME,
        content: "That last match was ELECTRIC ⚡. Hafiz Konkoni's second-half volley should be goal of the season. Few players in the GPL have that kind of technique. What do you all think?",
        createdAt: mins(42),
        reactions: initialReactions(67, 45, 18),
        comments: [
            {
                id: "c3",
                author: KOFI,
                content: "100%! That volley was something else entirely 😤",
                createdAt: mins(38),
                likes: 8,
                likedByMe: false,
            },
        ],
        commentsOpen: false,
        type: "post",
        tags: ["match-review", "players"],
    },
    {
        id: "p3",
        author: CLUB,
        content: "🗳️ Community Poll: Who was Man of the Match in Sunday's game?",
        createdAt: mins(90),
        reactions: initialReactions(30, 10, 8),
        comments: [],
        commentsOpen: false,
        type: "poll",
        pollOptions: [
            { id: "opt1", text: "Hafiz Konkoni", votes: 134, votedByMe: false },
            { id: "opt2", text: "Augustine Okrah", votes: 89, votedByMe: false },
            { id: "opt3", text: "Emmanuel Avornyo", votes: 42, votedByMe: false },
            { id: "opt4", text: "Richard Avornyor", votes: 25, votedByMe: false },
        ],
        tags: ["poll"],
    },
    {
        id: "p4",
        author: ABENA,
        content:
            "Just came back from the Youth Academy open day yesterday. The talent these young lads have is INCREDIBLE. So proud of the club for investing in our community 💛 #HuntersYouth #FutureIsNow",
        createdAt: mins(180),
        reactions: initialReactions(52, 31, 40),
        comments: [
            {
                id: "c4",
                author: AMA,
                content: "Was there too! The 14-year-olds were playing like seniors 😭",
                createdAt: mins(160),
                likes: 14,
                likedByMe: false,
            },
            {
                id: "c5",
                author: CLUB,
                content: "Thank you for your support Abena! Stay tuned for more academy updates 🙏",
                createdAt: mins(140),
                likes: 22,
                likedByMe: false,
            },
        ],
        commentsOpen: false,
        type: "post",
        tags: ["community", "youth"],
    },
    {
        id: "p5",
        author: KOFI,
        content:
            "Who's travelling for the away match in Accra next weekend? Let's organise a supporters' bus! Drop a 🙋 in the comments if you're interested and I'll put a list together.",
        createdAt: mins(300),
        reactions: initialReactions(28, 15, 9),
        comments: [
            { id: "c6", author: KWAME, content: "🙋 Count me in!", createdAt: mins(290), likes: 3, likedByMe: false },
            { id: "c7", author: AMA, content: "🙋 Me and my sister!", createdAt: mins(280), likes: 2, likedByMe: false },
            { id: "c8", author: ABENA, content: "🙋 I'm in! How much for the bus?", createdAt: mins(250), likes: 1, likedByMe: false },
        ],
        commentsOpen: false,
        type: "post",
        tags: ["supporters", "away-game"],
    },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function formatRelativeTime(isoString: string): string {
    const diff = Date.now() - new Date(isoString).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
}

export function getInitials(name: string): string {
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export function makeGuestAuthor(user: User): PostAuthor {
    return {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        badge: user.role === "admin" ? "Moderator" : "Fan",
    };
}

export const REACTION_META: Record<string, { emoji: string; label: string }> = {
    like: { emoji: "👍", label: "Like" },
    fire: { emoji: "🔥", label: "Fire" },
    heart: { emoji: "❤️", label: "Heart" },
    celebrate: { emoji: "🎉", label: "Celebrate" },
};
