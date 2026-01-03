"use client";

import { LiveMatchesSettings } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import SectionHeader from "./SectionHeader";
import ImageFallback from "../ui/ImageFallBack";
import Button from "../ui/Button";
import { useState } from "react";

interface LiveMatchesSectionProps {
  settings: LiveMatchesSettings;
}

// Helper function to extract YouTube video ID from various YouTube URL formats
function extractYouTubeId(url: string): string {
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
}

export default function LiveMatchesSection({
  settings,
}: LiveMatchesSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <section className=" bg-neutral-1 ">
      <div className="h-screen container-wide section-padding flex flex-col items-center justify-center gap-12 md:gap-20">
        {/* Section Header */}
        <SectionHeader
          title={settings.sectionTitle}
          subtext={settings.sectionSubtext}
        />

        {/* Video Player Container */}
        <div className="w-full mx-auto flex flex-col items-center gap-16 md:gap-20">
          {/* Video Thumbnail/Player */}
          <div className="relative w-full md:max-w-[700px] lg:max-w-[750px] h-[425px] md:h-[440px] rounded-[20px] md:rounded-3xl overflow-hidden group">
            {settings.isLive && settings.videoUrl && isPlaying ? (
              <>
                {/* YouTube Embedded Player */}
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(
                    settings.videoUrl
                  )}?autoplay=1&mute=0`}
                  title={settings.sectionTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </>
            ) : (
              <>
                {/* Thumbnail with gradient overlay */}
                {settings.videoThumbnail ? (
                  <>
                    <Image
                      src={urlFor(settings.videoThumbnail)
                        .width(1200)
                        .height(675)
                        .url()}
                      alt={settings.sectionTitle}
                      fill
                      className="object-cover object-center"
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 60.4%, #2A2A2A 100%)",
                      }}
                    />
                  </>
                ) : (
                  <ImageFallback
                    icon="mdi:video"
                    width="80"
                    height="80"
                    className="bg-gradient-to-br from-primary via-prim-7 to-prim-9"
                  />
                )}

                {/* Badge - Live or Last Match */}
                {settings.isLive ? (
                  <div className="absolute top-3 md:top-4 left-3 md:left-4  flex items-center gap-1 px-2 py-1.5 bg-transparent border-2 border-[#FF0000] rounded-full z-10">
                    <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-transparent border-2 border-[#FF0000] rounded-full animate-pulse" />
                    <span className="text-[#FF0000] text-[13px] md:text-sm font-semibold uppercase">
                      Live
                    </span>
                  </div>
                ) : settings.videoUrl && settings.videoThumbnail ? (
                  <div className="absolute top-2.5 md:top-4 left-2.5 md:left-4 flex items-center gap-1 px-2.5 py-1.5 bg-neutral-9/50 backdrop-blur-sm rounded-full z-10">
                    <span className="text-white text-[13px] md:text-sm font-medium capitalize">
                      Last Match
                    </span>
                  </div>
                ) : null}

                {/* YouTube Icon Button */}
                {settings.videoUrl && settings.isLive ? (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group/play cursor-pointer"
                  >
                    <Icon
                      icon="logos:youtube-icon"
                      width="256"
                      height="180"
                      className="w-14 md:w-18 transition-all duration-300 group-hover/play:scale-105"
                    />
                  </button>
                ) : settings.videoUrl ? (
                  <Link
                    href={settings.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center group/play"
                  >
                    <Icon
                      icon="logos:youtube-icon"
                      width="256"
                      height="180"
                      className="w-14 md:w-18 transition-all duration-300 group-hover/play:scale-105"
                    />
                  </Link>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      icon="logos:youtube-icon"
                      width="256"
                      height="180"
                      className="w-14 md:w-18 transition-all duration-300 group-hover/play:scale-105"
                    />
                  </div>
                )}
              </>
            )}
          </div>

          <Button
            href="/pastHighlights"
            variant="ghost"
            size="lg"
            rightIcon={
              <Icon
                icon="icons8:chevron-right-round"
                width="none"
                height="none"
                className="w-5 h-5 lg:w-6 lg:h-6"
              />
            }
            buttonClassName="!p-0 hover:!text-prim-6 transition-colors duration-300 ease-in-out text-base md:text-lg"
          >
            Watch Past Matches
          </Button>
        </div>
      </div>
    </section>
  );
}
