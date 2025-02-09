import React from 'react';
import { CompressionSettings } from '../types';

interface Props {
  settings: CompressionSettings;
  onSettingsChange: (settings: CompressionSettings) => void;
}

export default function SettingsPanel({ settings, onSettingsChange }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-72">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Compression Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quality ({Math.round(settings.quality * 100)}%)
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={settings.quality}
            onChange={(e) => onSettingsChange({
              ...settings,
              quality: parseFloat(e.target.value)
            })}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Width (px)
          </label>
          <input
            type="number"
            value={settings.maxWidth}
            onChange={(e) => onSettingsChange({
              ...settings,
              maxWidth: parseInt(e.target.value)
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Output Format
          </label>
          <select
            value={settings.format}
            onChange={(e) => onSettingsChange({
              ...settings,
              format: e.target.value as 'jpeg' | 'png' | 'webp'
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>
    </div>
  );
}