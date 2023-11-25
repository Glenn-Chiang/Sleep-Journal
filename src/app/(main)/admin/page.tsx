import { getUsers } from "@/actions/users";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function AdminPage() {
  const users = await getUsers();

  return (
    <main className="flex flex-col gap-4 w-full">
      <h1 className="flex justify-start gap-2 items-center ">
        <FontAwesomeIcon icon={faUsers} />
        Users
      </h1>
      <ul className="flex flex-col gap-4 w-full">
        {users.map((user) => (
          <UserLink key={user.id} user={user} />
        ))}
      </ul>
    </main>
  );
}

const UserLink = ({ user }: { user: User }) => {
  return (
    <Link href={`/admin/user/${user.id}`} className="w-full flex gap-2 items-center bg-white p-4 rounded-xl">
      {user.avatarUrl && (
        <Image
          src={user.avatarUrl}
          alt=""
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <span>{user.username}</span>
    </Link>
  );
};
