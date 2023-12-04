"use client";

import { createEntry } from "@/actions/entries/mutations";
import { EnergyScale } from "@/components/EnergyScale";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { notify } from "@/lib/notifications";
import { calculateDuration } from "@/lib/timeCalculations";
import { useValidateSleepTime, useValidateWakeTime } from "@/lib/validations";
import { faBattery, faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type EntryFormFields = {
  sleepTime: string;
  wakeTime?: string;
  readMaterial: boolean;
  reasonForNotReading?: boolean;
  activity?: string;
  remarks?: string;
};

export default function AddEntryPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EntryFormFields>();

  const sleepTime = watch("sleepTime");
  const wakeTime = watch("wakeTime");

  const validateSleepTime = useValidateSleepTime(wakeTime)
  const validateWakeTime = useValidateWakeTime(sleepTime)

  // Energy scale is handled separately from other form fields
  const [energyLevel, setEnergyLevel] = useState<number | undefined>(undefined);
  const handleEnergyClick = (clickedLevel: number) => {
    if (clickedLevel === energyLevel) {
      // Clicking a selected button will unselect it
      setEnergyLevel(undefined);
    } else {
      setEnergyLevel(clickedLevel);
    }
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<EntryFormFields> = async (formFields) => {
    setIsPending(true);

    const { sleepTime, wakeTime, remarks } = formFields;

    try {
      await createEntry({
        sleepTime: new Date(sleepTime), // Date from input field is a string, so we convert it to an actual date
        wakeTime: wakeTime ? new Date(wakeTime) : undefined,
        energyLevel,
        remarks,
      });

      // Redirect to homepage on successful submission
      router.push("/", { scroll: false });
      notify("Entry added!");
    } catch (error) {
      setError((error as Error).message);
      setIsPending(false);
    }
  };

  return (
    <>
      <h1 className="">Record your Sleep</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 sm:w-1/2">
        <section className="flex flex-col gap-2">
          <label htmlFor="sleepTime" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBed} className="text-sky-500" />
            When did you go to bed?
          </label>
          {errors.sleepTime?.message && (
            <ErrorMessage message={errors.sleepTime.message} />
          )}
          <input
            id="sleepTime"
            type="datetime-local"
            {...register("sleepTime", {
              required: "Please fill in this field",
              validate: validateSleepTime,
            })}
            className="w-min"
            disabled={isPending}
          />
        </section>

        <section>
          <label>Did you read the material for at least 30min before sleeping?</label>
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="wakeTime" className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
              When did you wake up?
            </label>
            <small className="text-slate-500">
              If you&apos;re going to sleep now, you can fill this in later
            </small>
          </div>
          {errors.wakeTime?.message && (
            <ErrorMessage message={errors.wakeTime.message} />
          )}
          <input
            id="wakeTime"
            {...register("wakeTime", { validate: validateWakeTime })}
            type="datetime-local"
            className="w-min"
            disabled={isPending}
          />
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <p className="flex flex-col gap-1">
              <span>
                How would you rate your energy level throughout the day?{" "}
                <FontAwesomeIcon icon={faBattery} className="text-teal-500" />
              </span>
              <small className="text-slate-500">
                If you&apos;re going to sleep now, you can fill this in later
              </small>
            </p>
          </div>
          <EnergyScale
            disabled={false}
            handleClick={handleEnergyClick}
            selectedValue={energyLevel}
          />
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="remarks" className="flex gap-2 flex-col sm:flex-row">
            Do you have any additional remarks?{" "}
            <span className="text-slate-500">(optional)</span>
          </label>
          {errors.remarks?.message && (
            <ErrorMessage message={errors.remarks.message} />
          )}
          <textarea
            id="remarks"
            {...register("remarks")}
            disabled={isPending}
          />
        </section>

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={() => router.back()} />
        </div>
      </form>
    </>
  );
}
