import { Metadata } from "next";
import SectionHeader from "@/components/layout/sectionHeader";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Gallery | Bechem United FC",
  description:
    "View photos from matches, training sessions, and club events. Relive the best moments with Bechem United FC.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#F5F5FA]">
      {/* Page Header/Banner */}
      <PageHeader title="Gallery" staticImage="/images/gallery-hero.jpg" />

      {/* Featured Moments Section */}
      <section className="container-wide py-16 md:py-28">
        <div className="mb-12">
          <SectionHeader
            title="FEATURED MOMENTS"
            subtext="Our most memorable matches, celebrations, and behind-the-scenes moments"
          />
        </div>

        {/* Featured Grid - 3-1-3 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[500px]">
          {/* Left Side Images (3) */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            <div className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/gallery-1.jpg" alt="Gallery thumbnail" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/gallery-2.jpg" alt="Gallery thumbnail" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/gallery-3.jpg" alt="Gallery thumbnail" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
          </div>

          {/* Big Center Image */}
          <div className="lg:col-span-8 relative h-[300px] lg:h-full rounded-lg overflow-hidden group">
            <img src="/images/gallery-main.jpg" alt="Featured moment" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Date/Caption */}
            <div className="absolute bottom-6 right-6 flex items-center gap-2 text-white">
              <span className="w-1 h-6 bg-green-500"></span>
              <span className="font-semibold">16th March, 2025</span>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
              <button className="text-white hover:text-green-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button className="text-white hover:text-green-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side Images (3) */}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full">
            <div className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/gallery-4.jpg" alt="Gallery thumbnail" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/gallery-5.jpg" alt="Gallery thumbnail" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
            <div className="flex-1 relative rounded-lg overflow-hidden group cursor-pointer">
              <img src="/images/gallery-6.jpg" alt="Gallery thumbnail" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container-wide py-8">
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {['All Photos', 'Match Day', 'Team Photos', 'Trophy Moments', 'Our Fans'].map((tab, idx) => (
            <button
              key={idx}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${idx === 0
                ? 'bg-[#1e103c] text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={`/images/gallery-grid-${i + 1}.jpg`}
                alt={`Gallery item ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <div className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">19th March, 2025</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mb-16">
          <button className="flex items-center gap-2 text-gray-500 hover:text-[#1e103c] transition-colors font-medium">
            Load More Photos
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
