"use server";

import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

type EntryFields = {
  sleepTime: Date;
  wakeTime?: Date;
  activity?: string;
  energyLevel?: number;
  remarks?: string;
};

export const createEntry = async (entryFields: EntryFields) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error('Unauthenticated')
  }

  const entry = await prisma.entry.create({
    data: { ...entryFields, userId: currentUser.id },
  });

  revalidatePath("/");
  return entry;
};

export const deleteEntry = async (entryId: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  const entry = await prisma.entry.delete({
    where: {
      id: entryId,
    },
  });

  revalidatePath("/");
  return entry;
};

export const updateSleepTime = async (entryId: string, sleepTime: Date) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

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
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

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

export const updateActivity = async (
  entryId: string,
  activity: string | null
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

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

export const updateRemarks = async (
  entryId: string,
  remarks: string | null
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  const entry = await prisma.entry.update({
    where: {
      id: entryId,
    },
    data: {
      remarks,
    },
  });

  revalidatePath("/");
  return entry;
};



export const updateEnergyLevel = async (
  entryId: string,
  energyLevel: number
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

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

  revalidatePath("/");
  return entry;
};
