import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeleteStation,
  startGetAllStations,
} from "../../Actions/stationAction";
import Station from "../Station";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import StationLocation from "./StationLocation";

export const AllStationD = (props) => {
  const [modal, setModal] = useState(false);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [edit, setEdit] = useState({});
  const [location, setLocation] = useState({});
  const dispatch = useDispatch();
  const station = useSelector((state) => {
    return state.station;
  });
  useEffect(() => {
    dispatch(startGetAllStations());
  }, [dispatch]);
  //handle delete station
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(startDeleteStation(id));
    }
    // dispatch(startDeleteStation(id))
  };
  //handle Edit station
  const handleEdit = (ele) => {
    setShow1(false);
    setShow(true);
    toggle();
    setEdit(ele);
  };

  const handleLocation = (ele) => {
    setShow(false);
    setShow1(true);
    toggle();
    setLocation(ele);
  };
  return (
    <div className="card-container">
      {station.data.length !== 0 ? (
        <div>
          <h3>List Of All Station({station.data.length})</h3>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {station.data.map((ele, i) => (
              <div key={i} className="col mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h4>Station Name:{ele.name}</h4>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Address:</strong> {ele.address}
                    </p>
                    <p>
                      <strong>Landmark:</strong> {ele.landmark}
                    </p>
                    <p>
                      <strong>Staff:</strong> {ele.staff}
                    </p>
                    <p>
                      <strong>Charging Options:</strong>
                    </p>
                    <ul>
                      {station &&
                        ele.chargingOptions &&
                        ele.chargingOptions.map((option, j) => (
                          <li key={j}>{option.portType}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => {
                        handleLocation(ele.geo);
                      }}
                    >
                      Location
                    </button>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={(e) => {
                        handleEdit(ele);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        handleDelete(ele._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>No Station Found</h1>
      )}
      {show && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Edit Station</ModalHeader>
          <ModalBody>
            <div className="col-md-12">
              <Station data={edit} toggle={toggle} />
            </div>
          </ModalBody>
        </Modal>
      )}
      {show1 && (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Station Location</ModalHeader>
          <ModalBody>
            <div className="col-md-12">
              <StationLocation data={location} />
            </div>
          </ModalBody>
        </Modal>
      )}
  </div>
);
};