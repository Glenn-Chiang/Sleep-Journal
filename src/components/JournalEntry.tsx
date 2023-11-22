import { Entry } from "@prisma/client"

type JournalEntryProps = {
  entry: Entry
}

export const JournalEntry = ({entry}: JournalEntryProps) => {
  const {sleepTime, wakeTime, activity, energyLevel} = entry
  
  return (
    <article>

    </article>
  )
}