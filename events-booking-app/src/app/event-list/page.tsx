import React from "react";

const EventsList = () => {
  return (
    <div>
      <h2>Explore secret London</h2>
      <table>
        <tr>
          <td>event image</td>
          <td>
            <h3>Name of event</h3>
            <h4>short decription of events</h4>
            <p>Date of event</p>
            <button>More info</button>
            <p>Number of total tickets</p>
            <p>Number of tickets left</p>
            <p><span>Event price</span></p>
            
            <button>Book this event</button>
          </td>
        </tr>
        <tr></tr>
      </table>
    </div>
  );
};

export default EventsList;
