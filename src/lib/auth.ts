import { User } from "@prisma/client"

const currentUser: User = {
  id: 1,
  username: 'glenn',
  email: 'glennchiang24@gmail.com'
}

export const getCurrentUser = async () => {
  return currentUser
}