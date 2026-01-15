import { client, urlFor } from "@/lib/sanity.client";
import { gplClubsQuery } from "@/lib/sanity.queries";
import { GPLClub } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ClubsPage() {
  const clubs = await client.fetch<GPLClub[]>(gplClubsQuery);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Ghana Premier League Clubs</h1>
        <p className="text-xl text-gray-600">
          Explore all the teams in the Ghana Premier League
        </p>
      </div>

      {/* CLUBS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {clubs.map((club) => (
          <Link
            key={club._id}
            href={`/clubs/${club._id}`}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
          >
            {/* CLUB LOGO */}
            <div className="relative h-48 bg-linear-to-br from-green-50 to-yellow-50 flex items-center justify-center p-8">
              {club.clubLogo && (
                <Image
                  src={urlFor(club.clubLogo).width(200).url()}
                  alt={club.clubName}
                  width={200}
                  height={200}
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              )}
            </div>

            {/* CLUB INFO */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-green-600 transition-colors">
                {club.clubName}
              </h2>

              <div className="space-y-2 text-gray-600">
                {club.founded && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📅</span>
                    <span className="text-sm">Founded: {club.founded}</span>
                  </div>
                )}

                {club.stadium && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">🏟️</span>
                    <span className="text-sm">{club.stadium}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      club.isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  <span className="text-sm">
                    {club.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* VIEW DETAILS BUTTON */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-green-600 font-medium group-hover:underline">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* EMPTY STATE */}
      {clubs.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">
            No Clubs Found
          </h3>
          <p className="text-gray-600">
            Import clubs using the admin panel to get started
          </p>
        </div>
      )}
    </div>
  );
}
