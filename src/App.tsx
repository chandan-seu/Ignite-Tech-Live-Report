import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Admin } from './components/Admin';
import { useEntries } from './hooks/useEntries';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const { entries, addEntry, updateEntry, deleteEntry, loading } = useEntries();
  const { theme } = useTheme();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Initializing Secure Stream...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'} font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden transition-colors duration-300`}>
        <Header />
        
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
        
        <footer className={`border-t py-3 px-8 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest ${theme === 'dark' ? 'bg-zinc-950 border-zinc-900 text-zinc-600' : 'bg-zinc-50 border-zinc-200 text-zinc-400'}`}>
          <div className="flex items-center gap-4">
            <span>&copy; 2026 Ignite Tech Solutions</span>
            <span className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-300'}`}></span>
            <span>Security Protocol v4.2.0</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></span>
              Data Stream Active
            </span>
            <span className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-300'}`}></span>
            <span>Terminal ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
