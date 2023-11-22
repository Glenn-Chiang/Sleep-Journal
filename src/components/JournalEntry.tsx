"use client";

import { formatDate } from "@/lib/dateTime";
import { faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { formatTime } from "../lib/dateTime";
import { useEffect, useState, useRef } from "react";
import { CancelButton, SubmitButton } from "./buttons";

type JournalEntryProps = {
  entry: Entry;
};

export const JournalEntry = ({ entry }: JournalEntryProps) => {
  const { sleepTime, wakeTime, activity, energyLevel } = entry;
  const sleepDate = formatDate(sleepTime); //TODO:Format date nicely with luxon
  const wakeDate = wakeTime && formatDate(wakeTime);

  const handleSleepTimeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {};

  const [inEditMode, setInEditMode] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (inEditMode) {
      textRef.current?.focus()
    }
  }, [inEditMode])

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
          className="bg-slate-100"
        />
      </section>

      <section className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <span className="text-sky-500">Activity before sleeping</span>
          <button
            onClick={() => setInEditMode((prev) => !prev)}
            className="w-max px-4 bg-sky-100 text-sky-500"
          >
            Edit
          </button>
        </div>
        <textarea
        ref={textRef}
          autoFocus={inEditMode}
          disabled={!inEditMode}
          className="p-2 bg-slate-100 rounded-md"
          defaultValue={activity || ""}
        />
        {inEditMode && (
          <div className="flex gap-2">
            <SubmitButton>Save</SubmitButton>
            <CancelButton onClick={() => setInEditMode(false)} />
          </div>
        )}
      </section>
    </article>
  );
};
