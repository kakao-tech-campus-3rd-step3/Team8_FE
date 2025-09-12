export type UserRole = 'creator' | 'editor' | 'viewer';

export type User = {
  id: number;
  name: string;
  role: UserRole;
};