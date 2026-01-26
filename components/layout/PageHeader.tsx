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
      <section className="relative h-[250px] sm:h-[285px] md:h-[300px] lg:h-[350px] xl:h-[400px] w-full overflow-hidden">
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
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-7 to-primary-9" />
        )}

        {/* Content */}
        <div className="relative h-full container-wide flex items-end justify-start pb-5 md:pb-10">
          <h1 className="text-neutral-1 text-[32px] xs:text-4xl md:text-5xl lg:text-[56px] font-bold">
            {title}
          </h1>
        </div>
      </section>
    );
}
