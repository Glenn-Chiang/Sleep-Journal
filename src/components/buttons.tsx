"use client";

import { faChevronUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type SubmitButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  isPending: boolean;
};

export const SubmitButton = ({
  onClick,
  isPending,
  children,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full flex gap-2 justify-center items-center bg-sky-100 text-sky-500 font-medium hover:text-sky-600 hover:bg-sky-200 ${
        isPending && "opacity-50"
      }`}
      disabled={isPending}
    >
      {isPending && (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      )}
      {children}
    </button>
  );
};

type CancelButtonProps = {
  onClick: () => void;
};

export const CancelButton = ({ onClick }: CancelButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-600 "
    >
      Cancel
    </button>
  );
};

// Button to go to top of screen
export const TopButton = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-sky-500 shadow text-white rounded-full w-10 h-10"
    >
      <FontAwesomeIcon icon={faChevronUp} />
    </button>
  );
};
