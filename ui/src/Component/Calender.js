import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const Calender = (props) => {
  const [events, setEvents] = useState([])
  
  const getUserName = (id) => {
      const userMatch = props.user.find(ele => ele._id === id)
      return userMatch ? userMatch.name : "Unknown Customer"
  }



  useEffect(() => {
    if (Array.isArray(props.bookings)) { 
      const formattedEvents = props?.bookings.map((ele) => ({
        title: ele.stationName,
        start: ele.startDateTime,
        end: ele.endDateTime,
        customer: getUserName(ele.customerId),
        amount: ele.amount,
      }));
      setEvents(formattedEvents)
    } else {
      // Handle the case when props.bookings is not an array (e.g., initial loading)
      setEvents([])
    }
  }, [props.bookings])

  useEffect(() => {
    // Cleanup function
    return () => {
      // Dispose and remove the popover when component unmounts
      disposePopover();
    };
  }, [])
  // Ref to store the currently active popover
  const activePopoverRef = useRef(null)

  // Function to dispose and remove the popover
  const disposePopover = () => {
    if (activePopoverRef.current) {
      activePopoverRef.current.dispose()
      activePopoverRef.current = null
    }
  }

  // Function to handle event click
  const handleEventClick = (info) => {
    // Dispose and remove the previous popover
    disposePopover()

    // Create a new popover
    activePopoverRef.current = new bootstrap.Popover(info.el, {
      title: `Station Name: ${info.event.title}`,
      placement: 'auto',
      trigger: 'manual', // Use manual trigger to control show/hide manually
      customClass: 'popoverStyle',
      content: `<p>
      <strong>CustomerName:</strong>${info.event.extendedProps.customer} <br/>
      <strong>StartDateTime:</strong>${info.event.start} <br/>
       <strong>EndDateTime:</strong>${info.event.end} <br/>
       <strong>Amount:</strong>${info.event.extendedProps.amount} <br/>
       </p>`,
      html: true,
    })
    activePopoverRef.current.show() // Show the popover
  }

  // Function to handle calendar click (to close popover when clicking outside the events)
  const handleCalendarClick = () => {
    // Dispose and remove the popover
    disposePopover()
  }

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEvents={true}
        // timeZone= 'GMT'
        themeSystem="bootstrap5"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height={'90vh'}
        events={events}
        eventClick={handleEventClick} // Handle event click
        dateClick={handleCalendarClick} // Handle calendar click
      />

    </div>
  )
}

export default Calender
