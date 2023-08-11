import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startAllUserInfo } from "../Actions/userActions";
import { AllStationD } from "./admin/AllStationD";
const Account = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    if (state.user?.data && Array.isArray(state.user.data)) {
      return state.user.data.filter((ele) => ele.role !== "admin");
    } else {
      return []; // Return an empty array or handle other cases here
    }
  });

  useEffect(() => {
    dispatch(startAllUserInfo());
  }, [dispatch]);
  return (
    <div className="container divPadding">
      <div className="row divPadding">
        <div className="col-md-2"></div>
        <div className="col-md-9">
          <AllStationD />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card shodow">
            <div className="card-body">
              {user.length > 0 ? (
                <>
                  <h3>List Of All Users ({user.length})</h3>
                  {user.map((ele) => (
                    <ul key={ele._id}>
                      <li>
                        {ele.name} ({ele.role})
                      </li>
                    </ul>
                  ))}
                </>
              ) : (
                <h1>No users found.</h1>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};
export default Account;