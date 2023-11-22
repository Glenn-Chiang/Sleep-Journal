"use client";

import { CancelButton, SubmitButton } from "@/components/buttons";
import { faBattery, faBed, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EnergyScale } from "@/components/EnergyScale";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@/components/ErrorMessage";

type EntryFormFields = {
  sleepTime: string;
  wakeTime?: string;
  activity?: string;
}

export default function AddEntryPage() {
  const {register, handleSubmit, formState: {errors}} = useForm<EntryFormFields>()
  const [isPending, setIsPending] = useState(false);
  const [energyLevel, setEnergyLevel] = useState<number | null>(null);

  const handleEnergyClick = (clickedLevel: number) => {
    if (clickedLevel === energyLevel) {
      // Clicking a selected button will unselect it
      setEnergyLevel(null);
    } else {
      setEnergyLevel(clickedLevel);
    }
  };

  const router = useRouter();

  const onSubmit: SubmitHandler<EntryFormFields> = async (formFields) => {
    setIsPending(true);
    // await createEntry({
    //   sleepTime: new Date(sleepTime)
    // })
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
          {errors.sleepTime?.message && <ErrorMessage message={errors.sleepTime.message}/>}
          <input
            id="sleepTime"
            type="datetime-local"
            {...register('sleepTime', {required: 'Please fill in this field'})}
            className="w-min"
            disabled={isPending}
          />
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="activity" className="flex gap-2 items-center">
            What were you doing before bed?
          </label>
          {errors.activity?.message && <ErrorMessage message={errors.activity.message}/>}
          <textarea
            id="activity"
            {...register('activity', {required: 'Please fill in this field'})}
            disabled={isPending}
          />
        </section>

        <section className="flex flex-col gap-2">
          <label htmlFor="wakeTime" className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
            When did you wake up?
          </label>
          <input
            id="sleepTime"
            type="datetime-local"
            className="w-min"
            disabled={isPending}
          />
        </section>

        <section className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon icon={faBattery} className="text-teal-500" />
            <p>
              How would you rate your energy level throughout the day?{" "}
              <span className="text-slate-500">(after this sleep)</span>
            </p>
          </div>
          <EnergyScale
            handleClick={handleEnergyClick}
            selectedValue={energyLevel}
          />
        </section>

        <div className="flex gap-4">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={() => router.back()} />
        </div>
      </form>
    </>
  );
}
