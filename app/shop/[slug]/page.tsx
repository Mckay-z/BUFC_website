import { client } from "@/lib/sanity.client";
import { singleProductQuery, relatedProductsQuery } from "@/lib/sanity.queries";
import { Product } from "@/lib/types";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

interface ProductPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await client.fetch<Product>(singleProductQuery, {
        slug,
    });

    if (!product) {
        return {
            title: "Product Not Found | Bechem United FC",
        };
    }

    return {
        title: `${product.name} | Shop | Bechem United FC`,
        description: product.description || `Buy ${product.name} from Bechem United FC official store`,
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = await client.fetch<Product>(singleProductQuery, {
        slug,
    });

    if (!product) {
        notFound();
    }

    // Fetch related products from the same category
    const relatedProducts = await client.fetch<Product[]>(
        relatedProductsQuery,
        {
            category: product.category,
            productId: product._id,
        }
    );

    return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
