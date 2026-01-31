"use client";

import { Product } from "@/lib/types";
import ProductCard from "@/components/ui/ProductCard";
import { Icon } from "@iconify/react";
import { useRef, useState, useEffect } from "react";

interface ProductCategoryProps {
  title: string;
  products: Product[];
}

export default function ProductCategory({
  title,
  products,
}: ProductCategoryProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initial scroll check
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const firstItem = scrollContainerRef.current.firstElementChild as HTMLElement;
      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const gap = parseInt(window.getComputedStyle(scrollContainerRef.current).gap) || 0;
        const scrollAmount = itemWidth + gap;
        scrollContainerRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  if (products.length === 0) {
    return (
      <div className="py-12">
        <div className="bg-[#1E103C] -skew-x-12 px-8 py-2 inline-block mb-6">
          <h2 className="text-white text-sm md:text-base font-bold skew-x-12 uppercase tracking-wider">
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-center py-16 bg-neutral-2 rounded-lg">
          <p className="text-neutral-6 text-base md:text-lg">
            No products available yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      {/* Category Header with Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-[#1E103C] -skew-x-12 px-8 py-2 inline-block">
          <h2 className="text-white text-sm md:text-base font-bold skew-x-12 uppercase tracking-wider">
            {title}
          </h2>
        </div>

        {/* Navigation buttons - Desktop (right of title) */}
        {!isMobile && (canScrollLeft || canScrollRight) && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollLeft
                ? "bg-neutral-11 text-neutral-1 hover:bg-primary"
                : "bg-neutral-3 text-neutral-5 cursor-not-allowed"
                }`}
              aria-label="Scroll left"
            >
              <Icon icon="mdi:chevron-left" className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollRight
                ? "bg-neutral-11 text-neutral-1 hover:bg-primary"
                : "bg-neutral-3 text-neutral-5 cursor-not-allowed"
                }`}
              aria-label="Scroll right"
            >
              <Icon icon="mdi:chevron-right" className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Products Grid/Scroll Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className={`flex flex-nowrap overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 md:gap-10 pb-6 mask-fade-edges ${products.length <= 3 ? "md:justify-center" : "justify-start"
          }`}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="shrink-0 snap-start w-[280px] sm:w-[300px] md:w-[calc(33.333%-27px)] lg:w-[calc(33.333%-27px)] min-w-[280px] max-w-[350px] flex justify-center"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Navigation buttons - Mobile (below items) */}
      {isMobile && (canScrollLeft || canScrollRight) && (
        <div className="flex gap-2 justify-center mt-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollLeft
              ? "bg-neutral-11 text-neutral-1 hover:bg-primary"
              : "bg-neutral-3 text-neutral-5 cursor-not-allowed"
              }`}
            aria-label="Scroll left"
          >
            <Icon icon="mdi:chevron-left" className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${canScrollRight
              ? "bg-neutral-11 text-neutral-1 hover:bg-primary"
              : "bg-neutral-3 text-neutral-5 cursor-not-allowed"
              }`}
            aria-label="Scroll right"
          >
            <Icon icon="mdi:chevron-right" className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
