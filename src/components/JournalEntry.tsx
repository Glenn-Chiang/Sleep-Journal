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
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { ActivityEditor } from "./ActivityEditor";
import { EnergyScale } from "./EnergyScale";

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

  const handleSleepTimeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    const newSleepTime = new Date(event.target.value);
    await updateSleepTime(entry.id, newSleepTime);
  };

  const handleWakeTimeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async (event) => {
    const newWakeTime = new Date(event.target.value);
    await updateWakeTime(entry.id, newWakeTime);
  };

  const handleEnergyClick = async (clickedLevel: number) => {
    await updateEnergyLevel(entry.id, clickedLevel);
  };

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
        <div className="flex gap-2">
          <label
            htmlFor={`sleepTime-${entry.id}`}
            className="text-slate-500 flex gap-1 items-center flex-col sm:flex-row"
          >
            <FontAwesomeIcon icon={faMoon} />
            Slept at
          </label>{" "}
          <input
            id={`sleepTime-${entry.id}`}
            type="datetime-local"
            defaultValue={formatDatetime(sleepTime)}
            onChange={handleSleepTimeChange}
            className="bg-slate-100"
          />
        </div>
        <div className="flex gap-2">
          <label
            htmlFor={`wakeTime-${entry.id}`}
            className="text-slate-500 flex gap-1 items-center flex-col sm:flex-row"
          >
            <FontAwesomeIcon icon={faSun} />
            Woke at
          </label>{" "}
          <input
            id={`wakeTime-${entry.id}`}
            type="datetime-local"
            defaultValue={wakeTime ? formatDatetime(wakeTime) : undefined}
            onChange={handleWakeTimeChange}
            className="bg-slate-100"
          />
        </div>
      </div>

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
    </article>
  );
};
