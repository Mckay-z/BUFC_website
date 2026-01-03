"use client";

import { SponsorSettings } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";

interface SponsorSectionProps {
  settings: SponsorSettings;
}

export default function SponsorSection({ settings }: SponsorSectionProps) {
  if (!settings?.sponsors || settings.sponsors.length === 0) {
    return null;
  }

  // Sort sponsors by order
  const sortedSponsors = [...settings.sponsors].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });

  return (
    <section className="bg-neutral-1 py-10">
      <div className="container-wide">
        {/* Section Title */}
        <h2 className="text-center text-primary-active text-[15px] md:text-base xl:text-lg font-medium max-w-[250px] sm:max-w-full mx-auto">
          {settings.sponsorSectionTitle}
        </h2>

        {/* Sponsors Grid */}
        <div className="mt-6 md:mt-7 flex flex-wrap justify-center items-center content-center gap-y-[40px] gap-x-[59px] self-stretch w-full lg:gap-16">
          {sortedSponsors.map((sponsor) => {
            const SponsorImage = (
              <div className="relative group cursor-pointer">
                {/* Sponsor Logo */}
                <Image
                  src={urlFor(sponsor.logo).width(300).height(200).url()}
                  alt={sponsor.name}
                  width={300}
                  height={200}
                  className={` ${sponsor.name.toLowerCase().includes("agroking") ? "w-40 md:w-52" : "w-28 md:w-32"}  object-contain transition-all duration-300 ease-in-out group-hover:opacity-0`}
                  //   style={{
                  //     filter:
                  //       "brightness(0) saturate(100%) invert(29%) sepia(36%) saturate(1279%) hue-rotate(228deg) brightness(91%) contrast(91%)",
                  //   }}
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(84%) sepia(12%) saturate(664%) hue-rotate(207deg) brightness(97%) contrast(80%)",
                  }}
                />
                {/* On hover, show original colors */}
                <Image
                  src={urlFor(sponsor.logo).width(300).height(200).url()}
                  alt={sponsor.name}
                  width={300}
                  height={200}
                  className={`${sponsor.name.toLowerCase().includes("agroking") ? "w-48 md:w-52" : "w-28 md:w-32"} absolute inset-0 object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
                />
              </div>
            );
            //   const SponsorImage = (
            //     <div className="relative group cursor-pointer">
            //       {/* Sponsor Logo - Filtered version */}
            //       <Image
            //         src={urlFor(sponsor.logo).width(300).height(200).url()}
            //         alt={sponsor.name}
            //         width={300}
            //         height={200}
            //         className="w-32 h-auto object-contain opacity-30 transition-all duration-300 ease-in-out group-hover:opacity-0"
            //       />

            //       {/* Original Logo - Shows on hover */}
            //       <Image
            //         src={urlFor(sponsor.logo).width(300).height(200).url()}
            //         alt={sponsor.name}
            //         width={300}
            //         height={200}
            //         className="absolute inset-0 w-32 h-auto object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
            //       />
            //     </div>
            //   );

            // If website exists, wrap in link
            if (sponsor.website) {
              return (
                <Link
                  key={sponsor._key}
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${sponsor.name} website`}
                >
                  {SponsorImage}
                </Link>
              );
            }

            // Otherwise just render the image
            return <div key={sponsor._key}>{SponsorImage}</div>;
          })}
        </div>
      </div>
    </section>
  );
}
