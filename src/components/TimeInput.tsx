"use client";

import { updateSleepTime, updateWakeTime } from "@/actions/entries/mutations";
import { calculateDuration, formatDatetime } from "@/lib/dateTime";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import { useState } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { toast } from "react-toastify";

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

  const handleTimeChange: React.FocusEventHandler<HTMLInputElement> = async (
    event
  ) => {
    if (!event.target.value) return
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
      setError("You can't have woken up before sleeping");
      return;
    }
    // Waketime cannot be 24h later than sleepTime
    if (calculateDuration(sleepTime, entry.wakeTime) > 24) {
      setError("You likely didn't sleep for more than 24h");
      return;
    }
    await updateSleepTime(entry.id, sleepTime);
    setError(null);
  };

  const handleWakeTimeChange = async (newWakeTime: Date) => {
    // Waketime cannot be earlier than sleepTime
    if (newWakeTime < entry.sleepTime) {
      setError("You can't have woken up before sleeping");
      return;
    }
    // Waketime cannot be 24h later than sleepTime
    if (calculateDuration(entry.sleepTime, newWakeTime) > 24) {
      setError("You likely didn't sleep for more than 24h");
      return;
    }

    await updateWakeTime(entry.id, newWakeTime);
    setError(null);

    // If wakeTime was previously null and is now set to a value, notify the user
    if (!entry.wakeTime) {
      toast("Entry updated!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        type: "success",
      });
    }
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
          onChange={handleTimeChange}
          onKeyDown={(event) => event.preventDefault()}
          className="bg-slate-100"
        />
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
};
