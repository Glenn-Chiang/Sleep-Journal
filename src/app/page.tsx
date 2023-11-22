import { getUserEntries } from "@/actions/entries";
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
      <Link
        href={"/create-entry"}
        className="shadow p-2 rounded-md bg-sky-100 text-sky-500 w-full text-center font-bold hover:bg-sky-200 hover:text-sky-600 transition"
      >
        Add Entry
      </Link>
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
