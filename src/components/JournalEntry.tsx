"use client";

import {
  updateActivity,
  updateEnergyLevel,
  updateRemarks,
} from "@/actions/entries/mutations";
import {
  calculateDuration,
  convertDurationToHoursAndMinutes,
  formatDate,
} from "@/lib/timeCalculations";
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
import { TextEditor } from "./TextEditor";
import { EnergyScale } from "./EnergyScale";
import { TimeInput } from "./TimeInput";
import { DeleteEntryModal } from "./DeleteEntryModal";
import { getCurrentUser, useCurrentUser } from "@/lib/auth";

type JournalEntryProps = {
  entry: Entry;
};

export const JournalEntry = ({ entry }: JournalEntryProps) => {
  const { sleepTime, wakeTime, activity, energyLevel, remarks } = entry;
  const sleepDate = formatDate(sleepTime);
  const wakeDate = wakeTime && formatDate(wakeTime);

  const sleepDuration = calculateDuration(sleepTime, wakeTime);
  const { hours: hoursOfSleep, minutes: minutesOfSleep } =
    convertDurationToHoursAndMinutes(sleepDuration);

  const pending = !wakeTime;
  const [previewMode, setPreviewMode] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const currentUser = useCurrentUser();
  const authorized = currentUser?.id === entry.userId;

  return (
    <article
      className={`shadow bg-white p-4 rounded-xl w-full gap-8 grid grid-cols-1 sm:grid-cols-2`}
    >
      <div className="flex justify-between w-full col-span-2">
        <h2 className="col-span-2 ">
          {sleepDate} - {wakeDate}
        </h2>
        {pending && (
          <span className="bg-teal-200 text-teal-600 p-2 w-max rounded-full">
            Pending
          </span>
        )}
      </div>

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
        <div className="flex items-center gap-2">
          <span className="flex gap-1 items-center">
            <FontAwesomeIcon icon={faMoon} className="text-sky-500" />
            <span className="text-slate-500">Slept at</span>
          </span>
          <span>{sleepDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex gap-1 items-center">
            <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
            <span className="text-slate-500">Woke at</span>
          </span>
          <span>{wakeDate || "-"}</span>
        </div>
      </div>

      {!previewMode && (
        <>
          <div className="flex flex-col gap-2">
            <p>Activity before sleeping</p>
            <p className="bg-slate-100 p-2 rounded">{activity}</p>
          </div>

          <div className="flex flex-col gap-2 col-span-2 sm:col-span-1">
            <label className="text-slate-500 flex gap-2 items-center">
              <FontAwesomeIcon icon={faBattery} />
              Energy level
            </label>
          </div>

          {remarks && (
            <div className="flex flex-col gap-2">
              <p>Remarks</p>
              <p className="bg-slate-100 p-2 rounded">{remarks}</p>
            </div>
          )}
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

        {authorized && (
          <button
            onClick={() => setDeleteModalIsOpen(true)}
            className="bg-slate-100 text-red-500 hover:bg-red-100"
          >
            Delete
          </button>
        )}
      </div>
      {deleteModalIsOpen && (
        <DeleteEntryModal
          entryId={entry.id}
          close={() => setDeleteModalIsOpen(false)}
        />
      )}
    </article>
  );
};
