// IMAGE TYPE (for Sanity images)
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
  };
}

// SLUG TYPE
export interface Slug {
  _type: "slug";
  current: string;
}

// PORTABLE TEXT (Rich text content)
export interface PortableTextBlock {
  _type: "block";
  style?: string;
  children: Array<{
    _type: "span";
    text: string;
    marks?: string[];
  }>;
}

// GPL CLUB INTERFACE
export interface GPLClub {
  _id: string;
  _type: "gplClub";
  clubName: string;
  clubLogo: SanityImage;
  founded?: number;
  stadium?: string;
  isActive: boolean;
}

export interface CareerEntry {
  _key?: string;
  isGPLClub?: boolean;
  // GPL Club fields
  gplClubReference?: {
    _type?: "reference";
    _ref?: string;
    // Populated fields (from query with ->)
    _id?: string;
    clubName?: string;
    clubLogo?: SanityImage;
    founded?: number;
    stadium?: string;
    isActive?: boolean;
  };
  // Custom Club fields
  customClubName?: string;
  customClubLogo?: SanityImage;
  // Common fields
  role?: "goalkeeper" | "defender" | "midfielder" | "forward";
  startYear?: number;
  endYear?: number;
  isCurrent?: boolean;
  achievements?: string[];
}

// PLAYER INTERFACE
export interface Player {
  _id: string;
  _type: "player";
  fullName: string;
  jerseyNumber: number;
  position: "goalkeeper" | "defender" | "midfielder" | "forward";
  positionDetail?: string;
  photo?: SanityImage | null;
  photoBanner?: SanityImage | null;
  biography?: PortableTextBlock[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  dateOfBirth?: string;
  nationality: string;
  height?: number;
  strongFoot?: "Left" | "Right" | "Both";
  commonStatistics?: {
    matchesPlayed?: number;
    goalsScored?: number;
    assists?: number;
    minutesPlayed?: number;
    speedIn30Meters?: number;
    yellowCards?: number;
    redCards?: number;
  };
  goalkeeperStats?: {
    cleanSheets?: number;
    saves?: number;
    goalsConceded?: number;
  };
  defenderStats?: {
    tacklesAndInterceptions?: number;
    blocks?: number;
    clearances: number;
  };
  midfielderStats?: {
    shotsOnTarget?: number;
    tacklesAndInterceptions?: number;
    dribbles?: number;
  };
  forwardStats?: {
    shotsOnTarget?: number;
    tacklesAndInterceptions?: number;
    dribbles?: number;
  };
  careerExperience?: CareerEntry[];
}

// NEWS ARTICLE INTERFACE
export interface NewsArticle {
  _id: string;
  _type: "news";
  title: string;
  slug: Slug;
  excerpt?: string;
  featuredImage: SanityImage;
  content: PortableTextBlock[];
  author: string;
  readTime?: number;
  publishedAt: string;
  category: "club-news" | "match-report" | "player-news" | "transfer-news";
}

// HOME PAGE SETTINGS INTERFACE
export interface HomePageSettings {
  newsUpdatesSectionTitle: string;
  newsUpdatesSectionContent: string;
  newsUpdatesSectionLinkText: string;
  newsOnHomePageTitle: string;
  newsOnHomePageSubtext: string;
  shopOnHomePageTitle: string;
  shopOnHomePageSubtext: string;
}

export interface ContactUsSettings {
  pageTitle: string;
  pageBannerImage: SanityImage;
  contactFormTitle: string;
  contactFormSubtext: string;
  phoneNumber: number;
  emailAddress: string;
  locationAddress: string;
  mapSectionTitle: string;
  mapSectionSubtext: string;
}

// MATCH INTERFACE
// export interface Match {
//   _id: string;
//   _type: "match";
//   homeTeam: string;
//   awayTeam: string;
//   homeScore?: number;
//   awayScore?: number;
//   matchDate: string;
//   competition: "gpl" | "fa-cup" | "friendly";
//   venue: string;
//   status: "upcoming" | "live" | "completed";
//   matchday?: number;
//   season?: string;
//   videoHighlights?: string;
// }

// PRODUCT INTERFACE
export interface Product {
  _id: string;
  _type: "product";
  name: string;
  slug: Slug;
  image: SanityImage;
  otherImages?: SanityImage[];
  price: number;
  category: "jerseys" | "lifestyle" | "accessories";
  productType?: "home-jersey" | "away-jersey" | "training-kit" | "other";
  displayTitle?: string;
  description?: string;
  sizes?: string[];
  inStock: boolean;
}

// STAFF/COACH INTERFACE
// export interface Staff {
//   _id: string;
//   _type: "staff";
//   fullName: string;
//   role: "head-coach" | "assistant-coach" | "goalkeeper-coach" | "fitness-coach";
//   photo: SanityImage;
//   biography?: string;
//   achievements?: Array<{
//     title: string;
//     year: string;
//   }>;
//   joinedDate?: string;
// }

// FOOTER SETTINGS INTERFACE
export interface FooterSettings {
  description: string;
  location?: {
    location?: string;
    locationUrlOnMap?: string;
  };
  phone?: string;
  email?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    pinterest?: string;
  };
}

// SPONSOR SETTINGS INTERFACE
export interface Sponsor {
  _key: string;
  name: string;
  logo: SanityImage;
  website?: string;
  order?: number;
}

export interface SponsorSettings {
  sponsorSectionTitle: string;
  sponsors: Sponsor[];
}

// LIVE MATCHES SETTINGS INTERFACE
export interface LiveMatchesSettings {
  sectionTitle: string;
  sectionSubtext: string;
  videoThumbnail?: SanityImage;
  videoUrl?: string;
  isLive: boolean;
}

// NEWSLETTER SETTINGS INTERFACE
export interface NewsletterSettings {
  sectionTitle: string;
  sectionSubtext: string;
  inputPlaceholder: string;
  buttonText: string;
}

// HOMEPAGE INTERFACE
// export interface Homepage {
//   _id: string;
//   _type: "homepage";
//   heroSection: {
//     mainHeading: string;
//     subHeading: string;
//     heroImage: SanityImage;
//     ctaButton: {
//       text: string;
//       link: string;
//     };
//   };
//   featuredNewsSection: {
//     sectionTitle: string;
//     sectionDescription: string;
//     featuredArticles: NewsArticle[];
//   };
//   upcomingFixturesSection: {
//     sectionTitle: string;
//     description: string;
//     showNextMatch: boolean;
//   };
//   storeSection: {
//     sectionTitle: string;
//     description: string;
//     featuredProducts: Product[];
//   };
//   newsletterSection: {
//     heading: string;
//     description: string;
//     buttonText: string;
//   };
// }
