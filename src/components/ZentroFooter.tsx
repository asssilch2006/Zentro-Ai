import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CategoryId } from '../types';

interface ZentroFooterProps {
  onSelectCategory: (category: CategoryId) => void;
  onNavigate: (section: string) => void;
}

export const ZentroFooter: React.FC<ZentroFooterProps> = ({
  onSelectCategory,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Callout */}
        <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 mb-12 border border-slate-700/80 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Stay ahead with weekly AI & Tech tool discoveries
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Join 25,000+ professionals receiving our hand-tested reviews, verified deals, and tech stack benchmarks every Tuesday.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/40 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thanks for subscribing! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 min-w-[240px]"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl tracking-tight text-white">Zentro</span>
              <span className="bg-[#fbbf24] text-slate-900 font-black text-xs px-1.5 py-0.5 rounded shadow-sm">
                AI
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              The premier tech review and recommendation directory helping users discover, evaluate, and compare trusted digital services.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Manually Verified & Audited</span>
            </div>
          </div>

          {/* Digital Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Services & Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('ai-tools')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Tools Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('web-hosting')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Web Hosting & Cloud
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('vpns')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  VPNs & Privacy Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('secure-email')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Secure Email Providers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('productivity')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Productivity Software
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Tools List
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explore Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tutorials')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Tutorials & Guides
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('submit')}
                  className="hover:text-white transition-colors cursor-pointer text-blue-400"
                >
                  Submit a Service
                </button>
              </li>
            </ul>
          </div>

          {/* Editorial Ethics */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">
              Our Methodology
            </h4>
            <ul className="space-y-1.5 text-slate-400 text-xs">
              <li>• Real benchmark testing in isolated testbeds</li>
              <li>• Security audits of VPNs & encrypted email</li>
              <li>• Daily tracking of tool updates & pricing shifts</li>
              <li>• Zero paid placements for unvetted software</li>
            </ul>
          </div>
        </div>

        {/* FTC Affiliate Transparency Notice */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-400 font-semibold">Affiliate Disclosure: </strong>
            Zentro is an independent tech publication and comparison index. We test digital products objectively. Some links on this site are affiliate partner links, which means we may earn a referral commission if you make a purchase, at zero additional cost to you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 text-slate-500">
            <p>© 2026 Zentro Media. All rights reserved.</p>
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
