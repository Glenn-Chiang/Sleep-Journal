import { getUserEntries } from "@/actions/entries";
import { AddEntrySection } from "@/components/AddEntrySection";
import { JournalEntry } from "@/components/JournalEntry";
import { getCurrentUser } from "@/lib/auth";
import { Entry } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const entries = await getUserEntries(currentUser.id);

  return (
    <>
      <AddEntrySection/>
      <EntriesList entries={entries} />
    </>
  );
}

type EntriesListProps = {
  entries: Entry[];
};

const EntriesList = ({ entries }: EntriesListProps) => {
  return (
    <ul>
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </ul>
  );
};
