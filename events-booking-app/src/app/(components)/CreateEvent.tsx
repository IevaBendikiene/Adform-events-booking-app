"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Event {
  _id: string;
  name: string;
  description: string;
  shortDescription: string;
  eventsDate: string | Date;
  imageUrl: string;
  totalTickets: number;
  soldTickets: number;
  price: number;
}
interface CreateEventProps {
  event: Event;
}

const CreateEvent: React.FC<CreateEventProps> = ({ event }) => {
  const EDITMODE = event._id === "new" ? false : true;

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const startingEventData = {
    id: "",
    name: "",
    shortDescription: "",
    description: "",
    eventsDate: "",
    imageUrl: "",
    totalTickets: 0,
    soldTickets: 0,
    price: 0,
  };
  if (EDITMODE) {
    (startingEventData["id"] = event._id),
      (startingEventData["name"] = event.name),
      (startingEventData["shortDescription"] = event.shortDescription),
      (startingEventData["description"] = event.description),
      (startingEventData["eventsDate"] =
        typeof event.eventsDate === "string" &&
        !isNaN(new Date(event.eventsDate).getTime())
          ? new Date(event.eventsDate).toISOString().slice(0, 16)
          : ""),
      (startingEventData["imageUrl"] = event.imageUrl),
      (startingEventData["totalTickets"] = event.totalTickets),
      (startingEventData["soldTickets"] = event.soldTickets),
      (startingEventData["price"] = event.price);
  }
  const [formData, setFormData] = useState(startingEventData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((preState) => ({ ...preState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (EDITMODE) {
      try {
        setLoading(true);
        const res = await fetch(`/api/Events/${event._id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ formData }),
        });
        if(res.ok){
          console.log(formData)
        }
        if (!res.ok) {
          throw new Error("Failed to update event");
        }
      } catch (error: any) {
        console.error("Failed to update event", error.message);
        // toast.error("Failed to update event");
      } finally {
        setLoading(false);
        router.refresh();
      }
    } else {
      try {
        setLoading(true);
        const res = await fetch("/api/Events", {
          method: "POST",
          body: JSON.stringify({ formData }),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Failed to create new event.");
        }
      } catch (error: any) {
        console.log("Failed to create new event", error.message);
        // toast.error(error.message);
      } finally {
        setLoading(false);
        router.push("/events");
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="flex items-center justify-center mt-4">
        <form
          method="post"
          className="flex flex-col gap-3 w-1/2"
          onSubmit={handleSubmit}
        >
          <h2>{loading ? "Loading..." : "Edit Event"}</h2>
          <label htmlFor="name">Event Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Event Name"
          />
          <label htmlFor="imageUrl">Image Link</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <label htmlFor="shortDescription">Short Description</label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            required
            placeholder="Short Description"
            rows={2}
          />
          <label htmlFor="description">Detailed Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Detailed Description"
            rows={10}
          />
          <label htmlFor="totalTickets">Total Tickets</label>
          <input
            id="totalTickets"
            name="totalTickets"
            type="number"
            value={formData.totalTickets}
            onChange={handleChange}
            required
          />
          <label htmlFor="soldTickets">Sold Tickets</label>
          <input
            id="soldTickets"
            name="soldTickets"
            type="number"
            value={formData.soldTickets}
            onChange={handleChange}
            required
          />
          <label htmlFor="eventsDate">Event Date and Time</label>
          <input
            type="datetime-local"
            id="eventsDate"
            name="eventsDate"
            value={
              formData.eventsDate &&
              !isNaN(new Date(formData.eventsDate).getTime())
                ? new Date(formData.eventsDate).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleChange}
          />
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <button className="btn text-center" type="submit">
            Edit Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
