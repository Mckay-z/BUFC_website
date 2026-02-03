import { client } from "@/lib/sanity.client";
import {
  galleryImagesQuery,
  clubPageSettingsQuery,
  clubIdentitySettingsQuery,
  clubPillarsQuery,
  facilitiesQuery,
  staffMembersQuery,
  sponsorSettingsQuery,
  trophiesQuery,
  wallOfFameQuery,
  recordBreakersQuery
} from "@/lib/sanity.queries";
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
import ClubProfileContent from "@/components/pages/ClubProfileContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club Profile | Bechem United FC",
  description: "Learn more about Bechem United FC - the Pride of Ahafo, our mission, vision, and the hunters squad.",
};

// Revalidate every 60 seconds
export const revalidate = 60;

interface ClubsPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function ClubsPage({
  searchParams,
}: ClubsPageProps) {
  const params = await searchParams;
  const initialTab = params.tab || "profile";

  // Fetch required data for the club profile page
  const [
    galleryImages,
    pageSettings,
    identitySettings,
    pillars,
    facilities,
    staffMembers,
    sponsorSettings,
    trophies,
    wallOfFameCategories,
    recordBreakers
  ] = await Promise.all([
    client.fetch<GalleryImage[]>(galleryImagesQuery),
    client.fetch<ClubPageSettings>(clubPageSettingsQuery),
    client.fetch<ClubIdentitySettings>(clubIdentitySettingsQuery),
    client.fetch<ClubPillar[]>(clubPillarsQuery),
    client.fetch<Facility[]>(facilitiesQuery),
    client.fetch<StaffMember[]>(staffMembersQuery),
    client.fetch<SponsorSettings>(sponsorSettingsQuery),
    client.fetch<Trophy[]>(trophiesQuery),
    client.fetch<WallOfFameCategory[]>(wallOfFameQuery),
    client.fetch<RecordBreaker[]>(recordBreakersQuery),
  ]);

  return (
    <main className="bg-neutral-1 min-h-screen">
      <ClubProfileContent
        galleryImages={galleryImages || []}
        pageSettings={pageSettings}
        identitySettings={identitySettings}
        pillars={pillars || []}
        facilities={facilities || []}
        staffMembers={staffMembers || []}
        sponsorSettings={sponsorSettings}
        trophies={trophies || []}
        wallOfFameCategories={wallOfFameCategories || []}
        recordBreakers={recordBreakers || []}
        initialTab={initialTab}
      />
    </main>
  );
}
