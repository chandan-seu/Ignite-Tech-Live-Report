import React from 'react';
import { Entry } from '../types';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface EntryItemProps {
  entry: Entry;
  className?: string;
}

export const EntryItem: React.FC<EntryItemProps> = ({ entry, className = "" }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'App Out':
        return {
          bg: isDark ? 'bg-emerald-500/10' : 'bg-emerald-50',
          border: isDark ? 'border-emerald-500/30' : 'border-emerald-200',
          text: isDark ? 'text-emerald-400' : 'text-emerald-700',
          icon: <CheckCircle className={`w-6 h-6 ${isDark ? 'text-emerald-500' : 'text-emerald-600'}`} />
        };
      case 'Declined':
        return {
          bg: isDark ? 'bg-rose-500/10' : 'bg-rose-50',
          border: isDark ? 'border-rose-500/30' : 'border-rose-200',
          text: isDark ? 'text-rose-400' : 'text-rose-700',
          icon: <AlertCircle className={`w-6 h-6 ${isDark ? 'text-rose-500' : 'text-rose-600'}`} />
        };
      case 'Hold':
        return {
          bg: isDark ? 'bg-amber-500/10' : 'bg-amber-50',
          border: isDark ? 'border-amber-500/30' : 'border-amber-200',
          text: isDark ? 'text-amber-400' : 'text-amber-700',
          icon: <Clock className={`w-6 h-6 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
        };
      default:
        return {
          bg: isDark ? 'bg-zinc-500/10' : 'bg-zinc-100',
          border: isDark ? 'border-zinc-500/30' : 'border-zinc-200',
          text: isDark ? 'text-zinc-400' : 'text-zinc-700',
          icon: <Clock className={`w-6 h-6 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`} />
        };
    }
  };

  const styles = getStatusStyles(entry.status);

  return (
    <div className={`flex items-center justify-between p-6 rounded-2xl border ${styles.border} ${styles.bg} ${isDark ? 'backdrop-blur-sm' : ''} transition-all duration-300 ${className}`}>
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className={`${isDark ? 'text-zinc-500' : 'text-zinc-400'} text-xs font-mono uppercase tracking-widest mb-1`}>
            Phone Number
          </span>
          <span className={`text-3xl font-bold font-mono ${isDark ? 'text-white' : 'text-zinc-900'} tracking-tighter`}>
            {entry.maskedId}
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
            <span className={`${isDark ? 'text-rose-500/70' : 'text-rose-600/80'} text-sm font-medium italic max-w-[200px] text-right`}>
              {entry.reason}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
