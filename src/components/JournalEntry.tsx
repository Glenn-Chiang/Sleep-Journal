"use client";

import {
  updateEnergyLevel,
  updateSleepTime,
  updateWakeTime,
} from "@/actions/entries";
import {
  calculateDuration,
  convertDurationToHoursAndMinutes,
  formatDate,
  formatDatetime,
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
import { ActivityEditor } from "./ActivityEditor";
import { EnergyScale } from "./EnergyScale";
import { TimeInput } from "./TimeInput";
import { useState } from "react";

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
      <h2 className="sm:col-span-2 ">
        {sleepDate} - {wakeDate}
      </h2>

      <div className="flex gap-2 items-center ">
        <div className=" flex gap-2 items-center text-slate-500">
          <FontAwesomeIcon icon={faBed} />
          <span>Slept for</span>
        </div>
        <h2 className="text-sky-500 sm:text-4xl">
          {hoursOfSleep}h {minutesOfSleep}min
        </h2>
      </div>

      <div className="flex flex-col gap-4 ">
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

          <div className="flex flex-col gap-2">
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
    </article>
  );
};
