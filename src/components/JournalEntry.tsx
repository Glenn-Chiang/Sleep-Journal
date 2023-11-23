"use client";

import { updateEnergyLevel } from "@/actions/entries/mutations";
import {
  calculateDuration,
  convertDurationToHoursAndMinutes,
  formatDate
} from "@/lib/dateTime";
import {
  faBattery,
  faBed,
  faChevronDown,
  faChevronUp,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { useState } from "react";
import { ActivityEditor } from "./ActivityEditor";
import { EnergyScale } from "./EnergyScale";
import { TimeInput } from "./TimeInput";

type JournalEntryProps = {
  entry: Entry;
};

export const JournalEntry = ({ entry }: JournalEntryProps) => {
  const { sleepTime, wakeTime, activity, energyLevel } = entry;
  const sleepDate = formatDate(sleepTime);
  const wakeDate = wakeTime && formatDate(wakeTime);

  const sleepDuration = calculateDuration(sleepTime, wakeTime);
  const { hours: hoursOfSleep, minutes: minutesOfSleep } =
    convertDurationToHoursAndMinutes(sleepDuration);

  const handleEnergyClick = async (clickedLevel: number) => {
    await updateEnergyLevel(entry.id, clickedLevel);
  };

  const [previewMode, setPreviewMode] = useState(true);

  return (
    <article className="shadow bg-white p-4 rounded-xl w-full gap-8 grid grid-cols-1 sm:grid-cols-2">
      <h2 className="col-span-2 ">
        {sleepDate} - {wakeDate}
      </h2>

      <div className="flex gap-4 items-center col-span-2 sm:col-span-1">
        <div className=" flex gap-2 items-center text-slate-500">
          <FontAwesomeIcon icon={faBed} />
          <span>Slept for</span>
        </div>
        <h2 className="text-sky-500 sm:text-4xl">
          {hoursOfSleep}h {minutesOfSleep}min
        </h2>
      </div>

      <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
        <TimeInput
          label="Slept at"
          icon={faMoon}
          entry={entry}
          defaultValue={sleepTime}
        />
        <TimeInput
          label="Woke at"
          icon={faSun}
          entry={entry}
          defaultValue={wakeTime}
        />
      </div>

      {!previewMode && (
        <>
          <ActivityEditor entryId={entry.id} initialValue={activity} />

          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <label className="text-slate-500 flex gap-2 items-center">
              <FontAwesomeIcon icon={faBattery} />
              Energy level
            </label>
            <EnergyScale
              handleClick={handleEnergyClick}
              selectedValue={energyLevel}
            />
          </div>
        </>
      )}

      <div className="flex justify-between col-span-2">
        <button
          onClick={() => setPreviewMode((prev) => !prev)}
          className="flex gap-2 items-center justify-center text-sky-500 hover:bg-sky-100 w-max"
        >
          {previewMode ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
          {previewMode ? "Show more" : "Show less"}
        </button>
        <button className="bg-slate-100 text-red-500 hover:bg-red-100"> 
          Delete 
        </button>
      </div>
    </article>
  );
};
//TODO: Implement delete functionality