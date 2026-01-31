import { client } from "@/lib/sanity.client";
import {
  newsQuery,
  newsPageSettingsQuery,
  featuredNewsQuery,
  newsletterSettingsQuery,
} from "@/lib/sanity.queries";
import { NewsArticle, NewsPageSettings, NewsletterSettings } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeader from "@/components/layout/SectionHeader";
import NewsGrid from "@/components/pages/NewsGrid";
import Newsletter from "@/components/layout/Newsletter";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { urlFor } from "@/lib/sanity.client";
export const metadata: Metadata = {
  title: "News | Bechem United FC",
  description: "Latest news, updates, and announcements from Bechem United FC",
};

export const revalidate = 60;

export default async function NewsPage() {
  const [settings, featuredNews, allNews, newsletterSettings] =
    await Promise.all([
      client.fetch<NewsPageSettings>(newsPageSettingsQuery),
      client.fetch<NewsArticle[]>(featuredNewsQuery),
      client.fetch<NewsArticle[]>(newsQuery),
      client.fetch<NewsletterSettings>(newsletterSettingsQuery),
    ]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Club News": "bg-prim-3",
      "Player News": "bg-purple-500",
      "Transfer News": "bg-orange-500",
      "Match Report": "bg-blue-500",
    };
    return colors[category] || "bg-prim-3";
  };

  return (
    <main className="bg-[#F1EFF6]">
      {/* Page Header with Banner */}
      <PageHeader
        title="News"
        backgroundImage={settings?.pageBannerImage}
        staticImage="/img/banner.jpg"
      />

      {/* Featured News Section */}
      {featuredNews && featuredNews.length > 0 && (
        <section className="container-wide py-12 md:py-16">
          <div className="mb-10 lg:mb-14">
            <SectionHeader
              title={settings?.featuredNewsSectionTitle || "FEATURED NEWS"}
              subtext={
                settings?.featuredNewsSectionSubtext ||
                "Find the most important and timely news about Bechem United FC"
              }
            />
          </div>

          {/* Featured Articles Grid - Asymmetrical Layout */}
          <div className="space-y-8">
            {/* Main Hero Article */}
            {featuredNews[0] && (
              <Link
                href={`/news/${featuredNews[0].slug.current}`}
                className="group relative block w-full aspect-21/9 min-h-[300px] md:min-h-[450px] rounded-[24px] overflow-hidden"
              >
                {featuredNews[0].featuredImage && (
                  <Image
                    src={urlFor(featuredNews[0].featuredImage).url()}
                    alt={featuredNews[0].title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 lg:p-14">
                  <span
                    className={`inline-block px-4 py-1 mb-4 ${getCategoryColor(featuredNews[0].category)} text-white text-xs font-bold rounded-full uppercase`}
                  >
                    {featuredNews[0].category}
                  </span>
                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 max-w-4xl group-hover:text-prim-3 transition-colors line-clamp-2">
                    {featuredNews[0].title}
                  </h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm md:text-base">
                    <span>{formatDate(featuredNews[0].publishedAt)}</span>
                    <span className="w-1.5 h-1.5 bg-prim-3 rounded-full" />
                    <span>{featuredNews[0].readTime} min read</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Middle Row Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Secondary Large Card */}
              {featuredNews[1] && (
                <Link
                  href={`/news/${featuredNews[1].slug.current}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-4/3 w-full rounded-[24px] overflow-hidden mb-5">
                    {featuredNews[1].featuredImage && (
                      <Image
                        src={urlFor(featuredNews[1].featuredImage).url()}
                        alt={featuredNews[1].title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3 text-neutral-7 text-sm font-medium">
                      <span>{formatDate(featuredNews[1].publishedAt)}</span>
                      <span className="w-1 h-1 bg-neutral-4 rounded-full" />
                      <span>{featuredNews[1].readTime} min read</span>
                    </div>
                    <h4 className="text-neutral-text text-xl md:text-2xl font-bold mb-3 group-hover:text-prim-3 transition-colors line-clamp-2 leading-tight">
                      {featuredNews[1].title}
                    </h4>
                    {featuredNews[1].excerpt && (
                      <p className="text-neutral-7 text-sm md:text-base line-clamp-2">
                        {featuredNews[1].excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              )}

              {/* Stacked Right Side Cards */}
              <div className="flex flex-col gap-8">
                {[featuredNews[2], featuredNews[3]]
                  .filter(Boolean)
                  .map((article) => (
                    <Link
                      key={article!._id}
                      href={`/news/${article!.slug.current}`}
                      className="group flex flex-col sm:flex-row gap-5 lg:gap-6"
                    >
                      <div className="relative aspect-video sm:aspect-square sm:w-40 lg:w-48 shrink-0 rounded-[20px] overflow-hidden">
                        {article!.featuredImage && (
                          <Image
                            src={urlFor(article!.featuredImage).url()}
                            alt={article!.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2 text-neutral-7 text-xs md:text-sm font-medium">
                          <span>{formatDate(article!.publishedAt)}</span>
                          <span className="w-1 h-1 bg-neutral-4 rounded-full" />
                          <span>{article!.readTime} min read</span>
                        </div>
                        <h4 className="text-neutral-text text-lg lg:text-xl font-bold mb-2 group-hover:text-prim-3 transition-colors line-clamp-2 leading-tight">
                          {article!.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
              </div>
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

      <Newsletter settings={newsletterSettings} />
    </main>
  );
}
