import HomePage from "@/components/pages/homePage";
import { client } from "@/lib/sanity.client";
import {
  featuredNewsQuery,
  latestNonFeaturedNewsQuery,
  mostRecentNewsQuery,
  homePageSettingsQuery,
  nextFourRecentNewsQuery
} from "@/lib/sanity.queries";
import { NewsArticle, HomePageSettings } from "@/lib/types";

export default async function Home() {
    const [mostRecentNews, featuredNews, latestNews, nextFourRecentNews, settings] =
      await Promise.all([
        client.fetch<NewsArticle>(mostRecentNewsQuery),
        client.fetch<NewsArticle[]>(featuredNewsQuery),
        client.fetch<NewsArticle[]>(latestNonFeaturedNewsQuery),
        client.fetch<NewsArticle[]>(nextFourRecentNewsQuery),
        client.fetch<HomePageSettings>(homePageSettingsQuery),
      ]);

    // Fallback settings if none exist in Sanity
    const defaultSettings: HomePageSettings = {
      newsUpdatesSectionTitle: "NEWS & UPDATES",
      newsUpdatesSectionContent:
        "Welcome to the home of Bechem United FC news. Here you'll find everything from match day coverage and player spotlights to community initiatives and youth development programs that define who we are.\n\nThe Hunters are more than a team—we're a community. Stay updated with news that matters, from the pitch to the people who make this club special.",
      newsUpdatesSectionLinkText: "Discover more",
      newsOnHomePageTitle: "LATEST FROM HUNTERS",
      newsOnHomePageSubtext:
        "Stay updated with the latest news, match reports, and announcements from Bechem United FC",
    };

    return (
      <main>
        <HomePage
          heroNews={mostRecentNews}
          featuredNews={featuredNews}
          latestNews={latestNews}
          nextFourRecentNews={nextFourRecentNews}
          settings={settings || defaultSettings}
        />
      </main>
    );
}
