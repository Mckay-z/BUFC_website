"use client";

import Image from "next/image";
import { urlFor } from "@/lib/sanity.client";
import { SanityImage, GalleryImage } from "@/lib/types";

interface JoinHuntersPackProps {
    settings?: {
        title: string;
        description: string;
        buttonText: string;
        images: Array<{
            image: SanityImage;
            order: number;
        }>;
    };
    fallbackImages?: GalleryImage[];
}

import { useUI } from "@/context/UIContext";

export default function JoinHuntersPack({ settings, fallbackImages }: JoinHuntersPackProps) {
    const { openAuthModal } = useUI();
    if (!settings) return null;

    const images = settings.images?.sort((a, b) => a.order - b.order) || [];

    return (
        <section className="py-20 px-4 md:px-0 flex justify-center">
            <div className="w-full max-w-[1240px] min-h-[877px] bg-white rounded-[40px] p-[50px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-neutral-100">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[30px] h-full">

                    {/* Left Column: Text + 1 Large Image */}
                    <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10">
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="text-[22px] font-semibold text-neutral-900 leading-[100%] tracking-normal font-montserrat uppercase">
                                {settings.title || "Join The Hunters Pack"}
                            </h2>
                            <p className="text-neutral-500 text-sm md:text-base font-medium leading-relaxed max-w-sm">
                                {settings.description || "Be part of something special. Join thousands of passionate fans supporting Bechem United FC at home and away."}
                            </p>
                        </div>

                        <div className="relative aspect-3/4 rounded-[24px] md:rounded-[32px] overflow-hidden group">
                            {images[0] ? (
                                <Image
                                    src={urlFor(images[0].image).width(600).url()}
                                    alt=""
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                                    {fallbackImages?.[0] && (
                                        <Image src={urlFor(fallbackImages[0].image).width(600).url()} alt="" fill className="object-cover" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Middle Column: 2 Stacked Images */}
                    <div className="lg:col-span-3 flex flex-col gap-6 md:gap-8 justify-center">
                        <div className="relative aspect-4/5 rounded-[24px] md:rounded-[32px] overflow-hidden group">
                            {images[1] ? (
                                <Image
                                    src={urlFor(images[1].image).width(600).url()}
                                    alt=""
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-neutral-100" />
                            )}
                        </div>
                        <div className="relative aspect-4/5 rounded-[24px] md:rounded-[32px] overflow-hidden group">
                            {images[2] ? (
                                <Image
                                    src={urlFor(images[2].image).width(600).url()}
                                    alt=""
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-neutral-100" />
                            )}
                        </div>
                    </div>

                    {/* Right Column: 1 Large Image + Button */}
                    <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
                        <div className="relative aspect-3/4 rounded-[24px] md:rounded-[32px] overflow-hidden group flex-1">
                            {images[3] ? (
                                <Image
                                    src={urlFor(images[3].image).width(800).url()}
                                    alt=""
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-neutral-100" />
                            )}
                        </div>

                        <button
                            onClick={() => openAuthModal("signup")}
                            className="w-full py-5 md:py-6 rounded-full border-2 border-primary-active text-primary-active font-black uppercase tracking-widest hover:bg-primary-active hover:text-white transition-all duration-300 shadow-lg shadow-primary-active/10 text-sm md:text-base"
                        >
                            {settings.buttonText || "Become A Member"}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
