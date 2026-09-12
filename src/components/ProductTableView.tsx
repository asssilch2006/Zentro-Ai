import React, { useState } from 'react';
import { Star, ExternalLink, ArrowRight, Copy, Check, CheckSquare, Square } from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ProductTableViewProps {
  products: Product[];
  onOpenReview: (product: Product) => void;
  comparedIds: string[];
  onToggleCompare: (product: Product) => void;
}

export const ProductTableView: React.FC<ProductTableViewProps> = ({
  products,
  onOpenReview,
  comparedIds,
  onToggleCompare,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-900/60">
      <table className="w-full text-left text-xs text-neutral-300">
        <thead className="bg-neutral-900 border-b border-neutral-800 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
          <tr>
            <th scope="col" className="p-4 w-12 text-center">Compare</th>
            <th scope="col" className="py-4 px-3">Product & Category</th>
            <th scope="col" className="py-4 px-3">Rating</th>
            <th scope="col" className="py-4 px-3">Pricing Model</th>
            <th scope="col" className="py-4 px-3">Verified Deal / Coupon</th>
            <th scope="col" className="py-4 px-3">Best For</th>
            <th scope="col" className="py-4 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800/80">
          {products.map((product) => {
            const isCompared = comparedIds.includes(product.id);
            const isCopied = copiedId === product.id;

            return (
              <tr
                key={product.id}
                id={`table-row-${product.id}`}
                className="hover:bg-neutral-800/40 transition-colors"
              >
                {/* Compare Checkbox */}
                <td className="p-4 text-center">
                  <button
                    id={`table-compare-btn-${product.id}`}
                    onClick={() => onToggleCompare(product)}
                    className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 cursor-pointer"
                    title="Add to side-by-side comparison"
                  >
                    {isCompared ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-neutral-500" />
                    )}
                  </button>
                </td>

                {/* Name & Category */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${product.iconBg} shrink-0`}>
                      <ProductIcon name={product.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-100 text-sm">{product.name}</span>
                        {product.badge && (
                          <span className="text-[9px] uppercase font-semibold px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-neutral-400 block">{product.categoryName}</span>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-1 font-bold text-neutral-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-neutral-500 text-[10px] font-normal">({product.reviewCount})</span>
                  </div>
                </td>

                {/* Pricing Model */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <div>
                    <span className="font-semibold text-neutral-200 block">{product.startingPrice}</span>
                    <span className="text-[10px] text-neutral-400">{product.pricingLabel}</span>
                  </div>
                </td>

                {/* Deal / Coupon */}
                <td className="py-3 px-3">
                  {product.dealDiscount ? (
                    <div className="space-y-1">
                      <span className="text-emerald-400 font-semibold block text-[11px]">
                        {product.dealDiscount}
                      </span>
                      {product.promoCode && (
                        <button
                          id={`table-copy-code-${product.id}`}
                          onClick={() => handleCopy(product.promoCode!, product.id)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-700 text-neutral-300 hover:text-neutral-100 font-mono text-[10px] cursor-pointer"
                        >
                          {isCopied ? (
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
                  ) : (
                    <span className="text-neutral-500 italic text-[11px]">Standard rate</span>
                  )}
                </td>

                {/* Best For */}
                <td className="py-3 px-3 max-w-xs truncate text-neutral-300 text-[11px]">
                  {product.bestFor}
                </td>

                {/* CTAs */}
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      id={`table-view-review-${product.id}`}
                      onClick={() => onOpenReview(product)}
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-medium text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Review</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <a
                      id={`table-affiliate-link-${product.id}`}
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
