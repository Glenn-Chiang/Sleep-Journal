"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBattery } from "@fortawesome/free-solid-svg-icons";

type EnergyScaleProps = {
  setLevel: (energyLevel: number) => void
}

export const EnergyScale = ({setLevel}: EnergyScaleProps) => {
  return (
    <section>
      <div className="flex flex-col gap-2">
        <label htmlFor="energyLevel" className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faBattery} className="text-emerald-500" />
          How would you rate your energy level?
        </label>
      </div>
    </section>
  );
}