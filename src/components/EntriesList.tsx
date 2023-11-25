import { Entry } from "@prisma/client";
import { JournalEntry } from "./JournalEntry";

type EntriesListProps = {
  entries: Entry[];
};

export const EntriesList = ({ entries }: EntriesListProps) => {
  if (!entries.length) {
    return <p className="text-slate-500">No entries</p>;
  }

  return (
    <ul className="w-full flex flex-col gap-4">
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </ul>
  );
};
