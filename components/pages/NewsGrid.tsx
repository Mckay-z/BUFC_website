"use client";

import { NewsArticle } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import SectionHeader from "@/components/layout/sectionHeader";
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
    <section className="container-wide mt-30 pb-16 md:pb-24">
      <div className="mb-10 lg:mb-14">
        <SectionHeader title={sectionTitle} subtext={sectionSubtext || ""} />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 md:mb-14">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${activeCategory === category
              ? "bg-primary text-white shadow-lg shadow-primary/20"
              : "bg-white text-neutral-text border border-neutral-2 hover:border-primary/30 hover:bg-neutral-1"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map((article) => (
            <Link
              key={article._id}
              href={`/news/${article.slug.current}`}
              className="group"
            >
              <article className="flex flex-col h-full">
                {/* Image */}
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] mb-5">
                  {article.featuredImage && (
                    <Image
                      src={urlFor(article.featuredImage)
                        .width(600)
                        .height(375)
                        .url()}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-4 py-1.5 ${getCategoryColor(article.category)} text-white text-[10px] font-bold rounded-full uppercase tracking-wider`}
                    >
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col grow">
                  <div className="flex items-center gap-3 mb-3 text-neutral-7 text-xs font-medium">
                    <span>{article.author}</span>
                    <span className="w-1 h-1 bg-neutral-3 rounded-full" />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>

                  <h3 className="text-neutral-text text-xl font-bold mb-3 group-hover:text-prim-3 transition-colors line-clamp-2 leading-tight">
                    {article.title}
                  </h3>

                  {article.excerpt && (
                    <p className="text-neutral-7 text-sm line-clamp-2 leading-relaxed">
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
        <div className="flex justify-center items-center gap-3 mt-16 md:mt-20">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${currentPage === 1
              ? "border-neutral-2 text-neutral-3 cursor-not-allowed"
              : "border-neutral-3 text-neutral-7 hover:border-primary hover:text-primary"
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
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-sm transition-all duration-300 ${currentPage === page
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "text-neutral-text hover:bg-neutral-1"
                      }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="text-neutral-4 px-1">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 ${currentPage === totalPages
              ? "border-neutral-2 text-neutral-3 cursor-not-allowed"
              : "border-neutral-3 text-neutral-7 hover:border-primary hover:text-primary"
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
