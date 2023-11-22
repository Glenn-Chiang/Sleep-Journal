"use client";

import { CancelButton, SubmitButton } from "@/components/buttons";
import {
  IconDefinition,
  faBattery,
  faBed,
  faFaceDizzy,
  faFaceFlushed,
  faFaceGrimace,
  faFaceSadTear,
  faFaceSmile,
  faFaceTired,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Modal } from "./Modal";
import { EnergyScale } from "./EnergyScale";

type AddEntryModalProps = {
  close: () => void;
};

export const AddEntryModal = ({ close }: AddEntryModalProps) => {
  const [isPending, setIsPending] = useState(false);
  const [energyLevel, setEnergyLevel] = useState<number | null>(null);

  const handleEnergyClick = (clickedLevel: number) => {
    if (clickedLevel === energyLevel) { // Clicking a selected button will unselect it
      setEnergyLevel(null)
    } else {
      setEnergyLevel(clickedLevel)
    }
  }

  return (
    <Modal>
      <h1>Add an entry</h1>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="sleepTime" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBed} className="text-sky-500" />
            When did you go to bed?
          </label>
          <input id="sleepTime" type="datetime-local" className="w-min" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="activity" className="flex gap-2 items-center">
            What were you doing before bed?
          </label>
          <textarea
            id="activity"
            className="rounded-md shadow bg-slate-100 h-[10vh] p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="wakeTime" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
            When did you wake up?
          </label>
          <input id="sleepTime" type="datetime-local" className="w-min" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBattery} className="text-teal-500" />
            How would you rate your energy level?
          </p>
          <EnergyScale handleClick={handleEnergyClick} selectedValue={energyLevel}/>
        </div>

        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};
