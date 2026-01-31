import { client, urlFor } from "@/lib/sanity.client";
import { singlePlayerQuery, playerRelatedNewsQuery, playerRelatedHighlightsQuery } from "@/lib/sanity.queries";
import { Player, NewsArticle, MatchHighlight } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import SectionHeader from "@/components/layout/sectionHeader";
import { Icon } from "@iconify/react";

// Revalidate every 60 seconds
export const revalidate = 60;

interface PlayerPageProps {
  params: Promise<{ number: string }>;
}

// Helper function to get country code from country name
async function getCountryCode(countryName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data[0]?.cca2?.toLowerCase() || null;
  } catch (error) {
    console.error("Error fetching country code:", error);
    return null;
  }
}

export default async function PlayerPage({ params }: PlayerPageProps) {
  const resolvedParams = await params;
  const number = parseInt(resolvedParams.number);

  const player = await client.fetch<Player>(singlePlayerQuery, { number });

  if (!player) {
    return (
      <div className="min-h-screen bg-neutral-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 text-prim-3">⚽</div>
          <h1 className="text-3xl font-bold text-neutral-text mb-2">Player not found</h1>
          <p className="text-neutral-6 mb-6">The player you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/players" className="bg-primary hover:bg-prim-4 text-white px-8 py-3 rounded-full font-medium transition-colors">
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  const [relatedNews, relatedHighlights] = await Promise.all([
    client.fetch<NewsArticle[]>(playerRelatedNewsQuery, { playerName: player.fullName }),
    client.fetch<MatchHighlight[]>(playerRelatedHighlightsQuery, { playerId: player._id }),
  ]);

  const countryCode = player.nationality ? await getCountryCode(player.nationality) : null;

  return (
    <main className="bg-[#F1EFF6] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] md:h-[75vh] min-h-[500px] w-full overflow-hidden bg-neutral-900">
        {/* Banner Image */}
        {player.photoBanner || player.photo ? (
          <Image
            src={urlFor(player.photoBanner || player.photo!).width(1920).height(1080).url()}
            alt={player.fullName}
            fill
            className="object-cover object-top opacity-80"
            priority
          />
        ) : null}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/80" />

        {/* Player Identity */}
        <div className="absolute inset-0 flex flex-col justify-end pb-32 md:pb-50">
          <div className="w-full px-6 xs:px-10 sm:px-16 md:px-24 text-white">
            <Link href="/players" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors">
              <Icon icon="mdi:arrow-left" className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Back to Team</span>
            </Link>

            <div className="flex flex-col">
              <div className="flex flex-col gap-3 mb-4">
                <span className="text-4xl md:text-5xl font-bold leading-none">
                  {player.jerseyNumber}
                </span>
                <div className="h-[2px] w-12 bg-white" />
              </div>

              <h1 className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                {player.fullName}
              </h1>
              <p className="text-lg md:text-2xl font-medium text-white/70 mt-2">
                {player.positionDetail || player.position}
              </p>
            </div>
          </div>
        </div>

        {/* Curved Bottom Mask */}
        <div className="absolute -bottom-1 left-0 w-full h-24 bg-[#F1EFF6] rounded-t-[100%] md:h-32" />
      </section>

      {/* BIO & QUICK INFO CARD */}
      <section className="container-wide -mt-24 md:-mt-32 relative z-10">
        <div className="bg-white rounded-[24px] md:rounded-[40px] shadow-xl md:shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Bio Side */}
          <div className="p-8 md:p-14 border-b lg:border-b-0 lg:border-r border-neutral-100 flex flex-col h-full">
            <div className="mb-10">
              <div className="bg-[#1D173C] text-white text-xs font-bold px-8 py-3 w-fit transform -skew-x-12">
                <span className="inline-block skew-x-12 uppercase tracking-[0.15em]">Biography</span>
              </div>
            </div>

            <div className="prose prose-neutral max-w-none prose-p:text-neutral-600 prose-p:leading-relaxed text-[#333] flex-1">
              {player.biography ? (
                <PortableText value={player.biography} />
              ) : (
                <p>No biography available for this player.</p>
              )}
            </div>

            {/* Social Media Footer */}
            <div className="mt-12 pt-8 flex items-center gap-6">
              <p className="text-sm font-bold text-neutral-800 uppercase tracking-wider whitespace-nowrap">
                {player.fullName.split(' ')[0]}&apos;s Socials:
              </p>
              <div className="flex gap-4">
                <SocialIcon icon="mdi:facebook" href={player.socialMedia?.facebook} />
                <SocialIcon icon="mdi:instagram" href={player.socialMedia?.instagram} />
                <SocialIcon icon="prime:twitter" href={player.socialMedia?.twitter} />
                <SocialIcon icon="ic:baseline-tiktok" href={player.socialMedia?.linkedin} /> {/* Mapping linkedin to tiktok as a placeholder if needed, or just showing empty */}
              </div>
            </div>
          </div>

          {/* Quick Info Side */}
          <div className="p-8 md:p-14 bg-white">
            <div className="mb-10 lg:ml-[-10px]">
              <div className="bg-[#1D173C] text-white text-xs font-bold px-8 py-3 w-fit transform -skew-x-12">
                <span className="inline-block skew-x-12 uppercase tracking-[0.15em]">Info</span>
              </div>
            </div>

            <div className="flex flex-col">
              <InfoRow label="Date of Birth" value={player.dateOfBirth ? new Date(player.dateOfBirth).toLocaleDateString("en-GB", { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : "-"} />
              <InfoRow label="Nationality" value={player.nationality} flag={countryCode} />
              <InfoRow label="Height" value={player.height ? `${player.height}m` : "-"} />
              <InfoRow label="Preferred Foot" value={player.strongFoot || "-"} />
              <InfoRow
                label="Professional Career"
                value={`${new Date().getFullYear() - (player.careerExperience?.[player.careerExperience.length - 1]?.startYear || new Date().getFullYear())} Years (Est. ${player.careerExperience?.[player.careerExperience.length - 1]?.startYear || "-"})`}
                isLast
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION (Custom Dark Gradient) */}
      <section className="mt-24 py-24 relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #3F2A78 0%, #0B0B0B 100%)' }}>

        <div className="container-wide relative z-10 flex flex-col items-center">
          {/* Custom Header */}
          <div className="w-full mb-16 flex items-center gap-4">
            <h2 className="text-white text-sm font-bold uppercase tracking-[0.2em] whitespace-nowrap">
              Statistics
            </h2>
            <div className="h-px flex-1 bg-white/40" />
            <div className="w-48 h-px bg-transparent" /> {/* Spacer to mimic the mockup's line width */}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 w-full">
            <StatDetailCard label="Matches Played" value={player.commonStatistics?.matchesPlayed} />
            <StatDetailCard label="Goals Scored" value={player.commonStatistics?.goalsScored} />
            <StatDetailCard label="Assists" value={player.commonStatistics?.assists} />
            <StatDetailCard label="Minutes Played" value={player.commonStatistics?.minutesPlayed} />
            <StatDetailCard label="Speed in 30 Meters" value={player.commonStatistics?.yellowCards} /> {/* Placeholder values/labels if not in data */}
            <StatDetailCard label="Shots on Target" value={player.commonStatistics?.redCards} />
          </div>

          {/* Pagination/Carousel Indicator */}
          <div className="mt-16 flex items-center gap-3 text-white">
            <span className="text-xl font-bold opacity-80 cursor-pointer hover:opacity-100">&lt;</span>
            <div className="w-2.5 h-2.5 rounded-full border-2 border-white bg-transparent" />
            <span className="text-xl font-bold opacity-80 cursor-pointer hover:opacity-100">&gt;</span>
          </div>
        </div>
      </section>

      {/* CAREER HISTORY & ACHIEVEMENTS */}
      <section className="py-24 container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Career History Card */}
          <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-sm border border-neutral-100/50">
            <div className="mb-12 flex items-center justify-between border-b border-neutral-100 pb-6">
              <div className="bg-[#1D173C] text-white text-[10px] md:text-xs font-bold px-6 md:px-8 py-3 w-fit transform -skew-x-12">
                <span className="inline-block skew-x-12 uppercase tracking-[0.15em]">Previous Clubs</span>
              </div>
              <p className="text-[11px] md:text-[12px] font-bold text-neutral-900/40 tracking-[0.2em] uppercase">
                {new Date().getFullYear() - (player.careerExperience?.[player.careerExperience.length - 1]?.startYear || new Date().getFullYear())} Year Pro
              </p>
            </div>

            <div className="space-y-8 md:space-y-10">
              {player.careerExperience?.map((career, idx) => {
                const clubName = career.isGPLClub ? career.gplClubReference?.clubName : career.customClubName;
                const clubLogo = career.isGPLClub ? career.gplClubReference?.clubLogo : career.customClubLogo;
                const isCurrent = career.isCurrent;
                return (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="relative w-10 md:w-12 h-10 md:h-12 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center overflow-hidden shrink-0 transition-transform group-hover:scale-110">
                        {clubLogo ? (
                          <Image src={urlFor(clubLogo).width(80).url()} alt={clubName || ""} fill className="object-contain p-1.5" />
                        ) : (
                          <Icon icon="mdi:shield-outline" className="w-5 h-5 text-neutral-300" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 leading-tight group-hover:text-primary transition-colors text-[15px] md:text-[17px]">
                          {clubName}
                        </h4>
                        <p className="text-[13px] md:text-sm text-neutral-500 font-medium mt-0.5">{career.role || player.position}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-[13px] md:text-[15px] font-semibold tracking-tight ${isCurrent ? 'text-[#6B5AED]' : 'text-neutral-900/60'}`}>
                        {career.startYear} {career.endYear ? `- ${career.endYear}` : isCurrent ? "- Present" : ""}
                      </p>
                    </div>
                  </div>
                );
              }) || <p className="text-neutral-500">No career history records found.</p>}
            </div>
          </div>

          {/* Awards/Achievements Card */}
          <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-sm border border-neutral-100/50">
            <div className="mb-12 border-b border-neutral-100 pb-6">
              <div className="bg-[#1D173C] text-white text-[10px] md:text-xs font-bold px-6 md:px-8 py-3 w-fit transform -skew-x-12">
                <span className="inline-block skew-x-12 uppercase tracking-[0.15em]">Achievements</span>
              </div>
            </div>

            <div className="space-y-8 md:space-y-10">
              {player.careerExperience?.some(c => c.achievements?.length) ? (
                player.careerExperience.flatMap(c => {
                  const clubName = c.isGPLClub ? c.gplClubReference?.clubName : c.customClubName;
                  return (c.achievements || []).map((achievement) => ({
                    title: achievement,
                    club: clubName,
                    year: c.endYear || c.startYear
                  }));
                }).map((achievement, idx) => (
                  <div key={idx} className="flex items-center justify-between group">
                    <div className="flex-1">
                      <h4 className="font-bold text-neutral-900 leading-tight text-[15px] md:text-[17px]">{achievement.title}</h4>
                      <p className="text-[13px] md:text-sm text-neutral-500 font-medium mt-0.5">{achievement.club}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-[13px] md:text-[15px] font-semibold text-neutral-900/60 tracking-tight">{achievement.year}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F1EFF6] flex items-center justify-center text-primary mb-4 opacity-70">
                    <Icon icon="mdi:medal-outline" className="w-8 h-8" />
                  </div>
                  <p className="text-neutral-400 text-sm font-medium">No achievements recorded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS ON PLAYER */}
      {relatedNews.length > 0 && (
        <section className="pb-24 container-wide">
          <SectionHeader
            title={`Latest on ${player.fullName.split(' ')[0]}`}
            subtext="Recent articles and club updates involving the player"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {relatedNews.map((news) => (
              <Link key={news._id} href={`/news/${news.slug.current}`} className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:shadow-xl transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={urlFor(news.featuredImage).width(400).url()} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">{news.category.replace('-', ' ')}</p>
                  <h4 className="font-bold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">{news.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* PLAYER PERFORMANCE (Highlights) */}
      {relatedHighlights.length > 0 && (
        <section className="pb-24 container-wide">
          <SectionHeader
            title="Player Highlights"
            subtext="Watch outstanding moments and individual performances"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {relatedHighlights.map((highlight) => (
              <div key={highlight._id} className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 hover:shadow-xl transition-all">
                <div className="relative aspect-video overflow-hidden">
                  <Image src={highlight.thumbnail ? urlFor(highlight.thumbnail).width(400).url() : "/placeholder-video.jpg"} alt={highlight.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href={highlight.videoUrl} target="_blank" className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center scale-75 group-hover:scale-100 transition-transform">
                      <Icon icon="mdi:play" className="w-8 h-8 ml-1" />
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    {highlight.competition?.icon && (
                      <div className="w-4 h-4 relative">
                        <Image src={urlFor(highlight.competition.icon).width(20).url()} alt="" fill className="object-contain" />
                      </div>
                    )}
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{highlight.competition?.name || "Competition"}</p>
                  </div>
                  <h4 className="font-bold text-neutral-900 line-clamp-2">{highlight.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function InfoRow({ label, value, flag, isLast }: { label: string; value: string | number; flag?: string | null; isLast?: boolean }) {
  return (
    <div className={`py-4 flex flex-col gap-1 ${!isLast ? 'border-b border-neutral-100' : ''}`}>
      <p className="text-[13px] font-medium text-neutral-400">{label}</p>
      <div className="flex items-center gap-3">
        {flag && (
          <Image src={`https://flagcdn.com/w40/${flag}.png`} alt="" width={24} height={16} className="rounded-sm object-cover shadow-xs" />
        )}
        <p className="text-[17px] font-bold text-neutral-900">{value}</p>
      </div>
    </div>
  );
}

function SocialIcon({ icon, href }: { icon: string; href?: string }) {
  return (
    <Link
      href={href || "#"}
      target={href ? "_blank" : "_self"}
      className="text-[#6B5AED] hover:text-primary transition-colors"
    >
      <Icon icon={icon} className="w-6 h-6" />
    </Link>
  );
}

function StatDetailCard({ label, value }: { label: string; value?: number | string }) {
  return (
    <div className="border border-white/50 rounded-xl p-8 aspect-square flex flex-col items-center justify-center text-center bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all group">
      <span className="text-3xl md:text-5xl font-bold text-white mb-4 group-hover:scale-110 transition-transform">
        {value ?? "0"}
      </span>
      <span className="text-[10px] md:text-[11px] font-bold text-white/70 uppercase tracking-widest leading-tight">
        {label}
      </span>
    </div>
  );
}
