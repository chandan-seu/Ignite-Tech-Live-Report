import React from 'react';
import { Activity, ShieldCheck, ArrowUpRight, CheckCircle2, XCircle, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Entry } from '../types';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
  entries?: Entry[];
}

export const Header: React.FC<HeaderProps> = ({ entries = [] }) => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const { theme, toggleTheme } = useTheme();

  const appOut = entries.filter(e => e.status === 'App Out').length;
  const declines = entries.filter(e => e.status === 'Declined').length;
  
  // Transfer = Total Inputs (App Out + Declines + Hold)
  const transfers = entries.length;

  return (
    <header className="bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-10 px-10 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-6">
        <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
          <Activity className="w-10 h-10 text-emerald-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
            Ignite Tech Solutions
          </h1>
          <p className="text-zinc-500 text-base font-mono tracking-widest uppercase">
            Live Report Preview Board
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-10 bg-zinc-50 dark:bg-zinc-900/50 px-10 py-5 rounded-3xl border border-zinc-200 dark:border-zinc-800/50 shadow-xl dark:shadow-2xl transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="bg-blue-500/10 p-3 rounded-xl">
            <ArrowUpRight className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Transfers</span>
            <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none">{transfers}</span>
          </div>
        </div>
        
        <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800"></div>

        <div className="flex items-center gap-4">
          <div className="bg-emerald-500/10 p-3 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">App Out</span>
            <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none">{appOut}</span>
          </div>
        </div>

        <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800"></div>

        <div className="flex items-center gap-4">
          <div className="bg-rose-500/10 p-3 rounded-xl">
            <XCircle className="w-6 h-6 text-rose-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Declines</span>
            <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none">{declines}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-emerald-500 text-xs font-mono animate-pulse flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            SYSTEM ONLINE
          </span>
          <span className="text-zinc-500 dark:text-zinc-600 text-[10px] font-mono uppercase">
            Real-time Monitoring Active
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-200"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link 
            to={isAdmin ? "/" : "/admin"}
            className="bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 transition-all duration-200"
            title={isAdmin ? "View Board" : "Admin Panel"}
          >
            <ShieldCheck className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
