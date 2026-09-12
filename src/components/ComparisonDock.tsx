import React from 'react';
import { Layers, X, ArrowRight, CheckSquare } from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface ComparisonDockProps {
  comparedProducts: Product[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onOpenModal: () => void;
}

export const ComparisonDock: React.FC<ComparisonDockProps> = ({
  comparedProducts,
  onRemove,
  onClear,
  onOpenModal,
}) => {
  if (comparedProducts.length === 0) return null;

  return (
    <div
      id="comparison-floating-dock"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-2xl bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 rounded-2xl shadow-2xl p-3 sm:px-4 sm:py-3 flex items-center justify-between gap-3 text-neutral-200"
    >
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-neutral-300 mr-2 shrink-0">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Compare:</span>
        </div>

        {comparedProducts.map((p) => (
          <div
            key={p.id}
            id={`dock-item-${p.id}`}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-800/90 border border-neutral-700 text-xs shrink-0"
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center border ${p.iconBg}`}>
              <ProductIcon name={p.iconName} className="w-3 h-3" />
            </div>
            <span className="font-semibold text-neutral-200 truncate max-w-[90px]">{p.name}</span>
            <button
              id={`dock-remove-${p.id}`}
              onClick={() => onRemove(p.id)}
              className="text-neutral-400 hover:text-neutral-100 p-0.5 rounded cursor-pointer"
              title="Remove"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        {comparedProducts.length < 3 && (
          <span className="text-[11px] text-neutral-500 hidden md:inline shrink-0">
            (Add up to {3 - comparedProducts.length} more)
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          id="dock-clear-btn"
          onClick={onClear}
          className="text-xs text-neutral-400 hover:text-neutral-200 px-2 py-1 cursor-pointer"
        >
          Clear
        </button>

        <button
          id="dock-compare-btn"
          onClick={onOpenModal}
          className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-neutral-950 font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-indigo-500/20"
        >
          <span>Compare ({comparedProducts.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
