import { client } from "@/lib/sanity.client";
import {
  galleryPageSettingsQuery,
  galleryImagesQuery,
  featuredGalleryImagesQuery,
} from "@/lib/sanity.queries";
import { GalleryImage, GalleryPageSettings } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import GalleryContent from "@/components/pages/GalleryContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Bechem United FC",
  description:
    "View photos from matches, training sessions, and club events. Relive the best moments with Bechem United FC.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const [settings, allImages, featuredImages] = await Promise.all([
    client.fetch<GalleryPageSettings>(galleryPageSettingsQuery),
    client.fetch<GalleryImage[]>(galleryImagesQuery),
    client.fetch<GalleryImage[]>(featuredGalleryImagesQuery),
  ]);

  return (
    <div className="min-h-screen bg-[#F5F5FA]">
      {/* Page Header/Banner */}
      <PageHeader
        title={settings?.pageTitle || "Gallery"}
        backgroundImage={settings?.pageBannerImage}
      />

      <GalleryContent
        settings={
          settings || {
            pageTitle: "Gallery",

            featuredSectionTitle: "FEATURED MOMENTS",
            featuredSectionSubtext:
              "Our most memorable matches, celebrations, and behind-the-scenes moments",
            loadMoreButtonText: "Load More Photos",
          }
        }
        allImages={allImages || []}
        featuredImages={featuredImages || []}
      />
    </div>
  );
}
