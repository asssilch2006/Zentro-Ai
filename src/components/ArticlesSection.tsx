import React from 'react';
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface ArticlesSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  return (
    <section id="articles" className="py-12 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold mb-2 border border-blue-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              Software Architecture & Buying Guides
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
              In-Depth Editorial Reviews & Tutorials
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Field-tested guides written by engineers. Real benchmarks, architectural tradeoffs, and verified cost analysis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              id={`article-card-${art.id}`}
              onClick={() => onSelectArticle(art)}
              className="bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-black/40 cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    {art.category}
                  </span>
                  <span className="text-xs text-neutral-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h3>

                <p className="mt-2.5 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={art.author.avatar}
                    alt={art.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-neutral-300 font-medium">{art.author.name}</span>
                </div>

                <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
