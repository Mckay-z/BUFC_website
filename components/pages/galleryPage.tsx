"use client";

import { useState } from "react";

const featuredImages = [
    { src: "/images/gallery-main.jpg", date: "16th March, 2025" },
    { src: "/images/gallery-1.jpg", date: "19th March, 2025" },
    { src: "/images/gallery-2.jpg", date: "22nd March, 2025" },
    { src: "/images/gallery-3.jpg", date: "30th March, 2025" },
    { src: "/images/gallery-4.jpg", date: "2nd April, 2025" },
    { src: "/images/gallery-5.jpg", date: "6th April, 2025" },
];

export default function GalleryPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const prev = () =>
        setActiveIndex((i) => (i === 0 ? featuredImages.length - 1 : i - 1));
    const next = () =>
        setActiveIndex((i) => (i === featuredImages.length - 1 ? 0 : i + 1));

    return (
        <div className="min-h-screen bg-[#f6f6fb]">
            {/* HERO */}
            <section className="relative h-[280px] md:h-[320px]">
                <div
                    className="absolute inset-0 bg-cover bg-center grayscale"
                    style={{ backgroundImage: 'url("/images/gallery-hero.jpg")' }}
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="absolute bottom-8 left-8 md:left-16">
                    <h1 className="text-3xl md:text-5xl font-semibold text-white">
                        Gallery
                    </h1>
                    <div className="mt-3 h-1 w-14 bg-white/60" />
                </div>
            </section>

            {/* FEATURED */}
            <section className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between mb-8">
                    <h2 className="text-xl font-semibold tracking-wide">
                        FEATURED MOMENTS
                    </h2>
                    <p className="text-sm text-gray-400 max-w-sm">
                        Our most memorable matches, celebrations, and behind-the-scenes
                        moments.
                    </p>
                </div>

                {/* FEATURED GRID */}
                <div className="grid lg:grid-cols-[1.5fr_7fr_1.5fr] gap-4 h-[420px]">
                    {/* LEFT */}
                    <div className="flex flex-col gap-4">
                        {featuredImages.slice(1, 4).map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i + 1)}
                                className="flex-1 relative overflow-hidden"
                            >
                                <img
                                    src={img.src}
                                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition"
                                />
                            </button>
                        ))}
                    </div>

                    {/* CENTER */}
                    <div className="relative overflow-hidden">
                        <img
                            src={featuredImages[activeIndex].src}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                        {/* DATE */}
                        <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 text-sm text-white rounded">
                            {featuredImages[activeIndex].date}
                        </div>

                        {/* ARROWS */}
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-green-400"
                        >
                            ‹
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-green-400"
                        >
                            ›
                        </button>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-4">
                        {featuredImages.slice(4).map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i + 4)}
                                className="flex-1 relative overflow-hidden"
                            >
                                <img
                                    src={img.src}
                                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FILTERS */}
            <section className="container mx-auto px-4 py-8">
                <div className="flex gap-3 justify-center mb-10">
                    {["All Photos", "Match Day", "Team Photos", "Trophy Moments", "Our Fans"].map(
                        (tab, i) => (
                            <button
                                key={i}
                                className={`px-6 py-2 text-xs rounded-full ${i === 0
                                        ? "bg-[#2b1a57] text-white"
                                        : "bg-[#f0f0f5] text-gray-600 hover:bg-[#e8e8f0]"
                                    }`}
                            >
                                {tab}
                            </button>
                        )
                    )}
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {[...Array(9)].map((_, i) => (
                        <div
                            key={i}
                            className="relative aspect-[4/3] overflow-hidden rounded-xl"
                        >
                            <img
                                src={`/images/gallery-grid-${i + 1}.jpg`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="text-sm text-gray-500 hover:text-[#2b1a57]">
                        Load More Photos ↓
                    </button>
                </div>
            </section>
        </div>
    );
}
