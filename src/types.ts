export interface CompressionSettings {
  quality: number;
  maxWidth: number;
  format: 'jpeg' | 'png' | 'webp';
}

export interface ProcessedImage {
  original: File;
  compressed: Blob;
  previewUrl: string;
  compressionRate: number;
}