export type UserRole = 'admin' | 'cashier'

export interface Profile {
  id: string
  full_name: string
  role: UserRole
  created_at: string
}
