import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { eventName, description, availableTickets, eventsDate, creditCost } =
      reqBody;
    // should we check that this event already exists or not

    const newEvent = new Event({
      eventName,
      description,
      availableTickets,
      eventsDate,
      creditCost,
    });

    const savedEvent = await newEvent.save();
    console.log(savedEvent);

    return NextResponse.json({
      message: "Eent created successfully",
      success: true,
      savedEvent,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
