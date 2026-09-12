import React from 'react';
import { Layers, ShieldCheck, Heart, ExternalLink } from 'lucide-react';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategory: (category: CategoryId) => void;
  onOpenMatcher: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenMatcher,
  onScrollToTop,
}) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-neutral-100 text-base">StackVetted</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Curated software discovery and hands-on benchmarks. Helping builders, engineers, and creators select the highest-ROI digital tools without marketing fluff.
            </p>
            <div className="pt-1 flex items-center gap-2 text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tested & updated weekly</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('ai');
                    onScrollToTop();
                  }}
                  className="hover:text-neutral-100 transition-colors cursor-pointer"
                >
                  AI & Automation Platforms
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('saas');
                    onScrollToTop();
                  }}
                  className="hover:text-neutral-100 transition-colors cursor-pointer"
                >
                  Developer SaaS & Workspaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('design');
                    onScrollToTop();
                  }}
                  className="hover:text-neutral-100 transition-colors cursor-pointer"
                >
                  Design & No-Code Builders
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('hosting');
                    onScrollToTop();
                  }}
                  className="hover:text-neutral-100 transition-colors cursor-pointer"
                >
                  Cloud & High-Speed Hosting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('courses');
                    onScrollToTop();
                  }}
                  className="hover:text-neutral-100 transition-colors cursor-pointer"
                >
                  Developer Courses & Books
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial & Testing Principles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Our Methodology
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>• Real code testing in production repos</li>
              <li>• Latency and cold-start benchmarking</li>
              <li>• Cost simulation at 1,000 to 50,000 DAU</li>
              <li>• Weekly verification of coupon validity</li>
              <li>• Strict rejection of paid rating manipulation</li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200 mb-3">
              Interactive Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenMatcher}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium cursor-pointer"
                >
                  ⚡ Interactive Stack Matcher
                </button>
              </li>
              <li>
                <a href="#deals" className="hover:text-neutral-100 transition-colors">
                  🔥 Weekly Verified Deal Drops
                </a>
              </li>
              <li>
                <a href="#articles" className="hover:text-neutral-100 transition-colors">
                  📚 Architectural Guides & Benchmarks
                </a>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-neutral-100 transition-colors">
                  📬 Deal Alerts Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* FTC Disclosure & Legal Notice */}
        <div className="pt-8 border-t border-neutral-800 text-[11px] text-neutral-500 space-y-2 leading-relaxed">
          <p>
            <strong className="text-neutral-400 font-semibold">FTC Affiliate Transparency Statement: </strong>
            StackVetted is an independent digital media platform. We test and review software products based on authentic engineering evaluation. Some of the links on this site are affiliate partner links. If you choose to purchase or subscribe through these links, we may receive a commission at no extra expense to you. In many cases, our partner agreements provide exclusive discounts or extended trials for our readers. We never accept compensation in exchange for positive product reviews.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 text-neutral-400">
            <p>© 2026 StackVetted. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Editorial Guidelines</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
