"use client";

import { CommunityProject, CommunityPageSettings } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";

interface ProjectsPageContentProps {
    allProjects: CommunityProject[];
    settings: CommunityPageSettings | null;
}

export default function ProjectsPageContent({
    allProjects,
    settings,
}: ProjectsPageContentProps) {
    const [activeTab, setActiveTab] = useState("All Projects");
    const [visibleCount, setVisibleCount] = useState(12);

    const categories = [
        "All Projects",
        "Ongoing",
        "Completed",
        "Education",
        "Health",
        "Youth Development",
    ];

    const filteredProjects = useMemo(() => {
        if (activeTab === "All Projects") return allProjects;
        return allProjects.filter(
            (p) => p.status === activeTab || p.category === activeTab
        );
    }, [allProjects, activeTab]);

    const displayedProjects = filteredProjects.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 8);
    };

    return (
        <div className="bg-neutral-1 min-h-screen pb-20">
            {/* Page Header */}
            <PageHeader
                title={settings?.projectsPageTitle || "Community Projects"}
                subtitle={settings?.projectsPageSubtitle || "Explore our ongoing and completed initiatives driving positive change."}
                backgroundImage={settings?.projectsPageImage}
                variant="standard"
            />

            <section className="container-wide py-12">
                {/* Filter Tabs - Gallery Style */}
                <div className="flex justify-start md:justify-center mb-16 overflow-x-auto pb-4 scrollbar-hide">
                    <div className="inline-flex items-center bg-white p-1.5 rounded-full shadow-lg shadow-black/5 border border-black/5 min-w-max">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveTab(cat);
                                    setVisibleCount(12);
                                }}
                                className={`px-6 md:px-10 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === cat
                                    ? "bg-primary text-white"
                                    : "text-neutral-7 hover:bg-neutral-2"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                    {displayedProjects.map((project) => (
                        <Link
                            href={`/community/projects/${project.slug?.current}`}
                            key={project._id}
                            className="group block"
                        >
                            <Card variant="default" padding="none" hoverable cardClassName="overflow-hidden h-full flex flex-col border border-neutral-2 shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="relative aspect-16/10 overflow-hidden">
                                    {project.featuredImage ? (
                                        <Image
                                            src={urlFor(project.featuredImage).width(600).height(400).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-2 flex items-center justify-center text-neutral-4">
                                            <Icon icon="ph:image" className="w-12 h-12" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${project.status === "Ongoing"
                                                ? "bg-green-500 text-white border-green-600"
                                                : project.status === "Completed"
                                                    ? "bg-blue-500 text-white border-blue-600"
                                                    : "bg-yellow-500 text-white border-yellow-600"
                                                }`}
                                        >
                                            {project.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-mona-sans font-extrabold text-xl mb-3 text-neutral-9 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                        {project.title}
                                    </h3>
                                    <div className="mt-auto pt-6 flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((i) => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-neutral-3 flex items-center justify-center overflow-hidden">
                                                    <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                                                        <Icon icon="ph:user" className="text-primary w-4 h-4" />
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-neutral-2 flex items-center justify-center text-[10px] font-bold text-neutral-6">
                                                +12
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                                            Learn More <Icon icon="ph:arrow-right" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}

                    {displayedProjects.length === 0 && (
                        <div className="col-span-full py-24 text-center bg-white rounded-3xl border-2 border-dashed border-neutral-3">
                            <div className="w-20 h-20 bg-neutral-2 rounded-full flex items-center justify-center mx-auto mb-6 text-neutral-4">
                                <Icon icon="ph:magnifying-glass" className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-8 mb-2">No projects found</h3>
                            <p className="text-neutral-5">Try selecting a different category or status.</p>
                        </div>
                    )}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProjects.length && (
                    <div className="flex justify-center mt-12 pb-20">
                        <button
                            onClick={handleLoadMore}
                            className="flex items-center gap-3 bg-white px-10 py-5 rounded-full shadow-xl shadow-black/5 hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 font-bold text-neutral-8 hover:text-primary group"
                        >
                            Load More Projects
                            <Icon
                                icon="ph:caret-down"
                                className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                            />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
