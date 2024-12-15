// src/app/link-shortener/components/LinkForm.tsx
import { useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { LinkFormData } from '@/app/link-shortener/types';

interface AliasInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface URLInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const URLInput: React.FC<URLInputProps> = ({ value, onChange }) => (
  <div>
    <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      URL to Shorten
    </label>
    <input
      id="url"
      type="url"
      value={value}
      onChange={onChange}
      placeholder="Enter your URL (e.g., https://example.com)"
      className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
);

const AliasInput: React.FC<AliasInputProps> = ({ value, onChange }) => (
  <div>
    <label htmlFor="alias" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      Custom Alias (Optional)
    </label>
    <input
      id="alias"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Custom alias (optional)"
      className="w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const SubmitButton: React.FC<{ isLoading: boolean; disabled: boolean }> = ({ isLoading, disabled }) => (
  <button
    type="submit"
    disabled={disabled}
    className={`
      w-full px-4 py-2 rounded-md text-white font-medium flex items-center justify-center gap-2
      ${disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'
      }
    `}
  >
    {isLoading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        Processing...
      </>
    ) : (
      <>
        <LinkIcon className="w-5 h-5" />
        Shorten Link
      </>
    )}
  </button>
);

interface LinkFormProps {
  onSubmit: (data: LinkFormData) => Promise<void>;
  isLoading: boolean;
}

export function LinkForm({ onSubmit, isLoading }: LinkFormProps) {
  const [formData, setFormData] = useState<LinkFormData>({
    url: '',
    alias: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm">
      <div className="space-y-4">
        <URLInput
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
        />

        <AliasInput
          value={formData.alias}
          onChange={(e) => setFormData(prev => ({ ...prev, alias: e.target.value }))}
        />

        <SubmitButton
          isLoading={isLoading}
          disabled={isLoading || !formData.url}
        />
      </div>
    </form>
  );
}