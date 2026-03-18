import React from 'react';
import { Entry } from '../types';
import { EntryItem } from './EntryItem';
import { useTheme } from '../context/ThemeContext';

interface BoardProps {
  entries: Entry[];
}

export const Board: React.FC<BoardProps> = ({ entries }) => {
  const { theme } = useTheme();
  // Duplicate entries to create a seamless infinite scroll effect
  const scrollEntries = [...entries, ...entries, ...entries];

  return (
    <div className={`flex-1 overflow-hidden relative transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
      {/* Gradient overlays for top and bottom fade */}
      <div className={`absolute top-0 left-0 right-0 h-32 z-10 pointer-events-none ${
        theme === 'dark' ? 'bg-gradient-to-b from-zinc-950 to-transparent' : 'bg-gradient-to-b from-zinc-50 to-transparent'
      }`}></div>
      <div className={`absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none ${
        theme === 'dark' ? 'bg-gradient-to-t from-zinc-950 to-transparent' : 'bg-gradient-to-t from-zinc-50 to-transparent'
      }`}></div>

      <div className="h-full flex flex-col items-center justify-center py-12 px-8">
        <div className="w-full max-w-5xl h-full overflow-hidden">
          <div 
            className="flex flex-col gap-6 animate-scroll"
            style={{
              animationDuration: `${entries.length * 4}s`,
            }}
          >
            {scrollEntries.map((entry, index) => (
              <EntryItem 
                key={`${entry.id}-${index}`} 
                entry={entry} 
                className="w-full hover:scale-[1.02] transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.33%);
          }
        }
        .animate-scroll {
          animation: scroll linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
