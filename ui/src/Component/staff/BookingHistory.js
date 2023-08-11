import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { startGetStaffBooking } from "../../Actions/bookingAction";
import { startStaffStation } from "../../Actions/stationAction";
import Calender from "../Calender";


const BookingHistrory = () => {
  const dispatch = useDispatch()
  let token = localStorage.getItem('token')
  let tokendata
  if (token) {
    tokendata = jwt_decode(token)
  }

  //staff stations get
  useEffect(() => {
    dispatch(startStaffStation(tokendata.name))
  }, [dispatch, tokendata.name])

  const station = useSelector((state) => {
    return state.station.data
  })

  //staff station booking
  useEffect(() => {
    if (station.length > 0) {
      const stationIds = station.map((ele) => ele._id )
      dispatch(startGetStaffBooking(...stationIds))
    }
  }, [dispatch, station]);

  const staffBooking = useSelector((state) => {
    return state.booking.data
  })

  //useInfo staff releated station
  useEffect(()=>{
    if (staffBooking.length >0) {
      const customerIds=staffBooking.map(ele=>ele._id)
     dispatch()
    }
  });
  
  return (
    <div>
      {/* {staffBooking.length > 0 ? (
        <div className="card-body">
          <h3>Staff Booking List</h3>
          <hr/>
          {staffBooking.map((booking) => (
            <div key={booking._id}>
              <p>Booking ID: {booking._id}</p>
              <p>Amount: {booking.amount}</p>
              <p>Start Date and Time: {booking.startDateTime}</p>
              <p>End Date and Time: {booking.endDateTime}</p>
              <h4>Car Details</h4>
              <p>Car Name:{booking.carName}</p>
              <p>Car Model:{booking.model}</p>
              <p className="card-text">
                Status: {booking.isStationBooked ? "booked" : "Your booking Slot Expired"}
              </p>
             
            </div>
          ))}
        </div>
      ) : (
        <h1>No bookings found.</h1>
      )}   */}
      <Calender bookings={staffBooking} />
    </div>
  )
}
export default BookingHistrory

