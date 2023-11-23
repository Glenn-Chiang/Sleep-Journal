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

export default async function Home() {
  const currentUser = await getCurrentUser();
  const entries = await getUserEntries(currentUser.id);
  const sleepTimes = entries.map((entry) => entry.sleepTime);
  const averageSleepTime = calculateAverageTime(sleepTimes);
  const wakeTimes = entries
    .filter((entry) => entry.wakeTime !== null)
    .map((entry) => entry.wakeTime) as Date[];
  const averageWakeTime = calculateAverageTime(wakeTimes);
  const averageSleepDuration = convertDurationToHoursAndMinutes(
    calculateDuration(averageSleepTime, averageWakeTime)
  );

  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-500 bg-white rounded-xl p-4 w-full">
        <div className="flex flex-col gap-2 text-black">
          <h2>Average sleep duration</h2>
          <div className="flex gap-4 items-center text-sky-500">
            <FontAwesomeIcon icon={faBed} />
            {entries.length ? (
              <span className="text-3xl sm:text-4xl ">
                {averageSleepDuration.hours}h {averageSleepDuration.minutes}min
              </span>
            ) : (
              <span className="text-sky-500">-</span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex gap-2 items-center">
            <span>Average time you go to bed</span>
            <span className="text-sky-500">
              {entries.length ? formatTime(averageSleepTime) : "-"}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span>Average time you wake up</span>
            <span className="text-sky-500">
              {entries.length ? formatTime(averageWakeTime) : "-"}
            </span>
          </div>
        </div>
      </section>
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
