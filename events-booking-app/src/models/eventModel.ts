import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName:{
    type:String,
    required:[true, "Please provide an username"],
    unique: true,
  },
  description:{
    type: String,
    required:[true, "Please provide an event description"],
  },
  availableTickets:{
    type: Number,
    required:[true, "Please provide an number of available tickets"],
  },
 eventsDate : Date,
  creditCost: {
    type: Number,
    required:[true, "Please provide an howm many credits it costs"],
  },
  
});
const Event = mongoose.models.events || mongoose.model("users", eventSchema);

export default Event