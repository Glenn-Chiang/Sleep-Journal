"use client";

import { useEffect, useRef, useState } from "react";
import { CancelButton, SubmitButton } from "./buttons";

type ActivityEditorProps = {
  initialValue: string | null;
};

export const ActivityEditor = ({ initialValue }: ActivityEditorProps) => {
  const [input, setInput] = useState(initialValue);

  // Keep track of input string
  const handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = async (event) => {
    setInput(event.target.value);
  };

  // Toggling of inline editing for activity field
  const [inEditMode, setInEditMode] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (inEditMode) {
      textRef.current?.focus();
    }
  }, [inEditMode]);

  const handleCancel = () => {
    setInEditMode(false);
    setInput(initialValue);
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <span className="text-sky-500">Activity before sleeping</span>
        <button
          onClick={() => setInEditMode((prev) => !prev)}
          className="w-max px-4 bg-sky-100 text-sky-500"
        >
          Edit
        </button>
      </div>
      <textarea
        onChange={handleInputChange}
        ref={textRef}
        autoFocus={inEditMode}
        disabled={!inEditMode}
        className="p-2 bg-slate-100 rounded-md"
        value={input || ""}
      />
      {inEditMode && (
        <div className="flex gap-2">
          <SubmitButton>Save</SubmitButton>
          <CancelButton onClick={handleCancel} />
        </div>
      )}
    </section>
  );
};
