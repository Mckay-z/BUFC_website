import { client } from "@/lib/sanity.client";
import {
  productsByCategoryQuery,
  shopPageSettingsQuery,
} from "@/lib/sanity.queries";
import { Product, ShopPageSettings } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import ProductCategory from "@/components/pages/ProductCategory";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Bechem United FC",
  description:
    "Shop official Bechem United FC merchandise - jerseys, lifestyle wear, and accessories",
};

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ShopPage() {
  // Fetch settings and products by category
  const [settings, jerseysProducts, lifestyleProducts, accessoriesProducts] =
    await Promise.all([
      client.fetch<ShopPageSettings>(shopPageSettingsQuery),
      client.fetch<Product[]>(productsByCategoryQuery, { category: "jerseys" }),
      client.fetch<Product[]>(productsByCategoryQuery, {
        category: "lifestyle",
      }),
      client.fetch<Product[]>(productsByCategoryQuery, {
        category: "accessories",
      }),
    ]);

  return (
    <main className="bg-neutral-1">
      {/* Page Header */}
      {settings?.pageBanner ? (
        <PageHeader
          title={settings.pageTitle || "Shop"}
          backgroundImage={settings.pageBanner}
        />
      ) : (
        <div className="bg-prim-3 py-20 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">
            {settings?.pageTitle || "Shop"}
          </h1>
        </div>
      )}

      {/* Shop Content */}
      <section className="container-wide py-12 md:py-16 lg:py-20">
        {/* Page Description */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-neutral-text text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            {settings?.sectionTitle || "OUR CLUB STORE"}
          </h2>
          <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
            {settings?.sectionSubtext ||
              "Discover the latest official merchandise, new collections, and exclusive Bechem United FC store updates."}
          </p>
        </div>

        {/* Product Categories */}
        <div className="space-y-12 md:space-y-16">
          <ProductCategory title="JERSEYS & KITS" products={jerseysProducts} />
          <ProductCategory
            title="LIFESTYLE & CASUAL WEAR"
            products={lifestyleProducts}
          />
          <ProductCategory title="ACCESSORIES" products={accessoriesProducts} />
        </div>

        {/* Visit Full Store Link */}
        <div className="mt-16 flex justify-end">
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-neutral-text hover:text-primary transition-colors duration-200"
          >
            <span className="text-sm md:text-base font-medium">
              See Full Schedule
            </span>
            <Icon
              icon="mdi:arrow-right-circle-outline"
              className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
