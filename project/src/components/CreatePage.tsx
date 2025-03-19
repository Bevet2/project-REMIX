import React, { useState } from 'react';
import { Search, Wand2, Download, Loader2, Type } from 'lucide-react';

export default function CreatePage() {
  const [searchQueries, setSearchQueries] = useState(['', '']);
  const [lyrics, setLyrics] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsGenerating(false);
      setPreviewUrl('https://example.com/preview.mp3');
    }, 3000);
  };

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch(previewUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `creation-${Date.now()}.mp3`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Create Something New</h1>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Mix different songs together and add your own lyrics to create something unique.
          Our AI will blend everything into a harmonious track!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {searchQueries.map((query, index) => (
          <div key={index} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search for song ${index + 1}...`}
              value={query}
              onChange={(e) => {
                const newQueries = [...searchQueries];
                newQueries[index] = e.target.value;
                setSearchQueries(newQueries);
              }}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        ))}

        <div className="relative">
          <Type className="absolute left-3 top-3 text-gray-400" />
          <textarea
            placeholder="Enter your lyrics or let AI generate them..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!searchQueries.some(q => q) || isGenerating}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Your Track...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Create Track</span>
            </>
          )}
        </button>

        {previewUrl && !isGenerating && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-white">Your creation is ready!</div>
              <button 
                onClick={handleDownload}
                disabled={isDownloading}
                className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
            <audio controls className="w-full mt-3">
              <source src={previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}