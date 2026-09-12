import React from 'react';
import { X, Bookmark, ExternalLink, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductIcon } from './ProductIcon';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedProducts: Product[];
  onRemoveBookmark: (product: Product) => void;
  onClearAll: () => void;
  onOpenDetails: (product: Product) => void;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarkedProducts,
  onRemoveBookmark,
  onClearAll,
  onOpenDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="bookmarks-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="bookmarks-modal-content"
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Bookmark className="w-4 h-4 fill-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Saved Tools</h3>
              <p className="text-xs text-slate-500">
                {bookmarkedProducts.length} {bookmarkedProducts.length === 1 ? 'service' : 'services'} in your personal stack
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bookmarkedProducts.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 rounded hover:bg-rose-50 cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto divide-y divide-slate-100">
          {bookmarkedProducts.length > 0 ? (
            bookmarkedProducts.map((prod) => (
              <div
                key={prod.id}
                className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${prod.iconBg}`}
                  >
                    <ProductIcon name={prod.iconName} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-slate-900 truncate">{prod.name}</h4>
                    <p className="text-xs text-slate-500 truncate">{prod.tagline}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onOpenDetails(prod);
                      onClose();
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 px-2 py-1 rounded bg-blue-50 cursor-pointer"
                  >
                    Review
                  </button>

                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => onRemoveBookmark(prod)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">No tools saved yet</p>
              <p className="text-xs mt-1">Click the bookmark icon on any card to save it for quick reference.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          Bookmarks are stored locally in your browser session.
        </div>
      </div>
    </div>
  );
};
