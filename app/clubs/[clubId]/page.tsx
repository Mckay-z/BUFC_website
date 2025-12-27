import { client, urlFor } from "@/lib/sanity.client";
import { singleClubQuery } from "@/lib/sanity.queries";
import { GPLClub } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ClubDetailPage({
  params,
}: {
  params: { clubId: string };
}) {
  const club = await client.fetch<GPLClub>(singleClubQuery, {
    clubId: params.clubId,
  });

  if (!club) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-green-700 to-yellow-600 text-white py-16 mb-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Club Logo */}
            {club.clubLogo && (
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <Image
                  src={urlFor(club.clubLogo).width(200).url()}
                  alt={club.clubName}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            )}

            {/* Club Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4">{club.clubName}</h1>
              <div className="flex flex-wrap gap-6 text-lg justify-center md:justify-start">
                {club.founded && (
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>Founded {club.founded}</span>
                  </div>
                )}
                {club.stadium && (
                  <div className="flex items-center gap-2">
                    <span>🏟️</span>
                    <span>{club.stadium}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      club.isActive ? "bg-green-400" : "bg-gray-400"
                    }`}
                  ></span>
                  <span>{club.isActive ? "Active" : "Inactive"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Back Button */}
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-8 hover:underline"
        >
          <span>←</span>
          <span>Back to Clubs</span>
        </Link>

        {/* Club Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About {club.clubName}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {club.clubName} is a professional football club competing in the
            Ghana Premier League.{" "}
            {club.stadium && `They play their home matches at ${club.stadium}.`}
            {club.founded && ` The club was founded in ${club.founded}.`}
          </p>
        </div>
      </div>
    </div>
  );
}
