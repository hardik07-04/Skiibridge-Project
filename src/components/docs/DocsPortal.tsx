import React, { useState } from 'react';
import {
  FileText,
  Layers,
  Users,
  Database,
  Server,
  Compass,
  Code,
  Video,
  Download,
  Sparkles,
} from 'lucide-react';
import { FeaturesView } from './FeaturesView';
import { RolesView } from './RolesView';
import { ERDiagramView } from './ERDiagramView';
import { TechnicalArchitectureView } from './TechnicalArchitectureView';
import { UserFlowView } from './UserFlowView';
import { MVCPatternView } from './MVCPatternView';
import { DemoVideoTour } from './DemoVideoTour';
import { ExportDocsModal } from './ExportDocsModal';

interface DocsPortalProps {
  initialSubTab?: string;
  onLaunchLiveWalkthrough: () => void;
}

export const DocsPortal: React.FC<DocsPortalProps> = ({
  initialSubTab = 'features',
  onLaunchLiveWalkthrough,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);
  const [showExportModal, setShowExportModal] = useState(false);

  const tabs = [
    { id: 'features', label: 'Features', icon: Layers, count: '13' },
    { id: 'roles', label: 'Roles & Responsibilities', icon: Users, count: '4' },
    { id: 'er', label: 'ER Diagram', icon: Database, count: '8' },
    { id: 'architecture', label: 'Technical Architecture', icon: Server, count: '4 Tiers' },
    { id: 'userflow', label: 'User Flow', icon: Compass, count: '6 Steps' },
    { id: 'mvc', label: 'MVC Pattern', icon: Code, count: '3 Pillars' },
    { id: 'demovideo', label: 'Demo Video', icon: Video, count: '04:30' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-gradient-to-r from-neutral-900 via-neutral-900 to-amber-950/20 border border-neutral-800 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Technical Specification &amp; System Docs
            </span>
            <span className="text-xs text-neutral-400">Express.js • MongoDB • React 19</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            IMovies Engineering Portal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-3xl leading-relaxed">
            In-depth architecture guide covering client-server topology, atomic seat concurrency locking, entity schemas, RBAC security matrices, and MVC code breakdowns.
          </p>
        </div>

        {/* Export & Actions */}
        <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-neutral-700"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Export Markdown Docs</span>
          </button>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1.5 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-bold'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-neutral-950 text-amber-400 font-bold' : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Display */}
      <div className="min-h-[500px]">
        {activeSubTab === 'features' && <FeaturesView />}
        {activeSubTab === 'roles' && <RolesView />}
        {activeSubTab === 'er' && <ERDiagramView />}
        {activeSubTab === 'architecture' && <TechnicalArchitectureView />}
        {activeSubTab === 'userflow' && <UserFlowView />}
        {activeSubTab === 'mvc' && <MVCPatternView />}
        {activeSubTab === 'demovideo' && (
          <DemoVideoTour onLaunchLiveWalkthrough={onLaunchLiveWalkthrough} />
        )}
      </div>

      {/* Export Documentation Modal */}
      {showExportModal && <ExportDocsModal onClose={() => setShowExportModal(false)} />}
    </div>
  );
};
