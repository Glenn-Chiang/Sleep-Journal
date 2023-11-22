import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen h-20 px-4">
      <Link href={'/'} className="flex gap-2 items-center">
        <FontAwesomeIcon icon={faMoon} />
        Sleep Journal
      </Link>
    </nav>
  );
};
