import React, { useState } from 'react';
import {
  ArrowBigUp,
  Star,
  CheckCircle2,
  ExternalLink,
  Bookmark,
  Sparkles,
  Info,
  Tag,
} from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ToolCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  isBookmarked: boolean;
  onToggleBookmark: (product: Product) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
  product,
  onOpenDetails,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(product.upvotes);

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (upvoted) {
      setUpvoted(false);
      setUpvoteCount((prev) => prev - 1);
    } else {
      setUpvoted(true);
      setUpvoteCount((prev) => prev + 1);
    }
  };

  // Color-coded pricing tag badge
  const getPricingTagBadge = (priceModel: Product['priceModel']) => {
    switch (priceModel) {
      case 'free':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Free
          </span>
        );
      case 'freemium':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
            Freemium
          </span>
        );
      case 'paid':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
            Paid
          </span>
        );
      case 'free-trial':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
            Free Trial
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <article
      id={`tool-card-${product.id}`}
      onClick={() => onOpenDetails(product)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-200 flex flex-col justify-between overflow-hidden relative group p-5 text-left cursor-pointer"
    >
      {/* Top Header Controls: Upvote count + FEATURED / TOP ribbon + Bookmark */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          {/* Up-arrow with number (Ranking / Upvotes) */}
          <button
            id={`upvote-btn-${product.id}`}
            onClick={handleUpvote}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              upvoted
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Upvote tool"
            aria-label={`Upvote ${product.name}`}
          >
            <ArrowBigUp className={`w-4 h-4 ${upvoted ? 'fill-white' : 'fill-slate-400'}`} />
            <span className="font-mono">{upvoteCount}</span>
          </button>

          <div className="flex items-center gap-1.5">
            {/* Orange TOP Ribbon if featured top tool */}
            {product.isTop && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs">
                <span>TOP</span>
              </span>
            )}

            {/* FEATURED label with star */}
            {product.isFeatured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>FEATURED</span>
              </span>
            )}

            {/* Bookmark button */}
            <button
              id={`bookmark-btn-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(product);
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
                isBookmarked
                  ? 'bg-blue-50 text-blue-600 border-blue-200'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-transparent'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark tool'}
              aria-label={`Bookmark ${product.name}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Tool Identity: Logo & Name with Verification checkmark */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${product.iconBg} shadow-xs font-bold text-lg`}
          >
            {product.iconName ? (
              <ProductIcon name={product.iconName} className="w-5 h-5" />
            ) : (
              <span>{product.logoLetter || product.name[0]}</span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                {product.name}
              </h3>
              {product.isVerified && (
                <span title="Manually Verified by Zentro Editorial">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-50 shrink-0" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[11px] text-slate-500 font-medium truncate">
                {product.categoryName}
              </span>
              <span className="text-slate-300">•</span>
              {getPricingTagBadge(product.priceModel)}
            </div>
          </div>
        </div>

        {/* Description: A short paragraph describes the tool's function */}
        <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-3 leading-relaxed mb-4">
          {product.shortDescription}
        </p>
      </div>

      {/* Footer Area: Pricing info & Blue VISIT button */}
      <div className="pt-3 border-t border-slate-100 mt-auto">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
          <span className="font-semibold text-slate-700">{product.startingPrice}</span>
          <button
            onClick={() => onOpenDetails(product)}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 cursor-pointer hover:underline"
          >
            <Info className="w-3 h-3" />
            <span>Review & Specs</span>
          </button>
        </div>

        {/* Blue VISIT button with external link icon */}
        <a
          id={`visit-btn-${product.id}`}
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
        >
          <span>VISIT</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
};
