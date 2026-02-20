"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeader from "@/components/layout/SectionHeader";
import { CommunityPageSettings, CommunityProject, SanityImage } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import JoinHuntersPack from "@/components/layout/JoinHuntersPack";
import { useUI } from "@/context/UIContext";

// Helper function for date formatting (matching user image)
const formatDate = (dateString: string) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();

    const j = day % 10, k = day % 100;
    let suffix = "th";
    if (j === 1 && k !== 11) suffix = "st";
    if (j === 2 && k !== 12) suffix = "nd";
    if (j === 3 && k !== 13) suffix = "rd";

    return `${day}${suffix} ${month} ${year}`;
};

// Mock Data for statistics (Fallbacks)
const DUMMY_STATS = [
    { label: "Active Members", value: "5,000+" },
    { label: "Matches Attended", value: "120" },
    { label: "Projects Completed", value: "25" },
    { label: "Lives Impacted", value: "10K+" },
];



// High-quality local placeholders for empty bento slots
const DUMMY_PROJECTS = [
    {
        _id: "dummy-1",
        title: "Elite Youth Academy Development",
        slug: { current: "#" },
        imageUrl: "/img/bufc_stadium.png",
        description: "Empowering the next generation of football stars through structured technical training and academic support."
    },
    {
        _id: "dummy-2",
        title: "Health & Wellness Outreach",
        slug: { current: "#" },
        imageUrl: "/img/fans.jpg",
        description: "Mobile clinics providing essential health screenings and sports medicine advice to rural communities."
    },
    {
        _id: "dummy-3",
        title: "Sustainable Green Initiative",
        slug: { current: "#" },
        imageUrl: "/img/banner.jpg",
        description: "Tree planting and waste management programs to keep our stadium and surrounding environment clean."
    },
    {
        _id: "dummy-4",
        title: "Football For All Tournament",
        slug: { current: "#" },
        imageUrl: "/img/gallery-banner-v2.jpg",
        description: "Uniting local communities through competitive and friendly football matches across the region."
    },
];

interface DummyProject {
    _id: string;
    title: string;
    slug: { current: string };
    imageUrl: string;
    description: string;
}

interface CommunityPageContentProps {
    settings: CommunityPageSettings | null;
    featuredProjects: CommunityProject[];
    joinHuntersPackSettings?: {
        title: string;
        description: string;
        buttonText: string;
        images: Array<{
            image: SanityImage;
            order: number;
        }>;
    };
}

export default function CommunityPageContent({
    settings,
    featuredProjects,
    joinHuntersPackSettings,
}: CommunityPageContentProps) {
    const { openAuthModal } = useUI();

    return (
        <div className="w-full">
            {/* Page Header */}
            <PageHeader
                title={settings?.heroTitle || "Community"}
                subtitle={settings?.heroSubtitle || "Detailed information about our community initiatives."}
                backgroundImage={settings?.heroImage}
                variant="standard"
            />

            {/* Intro & Stats Section */}
            <section className="container-wide py-12 md:py-20">
                <div className="flex flex-col items-center text-center mb-16">
                    {/* Community Crowd Image with Text Overlay */}
                    <div className="relative w-full max-w-7xl aspect-[2.35/1] rounded-3xl overflow-hidden mb-8 shadow-xl border-4 border-white flex items-end justify-center">
                        <Image
                            src="/img/fans.jpg"
                            alt="Bechem United Community Support"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Overlay gradient for depth and text readability */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                        <div className="relative z-10 p-6 md:p-10 lg:p-12 text-center w-full">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase mb-3 md:mb-4 max-w-3xl mx-auto leading-tight drop-shadow-lg">
                                {settings?.heroTitle || "Join Our Community"}
                            </h2>
                            <p className="text-white/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto font-medium drop-shadow-md">
                                {settings?.heroSubtitle || "Together we are stronger. Be part of something bigger than just football."}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={() => openAuthModal("signup")}
                                    buttonClassName="px-8 py-4 bg-white hover:bg-primary shadow-lg group transition-all duration-300"
                                    textClassName="text-lg font-bold text-primary group-hover:text-white transition-colors duration-300"
                                >
                                    {settings?.joinButtonText || "Join Community"}
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    onClick={() => openAuthModal("signin")}
                                    buttonClassName="px-8 py-4 border-2 border-white hover:bg-white group"
                                    textClassName="text-lg font-bold text-white group-hover:text-primary transition-colors"
                                >
                                    {settings?.signInButtonText || "Sign In"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {(settings?.statistics || DUMMY_STATS).map((stat, idx) => (
                        <Card
                            key={idx}
                            variant="default"
                            padding="lg"
                            cardClassName="text-center group hover:-translate-y-1"
                        >
                            <div className="font-mona-sans font-black text-4xl md:text-5xl text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </div>
                            <div className="font-montserrat font-bold text-neutral-5 uppercase tracking-wider text-xs md:text-sm">
                                {stat.label}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Featured Projects */}
            <section className="bg-neutral-2 py-16 md:py-24">
                <div className="container-wide">
                    <SectionHeader
                        title={settings?.featuredProjectsTitle || "Featured Projects"}
                        subtext={settings?.featuredProjectsSubtext || "Highlighting our most significant community initiatives."}
                        showLine
                        uppercase
                        className="mb-12"
                    >
                        <Link
                            href="/community/projects"
                            className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm uppercase tracking-wider"
                        >
                            VIEW ALL <Icon icon="ph:arrow-right" />
                        </Link>
                    </SectionHeader>

                    {/* Bento Grid with Fallbacks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px]">
                        {/* Column 1: Hero Project Card */}
                        {(() => {
                            const project = (featuredProjects?.[0] || DUMMY_PROJECTS[0]) as (CommunityProject | DummyProject);
                            const imgSrc = 'featuredImage' in project && project.featuredImage
                                ? urlFor(project.featuredImage).width(600).height(800).url()
                                : (project as DummyProject).imageUrl;

                            const dateLabel = 'startDate' in project && project.startDate
                                ? formatDate(project.startDate)
                                : '_createdAt' in project
                                    ? formatDate(project._createdAt)
                                    : "Featured Initiative";

                            return (
                                <Link
                                    href={project.slug?.current === "#" ? "#" : `/community/projects/${project.slug?.current}`}
                                    className="group relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <Image
                                        src={imgSrc}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                                    {/* Date/Category Badge */}
                                    <div className="absolute top-8 left-8">
                                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10">
                                            {dateLabel}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-8 left-8 right-8 text-white">
                                        <h3 className="font-mona-sans font-black text-xl mb-2 uppercase leading-snug">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/70 text-sm line-clamp-2">
                                            {'description' in project && typeof project.description === 'string'
                                                ? project.description
                                                : "Driving impact through dedicated community initiatives."}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })()}

                        {/* Column 2: Info Card (Always Present) */}
                        <div className="bg-neutral-9 rounded-[32px] p-10 flex flex-col justify-between text-white shadow-sm hover:shadow-xl transition-all duration-500 order-first lg:order-0">
                            <div>
                                <h3 className="font-mona-sans font-black text-2xl mb-8 uppercase tracking-wide">
                                    NEWS & UPDATES
                                </h3>
                                <div className="space-y-6 text-white/70 text-sm md:text-base leading-relaxed">
                                    <p>
                                        Welcome to the home of Bechem United FC news. Here you&apos;ll find everything from match day coverage and player spotlights to community initiatives and youth development programs that define who we are.
                                    </p>
                                    <p>
                                        The Hunters are more than a team&mdash;we&apos;re a community. Stay updated with news that matters, from the pitch to the people who make this club special.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/news"
                                className="self-end flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium border-b border-transparent hover:border-white/20 pb-1"
                            >
                                Discover more <Icon icon="ph:arrow-up-right-bold" />
                            </Link>
                        </div>

                        {/* Column 3: Nested Nested Grid */}
                        <div className="grid grid-cols-2 grid-rows-2 gap-4">
                            {/* Small Card 1 */}
                            {(() => {
                                const project = (featuredProjects?.[1] || DUMMY_PROJECTS[1]) as (CommunityProject | DummyProject);
                                const imgSrc = 'featuredImage' in project && project.featuredImage
                                    ? urlFor(project.featuredImage).width(400).height(400).url()
                                    : (project as DummyProject).imageUrl;
                                return (
                                    <Link
                                        href={project.slug?.current === "#" ? "#" : `/community/projects/${project.slug?.current}`}
                                        className="relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <Image
                                            src={imgSrc}
                                            alt={project.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                );
                            })()}

                            {/* Small Card 2 */}
                            {(() => {
                                const project = (featuredProjects?.[2] || DUMMY_PROJECTS[2]) as (CommunityProject | DummyProject);
                                const imgSrc = 'featuredImage' in project && project.featuredImage
                                    ? urlFor(project.featuredImage).width(400).height(400).url()
                                    : (project as DummyProject).imageUrl;
                                return (
                                    <Link
                                        href={project.slug?.current === "#" ? "#" : `/community/projects/${project.slug?.current}`}
                                        className="relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <Image
                                            src={imgSrc}
                                            alt={project.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                );
                            })()}

                            {/* Wide Card */}
                            {(() => {
                                const project = (featuredProjects?.[3] || DUMMY_PROJECTS[3]) as (CommunityProject | DummyProject);
                                const imgSrc = 'featuredImage' in project && project.featuredImage
                                    ? urlFor(project.featuredImage).width(800).height(400).url()
                                    : (project as DummyProject).imageUrl;
                                return (
                                    <Link
                                        href={project.slug?.current === "#" ? "#" : `/community/projects/${project.slug?.current}`}
                                        className="relative col-span-2 overflow-hidden rounded-[32px] shadow-sm hover:shadow-lg transition-all"
                                    >
                                        <Image
                                            src={imgSrc}
                                            alt={project.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </Link>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Activity Teaser (Blurred) */}
            <section className="bg-neutral-100 py-16 md:py-24 relative overflow-hidden group/teaser">
                <div className="container-wide relative z-10">
                    <SectionHeader
                        title={settings?.activityTeaserTitle || "Join conversation"}
                        subtext={settings?.activityTeaserSubtext || "See what our community members are discussing and creating."}
                        showLine
                        uppercase
                        className="mb-24"
                    />

                    <div className="relative max-w-5xl mx-auto min-h-[500px]">
                        {/* Subtle Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                            <Image src="/img/fans.jpg" alt="" fill className="object-cover grayscale" />
                        </div>

                        {/* Blurred Timeline Background */}
                        <div className="absolute inset-x-0 top-0 bottom-[-100px] opacity-25 group-hover/teaser:opacity-40 select-none overflow-hidden filter blur-[3px] group-hover/teaser:blur-[1px] transition-all duration-1000">
                            <div className="flex flex-col gap-8 max-w-3xl mx-auto">
                                {[
                                    { user: "Kwame B", time: "2m ago", text: "Match prediction: Bechem 2-0 Hearts. Let's go Hunters!", type: "post" },
                                    { user: "Ama S", time: "15m ago", type: "photo", text: "Ready for the weekend fixture! 💛💜" },
                                    { type: "poll", title: "Man of the Match?", options: ["Hafiz Konkoni", "Augustine Okrah"] },
                                    { user: "Official Bechem FC", time: "1h ago", text: "New training sessions update...", type: "update" },
                                    { user: "Fan Pulse", time: "2h ago", text: "Who's traveling for the away match?", type: "post" },
                                    { user: "Legacy Hunter", time: "3h ago", text: "Remember the 2016 FA Cup win? What a day!", type: "post" }
                                ].map((item, i) => {
                                    const projectImg = featuredProjects[i % featuredProjects.length]?.featuredImage;

                                    return (
                                        <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200/50 shadow-sm relative overflow-hidden">
                                            {item.type === "photo" && projectImg && (
                                                <div className="absolute inset-0 opacity-20">
                                                    <Image src={urlFor(projectImg).width(400).url()} alt="" fill className="object-cover" />
                                                </div>
                                            )}

                                            <div className="relative z-10">
                                                {item.type !== "poll" && (
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 rounded-full bg-neutral-100 overflow-hidden border border-neutral-200">
                                                            {projectImg ? (
                                                                <Image src={urlFor(projectImg).width(40).url()} alt="" fill className="object-cover" />
                                                            ) : (
                                                                <Icon icon="ph:user-circle-bold" className="text-neutral-300 w-full h-full" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="h-4 w-24 bg-neutral-200/50 rounded mb-1" />
                                                            <div className="h-3 w-16 bg-neutral-100/50 rounded" />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="space-y-2">
                                                    <div className="h-4 w-full bg-neutral-100/50 rounded" />
                                                    <div className="h-4 w-[85%] bg-neutral-100/50 rounded" />
                                                    {item.type === "poll" && (
                                                        <div className="pt-4 space-y-3">
                                                            <div className="h-10 w-full bg-primary/5 rounded-xl border border-primary/10" />
                                                            <div className="h-10 w-full bg-neutral-50 rounded-xl" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Blurred Content Overlay */}
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center -top-12">
                            <div className="text-center max-w-md bg-white rounded-[40px] shadow-2xl border border-neutral-100 ring-1 ring-black/5 overflow-hidden hover:shadow-[0_48px_96px_-24px_rgba(63,42,120,0.15)] hover:translate-y-[-8px] transition-all duration-700 group/card cursor-default">
                                <div className="relative h-44 w-full overflow-hidden">
                                    <Image
                                        src={settings?.huntersHub?.image ? urlFor(settings.huntersHub.image).width(800).url() : "/img/fans.jpg"}
                                        alt=""
                                        fill
                                        className="object-cover group-hover/card:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-primary/60 backdrop-blur-[1px] group-hover/card:bg-primary/50 transition-colors duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-700">
                                            <Icon icon="ph:lock-key-duotone" className="w-10 h-10" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10 pt-8">
                                    <h3 className="font-mona-sans font-black text-3xl mb-4 text-neutral-9 uppercase tracking-tight leading-none group-hover/card:text-primary transition-colors">
                                        {settings?.huntersHub?.title || "Hunters Hub"}
                                    </h3>
                                    <p className="text-neutral-5 mb-10 text-[15px] leading-relaxed font-medium">
                                        {settings?.huntersHub?.description ||
                                            "Join our official internal community for exclusive match threads, player AMAs, and premium content."}
                                    </p>
                                    <Button
                                        fullWidth
                                        onClick={() => openAuthModal("signup")}
                                        buttonClassName="py-5 text-lg font-black uppercase tracking-widest shadow-lg shadow-primary/20 group-hover/card:shadow-primary/30 transition-all"
                                    >
                                        {settings?.huntersHub?.buttonText || "Create Free Account"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Join the Hunters Pack Component */}
            <JoinHuntersPack
                settings={joinHuntersPackSettings}
                fallbackImages={featuredProjects.map(p => ({ image: p.featuredImage }))}
            />

            {/* CTA Banner */}
            <section className="py-28 bg-[#3F2A78] relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-[#3F2A78] to-[#25184b]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/cta_pattern.png')] opacity-10" />

                <div className="container-wide relative z-10 text-center">
                    <h2 className="font-mona-sans font-black text-4xl md:text-6xl text-white uppercase mb-6 max-w-4xl mx-auto leading-none">
                        {settings?.ctaTitle || "Ready to make a difference?"}
                    </h2>
                    <p className="font-montserrat text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
                        {settings?.ctaSubtext ||
                            "Join thousands of fans making an impact in our community today."}
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => openAuthModal("signup")}
                        buttonClassName="!bg-white !text-[#3F2A78] border-2 border-transparent hover:!bg-[#3F2A78] hover:!text-white hover:!border-white shadow-2xl font-black uppercase tracking-widest px-10 transition-all duration-300"
                    >
                        {settings?.ctaButtonText || "Get Involved Now"}
                    </Button>
                </div>
            </section>
        </div>
    );
}
