import { client } from "@/lib/sanity.client";
import { playersQuery, playersPageSettingsQuery } from "@/lib/sanity.queries";
import { Player, PlayersPageSettings } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import PlayersGrid from "@/components/pages/PlayersGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Players | Bechem United FC",
  description:
    "Meet the Bechem United FC squad - our talented players for the season",
};

export const revalidate = 60;

export default async function PlayersPage() {
  const [settings, players] = await Promise.all([
    client.fetch<PlayersPageSettings>(playersPageSettingsQuery),
    client.fetch<Player[]>(playersQuery),
  ]);

  return (
    <main className="bg-neutral-1">
      {/* Page Header with Banner */}
      {settings?.pageBanner ? (
        <PageHeader
          title={settings.pageTitle || "Players"}
          backgroundImage={settings.pageBanner}
        />
      ) : (
        <div className="bg-prim-3 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Players</h1>
        </div>
      )}

      {/* Players Grid with Search */}
      <PlayersGrid
        allPlayers={players}
        searchPlaceholder={
          settings?.inputPlaceholderText || "Search by name or jersey number"
        }
      />
    </main>
  );
}
