import React from 'react'

const EventDetails = ({params}:{params:{eventId: string}}) => {
  return (
    <div>
      Details about product {params.eventId}
    </div>
  )
}

export default EventDetails
