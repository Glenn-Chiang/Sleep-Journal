"use client";

import { deleteEntry } from "@/actions/entries/mutations";
import { Modal } from "./Modal";
import { useState } from "react";
import { CancelButton, SubmitButton } from "./buttons";
import { ErrorMessage } from "./ErrorMessage";
import { toast } from "react-toastify";

type DeleteEntryModalProps = {
  entryId: string;
  close: () => void;
};

export const DeleteEntryModal = ({ entryId, close }: DeleteEntryModalProps) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      await deleteEntry(entryId);
      close();
      toast("Entry deleted!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        type: 'success'
      });
    } catch (error) {
      setError((error as Error).message);
    }
    setIsPending(false);
  };

  return (
    <Modal>
      <h2>Are you sure you want to delete this entry?</h2>
      {error && <ErrorMessage message={error} />}
      <div className="flex gap-4">
        <SubmitButton isPending={isPending} onClick={handleSubmit}>
          Confirm
        </SubmitButton>
        <CancelButton onClick={close} />
      </div>
    </Modal>
  );
};
