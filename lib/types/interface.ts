export interface User {
  id: string
  password?: string | null
  name?: string | null
  email?: string | null
  role?: string | null
  userName?: string | null
  refresh_token?: string | null
  access_token?: string | null
  user?: string
  createdAt: string | undefined
  updatedAt: string | undefined
  image?: string | null
  emailVerified: string | null
}
