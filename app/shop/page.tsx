import { client } from "@/lib/sanity.client";
import {
  productsByCategoryQuery,
  shopPageSettingsQuery,
} from "@/lib/sanity.queries";
import { Product, ShopPageSettings } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeader from "@/components/layout/SectionHeader";
import ProductCategory from "@/components/pages/ProductCategory";
import Link from "next/link";
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
      <PageHeader
        title={settings?.pageTitle || "Shop"}
        backgroundImage={settings?.pageBanner}
      />

      {/* Shop Content */}
      <section className="container-wide py-12 md:py-16 lg:py-20">
        {/* Page Description */}
        <div className="mb-12 md:mb-16">
          <SectionHeader
            title={settings?.sectionTitle || "OUR CLUB STORE"}
            subtext={
              settings?.sectionSubtext ||
              "Discover the latest official merchandise, new collections, and exclusive Bechem United FC store updates."
            }
            showLine
            uppercase
          />
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
          </Link>
        </div>
      </section>
    </main>
  );
}
