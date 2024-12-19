// src/components/team/EmailPreview.tsx
import { useState } from 'react';
import { Mail, Eye } from 'lucide-react';

interface EmailTemplateProps {
  type: 'invitation' | 'role_change' | 'removal';
  data: {
    recipientName?: string;
    recipientEmail: string;
    role?: string;
    inviterName?: string;
    teamName?: string;
  };
}

export function EmailPreview({ type, data }: EmailTemplateProps) {
  const [showPreview, setShowPreview] = useState(false);

  const getTemplateContent = () => {
    switch (type) {
      case 'invitation':
        return {
          subject: `Join ${data.teamName} on QR Direct`,
          body: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>You're invited to join ${data.teamName}</h2>
              <p>${data.inviterName} has invited you to join their team as a ${data.role}.</p>
              <p>Click the button below to accept the invitation:</p>
              <a href="#" style="display: inline-block; padding: 12px 24px; background: #3B82F6; color: white; text-decoration: none; border-radius: 6px;">
                Accept Invitation
              </a>
            </div>
          `
        };
      case 'role_change':
        return {
          subject: 'Your role has been updated',
          body: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Your role has been updated</h2>
              <p>Your role has been updated to ${data.role}.</p>
              <p>If you have any questions, please contact your team administrator.</p>
            </div>
          `
        };
      default:
        return {
          subject: 'Default Subject',
          body: 'Default Content'
        };
    }
  };

  const template = getTemplateContent();

  return (
    <>
      <button
        onClick={() => setShowPreview(true)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
      >
        <Eye className="w-4 h-4" />
        Preview Email
      </button>

      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <h3 className="font-medium">Email Preview</h3>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="text-sm text-gray-500">To:</div>
                <div>{data.recipientEmail}</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500">Subject:</div>
                <div>{template.subject}</div>
              </div>
              <div className="border rounded-lg p-4">
                <div 
                  dangerouslySetInnerHTML={{ __html: template.body }}
                  className="prose prose-sm max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}