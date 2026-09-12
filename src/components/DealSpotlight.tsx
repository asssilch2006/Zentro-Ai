import React, { useState } from 'react';
import { Tag, Copy, Check, ExternalLink, ArrowRight, Flame, Clock, Star } from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface DealSpotlightProps {
  products: Product[];
  onOpenReview: (product: Product) => void;
}

export const DealSpotlight: React.FC<DealSpotlightProps> = ({ products, onOpenReview }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pick top 2 deals with promo codes
  const dealProducts = products
    .filter((p) => p.dealDiscount && p.promoCode)
    .slice(0, 2);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section id="deals" className="py-10 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
              <Flame className="w-3.5 h-3.5" />
              Verified Deal Drops of the Week
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
              Exclusive Community Discounts
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Direct partnership codes negotiated exclusively for StackVetted readers. Tested and confirmed active.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-neutral-500" />
            <span>Updated: September 2026</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dealProducts.map((product) => {
            const isCopied = copiedId === product.id;

            return (
              <div
                key={product.id}
                id={`deal-card-${product.id}`}
                className="relative bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${product.iconBg}`}>
                        <ProductIcon name={product.iconName} className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-neutral-100">{product.name}</h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-medium">
                            {product.categoryName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400">
                          <span className="flex items-center gap-1 text-amber-400 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            {product.rating}
                          </span>
                          <span>({product.reviewCount} verified reviews)</span>
                        </div>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shrink-0">
                      Active Code
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Special Offer Box */}
                  <div className="mt-4 p-3.5 rounded-lg bg-neutral-950 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 block">
                        Special Perk
                      </span>
                      <span className="text-sm font-bold text-neutral-100">
                        {product.dealDiscount}
                      </span>
                    </div>

                    {product.promoCode && (
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 font-mono text-xs font-bold text-neutral-200 tracking-wider">
                          {product.promoCode}
                        </div>
                        <button
                          id={`copy-code-btn-${product.id}`}
                          onClick={() => handleCopy(product.promoCode!, product.id)}
                          className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 font-medium flex items-center gap-1 cursor-pointer transition-colors"
                          title="Copy promo code"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-semibold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Key Highlights */}
                  <div className="mt-4 space-y-1.5">
                    {product.features.slice(0, 2).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-400">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTAs */}
                <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                  <button
                    id={`deal-review-btn-${product.id}`}
                    onClick={() => onOpenReview(product)}
                    className="text-xs text-neutral-400 hover:text-neutral-100 transition-colors font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Benchmark</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    id={`deal-claim-link-${product.id}`}
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Claim Deal at {product.name}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
