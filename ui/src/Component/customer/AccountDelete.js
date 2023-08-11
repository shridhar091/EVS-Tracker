import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteUserAccount, startGetUserInfo } from "../../Actions/userActions";

const AccountDelete = (props) => {
    const token = localStorage.getItem('token')
    const [toggle, setToggle] = useState(false)
    const [password, setPassword] = useState('')
    const dispatch = useDispatch(token)
    useEffect(() => {
        dispatch(startGetUserInfo(token))
    }, [dispatch,token])
    const user = useSelector(state => state.user.data)
    const formData = {
        password
    }
    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(startDeleteUserAccount(props,user._id, formData))
    }

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2>Profile</h2>
                            <h3>Name: {user.name}</h3>
                            <h3>Email: {user.email}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row mt-4">
                <div className="col-md-4">
                    <div className="card shadow">
                        <div className="card-body">
                            {toggle ? (
                                <form className="form" onSubmit={handleDelete}>
                                    <label >Password</label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <input type="submit" value='Confirm Delete' className="btn btn-danger mt-2" />
                                    <button className="btn btn-secondary mt-2" onClick={() => setToggle(false)}>Cancel</button>
                                </form>
                            ) : (
                                <button className="btn btn-danger mt-3" onClick={() => setToggle(true)}>Delete Account</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default AccountDelete;
