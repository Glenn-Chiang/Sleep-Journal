"use client";

import { useEffect, useRef, useState } from "react";
import { CancelButton, SubmitButton } from "./buttons";
import { updateActivity } from "@/actions/entries";

type ActivityEditorProps = {
  entryId: string;
  initialValue: string | null;
};

export const ActivityEditor = ({
  entryId,
  initialValue,
}: ActivityEditorProps) => {
  // Toggling of inline editing for activity field
  const [inEditMode, setInEditMode] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (inEditMode) {
      textRef.current?.focus();
    }
  }, [inEditMode]);

  // Keep track of input string
  const [input, setInput] = useState(initialValue);
  const handleInputChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = async (event) => {
    setInput(event.target.value);
  };

  const [isPending, setIsPending] = useState(false);

  // Submission
  const handleSubmit = async () => {
    setIsPending(true);
    await updateActivity(entryId, input);
    setInEditMode(false);
  };

  const handleCancel = () => {
    setInEditMode(false);
    setInput(initialValue);
  };

  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-4 items-center">
        <span className="text-slate-500">Activity before sleeping</span>
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
        disabled={!inEditMode || isPending}
        className="p-2 bg-slate-100 rounded-md"
        value={input || ""}
      />
      {inEditMode && (
        <div className="flex gap-2">
          <SubmitButton isPending={isPending} onClick={handleSubmit}>
            Save
          </SubmitButton>
          <CancelButton onClick={handleCancel} />
        </div>
      )}
    </section>
  );
};
