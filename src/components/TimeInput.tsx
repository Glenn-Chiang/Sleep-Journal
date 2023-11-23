import { updateSleepTime, updateWakeTime } from "@/actions/entries";
import { formatDatetime } from "@/lib/dateTime";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TimeInputProps = {
  label: string;
  icon: IconDefinition;
  entryId: string;
  defaultValue: Date | null;
};

export const TimeInput = ({
  label,
  icon,
  entryId,
  defaultValue,
}: TimeInputProps) => {
  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const newTime = new Date(event.target.value);
    if (label === "Slept at") {
      await updateSleepTime(entryId, newTime);
    } else if (label === "Woke at") {
      await updateWakeTime(entryId, newTime);
    }
  };

  return (
    <div className="flex gap-2">
      <label
        htmlFor={`sleepTime-${entryId}`}
        className="text-slate-500 flex gap-1 items-center flex-col sm:flex-row"
      >
        <FontAwesomeIcon icon={icon} />
        {label}
      </label>{" "}
      <input
        id={`${label} ${entryId}`}
        type="datetime-local"
        defaultValue={defaultValue ? formatDatetime(defaultValue) : undefined}
        onChange={handleTimeChange}
        onKeyDown={(event) => event.preventDefault()}
        className="bg-slate-100"
      />
    </div>
  );
};
