import { formatDate } from "@/lib/dateTime";
import { faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { formatTime } from "../lib/dateTime";

type JournalEntryProps = {
  entry: Entry;
};

export const JournalEntry = ({ entry }: JournalEntryProps) => {
  const { sleepTime, wakeTime, activity, energyLevel } = entry;
  const sleepDate = formatDate(sleepTime); //TODO:Format date nicely with luxon
  const wakeDate = wakeTime && formatDate(wakeTime);

  return (
    <article className="shadow bg-white p-4 rounded-xl w-full flex flex-col gap-4">
      <h2>
        {sleepDate} - {wakeDate}
      </h2>
      <section className="flex gap-2">
        <span className="text-sky-500 flex gap-1 items-center">
          <FontAwesomeIcon icon={faBed} />
          Slept at
        </span>{" "}
        <input
          type="time"
          defaultValue={formatTime(sleepTime)}
          className="bg-slate-100"
        />
      </section>
      <section className="flex gap-2">
        <span className="text-sky-500 flex gap-1 items-center">
          <FontAwesomeIcon icon={faSun} />
          Woke at
        </span>{" "}
        <input
          type="time"
          defaultValue={wakeTime ? formatTime(wakeTime) : undefined}
          className="bg-slate-100"
        />
      </section>

      <section className="flex flex-col gap-2">
        <span className="text-sky-500">Activity before sleeping</span>
        <p className="p-2 bg-slate-100 rounded-md">{activity}</p>
      </section>
    </article>
  );
};
