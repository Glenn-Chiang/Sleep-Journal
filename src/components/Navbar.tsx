import { getCurrentUser } from "@/lib/auth";
import { faMoon, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.admin;

  return (
    <nav className="fixed top-0 left-0 w-screen h-16 px-4 bg-sky-500 shadow-lg text-white flex items-center justify-between">
      <Link href={"/"}>
        <h1 className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faMoon} />
          Sleep Journal
        </h1>
      </Link>
      {isAdmin && (
        <Link href={"/admin"}>
          <FontAwesomeIcon icon={faUserShield} />
        </Link>
      )}
    </nav>
  );
};
