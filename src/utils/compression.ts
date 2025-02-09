export async function compressImage(
  file: File,
  settings: { quality: number; maxWidth: number; format: string }
): Promise<{
  compressed: Blob;
  previewUrl: string;
  compressionRate: number;
}> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Calculate new dimensions while maintaining aspect ratio
      let width = img.width;
      let height = img.height;

      if (width > settings.maxWidth) {
        height = (settings.maxWidth * height) / width;
        width = settings.maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw image on canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Could not compress image'));
            return;
          }

          const compressionRate = Math.round(
            ((file.size - blob.size) / file.size) * 100
          );

          const previewUrl = URL.createObjectURL(blob);

          resolve({
            compressed: blob,
            previewUrl,
            compressionRate,
          });
        },
        `image/${settings.format}`,
        settings.quality
      );
    };

    img.onerror = () => {
      reject(new Error('Could not load image'));
    };

    reader.readAsDataURL(file);
  });
}