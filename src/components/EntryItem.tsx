import React from 'react';
import { Entry } from '../types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

interface EntryItemProps {
  entry: Entry;
  className?: string;
}

export const EntryItem: React.FC<EntryItemProps> = ({ entry, className = "" }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'App Out':
        return {
          bg: 'bg-emerald-500/5 dark:bg-emerald-500/10',
          border: 'border-emerald-500/20 dark:border-emerald-500/30',
          text: 'text-emerald-600 dark:text-emerald-400',
          icon: <CheckCircle className="w-6 h-6 text-emerald-500" />
        };
      case 'Declined':
        return {
          bg: 'bg-rose-500/5 dark:bg-rose-500/10',
          border: 'border-rose-500/20 dark:border-rose-500/30',
          text: 'text-rose-600 dark:text-rose-400',
          icon: <AlertCircle className="w-6 h-6 text-rose-500" />
        };
      case 'Hold':
        return {
          bg: 'bg-amber-500/5 dark:bg-amber-500/10',
          border: 'border-amber-500/20 dark:border-amber-500/30',
          text: 'text-amber-600 dark:text-amber-400',
          icon: <Clock className="w-6 h-6 text-amber-500" />
        };
      default:
        return {
          bg: 'bg-zinc-500/5 dark:bg-zinc-500/10',
          border: 'border-zinc-500/20 dark:border-zinc-500/30',
          text: 'text-zinc-600 dark:text-zinc-400',
          icon: <Clock className="w-6 h-6 text-zinc-500" />
        };
    }
  };

  const styles = getStatusStyles(entry.status);

  return (
    <div className={`flex items-center justify-between p-6 rounded-2xl border ${styles.border} ${styles.bg} backdrop-blur-sm transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">
            Phone Number
          </span>
          <span className="text-3xl font-bold font-mono text-zinc-900 dark:text-white tracking-tighter">
            {entry.maskedId}
          </span>
        </div>

        <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800/50 hidden md:block"></div>

        <div className="flex flex-col">
          <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-1">
            Agent
          </span>
          <span className="text-xl font-bold text-zinc-700 dark:text-zinc-300">
            {entry.agent}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-3 mb-1">
            {styles.icon}
            <span className={`text-2xl font-bold uppercase tracking-tight ${styles.text}`}>
              {entry.status}
            </span>
          </div>
          {entry.status === 'Declined' && entry.reason && (
            <span className="text-rose-500/70 text-sm font-medium italic max-w-[200px] text-right">
              {entry.reason}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
