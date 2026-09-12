import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <section id="newsletter" className="py-12 border-b border-neutral-800 bg-gradient-to-b from-neutral-950 to-neutral-900/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-10 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-100">
            Never Miss a Verified Software Deal
          </h2>
          <p className="mt-2 text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Join 14,000+ engineers, designers, and solo founders receiving our weekly roundup of tested digital tools, private beta invites, and verified 20-40% discount coupons.
          </p>

          {subscribed ? (
            <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>You're in! Check your inbox for our 2026 Solo Stack Cheat Sheet.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email address..."
                className="flex-1 bg-neutral-950 border border-neutral-700/80 rounded-xl px-4 py-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500/80"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-md"
              >
                <span>Subscribe Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-neutral-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Zero spam. Unsubscribe in 1-click anytime.
            </span>
            <span>•</span>
            <span>Sent every Thursday morning</span>
          </div>
        </div>
      </div>
    </section>
  );
};
