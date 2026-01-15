"use client";

import { SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Button from "./Button";
import { Icon } from "@iconify/react";

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
    <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-br from-prim-3 to-prim-6 min-h-[300px] md:min-h-[350px] flex items-center">
      {/* Background Image */}
      {backgroundImage && (
        <>
          <Image
            src={urlFor(backgroundImage).width(1200).height(600).url()}
            alt={title}
            fill
            className="object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-prim-9/95 via-prim-9/80 to-transparent" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 max-w-2xl">
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-neutral-2 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
          {description}
        </p>
        <Button
          href="/"
          variant="secondary"
          size="lg"
          rightIcon={
            <Icon
              icon="material-symbols:play-arrow-rounded"
              width="24"
              height="24"
            />
          }
          buttonClassName="!bg-white !text-prim-9 hover:!bg-neutral-2 shadow-lg"
        >
          {buttonText}
        </Button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-prim-6/20 rounded-tl-full blur-3xl" />
      <div className="absolute top-0 right-12 w-32 h-32 md:w-48 md:h-48 bg-prim-3/20 rounded-full blur-2xl" />
    </div>
  );
}
