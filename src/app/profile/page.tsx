'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import { ExternalLink, Twitter, Linkedin, Github, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import InputField from '@/components/UI/InputField';

interface UserPreferences {
  defaultQRColor: string;
  defaultQRSize: number;
  defaultBackground: string;
}

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface FormData {
  name: string;
  picture: string;
  preferences: UserPreferences;
  socialLinks: SocialLinks;
}

const validateUrl = (url: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  );
  return !!pattern.test(url);
};

export default function ProfilePage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    picture: '',
    preferences: {
      defaultQRColor: '#000000',
      defaultQRSize: 256,
      defaultBackground: '#FFFFFF',
    },
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
      website: '',
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/api/auth/login');
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      setFetching(true);
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const data = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            ...data,
            picture: data.picture || user?.picture || '', // Default to Auth0 picture if none provided
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setFetching(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePictureUpload = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({ ...prevData, picture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Invalid file selected');
    }
  };

  const handleSocialLinkChange = (key: keyof SocialLinks, value: string) => {
    if (!value || validateUrl(value)) {
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [key]: value },
      });
    } else {
      toast.error('Invalid URL format');
    }
  };

  if (isLoading || fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const socialInputs = [
    { icon: <Twitter className="w-5 h-5 text-blue-400" />, key: 'twitter', placeholder: 'Twitter Profile URL' },
    { icon: <Linkedin className="w-5 h-5 text-blue-600" />, key: 'linkedin', placeholder: 'LinkedIn Profile URL' },
    { icon: <Github className="w-5 h-5" />, key: 'github', placeholder: 'GitHub Profile URL' },
    { icon: <Globe className="w-5 h-5 text-green-500" />, key: 'website', placeholder: 'Website URL' },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[rgb(var(--background-start))] to-[rgb(var(--background-end))]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Profile Settings
              </h1>
              <button
                onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="text-center">
                <div className="relative">
                  <img
                    src={formData.picture || user?.picture || '/default-avatar.png'}
                    alt={formData.name || 'Profile'}
                    className="w-32 h-32 rounded-full border-4 border-white/20"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 cursor-pointer bg-gray-200 hover:bg-gray-300 p-2 rounded-full">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleProfilePictureUpload(e.target.files?.[0]!)}
                      />
                      <span className="text-xs">Change</span>
                    </label>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <InputField
                  label="Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
                <InputField
                  label="Email"
                  type="email"
                  value={user?.email || ''}
                  onChange={() => {}}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <ExternalLink className="w-6 h-6" />
              Social Links
            </h2>
            <div className="space-y-4">
              {socialInputs.map(({ icon, key, placeholder }) => (
                <div key={key} className="flex items-center space-x-2">
                  {icon}
                  <InputField
                    label=""
                    type="url"
                    placeholder={placeholder}
                    value={formData.socialLinks[key as keyof SocialLinks] || ''}
                    onChange={(e) => handleSocialLinkChange(key as keyof SocialLinks, e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
