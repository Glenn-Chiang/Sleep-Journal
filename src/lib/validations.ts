import { calculateDuration } from "./timeCalculations";

export const useValidateSleepTime = (wakeTime?: string) => {
  return (sleepTime: string) => {
    if (
      wakeTime &&
      calculateDuration(new Date(sleepTime), new Date(wakeTime)) > 24
    ) {
      return "You likely didn't sleep for more than 24 hours. Perhaps you entered the wrong date?";
    }
    return true;
  };
};

export const useValidateWakeTime = (sleepTime: string) => {
  return (wakeTime?: string) => {
    if (wakeTime && new Date(wakeTime) < new Date(sleepTime)) {
      return "You couldn't have woken up before sleeping";
    }
    if (
      wakeTime &&
      calculateDuration(new Date(sleepTime), new Date(wakeTime)) > 24
    ) {
      return "You likely didn't sleep for more than 24 hours. Perhaps you entered the wrong date?";
    }
    return true;
  };
};
