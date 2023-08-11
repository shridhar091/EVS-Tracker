import React, { useState,useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { startLoginUser } from '../Actions/userActions';
import { useHistory, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const Login = (props) => {
  const ref=useRef()
  const history = useHistory()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [messageError, setMessageError] = useState({})
  const error = {}
  
  const validationForm = () => {
    if (email.trim().length === 0) {
      error.email = 'Please Enter Email';
    } else if (!emailFormat.test(email)) {
      error.email = 'Please Enter a Valid Email';
    }

    if (password.trim().length === 0) {
      error.password = 'Please Enter Password';
    } else if (password.length < 8) {
      error.password = 'Password must be at least 8 characters long';
    }
  }
  const formdata = {
    email: email,
    password: password
  }

  const reset = () => {
    setEmail('')
    setPassword('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    validationForm()
    if (Object.keys(error).length === 0) {
      dispatch(startLoginUser(formdata, reset, history))
    } else {
      setMessageError(error)
    }
  }

  //focus input field email
  useEffect(()=>{
    ref.current.focus()
  },[ref])
  

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <h1>Login</h1>
          <div className='card shadow'>
            <div className='card-body'>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email}
                    onChange={(e) => setEmail(e.target.value)} ref={ref}/>
                  {messageError.email && <div> <span style={{ color: "red" }}>{messageError.email}</span></div>}
                </div>
                <div className="mb-3 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <input type='password' className="form-control" id="exampleInputPassword1" value={password}
                    onChange={(e) => { setPassword(e.target.value) }} />
                  {messageError.password && <div><span style={{ color: "red" }}>{messageError.password}</span></div>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  )
}

export default withRouter(Login)
