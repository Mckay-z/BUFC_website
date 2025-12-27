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
    newsOnHomePageSubtext
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
  *[_type == "product" && category == $category && inStock == true] {
    _id,
    name,
    slug,
    image,
    price,
    description,
    sizes
  }
`;
