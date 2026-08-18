// Local dataset for the DataLoader mini-app. Works fully offline.
// Kept here (not shared) so the module is self-contained.
//
//   1 Ada     3 Grace
//   2 Alan    4 Linus
import type { User } from "../components/UserList.tsx";

export const USERS: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
  { id: 3, name: "Grace" },
  { id: 4, name: "Linus" },
];

/**
 * Default async loader for the UserList feature. Resolves to the local users
 * after a tick so the loading state is observable; injectable in tests via the
 * `loadUsers` prop.
 */
export function loadUsers(): Promise<User[]> {
  return new Promise((resolve) => setTimeout(() => resolve(USERS), 0));
}
