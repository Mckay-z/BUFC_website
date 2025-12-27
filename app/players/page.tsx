"use client";

import { useEffect, useState } from "react";
import { client, urlFor } from "@/lib/sanity.client";
import { playersQuery } from "@/lib/sanity.queries";
import { Player } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Split name into first word and rest
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
      className="group relative overflow-hidden rounded-2xl bg-linear-to-b from-gray-100 to-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
    >
      {/* Player Image or Placeholder */}
      <div className="relative w-full aspect-3/4 bg-gray-200 overflow-hidden">
        {player.photo ? (
          <Image
            src={urlFor(player.photo).width(400).height(533).url()}
            alt={player.fullName}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-24 h-24 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Player Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-start gap-2 mb-1">
          <span className="text-sm font-medium text-green-400 bg-black/30 px-2 py-1 rounded">
            {player.jerseyNumber} •{" "}
            {player.positionDetail ||
              player.position.charAt(0).toUpperCase() +
                player.position.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-tight">
          {firstName}
          {restName && (
            <>
              <br />
              {restName}
            </>
          )}
        </h3>
      </div>
    </Link>
  );
};

const PositionSection = ({
  title,
  players,
  bgColor,
}: {
  title: string;
  players: Player[];
  bgColor: string;
}) => {
  if (players.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className={`h-1 w-12 ${bgColor} rounded`} />
        <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      const data = await client.fetch<Player[]>(playersQuery);
      setPlayers(data);
      setLoading(false);
    }
    fetchPlayers();
  }, []);

  // Filter players by search query
  const filteredPlayers = players.filter((player) =>
    player.fullName.toLowerCase().includes(searchQuery.toLowerCase())
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

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading squad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-green-700 to-yellow-600 text-white py-12 mb-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">🇬🇭 Players</h1>
          <p className="text-green-100 text-lg">
            Meet the Bechem United FC squad for the 2024/2025 season
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Search Bar */}
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a player by name, number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pr-12 rounded-full border-2 border-gray-300 focus:border-green-500 focus:outline-none shadow-lg text-gray-800 placeholder-gray-400"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors">
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

        {/* Players by Position */}
        {filteredPlayers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">
              No players found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        ) : (
          <>
            <PositionSection
              title="Goalkeepers"
              players={goalkeepers}
              bgColor="bg-green-500"
            />
            <PositionSection
              title="Defenders"
              players={defenders}
              bgColor="bg-blue-500"
            />
            <PositionSection
              title="Midfielders"
              players={midfielders}
              bgColor="bg-purple-500"
            />
            <PositionSection
              title="Forwards"
              players={forwards}
              bgColor="bg-red-500"
            />
          </>
        )}
      </div>
    </div>
  );
}
