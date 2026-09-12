import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export const DisclosureBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div id="affiliate-disclosure-banner" className="bg-neutral-900 border-b border-neutral-800 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            FTC Compliance & Editorial Independence
          </span>
          <p className="hidden sm:inline text-neutral-300">
            100% independent reviews. We never accept payment for positive ratings.
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            id="toggle-disclosure-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-neutral-400 hover:text-neutral-200 transition-colors inline-flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>{isExpanded ? 'Hide policy' : 'Affiliate Disclosure'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div id="disclosure-details-panel" className="bg-neutral-900/90 border-t border-neutral-800/80 px-4 sm:px-6 lg:px-8 py-3 text-neutral-300 transition-all duration-200">
          <div className="max-w-7xl mx-auto space-y-1.5 leading-relaxed">
            <p>
              <strong className="text-neutral-100">How we stay free & independent:</strong> StackVetted is an independently operated software publication. When you click through our vetted partner links to make a purchase or sign up for a plan, we may earn an affiliate commission at <span className="text-emerald-400 font-medium">zero additional cost to you</span>. In fact, our partners regularly provide exclusive coupon codes (e.g. 20-30% off) available exclusively to our readers.
            </p>
            <p className="text-neutral-400">
              Our review scores are strictly determined by our hands-on technical benchmarks, developer ergonomics, and pricing fairness. We decline sponsored placements that do not meet our performance criteria.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
