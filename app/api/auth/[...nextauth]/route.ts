import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import NextAuth, {AuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import {signJwtAccessToken, signJwtRefreshToken} from '@/lib/jwt'

const handler: AuthOptions = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {label: 'email', type: 'text'},
        password: {label: 'password', type: 'password'},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user || !user?.password) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials')
        } else {
          const {password, access_token, refresh_token, ...userWithoutPass} =
            user
          const access_tokens = signJwtAccessToken(userWithoutPass)
          const refresh_tokens = signJwtRefreshToken(userWithoutPass)
          if (refresh_token === null) {
            await prisma.user.update({
              where: {email: credentials.email},
              data: {refresh_token: refresh_tokens},
            })
            const result = {
              ...userWithoutPass,
              access_token: access_tokens,
              refresh_token: refresh_tokens,
            }
            return result
          } else {
            await prisma.user.update({
              where: {email: credentials.email},
              data: {refresh_token: null},
            })
            await prisma.user.update({
              where: {email: credentials.email},
              data: {refresh_token: refresh_tokens},
            })
            const result = {
              ...userWithoutPass,
              access_token: access_tokens,
              refresh_token: refresh_tokens,
            }
            return result
          }
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({token, account, user}) {
      return {...token, ...user, ...account}
    },
    async session({session, token}) {
      session.user = token as any
      return session
    },
  },
  pages: {
    signIn: '/user',
  },
})

export {handler as GET, handler as POST}