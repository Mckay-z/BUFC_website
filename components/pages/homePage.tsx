"use client";

import { NewsArticle, HomePageSettings, SponsorSettings, Product } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "../ui/Button";
import { Icon } from "@iconify/react";
import SectionHeader from "../layout/SectionHeader";
import ImageFallback from "../ui/ImageFallBack";
import SponsorSection from "../layout/SponsorSection";
import ProductCard from "../ui/ProductCard";

interface HomePageProps {
  heroNews: NewsArticle;
  nextFourRecentNews: NewsArticle[];
  settings: HomePageSettings;
  sponsorSettings: SponsorSettings;
  featuredProducts: Product[];
}

export default function HomePage({
  heroNews,
  nextFourRecentNews,
  settings,
  sponsorSettings,
  featuredProducts,
}: HomePageProps) {
  return (
    <main>
      {/* Hero Section - Most Recent News */}
      {heroNews && (
        <section className="relative min-h-screen w-full overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            {heroNews.featuredImage ? (
              <Image
                src={urlFor(heroNews.featuredImage)
                  .width(1920)
                  .height(1080)
                  .url()}
                alt={heroNews.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <ImageFallback
                icon="material-symbols:news"
                width="80"
                height="80"
                className="bg-neutral-8"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.3)_45.2%,rgb(0,0,0)_100%)]" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 w-full">
            <div className="container-wide pb-10 sm:pb-14 md:pb-16 h-fit flex items-end">
              <div className="max-w-140 sm:max-w-160 lg:max-w-180">
                <h1 className="text-neutral-1 text-[22px] xs:text-[26px] sm:text-3xl lg:text-[36px] font-bold leading-tight">
                  {heroNews.title || "Untitled Article"}
                </h1>
                {heroNews.excerpt && (
                  <p className="text-neutral-5 text-[15px] sm:text-base lg:text-lg leading-[150%] mt-3 md:mt-4 mb-5 md:mb-7">
                    {heroNews.excerpt}
                  </p>
                )}
                <Button
                  href={`/news/${heroNews.slug.current}`}
                  variant="ghost"
                  size="lg"
                  rightIcon={
                    <Icon
                      icon="icons8:chevron-right-round"
                      width="none"
                      height="none"
                      className="w-5 h-5 lg:w-6 lg:h-6"
                    />
                  }
                  buttonClassName="!p-0 !text-neutral-1 hover:!text-prim-6 transition-colors duration-300 ease-in-out text-base md:text-lg"
                >
                  Full Story
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest From Hunters Section */}
      {nextFourRecentNews?.length >= 4 && (
        <section className="container-wide min-h-screen py-16 md:py-28">
          <div className="flex flex-col gap-15 2xlg:gap-30 justify-between h-full">
            {/* Section Header */}
            <SectionHeader
              title={settings.newsOnHomePageTitle}
              subtext={settings.newsOnHomePageSubtext}
            />

            {/* News Grid */}
            <div className="flex flex-col 2xlg:flex-row gap-2.5 w-full">
              {/* First Featured News Card */}
              <div className="group 2xlg:w-1/3">
                <Link
                  href={`/news/${nextFourRecentNews[0].slug.current}`}
                  className="block h-full"
                >
                  <div className="relative h-[400px] 2xlg:h-[460px] rounded-[20px] overflow-hidden">
                    {nextFourRecentNews[0].featuredImage ? (
                      <Image
                        src={urlFor(nextFourRecentNews[0].featuredImage)
                          .width(800)
                          .height(600)
                          .url()}
                        alt={nextFourRecentNews[0].title}
                        fill
                        className="object-cover group-hover:scale-[102%] transition-transform duration-300 ease-in-out"
                      />
                    ) : (
                      <ImageFallback
                        icon="material-symbols:news"
                        width="80"
                        height="80"
                      />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                    {/* Content Overlay */}
                    <div className="text-neutral-1 absolute bottom-0 left-0 right-0 px-5 sm:px-7.5 py-6">
                      <h3 className="uppercase text-[15px] sm:text-base md:text-lg font-bold mb-2 leading-tight line-clamp-2">
                        {nextFourRecentNews[0].title || "Untitled Article"}
                      </h3>
                      {nextFourRecentNews[0].excerpt && (
                        <p className="text-neutral-3 text-[13px] xs:text-sm line-clamp-2">
                          {nextFourRecentNews[0].excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col xlg:flex-row gap-2.5 w-full 2xlg:w-2/3">
                {/* News & Updates Info Card */}
                <div className="bg-[#252424] rounded-[20px] px-5 sm:px-8 py-7.5 md:py-12 xlg:w-1/2 flex flex-col justify-between min-h-[350px] xlg:h-[420px] 2xlg:h-[460px]">
                  <div>
                    <h3 className="text-neutral-1 font-medium text-xl lg:text-2xl mb-4">
                      {settings.newsUpdatesSectionTitle}
                    </h3>
                    <p className="text-neutral-4 text-sm xl:text-[15px] leading-relaxed whitespace-pre-line">
                      {settings.newsUpdatesSectionContent}
                    </p>
                  </div>
                  <Button
                    href="/news"
                    variant="ghost"
                    size="lg"
                    textClassName="font-normal underline"
                    buttonClassName="!text-sm md:!text-base mt-6 !p-0 text-prim-3 hover:!text-prim-6 !justify-end"
                    fullWidth={true}
                    rightIcon={<FiArrowUpRight className="w-5 h-5" />}
                  >
                    Discover More
                  </Button>
                </div>

                {/* Image Gallery - 2nd, 3rd & 4th news items */}
                <div className="grid grid-cols-2 grid-rows-[40%_1fr] xlg:w-1/2 gap-2.5 h-[400px] xlg:h-[420px] 2xlg:h-[460px]">
                  {/* Top two cards */}
                  {nextFourRecentNews.slice(1, 3).map((newsItem) => (
                    <Link
                      key={newsItem._id}
                      href={`/news/${newsItem.slug.current}`}
                      className="relative rounded-[20px] overflow-hidden group"
                    >
                      {newsItem.featuredImage ? (
                        <>
                          <Image
                            src={urlFor(newsItem.featuredImage)
                              .width(600)
                              .height(400)
                              .url()}
                            alt={newsItem.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 group-hover:bg-linear-to-t from-black/80 via-black/20 to-transparent transition-all duration-300" />

                          {/* Title overlay - appears on hover */}
                          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                            <h4 className="text-white text-xs font-semibold line-clamp-2 leading-tight">
                              {newsItem.title}
                            </h4>
                          </div>
                        </>
                      ) : (
                        <ImageFallback
                          icon="material-symbols:news"
                          width="40"
                          height="40"
                        />
                      )}
                    </Link>
                  ))}

                  {/* Bottom full-width card */}
                  <Link
                    href={`/news/${nextFourRecentNews[3].slug.current}`}
                    className="col-span-2 relative rounded-[20px] overflow-hidden group"
                  >
                    {nextFourRecentNews[3].featuredImage ? (
                      <>
                        <Image
                          src={urlFor(nextFourRecentNews[3].featuredImage)
                            .width(600)
                            .height(400)
                            .url()}
                          alt={nextFourRecentNews[3].title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 group-hover:bg-linear-to-t from-black/80 via-black/20 to-transparent transition-all duration-300" />

                        {/* Title overlay - appears on hover */}
                        <div className="absolute bottom-0 left-0 right-0 px-5 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                          <h4 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
                            {nextFourRecentNews[3].title}
                          </h4>
                        </div>
                      </>
                    ) : (
                      <ImageFallback
                        icon="material-symbols:news"
                        width="50"
                        height="50"
                      />
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sponsor Section */}
      {sponsorSettings && <SponsorSection settings={sponsorSettings} />}

      {/* Shop Section */}
      {featuredProducts.length > 0 && (
        <section className="container-wide py-16 md:py-20 lg:py-28">
          <div className="flex flex-col gap-12 md:gap-16">
            {/* Section Header */}
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-neutral-text text-xl md:text-2xl lg:text-3xl font-bold mb-3">
                  OUR CLUB STORE
                </h2>
                <p className="text-neutral-7 text-sm md:text-base max-w-2xl">
                  Discover the latest official merchandise, new collections, and
                  exclusive Bechem United FC store updates.
                </p>
              </div>
            </div>

            {/* Featured Products Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Visit Store Link */}
            <div className="flex justify-end">
              <Link
                href="/shop"
                className="group flex items-center gap-2 text-neutral-text hover:text-primary transition-colors duration-200"
              >
                <span className="text-sm md:text-base font-medium">
                  Visit Store
                </span>
                <Icon
                  icon="mdi:arrow-right-circle-outline"
                  className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
