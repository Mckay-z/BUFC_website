"use client";

import { GalleryImage, GalleryPageSettings } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import { useState, useMemo } from "react";
import Image from "next/image";
import SectionHeader from "../layout/SectionHeader";
import { Icon } from "@iconify/react";

interface GalleryContentProps {
    settings: GalleryPageSettings;
    allImages: GalleryImage[];
    featuredImages: GalleryImage[];
}

export default function GalleryContent({
    settings,
    allImages,
    featuredImages,
}: GalleryContentProps) {
    const [activeTab, setActiveTab] = useState("All Photos");
    const [visibleCount, setVisibleCount] = useState(6);

    // Layout logic for Featured Grid (3-1-3)
    const centerImage = featuredImages.find((img) => img.featuredPriority === 1);
    const leftSideImages = featuredImages
        .filter(
            (img) =>
                img.featuredPriority &&
                img.featuredPriority >= 2 &&
                img.featuredPriority <= 4
        )
        .sort((a, b) => (a.featuredPriority || 0) - (b.featuredPriority || 0));
    const rightSideImages = featuredImages
        .filter((img) => img.featuredPriority && img.featuredPriority >= 5)
        .sort((a, b) => (a.featuredPriority || 0) - (b.featuredPriority || 0));

    const tabs = [
        "All Photos",
        "Match Day",
        "Team Photos",
        "Trophy Moments",
        "Our Fans",
    ];

    const filteredImages = useMemo(() => {
        const categoryMap: Record<string, string> = {
            "All Photos": "all",
            "Match Day": "match-day",
            "Team Photos": "team-photos",
            "Trophy Moments": "trophy-moments",
            "Our Fans": "our-fans",
        };

        if (activeTab === "All Photos") return allImages;
        const mappedCategory = categoryMap[activeTab];
        return allImages.filter((img) => img.category === mappedCategory);
    }, [allImages, activeTab]);

    const displayedImages = filteredImages.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const suffix = ["th", "st", "nd", "rd"][
            day % 10 > 3 ? 0 : ((day % 100 - day % 10 !== 10 ? 1 : 0) * day) % 10
        ];
        return `${day}${suffix} ${date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })}`;
    };

    return (
        <>
            {/* Featured Moments Section */}
            <section className="container-wide py-16 md:py-28">
                <div className="mb-12">
                    <SectionHeader
                        title={settings.featuredSectionTitle}
                        subtext={settings.featuredSectionSubtext}
                    />
                </div>

                {/* Featured Grid - 3-1-3 Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[500px]">
                    {/* Left Side Images (3) */}
                    <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                        {[0, 1, 2].map((i) => {
                            const img = leftSideImages[i];
                            return (
                                <div
                                    key={img?._id || `placeholder-left-${i}`}
                                    className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer bg-neutral-2"
                                >
                                    {img && (
                                        <Image
                                            src={urlFor(img.image).width(300).height(200).url()}
                                            alt={img.altText}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Big Center Image */}
                    <div className="lg:col-span-8 relative h-[300px] lg:h-full rounded-lg overflow-hidden group bg-neutral-2">
                        {centerImage && (
                            <>
                                <Image
                                    src={urlFor(centerImage.image)
                                        .width(1200)
                                        .height(800)
                                        .url()}
                                    alt={centerImage.altText}
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1200px) 100vw, 66vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                                {/* Date/Caption */}
                                <div className="absolute bottom-6 right-6 flex items-center gap-2 text-white">
                                    <span className="w-1 h-6 bg-green-500"></span>
                                    <span className="font-semibold">
                                        {formatDate(centerImage.uploadDate)}
                                    </span>
                                </div>

                                {/* Navigation Arrows (Visual Only as per mockup) */}
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                                    <button className="text-white hover:text-green-400 transition-colors">
                                        <Icon icon="heroicons:chevron-left" className="w-8 h-8" />
                                    </button>
                                    <button className="text-white hover:text-green-400 transition-colors">
                                        <Icon
                                            icon="heroicons:chevron-right"
                                            className="w-8 h-8"
                                        />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Side Images (3) */}
                    <div className="lg:col-span-2 flex flex-col gap-4 h-full">
                        {[0, 1, 2].map((i) => {
                            const img = rightSideImages[i];
                            return (
                                <div
                                    key={img?._id || `placeholder-right-${i}`}
                                    className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer bg-neutral-2"
                                >
                                    {img && (
                                        <Image
                                            src={urlFor(img.image).width(300).height(200).url()}
                                            alt={img.altText}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 16vw"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* Filter Tabs */}
            <section className="container-wide py-8">
                <div className="flex flex-wrap gap-3 mb-12 justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveTab(tab);
                                setVisibleCount(6);
                            }}
                            className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === tab
                                ? "bg-[#1e103c] text-white shadow-lg"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {displayedImages.map((img) => (
                        <div
                            key={img._id}
                            className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-neutral-2"
                        >
                            <Image
                                src={urlFor(img.image).width(600).height(450).url()}
                                alt={img.altText}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                                <div className="flex items-center gap-2 text-white">
                                    <Icon
                                        icon="heroicons:calendar-days-20-solid"
                                        className="w-4 h-4 text-green-400"
                                    />
                                    <span className="text-sm font-medium">
                                        {formatDate(img.uploadDate)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {displayedImages.length === 0 && (
                        <div className="col-span-full py-12 text-center text-neutral-5">
                            No photos found in this category.
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredImages.length && (
                    <div className="flex justify-center mb-16">
                        <button
                            onClick={handleLoadMore}
                            className="flex items-center gap-2 text-gray-500 hover:text-[#1e103c] transition-colors font-medium group"
                        >
                            {settings.loadMoreButtonText}
                            <Icon
                                icon="heroicons:arrow-small-down"
                                className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                            />
                        </button>
                    </div>
                )}
            </section>
        </>
    );
}
