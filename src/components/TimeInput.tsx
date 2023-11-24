"use client"

import { updateSleepTime, updateWakeTime } from "@/actions/entries/mutations";
import { calculateDuration, formatDatetime } from "@/lib/dateTime";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";

type TimeInputProps = {
  label: string;
  icon: IconDefinition;
  entry: Entry;
  defaultValue: Date | null;
};

export const TimeInput = ({
  label,
  icon,
  entry,
  defaultValue,
}: TimeInputProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const newTime = new Date(event.target.value);

    if (label === "Slept") {
      await handleSleepTimeChange(newTime);
    } else if (label === "Woke") {
      await handleWakeTimeChange(newTime);
    }
  };

  const handleSleepTimeChange = async (sleepTime: Date) => {
    // Waketime cannot be earlier than sleepTime
    if (entry.wakeTime && sleepTime > entry.wakeTime) {
      setError("You can't wake up before you sleep!");
      return;
    }
    // Waketime cannot be 24h later than sleepTime
    if (calculateDuration(sleepTime, entry.wakeTime) > 24) {
      setError("There's no way you slept more than 24h");
      return;
    }
    await updateSleepTime(entry.id, sleepTime);
    setError(null);
  };

  const handleWakeTimeChange = async (wakeTime: Date) => {
    console.log('what the fuck?')
    // Waketime cannot be earlier than sleepTime
    if (wakeTime < entry.sleepTime) {
      setError("You can't wake up before you sleep!");
      return;
    }
    // Waketime cannot be 24h later than sleepTime
    if (calculateDuration(entry.sleepTime, wakeTime) > 24) {
      setError("There's no way you slept more than 24h");
      return;
    }
    await updateWakeTime(entry.id, wakeTime);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-4">
        <label
          htmlFor={`${label} ${entry.id}`}
          className="text-slate-500 flex gap-1 items-center flex-col sm:flex-row "
        >
          <FontAwesomeIcon icon={icon} />
          {label}
        </label>{" "}
        <input
          id={`${label} ${entry.id}`}
          type="datetime-local"
          defaultValue={defaultValue ? formatDatetime(defaultValue) : undefined}
          onBlur={handleTimeChange}
          onKeyDown={(event) => event.preventDefault()}
          className="bg-slate-100"
        />
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
