import prisma from "@/lib/db";

export const getUserEntries = async (userId: number) => {
  const entries = await prisma.entry.findMany({
    where: {
      userId,
    },
    orderBy: {
      sleepTime: "desc",
    },
  });

  return entries;
};

export const getEntry = async (userId: number, entryId: string) => {
  const entry = await prisma.entry.findUnique({
    where: {
      id: entryId
    }
  })

  // Unauthorized
  if (entry?.userId !== userId) {
    console.log("Unauthorized")
    return null
  }

  return entry
}

export const getUserCompletedEntries = async (userId: number) => {
  const entries = await prisma.entry.findMany({
    where: {
      userId,
      wakeTime: {
        not: null
      }
    },
    orderBy: {
      sleepTime: "desc",
    },
  });

  return entries;
};

export const getUserPendingEntries = async (userId: number) => {
  const entries = await prisma.entry.findMany({
    where: {
      userId,
      wakeTime: null
    },
    orderBy: {
      sleepTime: "desc",
    },
  });

  return entries;
};
