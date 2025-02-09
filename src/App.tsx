import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, Download, Settings, Info } from 'lucide-react';
import ImageCompressor from './components/ImageCompressor';
import SettingsPanel from './components/SettingsPanel';
import { CompressionSettings } from './types';

function App() {
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 0.8,
    maxWidth: 1920,
    format: 'jpeg',
  });

  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-6 h-6 text-indigo-600" />
              <span className="text-xl font-semibold text-gray-900">ImageShrink</span>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              title="Compression Settings"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compress Images Without Quality Loss
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your images and optimize them for the web. Supports JPEG, PNG, and WebP formats.
          </p>
        </div>

        <div className="relative">
          {showSettings && (
            <div className="absolute right-0 top-0 z-10">
              <SettingsPanel settings={settings} onSettingsChange={setSettings} />
            </div>
          )}
          
          <ImageCompressor settings={settings} />
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
            <div className="text-sm text-gray-600">
              <h3 className="font-medium text-gray-900 mb-1">About This Tool</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Compression is done entirely in your browser - files never leave your device</li>
                <li>Supports bulk compression of multiple images</li>
                <li>Maintains good quality while reducing file size</li>
                <li>Download individual images or all at once</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;