"use client";

import { useState } from 'react';
import { AddEntryModal } from './AddEntryModal';

export const AddEntrySection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section className='w-full'>
      <button onClick={() => setModalIsOpen(true)} className="shadow p-2 rounded-md bg-blue-100 text-sky-500 w-full text-center font-bold hover:bg-sky-200 hover:text-sky-600 transition">
        Add Entry
      </button>
      {modalIsOpen && <AddEntryModal close={() => setModalIsOpen(false)}/>}
    </section>
  );
};
