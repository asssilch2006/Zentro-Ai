import React from 'react';
import { X, Star, ExternalLink, ArrowRight, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ComparisonModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onOpenReview: (product: Product) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  products,
  isOpen,
  onClose,
  onOpenReview,
}) => {
  if (!isOpen || products.length === 0) return null;

  return (
    <div
      id="comparison-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="comparison-modal-content"
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-neutral-950 p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              Side-by-Side Product Comparison
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Compare features, pricing, benchmarks, and verified discounts for selected digital tools.
            </p>
          </div>
          <button
            id="close-comparison-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Comparison Grid */}
        <div className="p-5 sm:p-6 overflow-x-auto max-h-[75vh]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="p-3 w-40 text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
                  Tool Overview
                </th>
                {products.map((p) => (
                  <th key={p.id} className="p-3 min-w-[220px]">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${p.iconBg}`}>
                        <ProductIcon name={p.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-neutral-100 block">{p.name}</span>
                        <span className="text-[11px] text-neutral-400">{p.categoryName}</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {/* Overall Rating */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Review Score</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <div className="flex items-center gap-1 font-bold text-neutral-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{p.rating}</span>
                      <span className="text-neutral-500 text-[10px]">({p.reviewCount})</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Starting Price & Model */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Pricing Model</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <span className="font-bold text-neutral-100 block">{p.startingPrice}</span>
                    <span className="text-[11px] text-neutral-400">{p.pricingLabel}</span>
                  </td>
                ))}
              </tr>

              {/* Best For */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Ideal For</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 text-neutral-300">
                    {p.bestFor}
                  </td>
                ))}
              </tr>

              {/* Special Partner Perk */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Exclusive Deal</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    {p.dealDiscount ? (
                      <span className="text-emerald-400 font-semibold block">
                        {p.dealDiscount}
                      </span>
                    ) : (
                      <span className="text-neutral-500 italic">Standard rate</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Performance Score */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Performance Benchmark</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-semibold text-neutral-200">
                    {p.scores.performance} / 5.0
                  </td>
                ))}
              </tr>

              {/* Ease of Use */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Ease of Use</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3 font-semibold text-neutral-200">
                    {p.scores.easeOfUse} / 5.0
                  </td>
                ))}
              </tr>

              {/* Top Pros */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Top Strengths</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <ul className="space-y-1 text-[11px] text-neutral-300">
                      {p.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Top Cons */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Drawbacks</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <ul className="space-y-1 text-[11px] text-neutral-400">
                      {p.cons.slice(0, 2).map((con, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <XCircle className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Outbound Actions */}
              <tr>
                <td className="p-3 font-semibold text-neutral-400">Action</td>
                {products.map((p) => (
                  <td key={p.id} className="p-3">
                    <div className="space-y-2">
                      <a
                        id={`compare-visit-${p.id}`}
                        href={p.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Visit {p.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        id={`compare-read-${p.id}`}
                        onClick={() => {
                          onClose();
                          onOpenReview(p);
                        }}
                        className="w-full py-1.5 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[11px] font-medium transition-colors cursor-pointer"
                      >
                        Read Full Benchmark
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
