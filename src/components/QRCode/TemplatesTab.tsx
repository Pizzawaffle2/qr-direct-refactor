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
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Quick Start Templates</h3>
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {QR_TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template)}
              className={`p-4 border rounded-lg transition-all hover:shadow-md ${
                selectedTemplateId === template.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="aspect-square mb-2">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <p className="font-medium text-sm">{template.name}</p>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}