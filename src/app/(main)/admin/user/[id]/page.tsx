import { getUserEntries } from "@/actions/entries/fetches";
import { getUser } from "@/actions/users";
import { EntriesList } from "@/components/EntriesList";
import { Summary } from "@/components/Summary";
import { TopButton } from "@/components/buttons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function UserPage({ params }: { params: { id: string } }) {
  const userId = Number(params.id);
  const user = await getUser(userId);
  const entries = await getUserEntries(userId)

  return (
    <>
      <h1>
        <span className="text-sky-500">{user?.username}&apos;s</span> Journal
      </h1>
      <Summary entries={entries} />
      <section className="w-full flex flex-col gap-4">
        <h1 className="text-start flex gap-2 items-center">
          <FontAwesomeIcon icon={faBook} />
          Entries
        </h1>
        <EntriesList entries={entries} />
      </section>
      <TopButton />
    </>
  );
}
