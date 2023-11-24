import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className="flex flex-col">
      <FontAwesomeIcon icon={faSpinner} className="animate-spin"/>
      Loading...
    </div>
  )
}