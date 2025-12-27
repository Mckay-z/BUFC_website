import { client, urlFor } from "@/lib/sanity.client";
import { newsQuery } from "@/lib/sanity.queries";
import { NewsArticle } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default async function NewsPage() {
  const articles = await client.fetch<NewsArticle[]>(newsQuery);

  const categoryColors: Record<string, string> = {
    "club-news": "bg-green-500",
    "match-report": "bg-blue-500",
    "player-news": "bg-purple-500",
    "transfer-news": "bg-orange-500",
  };

  const categoryLabels: Record<string, string> = {
    "club-news": "Club News",
    "match-report": "Match Report",
    "player-news": "Player News",
    "transfer-news": "Transfer News",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50">
      {/* Header Section */}
      <div className="bg-linear-to-r from-green-700 to-yellow-600 text-white py-16 mb-12 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4">📰 Latest News</h1>
          <p className="text-green-100 text-xl">
            Stay updated with the latest from Bechem United FC
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No News Yet
            </h3>
            <p className="text-gray-600">
              Check back soon for the latest updates
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                href={`/news/${article.slug.current}`}
                key={article._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Featured Image */}
                <div className="relative h-56 overflow-hidden">
                  {article.featuredImage ? (
                    <Image
                      src={urlFor(article.featuredImage)
                        .width(600)
                        .height(400)
                        .url()}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-green-100 to-yellow-100 flex items-center justify-center">
                      <span className="text-6xl">📰</span>
                    </div>
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`${categoryColors[article.category] || "bg-gray-500"} text-white text-xs font-semibold px-3 py-1 rounded-full`}
                    >
                      {categoryLabels[article.category] || article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {article.excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-700">
                        {article.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {article.readTime && (
                        <span className="flex items-center gap-1">
                          ⏱️ {article.readTime} min
                        </span>
                      )}
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
