import { client } from "@/lib/sanity.client";
import {
  allMatchHighlightsQuery,
} from "@/lib/sanity.queries";
import { PastHighlightsSettings, MatchHighlight } from "@/lib/types";
import PastHighlightsPage from "@/components/pages/pastHighlightsPage";
import { Metadata } from "next";

// Revalidate every 60 seconds
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Past Highlights | Bechem United FC",
  description:
    "Browse match highlights, player performances, and memorable moments from Bechem United FC. Relive the action from this season and beyond.",
  keywords: [
    "Bechem United highlights",
    "match highlights",
    "GPL highlights",
    "football videos",
    "match replays",
  ],
};

export default async function PastHighlights() {
  const [settings, highlights] = await Promise.all([
    client.fetch<PastHighlightsSettings>(`*[_type == "pastHighlightsSettings"] | order(_updatedAt desc)[0]`),
    client.fetch<MatchHighlight[]>(allMatchHighlightsQuery),
  ]);

  // Default settings in case Sanity data is missing
  const defaultSettings: PastHighlightsSettings = {
    pageTitle: "Past Highlights",
    pageBanner: {} as any,
    sectionTitle: "MATCH ARCHIVES",
    sectionSubtitle:
      "Browse team or player highlights from this season and beyond",
    viewMoreText: "View More",
    watchLiveCard: {
      title: "Don't Miss The Action Live",
      description:
        "Catch every goal, save, and celebration as it happens. Watch our matches live.",
      buttonText: "Watch Live Now",
    },
  };

  return (
    <main>
      <PastHighlightsPage
        settings={settings || defaultSettings}
        highlights={highlights || []}
      />
    </main>
  );
}
