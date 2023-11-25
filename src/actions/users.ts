import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/db"

export const getUsers = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser?.admin) {
    throw new Error("Unauthorized")
  }

  const users = await prisma.user.findMany({})
  return users
}