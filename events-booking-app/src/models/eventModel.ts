import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
},
  name: {
    type: String,
    required: [true, "Please provide an username"],
    unique: true,
  },
  shortDescription: {
    type: String,
    required: [true, "Please provide short event description"],
  },
  description: {
    type: String,
    required: [true, "Please provide an event description"],
  },
  totalTickets: {
    type: Number,
    required: [true, "Please provide an number of available tickets"],
  },
  soldTickets: {
    type: Number,
  },
  eventsDate: Date,
  price: {
    type: Number,
    required: [true, "Please provid how many credits it costs"],
  },
});
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
// const Event = models.Event || model("Event", eventSchema);

export default Event;
