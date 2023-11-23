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
  if (!end) return 0
  const durationInHours = (end.getTime() - start.getTime()) / 1000 / 3600
  return durationInHours
}

export const convertDurationToHoursAndMinutes = (duration: number) => {
  const hours = Math.floor(duration)
  const minutes = Math.round((duration % 1) * 60)
  return {hours, minutes}
}

export const calculateAverageTime = (timestamps: Date[]) => {
  const sum = timestamps.reduce((sum, value) => sum + value.getTime(), 0)
  const averageTime = new Date(sum / timestamps.length)
  return averageTime
}
