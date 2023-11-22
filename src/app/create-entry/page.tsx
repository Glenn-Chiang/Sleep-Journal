"use client";

import { SubmitButton, CancelButton } from "@/components/buttons";
import { useState } from "react";

export const CreateEntryPage = () => {
  const [isPending, setIsPending] = useState(false);

  return (
    <>
      <form className="flex flex-col gap-4">
        <h1>Add an entry</h1>

        <label htmlFor="sleepTime">What time did you go to bed?</label>
        <input id="sleepTime" type="datetime-local" />
        <label htmlFor="wakeTime">What time did you wake up?</label>
        <input id="sleepTime" type="datetime-local" />

        <label htmlFor="activity">What did you do before bed?</label>
        <textarea id="activity" className="rounded-md shadow bg-slate-100" />

        <label htmlFor="energyLevel">
          How would you rate your energy level
        </label>

        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </>
  );
};
