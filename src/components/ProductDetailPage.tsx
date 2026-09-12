import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Star,
  CheckCircle2,
  Bookmark,
  ArrowBigUp,
  Share2,
  Copy,
  Check,
  Tag,
  ShieldCheck,
  Sparkles,
  Clock,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Info,
  Layers,
  Zap,
  Globe,
  HelpCircle,
  Award,
} from 'lucide-react';
import { Product, CategoryId } from '../types';
import { ProductIcon } from './ProductIcon';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onSelectTag?: (tag: string) => void;
  relatedProducts: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onSelectProduct,
  onSelectTag,
  relatedProducts,
}) => {
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(product.upvotes);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShareLink, setCopiedShareLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setUpvoted(false);
    setUpvoteCount(product.upvotes);
    setOpenFaqIndex(0);
  }, [product.id, product.upvotes]);

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false);
      setUpvoteCount((prev) => prev - 1);
    } else {
      setUpvoted(true);
      setUpvoteCount((prev) => prev + 1);
    }
  };

  const handleCopyPromo = () => {
    if (product.promoCode) {
      navigator.clipboard.writeText(product.promoCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2200);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // Derive tags if not explicitly given
  const tagsList = product.tags && product.tags.length > 0
    ? product.tags
    : [
        product.categoryName,
        product.priceModel.toUpperCase(),
        'Verified Software',
        'Zentro Tested',
        ...product.features.slice(0, 3).map((f) => f.split(' ')[0]),
      ];

  const getPricingTagBadge = (priceModel: Product['priceModel']) => {
    switch (priceModel) {
      case 'free':
        return (
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Free Service
          </span>
        );
      case 'freemium':
        return (
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Freemium (Free Tier Available)
          </span>
        );
      case 'paid':
        return (
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Commercial / Paid
          </span>
        );
      case 'free-trial':
        return (
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Free Trial Available
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Top Breadcrumb & Back Navigation Bar */}
      <div className="sticky top-14 z-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <button
            id="product-detail-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 bg-slate-100/80 hover:bg-blue-50 px-3.5 py-2 rounded-xl transition-all cursor-pointer border border-slate-200/70 hover:border-blue-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-slate-500 group-hover:text-blue-600" />
            <span>Back to All Tools</span>
          </button>

          {/* Breadcrumb path */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-medium truncate">
            <span
              onClick={onBack}
              className="hover:text-slate-700 transition-colors cursor-pointer"
            >
              Directory
            </span>
            <span>/</span>
            <span className="text-slate-500">{product.categoryName}</span>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px]">
              {product.name}
            </span>
          </div>

          {/* Quick Header Outbound CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Share tool link"
            >
              {copiedShareLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline font-semibold text-[11px]">Share</span>
                </>
              )}
            </button>

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>Visit Official Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* 2. Main Product Identity Hero Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8 relative overflow-hidden">
          {/* Subtle decorative background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-full blur-3xl -z-10 pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            {/* Left: Logo + Title + Badges + Tagline */}
            <div className="flex items-start gap-4 sm:gap-6 flex-1">
              {/* Product Logo Container */}
              <div
                id="product-detail-logo"
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shrink-0 border ${product.iconBg} shadow-sm font-extrabold text-2xl sm:text-3xl`}
              >
                {product.iconName ? (
                  <ProductIcon name={product.iconName} className="w-8 h-8 sm:w-10 sm:h-10" />
                ) : (
                  <span>{product.logoLetter || product.name[0]}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {product.isTop && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                      <Award className="w-3 h-3" />
                      <span>TOP RANKED</span>
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>FEATURED</span>
                    </span>
                  )}
                  {getPricingTagBadge(product.priceModel)}
                  <span className="text-xs text-slate-500 font-medium px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/80">
                    {product.categoryName}
                  </span>
                </div>

                {/* Product Name & Verification */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1
                    id="product-detail-title"
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f172a] tracking-tight"
                  >
                    {product.name}
                  </h1>
                  {product.isVerified && (
                    <div
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200/90 px-2 py-0.5 rounded-full"
                      title="Audited & Manually Verified by Zentro Technical Editorial"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-50 shrink-0" />
                      <span>Verified Software</span>
                    </div>
                  )}
                </div>

                {/* Tagline */}
                <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
                  {product.tagline}
                </p>

                {/* Rating & Review Meta Bar */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  {/* Star rating */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm">{product.rating}</span>
                    <span className="text-slate-400">({product.reviewCount} customer reviews)</span>
                  </div>

                  {/* Starting Price */}
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span>Starts at: </span>
                    <span className="font-bold text-slate-800">{product.startingPrice}</span>
                  </div>

                  {/* Last audit date */}
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Last audited: {product.verifiedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Header Interaction: Upvote & Bookmark */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  id="product-detail-upvote-btn"
                  onClick={handleUpvote}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    upvoted
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title="Upvote this software"
                >
                  <ArrowBigUp className={`w-4 h-4 ${upvoted ? 'fill-white' : 'fill-slate-400'}`} />
                  <span>Upvote ({upvoteCount})</span>
                </button>

                <button
                  id="product-detail-bookmark-btn"
                  onClick={() => onToggleBookmark(product)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isBookmarked
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                  title={isBookmarked ? 'Saved to Bookmarks' : 'Save for later'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Overall Score Badge */}
              <div className="text-right hidden sm:block">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Zentro Benchmark
                </span>
                <div className="text-2xl font-black text-slate-900 mt-0.5 flex items-center justify-end gap-1">
                  <span>{product.scores.overall}</span>
                  <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Two-Column Layout: Left Content & Right Sticky Conversion Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* A. Detailed Description Section */}
            <section
              id="product-detail-description"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                <span>About {product.name}</span>
              </h2>

              {/* Long-form detailed description */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
                <p>
                  {product.detailedDescription || product.shortDescription}
                </p>
                <p className="text-slate-600 text-sm">
                  {product.shortDescription}
                </p>
              </div>

              {/* Editorial Verdict Box */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-blue-50/60 border border-blue-100 text-slate-800">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Zentro Editorial Testing Verdict</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{product.verdict}"
                </p>
                <div className="mt-2 text-right">
                  <span className="text-[11px] font-semibold text-slate-500">
                    — Vetted by Zentro Review Lab, {product.verifiedDate}
                  </span>
                </div>
              </div>

              {/* Best For Callout */}
              <div className="mt-5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold text-slate-900">Recommended For: </strong>
                  <span>{product.bestFor}</span>
                </div>
              </div>
            </section>

            {/* B. Relevant Tags Section */}
            <section
              id="product-detail-tags"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
            >
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-slate-400" />
                <span>Relevant Tags & Tech Topics</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {tagsList.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectTag && onSelectTag(tag)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 transition-colors cursor-pointer"
                  >
                    <span className="text-slate-400">#</span>
                    <span>{tag}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* C. Key Features & Capabilities */}
            <section
              id="product-detail-features"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Key Features & Capabilities</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* D. Pros and Cons Comparison */}
            <section
              id="product-detail-pros-cons"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Pros & Cons Breakdown
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pros */}
                <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                    <ThumbsUp className="w-4 h-4 text-emerald-600" />
                    <span>What We Liked</span>
                  </div>
                  <ul className="space-y-2.5">
                    {product.pros.map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200/70">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-3">
                    <ThumbsDown className="w-4 h-4 text-rose-600" />
                    <span>Considerations</span>
                  </div>
                  <ul className="space-y-2.5">
                    {product.cons.map((con, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          ✕
                        </span>
                        <span className="leading-snug">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* E. Editorial Benchmark & Scorecard */}
            <section
              id="product-detail-scorecard"
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Zentro Lab Performance Benchmark
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Objective multi-metric scores based on latency, feature completeness, and user feedback.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-2xl self-start sm:self-auto">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-blue-900">
                    Overall {product.scores.overall} / 5.0
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Performance & Speed', score: product.scores.performance },
                  { label: 'Ease of Use & UI', score: product.scores.easeOfUse },
                  { label: 'Value for Money', score: product.scores.valueForMoney },
                  { label: 'Customer Support & SLA', score: product.scores.support },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.score} / 5.0</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${(item.score / 5.0) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* F. Pricing Tiers Breakdown */}
            {product.pricingTiers && product.pricingTiers.length > 0 && (
              <section
                id="product-detail-pricing"
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Pricing Plans & Subscriptions
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  Select the best plan for your workflow or start with a free trial.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.pricingTiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl p-5 border flex flex-col justify-between relative ${
                        tier.popular
                          ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-400/40'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      {tier.popular && (
                        <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Most Popular
                        </span>
                      )}
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{tier.name}</h3>
                        <div className="mt-2 mb-4">
                          <span className="text-2xl font-black text-slate-900">{tier.price}</span>
                          <span className="text-xs text-slate-500 ml-1">/{tier.period}</span>
                        </div>

                        <ul className="space-y-2 text-xs text-slate-600 mb-4">
                          {tier.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <a
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2 px-3 rounded-xl text-xs font-bold text-center block transition-colors cursor-pointer ${
                          tier.popular
                            ? 'bg-blue-600 hover:bg-blue-500 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        Choose {tier.name}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* G. Frequently Asked Questions */}
            {product.faqs && product.faqs.length > 0 && (
              <section
                id="product-detail-faqs"
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <span>Frequently Asked Questions</span>
                </h2>

                <div className="space-y-3">
                  {product.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-3 bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <span className="font-bold text-sm text-slate-900">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Conversion & Summary Card (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Main Conversion CTA Card */}
            <div className="sticky top-32 space-y-6">
              <div
                id="product-detail-cta-card"
                className="bg-white rounded-3xl border-2 border-blue-500/80 shadow-xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                  Official Partner Link
                </div>

                {/* Deal Callout if available */}
                {product.dealDiscount && (
                  <div className="mb-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200 rounded-2xl p-3.5 text-center">
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                      ⚡ Special Deal Unlocked
                    </span>
                    <p className="font-extrabold text-sm text-slate-900 mt-0.5">
                      {product.dealDiscount}
                    </p>
                  </div>
                )}

                {/* Promo Code Copy widget if available */}
                {product.promoCode && (
                  <div className="mb-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Verified Promo Code
                      </span>
                      <span className="font-mono font-bold text-xs text-blue-700">
                        {product.promoCode}
                      </span>
                    </div>

                    <button
                      onClick={handleCopyPromo}
                      className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition-colors flex items-center gap-1 shrink-0 cursor-pointer shadow-2xs"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Pricing summary */}
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Starting Plan</span>
                    <span className="text-2xl font-black text-slate-900">
                      {product.startingPrice}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {product.pricingLabel}
                  </span>
                </div>

                {/* PROMINENT CALL TO ACTION BUTTON */}
                <a
                  id="primary-affiliate-cta-btn"
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 active:scale-[0.98] transition-all cursor-pointer text-center group"
                >
                  <span>Visit {product.name}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Safe & Secure notice */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-3 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct link to official verified provider</span>
                </div>

                {/* FTC Affiliate Disclosure */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
                  <strong className="text-slate-500 font-semibold">FTC Transparency: </strong>
                  When you purchase through links on Zentro, we may earn an affiliate commission at zero extra cost to you.
                </div>
              </div>

              {/* 2. Quick Specs Sheet */}
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Quick Specifications</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Service Name</span>
                    <span className="font-bold text-slate-800">{product.name}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Category</span>
                    <span className="font-bold text-slate-800">{product.categoryName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Pricing Model</span>
                    <span className="font-bold text-slate-800 uppercase">{product.priceModel}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Starting Price</span>
                    <span className="font-bold text-slate-800">{product.startingPrice}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Audit Status</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Passed Verification</span>
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500">Official Website</span>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                    >
                      <Globe className="w-3 h-3" />
                      <span>{product.slug}.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* 3. Related / Similar Tools in Category */}
              {relatedProducts.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Alternative Software in {product.categoryName}
                  </h3>

                  <div className="space-y-3">
                    {relatedProducts.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onSelectProduct(rel)}
                        className="p-3 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${rel.iconBg} font-bold text-xs`}
                          >
                            {rel.iconName ? (
                              <ProductIcon name={rel.iconName} className="w-4 h-4" />
                            ) : (
                              <span>{rel.logoLetter || rel.name[0]}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs text-slate-800 group-hover:text-blue-700 truncate">
                              {rel.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 block truncate">
                              {rel.startingPrice}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 shrink-0">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{rel.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
