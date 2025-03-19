import React, { useState } from 'react';
import { Music, Wand2, Search, Download, Loader2 } from 'lucide-react';
import RemixPage from './components/RemixPage';
import CreatePage from './components/CreatePage';

function App() {
  const [activeTab, setActiveTab] = useState<'remix' | 'create'>('remix');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <nav className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Music className="w-8 h-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">AI Remix Studio</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('remix')}
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === 'remix'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:bg-purple-500/20'
                }`}
              >
                Remix Song
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === 'create'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:bg-purple-500/20'
                }`}
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'remix' ? <RemixPage /> : <CreatePage />}
      </main>
    </div>
  );
}

export default App;