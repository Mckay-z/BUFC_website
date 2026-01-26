import { client, urlFor } from "@/lib/sanity.client";
import { singlePlayerQuery } from "@/lib/sanity.queries";
import { Player } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Revalidate every 60 seconds
export const revalidate = 60;

interface PlayerPageProps {
  params: Promise<{ number: string }>;
}

// Helper function to get country code from country name
async function getCountryCode(countryName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`,
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data[0]?.cca2?.toLowerCase() || null;
  } catch (error) {
    console.error("Error fetching country code:", error);
    return null;
  }
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const resolvedParams = await params;

  const player = await client.fetch<Player>(singlePlayerQuery, {
    number: parseInt(resolvedParams.number),
  });

  if (!player) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Player not found
          </h1>
          <p className="text-gray-600 mb-6">
            The player you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/players"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  // Get country code for flag
  const countryCode = player.nationality
    ? await getCountryCode(player.nationality)
    : null;

  return (
    <div className="container mx-auto p-8">
      {/* PLAYER HEADER */}
      <div className="flex gap-8 mb-12">
        {player.photo && (
          <Image
            src={urlFor(player.photo).width(400).url()}
            alt={player.fullName}
            width={400}
            height={500}
            className="rounded-lg shadow-lg"
          />
        )}
        <div>
          <h1 className="text-5xl font-bold mb-4">{player.fullName}</h1>
          <p className="text-2xl text-gray-600 mb-2">
            #{player.jerseyNumber} • {player.position}
          </p>
          {/* Country with Flag */}
          <div className="flex items-center gap-2">
            {countryCode && (
              <Image
                src={`https://flagcdn.com/w40/${countryCode}.png`}
                alt={`${player.nationality} flag`}
                width={24}
                height={24}
                className="rounded-full object-cover"
              />
            )}
            <p className="text-lg">{player.nationality}</p>
          </div>
        </div>
      </div>

      {/* STATISTICS */}
      {player.commonStatistics && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard
              value={player.commonStatistics.matchesPlayed || 0}
              label="Matches"
            />
            <StatCard
              value={player.commonStatistics.goalsScored || 0}
              label="Goals"
            />
            <StatCard
              value={player.commonStatistics.assists || 0}
              label="Assists"
            />
            <StatCard
              value={player.commonStatistics.yellowCards || 0}
              label="Yellow Cards"
            />
            <StatCard
              value={player.commonStatistics.redCards || 0}
              label="Red Cards"
            />
          </div>
        </div>
      )}

      {/* CAREER HISTORY */}
      {player.careerExperience && player.careerExperience.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-6">Career History</h2>
          <div className="space-y-4">
            {player.careerExperience.map((career, index) => {
              const clubName = career.isGPLClub
                ? career.gplClubReference?.clubName
                : career.customClubName;

              const clubLogo = career.isGPLClub
                ? career.gplClubReference?.clubLogo
                : career.customClubLogo;

              return (
                <div
                  key={career._key || index}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
                >
                  {clubLogo && (
                    <Image
                      src={urlFor(clubLogo).width(256).url()}
                      alt={clubName || "Club"}
                      width={60}
                      height={60}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{clubName}</h3>
                    {career.role && (
                      <p className="text-gray-600 capitalize">{career.role}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium">
                      {career.startYear} -{" "}
                      {career.isCurrent ? "Present" : career.endYear || ""}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg text-center">
      <div className="text-4xl font-bold text-gray-800">{value}</div>
      <div className="text-sm text-gray-600 mt-2">{label}</div>
    </div>
  );
}
