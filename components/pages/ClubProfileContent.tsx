"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {
    GalleryImage,
    ClubPageSettings,
    ClubIdentitySettings,
    ClubPillar,
    Facility,
    StaffMember,
    SponsorSettings,
    Trophy,
    RecordBreaker,
    WallOfFameCategory
} from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeader from "@/components/layout/SectionHeader";
import SponsorSection from "@/components/layout/SponsorSection";
import JoinHuntersPack from "@/components/layout/JoinHuntersPack";

interface ClubProfileContentProps {
    galleryImages: GalleryImage[];
    pageSettings?: ClubPageSettings;
    identitySettings?: ClubIdentitySettings;
    pillars: ClubPillar[];
    facilities: Facility[];
    staffMembers: StaffMember[];
    sponsorSettings?: SponsorSettings;
    trophies?: Trophy[];
    wallOfFameCategories?: WallOfFameCategory[];
    recordBreakers?: RecordBreaker[];
    initialTab?: string;
}

const TABS = [
    { id: "profile", label: "Club Profile" },
    { id: "history", label: "History" },
    { id: "facilities", label: "Facilities" },
    { id: "honors", label: "Honors" },
];

const FALLBACK_HISTORY_ERAS = [
    {
        title: "Club Foundation Era",
        period: "1966 - 2006",
        icon: "mdi:seedling",
        description:
            "Bechem United Football Club was born in 1966 in Bechem, Ahafo Region. Nicknamed The Hunters, we began our journey with a vision to represent our community through passionate, determined football that would unite and inspire our people. \n\nOver four decades, we built our identity in the lower divisions, established fierce rivalries with Brong Ahafo Stars and Berekum Chelsea, and created a loyal fanbase. These foundational years saw us develop the aggressive, never-give-up mentality that defines the Hunters to this day, laying the groundwork for our eventual rise to national prominence.",
        keyAchievements: [],
    },
    {
        title: "International Recognition",
        period: "2007 - 2010",
        icon: "mynaui:globe-solid",
        description:
            "In 2007, our youth team traveled to Italy to compete in the prestigious Trofeo Karol Wojtyla tournament in Fiumicino, Province of Rome, Lazio region. This marked our first international appearance and demonstrated our commitment to youth development on the world stage.\n\nThese years focused on building infrastructure, strengthening our Division One campaigns, and preparing for the historic breakthrough that would come in 2011. We invested in player development, improved our training facilities, and set our sights firmly on Ghana's top flight, knowing that the Hunters belonged among the nation's elite.",
        keyAchievements: [],
    },
    {
        title: "Glory Years",
        period: "2011 - 2017",
        icon: "game-icons:trophy-cup",
        description:
            "September 2011 - Champions of Poly Tank Division One League Zone 1! We earned promotion to the Ghana Premier League, changing our club's trajectory forever. \n\nOn October 10, 2011, Eric Fordjour scored our historic first top-flight goal from the penalty spot against Aduana Stars. Richard Addae became our debut season hero with 11 goals, finishing 3rd in the entire league's scoring charts. \n\nThen came September 2016 at Cape Coast Stadium - our finest moment. Yaw Annor's memorable brace secured a 2-1 victory over Okwawu United, bringing home our first major national trophy, the Ghana FA Cup. \n\nIn 2017, we competed in the Ghana Super Cup final as runners-up, cementing our status among the nation's elite. From promoted club to national champions in just five years - this was the era that defined modern Bechem United.",
        keyAchievements: [
            "Poly Tank Division One Zone 1 Champions (2010-11)",
            "Ghana FA Cup Winners (2016)",
            "Ghana Super Cup Runners-Up (2017)",
        ],
    },
    {
        title: "Consolidation & Growth",
        period: "2018 - 2022",
        icon: "fluent:arrow-growth-24-filled",
        description:
            "A period of stability, strong leadership, and consistent Premier League competition. We were blessed with exceptional captains who embodied the Hunter spirit: Asante Agyemang (2017-2018), Daniel Egyin (2018-2019), Prince Asempa (2019-2020), and Moro Salifu (2020-2021), who later earned a move to Al Ittihad of Egypt - proving Bechem United is a pathway to international careers. \n\nWe attracted world-class coaching talent including Mohammed Adil Erradi (2015-2016), the mastermind behind our FA Cup triumph, and Romain Folz (2020), who brought European coaching methods and elevated our tactical approach to new professional standards. \n\nThese years established us as consistent competitors, focused on player development, and built the foundation for sustained success at the highest level of Ghanaian football.",
        keyAchievements: [],
    },
];

const FALLBACK_TROPHIES = [
    {
        _id: "fb-1",
        name: "Ghana FA Cup Winners",
        year: "2016",
        tag: "First Major Trophy",
        description: "Our crowning achievement. Yaw Annor's heroic brace defeated Okwawu United 2-1 at Cape Coast Stadium, securing our first major national trophy and etching our names in Ghanaian football history forever.",
    },
    {
        _id: "fb-2",
        name: "Poly Tank Division One Zone 1 Champions",
        year: "2011",
        tag: "The Beginning",
        description: "The promotion that changed everything. Winning this title earned us a place among Ghana's elite, launching our journey in the Premier League where we've competed for over 13 seasons.",
    },
    {
        _id: "fb-3",
        name: "Ghana Super Cup Runners-Up",
        year: "2017",
        tag: "Super Cup Finalist",
        description: "Following our FA Cup triumph, we competed for the Super Cup, demonstrating our consistency at the national level and proving we belonged among Ghana's best clubs.",
    }
] as unknown as Trophy[];

export default function ClubProfileContent({
    galleryImages,
    pageSettings,
    identitySettings,
    pillars,
    facilities,
    staffMembers,
    sponsorSettings,
    trophies = [],
    wallOfFameCategories = [],
    recordBreakers = [],
    initialTab = "profile",
}: ClubProfileContentProps) {
    const [activeTab, setActiveTab] = useState(initialTab);

    // Handle hash scrolling
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        }
    }, [activeTab]);

    // Dynamic Identity Data
    const IDENTITY = [
        {
            title: "Who We Are",
            icon: "stash:shield-duotone",
            content: identitySettings?.whoWeAre || "Bechem United Football Club is a professional Ghanaian football club based in Bechem, Ahafo Region. We embody the pride and passion of our community, living by our slogan, Vision With Precision, which reflects our commitment to moving forward with purpose and exacting standards.",
        },
        {
            title: "Our Colors",
            icon: "material-symbols-light:invert-colors-rounded",
            content: identitySettings?.colors?.description || "We wear our distinctive purple and yellow colors with immense pride, displaying them boldly on the football pitch. These vibrant colors represent our community, our passion, and our unwavering spirit in every match we play",
        },
        {
            title: "Our Foundation",
            icon: "simple-icons:roots",
            content: identitySettings?.founded ? `Founded in ${identitySettings.founded}, we have nearly six decades of football heritage. Our journey from humble beginnings to the Ghana Premier League showcases our commitment to excellence and growth.` : "Founded in 1966, we have nearly six decades of football heritage. Our journey from humble beginnings to the Ghana Premier League showcases our commitment to excellence and growth.",
        },
        {
            title: "The Hunters Mentality",
            icon: "material-symbols:target",
            content: identitySettings?.huntersMentality || "Our nickname The Hunters reflects our aggressive, never-give-up mentality on the pitch. We embody the spirit of determination and excellence that has made us one of Ghana's most respected football institutions.",
        },
    ];

    // Manual offsets for executives (to match specific staggering in mockup)
    const getStaffOffset = (index: number) => {
        const offsets = ["md:mt-0", "md:mt-32", "md:mt-64", "md:-mt-16", "md:mt-16", "md:mt-48"];
        return offsets[index % offsets.length];
    };

    const staffRoleMapping: Record<string, string> = {
        president: "President & Owner",
        ceo: "CEO",
        administrativeManager: "Admin",
        headCoach: "Head Coach",
        teamManager: "Team Manager",
        publicRelationsOfficer: "PRO",
    };

    const getFacilityIcon = (tag: string) => {
        const lower = tag.toLowerCase();
        if (lower.includes("fortress") || lower.includes("stadium")) return "material-symbols-light:stadium-outline-rounded";
        if (lower.includes("train") || lower.includes("complex")) return "carbon:soccer";
        if (lower.includes("academy") || lower.includes("stars")) return "basil:diamond-outline";
        if (lower.includes("admin") || lower.includes("hub") || lower.includes("office")) return "arcticons:emoji-classical-building";
        return "mdi:map-marker-star";
    };

    return (
        <div className="bg-neutral-1 min-h-screen pb-20 font-montserrat overflow-hidden">
            {/* Integrated Page Header with Tabs */}
            <PageHeader
                title={pageSettings?.clubNameOnBanner || "Bechem United FC"}
                subtitle={pageSettings?.clubSloganOnBanner || "The Pride of Ahafo"}
                backgroundImage={pageSettings?.clubPageBannerImage}
                staticImage={!pageSettings?.clubPageBannerImage ? "/img/bufc_stadium.png" : undefined}
                tabs={TABS}
                activeTabId={activeTab}
                onTabChange={setActiveTab}
                variant="large"
            />

            <div className="animate-in fade-in duration-700">
                {/* TAB: CLUB PROFILE */}
                {activeTab === "profile" && (
                    <div className="py-20 space-y-[150px]">
                        {/* Identity Section */}
                        <section className="container-wide">
                            <SectionHeader
                                title={pageSettings?.sections?.clubIdentityTitle || "CLUB IDENTITY"}
                                subtext={pageSettings?.sections?.clubIdentitySubtitle || "Built on a legacy of excellence, passion, and a driving commitment to the development of world-class football talent."}
                                uppercase
                                showLine
                                className="mb-20"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
                                {IDENTITY.map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center group">
                                        <div className="w-24 h-24 rounded-full bg-prim-1 flex items-center justify-center mb-8 shadow-inner group-hover:bg-primary transition-all duration-500">
                                            <Icon icon={item.icon} className="text-4xl text-primary group-hover:text-white transition-colors duration-500" />
                                        </div>
                                        <h3 className="text-[22px] font-semibold text-neutral-9 mb-4 text-center leading-[140%]">{item.title}</h3>
                                        <p className="text-neutral-6 leading-relaxed max-w-sm font-medium text-center">
                                            {item.content.split(/(Vision With Precision|purple and yellow|1966|The Hunters)/gi).map((part, i) =>
                                                ["vision with precision", "purple and yellow", "1966", "the hunters"].includes(part.toLowerCase()) ? (
                                                    <span key={i} className="text-primary font-bold">{part}</span>
                                                ) : (
                                                    part
                                                )
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Pillars Section */}
                        <section className="container-wide">
                            <SectionHeader
                                title={pageSettings?.sections?.pillarsTitle || "OUR PILLARS"}
                                subtext={pageSettings?.sections?.pillarsSubtitle || "The core values and strategic vision that serve as the foundation of our club's past and future growth."}
                                uppercase
                                showLine
                                className="mb-24"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10">
                                {(pillars.length > 0 ? pillars : [
                                    { title: "Vision", icon: "mdi:binoculars", subtext: identitySettings?.vision || "To become a dominant force in African football, competing on the continental stage and elevating the pride of our community." },
                                    { title: "Mission", icon: "fe:target", subtext: identitySettings?.mission || "To build a winning culture grounded in discipline, hard work, and strategic leadership" },
                                    { title: "Commitment", icon: "tabler:heart-handshake", subtext: identitySettings?.commitment || "Develop elite talent, secure long-term excellence, and build lasting legacy for the club" }
                                ]).map((pillar, idx) => (
                                    <div key={idx} className="flex flex-col items-center text-center group">
                                        <div className="w-24 h-24 rounded-[24px] bg-prim-1 flex items-center justify-center mb-8 shadow-inner group-hover:bg-primary transition-all duration-500">
                                            <Icon icon={pillar.icon} className="text-4xl text-primary group-hover:text-white transition-colors duration-500" />
                                        </div>
                                        <h3 className="text-[22px] font-semibold text-neutral-9 mb-4 text-center leading-[140%]">{pillar.title}</h3>
                                        <p className="text-neutral-6 leading-relaxed max-w-sm font-medium text-center">
                                            {pillar.subtext}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Board Section */}
                        <section id="management" className="py-32 text-white overflow-hidden relative" style={{ background: 'linear-gradient(180deg, #3F2A78 0%, #0B0B0B 100%)' }}>
                            <div className="container-wide">
                                <SectionHeader
                                    title={pageSettings?.sections?.managementTitle || "THE TEAM BEHIND THE TEAM"}
                                    subtext={pageSettings?.sections?.managementSubtitle || "Meet the leadership preserving our legacy and building our future since 1966"}
                                    onColor
                                    showLine
                                    uppercase
                                    className="mb-32"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16 md:gap-y-10">
                                    {staffMembers.map((person, idx) => (
                                        <div key={person._id} className={`${getStaffOffset(idx)} transition-all duration-700 hover:-translate-y-2`}>
                                            <div className="aspect-4/5 rounded-[24px] overflow-hidden bg-neutral-9 relative shadow-2xl border border-white/10 group">
                                                {/* Image */}
                                                <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                                                    {person.image ? (
                                                        <Image
                                                            src={urlFor(person.image).width(600).url()}
                                                            alt={person.name}
                                                            fill
                                                            className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center opacity-20">
                                                            <Icon icon="ph:user" className="text-8xl text-white" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent opacity-100" />

                                                {/* Text Overlay */}
                                                <div className="absolute bottom-6 left-0 right-0 px-6 text-center">
                                                    <h4 className="text-[16px] md:text-[18px] font-bold mb-1 font-montserrat tracking-tight">{person.name}</h4>
                                                    <p className="text-white/60 font-medium uppercase tracking-widest text-[10px] md:text-[11px] font-montserrat">
                                                        {person.role === "other" ? person.customRole : staffRoleMapping[person.role] || person.role}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* TAB: HISTORY */}
                {activeTab === "history" && (
                    <div className="container-wide py-20 space-y-[150px]">
                        {/* History Header */}
                        <SectionHeader
                            title={pageSettings?.sections?.historyTitle || "OUR HISTORY"}
                            subtext={pageSettings?.sections?.historySubtitle || "From humble beginnings to FA Cup champions - the remarkable journey of the Hunters."}
                            uppercase
                            showLine
                            className="mb-20"
                        />

                        {/* Timeline of Eras */}
                        <div className="relative pl-[140px] md:pl-[160px] space-y-24 max-w-5xl mx-auto">
                            {/* Vertical Line */}
                            <div className="absolute left-[48px] top-12 bottom-0 w-px bg-neutral-3" />

                            {(identitySettings?.historyEras && identitySettings.historyEras.length > 0 ? identitySettings.historyEras : FALLBACK_HISTORY_ERAS).map((era, idx) => (
                                <div key={idx} className="relative">
                                    {/* Timeline Icon Circle */}
                                    <div className="absolute -left-[140px] md:-left-[160px] top-0 w-24 h-24 bg-prim-1 rounded-full flex items-center justify-center z-10 border-[6px] border-neutral-1">
                                        <Icon icon={era.icon || "mdi:history"} className="text-4xl text-primary" />
                                    </div>

                                    {/* Era Content */}
                                    <div className="space-y-4 pt-4">
                                        <span className="text-primary font-bold text-base block tracking-wide">{era.period}</span>
                                        <h3 className="text-[24px] font-bold text-neutral-9 font-montserrat leading-[1.3] tracking-tight mb-6">
                                            {era.title}
                                        </h3>

                                        <div className="space-y-6 max-w-4xl">
                                            {era.description.split('\n\n').map((paragraph, pIdx) => (
                                                <p key={pIdx} className="text-neutral-7 font-medium leading-relaxed text-lg">
                                                    {paragraph.split(/(The Hunters)/gi).map((part, i) =>
                                                        part.toLowerCase() === "the hunters" ? (
                                                            <span key={i} className="text-primary font-bold">{part}</span>
                                                        ) : (
                                                            part
                                                        )
                                                    )}
                                                </p>
                                            ))}
                                        </div>

                                        {era.keyAchievements && era.keyAchievements.length > 0 && (
                                            <div className="flex flex-wrap gap-3 mt-8">
                                                {era.keyAchievements.map((achievement, i) => (
                                                    <span key={i} className="bg-prim-1 text-primary shadow-sm border border-primary/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                                                        {achievement}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {/* TAB: FACILITIES */}
                {activeTab === "facilities" && (
                    <div className="container-wide py-20 space-y-[150px]">
                        <SectionHeader
                            title={pageSettings?.sections?.facilitiesTitle || "OUR FACILITIES"}
                            subtext={pageSettings?.sections?.facilitiesSubtitle || "Modern infrastructure designed to support athletic growth and provide an unmatched match-day experience for our fans."}
                            uppercase
                            showLine
                            className="mb-20"
                        />

                        <div className="space-y-32">
                            {facilities.map((facility, idx) => (
                                <div key={facility._id} className={`flex flex-col md:flex-row items-center gap-[84px] ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                                    {/* Text Side */}
                                    <div className="flex-1 space-y-8">
                                        {/* Tag Header */}
                                        <div className="flex items-center gap-3 text-neutral-9 font-bold text-lg tracking-tight">
                                            <Icon icon={getFacilityIcon(facility.tag)} className="text-2xl text-primary" />
                                            <span>‹ {facility.tag} ›</span>
                                        </div>

                                        {/* Specs Grid */}
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base border-l-2 border-neutral-3 pl-6">
                                            {facility.features?.capacity && (
                                                <div className="flex flex-col">
                                                    <span className="text-neutral-5 text-xs font-bold uppercase tracking-wider mb-1">Capacity</span>
                                                    <span className="font-bold text-neutral-9">{facility.features.capacity.toLocaleString()}</span>
                                                </div>
                                            )}
                                            {facility.features?.since && (
                                                <div className="flex flex-col">
                                                    <span className="text-neutral-5 text-xs font-bold uppercase tracking-wider mb-1">Since</span>
                                                    <span className="font-bold text-neutral-9">{facility.features.since}</span>
                                                </div>
                                            )}
                                            {facility.additionalSpecifications?.map((spec, sIdx) => (
                                                <div key={sIdx} className="flex flex-col">
                                                    <span className="text-neutral-5 text-xs font-bold uppercase tracking-wider mb-1">{spec.title}</span>
                                                    <span className="font-bold text-neutral-9">{spec.value}</span>
                                                </div>
                                            ))}
                                            {facility.features?.location && (
                                                <div className="col-span-2 flex flex-col pt-2">
                                                    <span className="text-neutral-5 text-xs font-bold uppercase tracking-wider mb-1">Location</span>
                                                    <span className="font-bold text-neutral-9">{facility.features.location}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <p className="text-neutral-6 leading-relaxed text-lg font-medium max-w-xl">
                                            {facility.description}
                                        </p>
                                    </div>

                                    {/* Image Side */}
                                    <div className="w-full md:w-[650px] shrink-0">
                                        <div className="relative aspect-square rounded-[24px] overflow-hidden shadow-2xl group">
                                            <Image
                                                src={urlFor(facility.image).width(1200).url()}
                                                alt={facility.name}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                                            {/* Float Name */}
                                            <div className="absolute bottom-[137px] left-0 right-0 text-center">
                                                <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">
                                                    {facility.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: HONORS */}
                {activeTab === "honors" && (
                    <div className="space-y-[100px]">
                        <div className="container-wide py-20">
                            <SectionHeader
                                title={pageSettings?.sections?.trophiesTitle || "TROPHY CABINET"}
                                subtext={pageSettings?.sections?.trophiesSubtitle || "Celebrating the victories that have defined our legacy."}
                                uppercase
                                showLine
                                className="mb-16"
                            />

                            {/* Honors Content */}
                            <div className="flex flex-col lg:flex-row gap-6">
                                {(() => {
                                    const allTrophies = (trophies && trophies.length > 0 ? trophies : FALLBACK_TROPHIES);
                                    const heroTrophy = allTrophies[0];
                                    const sideTrophies = allTrophies.slice(1);

                                    return (
                                        <>
                                            {/* Hero Trophy (Left) */}
                                            {heroTrophy && (
                                                <div className="w-full lg:w-[478px] flex flex-col group shrink-0">
                                                    <div className="relative w-full aspect-478/425 lg:h-[425px] rounded-[24px] overflow-hidden bg-neutral-2 mb-[32px] shadow-sm">
                                                        {heroTrophy.image ? (
                                                            <Image
                                                                src={urlFor(heroTrophy.image).width(1000).url()}
                                                                alt={heroTrophy.name}
                                                                fill
                                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-neutral-3">
                                                                <Icon icon="mdi:trophy" className="text-9xl text-neutral-4" />
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="px-2">
                                                        <div className="border border-primary text-primary px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4">
                                                            {heroTrophy.tag}
                                                        </div>
                                                        <h3 className="text-2xl font-bold text-neutral-9 mb-4 font-montserrat tracking-tight leading-tight">
                                                            {heroTrophy.name} ({heroTrophy.year})
                                                        </h3>
                                                        <p className="text-neutral-5 text-base leading-relaxed font-medium">
                                                            {heroTrophy.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Side Trophies (Right) */}
                                            <div className="lg:flex-1 flex flex-col gap-12 md:gap-16 pt-4">
                                                {sideTrophies.map((trophy, idx) => (
                                                    <div key={trophy._id || idx} className="flex flex-col md:flex-row gap-[32px] items-start group">
                                                        <div className="w-full md:w-[400px] aspect-400/300 md:h-[300px] shrink-0 relative rounded-[24px] overflow-hidden bg-neutral-2 shadow-sm">
                                                            {trophy.image ? (
                                                                <Image
                                                                    src={urlFor(trophy.image).width(900).url()}
                                                                    alt={trophy.name}
                                                                    fill
                                                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-neutral-3">
                                                                    <Icon icon="mdi:trophy" className="text-5xl text-neutral-4" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="border border-primary text-primary px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-4">
                                                                {trophy.tag}
                                                            </div>
                                                            <h4 className="text-xl md:text-[22px] font-bold text-neutral-9 mb-3 font-montserrat tracking-tight leading-tight">
                                                                {trophy.name} ({trophy.year})
                                                            </h4>
                                                            <p className="text-neutral-5 text-[15px] md:text-base leading-relaxed font-medium">
                                                                {trophy.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        </div>

                        {/* RECORD BREAKERS SECTION */}
                        <section className="py-24 relative overflow-hidden bg-linear-to-b from-[#24124d] to-black">
                            <div className="container-wide">
                                <div className="flex flex-col items-center justify-center gap-4 mb-20">
                                    <Icon icon="mdi:chart-bar" className="text-4xl text-white" />
                                    <h2 className="text-4xl font-black text-white font-montserrat tracking-tight">Record Breakers</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                    {(recordBreakers.length > 0 ? recordBreakers : [
                                        { title: "First Premier League Goal", player: "Eric Fordjour", year: 2011, recordType: "individual" },
                                        { title: "Goals - Top Scorer", player: "Richard Addae", year: 2012, recordType: "individual" },
                                        { title: "FA Cup Final Goals", customSubtext: "Yaw Annor's Heroic Brace", year: 2016, recordType: "team" },
                                        { title: "Season In Top Flight", customSubtext: "The Hunters", year: 2017, recordType: "season" }
                                    ]).map((record, idx) => (
                                        <div key={idx} className="relative p-10 rounded-[32px] border border-white/10 bg-white/5 flex items-center overflow-hidden hover:bg-white/10 transition-colors group">
                                            <span className="text-8xl font-black italic text-white/10 absolute -left-4 top-1/2 -translate-y-1/2 group-hover:text-white transition-all duration-500 select-none font-montserrat tracking-tighter">
                                                {(idx + 1).toString().padStart(2, '0')}
                                            </span>
                                            <div className="relative z-10 pl-24">
                                                <h4 className="text-white font-bold text-xl md:text-2xl mb-2 font-montserrat leading-tight">{record.title}</h4>
                                                <p className="text-white/60 font-medium text-base font-montserrat uppercase tracking-wider">
                                                    {'player' in record ? `${record.player} (${record.year})` : `${record.customSubtext} (${record.year})`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* WALL OF FAME SECTION */}
                        <div className="container-wide py-20">
                            <SectionHeader
                                title="WALL OF FAME"
                                subtext="Our Heroes, Coaches & Captains"
                                uppercase
                                showLine
                                className="mb-4"
                            />

                            {/* DYNAMIC WALL OF FAME CATEGORIES */}
                            {wallOfFameCategories.length > 0 ? (
                                wallOfFameCategories.map((category) => (
                                    <section key={category._id} className="mb-[150px]">
                                        <div className="inline-block bg-primary mt-10 text-white text-sm font-bold uppercase tracking-wider px-6 py-3 mb-6 -skew-x-12">
                                            <span className="skew-x-12 inline-block">{category.title}</span>
                                        </div>
                                        <p className="text-neutral-6 text-sm font-medium mb-8 max-w-lg">
                                            {category.subtext}
                                        </p>

                                        <div className="space-y-6">
                                            {category.slug.current === 'great-coaches' ? (
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                    {category.members.map((member, idx) => (
                                                        <div key={idx} className="bg-white rounded-[20px] border border-neutral-3 shadow-sm hover:shadow-xl transition-shadow group overflow-hidden w-full max-w-[350px] mx-auto md:mx-0 h-[420px]">
                                                            <div className="">
                                                                <div className="w-full h-[210px] bg-neutral-2 relative overflow-hidden">
                                                                    {member.image ? (
                                                                        <Image
                                                                            src={urlFor(member.image).width(400).url()}
                                                                            alt={member.name}
                                                                            fill
                                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                        />
                                                                    ) : (
                                                                        <div className="flex items-center justify-center h-full bg-neutral-3">
                                                                            <Icon icon="mdi:account-tie" className="text-5xl text-neutral-4" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="p-[24px]">
                                                                <h4 className="text-xl font-bold text-neutral-9 font-montserrat mb-0">
                                                                    {member.name}
                                                                </h4>
                                                                <p className="text-primary font-bold text-lg mb-3">
                                                                    ({member.period})
                                                                </p>
                                                                <p className="text-neutral-6 text-base leading-relaxed line-clamp-3">
                                                                    {member.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-12">
                                                    {category.members.map((member, memberIdx) => {
                                                        const isEvenRow = Math.floor(memberIdx / 2) % 2 === 0;
                                                        const isEvenCol = memberIdx % 2 === 0;
                                                        // Zigzag pattern: Row 0 (L, R), Row 1 (R, L), Row 2 (L, R) ...
                                                        const reverseOnDesktop = isEvenRow ? !isEvenCol : isEvenCol;

                                                        return (
                                                            <div
                                                                key={member._id || memberIdx}
                                                                className={`bg-white rounded-[20px] flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-shadow group overflow-hidden w-full md:h-[280px] ${reverseOnDesktop ? 'md:flex-row-reverse' : ''}`}
                                                            >
                                                                <div className="w-full md:w-[200px] lg:w-[240px] shrink-0 bg-neutral-2 relative h-[220px] md:h-full">
                                                                    {member.image ? (
                                                                        <Image
                                                                            src={urlFor(member.image).width(600).url()}
                                                                            alt={member.name}
                                                                            fill
                                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                                        />
                                                                    ) : (
                                                                        <div className="flex items-center justify-center h-full bg-neutral-3">
                                                                            <Icon icon="mdi:account" className="text-5xl text-neutral-4" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0 p-6 lg:p-8 flex flex-col justify-center gap-4 lg:gap-6">
                                                                    <div>
                                                                        <h4 className="text-lg lg:text-xl font-bold text-neutral-9 font-montserrat uppercase tracking-wide mb-1">
                                                                            {member.name}
                                                                        </h4>
                                                                        <p className="text-primary font-bold text-lg lg:text-xl">
                                                                            ({member.period})
                                                                        </p>
                                                                    </div>
                                                                    <p className="text-neutral-6 text-sm lg:text-base leading-relaxed line-clamp-3">
                                                                        {member.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                ))
                            ) : (
                                <>
                                    {/* FALLBACK STATIC CONTENT */}
                                    {/* CLUB LEGENDS */}
                                    <section className="mb-[150px]">
                                        <div className="inline-block bg-primary mt-10 text-white text-sm font-bold uppercase tracking-wider px-6 py-3 mb-6 -skew-x-12">
                                            <span className="skew-x-12 inline-block">Club Legends</span>
                                        </div>
                                        <p className="text-neutral-6 text-sm font-medium mb-8 max-w-lg">
                                            The best players who made history for the club.
                                        </p>

                                        {(() => {
                                            const legends = [
                                                { name: "Yaw Annor", year: "2016", description: "September 2016. Two goals in the FA Cup final. One trophy. He gave us the biggest win in our history and became a Bechem United legend forever.", image: null },
                                                { name: "Richard Addae", year: "2011-12", description: "Our debut Premier League hero who finished 3rd in the entire league's scoring charts with 11 goals - establishing us as serious contenders.", image: null },
                                                { name: "Peter Essen", year: "TBD", description: "A club stalwart whose consistency and leadership on the pitch made him one of the most respected players to wear the Hunters jersey.", image: null },
                                                { name: "Moro Salifu", year: "2020-21", description: "Captain who led by example before earning an international move to Al Ittihad of Egypt - proving Bechem United develops world-class talent.", image: null },
                                            ];

                                            return (
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-12">
                                                    {legends.map((legend, idx) => {
                                                        const isEvenRow = Math.floor(idx / 2) % 2 === 0;
                                                        const isEvenCol = idx % 2 === 0;
                                                        const reverseOnDesktop = isEvenRow ? !isEvenCol : isEvenCol;

                                                        return (
                                                            <div
                                                                key={idx}
                                                                className={`bg-white rounded-[20px] flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-shadow group overflow-hidden w-full md:h-[280px] ${reverseOnDesktop ? 'md:flex-row-reverse' : ''}`}
                                                            >
                                                                <div className="w-full md:w-[200px] lg:w-[240px] shrink-0 bg-neutral-2 relative h-[220px] md:h-full">
                                                                    <div className="flex items-center justify-center h-full bg-neutral-3">
                                                                        <Icon icon="mdi:account" className="text-5xl text-neutral-4" />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1 min-w-0 p-6 lg:p-8 flex flex-col justify-center gap-4 lg:gap-6">
                                                                    <div>
                                                                        <h4 className="text-lg lg:text-xl font-bold text-neutral-9 font-montserrat uppercase tracking-wide mb-1">
                                                                            {legend.name}
                                                                        </h4>
                                                                        <p className="text-primary font-bold text-lg lg:text-xl">
                                                                            ({legend.year})
                                                                        </p>
                                                                    </div>
                                                                    <p className="text-neutral-6 text-sm lg:text-base leading-relaxed line-clamp-3">
                                                                        {legend.description}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })()}
                                    </section>

                                    {/* GREAT COACHES */}
                                    <section className="mb-[150px]">
                                        <div className="inline-block bg-primary text-white text-sm font-bold uppercase tracking-wider px-6 py-3 mb-6 -skew-x-12">
                                            <span className="skew-x-12 inline-block">Great Coaches</span>
                                        </div>
                                        <p className="text-neutral-6 text-sm font-medium mb-8 max-w-lg">
                                            The tacticians who led the team to memorable victories.
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {[
                                                { name: "Mohammed Adil Erradi", year: "2015-16", description: "He coached us to win the FA Cup. His smart tactics and motivation brought us the greatest trophy in our club's history.", image: null },
                                                { name: "Romain Folz", year: "2020", description: "Brought European coaching methods and elevated our tactical approach to new professional standards.", image: null },
                                                { name: "Kweku Danso", year: "2020-21", description: "Continued our tradition of excellence with innovative training methods and a focus on youth development.", image: null },
                                            ].map((coach, idx) => (
                                                <div key={idx} className="bg-white rounded-[20px] border border-neutral-3 shadow-sm hover:shadow-xl transition-shadow group overflow-hidden w-full max-w-[350px] mx-auto md:mx-0 h-[420px]">
                                                    <div className="w-full h-[210px] bg-neutral-2 relative overflow-hidden">
                                                        <div className="flex items-center justify-center h-full bg-neutral-3">
                                                            <Icon icon="mdi:account-tie" className="text-5xl text-neutral-4" />
                                                        </div>
                                                    </div>
                                                    <div className="p-[24px]">
                                                        <h4 className="text-xl font-bold text-neutral-9 font-montserrat mb-0">
                                                            {coach.name}
                                                        </h4>
                                                        <p className="text-primary font-bold text-lg mb-3">
                                                            ({coach.year})
                                                        </p>
                                                        <p className="text-neutral-6 text-base leading-relaxed">
                                                            {coach.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Common Sponsors Section (Visible at the bottom of Profile & History) */}
                {(activeTab === "profile" || activeTab === "history" || activeTab === "facilities" || activeTab === "honors") && (
                    <div className="mt-[20px] space-y-[150px]">
                        <JoinHuntersPack
                            settings={pageSettings?.joinHuntersPack}
                            fallbackImages={galleryImages}
                        />
                        {sponsorSettings && <SponsorSection settings={sponsorSettings} />}
                    </div>
                )}
            </div>
        </div>
    );
}
