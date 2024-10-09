import EventDetails from "@/app/(components)/EventDetails";

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

interface GetEventResponse {
  foundEvent: Event;
}

const getEventById = async (id: string): Promise<GetEventResponse | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/Events/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch event");
    }
    return res.json();
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

const EventPage = async ({ params }: { params: { id: string } }) => {
  let eventData: Event | null = null;

  const eventResponse = await getEventById(params.id);
  if (eventResponse && eventResponse.foundEvent) {
    eventData = eventResponse.foundEvent;
  } else {
    // Display an error message if event data is not found
    return <div>Error fetching event data</div>;
  }

  return <EventDetails event={eventData}/>;
};

export default EventPage;
