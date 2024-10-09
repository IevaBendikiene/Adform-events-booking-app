"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import Event from "@/models/eventModel";

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
interface EditEventProps {
  event: Event;
}
const EditEvent: React.FC<EditEventProps> = ({ event }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: event._id,
    name: event.name,
    shortDescription: event.shortDescription,
    description: event.description,
    eventsDate:
      typeof event.eventsDate === "string"
      && !isNaN(new Date(event.eventsDate).getTime())
      ? new Date(event.eventsDate).toISOString().slice(0, 16)
      : "",
    imageUrl: event.imageUrl,
    totalTickets: event.totalTickets,
    soldTickets: event.soldTickets,
    price: event.price,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(`/api/Events/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData), // Send the updated event data
      });

      if (!res.ok) throw new Error("Failed to update event");

      toast.success("Event updated successfully");
      router.push("/");
    } catch (error: any) {
      console.error("Failed to update event", error.message);
      toast.error("Failed to update event");
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!event) {
  //   return <div>No event found</div>;
  // }

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
              formData.eventsDate && !isNaN(new Date(formData.eventsDate).getTime())
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

export default EditEvent;
