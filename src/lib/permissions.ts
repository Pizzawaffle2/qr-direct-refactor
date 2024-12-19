// src/lib/permissions.ts
type Permission = 'manage_team' | 'create_qr' | 'delete_qr' | 'view_analytics' | 'manage_billing' | 'api_access';
type Role = 'owner' | 'admin' | 'editor' | 'viewer';
type RolePermissions = Record<Role, Permission[]>;

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
  
  export function hasPermission(role: Role, permission: Permission): boolean {
    return ROLE_PERMISSIONS[role].includes(permission);
  }