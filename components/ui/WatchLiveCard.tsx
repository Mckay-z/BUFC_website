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
      <div className="relative z-10 w-[70%] h-full bg-prim-9 flex items-center">
        <div className="px-8 md:px-10 max-w-[600px]">
          <h2 className="text-white text-[30px] md:text-[32px] font-bold mb-2">
            {title}
          </h2>

          <p className="text-neutral-2 text-base md:text-lg mb-4 leading-relaxed">
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

      {/* SLANTED IMAGE CONTAINER */}
      <div
        className="absolute inset-0 z-10"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 48% 100%, 62% 0)"
        }}
      >
        {backgroundImage && (
          <Image
            src={urlFor(backgroundImage).url()}
            alt={title}
            fill
            className="object-top-left "
            priority
          />
        )}
      </div>
    </div>
  );
}
