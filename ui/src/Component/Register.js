import React, { useState,useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startRegisterUser } from "../Actions/userActions";
const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const RegistrationForm = (props) => {
  const [userType, setUserType] = useState(" ");

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="customer"
          checked={userType === "customer"}
          onChange={handleUserTypeChange}
        />
        <label className="form-check-label">Customer</label>
      </div>
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          value="staff"
          checked={userType === "staff"}
          onChange={handleUserTypeChange}
        />
        <label className="form-check-label">Staff</label>
      </div>

      {userType === "customer" && <CustomerRegistrationForm props={props} />}
      {userType === "staff" && <StaffRegistrationForm props={props} />}
    </div>
  );
};

const CustomerRegistrationForm = (props) => {
 const ref=useRef()
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState({});

  const formData = {
    name: name,
    email: email,
    password: password,
  };
  const formValidation = () => {
    const error = {};

    if (name.trim().length === 0) {
      error.userName = "Please enter a name";
    }
    if (email.trim().length === 0) {
      error.email = "Please enter an email";
    } else if (!emailFormat.test(email)) {
      error.email = "Please enter a valid email";
    }
    if (password.trim().length === 0) {
      error.password = "Please enter a password";
    } else if (password.trim().length < 8) {
      error.password = "Password must be at least 8 characters long";
    }

    return error;
  }
  useEffect(()=>{
    ref.current.focus()
  },[ref])

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = formValidation();

    if (Object.keys(error).length === 0) {
      dispatch(startRegisterUser(formData, props));
    } else {
      setMessageError(error);
    }
  };


  return (
    <div className="container-fuild">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h2>Customer Registration</h2>
          <div className="card shadow">
            <div className="card-body ">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ref={ref}/>
                  {messageError.userName && (
                    <div className="text-danger">{messageError.userName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {messageError.email && (
                    <div className="text-danger">{messageError.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {messageError.password && (
                    <div className="text-danger">{messageError.password}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StaffRegistrationForm = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageError, setMessageError] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("");

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setRole("staff");
    } else {
      setRole("");
    }
  };

  const formData = {
    name: name,
    email: email,
    password: password,
    role: role,
  };

  const formValidation = () => {
    const error = {};

    if (name.trim().length === 0) {
      error.userName = "Please enter a name";
    }
    if (email.trim().length === 0) {
      error.email = "Please enter an email";
    } else if (!emailFormat.test(email)) {
      error.email = "Please enter a valid email";
    }
    if (password.trim().length === 0) {
      error.password = "Please enter a password";
    } else if (password.trim().length < 8) {
      error.password = "Password must be at least 8 characters long";
    }

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = formValidation();

    if (Object.keys(error).length === 0) {
      dispatch(startRegisterUser(formData, props));
    } else {
      setMessageError(error);
    }
  };

  return (
    <div className="container-fuild">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h2>Staff Registration</h2>
          <div className="card shadow">
            <div className="card-body ">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {messageError.userName && (
                    <div className="text-danger">{messageError.userName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {messageError.email && (
                    <div className="text-danger">{messageError.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {messageError.password && (
                    <div className="text-danger">{messageError.password}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Role</label>
                  <input
                    type="checkbox"
                    value={isChecked}
                    onChange={handleCheckboxChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistrationForm;
