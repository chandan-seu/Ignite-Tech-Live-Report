import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Admin } from './components/Admin';
import { useEntries } from './hooks/useEntries';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const { entries, loading, addEntry, updateEntry, deleteEntry } = useEntries();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 animate-pulse">Initializing Secure Stream...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden transition-colors duration-300">
          <Header entries={entries} />
          
          <main className="flex-1 flex flex-col overflow-hidden">
            <Routes>
              <Route path="/" element={<Board entries={entries} />} />
              <Route 
                path="/admin" 
                element={
                  <Admin 
                    entries={entries} 
                    addEntry={addEntry} 
                    updateEntry={updateEntry} 
                    deleteEntry={deleteEntry} 
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 py-3 px-8 flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors duration-300">
            <div className="flex items-center gap-4">
              <span>&copy; 2026 Ignite Tech Solutions</span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800"></span>
              <span>Security Protocol v4.2.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
                Data Stream Active
              </span>
              <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-800"></span>
              <span>Terminal ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}
