"use client";

import { CancelButton, SubmitButton } from "@/components/buttons";
import { faBattery, faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EnergyScale } from "@/components/EnergyScale";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@/components/ErrorMessage";
import { createEntry } from "@/actions/entries/mutations";
import { toast } from "react-toastify";

type EntryFormFields = {
  sleepTime: string;
  wakeTime?: string;
  activity?: string;
  remarks?: string;
};

export default function AddEntryPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EntryFormFields>();
  const [energyLevel, setEnergyLevel] = useState<number | undefined>(undefined);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

    const { sleepTime, wakeTime, activity, remarks } = formFields;

    try {
      await createEntry({
        sleepTime: new Date(sleepTime), // Date from input field is a string, so we convert it to an actual date
        wakeTime: wakeTime ? new Date(wakeTime) : undefined,
        activity: activity || undefined,
        energyLevel,
        remarks,
      });

      toast("Entry added!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        type: "success"
      });
      
      // Redirect to homepage on successful submission
      if (wakeTime) {
        router.push("/");
      } else {
        router.push("/?status=pending")
      }

    } catch (error) {
      setError((error as Error).message);
      setIsPending(false);
    }
  };

  return (
    <>
      <h1 className="">Record your Sleep</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
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
            })}
            className="w-min"
            disabled={isPending}
          />
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="activity" className="flex gap-2 items-center">
            What were you doing before bed?
          </label>
          {errors.activity?.message && (
            <ErrorMessage message={errors.activity.message} />
          )}
          <textarea
            id="activity"
            {...register("activity", { required: "Please fill in this field" })}
            disabled={isPending}
          />
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
          <input
            id="wakeTime"
            {...register("wakeTime")}
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
