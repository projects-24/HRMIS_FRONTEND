import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function test() {
  return (
  <div className="container">
        <FullCalendar
    plugins={[ dayGridPlugin ]}
    headerToolbar={{
      right: 'prev,next',
    }}
    height={400}
    initialView='dayGridMonth'
    weekends={false}
    events={[
      { title: 'Full Meeting', start: '2024-05-01', end: '2024-05-16'},
    ]}
  />
  </div>
  )
}
