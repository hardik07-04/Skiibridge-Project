import React, { useState } from 'react';
import {
  Users,
  Shield,
  Ticket,
  Briefcase,
  ShieldCheck,
  Check,
  X,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { DOC_ROLES } from '../../data/mockData';
import { UserRole } from '../../types';

export const RolesView: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  const currentRole = DOC_ROLES.find(r => r.role === selectedRole) || DOC_ROLES[0];

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="w-5 h-5 text-red-400" />;
      case 'manager':
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      case 'cashier':
        return <Ticket className="w-5 h-5 text-blue-400" />;
      default:
        return <Users className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-amber-500" />
          <span>Roles &amp; Responsibilities (RBAC Architecture)</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          Role-Based Access Control matrix defining security boundaries across customer and cinema staff tiers
        </p>
      </div>

      {/* Role Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DOC_ROLES.map((r) => (
          <button
            key={r.role}
            onClick={() => setSelectedRole(r.role)}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedRole === r.role
                ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/30 shadow-lg'
                : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-neutral-950 border border-neutral-800">
                {getRoleIcon(r.role)}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Tier {r.role === 'customer' ? '1' : r.role === 'cashier' ? '2' : r.role === 'manager' ? '3' : '4'}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">{r.title}</h3>
            <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1">{r.tagline}</p>
          </button>
        ))}
      </div>

      {/* Selected Role Detailed Profile & Responsibilities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Summary and Responsibilities Checklist */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Role Profile &amp; Operational Scope
            </div>
            <h3 className="text-xl font-bold text-white">{currentRole.title}</h3>
            <p className="text-xs text-neutral-300 leading-relaxed mt-2">
              {currentRole.summary}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Core Responsibilities &amp; Daily Tasks
            </h4>
            <div className="space-y-2.5">
              {currentRole.responsibilities.map((task, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: RBAC CRUD Permissions Matrix */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="border-b border-neutral-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>CRUD Permissions Enforcement Matrix</span>
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Enforced via Express.js JWT middleware: <code className="text-amber-400 font-mono text-[10px]">requireRole("{currentRole.role}")</code>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-800 text-[11px] font-mono text-neutral-400 uppercase">
                  <th className="py-2.5 font-bold">System Module</th>
                  <th className="py-2.5 text-center">Read</th>
                  <th className="py-2.5 text-center">Create</th>
                  <th className="py-2.5 text-center">Update</th>
                  <th className="py-2.5 text-center">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 font-mono">
                {currentRole.permissions.map((perm) => (
                  <tr key={perm.module} className="hover:bg-neutral-950/40">
                    <td className="py-2.5 font-sans font-medium text-neutral-200">
                      {perm.module}
                    </td>
                    <td className="py-2.5 text-center">
                      {perm.canRead ? (
                        <span className="inline-block w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 text-center leading-4 font-bold">✓</span>
                      ) : (
                        <span className="inline-block w-4 h-4 rounded bg-neutral-800 text-neutral-500 text-center leading-4">✕</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center">
                      {perm.canCreate ? (
                        <span className="inline-block w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 text-center leading-4 font-bold">✓</span>
                      ) : (
                        <span className="inline-block w-4 h-4 rounded bg-neutral-800 text-neutral-500 text-center leading-4">✕</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center">
                      {perm.canUpdate ? (
                        <span className="inline-block w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 text-center leading-4 font-bold">✓</span>
                      ) : (
                        <span className="inline-block w-4 h-4 rounded bg-neutral-800 text-neutral-500 text-center leading-4">✕</span>
                      )}
                    </td>
                    <td className="py-2.5 text-center">
                      {perm.canDelete ? (
                        <span className="inline-block w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 text-center leading-4 font-bold">✓</span>
                      ) : (
                        <span className="inline-block w-4 h-4 rounded bg-neutral-800 text-neutral-500 text-center leading-4">✕</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
