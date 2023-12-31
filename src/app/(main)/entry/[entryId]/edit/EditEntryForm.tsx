"use client";

import { getEntry } from "@/actions/entries/fetches";
import { createEntry, editEntry } from "@/actions/entries/mutations";
import { EnergyScale } from "@/components/EnergyScale";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { notify } from "@/lib/notifications";
import { calculateDuration } from "@/lib/timeCalculations";
import {
  useValidateActivity,
  useValidateReason,
  useValidateSleepTime,
  useValidateWakeTime,
} from "@/lib/validations";
import {
  faBattery,
  faBed,
  faBookOpen,
  faCoffee,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EntryFormFields } from "@/lib/types";
import { Entry } from "@prisma/client";
import { formatDatetime } from "../../../../../lib/timeCalculations";

export const EditEntryForm = ({ entry }: { entry: Entry }) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<EntryFormFields>();

  const sleepTime = watch("sleepTime", formatDatetime(entry.sleepTime));
  const wakeTime = watch("wakeTime", entry.wakeTime ? formatDatetime(entry.wakeTime) : undefined);
  const validateSleepTime = useValidateSleepTime(wakeTime);
  const validateWakeTime = useValidateWakeTime(sleepTime);
  
  const readMaterial = watch("readMaterial", entry.readMaterial || undefined);
  const validateReason = useValidateReason(readMaterial);
  const validateActivity = useValidateActivity(readMaterial);

  // Energy scale is handled separately from other form fields
  const [energyLevel, setEnergyLevel] = useState<number | undefined>(
    entry.energyLevel || undefined
  );
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

    const {
      sleepTime,
      wakeTime,
      readMaterial,
      reasonForNotReading,
      activity,
      caffeineEffect,
      remarks,
    } = formFields;

    try {
      await editEntry(entry.id, {
        sleepTime: new Date(sleepTime), // Date from input field is a string, so we convert it to an actual date
        wakeTime: wakeTime ? new Date(wakeTime) : null,
        readMaterial,
        reason: readMaterial ? null : reasonForNotReading,
        activity: readMaterial ? null : activity,
        energyLevel,
        caffeineEffect,
        remarks,
      });

      // Redirect to homepage on successful submission
      router.push("/");
      notify("Entry updated!");
    } catch (error) {
      setError((error as Error).message);
      setIsPending(false);
    }
  };

  return (
    <>
      <h1 className="pt-4">Edit your entry</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-12 md:w-3/4 px-2"
      >
        <fieldset className="flex flex-col gap-8 ">
          <legend className="text-xl font-medium pb-4">Before bed</legend>
          <section className="flex flex-col gap-2">
            <label htmlFor="sleepTime" className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faBed} className="text-sky-500" />
              When did you go to bed?
            </label>
            {errors.sleepTime?.message && (
              <ErrorMessage message={errors.sleepTime.message} />
            )}
            <input
              defaultValue={formatDatetime(entry.sleepTime)}
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

          <section className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p>
                Did you read the material for at least 30min before sleeping?{" "}
                <FontAwesomeIcon icon={faBookOpen} className="text-sky-500" />
              </p>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  defaultChecked={
                    entry.readMaterial === null ? false : entry.readMaterial
                  }    
                  {...register("readMaterial")}
                  className="w-5 h-5"
                />
                <label>Yes</label>
              </div>
            </div>

            {!readMaterial && (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="reason">Why not?</label>
                  {errors.reasonForNotReading?.message && (
                    <ErrorMessage
                      message={errors.reasonForNotReading.message}
                    />
                  )}
                  <textarea
                    defaultValue={entry.reason || undefined}
                    id="reason"
                    {...register("reasonForNotReading", {
                      validate: validateReason,
                    })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="activity">What were you doing instead?</label>
                  {errors.activity?.message && (
                    <ErrorMessage message={errors.activity.message} />
                  )}
                  <textarea
                    defaultValue={entry.activity || undefined}
                    id="activity"
                    {...register("activity", {
                      validate: validateActivity,
                    })}
                  />
                </div>
              </>
            )}
          </section>
        </fieldset>

        <fieldset className="flex flex-col gap-8">
          <legend className="text-xl font-medium pb-4">After waking up</legend>
          <p className="text-slate-500">
            If you&apos;re going to sleep now, you can fill in this section
            tomorrow
          </p>
          <section className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="wakeTime" className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
                When did you wake up?
              </label>
            </div>
            {errors.wakeTime?.message && (
              <ErrorMessage message={errors.wakeTime.message} />
            )}
            <input
              defaultValue={
                entry.wakeTime ? formatDatetime(entry.wakeTime) : undefined
              }
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
              </p>
            </div>
            <EnergyScale
              disabled={false}
              handleClick={handleEnergyClick}
              selectedValue={energyLevel}
            />
          </section>

          <div className="flex flex-col gap-2">
            <p className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faCoffee} className="text-amber-900" />
              Did caffeine affect your sleep?
            </p>
            <div className="flex items-center gap-1">
              <input
                id="caffeineEffect"
                {...register("caffeineEffect")}
                type="checkbox"
                className="w-5 h-5"
                defaultChecked={
                  entry.caffeineEffect === null ? false : entry.caffeineEffect
                }
              />
              <label htmlFor="caffeineEffect">Yes</label>
            </div>
          </div>
        </fieldset>

        <section className="flex flex-col gap-2">
          <label htmlFor="remarks" className="flex gap-2 flex-col sm:flex-row">
            Do you have any additional remarks?{" "}
            <span className="text-slate-500">(optional)</span>
          </label>
          {errors.remarks?.message && (
            <ErrorMessage message={errors.remarks.message} />
          )}
          <textarea
            defaultValue={entry.remarks || undefined}
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
};
