import React from 'react';
import { Activity, ShieldCheck, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`border-b py-6 px-8 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
      <div className="flex items-center gap-4">
        <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
          <Activity className="w-8 h-8 text-emerald-500" />
        </div>
        <div>
          <h1 className={`text-2xl font-bold tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            Ignite Tech Solutions
          </h1>
          <p className="text-zinc-500 text-sm font-mono tracking-widest uppercase">
            Live Report Preview Board
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="text-emerald-500 text-xs font-mono animate-pulse flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            SYSTEM ONLINE
          </span>
          <span className={`${theme === 'dark' ? 'text-zinc-600' : 'text-zinc-400'} text-[10px] font-mono uppercase`}>
            Real-time Monitoring Active
          </span>
        </div>

        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-lg border transition-all duration-200 ${
            theme === 'dark' 
              ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' 
              : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
          }`}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <Link 
          to={isAdmin ? "/" : "/admin"}
          className={`p-2.5 rounded-lg border transition-all duration-200 ${
            theme === 'dark' 
              ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' 
              : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
          }`}
          title={isAdmin ? "View Board" : "Admin Panel"}
        >
          <ShieldCheck className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
};
