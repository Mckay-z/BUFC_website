"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import NextImage from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeader from "@/components/layout/SectionHeader";
import FixtureCard from "@/components/ui/FixtureCard";
import FixtureHero from "@/components/fixtures/FixtureHero";
import FixtureRow from "@/components/fixtures/FixtureRow";
import ResultRow from "@/components/fixtures/ResultRow";
import ResultCard from "@/components/fixtures/ResultCard";
import LeagueTable from "@/components/fixtures/LeagueTable";
import { FixturesPageSettings, MatchFixture, GPLClub, FixtureWithClubData } from "@/lib/types";
import { TableEntry } from "@/lib/mockTableData";

interface FixturesContentProps {
    settings: FixturesPageSettings;
    enrichedUpcoming: FixtureWithClubData[];
    finishedFixtures: MatchFixture[];
    clubMap: Map<string, GPLClub>;
    stats: {
        played: number;
        won: number;
        drawn: number;
        lost: number;
    };
    initialTab?: string;
    leagueTable: TableEntry[];
}

const TABS = [
    { id: "fixtures", label: "Fixtures" },
    { id: "results", label: "Results" },
    { id: "table", label: "League Table" },
];

export default function FixturesContent({
    settings,
    enrichedUpcoming,
    finishedFixtures,
    clubMap,
    stats,
    initialTab = "fixtures",
    leagueTable,
}: FixturesContentProps) {
    const [activeTab, setActiveTab] = useState(initialTab);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [resultsViewMode, setResultsViewMode] = useState<"month" | "season">("season");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSeason, setSelectedSeason] = useState("2025/26");
    const resultsScrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = (direction: 'left' | 'right') => {
        if (resultsScrollRef.current) {
            const scrollAmount = resultsScrollRef.current.offsetWidth * 0.8;
            resultsScrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    // Helper: Grouping by Month
    const groupMatchByMonth = <T extends { matchDate?: string; date?: string }>(matches: T[]) => {
        return matches.reduce((acc, match) => {
            const date = new Date(match.matchDate || match.date || "");
            const month = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            if (!acc[month]) acc[month] = [];
            acc[month].push(match);
            return acc;
        }, {} as Record<string, T[]>);
    };

    const filteredFixtures = useMemo(() => {
        if (!searchTerm) return enrichedUpcoming;
        const lowSearch = searchTerm.toLowerCase();
        return enrichedUpcoming.filter(f =>
            f.homeTeam.toLowerCase().includes(lowSearch) ||
            f.awayTeam.toLowerCase().includes(lowSearch) ||
            f.competition?.toLowerCase().includes(lowSearch)
        );
    }, [enrichedUpcoming, searchTerm]);

    const filteredResults = useMemo(() => {
        if (!searchTerm) return finishedFixtures;
        const lowSearch = searchTerm.toLowerCase();
        return finishedFixtures.filter(f =>
            f.homeTeam.toLowerCase().includes(lowSearch) ||
            f.awayTeam.toLowerCase().includes(lowSearch) ||
            f.competition?.toLowerCase().includes(lowSearch)
        );
    }, [finishedFixtures, searchTerm]);

    const groupedFixtures = useMemo(() => groupMatchByMonth(filteredFixtures), [filteredFixtures]);
    const groupedResults = useMemo(() => groupMatchByMonth(filteredResults), [filteredResults]);
    const nextFixture = enrichedUpcoming.length > 0 ? enrichedUpcoming[0] : null;

    return (
        <div className="bg-[#F1EFF6] min-h-screen font-montserrat overflow-hidden">
            {/* Integrated Page Header with Tabs */}
            <PageHeader
                title={settings?.fixturesPageTitle || "Fixtures & Results"}
                backgroundImage={settings?.fixturesPageBannerImage}
                tabs={TABS}
                activeTabId={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="container-wide py-12 md:py-24 animate-in fade-in duration-700">

                {/* TAB: FIXTURES */}
                {activeTab === "fixtures" && (
                    <div className="space-y-20 md:space-y-32">
                        {/* Hero Section */}
                        {nextFixture && <FixtureHero nextFixture={nextFixture} />}

                        {/* Section Header & Filters */}
                        <div className="flex flex-col gap-10">
                            <div className="flex flex-col md:flex-row items-end justify-between gap-6">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-[28px] md:text-[36px] font-bold text-[#1A1A1A] tracking-tight">
                                        What&apos;s ahead
                                    </h2>
                                    <p className="text-[16px] md:text-[18px] font-medium text-neutral-400">
                                        Mark your calendar for these upcoming clashes
                                    </p>
                                </div>

                                {/* View Switcher */}
                                <div className="flex items-center bg-white border border-neutral-2 p-1.5 rounded-full shadow-sm shadow-black/5">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'grid' ? 'bg-[#2A165F] text-white shadow-lg' : 'text-neutral-3 hover:text-neutral-5'}`}
                                    >
                                        <Icon icon="mdi:grid-large" className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 rounded-full transition-all duration-300 ${viewMode === 'list' ? 'bg-[#2A165F] text-white shadow-lg' : 'text-neutral-3 hover:text-neutral-5'}`}
                                    >
                                        <Icon icon="mdi:format-list-bulleted" className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Grouped Fixtures */}
                            <div className="space-y-24">
                                {Object.entries(groupedFixtures).map(([month, matches]) => (
                                    <FixtureMonthSection
                                        key={month}
                                        month={month}
                                        matches={matches}
                                        viewMode={viewMode}
                                        fixtureRowRenderer={(f) => <FixtureRow key={f.id} fixture={f} />}
                                    />
                                ))}

                                {filteredFixtures.length === 0 && (
                                    <div className="text-center py-32 bg-white border border-neutral-2 border-dashed rounded-[32px]">
                                        <Icon icon="mdi:calendar-blank" className="w-16 h-16 text-neutral-2 mx-auto mb-6" />
                                        <p className="text-neutral-5 font-black uppercase tracking-[0.2em] text-xs">No fixtures found matching your search</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: RESULTS */}
                {activeTab === "results" && (
                    <div className="space-y-16">
                        {/* Filters Header */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search teams, months or season..."
                                    className="w-full bg-white border border-neutral-2 rounded-xl py-4 px-12 text-sm focus:outline-none focus:ring-2 focus:ring-prim-9/20 transition-all font-medium"
                                />
                                <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-4 w-5 h-5" />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                    >
                                        <Icon icon="mdi:close-circle" className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-white border border-neutral-2 p-1 rounded-full flex items-center shadow-sm">
                                    <button
                                        onClick={() => setResultsViewMode("month")}
                                        className={`px-8 py-2.5 rounded-full text-[12px] font-bold transition-all ${resultsViewMode === "month" ? "bg-[#2A165F] text-white shadow-lg" : "text-neutral-4 hover:text-neutral-6"}`}
                                    >
                                        Month
                                    </button>
                                    <button
                                        onClick={() => setResultsViewMode("season")}
                                        className={`px-8 py-2.5 rounded-full text-[12px] font-bold transition-all ${resultsViewMode === "season" ? "bg-[#2A165F] text-white shadow-lg" : "text-neutral-4 hover:text-neutral-6"}`}
                                    >
                                        Season
                                    </button>
                                </div>

                                <div className="relative group">
                                    <select
                                        value={selectedSeason}
                                        onChange={(e) => setSelectedSeason(e.target.value)}
                                        className="appearance-none bg-white border border-neutral-2 px-6 py-3 pr-10 rounded-xl text-[12px] font-bold text-neutral-800 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-prim-9/20 transition-all font-montserrat"
                                    >
                                        <option value="2025/26">2025/26</option>
                                        <option value="2024/25">2024/25</option>
                                    </select>
                                    <Icon icon="mdi:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-4 pointer-events-none group-hover:translate-y-[-40%] transition-transform" />
                                </div>
                            </div>
                        </div>

                        {/* Month View Sub-Header */}
                        <div className="mb-12">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-4 w-full">
                                    <h2 className="text-[14px] font-bold text-neutral-400 uppercase tracking-widest whitespace-nowrap">{selectedSeason} SEASON</h2>
                                    <div className="h-[2px] bg-indigo-900/40 w-[120px]" />
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleScroll('left')}
                                        className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-all disabled:opacity-30"
                                        disabled={resultsViewMode === "month"}
                                    >
                                        <Icon icon="mdi:arrow-left" className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleScroll('right')}
                                        className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400 hover:border-neutral-400 hover:text-neutral-600 transition-all disabled:opacity-30"
                                        disabled={resultsViewMode === "month"}
                                    >
                                        <Icon icon="mdi:arrow-right" className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {resultsViewMode === "month" ? (
                            <div className="space-y-24">
                                {Object.entries(groupedResults).map(([month, matches]) => (
                                    <div key={month} className="space-y-10">
                                        <SectionHeader
                                            title={month}
                                            showLine={true}
                                            uppercase={true}
                                        />

                                        <div className="flex flex-col gap-6">
                                            {matches.map((f) => (
                                                <ResultRow
                                                    key={f._id}
                                                    result={f}
                                                    homeClubData={clubMap.get(f.homeTeam)}
                                                    awayClubData={clubMap.get(f.awayTeam)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Stats Section */}
                                <div className="flex items-center justify-center md:justify-start gap-0 bg-transparent mb-20 max-w-5xl mx-auto md:mx-0">
                                    {[
                                        { label: "Matches played", value: stats.played },
                                        { label: "Won", value: stats.won },
                                        { label: "Draws", value: stats.drawn },
                                        { label: "Losses", value: stats.lost },
                                    ].map((stat, idx) => (
                                        <div key={stat.label} className="flex flex-col items-center justify-center px-12 py-4 relative first:pl-0">
                                            <span className="text-[32px] font-bold text-[#1A1A1A] tabular-nums leading-none tracking-tight">{stat.value}</span>
                                            <span className="text-[14px] font-medium text-neutral-400 mt-2">{stat.label}</span>
                                            {idx < 3 && (
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1.5px] h-12 bg-neutral-200" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Monthly Result Buckets */}
                                <div
                                    ref={resultsScrollRef}
                                    className="flex overflow-x-auto gap-8 pb-10 scrollbar-hide snap-x"
                                >
                                    {Object.entries(groupedResults).reverse().map(([month, matches]) => (
                                        <div key={month} className="shrink-0 w-[400px] bg-white rounded-[32px] p-8 shadow-xl shadow-black/5 snap-start border border-neutral-50">
                                            <div className="flex items-center justify-between mb-8">
                                                <h3 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight">{month}</h3>
                                                <span className="text-[14px] font-medium text-neutral-400">{matches.length} Matches</span>
                                            </div>
                                            <div className="space-y-6">
                                                {matches.map((f) => (
                                                    <ResultCard
                                                        key={f._id}
                                                        result={f}
                                                        homeClubData={clubMap.get(f.homeTeam)}
                                                        awayClubData={clubMap.get(f.awayTeam)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {filteredResults.length === 0 && (
                                    <div className="text-center py-32 bg-white border border-neutral-2 border-dashed rounded-[32px]">
                                        <Icon icon="mdi:magnify-close" className="w-16 h-16 text-neutral-2 mx-auto mb-6" />
                                        <p className="text-neutral-5 font-black uppercase tracking-[0.2em] text-xs">No matches found for &quot;{searchTerm}&quot;</p>
                                    </div>
                                )}
                            </>
                        )}

                        {/* View More */}
                        <div className="flex justify-end pt-4">
                            <Link href="/results" className="flex items-center gap-2 group text-neutral-400 hover:text-prim-9 transition-colors">
                                <span className="text-[14px] font-medium">View More</span>
                                <div className="w-6 h-6 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-prim-9 transition-colors">
                                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {/* TAB: LEAGUE TABLE */}
                {activeTab === "table" && (
                    <div className="space-y-20">
                        <SectionHeader
                            title="League Table"
                            subtext="Ghana Premier League 2025/26 Season Standings"
                            showLine
                            uppercase
                        >
                            {/* Season Selector */}
                            <div className="flex items-center bg-white border border-neutral-2 p-1 rounded-full shadow-sm">
                                {['2025/26', '2024/25'].map(season => (
                                    <button
                                        key={season}
                                        onClick={() => setSelectedSeason(season)}
                                        className={`px-6 py-2.5 rounded-full text-[10px] font-black transition-all uppercase tracking-widest ${season === selectedSeason ? 'bg-prim-9 text-white shadow-lg' : 'text-neutral-4 hover:text-neutral-6'}`}
                                    >
                                        {season}
                                    </button>
                                ))}
                            </div>
                        </SectionHeader>

                        <div className="bg-white p-8 md:p-12 shadow-2xl border border-neutral-3 overflow-hidden">
                            <LeagueTable data={leagueTable} />
                        </div>

                    </div>
                )}
            </div>

            {/* FOOTER CTA SECTION */}
            <section className="bg-white pt-16 md:pt-40 pb-[100px]">
                <div className="container-wide px-6 sm:px-10">
                    <div className="bg-[#F1EFF6] rounded-[40px] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 lg:gap-16 relative overflow-hidden">
                        {/* Decorative pattern */}
                        <div className="absolute top-0 right-0 w-64 h-64 opacity-15 pointer-events-none">
                            <NextImage
                                src="/img/cta_pattern.png"
                                alt="Decorative pattern"
                                fill
                                className="object-contain object-top-right translate-x-12 -translate-y-12"
                            />
                        </div>

                        <div className="flex flex-col gap-2 text-center lg:text-left max-w-xl relative z-10">
                            <h2 className="text-[24px] font-medium text-[#1A1A1A] leading-[38px] tracking-normal">
                                Stream live matches or watch highlights <br className="hidden md:block" /> from previous games
                            </h2>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 relative z-10 w-full lg:w-auto">
                            <Link
                                href="/live"
                                className="bg-[#3F2A78] text-white px-8 md:px-10 py-4.5 rounded-full font-bold flex items-center justify-center gap-3 hover:bg-[#2D1E56] transition-all shadow-[0_10px_30px_-10px_rgba(63,42,120,0.5)] active:scale-95 whitespace-nowrap w-full sm:w-auto"
                            >
                                Watch Live
                                <Icon icon="ph:broadcast-bold" className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/pastHighlights"
                                className="text-[#3F2A78] font-bold flex items-center justify-center gap-1.5 hover:translate-x-1 transition-all group whitespace-nowrap"
                            >
                                View Highlights
                                <Icon icon="mdi:arrow-top-right" className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function FixtureMonthSection({
    month,
    matches,
    viewMode,
    fixtureRowRenderer
}: {
    month: string,
    matches: FixtureWithClubData[],
    viewMode: "grid" | "list",
    fixtureRowRenderer: (f: FixtureWithClubData) => React.ReactNode
}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        window.addEventListener("load", checkScroll);
        // Initial delay to ensure everything is rendered
        const timer = setTimeout(checkScroll, 500);
        return () => {
            window.removeEventListener("resize", checkScroll);
            window.removeEventListener("load", checkScroll);
            clearTimeout(timer);
        };
    }, [matches, viewMode]);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 420; // Approx FixtureCard width + gap
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="space-y-10">
            <SectionHeader
                title={month}
                showLine={true}
                uppercase={true}
            >
                {viewMode === "grid" && (canScrollLeft || canScrollRight) && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${canScrollLeft
                                ? "bg-prim-9 text-white shadow-lg cursor-pointer hover:bg-prim-10"
                                : "bg-neutral-1 text-neutral-4 cursor-not-allowed opacity-50"
                                }`}
                        >
                            <Icon icon="mdi:chevron-left" className="w-6 h-6" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${canScrollRight
                                ? "bg-prim-9 text-white shadow-lg cursor-pointer hover:bg-prim-10"
                                : "bg-neutral-1 text-neutral-4 cursor-not-allowed opacity-50"
                                }`}
                        >
                            <Icon icon="mdi:chevron-right" className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </SectionHeader>

            {viewMode === "grid" ? (
                <div className="relative group/scroll">
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 md:gap-10 pb-10"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {matches.map((f) => (
                            <div key={f.id} className="shrink-0 snap-start">
                                <FixtureCard fixture={f} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {matches.map(fixtureRowRenderer)}
                </div>
            )}
        </div>
    );
}
