import React, { useState } from 'react';
import {
  X,
  Star,
  CheckCircle2,
  ExternalLink,
  Tag,
  Copy,
  Check,
  Shield,
  ThumbsUp,
  AlertTriangle,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ToolDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ToolDetailsModal: React.FC<ToolDetailsModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="tool-details-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="tool-details-modal"
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header banner */}
        <div className="p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${product.iconBg} shadow-xs font-bold text-2xl`}
            >
              {product.iconName ? (
                <ProductIcon name={product.iconName} className="w-7 h-7" />
              ) : (
                <span>{product.logoLetter || product.name[0]}</span>
              )}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">{product.name}</h2>
                {product.isVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    Verified
                  </span>
                )}
                {product.isTop && (
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    TOP PICK
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">{product.tagline}</p>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <span>Category: <strong className="text-slate-700">{product.categoryName}</strong></span>
                <span>•</span>
                <span>Tested: {product.verifiedDate}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Discount / Deal callout if exists */}
          {product.dealDiscount && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Exclusive Zentro Partner Deal
                  </div>
                  <div className="text-sm font-extrabold text-emerald-900">{product.dealDiscount}</div>
                </div>
              </div>

              {product.promoCode && (
                <button
                  onClick={() => handleCopyCode(product.promoCode!)}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-mono text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Code!' : product.promoCode}</span>
                </button>
              )}
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Editorial Summary</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{product.shortDescription}</p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
              <strong>Zentro Verdict:</strong> {product.verdict}
            </p>
          </div>

          {/* Score breakdown */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Benchmark Testing Scores
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-lg font-black text-slate-900">{product.scores.performance} / 5.0</div>
                <div className="text-[11px] text-slate-500 font-medium">Performance</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-lg font-black text-slate-900">{product.scores.easeOfUse} / 5.0</div>
                <div className="text-[11px] text-slate-500 font-medium">Ease of Use</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-lg font-black text-slate-900">{product.scores.valueForMoney} / 5.0</div>
                <div className="text-[11px] text-slate-500 font-medium">Value for Money</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <div className="text-lg font-black text-slate-900">{product.scores.support} / 5.0</div>
                <div className="text-[11px] text-slate-500 font-medium">Support & Uptime</div>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>What We Liked</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {product.pros.map((pro, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Tradeoffs to Consider</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {product.cons.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">✕</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {product.features.map((feat, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing tiers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Pricing Plans</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {product.pricingTiers.map((tier, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs ${
                    tier.popular
                      ? 'border-blue-500 bg-blue-50/30 ring-1 ring-blue-500/20'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{tier.name}</span>
                    {tier.popular && (
                      <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-lg font-extrabold text-slate-900">{tier.price}</span>
                    <span className="text-[11px] text-slate-500">{tier.period}</span>
                  </div>
                  <ul className="mt-2.5 space-y-1 text-slate-600 text-[11px]">
                    {tier.features.map((f, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1">
                        <span className="text-blue-600">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Official partner link. Tested by Zentro Tech Reviews.
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl cursor-pointer"
            >
              Close
            </button>
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow cursor-pointer transition-colors"
            >
              <span>Visit {product.name}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
