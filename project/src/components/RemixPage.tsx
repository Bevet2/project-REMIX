import React, { useState } from 'react';
import { Search, Wand2, Download, Loader2 } from 'lucide-react';

const genres = [
  { id: 'rock', name: 'Rock', emoji: '🎸' },
  { id: 'electro', name: 'Electro', emoji: '🎧' },
  { id: 'jazz', name: 'Jazz', emoji: '🎷' },
  { id: 'hiphop', name: 'Hip-Hop', emoji: '🎤' },
  { id: 'lofi', name: 'Lo-Fi', emoji: '🎼' },
];

export default function RemixPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
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
      a.download = `remix-${selectedGenre}-${Date.now()}.mp3`;
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
        <h1 className="text-4xl font-bold text-white mb-4">Transform Your Music</h1>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Give your favorite tracks a fresh new sound with our AI-powered remix generator.
          Simply search for a song and choose your desired style!
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for a song on YouTube..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => setSelectedGenre(genre.id)}
              className={`p-4 rounded-lg border transition-all ${
                selectedGenre === genre.id
                  ? 'bg-purple-500 border-purple-400 text-white'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              <div className="text-2xl mb-1">{genre.emoji}</div>
              <div className="text-sm">{genre.name}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!searchQuery || !selectedGenre || isGenerating}
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Remix...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              <span>Generate Remix</span>
            </>
          )}
        </button>

        {previewUrl && !isGenerating && (
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="text-white">Your remix is ready!</div>
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