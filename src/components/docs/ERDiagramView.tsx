import React, { useState } from 'react';
import {
  Database,
  Key,
  Link,
  Code,
  FileJson,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
} from 'lucide-react';
import { DOC_ER_ENTITIES, DOC_ER_RELATIONSHIPS } from '../../data/mockData';
import { EREntity } from '../../types';

export const ERDiagramView: React.FC = () => {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('booking');
  const [activeTab, setActiveTab] = useState<'attributes' | 'sampleDoc' | 'relationships'>('attributes');

  const selectedEntity = DOC_ER_ENTITIES.find(e => e.id === selectedEntityId) || DOC_ER_ENTITIES[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-amber-500" />
            <span>Interactive Entity-Relationship (ER) Diagram</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            MongoDB collections, Mongoose schema attributes, relational references, and TTL indexes
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl self-start sm:self-auto font-mono">
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            [PK] Primary Key
          </span>
          <span className="flex items-center gap-1 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            [FK] Foreign Key Ref
          </span>
          <span className="flex items-center gap-1 text-purple-400">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            1:N Relationship
          </span>
        </div>
      </div>

      {/* Visual Canvas of Entity Cards */}
      <div className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
          <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
            System Database Collections (Click to inspect schema)
          </span>
          <span className="text-xs text-amber-400 font-mono">
            8 Collections • Normalized References + Embedded Performance
          </span>
        </div>

        {/* Entity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {DOC_ER_ENTITIES.map((entity) => {
            const isSelected = selectedEntityId === entity.id;

            return (
              <button
                key={entity.id}
                onClick={() => setSelectedEntityId(entity.id)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40 shadow-xl'
                    : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-amber-400" />
                    {entity.name}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                    {entity.collection}
                  </span>
                </div>

                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {entity.description}
                </p>

                <div className="mt-3 pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>{entity.attributes.length} Fields</span>
                  <span className="text-amber-400/90 flex items-center">
                    Inspect <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Visual Cardinality Pipeline Flowchart */}
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
            Relational Dataflow Map &amp; Cardinalities
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
            {DOC_ER_RELATIONSHIPS.map((rel, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-neutral-300">
                  <span className="font-bold text-amber-400">{rel.from}</span>
                  <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-400 font-bold text-[10px]">
                    {rel.type}
                  </span>
                  <span className="font-bold text-cyan-400">{rel.to}</span>
                </div>
                <p className="text-[10px] text-neutral-400 mt-1 font-sans line-clamp-2">
                  {rel.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Entity Deep-Dive Inspector */}
      <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                {selectedEntity.name} Schema Inspector
              </h3>
              <span className="text-xs font-mono text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                Collection: {selectedEntity.collection}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">{selectedEntity.description}</p>
          </div>

          {/* Sub-tabs */}
          <div className="flex items-center p-1 bg-neutral-950 rounded-xl border border-neutral-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('attributes')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'attributes'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Schema Fields ({selectedEntity.attributes.length})
            </button>
            <button
              onClick={() => setActiveTab('sampleDoc')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'sampleDoc'
                  ? 'bg-amber-500 text-neutral-950'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sample MongoDB JSON
            </button>
          </div>
        </div>

        {/* Tab 1: Attributes Table */}
        {activeTab === 'attributes' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-mono text-neutral-400 uppercase">
                  <th className="py-2.5 font-bold">Field Key</th>
                  <th className="py-2.5 font-bold">BSON / Mongoose Type</th>
                  <th className="py-2.5 font-bold">Key Constraint</th>
                  <th className="py-2.5 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono">
                {selectedEntity.attributes.map((attr) => (
                  <tr key={attr.name} className="hover:bg-neutral-950/40">
                    <td className="py-2.5 font-bold text-white flex items-center gap-1.5">
                      {attr.name}
                    </td>
                    <td className="py-2.5 text-neutral-300">
                      <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-[11px] text-amber-300">
                        {attr.type}
                      </span>
                    </td>
                    <td className="py-2.5">
                      {attr.isPrimary && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold">
                          PK (Primary Key)
                        </span>
                      )}
                      {attr.isForeign && (
                        <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold">
                          FK → {attr.references}
                        </span>
                      )}
                      {!attr.isPrimary && !attr.isForeign && (
                        <span className="text-neutral-500 text-[10px]">Standard</span>
                      )}
                    </td>
                    <td className="py-2.5 font-sans text-neutral-300 text-[11px]">
                      {attr.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Sample JSON Document */}
        {activeTab === 'sampleDoc' && (
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
            <pre className="text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              {JSON.stringify(selectedEntity.sampleDoc, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
