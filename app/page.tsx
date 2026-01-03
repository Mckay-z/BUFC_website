import HomePage from "@/components/pages/homePage";
import { client } from "@/lib/sanity.client";
import {
  mostRecentNewsQuery,
  homePageSettingsQuery,
  nextFourRecentNewsQuery,
  sponsorSettingsQuery,
  featuredJerseysQuery,
  threeJerseysQuery,
  liveMatchesSettingsQuery,
  newsletterSettingsQuery,
} from "@/lib/sanity.queries";
import {
  NewsArticle,
  HomePageSettings,
  SponsorSettings,
  Product,
  LiveMatchesSettings,
  NewsletterSettings,
} from "@/lib/types";

export default async function Home() {
  const [
    mostRecentNews,
    nextFourRecentNews,
    settings,
    sponsorSettings,
    jerseysData,
    liveMatchesSettings,
    newsletterSettings,
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
  ]);

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
    newsUpdatesSectionTitle: "NEWS & UPDATES",
    newsUpdatesSectionContent:
      "Welcome to the home of Bechem United FC news. Here you'll find everything from match day coverage and player spotlights to community initiatives and youth development programs that define who we are.\n\nThe Hunters are more than a team—we're a community. Stay updated with news that matters, from the pitch to the people who make this club special.",
    newsUpdatesSectionLinkText: "Discover more",
    newsOnHomePageTitle: "LATEST FROM HUNTERS",
    newsOnHomePageSubtext:
      "Stay updated with the latest news, match reports, and announcements from Bechem United FC",
    shopOnHomePageTitle: "OUR CLUB STORE",
    shopOnHomePageSubtext:
      "Discover the latest official merchandise, new collections, and exclusive Bechem United FC store updates.",
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
      />
    </main>
  );
}
