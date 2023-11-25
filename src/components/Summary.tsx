"use client";

import {
  calculateAverageSleepTime,
  calculateAverageWakeTime,
  calculateDuration,
} from "@/lib/timeCalculations";
import {
  faBed,
  faChartBar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Entry } from "@prisma/client";
import {
  convertDurationToHoursAndMinutes,
  formatTime,
} from "../lib/timeCalculations";

type SummaryProps = {
  entries: Entry[];
};

export const Summary = ({ entries }: SummaryProps) => {
  const sleepTimes = entries.map((entry) => entry.sleepTime);
  const averageSleepTime = calculateAverageSleepTime(sleepTimes);

  const wakeTimes = entries
    .filter((entry) => !!entry.wakeTime) // Only consider completed entries
    .map((entry) => entry.wakeTime) as Date[];
  const averageWakeTime = calculateAverageWakeTime(wakeTimes);

  const sleepDurations = entries
    .filter((entry) => !!entry.wakeTime) // Only consider completed entries
    .map((entry) => calculateDuration(entry.sleepTime, entry.wakeTime));

  const averageSleepDuration = convertDurationToHoursAndMinutes(
    sleepDurations.reduce((sum, value) => sum + value, 0) /
      sleepDurations.length
  );

  return (
    <section className="flex flex-col gap-4 w-full">
      <h1 className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faChartBar} />
        Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-500 bg-white rounded-xl p-4 w-full shadow">
        <div className="flex flex-col gap-4 text-black">
          <h2>Average sleep duration</h2>
          <div className="flex gap-4 items-center text-sky-500 text-3xl sm:text-4xl">
            <FontAwesomeIcon icon={faBed} />
            {entries.length ? (
              <span>
                {averageSleepDuration.hours}h {averageSleepDuration.minutes}min
              </span>
            ) : (
              <span className="text-sky-500">-</span>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center sm:flex-col">
          <span className="text-center">Average bedtime</span>
          <span className="text-sky-500 sm:text-2xl">
            {entries.length ? formatTime(averageSleepTime) : "-"}
          </span>
        </div>
        <div className="flex gap-2 items-center sm:flex-col">
          <span className="text-center">Average wake-up time</span>
          <span className="text-sky-500 sm:text-2xl">
            {entries.length ? formatTime(averageWakeTime) : "-"}
          </span>
        </div>
      </div>
    </section>
  );
};
