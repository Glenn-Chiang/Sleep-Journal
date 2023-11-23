import { getUserEntries } from "@/actions/entries/fetches";
import { JournalEntry } from "@/components/JournalEntry";
import { TopButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";
import { calculateAverageTime, calculateDuration } from "@/lib/dateTime";
import { faBed, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import Link from "next/link";
import { formatTime, convertDurationToHoursAndMinutes } from "../lib/dateTime";
import { Summary } from "@/components/Summary";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const entries = await getUserEntries(currentUser.id);

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
        <h2 className="text-start p-2 flex gap-2 items-center">
          <FontAwesomeIcon icon={faBook} />
          Your Entries
        </h2>
        <EntriesList entries={entries} />
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
