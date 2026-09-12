import React, { useState } from 'react';
import { Sparkles, Search, Layers, Compass, BookOpen, Menu, X, Tag, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  activeSection: string;
  compareCount: number;
  onOpenCompare: () => void;
  onOpenMatcher: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onNavigateSection,
  activeSection,
  compareCount,
  onOpenCompare,
  onOpenMatcher,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-neutral-100 flex items-center gap-1.5">
                  StackVetted
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Pro
                  </span>
                </span>
                <span className="block text-[11px] text-neutral-400 leading-none">
                  Curated Digital Tools & Verified Deals
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-directory-btn"
              onClick={() => handleNavClick('directory')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                activeSection === 'directory'
                  ? 'text-neutral-100 bg-neutral-800'
                  : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900'
              }`}
            >
              Directory
            </button>
            <button
              id="nav-deals-btn"
              onClick={() => handleNavClick('deals')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'deals'
                  ? 'text-neutral-100 bg-neutral-800'
                  : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5 text-amber-400" />
              Weekly Deals
            </button>
            <button
              id="nav-matcher-btn"
              onClick={onOpenMatcher}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Stack Matcher
            </button>
            <button
              id="nav-articles-btn"
              onClick={() => handleNavClick('articles')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeSection === 'articles'
                  ? 'text-neutral-100 bg-neutral-800'
                  : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Guides & Reviews
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="quick-search-trigger-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-sm transition-all cursor-pointer"
              title="Search tools & deals"
            >
              <Search className="w-4 h-4 text-neutral-400" />
              <span className="hidden sm:inline">Search 12+ tools...</span>
              <kbd className="hidden lg:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-400">
                ⌘K
              </kbd>
            </button>

            {compareCount > 0 && (
              <button
                id="header-compare-btn"
                onClick={onOpenCompare}
                className="relative px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Compare</span>
                <span className="w-4 h-4 rounded-full bg-indigo-500 text-neutral-950 font-bold flex items-center justify-center text-[10px]">
                  {compareCount}
                </span>
              </button>
            )}

            <button
              id="header-submit-deal-btn"
              onClick={() => handleNavClick('newsletter')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 text-neutral-950 hover:bg-emerald-400 font-semibold text-xs transition-colors cursor-pointer"
            >
              <span>Get Deal Alerts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-neutral-800 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 py-4 space-y-2">
          <button
            id="mobile-nav-directory"
            onClick={() => handleNavClick('directory')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-900 flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            Directory & Filter
          </button>
          <button
            id="mobile-nav-deals"
            onClick={() => handleNavClick('deals')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-900 flex items-center gap-2 cursor-pointer"
          >
            <Tag className="w-4 h-4 text-amber-400" />
            Verified Deals of the Week
          </button>
          <button
            id="mobile-nav-matcher"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenMatcher();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Interactive Stack Matcher
          </button>
          <button
            id="mobile-nav-articles"
            onClick={() => handleNavClick('articles')}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-900 flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            Guides & Benchmarks
          </button>
          <div className="pt-2 border-t border-neutral-800/80">
            <button
              id="mobile-nav-newsletter"
              onClick={() => handleNavClick('newsletter')}
              className="w-full py-2 rounded-md bg-emerald-500 text-neutral-950 font-semibold text-center text-sm cursor-pointer"
            >
              Subscribe to Weekly Deal Drops
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
