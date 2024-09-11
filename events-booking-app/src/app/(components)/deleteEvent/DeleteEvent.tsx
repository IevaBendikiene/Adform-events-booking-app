"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DeleteEventProps {
  id: string;
} // not sure about this part

const DeleteEvent: FC<DeleteEventProps> = ({ id }) => {
  const router = useRouter();

  const deleteEvent = async () => {
    try {
      const res = await axios.delete(`/api/events/${id}`);
      if (res.status === 200) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return <button onClick={deleteEvent}>Delete Event</button>;
};

export default DeleteEvent;