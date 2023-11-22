import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <span className="bg-rose-100 text-rose-500 flex gap-2 items-center p-2 rounded-md">
      <FontAwesomeIcon icon={faExclamationCircle} />
      {message}
    </span>
  );
};
