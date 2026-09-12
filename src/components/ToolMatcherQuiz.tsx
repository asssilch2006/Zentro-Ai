import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Tag,
  Zap,
} from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ToolMatcherQuizProps {
  products: Product[];
  onOpenReview: (product: Product) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const ToolMatcherQuiz: React.FC<ToolMatcherQuizProps> = ({
  products,
  onOpenReview,
  isOpen,
  onClose,
}) => {
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<string>('solopreneur');
  const [priority, setPriority] = useState<string>('speed');
  const [budget, setBudget] = useState<string>('low');

  if (!isOpen) return null;

  // Calculate recommendation based on selections
  const getRecommendedProducts = (): Product[] => {
    let ids: string[] = [];
    if (role === 'solopreneur') {
      if (priority === 'speed') {
        ids = ['cursor-ai', 'framer', 'supabase'];
      } else if (priority === 'budget') {
        ids = ['cursor-ai', 'hetzner-cloud', 'make-automation'];
      } else {
        ids = ['cursor-ai', 'railway', 'raycast-pro'];
      }
    } else if (role === 'developer') {
      if (priority === 'budget') {
        ids = ['hetzner-cloud', 'execute-program', 'refactoring-ui'];
      } else {
        ids = ['cursor-ai', 'railway', 'linear'];
      }
    } else if (role === 'creator') {
      ids = ['elevenlabs', 'framer', 'claude-pro'];
    } else {
      ids = ['cursor-ai', 'claude-pro', 'linear', 'railway'];
    }

    return products.filter((p) => ids.includes(p.id));
  };

  const recommended = getRecommendedProducts();

  const handleReset = () => {
    setStep(1);
    setRole('solopreneur');
    setPriority('speed');
    setBudget('low');
  };

  return (
    <div
      id="matcher-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="matcher-modal-content"
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-neutral-950 p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-100">Interactive Stack Matcher</h2>
              <p className="text-xs text-neutral-400">
                Answer 3 questions to generate your optimal curated toolset with partner discounts.
              </p>
            </div>
          </div>
          <button
            id="close-matcher-btn"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-100 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6">
          {step < 4 && (
            <div className="flex items-center justify-between mb-6 text-xs text-neutral-400 border-b border-neutral-800 pb-3">
              <span>Step {step} of 3</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-8 h-1 rounded-full ${
                      step >= s ? 'bg-emerald-400' : 'bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Role */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-100">
                1. What best describes your primary goal or workflow?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'solopreneur',
                    title: 'Solo Founder / Indie Hacker',
                    desc: 'Building and shipping software products single-handedly.',
                  },
                  {
                    id: 'developer',
                    title: 'Full-Stack Software Engineer',
                    desc: 'Seeking developer ergonomics, deep code fluency, and reliability.',
                  },
                  {
                    id: 'creator',
                    title: 'Content Creator / Marketer',
                    desc: 'High-speed audio, landing page creation, and AI copy.',
                  },
                  {
                    id: 'agency',
                    title: 'Startup / Agency Team',
                    desc: 'Multi-member collaboration, task velocity, and microservices.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    id={`matcher-role-${opt.id}`}
                    onClick={() => {
                      setRole(opt.id);
                      setStep(2);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      role === opt.id
                        ? 'bg-neutral-950 border-emerald-500/80 shadow-md'
                        : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span className="font-bold text-neutral-100 text-sm block">{opt.title}</span>
                    <span className="text-xs text-neutral-400 mt-1 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Priority */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-100">
                2. What is your #1 operational priority right now?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'speed',
                    title: 'Maximum Velocity & Speed to Market',
                    desc: 'Launch in days, automate boilerplate, zero devops friction.',
                  },
                  {
                    id: 'budget',
                    title: 'Cost Efficiency & Lowest Burn Rate',
                    desc: 'Highest compute/RAM per dollar, no hyperscaler egress traps.',
                  },
                  {
                    id: 'craft',
                    title: 'Uncompromised Design & Code Quality',
                    desc: 'Polished micro-interactions, typed schemas, and keyboard shortcuts.',
                  },
                  {
                    id: 'ai',
                    title: 'Agentic AI Automation',
                    desc: 'Automate repetitive operations with cognitive LLM pipelines.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    id={`matcher-priority-${opt.id}`}
                    onClick={() => {
                      setPriority(opt.id);
                      setStep(3);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      priority === opt.id
                        ? 'bg-neutral-950 border-emerald-500/80 shadow-md'
                        : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span className="font-bold text-neutral-100 text-sm block">{opt.title}</span>
                    <span className="text-xs text-neutral-400 mt-1 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <button
                  id="matcher-back-to-step1"
                  onClick={() => setStep(1)}
                  className="text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
                >
                  ← Back to Step 1
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-neutral-100">
                3. What is your anticipated monthly software budget?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'bootstrap',
                    title: 'Bootstrapping ($0 - $25/mo)',
                    desc: 'Rely heavily on generous free tiers and credits.',
                  },
                  {
                    id: 'low',
                    title: 'Indie Growth ($30 - $80/mo)',
                    desc: 'Invest in high-leverage Pro plans to buy back hours.',
                  },
                  {
                    id: 'scale',
                    title: 'Scale & Teams ($100+/mo)',
                    desc: 'Premium compute, collaborative team workspaces, and SSO.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    id={`matcher-budget-${opt.id}`}
                    onClick={() => {
                      setBudget(opt.id);
                      setStep(4);
                    }}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                      budget === opt.id
                        ? 'bg-neutral-950 border-emerald-500/80 shadow-md'
                        : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <span className="font-bold text-neutral-100 text-sm block">{opt.title}</span>
                    <span className="text-xs text-neutral-400 mt-1 block">{opt.desc}</span>
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <button
                  id="matcher-back-to-step2"
                  onClick={() => setStep(2)}
                  className="text-xs text-neutral-400 hover:text-neutral-200 cursor-pointer"
                >
                  ← Back to Step 2
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-100">
                    Your Curated Stack Match is Ready!
                  </h4>
                  <p className="text-xs text-neutral-300 mt-0.5">
                    Based on your profile, this combination eliminates boilerplate, minimizes maintenance, and saves ~30% with community discount perks.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {recommended.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${product.iconBg} shrink-0`}>
                        <ProductIcon name={product.iconName} className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-100 text-sm">{product.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                            {product.categoryName}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5 line-clamp-1">{product.tagline}</p>
                        {product.dealDiscount && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold mt-1">
                            <Tag className="w-3 h-3" />
                            {product.dealDiscount}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        id={`matcher-review-btn-${product.id}`}
                        onClick={() => {
                          onClose();
                          onOpenReview(product);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold cursor-pointer"
                      >
                        Review
                      </button>
                      <a
                        id={`matcher-claim-link-${product.id}`}
                        href={product.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Visit & Claim</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                <button
                  id="matcher-retake-btn"
                  onClick={handleReset}
                  className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1.5 cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Quiz
                </button>
                <button
                  id="matcher-done-btn"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold text-xs cursor-pointer"
                >
                  Explore All Tools
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
