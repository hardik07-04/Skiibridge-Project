import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Code,
  Sparkles,
  ChevronRight,
  Users,
  Film,
  Calendar,
  Armchair,
  Popcorn,
  CreditCard,
  QrCode,
} from 'lucide-react';
import { DOC_USER_FLOW } from '../../data/mockData';

export const UserFlowView: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const currentStep = DOC_USER_FLOW[selectedStepIndex] || DOC_USER_FLOW[0];

  const getStepIcon = (phase: string) => {
    switch (phase) {
      case 'Discovery':
        return <Film className="w-4 h-4 text-amber-400" />;
      case 'Scheduling':
        return <Calendar className="w-4 h-4 text-blue-400" />;
      case 'Seat Reservation':
        return <Armchair className="w-4 h-4 text-emerald-400" />;
      case 'Add-ons':
        return <Popcorn className="w-4 h-4 text-purple-400" />;
      case 'Checkout':
        return <CreditCard className="w-4 h-4 text-amber-400" />;
      default:
        return <QrCode className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-amber-500" />
          <span>Interactive User Flow &amp; State Transition Engine</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Complete lifecycle from movie catalog discovery to auditorium gate QR check-in
        </p>
      </div>

      {/* Horizontal Flowchart Ribbon */}
      <div className="p-4 rounded-3xl bg-neutral-950 border border-neutral-800 overflow-x-auto">
        <div className="flex items-center gap-3 min-w-[760px]">
          {DOC_USER_FLOW.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;

            return (
              <React.Fragment key={step.stepNumber}>
                <button
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`flex-1 p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                      : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-neutral-400">
                      Step 0{step.stepNumber}
                    </span>
                    <div className="p-1.5 rounded-lg bg-neutral-950 border border-neutral-800">
                      {getStepIcon(step.phase)}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-white line-clamp-1">{step.title}</div>
                  <div className="text-[10px] text-amber-400 font-mono mt-0.5">{step.phase}</div>
                </button>

                {idx < DOC_USER_FLOW.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-neutral-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Step Overview & System Action */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Phase {currentStep.stepNumber}: {currentStep.phase}
              </span>
              <span className="text-xs text-neutral-400">Actor: <strong className="text-white">{currentStep.actor}</strong></span>
            </div>

            <h3 className="text-xl font-bold text-white">{currentStep.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2">
              {currentStep.description}
            </p>
          </div>

          {/* User Inputs Required */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              User Input Parameters
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentStep.inputs.map((inp, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300"
                >
                  {inp}
                </span>
              ))}
            </div>
          </div>

          {/* System Response */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Backend &amp; Database State Execution</span>
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">{currentStep.systemAction}</p>

            {currentStep.codeHighlight && (
              <div className="mt-3 pt-2 border-t border-neutral-800 font-mono text-[11px] text-emerald-400">
                {currentStep.codeHighlight}
              </div>
            )}
          </div>
        </div>

        {/* Right: Edge Cases, Concurrency Conflicts, and Retries */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Edge Cases &amp; Concurrency Handlers</span>
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              How IMovies safely handles race conditions, timeouts, and network drops
            </p>
          </div>

          <div className="space-y-3">
            {currentStep.edgeCases.map((edge, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-300 space-y-1"
              >
                <div className="flex items-center gap-2 font-mono text-[10px] text-amber-400 uppercase font-semibold">
                  <span>Exception #{i + 1}</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">{edge}</p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
            <button
              disabled={selectedStepIndex === 0}
              onClick={() => setSelectedStepIndex(prev => prev - 1)}
              className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium disabled:opacity-40"
            >
              Previous Step
            </button>
            <button
              disabled={selectedStepIndex === DOC_USER_FLOW.length - 1}
              onClick={() => setSelectedStepIndex(prev => prev + 1)}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold disabled:opacity-40 flex items-center gap-1"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
