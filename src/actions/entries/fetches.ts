import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getUserEntries = async (userId: number) => {
  const entries = await prisma.entry.findMany({
    where: {
      userId,
    },
    orderBy: {
      sleepTime: "desc",
    },
  });

  revalidatePath("/");
  return entries;
};


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

  revalidatePath("/");
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

  revalidatePath("/");
  return entries;
};
