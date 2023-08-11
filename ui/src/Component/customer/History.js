import React, { useEffect, useState } from "react";
import { startGetUserBooking } from "../../Actions/bookingAction";
import { useDispatch, useSelector } from "react-redux";

const PAGE_SIZE = 3; // Number of bookings per page

const History = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(startGetUserBooking());
  }, [dispatch]);

  const bookings = useSelector((state) => {
    return state.booking.data;
  });
  const reversedBookings = Array.isArray(bookings) ? [...bookings].reverse() : [];

  // Calculate the total number of pages
  const totalPages = Math.ceil(reversedBookings.length / PAGE_SIZE);

  // Get the current page's bookings
  const indexOfLastBooking = currentPage * PAGE_SIZE;
  const indexOfFirstBooking = indexOfLastBooking - PAGE_SIZE;
  const currentBookings = reversedBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h3>Booking list</h3>
      <div className="card-deck">
        {currentBookings.map((booking) => (
          <div key={booking._id} className="card" id="history">
            <div className="card-body">
              <h4 className="card-title">Station Name: {booking.stationName}</h4>
              <p className="card-text">Amount to be paid: {booking.amount}</p>
              <p className="card-text">Start: {booking.startDateTime}</p>
              <p className="card-text">End: {booking.endDateTime}</p>
              <p className="card-text">
                Status: {booking.isStationBooked ? "booked" : "Your booking Slot Expired"}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary me-2" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <button className="btn btn-primary" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default History;