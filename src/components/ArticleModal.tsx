import React from 'react';
import { X, Clock, Calendar, ArrowRight, ExternalLink, ShieldCheck, Tag } from 'lucide-react';
import { Article, Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  products: Product[];
  onOpenProductReview: (product: Product) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  products,
  onOpenProductReview,
}) => {
  if (!article) return null;

  return (
    <div
      id="article-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="article-modal-content"
        className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-neutral-950 p-5 sm:p-7 border-b border-neutral-800 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {article.category}
              </span>
              <span className="text-xs text-neutral-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-100 leading-snug">
              {article.title}
            </h2>
            <div className="flex items-center gap-2 mt-3 text-xs text-neutral-400">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-neutral-300">{article.author.name}</span>
              <span>•</span>
              <span>{article.author.role}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-neutral-500" />
                {article.publishedDate}
              </span>
            </div>
          </div>
          <button
            id="close-article-modal-btn"
            onClick={onClose}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-neutral-300 leading-relaxed italic">
            "{article.summary}"
          </div>

          {/* Article Sections */}
          <div className="space-y-6 text-sm text-neutral-300 leading-relaxed">
            {article.sections.map((sec, idx) => {
              const matchedProduct = sec.highlightBox?.productId
                ? products.find((p) => p.id === sec.highlightBox?.productId)
                : null;

              return (
                <div key={idx} className="space-y-3">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-100 tracking-tight">
                    {sec.heading}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm">{sec.body}</p>

                  {/* Vetted Affiliate Callout Box inside tutorial */}
                  {sec.highlightBox && (
                    <div className="my-4 p-4 rounded-xl bg-neutral-950 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {sec.highlightBox.title}
                        </div>
                        <p className="text-xs text-neutral-300">{sec.highlightBox.text}</p>
                      </div>

                      {matchedProduct && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            id={`article-review-btn-${matchedProduct.id}`}
                            onClick={() => {
                              onClose();
                              onOpenProductReview(matchedProduct);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium cursor-pointer"
                          >
                            Review
                          </button>
                          <a
                            id={`article-claim-btn-${matchedProduct.id}`}
                            href={matchedProduct.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <span>Claim Perk</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Takeaway */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Final Recommendation & Verdict
            </h4>
            <p className="text-sm font-semibold text-neutral-200">
              {article.verdict}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-950 p-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <span>Published by StackVetted Independent Testing Lab</span>
          <button
            id="article-bottom-close-btn"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold cursor-pointer"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
