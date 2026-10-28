import React from 'react';
import {
  Film,
  Ticket,
  FileCode2,
  Video,
  LayoutDashboard,
  MapPin,
  UserCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  activeTab: 'cinema' | 'docs' | 'demo' | 'bookings' | 'admin';
  setActiveTab: (tab: 'cinema' | 'docs' | 'demo' | 'bookings' | 'admin') => void;
  docsSubTab: string;
  setDocsSubTab: (subTab: string) => void;
  currentUser: User;
  users: User[];
  onSelectUser: (user: User) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  bookingCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  users,
  onSelectUser,
  selectedCity,
  setSelectedCity,
  bookingCount,
}) => {
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);
  const [showCityDropdown, setShowCityDropdown] = React.useState(false);

  const cities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'San Francisco, CA'];

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">System Admin</span>;
      case 'manager':
        return <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">Theater Mgr</span>;
      case 'cashier':
        return <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">Box Cashier</span>;
      default:
        return <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Customer</span>;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('cinema')}
              className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Film className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                  IMOVIES
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 border border-amber-500/40 px-1 rounded bg-amber-400/10">PRO</span>
                </span>
                <span className="text-[10px] block font-mono uppercase tracking-wider text-neutral-400 -mt-1">
                  Express • Mongo • Architecture
                </span>
              </div>
            </button>

            {/* City Location Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>

              {showCityDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Select Cinema Region
                  </div>
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setShowCityDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-neutral-800 ${
                        selectedCity === city ? 'text-amber-400 font-semibold bg-neutral-800/50' : 'text-neutral-300'
                      }`}
                    >
                      {city}
                      {selectedCity === city && <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('cinema')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'cinema'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Cinema Booking</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'docs'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>Project Docs &amp; Architecture</span>
              <span className="hidden lg:inline text-[10px] bg-neutral-800 px-1.5 py-0.2 rounded text-neutral-300 border border-neutral-700">
                ER • MVC
              </span>
            </button>

            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'demo'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Video className="w-4 h-4 text-red-500" />
              <span className="flex items-center gap-1">
                Demo Video Tour
                <Sparkles className="w-3 h-3 text-amber-400" />
              </span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'bookings'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">My Tickets</span>
              {bookingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Operations</span>
            </button>
          </nav>

          {/* User Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-white leading-tight flex items-center justify-end gap-1.5">
                  {currentUser.name}
                </div>
                <div className="flex justify-end mt-0.5">
                  {getRoleBadge(currentUser.role)}
                </div>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-neutral-700"
              />
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50">
                <div className="px-3 py-2 border-b border-neutral-800 mb-1">
                  <div className="text-xs font-bold text-white flex items-center justify-between">
                    <span>Switch Test Persona</span>
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Test RBAC permissions and user flows across roles
                  </p>
                </div>

                <div className="space-y-1">
                  {users.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        onSelectUser(user);
                        setShowUserDropdown(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg flex items-center gap-3 transition-colors ${
                        currentUser.id === user.id
                          ? 'bg-amber-500/10 border border-amber-500/30'
                          : 'hover:bg-neutral-800/80 border border-transparent'
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-lg object-cover ring-1 ring-neutral-700"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{user.name}</div>
                        <div className="text-[10px] text-neutral-400 truncate">{user.email}</div>
                      </div>
                      <div>{getRoleBadge(user.role)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
