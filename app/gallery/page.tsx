import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Bechem United FC",
  description:
    "View photos from matches, training sessions, and club events. Relive the best moments with Bechem United FC.",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header/Banner */}
      <section className="relative h-[300px] bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Gallery</h1>
        </div>
      </section>

      {/* Featured Images Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Moments</h2>

        {/* Featured Grid - 1 Big Center + 6 Side Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Side Images (3) */}
          <div className="space-y-4">
            {/* Placeholder for side images */}
            <div className="aspect-video bg-gray-200 rounded-lg"></div>
            <div className="aspect-video bg-gray-200 rounded-lg"></div>
            <div className="aspect-video bg-gray-200 rounded-lg"></div>
          </div>

          {/* Big Center Image with Navigation */}
          <div className="relative aspect-square lg:aspect-[4/3] bg-gray-200 rounded-lg group">
            {/* Navigation arrows will appear here on hover */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white/80 rounded-full hover:bg-white">
                ← Prev
              </button>
              <button className="p-2 bg-white/80 rounded-full hover:bg-white">
                Next →
              </button>
            </div>
          </div>

          {/* Right Side Images (3) */}
          <div className="space-y-4">
            {/* Placeholder for side images */}
            <div className="aspect-video bg-gray-200 rounded-lg"></div>
            <div className="aspect-video bg-gray-200 rounded-lg"></div>
            <div className="aspect-video bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Explore Gallery Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-[#1a472a] text-white rounded-lg hover:bg-[#1a472a]/90">
            Explore Gallery →
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button className="px-6 py-2 bg-[#1a472a] text-white rounded-full">
            All Photos
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
            Match Day
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
            Team Photos
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
            Trophy Moments
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
            Our Fans
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder gallery items - will be populated with actual data */}
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden group cursor-pointer"
            >
              {/* Image will go here */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-sm">19th March, 2025</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-[#1a472a] text-[#1a472a] rounded-lg hover:bg-[#1a472a] hover:text-white transition-colors">
            Load More Photos
          </button>
        </div>
      </section>
    </div>
  );
}
