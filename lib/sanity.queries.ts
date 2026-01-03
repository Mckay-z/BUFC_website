import { groq } from "next-sanity";

// GPL CLUBS
export const gplClubsQuery = groq`
  *[_type == "gplClub" && isActive == true] | order(clubName asc) {
    _id,
    clubName,
    clubLogo,
    founded,
    stadium,
    isActive
  }
`;

export const singleClubQuery = groq`
  *[_type == "gplClub" && _id == $clubId][0] {
    _id,
    clubName,
    clubLogo,
    founded,
    stadium,
    isActive
  }
`;

// PLAYERS
export const playersQuery = groq`
  *[_type == "player"] | order(jerseyNumber asc) {
    _id,
    fullName,
    jerseyNumber,
    position,
    positionDetail,
    photo,
    nationality
  }
`;

export const playersByPositionQuery = groq`
  *[_type == "player" && position == $position] | order(jerseyNumber asc) {
    _id,
    fullName,
    jerseyNumber,
    position,
    positionDetail,
    photo,
    nationality
  }
`;

export const singlePlayerQuery = groq`
  *[_type == "player" && jerseyNumber == $number][0] {
    _id,
    fullName,
    jerseyNumber,
    position,
    positionDetail,
    photo,
    photoBanner,
    biography,
    socialMedia,
    dateOfBirth,
    nationality,
    height,
    strongFoot,
    commonStatistics,
    goalkeeperStats,
    defenderStats,
    midfielderStats,
    forwardStats,
    careerExperience[] {
      _key,
      isGPLClub,
      gplClubReference-> {
        _id,
        clubName,
        clubLogo,
        founded,
        stadium
      },
      customClubName,
      customClubLogo,
      role,
      startYear,
      endYear,
      isCurrent,
      achievements
    }
  }
`;

// NEWS
export const newsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    readTime,
    publishedAt,
    category
  }
`;

export const singleNewsQuery = groq`
  *[_type == "news" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    content,
    featuredImage,
    author,
    readTime,
    publishedAt,
    category
  }
`;

// HOME PAGE
export const homePageNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt
  }
`;

export const featuredNewsQuery = groq`
  *[_type == "news" && isFeatured == true] | order(publishedAt desc) [0...4] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category,
    readTime
  }
`;

export const latestNonFeaturedNewsQuery = groq`
  *[_type == "news" && isFeatured != true] | order(publishedAt desc) [0...5] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category,
    readTime
  }
`;

export const mostRecentNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category,
    readTime
  }
`;
export const nextFourRecentNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [1...5] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    publishedAt,
    category,
    readTime
  }
`;

export const homePageSettingsQuery = groq`
  *[_type == "homePageSettings"][0] {
    newsUpdatesSectionTitle,
    newsUpdatesSectionContent,
    newsUpdatesSectionLinkText,
    newsOnHomePageTitle,
    newsOnHomePageSubtext,
    shopOnHomePageTitle,
    shopOnHomePageSubtext
  }
`;

export const contactUsSettingsQuery = groq`
  *[_type == "contactUsSettings"][0] {
  pageTitle,
  pageBannerImage,
  contactInfoSectionTitle,
    contactInfoSectionSubtitle,
    phoneNumber,
    emailAddress,
    locationAddress,
    mapSectionTitle,
    mapSectionSubtext,
  }
`;

// FOOTER SETTINGS
export const footerSettingsQuery = groq`
  *[_type == "footerSettings"][0] {
    description,
    location,
    phone,
    email,
    socialMedia
  }
`;

// SPONSOR SETTINGS
export const sponsorSettingsQuery = groq`
  *[_type == "sponsorSettings"][0] {
    sponsorSectionTitle,
    sponsors[] {
      _key,
      name,
      logo,
      website,
      order
    } | order(order asc)
  }
`;

// LIVE MATCHES SETTINGS
export const liveMatchesSettingsQuery = groq`
  *[_type == "liveMatchesSettings"][0] {
    sectionTitle,
    sectionSubtext,
    videoThumbnail,
    videoUrl,
    isLive
  }
`;

// NEWSLETTER SETTINGS
export const newsletterSettingsQuery = groq`
  *[_type == "newsletterSettings"][0] {
    sectionTitle,
    sectionSubtext,
    inputPlaceholder,
    buttonText
  }
`;

// PRODUCTS
export const productsQuery = groq`
  *[_type == "product" && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    image,
    price,
    category
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && category == $category && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    image,
    price,
    category,
    description,
    sizes
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && inStock == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    image,
    price,
    category
  }
`;

export const oneProductPerCategoryQuery = groq`
{
  "jerseys": *[_type == "product" && category == "jerseys" && inStock == true] | order(_createdAt desc) [0],
  "lifestyle": *[_type == "product" && category == "lifestyle" && inStock == true] | order(_createdAt desc) [0],
  "accessories": *[_type == "product" && category == "accessories" && inStock == true] | order(_createdAt desc) [0]
}
`;

export const threeJerseysQuery = groq`
  *[_type == "product" && category == "jerseys" && inStock == true] | order(_createdAt desc) [0...3] {
    _id,
    name,
    slug,
    image,
    price,
    category,
    productType,
    displayTitle
  }
`;

export const featuredJerseysQuery = groq`
{
  "homeJersey": *[_type == "product" && category == "jerseys" && productType == "home-jersey" && inStock == true] | order(_createdAt desc) [0] {
    _id,
    name,
    slug,
    image,
    price,
    category,
    productType,
    displayTitle
  },
  "awayJersey": *[_type == "product" && category == "jerseys" && productType == "away-jersey" && inStock == true] | order(_createdAt desc) [0] {
    _id,
    name,
    slug,
    image,
    price,
    category,
    productType,
    displayTitle
  },
  "trainingKit": *[_type == "product" && category == "jerseys" && productType == "training-kit" && inStock == true] | order(_createdAt desc) [0] {
    _id,
    name,
    slug,
    image,
    price,
    category,
    productType,
    displayTitle
  }
}
`;
