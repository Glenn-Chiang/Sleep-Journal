import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingPage() {
  return (
    <div className="text-sky-500 flex gap-4 justify-center items-center text-2xl w-full h-screen fixed top-0 m-auto">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      Loading...
    </div>
  );
};
