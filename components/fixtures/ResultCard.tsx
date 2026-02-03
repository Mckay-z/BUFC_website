import { MatchFixture, GPLClub } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";

interface ResultCardProps {
    result: MatchFixture;
    homeClubData?: GPLClub | null;
    awayClubData?: GPLClub | null;
}

export default function ResultCard({ result, homeClubData, awayClubData }: ResultCardProps) {
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

    const date = new Date(result.matchDate);
    const day = date.getDate().toString().padStart(2, '0');

    return (
        <div className="flex items-center justify-between group py-2 transition-all">
            {/* Date and Names */}
            <div className="flex items-center gap-4">
                <span className="text-[28px] font-bold text-[#1A1A1A] tabular-nums tracking-tighter w-8">{day}</span>
                <div className="flex flex-col">
                    <span className="text-[11px] font-medium text-neutral-400 leading-tight uppercase tracking-tight truncate w-[85px]">
                        {result.homeTeam}
                    </span>
                    <span className="text-[11px] font-medium text-neutral-400 leading-tight uppercase tracking-tight truncate w-[85px]">
                        {result.awayTeam}
                    </span>
                </div>
            </div>

            {/* Score and Logos */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    {/* Logos */}
                    <div className="flex items-center gap-1.5">
                        <div className="relative w-7 h-7">
                            {homeClubData?.clubLogo ? (
                                <Image
                                    src={urlFor(homeClubData.clubLogo).width(56).height(56).url()}
                                    alt={result.homeTeam}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="bg-neutral-100 rounded-full w-full h-full" />
                            )}
                        </div>

                        {/* Score */}
                        <div className="flex items-center gap-2 font-bold text-[#1A1A1A] text-[13px] px-2">
                            <span>{result.homeScore}</span>
                            <span className="text-neutral-300">-</span>
                            <span>{result.awayScore}</span>
                        </div>

                        <div className="relative w-7 h-7">
                            {awayClubData?.clubLogo ? (
                                <Image
                                    src={urlFor(awayClubData.clubLogo).width(56).height(56).url()}
                                    alt={result.awayTeam}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="bg-neutral-100 rounded-full w-full h-full" />
                            )}
                        </div>
                    </div>
                </div>

                {/* Status Dot */}
                <div className={`${statusColors[status]} w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0`}>
                    {status}
                </div>
            </div>
        </div>
    );
}
