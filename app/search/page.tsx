import { client } from "@/lib/sanity.client";
import { globalSearchQuery } from "@/lib/sanity.queries";
import { NewsArticle, Player, Product } from "@/lib/types";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeader from "@/components/layout/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { urlFor } from "@/lib/sanity.client";
import Image from "next/image";
import Link from "next/link";
import { FiUser, FiSearch } from "react-icons/fi";

interface SearchResults {
    news: NewsArticle[];
    players: Player[];
    products: Product[];
}

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params.q || "";
    const queryInt = parseInt(query) || -1;

    let results: SearchResults = { news: [], players: [], products: [] };

    if (query) {
        results = await client.fetch<SearchResults, { searchTerm: string; queryInt: number }>(
            globalSearchQuery,
            {
                searchTerm: `*${query}*`,
                queryInt: queryInt,
            }
        );
    }

    const hasResults =
        results.news.length > 0 ||
        results.players.length > 0 ||
        results.products.length > 0;

    const totalResults = results.news.length + results.players.length + results.products.length;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <main className="bg-neutral-1 min-h-screen">
            {/* Page Header */}
            <PageHeader
                title="Search results"
                subtitle={query ? `Found ${totalResults} matches for &quot;${query}&quot;` : "Enter a search term to find what you're looking for"}
                staticImage="/img/banner.jpg" // Using common banner
            />

            <div className="container-wide py-16 md:py-24 lg:py-32 space-y-28 md:space-y-36">
                {!hasResults ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 rounded-full bg-neutral-2 flex items-center justify-center mb-6">
                            <FiSearch className="w-10 h-10 text-neutral-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-neutral-9 mb-2">No results found</h2>
                        <p className="text-neutral-5 text-lg max-w-md">
                            We couldn&apos;t find any news, players, or products matching &quot;{query}&quot;. Try different keywords.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Players Section */}
                        {results.players.length > 0 && (
                            <div className="space-y-12 md:space-y-16">
                                <SectionHeader
                                    title="SQUAD"
                                    subtext="Matching players from Bechem United"
                                    showLine
                                    uppercase
                                />
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10 lg:gap-12">
                                    {results.players.map((player) => (
                                        <Link
                                            key={player._id}
                                            href={`/players/${player.jerseyNumber}`}
                                            className="group relative overflow-hidden rounded-[20px] bg-neutral-2 border border-neutral-3 hover:border-prim-3 transition-all duration-300 hover:shadow-lg"
                                        >
                                            <div className="relative w-full aspect-3/4 overflow-hidden bg-neutral-3">
                                                {player.photo ? (
                                                    <Image
                                                        src={urlFor(player.photo).width(400).height(533).url()}
                                                        alt={player.fullName}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FiUser size={80} className="text-neutral-5" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white z-10">
                                                <div className="flex flex-col gap-1.5 mb-4">
                                                    <p className="text-base md:text-lg font-semibold tracking-wide flex items-center gap-1.5">
                                                        {player.jerseyNumber} <span className="text-white/60">•</span> {player.position}
                                                    </p>
                                                    <div className="h-[2px] w-8 bg-primary" />
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold uppercase leading-[1.1] tracking-tight line-clamp-2">
                                                    {player.fullName}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* News Section */}
                        {results.news.length > 0 && (
                            <div className="space-y-12 md:space-y-16">
                                <SectionHeader
                                    title="LATEST STORIES"
                                    subtext="News and updates matching your search"
                                    showLine
                                    uppercase
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                                    {results.news.map((article) => (
                                        <Link
                                            key={article._id}
                                            href={`/news/${article.slug.current}`}
                                            className="group"
                                        >
                                            <article className="flex flex-col h-full">
                                                <div className="relative aspect-16/10 w-full overflow-hidden rounded-[24px] mb-5">
                                                    {article.featuredImage && (
                                                        <Image
                                                            src={urlFor(article.featuredImage).width(600).height(375).url()}
                                                            alt={article.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col grow">
                                                    <div className="flex items-center gap-3 mb-3 text-neutral-7 text-xs font-medium">
                                                        <span>{formatDate(article.publishedAt)}</span>
                                                    </div>
                                                    <h3 className="text-neutral-text text-xl font-bold mb-3 group-hover:text-prim-3 transition-colors line-clamp-2 leading-tight">
                                                        {article.title}
                                                    </h3>
                                                    {article.excerpt && (
                                                        <p className="text-neutral-7 text-sm line-clamp-2 leading-relaxed">
                                                            {article.excerpt}
                                                        </p>
                                                    )}
                                                </div>
                                            </article>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Store Section */}
                        {results.products.length > 0 && (
                            <div className="space-y-12 md:space-y-16">
                                <SectionHeader
                                    title="MERCHANDISE"
                                    subtext="Official gear matching your search"
                                    showLine
                                    uppercase
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-12">
                                    {results.products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
}
