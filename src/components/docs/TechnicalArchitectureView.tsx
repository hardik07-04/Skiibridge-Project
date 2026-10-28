import React, { useState } from 'react';
import {
  Server,
  Layers,
  Cpu,
  Database,
  Radio,
  Play,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Lock,
  Sparkles,
} from 'lucide-react';
import { DOC_ARCHITECTURE } from '../../data/mockData';

export const TechnicalArchitectureView: React.FC = () => {
  const [activeSimulationStep, setActiveSimulationStep] = useState<number | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulationSteps = [
    {
      step: 1,
      layer: 'Client Presentation Tier',
      component: 'React 19 Auditorium Seat Map',
      action: 'Customer taps Seat F7 (Premium Tier, $19.50) on interactive SVG grid',
      status: 'Captured client gesture & emitted lock request',
    },
    {
      step: 2,
      layer: 'API Gateway & Security',
      component: 'Express.js Route & JWT Guard',
      action: 'Validates bearer token, enforces rate limiter, routes to /api/showtimes/:id/lock-seats',
      status: 'Token verified & payload sanitized',
    },
    {
      step: 3,
      layer: 'Concurrency & Business Logic',
      component: 'Seat Concurrency Controller (Redis/Mongo)',
      action: 'Executes atomic lock with 300-second TTL; broadcasts seat:locked event to hall room via WebSocket',
      status: 'Lock acquired & distributed broadcast sent',
    },
    {
      step: 4,
      layer: 'Persistence & Integrations',
      component: 'MongoDB Multi-Document Transaction',
      action: 'Payment gateway approves charge -> starts session.withTransaction() to permanently mark seat "occupied"',
      status: 'Atomic transaction committed to replica set',
    },
    {
      step: 5,
      layer: 'Fulfillment & Output',
      component: 'HMAC QR Signing Service',
      action: 'Signs booking payload with SHA-256 HMAC; renders digital cinema pass with live QR code',
      status: 'Ticket issued & sent to user session',
    },
  ];

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setActiveSimulationStep(1);

    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      if (current <= 5) {
        setActiveSimulationStep(current);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Server className="w-6 h-6 text-amber-500" />
            <span>Technical System Architecture</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Express.js RESTful API, MongoDB Replica Set, Redis In-Memory Locks, and React 19 Client
          </p>
        </div>

        {/* Trace Request Button */}
        <button
          onClick={handleStartSimulation}
          disabled={isSimulating}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            isSimulating
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 cursor-wait'
              : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/20 hover:scale-105 cursor-pointer'
          }`}
        >
          {isSimulating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span>Simulating Request Flow...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Trace a Seat Reservation Request</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Trace Simulation Visualizer */}
      {activeSimulationStep !== null && (
        <div className="p-5 rounded-2xl bg-neutral-900 border border-amber-500/50 shadow-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Live Request Flow Pipeline (Step {activeSimulationStep} of 5)
            </span>
            <button
              onClick={() => setActiveSimulationStep(null)}
              className="text-xs text-neutral-400 hover:text-white"
            >
              Dismiss
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-5 gap-2">
            {simulationSteps.map((s) => {
              const isActive = activeSimulationStep === s.step;
              const isPast = activeSimulationStep > s.step;

              return (
                <div
                  key={s.step}
                  className={`p-2.5 rounded-xl border text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-amber-500/20 border-amber-500 text-white shadow-lg ring-1 ring-amber-500/50'
                      : isPast
                      ? 'bg-neutral-950 border-emerald-500/40 text-emerald-400'
                      : 'bg-neutral-950/60 border-neutral-800 text-neutral-500'
                  }`}
                >
                  <div className="text-[10px] font-bold">0{s.step}. {s.layer.split(' ')[0]}</div>
                  <div className="text-[11px] font-sans truncate mt-0.5">{s.component}</div>
                </div>
              );
            })}
          </div>

          {/* Active Step Details */}
          {(() => {
            const current = simulationSteps.find(s => s.step === activeSimulationStep);
            if (!current) return null;
            return (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-mono text-amber-400 uppercase font-semibold">
                    {current.layer} → {current.component}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{current.action}</div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold shrink-0 self-start sm:self-auto">
                  ✓ {current.status}
                </span>
              </div>
            );
          })()}
        </div>
      )}

      {/* 4 Architectural Tiers */}
      <div className="space-y-6">
        {DOC_ARCHITECTURE.map((layer, layerIdx) => (
          <div
            key={layer.id}
            className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                {layer.name}
              </h3>
              <span className="text-xs font-mono text-neutral-400">
                Tier {layerIdx + 1}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {layer.components.map((comp) => (
                <div
                  key={comp.name}
                  className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-sm font-bold text-white">{comp.name}</h4>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
                        {comp.tech.split(',')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                      {comp.description}
                    </p>

                    <ul className="space-y-1.5 text-[11px] text-neutral-400 border-t border-neutral-800/80 pt-3">
                      {comp.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-2 text-[10px] font-mono text-neutral-400 truncate">
                    Tech: {comp.tech}
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
