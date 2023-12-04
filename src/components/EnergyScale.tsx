"use client";

import {
  IconDefinition,
  faFaceDizzy,
  faFaceGrimace,
  faFaceSmile,
  faFaceTired,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type EnergyScaleProps = {
  handleClick: (value: number) => void;
  selectedValue?: number | null;
  disabled: boolean;
};

export const energyOptions = [
  { label: "Rarely tired (0-1 times)", value: 4, icon: faFaceSmile },
  { label: "Sometimes tired (2-3 times)", value: 3, icon: faFaceGrimace },
  { label: "Often tired (4-5 times)", value: 2, icon: faFaceTired },
  { label: "Constantly tired", value: 1, icon: faFaceDizzy },
];

export const EnergyScale = ({
  selectedValue,
  handleClick,
  disabled,
}: EnergyScaleProps) => {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-4 justify-items-center w-full">
      {energyOptions.map((option) => (
        <EnergyButton
          disabled={disabled}
          key={option.value}
          label={option.label}
          value={option.value}
          icon={option.icon}
          onClick={() => handleClick(option.value)}
          selected={option.value === selectedValue}
        />
      ))}
    </ul>
  );
};

type EnergyButtonProps = {
  label: string;
  value?: number;
  icon: IconDefinition;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
};

export const EnergyButton = ({
  label,
  icon,
  onClick,
  selected,
  disabled,
}: EnergyButtonProps) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-2 items-center justify-start p-2 text-sky-500 w-full ${
        selected
          ? "bg-sky-200 text-sky-600"
          : disabled
          ? ""
          : "hover:bg-sky-100"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="text-sky-500" />
      <span className="text-sm">{label}</span>
    </button>
  );
};
