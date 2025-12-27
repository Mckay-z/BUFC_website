import { client, urlFor } from "@/lib/sanity.client";
import { singleNewsQuery } from "@/lib/sanity.queries";
import { NewsArticle } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsArticlePage({
  params,
}: NewsArticlePageProps) {
  const resolvedParams = await params;

  const article = await client.fetch<NewsArticle>(singleNewsQuery, {
    slug: resolvedParams.slug,
  });

  if (!article) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Article not found
          </h1>
          <p className="text-gray-600 mb-6">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/news"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

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
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium hover:underline"
          >
            <span>←</span>
            <span>Back to News</span>
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Category Badge */}
        <div className="mb-4">
          <span
            className={`${categoryColors[article.category] || "bg-gray-500"} text-white text-sm font-semibold px-4 py-2 rounded-full inline-block`}
          >
            {categoryLabels[article.category] || article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✍️</span>
            <span className="font-medium text-gray-800">{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          {article.readTime && (
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <span>{article.readTime} min read</span>
            </div>
          )}
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="relative w-full h-96 md:h-125 rounded-2xl overflow-hidden mb-12 shadow-xl">
            <Image
              src={urlFor(article.featuredImage).width(1200).height(800).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <p className="text-xl text-gray-700 italic leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg prose-green max-w-none">
          <div className="text-gray-800 leading-relaxed">
            <PortableText
              value={article.content}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-4xl font-bold text-gray-900 mt-12 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-5">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                      {children}
                    </h3>
                  ),
                  normal: ({ children }) => (
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-green-500 pl-6 italic text-gray-700 my-8">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-700">{children}</em>
                  ),
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      className="text-green-600 hover:text-green-700 underline font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-8 mb-6 space-y-2 text-gray-700">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal pl-8 mb-6 space-y-2 text-gray-700">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-linear-to-r from-green-50 to-yellow-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Enjoyed this article?
            </h3>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest news from Bechem United FC
            </p>
            <Link
              href="/news"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
