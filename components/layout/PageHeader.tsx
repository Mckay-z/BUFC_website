"use client";

import { SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  backgroundImage?: SanityImage;
}

export default function PageHeader({
  title,
  backgroundImage,
}: PageHeaderProps) {
  return (
    <section className="relative h-[200px] xs:h-[250px] md:h-[300px] lg:h-[350px] w-full overflow-hidden">
      {/* Background Image */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={urlFor(backgroundImage).width(1920).height(600).url()}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ) : (
        // Fallback gradient background
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-prim-7 to-prim-9" />
      )}

      {/* Content */}
      <div className="relative h-full container-wide flex items-center justify-center">
        <h1 className="text-neutral-1 text-3xl xs:text-4xl md:text-5xl lg:text-6xl font-bold text-center">
          {title}
        </h1>
      </div>
    </section>
  );
}
