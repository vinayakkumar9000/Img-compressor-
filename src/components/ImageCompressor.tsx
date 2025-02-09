import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download } from 'lucide-react';
import { CompressionSettings, ProcessedImage } from '../types';
import { compressImage } from '../utils/compression';

interface Props {
  settings: CompressionSettings;
}

export default function ImageCompressor({ settings }: Props) {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [processing, setProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setProcessing(true);
    const processed: ProcessedImage[] = [];

    for (const file of acceptedFiles) {
      try {
        const result = await compressImage(file, settings);
        processed.push({
          original: file,
          compressed: result.compressed,
          previewUrl: result.previewUrl,
          compressionRate: result.compressionRate,
        });
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
      }
    }

    setImages(prev => [...prev, ...processed]);
    setProcessing(false);
  }, [settings]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: true
  });

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const downloadImage = (image: ProcessedImage) => {
    const link = document.createElement('a');
    link.href = image.previewUrl;
    link.download = `compressed_${image.original.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    images.forEach(image => downloadImage(image));
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-lg text-gray-600 mb-2">
          {isDragActive ? 'Drop your images here' : 'Drag & drop images here'}
        </p>
        <p className="text-sm text-gray-500">
          or click to select files
        </p>
      </div>

      {processing && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Processing images...</p>
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Processed Images ({images.length})
            </h3>
            <button
              onClick={downloadAll}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
                <img
                  src={image.previewUrl}
                  alt={`Compressed ${image.original.name}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.original.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Compression: {image.compressionRate}%
                  </p>
                  <button
                    onClick={() => downloadImage(image)}
                    className="mt-2 w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}