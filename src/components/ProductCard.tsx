import React, { useState } from 'react';
import { Star, ExternalLink, ArrowRight, Copy, Check, Plus, CheckSquare, Square, Tag } from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ProductCardProps {
  product: Product;
  onOpenReview: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenReview,
  isCompared,
  onToggleCompare,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.promoCode) {
      navigator.clipboard.writeText(product.promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/90 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-black/30 group"
    >
      <div>
        {/* Top bar: Icon, title, badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center border ${product.iconBg} shrink-0`}>
              <ProductIcon name={product.iconName} className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-base text-neutral-100 group-hover:text-emerald-400 transition-colors">
                  {product.name}
                </h3>
                {product.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-neutral-400 block mt-0.5">
                {product.categoryName}
              </span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-neutral-200">{product.rating}</span>
            <span className="text-neutral-500 text-[11px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Tagline */}
        <p className="mt-3 text-xs text-neutral-300 font-medium leading-relaxed">
          {product.tagline}
        </p>

        {/* Core Value Features List */}
        <div className="mt-3.5 space-y-1.5">
          {product.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-neutral-400">
              <span className="text-emerald-400 font-bold shrink-0 text-[11px]">✓</span>
              <span className="line-clamp-1">{feat}</span>
            </div>
          ))}
        </div>

        {/* Best For Tag */}
        <div className="mt-3 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
          <span className="text-neutral-500 font-medium">Best for: </span>
          <span className="text-neutral-300">{product.bestFor}</span>
        </div>

        {/* Deal Tag / Promo Code Banner if available */}
        {product.dealDiscount && (
          <div className="mt-3 p-2.5 rounded-lg bg-neutral-950 border border-emerald-500/25 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Tag className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-xs font-semibold text-emerald-300 truncate">
                {product.dealDiscount}
              </span>
            </div>

            {product.promoCode && (
              <button
                id={`card-copy-promo-${product.id}`}
                onClick={handleCopy}
                className="shrink-0 text-[11px] px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-neutral-100 flex items-center gap-1 cursor-pointer transition-colors"
                title="Copy promo code"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{product.promoCode}</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Area: Pricing + CTAs */}
      <div className="mt-4 pt-3.5 border-t border-neutral-800">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Pricing</span>
            <span className="font-bold text-neutral-200">{product.startingPrice}</span>
            <span className="text-neutral-400 text-[11px] ml-1">({product.pricingLabel})</span>
          </div>

          {/* Add to Compare toggle */}
          <button
            id={`toggle-compare-btn-${product.id}`}
            onClick={() => onToggleCompare(product)}
            className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded transition-colors cursor-pointer ${
              isCompared
                ? 'text-indigo-300 bg-indigo-500/10 border border-indigo-500/30'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
            }`}
          >
            {isCompared ? (
              <>
                <CheckSquare className="w-3.5 h-3.5 text-indigo-400" />
                <span>In Compare</span>
              </>
            ) : (
              <>
                <Square className="w-3.5 h-3.5 text-neutral-500" />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            id={`card-view-review-${product.id}`}
            onClick={() => onOpenReview(product)}
            className="w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span>Review</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <a
            id={`card-affiliate-link-${product.id}`}
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-sm"
          >
            <span>Visit Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
