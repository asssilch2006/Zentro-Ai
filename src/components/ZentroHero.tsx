import React, { useState } from 'react';
import {
  Search,
  Star,
  Headphones,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { CategoryId, FilterTag } from '../types';
import { CATEGORIES } from '../data/products';

interface ZentroHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  activeFilterTag: FilterTag;
  onSelectFilterTag: (tag: FilterTag) => void;
  totalToolsCount?: number;
}

export const ZentroHero: React.FC<ZentroHeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  activeFilterTag,
  onSelectFilterTag,
  totalToolsCount = 5985,
}) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const selectedCategoryName =
    CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'All categories';

  return (
    <section
      id="hero"
      className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 text-center overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 1. Badge: small pill-shaped badge at the top reads "5,985+ AI TOOLS ANALYZED AND LISTED" in purple text */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200/90 text-purple-700 text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>5,985+ AI TOOLS ANALYZED AND LISTED</span>
        </div>

        {/* 2. Title: Main heading "AI Tools Directory" is large and bold, accompanied by a stylized icon of a head wearing a headset/telescope */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0f172a]">
            AI Tools Directory
          </h1>
          {/* Stylized head wearing a headset / smart telescope visual icon */}
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 transform hover:scale-105 transition-transform"
            title="AI Curated Directory"
            aria-hidden="true"
          >
            <div className="relative">
              <Headphones className="w-7 h-7 sm:w-8 sm:h-8" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#fbbf24] rounded-full ring-2 ring-white"></div>
            </div>
          </div>
        </div>

        {/* 3. Subtitle: "Access the largest list of top-quality AI tools available on the web" with a small star icon */}
        <p className="flex items-center justify-center gap-1.5 text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto mb-8">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
          <span>Access the largest list of top-quality AI tools available on the web</span>
        </p>

        {/* 4. Search & Filter Bar: A large, rounded white container holds the search functionality */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xl shadow-slate-300/40 border border-slate-200/90 text-left transition-all max-w-4xl mx-auto">
          {/* Top Row: Search Input + Category Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 pb-3 border-b border-slate-100">
            {/* Search input field */}
            <div className="relative flex-1 flex items-center bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 px-3.5 py-2.5 transition-colors focus-within:bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search over 5000+ AI..."
                className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-md cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dropdown menu for "All categories" */}
            <div className="relative sm:w-56 shrink-0">
              <button
                id="hero-category-dropdown-btn"
                type="button"
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full h-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
              >
                <span className="truncate">{selectedCategoryName}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 ml-2 transition-transform ${
                    isCategoryDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryDropdownOpen && (
                <div
                  id="hero-categories-dropdown-menu"
                  className="absolute right-0 mt-1.5 w-64 bg-white border border-slate-200 rounded-xl shadow-2xl py-1 text-xs text-slate-700 z-30 max-h-72 overflow-y-auto"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/70 border-b border-slate-100">
                    Filter by Category
                  </div>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        onSelectCategory(cat.id);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-blue-50 flex items-center justify-between cursor-pointer transition-colors ${
                        selectedCategory === cat.id
                          ? 'font-bold text-blue-700 bg-blue-50/70'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row: Color-coded Filter Tags */}
          <div className="pt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                Quick Filters:
              </span>

              {/* All tag */}
              <button
                id="filter-tag-all"
                onClick={() => onSelectFilterTag('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  activeFilterTag === 'all'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                All
              </button>

              {/* Verified (blue) */}
              <button
                id="filter-tag-verified"
                onClick={() => onSelectFilterTag('verified')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer border ${
                  activeFilterTag === 'verified'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified</span>
              </button>

              {/* Free AI (green) */}
              <button
                id="filter-tag-free"
                onClick={() => onSelectFilterTag('free')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  activeFilterTag === 'free'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                Free AI
              </button>

              {/* Freemium (orange) */}
              <button
                id="filter-tag-freemium"
                onClick={() => onSelectFilterTag('freemium')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  activeFilterTag === 'freemium'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                }`}
              >
                Freemium
              </button>

              {/* Paid (red) */}
              <button
                id="filter-tag-paid"
                onClick={() => onSelectFilterTag('paid')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  activeFilterTag === 'paid'
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                }`}
              >
                Paid
              </button>

              {/* Free Trial (purple) */}
              <button
                id="filter-tag-free-trial"
                onClick={() => onSelectFilterTag('free-trial')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                  activeFilterTag === 'free-trial'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
                }`}
              >
                Free Trial
              </button>
            </div>

            {/* Clear filters if active */}
            {(activeFilterTag !== 'all' || selectedCategory !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  onSelectFilterTag('all');
                  onSelectCategory('all');
                  onSearchChange('');
                }}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-2 cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* 5. Stats: Below the search bar, small text reads "72 categories · Updated daily · 100% manually verified" */}
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-4 tracking-normal">
          72 categories · Updated daily · 100% manually verified
        </p>
      </div>
    </section>
  );
};
