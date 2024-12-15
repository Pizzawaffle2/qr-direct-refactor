// src/components/QRCode/AdvancedTab.tsx
import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { loadImageFromFile, createImageOption } from '@/utils/qr-image';
import { QRImageOptions } from '@/types/qr';

interface AdvancedTabProps {
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  imageOptions?: QRImageOptions;
  onMarginChange: (margin: number) => void;
  onErrorCorrectionChange: (level: 'L' | 'M' | 'Q' | 'H') => void;
  onImageOptionsChange: (options: QRImageOptions | undefined) => void;
}

export function AdvancedTab({
  margin,
  errorCorrectionLevel,
  imageOptions,
  onMarginChange,
  onErrorCorrectionChange,
  onImageOptionsChange,
}: AdvancedTabProps) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const dataUrl = await loadImageFromFile(file);
      const dimensions = await createImageOption(dataUrl);

      onImageOptionsChange({
        source: dataUrl,
        width: dimensions.width,
        height: dimensions.height,
        margin: 5,
        imageSize: 0.4
      });
    } catch (error) {
      console.error('Error loading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    onImageOptionsChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Image Upload Section */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Center Image</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="center-image-upload"
            />
            <label
              htmlFor="center-image-upload"
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              {loading ? 'Uploading...' : 'Upload Image'}
            </label>
            {imageOptions && (
              <button
                onClick={handleRemoveImage}
                className="p-2 text-red-500 hover:text-red-600"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {imageOptions && (
            <>
              <div className="flex items-center gap-4">
                <img
                  src={imageOptions.source}
                  alt="Center logo preview"
                  className="w-16 h-16 object-contain border rounded"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">
                    Image Size: {Math.round(imageOptions.imageSize * 100)}%
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={imageOptions.imageSize * 100}
                    onChange={(e) => onImageOptionsChange({
                      ...imageOptions,
                      imageSize: Number(e.target.value) / 100
                    })}
                    className="w-full"
                    title="Image Size"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Image Margin: {imageOptions.margin}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={imageOptions.margin}
                  onChange={(e) => onImageOptionsChange({
                    ...imageOptions,
                    margin: Number(e.target.value)
                  })}
                  className="w-full"
                  title='Image Margin'
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Other settings... */}
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">QR Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Margin Size: {margin}px
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={margin}
              onChange={(e) => onMarginChange(Number(e.target.value))}
              className="w-full"
              title='Margin Size'
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Error Correction Level
            </label>
            <select
              value={errorCorrectionLevel}
              onChange={(e) => onErrorCorrectionChange(e.target.value as 'L' | 'M' | 'Q' | 'H')}
              className="w-full p-2 rounded-md border"
              title='Error Correction Level'
            >
              <option value="L">Low - 7% recovery</option>
              <option value="M">Medium - 15% recovery</option>
              <option value="Q">Quartile - 25% recovery</option>
              <option value="H">High - 30% recovery</option>
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Higher levels allow for better recovery when using center images
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}