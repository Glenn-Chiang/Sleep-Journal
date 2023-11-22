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
};

export const EnergyScale = ({
  selectedValue,
  handleClick,
}: EnergyScaleProps) => {
  const options = [
    { label: "Always tired", value: 1, icon: faFaceDizzy },
    { label: "Mostly tired", value: 2, icon: faFaceTired },
    { label: "Sometimes tired", value: 3, icon: faFaceGrimace },
    { label: "Not tired", value: 4, icon: faFaceSmile },
  ];

  return (
    <ul className="flex gap-4  w-full">
      {options.map((option) => (
        <EnergyButton
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
  value: number;
  icon: IconDefinition;
  onClick: () => void;
  selected: boolean;
};

const EnergyButton = ({
  label,
  value,
  icon,
  onClick,
  selected,
}: EnergyButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-2 items-center p-2 text-sky-500  w-1/4 ${
        selected ? "bg-sky-200 text-sky-600" : "hover:bg-sky-100"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="text-sky-500" />
      <span className="text-sm">{label}</span>
    </button>
  );
};
