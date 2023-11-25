import { getUserEntries } from "@/actions/entries/fetches";
import { getUser } from "@/actions/users";
import { EntriesList } from "@/components/EntriesList";
import { Summary } from "@/components/Summary";
import { TopButton } from "@/components/buttons";
import {
  faBook,
  faChevronLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default async function UserPage({ params }: { params: { id: string } }) {
  const userId = Number(params.id);
  const user = await getUser(userId);
  const entries = await getUserEntries(userId);

  return (
    <>
      <Link
        href={"/admin"}
        className="flex gap-2 items-center text-sky-500 self-start text-xl"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Users
      </Link>
      <div className="flex gap-4 items-center">
        {user?.avatarUrl && (
          <Image src={user?.avatarUrl} alt="" width={80} height={80} className="rounded-full"/>
        )}
        <h1 className="text-start">
          {user?.username}
        </h1>
      </div>
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
