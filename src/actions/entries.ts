"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getUserEntries = async (userId: number) => {
  const entries = await prisma.entry.findMany({
    where: {
      userId,
    },
  });

  revalidatePath("/");
  return entries;
};

type EntryFields = {
  sleepTime: Date;
  wakeTime?: Date;
  activity?: string;
  energyLevel?: number;
};

export const createEntry = async (entryFields: EntryFields) => {
  const currentUserId = (await getCurrentUser()).id;

  const entry = await prisma.entry.create({
    data: { ...entryFields, userId: currentUserId },
  });

  return entry;
};

export const updateSleepTime = async (entryId: string, sleepTime: Date) => {
  const currentUserId = (await getCurrentUser()).id;

  const entry = await prisma.entry.update({
    where: {
      id: entryId,
    },
    data: {
      sleepTime,
    },
  });

  revalidatePath("/");
  return entry;
};

export const updateWakeTime = async (entryId: string, wakeTime: Date) => {
  const currentUserId = (await getCurrentUser()).id;

  const entry = await prisma.entry.update({
    where: {
      id: entryId,
    },
    data: {
      wakeTime,
    },
  });

  revalidatePath("/");
  return entry;
};

export const updateActivity = async (entryId: string, activity: string | null) => {
  const currentUserId = (await getCurrentUser()).id;

  const entry = await prisma.entry.update({
    where: {
      id: entryId,
    },
    data: {
      activity,
    },
  });

  revalidatePath("/");
  return entry;
};

export const updateEnergyLevel = async (entryId: string, energyLevel: number) => {
  const currentUserId = (await getCurrentUser()).id;

  // Energy level can only be 1-4
  if (energyLevel < 1 || energyLevel > 4) {
    throw new Error("Invalid energy level");
  }

  const entry = await prisma.entry.update({
    where: {
      id: entryId,
    },
    data: {
      energyLevel,
    },
  });

  revalidatePath('/')
  return entry;
};
