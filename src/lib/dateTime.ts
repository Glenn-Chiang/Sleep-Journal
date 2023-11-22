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
    hour12: false,
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

export const setTimeOfDate = (originalDate: Date, newTime: string) => {
  const year = originalDate.getFullYear();
  const month = originalDate.getMonth();
  const day = originalDate.getDate();

  // Extracting hours and minutes from the new time string (e.g., "13:45")
  const [hours, minutes] = newTime.split(":").map(Number);

  // Creating a new date with the original date parts and the new time
  const newDate = new Date(year, month, day, hours, minutes);

  return newDate;
};
