import React from 'react';
import { X, Plus, Minus, Sparkles, Popcorn, ChevronRight, ArrowLeft } from 'lucide-react';
import { ConcessionItem, SelectedConcession } from '../../types';

interface ConcessionsModalProps {
  concessionItems: ConcessionItem[];
  selectedConcessions: Record<string, number>;
  onUpdateQuantity: (item: ConcessionItem, delta: number) => void;
  onProceedToCheckout: () => void;
  onBackToSeats: () => void;
  onSkip: () => void;
}

export const ConcessionsModal: React.FC<ConcessionsModalProps> = ({
  concessionItems,
  selectedConcessions,
  onUpdateQuantity,
  onProceedToCheckout,
  onBackToSeats,
  onSkip,
}) => {
  const categories = ['All', 'Combos', 'Popcorn', 'Gourmet Snacks', 'Beverages'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredItems = concessionItems.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  const totalSnacksCount = Object.values(selectedConcessions).reduce((sum, q) => sum + q, 0);
  const snacksSubtotal = concessionItems.reduce((sum, item) => {
    const qty = selectedConcessions[item.id] || 0;
    return sum + item.price * qty;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-4 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSeats}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white flex items-center gap-2">
                  <Popcorn className="w-5 h-5 text-amber-400" />
                  Cinema Concessions &amp; Combos
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Optional Add-on
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Pre-order warm snacks &amp; bypass the lobby concession queues
              </p>
            </div>
          </div>

          <button
            onClick={onSkip}
            className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700"
          >
            Skip to Checkout
          </button>
        </div>

        {/* Categories Bar */}
        <div className="px-6 py-3 bg-neutral-900/60 border-b border-neutral-800 flex items-center gap-2 overflow-x-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-colors ${
                activeCategory === cat
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const quantity = selectedConcessions[item.id] || 0;

            return (
              <div
                key={item.id}
                className="bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-4 flex gap-4 transition-all"
              >
                {/* Item Thumbnail */}
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-neutral-950 shrink-0 border border-neutral-800">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {item.popular && (
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-amber-500 text-neutral-950 text-[9px] font-black uppercase">
                      Popular
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-bold text-white line-clamp-1">{item.name}</h4>
                      <span className="text-sm font-mono font-bold text-amber-400">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                    {item.calories && (
                      <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                        {item.calories}
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2 bg-neutral-950 border border-neutral-800 rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQuantity(item, -1)}
                          className="w-6 h-6 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-white">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item, 1)}
                          className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center justify-center transition-colors font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onUpdateQuantity(item, 1)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1 transition-colors border border-neutral-700"
                      >
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-xs text-neutral-400">
              {totalSnacksCount === 0
                ? 'No concessions added yet'
                : `${totalSnacksCount} item${totalSnacksCount > 1 ? 's' : ''} in cart`}
            </div>
            <div className="text-lg font-black text-white">
              +${snacksSubtotal.toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onSkip}
              className="px-4 py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs font-medium"
            >
              Skip
            </button>
            <button
              onClick={onProceedToCheckout}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Review Order &amp; Pay</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
