import { getUserEntries } from "@/actions/entries";
import { JournalEntry } from "@/components/JournalEntry";
import { getCurrentUser } from "@/lib/auth";
import { Entry } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const entries = await getUserEntries(currentUser.id);

  return (
    <>
      <Link
        href={"/add-entry"}
        className="shadow p-2 rounded-md bg-sky-100 text-sky-500 w-full text-center font-medium hover:bg-sky-200 hover:text-sky-600 transition"
      >
        Add entry
      </Link>
      <EntriesList entries={entries} />
    </>
  );
}

type EntriesListProps = {
  entries: Entry[];
};

const EntriesList = ({ entries }: EntriesListProps) => {
  if (!entries.length) {
    return (
      <p className="text-slate-500">You haven&apos;t recorded any sleep entries</p>
    )
  }

  return (
    <ul className="w-full flex flex-col gap-4">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </ul>
  );
};
