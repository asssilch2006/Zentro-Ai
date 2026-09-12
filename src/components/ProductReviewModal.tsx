import React, { useState } from 'react';
import {
  X,
  Star,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Tag,
  Share2,
} from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ProductReviewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductReviewModal: React.FC<ProductReviewModalProps> = ({ product, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);
  const [copiedShare, setCopiedShare] = useState(false);

  if (!product) return null;

  const handleCopyCode = () => {
    if (product.promoCode) {
      navigator.clipboard.writeText(product.promoCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div
      id="review-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="review-modal-content"
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center border ${product.iconBg} shrink-0`}>
              <ProductIcon name={product.iconName} className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-100">{product.name}</h2>
                {product.badge && (
                  <span className="text-[11px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">{product.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="share-review-btn"
              onClick={handleShare}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-neutral-100 transition-colors cursor-pointer"
              title="Share review link"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              id="close-review-modal-btn"
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Stats & Rating bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-500 font-semibold block">Overall Rating</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-lg font-bold text-neutral-100">{product.scores.overall}</span>
                <span className="text-xs text-neutral-500">/ 5.0</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-500 font-semibold block">Starting Price</span>
              <span className="text-base font-bold text-neutral-100 mt-1 block">{product.startingPrice}</span>
              <span className="text-[10px] text-neutral-400">{product.pricingLabel}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-500 font-semibold block">Category</span>
              <span className="text-sm font-bold text-neutral-200 mt-1 block">{product.categoryName}</span>
              <span className="text-[10px] text-emerald-400 font-medium">Verified Active</span>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[11px] text-neutral-500 font-semibold block">Best For</span>
              <span className="text-xs text-neutral-300 font-medium mt-1 line-clamp-2">{product.bestFor}</span>
            </div>
          </div>

          {/* Deal Promo Code Banner if available */}
          {product.dealDiscount && (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                    Exclusive Reader Perk
                  </span>
                  <span className="text-sm font-bold text-neutral-100">{product.dealDiscount}</span>
                  <p className="text-xs text-neutral-400 mt-0.5">Applied at checkout with code or partner link.</p>
                </div>
              </div>

              {product.promoCode && (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 font-mono text-xs font-bold text-neutral-100 tracking-wider">
                    {product.promoCode}
                  </span>
                  <button
                    id="modal-copy-promo-btn"
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Editorial Score Breakdown */}
          <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Benchmark Score Breakdown
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">Core Performance & Latency</span>
                  <span className="font-bold text-neutral-200">{product.scores.performance} / 5.0</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5">
                  <div
                    className="bg-emerald-400 h-1.5 rounded-full"
                    style={{ width: `${(product.scores.performance / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">Ease of Use & UX Design</span>
                  <span className="font-bold text-neutral-200">{product.scores.easeOfUse} / 5.0</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5">
                  <div
                    className="bg-emerald-400 h-1.5 rounded-full"
                    style={{ width: `${(product.scores.easeOfUse / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">Value for Money & Pricing Fairness</span>
                  <span className="font-bold text-neutral-200">{product.scores.valueForMoney} / 5.0</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5">
                  <div
                    className="bg-emerald-400 h-1.5 rounded-full"
                    style={{ width: `${(product.scores.valueForMoney / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-neutral-400">Support & Documentation</span>
                  <span className="font-bold text-neutral-200">{product.scores.support} / 5.0</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-1.5">
                  <div
                    className="bg-emerald-400 h-1.5 rounded-full"
                    style={{ width: `${(product.scores.support / 5) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pros & Cons Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-3">
                <CheckCircle2 className="w-4 h-4" />
                Key Advantages (Pros)
              </h4>
              <ul className="space-y-2">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-3">
                <XCircle className="w-4 h-4" />
                Considerations (Cons)
              </h4>
              <ul className="space-y-2">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Editorial Verdict & "Skip if" guidance */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                The Editorial Verdict
              </h4>
              <p className="text-sm text-neutral-200 leading-relaxed font-medium">
                "{product.verdict}"
              </p>
            </div>

            <div className="pt-2 border-t border-neutral-800/80 text-xs">
              <span className="text-amber-400 font-semibold">⚠️ When to skip: </span>
              <span className="text-neutral-400">{product.skipIf}</span>
            </div>
          </div>

          {/* Pricing Tiers Table */}
          {product.pricingTiers && product.pricingTiers.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Official Pricing Tiers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.pricingTiers.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                      tier.popular
                        ? 'bg-neutral-950 border-emerald-500/50 shadow-sm'
                        : 'bg-neutral-950/70 border-neutral-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-200">{tier.name}</span>
                        {tier.popular && (
                          <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <span className="text-lg font-extrabold text-neutral-100">{tier.price}</span>
                        <span className="text-[11px] text-neutral-400 ml-1">/{tier.period}</span>
                      </div>
                      <ul className="mt-3 space-y-1 text-[11px] text-neutral-400">
                        {tier.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-center gap-1.5">
                            <span className="text-emerald-400">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </h4>

              <div className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl bg-neutral-950 overflow-hidden">
                {product.faqs.map((faq, fidx) => {
                  const isOpen = expandedFaqIndex === fidx;
                  return (
                    <div key={fidx} className="p-3.5">
                      <button
                        id={`modal-faq-toggle-${fidx}`}
                        onClick={() => setExpandedFaqIndex(isOpen ? null : fidx)}
                        className="w-full text-left flex items-center justify-between gap-2 text-xs font-bold text-neutral-200 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
                      </button>
                      {isOpen && (
                        <p className="mt-2 text-xs text-neutral-400 leading-relaxed pr-4">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="sticky bottom-0 bg-neutral-950 border-t border-neutral-800 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-neutral-400 text-center sm:text-left">
            <span>Verified safe affiliate link. </span>
            <span className="text-emerald-400 font-semibold">Special partner perk applied automatically.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              id="modal-footer-close-btn"
              onClick={onClose}
              className="w-1/3 sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>

            <a
              id={`modal-affiliate-cta-${product.id}`}
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="w-2/3 sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              <span>Visit Official Site ({product.name})</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
