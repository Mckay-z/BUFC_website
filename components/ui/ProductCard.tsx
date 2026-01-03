"use client";

import { Product } from "@/lib/types";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import ImageFallback from "../ui/ImageFallBack";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group flex flex-col h-full">
      {/* Product Image */}
      <Link
        href={`/shop/${product.slug.current}`}
        className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden mb-4 bg-neutral-3"
      >
        {product.image ? (
          <Image
            src={urlFor(product.image).width(400).height(533).url()}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        ) : (
          <ImageFallback
            icon="mdi:tshirt-crew"
            width="60"
            height="60"
            className="bg-neutral-3"
          />
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col">
        <Link href={`/shop/${product.slug.current}`}>
          <h3 className="text-neutral-text font-medium text-sm md:text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        <p className="text-neutral-text font-bold text-base md:text-lg mb-3">
          GH₵ {product.price.toFixed(2)}
        </p>

        {/* Buy Now Button */}
        <Button
          href={`/shop/${product.slug.current}`}
          variant="primary"
          size="md"
          fullWidth
          buttonClassName="mt-auto"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
