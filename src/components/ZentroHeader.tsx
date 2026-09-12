import React, { useState } from 'react';
import {
  Bookmark,
  Globe,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Shield,
  Server,
  Lock,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface ZentroHeaderProps {
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onOpenSignUp: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
}

export const ZentroHeader: React.FC<ZentroHeaderProps> = ({
  bookmarkCount,
  onOpenBookmarks,
  onOpenSignUp,
  onNavigate,
  activeSection,
  isDarkMode,
  onToggleTheme,
  selectedLanguage,
  onSelectLanguage,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', label: 'English (US)' },
    { code: 'ES', label: 'Español' },
    { code: 'FR', label: 'Français' },
    { code: 'DE', label: 'Deutsch' },
    { code: 'JA', label: '日本語' },
  ];

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Top Left: Logo */}
          <div className="flex items-center gap-3">
            <button
              id="zentro-logo-btn"
              onClick={() => handleNavClick('directory')}
              className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-[#0f172a] group-hover:text-blue-700 transition-colors">
                  Zentro
                </span>
                {/* Yellow square icon containing "AI" */}
                <span className="bg-[#fbbf24] text-[#0f172a] font-black text-[11px] px-1.5 py-0.5 rounded shadow-sm flex items-center justify-center leading-none">
                  AI
                </span>
              </div>
            </button>
          </div>

          {/* Centered Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-full-list-btn"
              onClick={() => handleNavClick('directory')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'directory'
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-slate-600 hover:text-[#0f172a] hover:bg-slate-50'
              }`}
            >
              Full List
            </button>

            <button
              id="nav-ai-categories-btn"
              onClick={() => handleNavClick('categories')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'categories'
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-slate-600 hover:text-[#0f172a] hover:bg-slate-50'
              }`}
            >
              AI Categories
            </button>

            <button
              id="nav-ai-tutorials-btn"
              onClick={() => handleNavClick('tutorials')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeSection === 'tutorials'
                  ? 'text-blue-700 bg-blue-50'
                  : 'text-slate-600 hover:text-[#0f172a] hover:bg-slate-50'
              }`}
            >
              AI Tutorials
            </button>

            {/* "+ More" Dropdown */}
            <div className="relative">
              <button
                id="nav-more-dropdown-btn"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  isMoreOpen
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-slate-600 hover:text-[#0f172a] hover:bg-slate-50'
                }`}
              >
                <span>+ More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <div
                  id="more-menu-dropdown"
                  className="absolute left-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 text-xs text-slate-700 z-50 animate-fadeIn"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Trusted Digital Services
                  </div>
                  <button
                    onClick={() => handleNavClick('web-hosting')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Server className="w-3.5 h-3.5 text-blue-600" />
                    <span>Web Hosting Reviews</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('vpns')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>VPNs & Privacy Tools</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('secure-email')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <Lock className="w-3.5 h-3.5 text-purple-600" />
                    <span>Secure Email Providers</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('productivity')}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600" />
                    <span>Productivity Software</span>
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => handleNavClick('submit')}
                    className="w-full text-left px-3 py-2 text-blue-700 font-semibold hover:bg-blue-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Submit a Tool / Service</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Far Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bookmarks Icon */}
            <button
              id="header-bookmarks-btn"
              onClick={onOpenBookmarks}
              className="relative p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Saved tools"
              aria-label="View bookmarked tools"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow-sm">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Language Selection (Globe) */}
            <div className="relative">
              <button
                id="header-language-btn"
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Select language"
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs font-semibold hidden sm:inline">{selectedLanguage}</span>
              </button>

              {isLangOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-1.5 w-36 bg-white border border-slate-200 rounded-xl shadow-xl py-1 text-xs text-slate-700 z-50 animate-fadeIn"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center justify-between cursor-pointer ${
                        selectedLanguage === lang.code ? 'font-bold text-blue-700 bg-blue-50/70' : ''
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle (Sun/Moon) */}
            <button
              id="header-theme-toggle-btn"
              onClick={onToggleTheme}
              className="p-2 text-slate-600 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>

            {/* Prominent Dark Blue "Sign up" button */}
            <button
              id="header-sign-up-btn"
              onClick={onOpenSignUp}
              className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-lg shadow-sm hover:shadow transition-all duration-150 cursor-pointer"
            >
              Sign up
            </button>

            {/* Mobile menu hamburger */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-header-menu" className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          <button
            onClick={() => handleNavClick('directory')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            Full List
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            AI Categories
          </button>
          <button
            onClick={() => handleNavClick('tutorials')}
            className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            AI Tutorials
          </button>
          <button
            onClick={() => handleNavClick('web-hosting')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            Web Hosting Reviews
          </button>
          <button
            onClick={() => handleNavClick('vpns')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            VPNs & Privacy Tools
          </button>
          <button
            onClick={() => handleNavClick('secure-email')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
          >
            Secure Email Providers
          </button>
        </div>
      )}
    </header>
  );
};
