"use client";

import { NewsArticle } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import SectionHeader from "../layout/SectionHeader";
import { ExtraSmallFeaturedCard } from "./FeaturedNewsCards";
import { Icon } from "@iconify/react";

interface NewsGridProps {
  allArticles: NewsArticle[];
  sectionTitle: string;
  sectionSubtext?: string;
}

const ITEMS_PER_PAGE = 6;

export default function NewsGrid({
  allArticles,
  sectionTitle,
  sectionSubtext,
}: NewsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesGridRef = useRef<HTMLDivElement>(null);

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

    // Scroll to the articles grid
    if (articlesGridRef.current) {
      const offset = 180; // Adjust this value to control spacing from top
      const elementPosition =
        articlesGridRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
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
        <SectionHeader title={sectionTitle} subtext={sectionSubtext || ""} />
      </div>

      {/* Category Tabs */}
      <div className="flex-center flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 md:px-6 py-2.5 rounded-full font-medium text-[13px] xs:text-sm transition-all ${
              activeCategory === category
                ? "bg-primary-active text-prim-1"
                : "bg-neutral-1/70 text-neutral-8 hover:bg-neutral-4"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="text-right mb-6 text-neutral-7 text-sm">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)}{" "}
        of {filteredArticles.length} articles
      </div>

      {/* Latest News Grid */}
      <div ref={articlesGridRef}>
        {paginatedArticles.length > 0 ? (
          <div className="flex justify-around flex-wrap gap-x-4 gap-y-7 md:gap-6">
            {paginatedArticles.map((article) => (
              <ExtraSmallFeaturedCard key={article._id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-7 text-lg">
              No articles found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${
              currentPage === 1
                ? " text-neutral-text/30 cursor-not-allowed"
                : " text-neutral-text cursor-pointer group hover:text-primary-hover  transition-all ease-in-out duration-300"
            }`}
          >
            <Icon
              icon="mynaui:chevron-left"
              width="24"
              height="24"
              className="w-6 h-6 group-hover:scale-[110%] transition-transform duration-300"
            />
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
                  className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary text-prim-1 outline-none shadow-sm shadow-black/30"
                      : " text-neutral-8 hover:bg-neutral-4"
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
                ? " text-neutral-text/30 cursor-not-allowed"
                : " text-neutral-text cursor-pointer group hover:text-primary-hover transition-all ease-in-out duration-300"
            }`}
          >
            <Icon
              icon="mynaui:chevron-right"
              width="24"
              height="24"
              className="w-6 h-6 group-hover:scale-[110%] transition-transform duration-300"
            />
          </button>
        </div>
      )}
    </section>
  );
}
