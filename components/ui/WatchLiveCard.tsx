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
    <div className="relative overflow-hidden rounded-[20px] h-[300px] md:h-[360px] flex bg-prim-9">
      {/* LEFT PANEL */}
      <div className="relative z-10 w-[55%] h-full bg-prim-9 flex items-center">
        <div className="px-8 md:px-12 max-w-md">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {title}
          </h2>

          <p className="text-neutral-2 text-base md:text-lg mb-6 leading-relaxed">
            {description}
          </p>

          <Button
            href="/"
            variant="primary"
            size="lg"
            rightIcon={
              <Icon
                icon="material-symbols:play-arrow-rounded"
                width="22"
                height="22"
              />
            }
            buttonClassName="!bg-white !text-prim-9 hover:!bg-neutral-2 px-6"
          >
            {buttonText}
          </Button>
        </div>
      </div>

      {/* DIAGONAL CUT */}
      <div
        className="absolute left-[52%] top-0 h-full w-[160px] bg-prim-9 z-20"
        style={{
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
        }}
      />

      {/* RIGHT IMAGE */}
      <div className="absolute inset-0 left-[45%]">
        {backgroundImage && (
          <Image
            src={urlFor(backgroundImage).width(1200).height(700).url()}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    </div>
  );
}
