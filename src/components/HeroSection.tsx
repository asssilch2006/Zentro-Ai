import React from 'react';
import { Search, Sparkles, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryId } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onOpenMatcher: () => void;
  onScrollToDeals: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onOpenMatcher,
  onScrollToDeals,
}) => {
  return (
    <section id="hero" className="relative pt-12 pb-10 border-b border-neutral-800 bg-gradient-to-b from-neutral-900/40 to-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Trust Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-neutral-200">September 2026 Tested Database</span>
          <span className="text-neutral-500">•</span>
          <span className="text-emerald-400 font-medium">18 Verified Partner Perks Active</span>
        </div>

        {/* Display Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-100 max-w-4xl mx-auto leading-tight sm:leading-none">
          Tested Digital Products. Real Benchmarks.{' '}
          <span className="text-emerald-400">Verified Exclusive Deals.</span>
        </h1>

        {/* Value Proposition */}
        <p className="mt-4 text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Skip the marketing noise. We benchmark the top AI models, developer SaaS, hosting providers, and creative suites with hands-on testing and negotiate direct discount codes for our readers.
        </p>

        {/* Hero Interactive Search & Filter Bar */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-neutral-900 border border-neutral-700/80 rounded-xl p-1.5 shadow-xl shadow-black/40 focus-within:border-emerald-500/80 focus-within:ring-1 focus-within:ring-emerald-500/40 transition-all">
            <Search className="w-5 h-5 text-neutral-400 ml-3 shrink-0" />
            <input
              id="hero-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, category, or feature (e.g. Cursor, Postgres, Framer)..."
              className="w-full bg-transparent px-3 py-2 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                id="clear-hero-search"
                onClick={() => onSearchChange('')}
                className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1 rounded bg-neutral-800 mr-2 cursor-pointer"
              >
                Clear
              </button>
            )}
            <button
              id="hero-matcher-trigger-btn"
              onClick={onOpenMatcher}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold shrink-0 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Matcher</span>
            </button>
          </div>

          {/* Category Pills Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`hero-category-btn-${cat.id}`}
                  onClick={() => onSelectCategory(cat.id as CategoryId)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-100 text-neutral-950 shadow-md font-semibold'
                      : 'bg-neutral-900/90 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Social Proof & Trust Pillars */}
        <div className="mt-10 pt-6 border-t border-neutral-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-2.5 p-2 rounded-lg">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-neutral-200">100% Unbiased</p>
              <p className="text-[11px] text-neutral-400">No sponsored review scores</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-neutral-200">Verified Coupons</p>
              <p className="text-[11px] text-neutral-400">Tested weekly for validity</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-neutral-200">Deep Benchmarks</p>
              <p className="text-[11px] text-neutral-400">Tested in real production code</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-lg">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <button
                id="hero-deal-link-btn"
                onClick={onScrollToDeals}
                className="text-xs font-bold text-neutral-200 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer text-left"
              >
                <span>Browse Deals</span>
                <ArrowRight className="w-3 h-3 text-emerald-400" />
              </button>
              <p className="text-[11px] text-neutral-400">Save up to 40% on SaaS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
