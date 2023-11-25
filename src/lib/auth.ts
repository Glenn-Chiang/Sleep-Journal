import { NextAuthOptions, getServerSession } from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import prisma from "./db"
import { useSession } from "next-auth/react"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ], 
  callbacks: {
    async signIn({user}) {
      if (!user.email) return false
      
      const matchedUser = await prisma.user.findUnique({
        where: {
          email: user.email
        }
      })

      // If there is no existing user with this email, create a user account with this email
      if (!matchedUser) {
        await prisma.user.create({
          data: {
            username: user.name || user.email, // Use email as username if there is no name associated with account
            email: user.email,
            avatarUrl: user.image        
          }
        })
      }

      return true
    },

    // On login, attach userid to token
    async jwt({token, profile}) {
      if (profile) {
        const user = await prisma.user.findUnique({
          where: {
            email: profile.email
          }
        })
        if (user) {
          token.userId = user.id
        }
        if (user?.admin) {
          token.admin = true
        }
      }
      return token
    },

    // Attach userId from token to session user object
    async session({session, token}) {
      if (session.user ) {
        session.user.id = token.userId
        session.user.admin = token.admin
      }
      return session
    }
  },

  pages: {
    signIn: '/login',
    signOut: '/logout'
  }
}

// Get current user on server-side
export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) return null
  return {id: user.id, admin: user.admin};
};

export const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user;
  if (!user) return null;
  return { id: user.id };
};