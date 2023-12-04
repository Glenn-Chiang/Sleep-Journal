"use client";

import { useCurrentUser } from "@/lib/auth";
import {
  calculateDuration,
  convertDurationToHoursAndMinutes,
  formatDate,
} from "@/lib/timeCalculations";
import {
  faBattery,
  faBed,
  faCheck,
  faChevronDown,
  faChevronUp,
  faCoffee,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { useState } from "react";
import { DeleteEntryModal } from "./DeleteEntryModal";
import { EnergyButton, energyOptions } from "./EnergyScale";
import Link from "next/link";

type JournalEntryProps = {
  entry: Entry;
};

export const JournalEntry = ({ entry }: JournalEntryProps) => {
  const {
    sleepTime,
    wakeTime,
    readMaterial,
    reason,
    activity,
    energyLevel,
    caffeineEffect,
    remarks,
  } = entry;
  const sleepDate = formatDate(sleepTime);
  const wakeDate = wakeTime && formatDate(wakeTime);

  const sleepDuration = calculateDuration(sleepTime, wakeTime);
  const { hours: hoursOfSleep, minutes: minutesOfSleep } =
    convertDurationToHoursAndMinutes(sleepDuration);

  const energyOption = energyOptions.find(
    (energyOption) => energyOption.value === energyLevel
  );

  const pending = !wakeTime;
  const [previewMode, setPreviewMode] = useState(true);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const currentUser = useCurrentUser();
  const authorized = currentUser?.id === entry.userId;

  return (
    <article
      className={`shadow bg-white p-4 rounded-xl w-full gap-8 flex flex-col`}
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

      <div className="flex gap-4 items-center ">
        <div className=" flex gap-2 items-center text-slate-500">
          <FontAwesomeIcon icon={faBed} />
          <span>Slept for</span>
        </div>
        <h2 className="text-sky-500 sm:text-4xl">
          {hoursOfSleep}h {minutesOfSleep}min
        </h2>
      </div>

      <div className="flex flex-col gap-4 ">
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
          {readMaterial ? (
            <p className="bg-emerald-100 p-2 rounded text-emerald-600 w-fit">
              I read the material for at least 30min before sleeping{" "}
              <FontAwesomeIcon icon={faCheck} />
            </p>
          ) : (
            <>
              <p className="bg-yellow-100 p-2 rounded text-yellow-700 w-fit">
                I did not read the material for at least 30min before sleeping
              </p>
              <div className="flex flex-col gap-2">
                <p className="text-slate-500">
                  Why I didn&apos;t read the material
                </p>
                <p className="bg-slate-100 p-2 rounded">{reason}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-slate-500">What I did instead</p>
                <p className="bg-slate-100 p-2 rounded">{activity}</p>
              </div>
            </>
          )}

          {energyLevel && (
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="text-slate-500 flex gap-2 items-center">
                <FontAwesomeIcon icon={faBattery} className="text-teal-500" />
                Energy level
              </label>
              {energyOption && (
                <EnergyButton
                  label={energyOption?.label}
                  icon={energyOption.icon}
                  disabled={true}
                />
              )}
            </div>
          )}

          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faCoffee} className="text-amber-900" />
            <p className="text-slate-500">
              {caffeineEffect
                ? "Caffeine affected my sleep"
                : "Caffeine did not affect my sleep"}
            </p>
          </div>

          {remarks && (
            <div className="flex flex-col gap-2">
              <p className="text-slate-500">Remarks</p>
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
          <div className="flex gap-2">
            <Link href={`/entry/${entry.id}/edit`} className="bg-slate-100 p-2 rounded-md w-16 text-center hover:bg-slate-200">
              Edit
            </Link>
            <button
              onClick={() => setDeleteModalIsOpen(true)}
              className="bg-slate-100 text-red-500 hover:bg-red-100 w-16"
            >
              Delete
            </button>
            
          </div>
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
