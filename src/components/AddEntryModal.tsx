"use client";

import { CancelButton, SubmitButton } from "@/components/buttons";
import { faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Modal } from "./Modal";

type AddEntryModalProps = {
  close: () => void;
};

export const AddEntryModal = ({ close }: AddEntryModalProps) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  return (
    <Modal>
      <h1>Add an entry</h1>
      <form className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="sleepTime" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBed} className="text-sky-500" />
            When did you go to bed?
          </label>
          <input id="sleepTime" type="datetime-local" />
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
          <input id="sleepTime" type="datetime-local" />
        </div>

        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={() => router.back()} />
        </div>
      </form>
    </Modal>
  );
};
