"use client"
import React, { useEffect, useState } from "react";
import EventBlock from "../(components)/EventBlock";


interface Event {
  _id: string;
  name: string;
  shortDescription: string;
  eventsDate: string | Date;
  imageUrl: string;
  totalTickets: number;
  soldTickets: number;
  price: number;
}


const EventsPage= () => {
const [events, setEvents] = useState<any[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

  useEffect (() => {
    const getEvents = async () => {
      try {
        const response = await fetch("/api/Events", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok)
          throw new Error(`Failed to fetch events: ${response.status}`);
        const data = await response.json();
        console.log(data);
        setEvents(data.events || [] )// Assuming response has 'events'
      } catch (error: any) {
        console.error("Error fetching events:", error.message);
    
      } finally {
        setLoading(false)
      }
    };
    getEvents()
  },[])
  if(loading){
    return <p>Loading events...</p>
  }

  if (error) {
    return <p>Something went wrong, could not fetch events</p>
  }
  return (
    <div className="wrapper">
      <h1 className="text-center m-6">Explore secret London</h1>
      {events ? (
        events.map((event: Event) => (
          <EventBlock key={event._id} event={event} />
        ))
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

export default EventsPage;

// { cache: "no-store" })
