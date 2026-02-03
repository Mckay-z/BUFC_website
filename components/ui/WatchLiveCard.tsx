"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "./Button";
import { SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";

interface WatchLiveCardProps {
  title: string;
  description: string;
  buttonText: string;
  backgroundImage?: SanityImage;
}

export default function WatchLiveCard({
  title,
  description,
  buttonText,
  backgroundImage,
}: WatchLiveCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-prim-9 flex flex-col md:flex-row min-h-[450px] w-full max-w-[1528px] mx-auto group shadow-2xl">
      {/* CONTENT PANEL */}
      <div className="relative z-20 w-full md:w-[50%] flex items-center p-10 md:pl-[68px] order-2 md:order-1">
        <div className="w-full">
          <h2 className="text-white text-[28px] md:text-[32px] font-bold mb-4 font-montserrat leading-[1.2] md:leading-[46px] tracking-tight">
            {title}
          </h2>
          <p className="text-white/90 text-base md:text-[18px] mb-8 leading-relaxed md:leading-[156%] font-medium max-w-[480px] font-montserrat">
            {description}
          </p>
          <Button
            href="/"
            variant="primary"
            size="lg"
            rightIcon={
              <Icon
                icon="ph:broadcast-bold"
                width="22"
                height="22"
                className="ml-2 group-hover:scale-110 transition-transform"
              />
            }
            buttonClassName="!bg-white !text-prim-9 hover:!bg-prim-1 px-8 py-4 rounded-full text-[15px] font-bold transition-all shadow-lg"
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {/* SLANTED IMAGE SECTION */}
      <div className="relative z-10 w-full md:absolute md:inset-0 h-[260px] md:h-full order-1 md:order-2 overflow-hidden">
        <div
          className="md:absolute md:inset-y-0 md:right-0 md:w-[62%] h-full w-full overflow-hidden"
        >
          {/* Shared Image Container with Desktop-only Slant */}
          <div className="relative w-full h-full md:[clip-path:polygon(18%_0%,100%_0%,100%_100%,0%_100%)]">
            {backgroundImage ? (
              <Image
                src={urlFor(backgroundImage).width(1200).url()}
                alt={title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-[4s] ease-out"
                priority
              />
            ) : (
              <div className="w-full h-full bg-prim-10 opacity-50" />
            )}

            {/* Desktop edge gradient for seamless blending with the purple background */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-prim-9/80 via-transparent to-transparent hidden md:block" />

            {/* Mobile bottom gradient for readability if stacked */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-prim-9 via-transparent to-transparent md:hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}
