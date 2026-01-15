import { client } from "@/lib/sanity.client";
import {
  newsQuery,
  newsPageSettingsQuery,
  featuredNewsQuery,
} from "@/lib/sanity.queries";
import { NewsArticle, NewsPageSettings } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import NewsGrid from "@/components/pages/NewsGrid";
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
  const [settings, featuredNews, allNews] = await Promise.all([
    client.fetch<NewsPageSettings>(newsPageSettingsQuery),
    client.fetch<NewsArticle[]>(featuredNewsQuery),
    client.fetch<NewsArticle[]>(newsQuery),
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
    <main className="bg-neutral-1">
      {/* Page Header with Banner */}
      {settings?.newsPageBannerImage && (
        <PageHeader
          title="News"
          backgroundImage={settings.newsPageBannerImage}
        />
      )}

      {/* Featured News Section */}
      {featuredNews && featuredNews.length > 0 && (
        <section className="container-wide py-12 md:py-16">
          <div className="mb-8">
            <h2 className="text-neutral-text text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              {settings?.featuredNewsSectionTitle || "FEATURED NEWS"}
            </h2>
            <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
              {settings?.featuredNewsSectionSubtext ||
                "Find the most important and timely news about Bechem United FC"}
            </p>
          </div>

          {/* Featured Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {featuredNews.map((article) => (
              <Link
                key={article._id}
                href={`/news/${article.slug.current}`}
                className="group"
              >
                <article className="bg-neutral-2 rounded-[20px] overflow-hidden border border-neutral-3 hover:border-prim-3 transition-all duration-300 h-full">
                  {/* Image */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    {article.featuredImage && (
                      <Image
                        src={urlFor(article.featuredImage)
                          .width(800)
                          .height(450)
                          .url()}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-4 py-1.5 ${getCategoryColor(article.category)} text-white text-xs font-semibold rounded-full uppercase`}
                      >
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-neutral-7 text-sm">
                      <span className="flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {article.author}
                      </span>
                      <span>•</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>

                    <h3 className="text-neutral-text text-xl md:text-2xl font-bold mb-3 group-hover:text-prim-3 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {article.excerpt && (
                      <p className="text-neutral-7 text-sm md:text-base line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>
                    )}

                    {article.readTime && (
                      <div className="flex items-center gap-2 text-neutral-7 text-sm">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{article.readTime} min read</span>
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
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
