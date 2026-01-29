import { client } from "@/lib/sanity.client";
import {
  newsQuery,
  newsPageSettingsQuery,
  featuredNewsQuery,
} from "@/lib/sanity.queries";
import Link from "next/link";
import { NewsArticle, NewsPageSettings } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import NewsGrid from "@/components/pages/NewsGrid";
import { Metadata } from "next";
import SectionHeader from "@/components/layout/SectionHeader";
import {
  DefaultFeaturedCard,
  FirstFeaturedCard,
  SmallFeaturedCard,
} from "@/components/pages/FeaturedNewsCards";
export const metadata: Metadata = {
  title: "News | Bechem United FC",
  description: "Latest news, updates, and announcements from Bechem United FC",
};

export const revalidate = 60;

export default async function NewsPage() {
  const [settings, featuredNews, allNews] = await Promise.all([
    client.fetch<NewsPageSettings>(newsPageSettingsQuery),
    client.fetch<NewsArticle[]>(featuredNewsQuery),
    client.fetch<NewsArticle[]>(newsQuery),
  ]);

  return (
    <main className="">
      {/* Page Header with Banner */}
      {settings?.pageBannerImage && (
        <PageHeader
          title={settings.pageTitle}
          backgroundImage={settings.pageBannerImage}
        />
      )}

      {/* Featured News Section */}
      {featuredNews && featuredNews.length > 0 && (
        <section className="flex flex-col gap-10 md:gap-16 container-wide py-12 md:py-16 w-full">
          <div>
            <SectionHeader
              title={settings?.featuredNewsSectionTitle || "FEATURED NEWS"}
              subtext={
                settings?.featuredNewsSectionSubtext ||
                "Find the most important and timely news about Bechem United FC"
              }
            />
          </div>

          {/* Large Featured Article */}
          <FirstFeaturedCard article={featuredNews[0]} />
          {/* Second Featured Article */}
          <div className="max-w-[1080px] w-full mx-auto flex flex-col md:flex-row xlg:justify-between xlg:items-center gap-6 lg:gap-8 xl:gap-0">
            <DefaultFeaturedCard
              key={featuredNews[1]._id}
              article={featuredNews[1]}
            />
            <div className="grid grid-cols-1 xlg:grid-cols-1 gap-6 lg:gap-8">
              {featuredNews.slice(2).map((article) => (
                <SmallFeaturedCard key={article._id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Updates Section with Client-side Filtering & Pagination */}
      <NewsGrid
        allArticles={allNews}
        sectionTitle={settings?.latestUpdatesSectionTitle || "LATEST UPDATES"}
        sectionSubtext={
          settings?.latestUpdatesSectionSubtext ||
          "Catch up on recent news and developments from around the club"
        }
      />
    </main>
  );
}
