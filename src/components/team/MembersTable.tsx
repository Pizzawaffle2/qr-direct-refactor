// src/types/team.ts
import React from 'react';
import { Role as TeamRole, TeamMember } from '@/types/team';

export type Permission =
 | 'manage_team'
 | 'create_qr'
 | 'delete_qr'
 | 'view_analytics'
 | 'manage_billing'
 | 'api_access';

export type Role = 'owner' | 'admin' | 'editor' | 'viewer';

export interface RolePermissions {
 owner: Permission[];
 admin: Permission[];
 editor: Permission[];
 viewer: Permission[];
}

// Status types
export type MemberStatus = 'active' | 'pending' | 'inactive';
export type InvitationStatus = 'pending' | 'expired' | 'accepted';

// Invitation interface
export interface Invitation {
 id: string;
 email: string;
 role: Role;
 invitedBy: string;
 invitedAt: Date;
 status: InvitationStatus;
 expiresAt: Date;
 lastResent?: Date;
 resendCount?: number;
}

// Role change interface
export interface RoleChange {
 memberId: string;
 oldRole: Role;
 newRole: Role;
 changedBy: string;
 changedAt: Date;
}

// Role permissions mapping
export const ROLE_PERMISSIONS: RolePermissions = {
 owner: [
   'manage_team',
   'create_qr',
   'delete_qr',
   'view_analytics',
   'manage_billing',
   'api_access'
 ],
 admin: [
   'manage_team',
   'create_qr',
   'delete_qr',
   'view_analytics',
   'api_access'
 ],
 editor: [
   'create_qr',
   'delete_qr',
   'view_analytics'
 ],
 viewer: [
   'view_analytics'
 ]
};

// Helper functions
export function hasPermission(role: Role, permission: Permission): boolean {
 return ROLE_PERMISSIONS[role].includes(permission);
}

export const isValidRole = (role: string): role is Role => {
 return ['owner', 'admin', 'editor', 'viewer'].includes(role);
};

export const isValidPermission = (permission: string): permission is Permission => {
 const validPermissions: Permission[] = [
   'manage_team',
   'create_qr',
   'delete_qr',
   'view_analytics',
   'manage_billing',
   'api_access'
 ];
 return validPermissions.includes(permission as Permission);
};

export interface MembersTableProps {

  members: TeamMember[];

  editingMember: string | null;

  onEditRole: (memberId: string) => void;

  onRoleChange: (memberId: string, newRole: Role) => Promise<void>;

  onRemove: (memberId: string) => void;

}

export const MembersTable: React.FC<MembersTableProps> = ({ members }) => {
    return (
      <div>
        <h2>Members List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

// Removed duplicate TeamMember interface