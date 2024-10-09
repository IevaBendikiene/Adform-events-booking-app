"use client";
import { useRouter } from "next/navigation";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface DeleteEventProps {
  id: string;
}

const DeleteEvent: FC<DeleteEventProps> = ({ id }) => {
  const router = useRouter();

  const deleteEvent = async () => {
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete event, status code:", res.status);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteEvent}
    />
  );
};

export default DeleteEvent;
