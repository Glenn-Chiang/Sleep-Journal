"use client";

import { updateSleepTime, updateWakeTime } from "@/actions/entries";
import { formatDate } from "@/lib/dateTime";
import { faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { formatTime } from "../lib/dateTime";
import { ActivityEditor } from './ActivityEditor';

type JournalEntryProps = {
  entry: Entry;
};

export const JournalEntry = ({ entry }: JournalEntryProps) => {
  const { sleepTime, wakeTime, activity, energyLevel } = entry;
  const sleepDate = formatDate(sleepTime); //TODO:Format date nicely with luxon
  const wakeDate = wakeTime && formatDate(wakeTime);

  const handleSleepTimeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    const newSleepTime = event.target.valueAsDate;
    if (!newSleepTime) return;
    await updateSleepTime(entry.id, newSleepTime);
  };

  const handleWakeTimeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    const newWakeTime = event.target.valueAsDate;
    if (!newWakeTime) return;
    await updateWakeTime(entry.id, newWakeTime);
  };

  
  return (
    <article className="shadow bg-white p-4 rounded-xl w-full flex flex-col gap-4">
      <h2>
        {sleepDate} - {wakeDate}
      </h2>
      <section className="flex gap-2">
        <label
          htmlFor={`sleepTime-${entry.id}`}
          className="text-sky-500 flex gap-1 items-center"
        >
          <FontAwesomeIcon icon={faBed} />
          Slept at
        </label>{" "}
        <input
          id={`sleepTime-${entry.id}`}
          type="time"
          defaultValue={formatTime(sleepTime)}
          onChange={handleSleepTimeChange}
          className="bg-slate-100"
        />
      </section>
      <section className="flex gap-2">
        <label
          htmlFor={`wakeTime-${entry.id}`}
          className="text-sky-500 flex gap-1 items-center"
        >
          <FontAwesomeIcon icon={faSun} />
          Woke at
        </label>{" "}
        <input
          id={`wakeTime-${entry.id}`}
          type="time"
          defaultValue={wakeTime ? formatTime(wakeTime) : undefined}
          onChange={handleWakeTimeChange}
          className="bg-slate-100"
        />
      </section>

      <ActivityEditor initialValue={activity}/>
    </article>
  );
};
