import HomePage from "@/components/pages/homePage";
import { client } from "@/lib/sanity.client";

// Revalidate every 60 seconds
export const revalidate = 60;
import {
  mostRecentNewsQuery,
  homePageSettingsQuery,
  nextFourRecentNewsQuery,
  sponsorSettingsQuery,
  featuredJerseysQuery,
  threeJerseysQuery,
  liveMatchesSettingsQuery,
  newsletterSettingsQuery,
  featuredGalleryImagesQuery,
} from "@/lib/sanity.queries";
import {
  NewsArticle,
  HomePageSettings,
  SponsorSettings,
  Product,
  LiveMatchesSettings,
  NewsletterSettings,
  GalleryImage,
} from "@/lib/types";
import { getUpcomingFixtures } from "@/lib/mockFixtures";
import { enrichFixturesWithClubData } from "@/lib/fixtureHelpers";

export default async function Home() {
  const [
    mostRecentNews,
    nextFourRecentNews,
    settings,
    sponsorSettings,
    jerseysData,
    liveMatchesSettings,
    newsletterSettings,
    highlights,
  ] = await Promise.all([
    client.fetch<NewsArticle>(mostRecentNewsQuery),
    client.fetch<NewsArticle[]>(nextFourRecentNewsQuery),
    client.fetch<HomePageSettings>(homePageSettingsQuery),
    client.fetch<SponsorSettings>(sponsorSettingsQuery),
    client.fetch<{
      homeJersey: Product | null;
      awayJersey: Product | null;
      trainingKit: Product | null;
    }>(featuredJerseysQuery),
    client.fetch<LiveMatchesSettings>(liveMatchesSettingsQuery),
    client.fetch<NewsletterSettings>(newsletterSettingsQuery),
    client.fetch<GalleryImage[]>(featuredGalleryImagesQuery),
  ]);

  // Fetch upcoming fixtures and enrich with club data from Sanity
  const mockFixtures = getUpcomingFixtures(); // Get next 5 fixtures
  const enrichedFixtures = await enrichFixturesWithClubData(mockFixtures);

  // Separate the next fixture and remaining fixtures
  const nextFixture = enrichedFixtures[0];
  const upcomingFixtures = enrichedFixtures.slice(1);

  // Prepare featured products - prioritize specific jersey types
  let featuredProducts: Product[] = [];

  // Check if we have all three specific jersey types
  if (
    jerseysData?.homeJersey &&
    jerseysData?.awayJersey &&
    jerseysData?.trainingKit
  ) {
    // We have all three specific types
    featuredProducts = [
      jerseysData.homeJersey,
      jerseysData.awayJersey,
      jerseysData.trainingKit,
    ];
  } else {
    // Fallback: fetch any 3 products from jerseys category
    const jerseysFallback = await client.fetch<Product[]>(threeJerseysQuery);
    featuredProducts = jerseysFallback || [];
  }

  // Fallback settings if none exist in Sanity
  const defaultSettings: HomePageSettings = {
    heroNewsBtnText: "Full Story",
    newsSectionTitle: "LATEST FROM HUNTERS",
    newsSectionSubtext:
      "Stay updated with the latest news, match reports, and announcements from Bechem United FC",
    newsContentTitle: "NEWS & UPDATES",
    newsContentSubtext:
      "Welcome to the home of Bechem United FC news. Here you'll find everything from match day coverage and player spotlights to community initiatives and youth development programs that define who we are.\n\nThe Hunters are more than a team—we're a community. Stay updated with news that matters, from the pitch to the people who make this club special.",
    newsContentBtnText: "Discover More",
    fixtureSectionTitle: "UPCOMING FIXTURES",
    fixtureSectionSubtext:
      "Don't miss a moment of the action. Check out our upcoming matches and get your tickets early.",
    moreFixturesTitle: "What's Ahead",
    moreFixturesSubtext: "Mark your calendar for these upcoming clashes",
    fixtureSectionBtnText: "Full Schedule",
    shopSectionTitle: "OUR CLUB STORE",
    shopSectionSubtext:
      "Discover the latest official merchandise, new collections, and exclusive Bechem United FC store updates.",
    shopSectionBtnText: "Visit Store",
    photoHighlightsTitle: "PHOTO HIGHLIGHTS",
    photoHighlightsSubtext:
      "Relive the best moments from recent matches, training sessions, and club events.",
    photoHighlightsBtnText: "Explore Gallery",
  };

  return (
    <main>
      <HomePage
        heroNews={mostRecentNews}
        liveMatchesSettings={liveMatchesSettings}
        newsletterSettings={newsletterSettings}
        nextFourRecentNews={nextFourRecentNews}
        settings={settings || defaultSettings}
        sponsorSettings={sponsorSettings}
        featuredProducts={featuredProducts}
        nextFixture={nextFixture}
        upcomingFixtures={upcomingFixtures}
        highlights={highlights}
      />
    </main>
  );
}
