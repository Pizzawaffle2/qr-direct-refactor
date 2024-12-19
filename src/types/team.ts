// src/types/team.ts

export type Permission =
  | 'manage_team'
  | 'create_qr'
  | 'delete_qr'
  | 'view_analytics'
  | 'manage_billing'
  | 'api_access';

export type Role = 'ADMIN' | 'MEMBER' | 'VIEWER';

export const ROLES = ['ADMIN', 'MEMBER', 'VIEWER'] as const;

// Define ROLE_PERMISSIONS
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: [
    'manage_team',
    'create_qr',
    'delete_qr',
    'view_analytics',
    'manage_billing',
    'api_access',
  ],
  MEMBER: ['create_qr', 'delete_qr', 'view_analytics'],
    VIEWER: ['view_analytics']
  };

// Add helper functions
export const isValidRole = (role: string): role is Role => {
  return ['ADMIN', 'MEMBER', 'VIEWER'].includes(role);
}

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
}

export function hasPermission(role: Role, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS[role];
    if (!permissions) {
      console.warn(`Role ${role} does not exist in ROLE_PERMISSIONS.`);
      return false;
    }
    return permissions.includes(permission);
  }
  

// interface RolePermissions {
export interface RolePermissions {
  ADMIN: string[];
  MEMBER: string[];
  VIEWER: string[];
}

export type MemberStatus = 'active' | 'pending' | 'inactive';

export type InvitationStatus = 'pending' | 'expired' | 'accepted';

// interface TeamMember {
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: MemberStatus;
  joinedAt: Date;
  lastActive?: Date;
  avatarUrl?: string;
}

// interface Invitation {
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

// interface RoleChange {
export interface RoleChange {
  memberId: string;
  oldRole: Role;
  newRole: Role;
  changedBy: string;
  changedAt: Date;
}