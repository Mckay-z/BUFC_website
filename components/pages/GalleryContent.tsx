"use client";

import { GalleryImage, GalleryPageSettings } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import { useState, useMemo } from "react";
import Image from "next/image";
import SectionHeader from "@/components/layout/SectionHeader";
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
    const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    // Layout logic for Featured Grid (3-1-3)
    // We'll use the first image as center by default, or cycle through them
    const mainImages = featuredImages.length > 0 ? featuredImages : [];
    const centerImage = mainImages[currentFeaturedIndex];

    // For the side images, we'll pick them dynamically to avoid duplicates if possible
    // or just use the priorities if strictly defined
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

    const handlePrevFeatured = () => {
        setCurrentFeaturedIndex((prev) => (prev === 0 ? mainImages.length - 1 : prev - 1));
    };

    const handleNextFeatured = () => {
        setCurrentFeaturedIndex((prev) => (prev === mainImages.length - 1 ? 0 : prev + 1));
    };

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
            <section className="container-wide py-10 md:py-16 lg:py-24">
                <div className="mb-8 md:mb-12">
                    <SectionHeader
                        title={settings.featuredSectionTitle}
                        subtext={settings.featuredSectionSubtext}
                        showLine
                        uppercase
                    />
                </div>

                {/* Featured Grid - 3-1-3 Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[500px]">
                    {/* Left Side Images (3) - Hidden on Mobile/Tablet */}
                    <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 h-full">
                        {[0, 1, 2].map((i) => {
                            const img = leftSideImages[i];
                            return (
                                <div
                                    key={img?._id || `placeholder-left-${i}`}
                                    className="flex-1 relative overflow-hidden group cursor-pointer bg-neutral-2"
                                    onClick={() => img && setSelectedImage(img)}
                                >
                                    {img && (
                                        <Image
                                            src={urlFor(img.image).width(300).height(200).url()}
                                            alt={img.altText}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                            sizes="16vw"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Big Center Image */}
                    <div className="lg:col-span-8 relative aspect-4/3 sm:aspect-video lg:aspect-auto lg:h-full overflow-hidden group bg-neutral-2">
                        {centerImage && (
                            <>
                                <Image
                                    src={urlFor(centerImage.image)
                                        .width(1200)
                                        .height(800)
                                        .url()}
                                    alt={centerImage.altText}
                                    fill
                                    className="object-cover transition-all duration-700 cursor-pointer"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    onClick={() => setSelectedImage(centerImage)}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                                {/* Date/Caption */}
                                <div className="absolute bottom-6 right-6 flex items-center gap-2 text-white z-10">
                                    <span className="w-1 h-5 md:h-6 bg-white"></span>
                                    <span className="text-sm md:text-base font-semibold">
                                        {formatDate(centerImage.uploadDate)}
                                    </span>
                                </div>

                                {/* Slider Navigation Control */}
                                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-7 z-20 bg-black/40 md:bg-white/10 backdrop-blur-md px-5 md:px-8 py-3 md:py-4 rounded-full border border-white/20 shadow-2xl transition-all hover:bg-white/20">
                                    <button
                                        onClick={handlePrevFeatured}
                                        className="text-white hover:scale-110 active:scale-95 transition-all p-1"
                                        aria-label="Previous image"
                                    >
                                        <Icon icon="ph:caret-left-bold" className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>

                                    <div className="flex items-center gap-2 md:gap-3">
                                        <span className="text-white font-black text-sm md:text-[16px] tracking-tighter">
                                            {(currentFeaturedIndex + 1).toString().padStart(2, '0')}
                                        </span>
                                        <div className="w-px h-3 bg-white/20" />
                                        <span className="text-white/50 font-bold text-[11px] md:text-[13px]">
                                            {mainImages.length.toString().padStart(2, '0')}
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleNextFeatured}
                                        className="text-white hover:scale-110 active:scale-95 transition-all p-1"
                                        aria-label="Next image"
                                    >
                                        <Icon icon="ph:caret-right-bold" className="w-4 h-4 md:w-5 md:h-5" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Side Images (3) - Hidden on Mobile/Tablet */}
                    <div className="hidden lg:flex lg:col-span-2 flex-col gap-4 h-full">
                        {[0, 1, 2].map((i) => {
                            const img = rightSideImages[i];
                            return (
                                <div
                                    key={img?._id || `placeholder-right-${i}`}
                                    className="flex-1 relative overflow-hidden group cursor-pointer bg-neutral-2"
                                    onClick={() => img && setSelectedImage(img)}
                                >
                                    {img && (
                                        <Image
                                            src={urlFor(img.image).width(300).height(200).url()}
                                            alt={img.altText}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                            sizes="16vw"
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
                <div className="flex justify-start md:justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="inline-flex items-center bg-white p-1.5 rounded-full shadow-lg shadow-black/5 border border-black/5 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setVisibleCount(6);
                                }}
                                className={`px-6 md:px-10 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === tab
                                    ? "bg-[#1e103c] text-white"
                                    : "text-[#1e103c] hover:bg-black/5"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {displayedImages.map((img) => (
                        <div
                            key={img._id}
                            className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-neutral-2"
                            onClick={() => setSelectedImage(img)}
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
                                        className="w-4 h-4 text-[#3F2A78] group-hover:text-white transition-colors"
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
            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-200 bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="fixed top-6 right-6 text-white/70 hover:text-white transition-colors z-220 bg-black/20 rounded-full p-2"
                        onClick={() => setSelectedImage(null)}
                    >
                        <Icon icon="heroicons:x-mark-20-solid" className="w-8 h-8 md:w-10 md:h-10" />
                    </button>

                    <div className="w-full h-full overflow-y-auto scrollbar-hide flex flex-col items-center py-12 px-2 md:px-0">
                        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-6 md:gap-10 min-h-full justify-center">
                            <div
                                className="relative w-full max-w-5xl aspect-4/3 md:aspect-auto md:h-[70vh] shrink-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Image
                                    src={urlFor(selectedImage.image).url()}
                                    alt={selectedImage.altText || "Full Moment"}
                                    fill
                                    className="object-contain"
                                    sizes="95vw"
                                />
                            </div>

                            <div
                                className="bg-white/10 backdrop-blur-md p-5 md:p-8 rounded-2xl max-w-3xl w-full flex flex-col gap-3 shrink-0"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <h3 className="text-white font-bold text-lg md:text-xl lg:text-2xl uppercase tracking-wider">
                                        {selectedImage.altText || "Moment Details"}
                                    </h3>
                                    <div className="flex items-center gap-2 text-[#9D7AFF]">
                                        <Icon icon="heroicons:calendar-days-20-solid" className="w-5 h-5" />
                                        <span className="font-semibold">{formatDate(selectedImage.uploadDate)}</span>
                                    </div>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    {selectedImage.caption || "Relive this historic moment from the Bechem United FC archives. Every image tells a story of passion, grit, and victory."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
