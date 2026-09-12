import React, { useState, useMemo, useEffect } from 'react';
import { ZentroHeader } from './components/ZentroHeader';
import { AnnouncementBar } from './components/AnnouncementBar';
import { ZentroHero } from './components/ZentroHero';
import { ToolCard } from './components/ToolCard';
import { CategoriesOverview } from './components/CategoriesOverview';
import { ZentroTutorials } from './components/ZentroTutorials';
import { ZentroFooter } from './components/ZentroFooter';
import { ToolDetailsModal } from './components/ToolDetailsModal';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BookmarksModal } from './components/BookmarksModal';
import { SignUpModal } from './components/SignUpModal';
import { PRODUCTS, CATEGORIES } from './data/products';
import { CategoryId, FilterTag, Product } from './types';
import { SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeFilterTag, setActiveFilterTag] = useState<FilterTag>('all');
  const [activeSection, setActiveSection] = useState('directory');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');

  // Modals state
  const [selectedToolDetails, setSelectedToolDetails] = useState<Product | null>(null);
  const [activeProductPage, setActiveProductPage] = useState<Product | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Sync hash routing for direct URLs (e.g. #tool/meshy-ai)
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#tool/')) {
        const slug = hash.replace('#tool/', '').toLowerCase();
        const matched = PRODUCTS.find(
          (p) => p.slug.toLowerCase() === slug || p.id.toLowerCase() === slug
        );
        if (matched) {
          setActiveProductPage(matched);
        }
      } else if (!hash || hash === '#' || hash === '#directory') {
        setActiveProductPage(null);
      }
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  // Bookmarked products
  const [bookmarkedProducts, setBookmarkedProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('zentro_saved_tools');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default starter bookmark
    return [PRODUCTS[0]];
  });

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zentro_saved_tools', JSON.stringify(bookmarkedProducts));
    } catch {
      // ignore
    }
  }, [bookmarkedProducts]);

  // Handle dark mode class on document
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const handleToggleBookmark = (product: Product) => {
    setBookmarkedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveBookmark = (product: Product) => {
    setBookmarkedProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const handleClearBookmarks = () => {
    setBookmarkedProducts([]);
  };

  const handleOpenProductPage = (product: Product) => {
    setActiveProductPage(product);
    window.location.hash = `#tool/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDirectory = () => {
    setActiveProductPage(null);
    window.location.hash = '#directory';
    setTimeout(() => {
      const el = document.getElementById('directory-grid');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSelectTag = (tag: string) => {
    const cleanTag = tag.replace(/^#/, '');
    setSearchQuery(cleanTag);
    setActiveProductPage(null);
    window.location.hash = '#directory';
    setTimeout(() => {
      const el = document.getElementById('directory-grid');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const relatedProducts = useMemo(() => {
    if (!activeProductPage) return [];
    return PRODUCTS.filter(
      (p) =>
        p.id !== activeProductPage.id &&
        (p.category === activeProductPage.category || p.priceModel === activeProductPage.priceModel)
    ).slice(0, 3);
  }, [activeProductPage]);

  const handleTryEmergent = () => {
    const emergent = PRODUCTS.find((p) => p.id === 'emergent-ai');
    if (emergent) {
      handleOpenProductPage(emergent);
    } else {
      window.open('https://emergent.sh', '_blank');
    }
  };

  // Filtered tools list
  const filteredTools = useMemo(() => {
    return PRODUCTS.filter((tool) => {
      // 1. Category Filter
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }

      // 2. Filter Tag ("all" | "verified" | "free" | "freemium" | "paid" | "free-trial")
      if (activeFilterTag === 'verified' && !tool.isVerified) {
        return false;
      }
      if (activeFilterTag === 'free' && tool.priceModel !== 'free') {
        return false;
      }
      if (activeFilterTag === 'freemium' && tool.priceModel !== 'freemium') {
        return false;
      }
      if (activeFilterTag === 'paid' && tool.priceModel !== 'paid') {
        return false;
      }
      if (activeFilterTag === 'free-trial' && tool.priceModel !== 'free-trial') {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesTagline = tool.tagline.toLowerCase().includes(q);
        const matchesCat = tool.categoryName.toLowerCase().includes(q);
        const matchesFeatures = tool.features.some((f) => f.toLowerCase().includes(q));
        const matchesBestFor = tool.bestFor.toLowerCase().includes(q);

        if (!matchesName && !matchesTagline && !matchesCat && !matchesFeatures && !matchesBestFor) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, activeFilterTag, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setActiveFilterTag('all');
  };

  const hasActiveFilters =
    searchQuery !== '' || selectedCategory !== 'all' || activeFilterTag !== 'all';

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (activeProductPage) {
      setActiveProductPage(null);
      window.location.hash = sectionId === 'directory' ? '#directory' : '';
    }
    if (sectionId === 'directory') {
      const el = document.getElementById('directory-grid');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'categories') {
      const el = document.getElementById('categories');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'tutorials') {
      const el = document.getElementById('tutorials');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'submit') {
      setIsSignUpOpen(true);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans notebook-pattern text-slate-800 transition-colors ${
        isDarkMode ? 'dark bg-slate-950 text-slate-100' : ''
      }`}
    >
      {/* 1. Header / Navigation Bar */}
      <ZentroHeader
        bookmarkCount={bookmarkedProducts.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSignUp={() => setIsSignUpOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />

      {/* 2. Main Body: Either Dedicated Product Detail Page OR Homepage Directory */}
      {activeProductPage ? (
        <ProductDetailPage
          product={activeProductPage}
          onBack={handleBackToDirectory}
          isBookmarked={bookmarkedProducts.some((b) => b.id === activeProductPage.id)}
          onToggleBookmark={handleToggleBookmark}
          onSelectProduct={handleOpenProductPage}
          onSelectTag={handleSelectTag}
          relatedProducts={relatedProducts}
        />
      ) : (
        <>
          {/* Announcement Bar */}
          <AnnouncementBar onTryEmergent={handleTryEmergent} />

          {/* Hero Section (Title, Headset Icon, Search & Filter Bar, Stats) */}
          <ZentroHero
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            activeFilterTag={activeFilterTag}
            onSelectFilterTag={setActiveFilterTag}
            totalToolsCount={5985}
          />

          {/* Content Grid (Tool Cards) */}
          <main id="directory-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full flex-1">
            {/* Section Header with live status and clear filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
                  <span>Featured Tools & Digital Services</span>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {filteredTools.length} results
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Showing high-ranking software evaluated on real workloads, developer ergonomics, and customer value.
                </p>
              </div>

              {hasActiveFilters && (
                <button
                  id="reset-filters-btn"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 px-3 py-1.5 rounded-xl border border-blue-200 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset all filters</span>
                </button>
              )}
            </div>

            {/* 4-column Desktop Grid */}
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    product={tool}
                    onOpenDetails={handleOpenProductPage}
                    isBookmarked={bookmarkedProducts.some((b) => b.id === tool.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No matching tools found</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  We couldn't find any tools matching your query "{searchQuery}" with the current filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>

          {/* Categories Overview */}
          <CategoriesOverview
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              const el = document.getElementById('directory-grid');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* AI Tutorials & Engineering Guides */}
          <ZentroTutorials />
        </>
      )}

      {/* Footer */}
      <ZentroFooter
        onSelectCategory={(cat) => {
          if (activeProductPage) {
            setActiveProductPage(null);
            window.location.hash = '#directory';
          }
          setSelectedCategory(cat);
          const el = document.getElementById('directory-grid');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigate={handleNavigate}
      />

      {/* Modals */}
      {selectedToolDetails && (
        <ToolDetailsModal
          product={selectedToolDetails}
          onClose={() => setSelectedToolDetails(null)}
        />
      )}

      <BookmarksModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedProducts={bookmarkedProducts}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearBookmarks}
        onOpenDetails={(p) => {
          setIsBookmarksOpen(false);
          handleOpenProductPage(p);
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />
    </div>
  );
}
