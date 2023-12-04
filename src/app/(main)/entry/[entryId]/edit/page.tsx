import { getEntry } from "@/actions/entries/fetches";
import { EditEntryForm } from "./EditEntryForm";

export default async function EditEntryPage({params}: {params: {entryId: string}}) {
  const entryId = params.entryId
  const entry = await getEntry(entryId)

  if (!entry) {
    return <p>Entry not found</p>
  }

  return (
    <EditEntryForm entry={entry}/>
  );

}