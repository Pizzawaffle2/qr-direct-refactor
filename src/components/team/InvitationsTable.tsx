// src/components/team/InvitationsTable.tsx
import { Invitation } from '@/types/team';
import { Mail, Clock, XCircle, RotateCw } from 'lucide-react';

interface InvitationsTableProps {
  invitations: Invitation[];
  onCancel: (id: string) => void;
  onResend: (id: string) => void;
}

export function InvitationsTable({
  invitations,
  onCancel,
  onResend
}: InvitationsTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Role
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Invited By
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            Expires
          </th>
          <th className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {invitations.map((invitation) => (
          <tr key={invitation.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-900">{invitation.email}</span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                {invitation.role}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {invitation.invitedBy}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(invitation.expiresAt).toLocaleDateString()}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => onResend(invitation.id)}
                  className="text-gray-400 hover:text-blue-600"
                  title="Resend invitation"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onCancel(invitation.id)}
                  className="text-gray-400 hover:text-red-600"
                  title="Cancel invitation"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}