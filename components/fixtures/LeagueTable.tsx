"use client";

import { TableEntry } from "@/lib/mockTableData";
import { Icon } from "@iconify/react";
import NextImage from "next/image";
import { urlFor } from "@/lib/sanity.client";

interface LeagueTableProps {
    data: TableEntry[];
}

export default function LeagueTable({ data }: LeagueTableProps) {
    const getStatusColor = (status: "W" | "D" | "L") => {
        switch (status) {
            case "W": return "bg-green-500";
            case "D": return "bg-neutral-400";
            case "L": return "bg-red-500";
            default: return "bg-neutral-300";
        }
    };

    return (
        <div className="w-full overflow-x-auto rounded-[24px] border border-neutral-2 shadow-sm bg-white">
            <table className="w-full text-left border-collapse">
                <thead className="bg-prim-9 text-white">
                    <tr>
                        <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Pos.</th>
                        <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider">Team</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">GP</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">W</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">D</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">L</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">GF</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">GA</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">GD</th>
                        <th className="px-4 py-5 text-sm font-bold uppercase tracking-wider text-center">Pts</th>
                        <th className="px-6 py-5 text-sm font-bold uppercase tracking-wider text-center">Last 5</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr
                            key={entry.rank}
                            className={`border-b border-neutral-1 transition-colors hover:bg-neutral-50 ${entry.isHighlight ? "bg-prim-1/10 font-bold" : ""}`}
                        >
                            <td className="px-6 py-4 text-sm font-bold text-neutral-text">{entry.rank}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {/* Team Logo */}
                                    <div className="w-8 h-8 rounded-full bg-neutral-1 flex items-center justify-center shrink-0 overflow-hidden relative">
                                        {entry.teamLogo ? (
                                            <NextImage
                                                src={urlFor(entry.teamLogo).width(32).height(32).url()}
                                                alt={entry.teamName}
                                                fill
                                                className="object-contain"
                                            />
                                        ) : (
                                            <Icon icon="mdi:shield-outline" className="text-neutral-4 w-5 h-5" />
                                        )}
                                    </div>
                                    <span className={`text-sm md:text-base ${entry.isHighlight ? "text-primary font-black scale-105" : "text-neutral-text"}`}>
                                        {entry.teamName}
                                    </span>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-center font-medium text-neutral-text">{entry.played}</td>
                            <td className="px-4 py-4 text-sm text-center font-medium text-neutral-text">{entry.won}</td>
                            <td className="px-4 py-4 text-sm text-center font-medium text-neutral-text">{entry.drawn}</td>
                            <td className="px-4 py-4 text-sm text-center font-medium text-neutral-text">{entry.lost}</td>
                            <td className="px-4 py-4 text-sm text-center text-neutral-5 font-medium">{entry.gf}</td>
                            <td className="px-4 py-4 text-sm text-center text-neutral-5 font-medium">{entry.ga}</td>
                            <td className="px-4 py-4 text-sm text-center font-bold text-neutral-text">
                                {entry.gd > 0 ? `+${entry.gd}` : entry.gd}
                            </td>
                            <td className="px-4 py-4 text-sm text-center font-black text-primary">{entry.points}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-1.5">
                                    {entry.lastFive.map((status, i) => (
                                        <div
                                            key={i}
                                            className={`${getStatusColor(status)} w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-[10px] md:text-[11px] font-black text-white shadow-sm`}
                                            title={status === "W" ? "Win" : status === "D" ? "Draw" : "Loss"}
                                        >
                                            {status}
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
