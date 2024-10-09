import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET() {
  try {
    const events = await Event.find();

    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching events:", error.message || error);
    return NextResponse.json(
      {
        message: "Failed to fetch events. Please try again later.",
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      name,
      imageUrl,
      shortDescription,
      description,
      totalTickets,
      soldTickets,
      eventsDate,
      price,
    } = reqBody;
    // should we check that this event already exists or not

    const newEvent = new Event({
      imageUrl,
      name,
      shortDescription,
      description,
      totalTickets,
      soldTickets,
      eventsDate,
      price,
    });

    const savedEvent = await newEvent.save();
    console.log(savedEvent);

    return NextResponse.json({
      message: "Event created successfully",
      success: true,
      savedEvent,
    });
  } catch (error: any) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
