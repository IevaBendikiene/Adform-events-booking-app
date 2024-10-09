import { connect } from "@/dbConfig/dbConfig";
import Event from "@/models/eventModel";
import { NextRequest, NextResponse } from "next/server";

connect();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const foundEvent = await Event.findOne({ _id: id });
    return NextResponse.json({ foundEvent }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Delete the event from the database
    const deletedEvent = await Event.findByIdAndDelete(id);

    // If the event with the provided ID does not exist
    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Return a success response
    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error deleting event", error: error.message },
      { status: 500 }
    );
  }
}
  export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const { id } = params;
      const body = await request.json()
      const eventData = body.formData

  const updateEventData = await Event.findByIdAndUpdate(id, {
    ...eventData,
  })
     
  
      // If the event with the provided ID does not exist
      if (!updateEventData) {
        return NextResponse.json({ message: "Event not updated" }, { status: 404 });
      }
  
      // Return a success response
      return NextResponse.json(
        { message: "Event updated" },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Error updating event", error: error.message },
        { status: 500 }
      );
    }
}
