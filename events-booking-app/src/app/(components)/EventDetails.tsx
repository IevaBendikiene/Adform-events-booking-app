import React from "react";
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
interface EventDetailsPorps {
  event: Event;
}

const EventDetails: React.FC<EventDetailsPorps> = ({ event }) => {
  return (
    <div className="flex flex-col ">
      <div>
        <div>
          <img src={event.imageUrl} alt={event.name} />
        </div>
        <div>
          <h1>{event.name}</h1>
          <h4>{event.shortDescription}</h4>
          <p>{event.description}</p>
          <p><span>Avaible tickets:</span>{event.totalTickets - event.soldTickets}</p>
          <p className="font-bold mb-4">
                  {new Date(event.eventsDate).toLocaleDateString()}{" "}
                  {new Date(event.eventsDate).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
        </div>
      </div>
      <div>  
      <h4>{event.shortDescription}</h4>
      <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetails;
