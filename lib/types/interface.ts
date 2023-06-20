export interface User {
  id: string
  hashedPassword?: string | null
  name?: string | null
  email?: string | null | undefined
  role?: string | null
  refresh_token?: string | null
  access_token?: string | null
  user?: string
  createdAt: string | undefined
  updatedAt: string | undefined
  image?: string | null
  hasNotification: boolean | null
  bio?: string | null
  coverImage?: string | null
  profileImage?: string | null | undefined
  username?: string | null
  followingIds? :   String[]  
}
