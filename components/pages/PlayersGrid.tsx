"use client";

import { Player } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PlayersGridProps {
  allPlayers: Player[];
  searchPlaceholder: string;
}

// Split name into first word and rest for better display
const splitName = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  return {
    firstName: parts[0],
    restName: parts.slice(1).join(" "),
  };
};

const PlayerCard = ({ player }: { player: Player }) => {
  const { firstName, restName } = splitName(player.fullName);

  return (
    <Link
      href={`/players/${player.jerseyNumber}`}
      className="group relative overflow-hidden rounded-[20px] bg-neutral-2 border border-neutral-3 hover:border-prim-3 transition-all duration-300 hover:shadow-lg"
    >
      {/* Player Image */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-3">
        {player.photo ? (
          <Image
            src={urlFor(player.photo).width(400).height(533).url()}
            alt={player.fullName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-neutral-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      </div>

      {/* Player Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-bold px-3 py-1 bg-prim-3 rounded-full">
            #{player.jerseyNumber}
          </span>
          <span className="text-xs font-medium text-neutral-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {player.positionDetail ||
              player.position.charAt(0).toUpperCase() +
                player.position.slice(1)}
          </span>
        </div>
        <h3 className="text-lg md:text-xl font-bold leading-tight">
          {firstName}
          {restName && (
            <>
              <br />
              <span className="text-base">{restName}</span>
            </>
          )}
        </h3>
        {player.nationality && (
          <p className="text-xs text-neutral-3 mt-1">{player.nationality}</p>
        )}
      </div>
    </Link>
  );
};

const PositionSection = ({
  title,
  players,
  colorClass,
}: {
  title: string;
  players: Player[];
  colorClass: string;
}) => {
  if (players.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-1 w-16 ${colorClass} rounded`} />
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-text uppercase tracking-wide">
          {title}
        </h2>
        <div className={`h-1 flex-1 ${colorClass} opacity-20 rounded`} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default function PlayersGrid({
  allPlayers,
  searchPlaceholder,
}: PlayersGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter players by search query (name or jersey number)
  const filteredPlayers = allPlayers.filter(
    (player) =>
      player.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.jerseyNumber.toString().includes(searchQuery)
  );

  // Group players by position
  const goalkeepers = filteredPlayers.filter(
    (p) => p.position === "goalkeeper"
  );
  const defenders = filteredPlayers.filter((p) => p.position === "defender");
  const midfielders = filteredPlayers.filter(
    (p) => p.position === "midfielder"
  );
  const forwards = filteredPlayers.filter((p) => p.position === "forward");

  return (
    <section className="container-wide py-12 md:py-16">
      {/* Search Bar */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 pr-14 rounded-full border-2 border-neutral-4 focus:border-prim-3 focus:outline-none bg-neutral-2 text-neutral-text placeholder-neutral-6 transition-colors"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-prim-3 hover:bg-prim-4 text-white p-3 rounded-full transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Players Grouped by Position */}
      {filteredPlayers.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="w-16 h-16 text-neutral-5 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-neutral-6 text-xl">
            No players found matching &quot;{searchQuery}&quot;
          </p>
          <p className="text-neutral-6 text-sm mt-2">
            Try searching by name or jersey number
          </p>
        </div>
      ) : (
        <>
          <PositionSection
            title="Goalkeepers"
            players={goalkeepers}
            colorClass="bg-blue-500"
          />
          <PositionSection
            title="Defenders"
            players={defenders}
            colorClass="bg-green-500"
          />
          <PositionSection
            title="Midfielders"
            players={midfielders}
            colorClass="bg-purple-500"
          />
          <PositionSection
            title="Forwards"
            players={forwards}
            colorClass="bg-red-500"
          />
        </>
      )}

      {/* Results Count */}
      {searchQuery && (
        <div className="text-center mt-8 text-neutral-6">
          Showing {filteredPlayers.length} of {allPlayers.length} players
        </div>
      )}
    </section>
  );
}
