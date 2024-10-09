import Link from "next/link";
import React from "react";

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
interface EventBlockProps {
  event: Event;
}
const EventBlock: React.FC<EventBlockProps> = ({event}) => {
  const formatTimeStamp = (timestamp: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  };
  return <div>
    <div key={event._id} className="grid grid-cols-3 gap-2 p-4 border-solid border-2 border-table">
            <div>
              <img src={event.imageUrl} alt={event.name}/>
            </div>
            <div className="flex flex-col justify-start content-between p-3">
              <h3>{event.name}</h3>
              <h4>{event.shortDescription}</h4>
              <p className="font-bold mb-4">
                {new Date(event.eventsDate).toLocaleDateString()}{" "}
                {new Date(event.eventsDate).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
              <Link href={`/events/${event._id}`} className="btn">More info</Link >
              <Link href={`/editEvent/${event._id}`}></Link>
            </div>
            <div
              className="flex flex-col justify-start p-3
            "
            >
              <p className="font-semibold mb-4">
                Total tickets: {event.totalTickets}
              </p>
              <p className="font-semibold mb-4">
                Tickets left: {event.totalTickets - event.soldTickets}
              </p>
              <span className="font-bold mb-4">{event.price} $</span>
              <button className="btn w-1/3">Book this event</button>
            </div>
          </div>
  </div>;
};

export default EventBlock;
