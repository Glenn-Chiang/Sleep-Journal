import { getUserCompletedEntries, getUserEntries, getUserPendingEntries } from "@/actions/entries/fetches";
import { JournalEntry } from "@/components/JournalEntry";
import { Summary } from "@/components/Summary";
import { TopButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import Link from "next/link";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const entries = currentUser ? await getUserEntries(currentUser.id) : [];
  const pendingEntries = currentUser ? await getUserPendingEntries(currentUser.id) : []
  const completedEntries = currentUser ? await getUserCompletedEntries(currentUser.id) : []

  return (
    <>
      <Summary entries={entries}/>      
      <Link
        href={"/add-entry"}
        className=" p-2 rounded-md bg-sky-100 text-sky-500 w-full sm:w-1/2 text-center font-medium hover:bg-sky-200 hover:text-sky-600 transition"
      >
        Add entry
      </Link>{" "}
      <section className="w-full flex flex-col gap-4">
        <h1 className="text-start p-2 flex gap-2 items-center">
          <FontAwesomeIcon icon={faBook} />
          Your Entries
        </h1>
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2>Pending entries</h2>
            <EntriesList entries={pendingEntries}/>
          </section>
          <section className="flex flex-col gap-4">
            <h2>Completed entries</h2>
            <EntriesList entries={completedEntries} />
          </section>
        </div>
      </section>
      <TopButton />
    </>
  );
}

type EntriesListProps = {
  entries: Entry[];
};

const EntriesList = ({ entries }: EntriesListProps) => {
  if (!entries.length) {
    return (
      <p className="text-slate-500">
        You haven&apos;t recorded any sleep entries
      </p>
    );
  }

  return (
    <ul className="w-full flex flex-col gap-4">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </ul>
  );
};
