import React, { useState, useEffect } from 'react';
import { Entry, Status } from '../types';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from '../constants';
import { Plus, Trash2, Edit2, Save, X, Lock, ShieldCheck, AlertCircle, User, ArrowLeft, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface AdminProps {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, 'id' | 'timestamp'>) => void;
  updateEntry: (id: string, updatedFields: Partial<Entry>) => void;
  deleteEntry: (id: string) => void;
}

export const Admin: React.FC<AdminProps> = ({ entries, addEntry, updateEntry, deleteEntry }) => {
  const { theme } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem('ignite-admin-auth') === 'true';
  });
  const [error, setError] = useState('');
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ maskedId: string; status: Status; reason: string }>({
    maskedId: '',
    status: 'App Out',
    reason: '',
  });

  const [newEntry, setNewEntry] = useState<{ maskedId: string; status: Status; reason: string }>({
    maskedId: '',
    status: 'App Out',
    reason: '',
  });

  useEffect(() => {
    localStorage.setItem('ignite-admin-auth', isAuthorized.toString());
  }, [isAuthorized]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthorized(true);
      setError('');
    } else {
      setError('Invalid Administrator Credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem('ignite-admin-auth');
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.maskedId) return;
    addEntry({
      maskedId: newEntry.maskedId,
      status: newEntry.status,
      reason: newEntry.status === 'Declined' ? newEntry.reason : undefined,
    });
    setNewEntry({ maskedId: '', status: 'App Out', reason: '' });
  };

  const startEditing = (entry: Entry) => {
    setEditingId(entry.id);
    setEditForm({
      maskedId: entry.maskedId,
      status: entry.status,
      reason: entry.reason || '',
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const handleUpdate = (id: string) => {
    updateEntry(id, {
      maskedId: editForm.maskedId,
      status: editForm.status,
      reason: editForm.status === 'Declined' ? editForm.reason : undefined,
    });
    setEditingId(null);
  };

  if (!isAuthorized) {
    return (
      <div className={`flex-1 flex items-center justify-center p-8 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
        <div className={`w-full max-w-md border p-10 rounded-3xl shadow-2xl transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex flex-col items-center mb-8">
            <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 mb-4">
              <Lock className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className={`text-2xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Admin Authentication</h2>
            <p className="text-zinc-500 text-sm mt-1">Access restricted to authorized personnel only</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-zinc-400 text-xs font-mono uppercase tracking-widest ml-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full border rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all ${
                    theme === 'dark' 
                      ? 'bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-700' 
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                  }`}
                  placeholder="admin"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-zinc-400 text-xs font-mono uppercase tracking-widest ml-1">
                Security Key
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-emerald-500/50 transition-all ${
                    theme === 'dark' 
                      ? 'bg-zinc-950 border-zinc-800 text-white placeholder:text-zinc-700' 
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400'
                  }`}
                  placeholder="••••••••••••"
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-rose-500 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              Authorize Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex-1 overflow-y-auto p-8 md:p-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between">
          <h2 className={`text-3xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' 
                  : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Live Board
            </Link>
            <button 
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium ${
                theme === 'dark' 
                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20' 
                  : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        <section className={`border p-8 rounded-3xl shadow-xl transition-colors duration-300 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Plus className="w-6 h-6 text-emerald-500" />
            <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Register New Entry</h3>
          </div>
          
          <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-zinc-500 text-xs font-mono uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <input
                type="text"
                value={newEntry.maskedId}
                onChange={(e) => setNewEntry({ ...newEntry, maskedId: e.target.value })}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all ${
                  theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                }`}
                placeholder="e.g. 98***12"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-zinc-500 text-xs font-mono uppercase tracking-widest ml-1">
                Status
              </label>
              <select
                value={newEntry.status}
                onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value as Status })}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none ${
                  theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                }`}
              >
                <option value="App Out">App Out</option>
                <option value="Declined">Declined</option>
                <option value="Hold">Hold</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-zinc-500 text-xs font-mono uppercase tracking-widest ml-1">
                Reason (Optional)
              </label>
              <input
                type="text"
                value={newEntry.reason}
                onChange={(e) => setNewEntry({ ...newEntry, reason: e.target.value })}
                disabled={newEntry.status !== 'Declined'}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500/50 transition-all disabled:opacity-30 ${
                  theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                }`}
                placeholder="Reason if declined"
              />
            </div>
            
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Entry
            </button>
          </form>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Active Records</h3>
            <span className="text-zinc-500 text-sm font-mono">{entries.length} Total Entries</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {entries.map((entry) => (
              <div 
                key={entry.id} 
                className={`border p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 transition-all ${
                  theme === 'dark' ? 'bg-zinc-900' : 'bg-white shadow-sm'
                } ${
                  editingId === entry.id 
                    ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' 
                    : theme === 'dark' ? 'border-zinc-800 hover:border-zinc-700' : 'border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {editingId === entry.id ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    <div className="space-y-1">
                      <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Phone Number</label>
                      <input
                        type="text"
                        value={editForm.maskedId}
                        onChange={(e) => setEditForm({ ...editForm, maskedId: e.target.value })}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500/50 ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                        }`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Status</label>
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value as Status })}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500/50 ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                        }`}
                      >
                        <option value="App Out">App Out</option>
                        <option value="Declined">Declined</option>
                        <option value="Hold">Hold</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Reason</label>
                      <input
                        type="text"
                        value={editForm.reason}
                        onChange={(e) => setEditForm({ ...editForm, reason: e.target.value })}
                        disabled={editForm.status !== 'Declined'}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500/50 disabled:opacity-30 ${
                          theme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                        }`}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="flex flex-col">
                      <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Phone</span>
                      <span className={`text-xl font-bold font-mono ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{entry.maskedId}</span>
                    </div>
                    
                    <div className="flex flex-col">
                      <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Status</span>
                      <span className={`text-sm font-bold uppercase ${
                        entry.status === 'App Out' ? 'text-emerald-500' : 
                        entry.status === 'Declined' ? 'text-rose-500' : 'text-amber-500'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                    
                    {entry.reason && (
                      <div className="flex flex-col">
                        <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-widest">Reason</span>
                        <span className={`${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'} text-sm italic`}>{entry.reason}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                  {editingId === entry.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(entry.id)}
                        className="p-3 text-emerald-500 hover:bg-emerald-500/10 rounded-xl border border-emerald-500/20 transition-all"
                        title="Save Changes"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className={`p-3 rounded-xl border border-transparent transition-all ${
                          theme === 'dark' ? 'text-zinc-500 hover:text-white hover:bg-zinc-800' : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'
                        }`}
                        title="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(entry)}
                        className={`p-3 rounded-xl border border-transparent transition-all ${
                          theme === 'dark' 
                            ? 'text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500/20' 
                            : 'text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200'
                        }`}
                        title="Edit Record"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteEntry(entry.id)}
                        className={`p-3 rounded-xl border border-transparent transition-all ${
                          theme === 'dark' 
                            ? 'text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 hover:border-rose-500/20' 
                            : 'text-zinc-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200'
                        }`}
                        title="Delete Record"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
