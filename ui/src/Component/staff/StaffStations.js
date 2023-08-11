import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startStaffStation } from "../../Actions/stationAction";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import axios from "../../confi_axios/axios";

const StaffStations = (props) => {
    const history = useHistory();
    const token = localStorage.getItem('token');
    let tokendata;
    if (token) {
        tokendata = jwtDecode(token);
    }
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startStaffStation(tokendata.name));
    }, [dispatch, tokendata.name]);

    const staff = useSelector((state) => {
        return state.station.data;
    });

    const handleBook = (ele) => {
        if (window.confirm("You want to book the slot")) {
            history.push({
                pathname: "/booking",
                state: { station: ele }
            });
        }
    }

    const handleLocation = async (ele) => {
        const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${ele.latitude}+${ele.longitude}&key=21f121c390e64295a445928b4d642f54`);
        const res = (result.data.results.map(ele => ele.components.city));
        alert(res);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card-container">
                        {staff && staff.length > 0 ? (
                            <>
                                <h3 className="mb-4">List Of All Station ({staff.length})</h3>
                                <div className="card-columns">
                                    {staff.map((ele, i) => (
                                        <div key={i} className="card mb-4">
                                            <div className="card-header">
                                                <h4 className="mb-0">Station Name: {ele.name}</h4>
                                            </div>
                                            <div className="card-body">
                                                <p><strong>Address:</strong> {ele.address}</p>
                                                <p><strong>Landmark:</strong> {ele.landmark}</p>
                                                <p><strong>Staff:</strong> {ele.staff}</p>
                                                <p><strong>Charging Options:</strong></p>
                                                <ul className="list-unstyled">
                                                    {ele.chargingOptions.map((option, j) => (
                                                        <li key={j}>{option.portType}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="card-footer">
                                                <button className="btn btn-primary me-2" onClick={() => { handleLocation(ele.geo) }}>Location</button>
                                                <button className="btn btn-success" onClick={(e) => { handleBook(ele) }}>Book</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <h1>No Station Found</h1>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StaffStations;