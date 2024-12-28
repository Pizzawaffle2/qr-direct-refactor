// src/components/QRCode/TemplatesTab.tsx
import { QRTemplate } from '@/types/qr';
import { QR_TEMPLATES } from '@/constants/qr-templates';

interface TemplatesTabProps {
  onTemplateSelect: (template: QRTemplate) => void;
  selectedTemplateId: string | null;
}

export function TemplatesTab({ onTemplateSelect, selectedTemplateId }: TemplatesTabProps) {
  return (
    <div className="space-y-4">
      <div className="glass-card p-6 rounded-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Start Templates</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {QR_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className={`p-4 border rounded-lg transition-all hover:shadow-md flex flex-col items-center gap-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 ${
                selectedTemplateId === template.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 ring-2 ring-blue-200'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
              }`}
            >
              <div className="aspect-square w-full mb-2">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">{template.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 text-gray-600 dark:text-gray-400 text-sm text-center">
          Scroll to view more templates
        </div>
      </div>
    </div>
  );
}
