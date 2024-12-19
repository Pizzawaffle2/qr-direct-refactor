// src/hooks/usePermissions.ts
import { useUser } from '@auth0/nextjs-auth0/client';
import { Permission, Role, hasPermission } from '@/types/team';

export function usePermissions() {
  const { user } = useUser();
  const userRole = user?.role as Role || 'viewer';

  return {
    can: (permission: Permission) => hasPermission(userRole, permission),
    role: userRole,
    isOwner: userRole === 'owner' as Role,
    isAdmin: userRole === 'admin' as Role,
    isEditor: userRole === 'editor' as Role,
    isViewer: userRole === 'viewer' as Role
  };
}

// Example usage:
// import { usePermissions } from './usePermissions';
// 
// export function SomeComponent() {
//   const { can, isAdmin } = usePermissions();
//
//   return (
//     <div>
//       {can('manage_team') && (
//         <button>Manage Team</button>
//       )}
//       
//       {isAdmin && (
//         <button>Admin Only Action</button>
//       )}
//     </div>
//   );
// }