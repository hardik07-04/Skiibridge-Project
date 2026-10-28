import React, { useState } from 'react';
import {
  Layers,
  Search,
  CheckCircle,
  Zap,
  Shield,
  Server,
  Code,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { DOC_FEATURES } from '../../data/mockData';

export const FeaturesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = DOC_FEATURES.map((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
      return null;
    }
    const matchingFeatures = cat.features.filter((f) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.technology.toLowerCase().includes(q) ||
        (f.endpoint && f.endpoint.toLowerCase().includes(q))
      );
    });

    if (matchingFeatures.length === 0) return null;

    return {
      ...cat,
      features: matchingFeatures,
    };
  }).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white bg-neutral-950'
            }`}
          >
            All Modules ({DOC_FEATURES.reduce((sum, c) => sum + c.features.length, 0)})
          </button>
          {DOC_FEATURES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white bg-neutral-950'
              }`}
            >
              {cat.title.split('. ')[1] || cat.title}
            </button>
          ))}
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search feature or API..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Feature Categories */}
      <div className="space-y-8">
        {filteredCategories.map((cat: any) => (
          <div key={cat.id} className="space-y-4">
            <div className="border-b border-neutral-800 pb-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {cat.title}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">{cat.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.features.map((feature: any) => (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-white">{feature.title}</h3>
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border shrink-0 ${
                          feature.status === 'Real-Time'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {feature.status}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-800/80 space-y-2">
                    {feature.endpoint && (
                      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 bg-neutral-950 px-2.5 py-1.5 rounded-lg border border-neutral-800">
                        <span
                          className={`font-bold px-1 rounded text-[10px] ${
                            feature.method === 'GET'
                              ? 'text-blue-400 bg-blue-500/10'
                              : feature.method === 'POST'
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : feature.method === 'WS'
                              ? 'text-purple-400 bg-purple-500/10'
                              : 'text-amber-400 bg-amber-500/10'
                          }`}
                        >
                          {feature.method}
                        </span>
                        <span className="truncate text-neutral-300">{feature.endpoint}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                      <Code className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{feature.technology}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
