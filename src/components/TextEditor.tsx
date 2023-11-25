"use client";

import { useEffect, useRef, useState } from "react";
import { CancelButton, SubmitButton } from "./buttons";
import { useCurrentUser } from "@/lib/auth";

type TextEditorProps = {
  editable: boolean;
  label: string;
  initialValue: string | null;
  onSubmit: (input: string | null) => void;
};

export const TextEditor = ({
  label,
  onSubmit,
  initialValue,
  editable,
}: TextEditorProps) => {
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
    onSubmit(input);
    setInEditMode(false);
    setIsPending(false);
  };

  const handleCancel = () => {
    setInEditMode(false);
    setInput(initialValue);
  };

  return (
    <section className="flex flex-col gap-2 col-span-2 sm:col-span-1">
      <div className="flex gap-4 items-center">
        <span className="text-slate-500">{label}</span>
        {editable && (
          <button
            onClick={() => setInEditMode((prev) => !prev)}
            className="w-max px-4 bg-sky-100 text-sky-500"
          >
            Edit
          </button>
        )}
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
