import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-screen h-16 px-4 bg-sky-500 shadow-lg text-white flex items-center">
      <Link href={"/"}>
        <h1 className="flex gap-2 items-center">
          <FontAwesomeIcon icon={faMoon} />
          Sleep Journal
        </h1>
      </Link>
    </nav>
  );
};
