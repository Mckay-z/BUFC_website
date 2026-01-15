"use client";

import { NewsArticle } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NewsGridProps {
  allArticles: NewsArticle[];
  sectionTitle: string;
  sectionSubtext?: string;
}

const ITEMS_PER_PAGE = 9;

export default function NewsGrid({
  allArticles,
  sectionTitle,
  sectionSubtext,
}: NewsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [currentPage, setCurrentPage] = useState(1);

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

  // Filter articles by category
  const filteredArticles =
    activeCategory === "All News"
      ? allArticles
      : allArticles.filter((article) => article.category === activeCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categories = [
    "All News",
    "Club News",
    "Player News",
    "Transfer News",
    "Match Report",
  ];

  return (
    <section className="container-wide pb-16 md:pb-20">
      <div className="mb-8">
        <h2 className="text-neutral-text text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          {sectionTitle}
        </h2>
        <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
          {sectionSubtext}
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all ${
              activeCategory === category
                ? "bg-prim-3 text-white"
                : "bg-neutral-3 text-neutral-7 hover:bg-neutral-4"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-6 text-neutral-7 text-sm">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)}{" "}
        of {filteredArticles.length} articles
      </div>

      {/* Latest News Grid */}
      {paginatedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map((article) => (
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
                        .width(600)
                        .height(340)
                        .url()}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 ${getCategoryColor(article.category)} text-white text-xs font-semibold rounded-full uppercase`}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-neutral-7 text-xs">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  <h3 className="text-neutral-text text-lg font-bold mb-2 group-hover:text-prim-3 transition-colors line-clamp-2">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="text-neutral-7 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-neutral-7 text-lg">
            No articles found in this category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === 1
                ? "bg-neutral-3 text-neutral-5 cursor-not-allowed"
                : "bg-neutral-3 text-neutral-7 hover:bg-neutral-4"
            }`}
          >
            <svg
              className="w-5 h-5 rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            // Show first page, last page, current page, and pages around current
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-colors ${
                    currentPage === page
                      ? "bg-prim-3 text-white"
                      : "bg-neutral-3 text-neutral-7 hover:bg-neutral-4"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className="text-neutral-7">
                  ...
                </span>
              );
            }
            return null;
          })}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === totalPages
                ? "bg-neutral-3 text-neutral-5 cursor-not-allowed"
                : "bg-neutral-3 text-neutral-7 hover:bg-neutral-4"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
