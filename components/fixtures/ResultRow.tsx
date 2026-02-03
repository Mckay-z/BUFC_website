"use client";

import { MatchFixture, GPLClub } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ImageFallback from "../ui/ImageFallback";
import Link from "next/link";

interface ResultRowProps {
    result: MatchFixture;
    homeClubData?: GPLClub | null;
    awayClubData?: GPLClub | null;
}

export default function ResultRow({ result, homeClubData, awayClubData }: ResultRowProps) {
    const bechemName = "Bechem United FC";
    const isBechemHome = result.homeTeam === bechemName;
    const bechemScore = isBechemHome ? result.homeScore : result.awayScore;
    const opponentScore = isBechemHome ? result.awayScore : result.homeScore;

    let status: "W" | "D" | "L" = "D";
    if (bechemScore !== undefined && opponentScore !== undefined) {
        if (bechemScore > opponentScore) status = "W";
        else if (bechemScore < opponentScore) status = "L";
    }

    const statusColors = {
        W: "bg-[#22C55E]",
        D: "bg-[#D4D4D4]",
        L: "bg-[#EF4444]",
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="relative bg-white border border-neutral-1 rounded-[32px] p-4 md:px-12 md:py-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                {/* Competition info - Left side mobile, top left desktop */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="w-5 h-5 relative">
                        <Image src="/img/gpl_logo.png" alt="Competition" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-tight">{result.competition || "Ghana Premier League"}</span>
                        <span className="text-[10px] font-medium text-neutral-400">{formatDate(result.matchDate)}</span>
                    </div>
                </div>

                {/* Matchup Center */}
                <div className="flex-1 flex items-center justify-center gap-4 md:gap-12">
                    <div className="flex items-center gap-4 flex-1 justify-end">
                        <span className="text-[14px] md:text-[16px] font-bold text-neutral-400 text-right hidden sm:block">
                            {result.homeTeam}
                        </span>
                        <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                            {homeClubData?.clubLogo ? (
                                <Image
                                    src={urlFor(homeClubData.clubLogo).width(80).height(80).url()}
                                    alt={result.homeTeam}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <ImageFallback icon="mdi:shield" width="32" height="32" />
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 font-black text-2xl md:text-3xl text-neutral-800">
                        <span>{result.homeScore}</span>
                        <span className="text-neutral-200">-</span>
                        <span>{result.awayScore}</span>
                    </div>

                    <div className="flex items-center gap-4 flex-1 justify-start">
                        <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0">
                            {awayClubData?.clubLogo ? (
                                <Image
                                    src={urlFor(awayClubData.clubLogo).width(80).height(80).url()}
                                    alt={result.awayTeam}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <ImageFallback icon="mdi:shield" width="32" height="32" />
                            )}
                        </div>
                        <span className="text-[14px] md:text-[16px] font-bold text-neutral-800 hidden sm:block">
                            {result.awayTeam}
                        </span>
                    </div>
                </div>

                {/* Right side info: Status and Highlights */}
                <div className="flex items-center gap-6 shrink-0">
                    <Link href="/gallery" className="text-[11px] font-bold text-prim-8 whitespace-nowrap hover:underline underline-offset-4 flex items-center gap-1 group">
                        Watch Highlights
                        <Icon icon="mdi:arrow-top-right" className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <div className={`${statusColors[status]} text-white w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-black/5`}>
                        {status}
                    </div>
                </div>
            </div>
        </div>
    );
}
