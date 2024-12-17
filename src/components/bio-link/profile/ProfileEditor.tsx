// src/components/bio-link/profile/ProfileEditor.tsx
'use client';

import { useState } from 'react';
import { useBioPageStore } from '@/app/bio-links/store/bioPageStore';
import { Image as ImageIcon, X, Upload, Camera, Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function ProfileEditor() {
  const { bioPage, updateProfile } = useBioPageStore();
  const { name, bio, profileImage } = bioPage;
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateImage = (file: File): boolean => {
    setError(null);

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Image must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImage(file)) return;

    try {
      setIsUploading(true);
      setError(null);

      // In real app, implement image upload to server here
      const imageUrl = URL.createObjectURL(file);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
      updateProfile({ profileImage: imageUrl });
    } catch (err) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    updateProfile({ profileImage: undefined });
    setError(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-semibold">Profile</h2>
      
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 ring-4 ring-gray-50">
            {profileImage ? (
              <>
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-opacity group-hover:opacity-75" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-50 transition-colors group-hover:bg-gray-100">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
            )}
            
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>

          {profileImage && (
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="cursor-pointer px-4 py-2 bg-gray-50 hover:bg-gray-100 border rounded-lg transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            <span>{profileImage ? 'Change Image' : 'Upload Image'}</span>
            <input
              type="file"
              accept={ALLOWED_FILE_TYPES.join(',')}
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
          </label>
          
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <p className="text-xs text-gray-500">
            JPG, PNG or WebP (max. 5MB)
          </p>
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-4 pt-4 border-t">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Display Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your name"
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            placeholder="Tell your audience about yourself"
            maxLength={160}
          />
          <p className="text-xs text-gray-500 mt-1">
            {bio?.length || 0}/160 characters
          </p>
        </div>
      </div>
    </div>
  );
}