import { getCurrentUser } from "@/lib/auth";
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

export const getAverageSleepDuration = async (userId: number) => {
   
}