import React, { useState } from 'react';
import {
  Code,
  Layers,
  Database,
  Monitor,
  Cpu,
  Copy,
  Check,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { DOC_MVC_LAYERS } from '../../data/mockData';

export const MVCPatternView: React.FC = () => {
  const [selectedLayer, setSelectedLayer] = useState<'Model' | 'View' | 'Controller'>('Controller');
  const [copiedFileName, setCopiedFileName] = useState<string | null>(null);

  const activeLayer = DOC_MVC_LAYERS.find(l => l.title === selectedLayer) || DOC_MVC_LAYERS[0];

  const handleCopyCode = (name: string, snippet: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedFileName(name);
    setTimeout(() => setCopiedFileName(null), 2500);
  };

  const getLayerIcon = (title: string) => {
    switch (title) {
      case 'Model':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'View':
        return <Monitor className="w-5 h-5 text-blue-400" />;
      default:
        return <Cpu className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-amber-500" />
          <span>Model-View-Controller (MVC) Pattern Implementation</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Architectural separation of concerns between Mongoose Schemas (Model), React 19 Client (View), and Express.js Route Handlers (Controller)
        </p>
      </div>

      {/* 3 Pillar Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DOC_MVC_LAYERS.map((layer) => {
          const isSelected = selectedLayer === layer.title;

          return (
            <button
              key={layer.title}
              onClick={() => setSelectedLayer(layer.title)}
              className={`p-5 rounded-3xl text-left border transition-all ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/40 shadow-xl'
                  : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-2xl bg-neutral-950 border border-neutral-800">
                  {getLayerIcon(layer.title)}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  {layer.title === 'Model' ? 'Mongoose / BSON' : layer.title === 'View' ? 'React / Tailwind' : 'Express / Router'}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white">{layer.title}</h3>
              <p className="text-xs text-neutral-300 mt-1 leading-relaxed">{layer.description}</p>
            </button>
          );
        })}
      </div>

      {/* Layer Explanation Banner */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Role in the IMovies System
            </h4>
            <p className="text-xs sm:text-sm text-neutral-200 mt-1 leading-relaxed">
              {activeLayer.role}
            </p>
          </div>
        </div>
      </div>

      {/* Files and Code Snippets */}
      <div className="space-y-6">
        {activeLayer.files.map((file) => (
          <div
            key={file.name}
            className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-xl"
          >
            {/* File Header Bar */}
            <div className="p-4 px-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-white">{file.path}</span>
                <span className="text-[11px] text-neutral-400 hidden sm:inline">• {file.purpose}</span>
              </div>

              <button
                onClick={() => handleCopyCode(file.name, file.snippet)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-mono transition-colors"
              >
                {copiedFileName === file.name ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 sm:p-6 bg-neutral-950/60 overflow-x-auto">
              <pre className="font-mono text-xs text-neutral-300 leading-relaxed whitespace-pre">
                {file.snippet}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
