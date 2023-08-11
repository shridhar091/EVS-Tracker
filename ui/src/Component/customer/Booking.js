import React from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { startBooking } from "../../Actions/bookingAction";

const Booking = (props) => {
  const { station } = props.location.state;
  const dispatch = useDispatch();
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [port, setPort] = useState("");
  const [ratePerMinute, setRatePerMinute] = useState(0);
  //port type price one minute
  const [pricePortType, setPricePortType] = useState(0);
  const [stationId, setStationId] = useState("");
  const [errors, setErrors] = useState({});
  //car info
  const [carName, setCarName] = useState("");
  const [model, setModel] = useState("");

  // user info
  let token = localStorage.getItem("token");
  let tokendata;
  if (token) {
    tokendata = jwt_decode(token);
  }
  //SET PRICE OF THE PORT DEFAULT
  const price = () => {
    if (station) {
      const price = station.chargingOptions.map((ele) => {
        if (ele._id === port) {
          return ele.price;
        }
      });
      setPricePortType(price);
    }
  };
  // station id set to stationId state
  const stationsId = () => {
    if (station) {
      setStationId(station._id);
    }
  };

  const calculateAmount = () => {
    if (startDateTime && endDateTime) {
      const start = new Date(startDateTime);
      const end = new Date(endDateTime);
      const duration = (end - start) / 60000;
      const amount = duration * pricePortType;
      setRatePerMinute(amount);
    } else {
      setRatePerMinute(0);
    }
  };

  useEffect(() => {
    calculateAmount();
    stationsId();
    price();
  }, [port, startDateTime, endDateTime]);

  const formValidation = () => {
    const errors = {};

    if (!carName) {
      errors.carName = "Please enter a car name.";
    }

    if (!model) {
      errors.model = "Please choose a car model type.";
    }

    if (!port) {
      errors.port = "Please choose a Port type.";
    }

    if (!startDateTime) {
      errors.startDateTime = "Please select the Start Date and Time.";
    }

    if (!endDateTime) {
      errors.endDateTime = "Please select the End Date and Time.";
    } else if (new Date(endDateTime) <= new Date(startDateTime)) {
      errors.endDateTime =
        "End Date and Time must be greater than Start Date and Time.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (formValidation()) {
      const formData = {
        amount: ratePerMinute,
        startDateTime: startDateTime,
        endDateTime: endDateTime,
        chargingOptionId: port,
        stationId: stationId,
        stationName: station.name,
        carName: carName,
        model: model,
      };

      const reset = () => {
        setEndDateTime("");
        setStartDateTime("");
        setPort("");
        ratePerMinute(0);
      };
      dispatch(startBooking(props, formData, reset, tokendata));
    }
  };

  const stylishCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "10px",
    margin: "10px",
    backgroundColor: "#f8f8f8",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="card-body" style={stylishCardStyle}>
      <h2>Station Details</h2>
      <h5 className="card-title">
        <strong>Station Name:</strong>
        {station.name}
      </h5>
      <p className="card-text">
        <strong>Address:</strong> {station.address}
      </p>
      <p className="card-text">
        <strong>Landmark:</strong> {station.landmark}
      </p>
      <p className="card-text">
        <strong>Staff:</strong> {station.staff}
      </p>

      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Book Your Slot</h1>
              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label className="form-label">Car Name</label>
                  <br />
                  <input
                    type="String"
                    className={`form-control ${
                      errors.carName ? "is-invalid" : ""
                    }`}
                    placeholder="Car Name"
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                  />
                  {errors.carName && (
                    <div className="invalid-feedback">{errors.carName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="from-label">Select the the Car type</label>
                  <select
                    className={`form-select ${
                      errors.model ? "is-invalid" : ""
                    }`}
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  >
                    <option value="">Select Car Type</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="MUV">MUV</option>
                    <option value="other">Others</option>
                  </select>
                  {errors.model && (
                    <div className="invalid-feedback">{errors.model}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Choose your Port type</label>
                  <select
                    className={`form-select ${errors.port ? "is-invalid" : ""}`}
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                  >
                    <option value="">Select Port</option>
                    {station.chargingOptions.map((chargingOption) => (
                      <option
                        key={chargingOption._id}
                        value={chargingOption._id}
                      >
                        {chargingOption.portType}
                      </option>
                    ))}
                  </select>
                  {errors.port && (
                    <div className="invalid-feedback">{errors.port}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Start Date and Time:</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${
                      errors.startDateTime ? "is-invalid" : ""
                    }`}
                    value={startDateTime}
                    onChange={(e) => {
                      setStartDateTime(e.target.value);
                      calculateAmount();
                    }}
                  />
                  {errors.startDateTime && (
                    <div className="invalid-feedback">
                      {errors.startDateTime}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">End Date and Time:</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${
                      errors.endDateTime ? "is-invalid" : ""
                    }`}
                    value={endDateTime}
                    onChange={(e) => {
                      setEndDateTime(e.target.value);
                      calculateAmount();
                    }}
                  />
                  {errors.endDateTime && (
                    <div className="invalid-feedback">{errors.endDateTime}</div>
                  )}
                </div>
                {startDateTime && endDateTime && (
                  <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                      type="text"
                      className="form-control"
                      value={ratePerMinute}
                      disabled
                    />
                  </div>
                )}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Book Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
