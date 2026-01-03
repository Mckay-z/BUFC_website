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
    <div className=" flex flex-col h-full max-w-[300px] xl:max-w-[350px] mx-auto sm:mx-0">
      {/* Product Image */}
      <Link
        href={`/shop/${product.slug.current}`}
        className="group relative flex flex-col justify-end items-start w-[300px] h-[318px] xl:w-[350px] xl:h-[370px] py-4 px-4.5 xl:py-5 xl:px-6 rounded-[20px] xl:rounded-[24px] overflow-hidden aspect-[50/53] md:aspect-auto"
      >
        {product.image ? (
          <>
            <Image
              src={urlFor(product.image).width(400).height(533).url()}
              alt={product.name}
              fill
              className="object-cover -z-20 group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            {/* Gradient overlay */}
            <div className="absolute -z-10 inset-0 bg-linear-to-b from-black/10 via-transparent to-black pointer-events-none" />
          </>
        ) : (
          <ImageFallback icon="mdi:tshirt-crew" width="75" height="75" />
        )}

        {/* Product Info */}
        <div className="flex flex-col text-prim-1">
          <h3 className=" capitalize md:font-medium text-sm md:text-base line-clamp-2">
            {product.displayTitle || product.name}
          </h3>

          <p className="font-bold text-base md:text-lg mt-1.5">
            GH₵ {product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      {/* Buy Now Button */}
      <Button
        href={`/shop/${product.slug.current}`}
        variant="primary"
        size="md"
        fullWidth
        buttonClassName="mt-3.5"
      >
        Buy Now
      </Button>
    </div>
  );
}
