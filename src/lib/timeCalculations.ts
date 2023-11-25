export const formatDate = (date: Date) => {
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDatetime = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const calculateDuration = (start: Date, end: Date | null) => {
  if (!end) return 0;
  const durationInHours = (end.getTime() - start.getTime()) / 1000 / 3600;
  return durationInHours;
};

export const convertDurationToHoursAndMinutes = (duration: number) => {
  const hours = Math.floor(duration);
  const minutes = Math.round((duration % 1) * 60);
  return { hours, minutes };
};

// For calculation of average sleep time to make sense, we need to handle times that are after midnight and consider them to be 'after' a time before midnight
// But how do we determine whether a time should be considered 'after' midnight or not? Both 1am and 11pm could be considered 'after midnight'
// It seems the only way to solve this conundrum is to introduce some arbitrary threshold, such as considering times before 6am to be 'after midnight'
export const calculateAverageSleepTime = (timestamps: Date[]) => {
  const timestampsInMinutes = timestamps.map((timestamp) => {
    const afterMidnight = timestamp.getHours() < 6
    const hours = afterMidnight ? timestamp.getHours() + 24 : timestamp.getHours()
    const minutes = timestamp.getMinutes()
    return hours * 60 + minutes
  })

  const totalMinutes = timestampsInMinutes.reduce((sum, val) => sum + val, 0)
  const averageMinutes = totalMinutes / timestamps.length

  const rawAverageHours = Math.floor(averageMinutes / 60)
  const averageHours = rawAverageHours > 24 ? rawAverageHours - 24 : rawAverageHours
  const averageMinutesRemainder = Math.floor(averageMinutes % 60)
  const averageTime = new Date()
  averageTime.setHours(averageHours, averageMinutesRemainder)

  return averageTime
};

export const calculateAverageWakeTime = (timestamps: Date[]) => {
  const timestampsInMinutes = timestamps.map((date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return hours * 60 + minutes;
  });

  const totalMinutes = timestampsInMinutes.reduce((sum, val) => sum + val, 0);
  const averageMinutes = totalMinutes / timestamps.length;

  const averageHours = Math.floor(averageMinutes / 60);
  const averageMinutesRemainder = Math.floor(averageMinutes % 60);
  const averageTime = new Date();
  averageTime.setHours(averageHours, averageMinutesRemainder);

  return averageTime;
};
