import {
  getUserEntries
} from "@/actions/entries/fetches";
import { EntriesList } from "@/components/EntriesList";
import { Summary } from "@/components/Summary";
import { TopButton } from "@/components/buttons";
import { getCurrentUser } from "@/lib/auth";
import {
  faBook
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentUser = await getCurrentUser();
  const entries = currentUser ? await getUserEntries(currentUser.id) : [];

  return (
    <>
      <Summary entries={entries} />
      <Link
        href={"/add-entry"}
        className=" p-2 rounded-md bg-sky-100 text-sky-500 w-full sm:w-1/2 text-center font-medium hover:bg-sky-200 hover:text-sky-600 transition"
      >
        Add entry
      </Link>{" "}
      <section className="w-full flex flex-col gap-4">
        <h1 className="text-start flex gap-2 items-center">
          <FontAwesomeIcon icon={faBook} />
          Your Entries
        </h1>
        <EntriesList entries={entries} />
      </section>
      <TopButton />
    </>
  );
}

