import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link
        href={"/create-entry"}
        className="shadow p-2 rounded-md bg-sky-100 text-sky-500 w-full text-center font-medium hover:bg-sky-200 hover:text-sky-600 transition"
      >
        Add Entry
      </Link>
    </>
  );
}
