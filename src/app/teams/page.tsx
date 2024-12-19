'use client';

import { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  CheckCircle,
  XCircle,
  MoreVertical,
  Edit,
  Trash,
  Clock,
  AlertCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { TeamMember, Invitation, Role, hasPermission } from '@/types/team';
import { usePermissions } from '@/hooks/usePermissions';
import { MembersTable } from '@/components/team/MembersTable';
import { InvitationsTable } from '@/components/team/InvitationsTable';
import { InviteModal } from '@/components/team/InviteModal';
import { ErrorState } from '@/components/team/ErrorState';
import { TableSkeleton } from '@/components/team/TableSkeleton';

export default function TeamPage() {
  const { can, isAdmin } = usePermissions();
  const [isInviting, setIsInviting] = useState(false);
  const [showInvitations, setShowInvitations] = useState(false);
  const [editingMember, setEditingMember] = useState<string | null>(null);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [membersRes, invitationsRes] = await Promise.all([
          fetch('/api/team/members'),
          fetch('/api/team/invitations'),
        ]);

        if (membersRes.ok && invitationsRes.ok) {
          const [membersData, invitationsData] = await Promise.all([
            membersRes.json(),
            invitationsRes.json(),
          ]);
          setMembers(membersData);
          setInvitations(invitationsData);
        } else {
          throw new Error('Failed to fetch team data');
        }
      } catch (error) {
        setError('Failed to load team data');
        toast.error('Failed to load team data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const handleInvite = async (email: string, role: string) => {
    try {
      const response = await fetch('/api/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send invitation');
      }
  
      const newInvitation = await response.json();
      setInvitations((prev) => [...prev, newInvitation]);
      toast.success('Invitation sent successfully!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to send invitation');
      } else {
        toast.error('Failed to send invitation');
      }
    }
  };
  
  // Inside TeamPage component
  <InviteModal onClose={() => setIsInviting(false)} onSubmit={handleInvite} />;
  

  const handleRoleChange = async (memberId: string, newRole: Role) => {
    try {
      const response = await fetch(`/api/team/members/${memberId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error();

      setMembers(
        members.map((member) =>
          member.id === memberId ? { ...member, role: newRole } : member
        )
      );
      setEditingMember(null);
      toast.success('Role updated successfully');
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;

    try {
      const response = await fetch(`/api/team/members/${memberId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error();

      setMembers(members.filter((member) => member.id !== memberId));
      toast.success('Team member removed');
    } catch (error) {
      toast.error('Failed to remove team member');
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      const response = await fetch(`/api/team/invitations/${invitationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error();

      setInvitations(invitations.filter((inv) => inv.id !== invitationId));
      toast.success('Invitation cancelled');
    } catch (error) {
      toast.error('Failed to cancel invitation');
    }
  };

  const handleResendInvitation = async (invitationId: string) => {
    try {
      const response = await fetch(`/api/team/invitations/${invitationId}/resend`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error();

      const updatedInvitation = await response.json();
      setInvitations(
        invitations.map((inv) =>
          inv.id === invitationId ? updatedInvitation : inv
        )
      );
      toast.success('Invitation resent');
    } catch (error) {
      toast.error('Failed to resend invitation');
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Team</h1>
        {can('manage_team') && (
          <button
            onClick={() => setIsInviting(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <UserPlus className="w-5 h-5" />
            Invite Member
          </button>
        )}
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowInvitations(false)}
          className={`px-4 py-2 rounded-lg ${
            !showInvitations ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
        >
          Members ({members.length})
        </button>
        <button
          onClick={() => setShowInvitations(true)}
          className={`px-4 py-2 rounded-lg ${
            showInvitations ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
        >
          Pending Invitations ({invitations.filter((inv) => inv.status === 'pending').length})
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <TableSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        ) : !showInvitations ? (
          <MembersTable
            members={filteredMembers}
            editingMember={editingMember}
            onEditRole={setEditingMember}
            onRoleChange={handleRoleChange}
            onRemove={handleRemoveMember}
          />
        ) : (
          <InvitationsTable
            invitations={invitations}
            onCancel={handleCancelInvitation}
            onResend={handleResendInvitation}
          />
        )}
      </div>

      {isInviting && (
        <InviteModal onClose={() => setIsInviting(false)} onSubmit={handleInvite} />
      )}
    </div>
  );
}