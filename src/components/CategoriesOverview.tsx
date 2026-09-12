import React from 'react';
import {
  Sparkles,
  Server,
  Shield,
  Mail,
  CheckCircle2,
  Box,
  Code2,
  Video,
  ArrowRight,
} from 'lucide-react';
import { CategoryId } from '../types';

interface CategoriesOverviewProps {
  onSelectCategory: (category: CategoryId) => void;
  selectedCategory: CategoryId;
}

export const CategoriesOverview: React.FC<CategoriesOverviewProps> = ({
  onSelectCategory,
  selectedCategory,
}) => {
  const categoryCards = [
    {
      id: 'ai-tools' as CategoryId,
      name: 'AI Tools & Models',
      count: '3,800+ tools',
      icon: Sparkles,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
      description: 'Generative AI, conversational assistants, automated workflows, and fine-tuning suites.',
    },
    {
      id: 'web-hosting' as CategoryId,
      name: 'Web Hosting & Cloud',
      count: '420+ providers',
      icon: Server,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
      description: 'LiteSpeed shared hosts, managed VPS, cloud Docker runtimes, and WordPress platforms.',
    },
    {
      id: 'vpns' as CategoryId,
      name: 'VPNs & Privacy',
      count: '210+ networks',
      icon: Shield,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      description: 'Audited zero-logs VPNs, WireGuard tunnels, dedicated IPs, and ad-blocking DNS.',
    },
    {
      id: 'secure-email' as CategoryId,
      name: 'Secure Email Providers',
      count: '95+ services',
      icon: Mail,
      iconColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      description: 'End-to-end encrypted mailboxes, custom domains, anonymous signups, and Swiss hosting.',
    },
    {
      id: 'productivity' as CategoryId,
      name: 'Productivity Software',
      count: '890+ apps',
      icon: CheckCircle2,
      iconColor: 'text-pink-600 bg-pink-50 border-pink-200',
      description: 'Task managers, unified wikis, AI calendars, document workspaces, and mind maps.',
    },
    {
      id: '3d-models' as CategoryId,
      name: '3D & Generative Media',
      count: '340+ tools',
      icon: Box,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      description: 'Text-to-3D mesh generators, auto-retopology engines, and game asset pipelines.',
    },
  ];

  return (
    <section id="categories" className="py-14 border-t border-slate-200/80 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full">
              Explore by Tech Vertical
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Browse Trusted Digital Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Every category is vetted for privacy compliance, server uptime, and transparent pricing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categoryCards.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-md ring-1 ring-blue-400/30'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-xs hover:shadow-md hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cat.iconColor}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                      {cat.count}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
