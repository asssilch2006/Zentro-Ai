import React from 'react';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CategoryId, PricingModel } from '../types';

interface ProductFilterBarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  pricingFilter: 'all' | PricingModel;
  onPricingFilterChange: (p: 'all' | PricingModel) => void;
  sortBy: 'rating' | 'popular' | 'price-low' | 'discount';
  onSortByChange: (s: 'rating' | 'popular' | 'price-low' | 'discount') => void;
  viewMode: 'grid' | 'table';
  onViewModeChange: (m: 'grid' | 'table') => void;
  totalCount: number;
  filteredCount: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const ProductFilterBar: React.FC<ProductFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  pricingFilter,
  onPricingFilterChange,
  sortBy,
  onSortByChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* Category Pills Slider */}
      <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2 shrink-0">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`filter-cat-${cat.id}`}
                onClick={() => onSelectCategory(cat.id as CategoryId)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-100 text-neutral-950 shadow'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850 border border-neutral-800'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* View toggle (Grid vs Table) */}
        <div className="hidden sm:flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg p-1 shrink-0">
          <button
            id="view-grid-toggle-btn"
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-neutral-800 text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            id="view-table-toggle-btn"
            onClick={() => onViewModeChange('table')}
            className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-neutral-800 text-neutral-100'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Table view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Secondary Controls: Pricing & Sort Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 pt-2 border-t border-neutral-800/80">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1 text-neutral-500 font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Pricing:
          </span>

          <button
            id="pricing-filter-all"
            onClick={() => onPricingFilterChange('all')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              pricingFilter === 'all'
                ? 'bg-neutral-800 text-neutral-200 font-bold'
                : 'hover:text-neutral-200'
            }`}
          >
            All Types
          </button>
          <button
            id="pricing-filter-freemium"
            onClick={() => onPricingFilterChange('freemium')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              pricingFilter === 'freemium'
                ? 'bg-neutral-800 text-neutral-200 font-bold'
                : 'hover:text-neutral-200'
            }`}
          >
            Freemium / Free Tier
          </button>
          <button
            id="pricing-filter-paid"
            onClick={() => onPricingFilterChange('paid')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              pricingFilter === 'paid'
                ? 'bg-neutral-800 text-neutral-200 font-bold'
                : 'hover:text-neutral-200'
            }`}
          >
            Paid / One-Time
          </button>

          {hasActiveFilters && (
            <button
              id="reset-filters-btn"
              onClick={onResetFilters}
              className="ml-2 inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-medium cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              Reset filters
            </button>
          )}
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-neutral-400">
            Showing <strong className="text-neutral-200">{filteredCount}</strong> of {totalCount} tools
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-neutral-500">Sort:</span>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as any)}
              className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-200 focus:outline-none focus:border-neutral-700 cursor-pointer"
            >
              <option value="rating">Top Rated (Editor Score)</option>
              <option value="popular">Most Popular</option>
              <option value="discount">Biggest Discount</option>
              <option value="price-low">Lowest Starting Price</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
