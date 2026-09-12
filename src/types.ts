export type CategoryId =
  | 'all'
  | 'ai-tools'
  | 'web-hosting'
  | 'vpns'
  | 'secure-email'
  | 'productivity'
  | '3d-models'
  | 'coding'
  | 'video-audio';

export type FilterTag = 'all' | 'verified' | 'free' | 'freemium' | 'paid' | 'free-trial';

export type PricingModel = 'free' | 'freemium' | 'paid' | 'free-trial';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface ArticleSection {
  heading: string;
  body: string;
  highlightBox?: {
    title: string;
    text: string;
    productId: string;
  };
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishedDate: string;
  summary: string;
  author: Author;
  featuredProductIds: string[];
  sections: ArticleSection[];
  verdict?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface ReviewFAQ {
  question: string;
  answer: string;
}

export interface ScoreBreakdown {
  overall: number;
  performance: number;
  easeOfUse: number;
  valueForMoney: number;
  support: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  categoryName: string;
  tagline: string;
  shortDescription: string;
  detailedDescription?: string;
  tags?: string[];
  rating: number;
  reviewCount: number;
  upvotes: number;
  isFeatured?: boolean;
  isTop?: boolean; // For orange TOP ribbon
  isVerified?: boolean; // Blue verification badge
  priceModel: 'free' | 'freemium' | 'paid' | 'free-trial';
  pricingLabel: string;
  startingPrice: string;
  dealDiscount?: string;
  promoCode?: string;
  affiliateUrl: string;
  verifiedDate: string;
  iconName: string;
  iconBg: string;
  logoLetter?: string;
  features: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  scores: ScoreBreakdown;
  verdict: string;
  pricingTiers: PricingTier[];
  faqs: ReviewFAQ[];
}

export interface CategoryOption {
  id: CategoryId;
  name: string;
  count: number;
}
