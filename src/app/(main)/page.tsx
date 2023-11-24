import {
  getUserCompletedEntries,
  getUserEntries,
  getUserPendingEntries,
} from "@/actions/entries/fetches";
import { JournalEntry } from "@/components/JournalEntry";
import { Summary } from "@/components/Summary";
import { TopButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";
import {
  faBook,
  faCheckCircle,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUser = await getCurrentUser();
  const entries = currentUser ? await getUserEntries(currentUser.id) : [];
  const completedEntries = entries.filter((entry) => entry.wakeTime);
  const pendingEntries = entries.filter((entry) => !entry.wakeTime);

  const statusParam = searchParams.status;
  const displayedEntries =
    statusParam === "pending" ? pendingEntries : completedEntries;

  return (
    <>
      <Summary entries={entries} />
      <Link
        href={"/add-entry"}
        className=" p-2 rounded-md bg-sky-100 text-sky-500 w-full sm:w-1/2 text-center font-medium hover:bg-sky-200 hover:text-sky-600 transition"
      >
        Add entry
      </Link>{" "}
      <section className="w-full flex flex-col gap-4">
        <h1 className="text-start flex gap-2 items-center">
          <FontAwesomeIcon icon={faBook} />
          Your Entries
        </h1>
        <nav className="flex gap-4">
          <Link
            href={"?status=pending"}
            className={`flex gap-2 items-center text-xl ${
              statusParam === "pending" &&
              "text-sky-500 border-b-2 border-sky-500"
            }`}
          >
            <FontAwesomeIcon icon={faHourglassHalf} />
            Pending ({pendingEntries.length})
          </Link>
          <Link
            href={"?status=completed"}
            className={`flex gap-2 items-center text-xl ${
              statusParam !== "pending" &&
              "text-sky-500 border-b-2 border-sky-500"
            }`}
          >
            <FontAwesomeIcon icon={faCheckCircle} />
            Completed
          </Link>
        </nav>
        <EntriesList entries={displayedEntries} />
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
    return <p className="text-slate-500">No entries</p>;
  }

  return (
    <ul className="w-full flex flex-col gap-4">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </ul>
  );
};
