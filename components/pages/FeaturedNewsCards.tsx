import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.client";
import { NewsArticle } from "@/lib/types";
import { Icon } from "@iconify/react";

interface FeaturedCardProps {
  article: NewsArticle;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Large Featured Card - Main hero card for the primary featured article
 * Full width, larger text, prominent display
 */
export function FirstFeaturedCard({ article }: FeaturedCardProps) {
  return (
    <Link href={`/news/${article.slug.current}`} className="group block w-full">
      <article className="relative max-w-[1080px] mx-auto min-h-100 rounded-[20px] md:rounded-3xl overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {article.featuredImage && (
            <Image
              src={urlFor(article.featuredImage).width(1200).height(800).url()}
              alt={article.title}
              fill
              className="object-cover object-[50%_30%] group-hover:scale-[101%] transition-transform duration-500"
            />
          )}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 ">
          {/* Title */}
          <h2 className="w-[80%] text-neutral-1 text-[15px] sm:text-base lg:text-lg xl:text-2xl font-semibold mb-2 lg:mb-0  line-clamp-2 max-w-xl">
            {article.title}
          </h2>

          {/* Meta Info */}
          <div className=" flex justify-between items-center gap-4 text-neutral-5 text-sm md:text-base">
            <p className="text-neutral-5 text-sm md:text-base">
              {formatDate(article.publishedAt)}
            </p>

            <div className="flex-center gap-2 md:gap-3">
              {article.authorImage ? (
                <Image
                  src={urlFor(article.authorImage)
                    .width(1200)
                    .height(800)
                    .url()}
                  alt={article.title}
                  fill
                  className="object-cover object-top w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden"
                />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full text-neutral-6 bg-neutral-3 flex items-center justify-center">
                  <Icon icon="octicon:person-24" width="24" height="24" />
                </div>
              )}

              <ul className="flex flex-col gap-0.5 text-neutral-1">
                <li className="capitalize text-sm md:text-base font-medium">
                  {article.author}
                </li>
                <li className="text-xs md:text-sm text-neutral-5">Author</li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

/**
 * Small Featured Card - Secondary featured article cards
 * Displayed in a grid layout alongside other featured articles
 */
export function SmallFeaturedCard({ article }: FeaturedCardProps) {
  return (
    <Link href={`/news/${article.slug.current}`} className="group block h-full">
      <div
        data-property-1="Default"
        className="w-full md:max-w-[624px] flex-center gap-4 md:gap-6"
      >
        <div className="relative w-32 h-28 xs:w-36 xs:h-32 sm:w-40 sm:h-36 lg:w-48 lg:h-36 xl:w-[285px] xl:h-[180px] rounded-[16px] md:rounded-[20px] overflow-hidden">
          {article.featuredImage ? (
            <Image
              src={urlFor(article.featuredImage).width(1200).height(800).url()}
              alt={article.title}
              fill
              className="object-cover object-top"
            />
          ) : (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full text-neutral-6 bg-neutral-3 flex items-center justify-center">
              <Icon icon="octicon:person-24" width="24" height="24" />
            </div>
          )}
        </div>
        <div className="flex-1 inline-flex flex-col justify-start items-start gap-3 xs:gap-4 md:gap-5">
          <div className="self-stretch justify-start text-neutral-text text-sm xs:text-base font-semibold leading-5 line-clamp-2">
            {article.title}
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="flex-center gap-2 md:gap-3">
              {article.authorImage ? (
                <Image
                  src={urlFor(article.authorImage)
                    .width(1200)
                    .height(800)
                    .url()}
                  alt={article.title}
                  fill
                  className="object-cover object-center w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
              ) : (
                <div className="p-2 rounded-full text-neutral-6 bg-neutral-1/70  flex items-center justify-center">
                  <Icon
                    icon="octicon:person-24"
                    width="24"
                    height="24"
                    className="w-5 h-5 md:h-6 md:w-6"
                  />
                </div>
              )}

              <p className="flex flex-col gap-1 text-neutral-text capitalize text-[13px] xs:text-sm font-medium">
                {article.author}
                <span className="xlg:hidden text-xs text-neutral-8">
                  {formatDate(article.publishedAt)}
                </span>
              </p>
            </div>
            <span className="hidden xlg:flex text-xs xs:text-[13px] text-neutral-8">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function DefaultFeaturedCard({ article }: FeaturedCardProps) {
  return (
    <Link
      href={`/news/${article.slug.current}`}
      className="group block h-full w-fit"
    >
      <article className="min-h-100 xl:min-h-110 max-w-[420px] flex flex-col gap-6">
        {/* Image */}
        {article.featuredImage && (
          <div className="relative w-full flex-1 overflow-hidden">
            <Image
              src={urlFor(article.featuredImage).width(800).height(450).url()}
              alt={article.title}
              fill
              className="object-cover object-top rounded-[20px] xl:rounded-[24px] group-hover:scale-[101%] transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-[16px] lg:gap-[20px]">
          <h3 className="line-clamp-2 text-neutral-text text-base font-semibold">
            {article.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex-center gap-2 md:gap-3">
              {article.authorImage ? (
                <Image
                  src={urlFor(article.authorImage)
                    .width(1200)
                    .height(800)
                    .url()}
                  alt={article.title}
                  fill
                  className="object-cover object-center  w-8 h-8 md:w-10 md:h-10 rounded-full"
                />
              ) : (
                <div className="p-2 rounded-full text-neutral-6 bg-neutral-1/70 flex items-center justify-center">
                  <Icon
                    icon="octicon:person-24"
                    width="24"
                    height="24"
                    className="w-4.5 h-4.5 md:h-6 md:w-6"
                  />
                </div>
              )}

              <p className="text-neutral-text capitalize text-sm md:text-base font-medium">
                {article.author}
              </p>
            </div>
            <span className="text-sm  text-neutral-8">
              {formatDate(article.publishedAt)}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function ExtraSmallFeaturedCard({ article }: FeaturedCardProps) {
  return (
    <Link
      href={`/news/${article.slug.current}`}
      className="group block h-full w-[46%]"
    >
      <div className="self-stretch  h-72 inline-flex flex-col justify-start items-start gap-5">
        {article.featuredImage && (
          <div className="relative w-full flex-1 overflow-hidden">
            <Image
              src={urlFor(article.featuredImage).width(800).height(450).url()}
              alt={article.title}
              fill
              className="object-cover object-center rounded-[20px] xl:rounded-[24px] group-hover:scale-[101%] transition-transform duration-300"
            />
          </div>
        )}
        <div className="self-stretch flex flex-col justify-start items-start gap-3.5 md:gap-5">
          <div className="self-stretch justify-start text-neutral-text text-sm font-semibold leading-5 line-clamp-2">
            {article.title}
          </div>
          <div className="flex-center gap-2 md:gap-3">
            {article.authorImage ? (
              <Image
                src={urlFor(article.authorImage).width(1200).height(800).url()}
                alt={article.title}
                fill
                className="object-cover object-center w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
            ) : (
              <div className="p-2 rounded-full text-neutral-6 bg-neutral-1/70 flex items-center justify-center">
                <Icon
                  icon="octicon:person-24"
                  width="24"
                  height="24"
                  className="w-5 h-5 md:h-6 md:w-6"
                />
              </div>
            )}

            <p className="flex flex-col gap-1 text-neutral-text capitalize text-[13px] xlg:text-sm font-medium">
              {article.author}
              <span className="xlg:hidden text-xs text-neutral-8">
                {formatDate(article.publishedAt)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
