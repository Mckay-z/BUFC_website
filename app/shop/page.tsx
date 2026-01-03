import { client } from "@/lib/sanity.client";
import { productsByCategoryQuery } from "@/lib/sanity.queries";
import { Product } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import ProductCategory from "@/components/pages/ProductCategory";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default async function ShopPage() {
  // Fetch products by category
  const [jerseysProducts, lifestyleProducts, accessoriesProducts] =
    await Promise.all([
      client.fetch<Product[]>(productsByCategoryQuery, { category: "jerseys" }),
      client.fetch<Product[]>(productsByCategoryQuery, {
        category: "lifestyle",
      }),
      client.fetch<Product[]>(productsByCategoryQuery, {
        category: "accessories",
      }),
    ]);

  return (
    <main>
      {/* Page Header */}
      <PageHeader title="Shop" />

      {/* Shop Content */}
      <section className="container-wide py-12 md:py-16 lg:py-20">
        {/* Page Description */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-neutral-text text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            OUR CLUB STORE
          </h2>
          <p className="text-neutral-7 text-sm md:text-base max-w-3xl">
            Discover the latest official merchandise, new collections, and
            exclusive Bechem United FC store updates.
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
