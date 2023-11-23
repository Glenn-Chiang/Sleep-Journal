"use client";

import { CancelButton, SubmitButton } from "@/components/buttons";
import { faBattery, faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { EnergyScale } from "./EnergyScale";
import { Modal } from "./Modal";
import React from "react";
import { createEntry } from "@/actions/entries";

type AddEntryModalProps = {
  close: () => void;
};

export const AddEntryModal = ({ close }: AddEntryModalProps) => {
  const [isPending, setIsPending] = useState(false);

  const [sleepTime, setSleepTime] = useState<string | null>(null);
  const [wakeTime, setWakeTime] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number | null>(null);

  const handleEnergyClick = (clickedLevel: number) => {
    if (clickedLevel === energyLevel) {
      // Clicking a selected button will unselect it
      setEnergyLevel(null);
    } else {
      setEnergyLevel(clickedLevel);
    }
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    setIsPending(true);
    event.preventDefault();
    // await createEntry({
    //   sleepTime: new Date(sleepTime)
    // })
  };

  return (
    <Modal>
      <h1>Add an entry</h1>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="sleepTime" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBed} className="text-sky-500" />
            When did you go to bed?
          </label>
          <input
            onChange={(event) => setSleepTime(event.target.value)}
            id="sleepTime"
            type="datetime-local"
            className="w-min"
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="activity" className="flex gap-2 items-center">
            What were you doing before bed?
          </label>
          <textarea
            onChange={(event) => setActivity(event.target.value)}
            id="activity"
            className="rounded-md shadow bg-slate-100 h-[10vh] p-2"
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="wakeTime" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
            When did you wake up?
          </label>
          <input
            onChange={(event) => setWakeTime(event.target.value)}
            id="sleepTime"
            type="datetime-local"
            className="w-min"
            disabled={isPending}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBattery} className="text-teal-500" />
            How would you rate your energy level?
          </p>
          <EnergyScale
            handleClick={handleEnergyClick}
            selectedValue={energyLevel}
          />
        </div>

        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};
