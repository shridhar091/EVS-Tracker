import { toast } from 'react-toastify';
import axios from '../confi_axios/axios';
export const GET_USER = 'GET_USER'
export const USER_INFO = 'USER_INFO'
export const startRegisterUser = (formdata, props) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/register`, formdata)
                    if (user.data._id) {
                        toast.success('Register Succesfull', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                        props.props.history.push('/login')

                    }
                    else if (user.data._message) {
                        toast.error(user.data._message, {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });

                    }
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                        });
                }
            }
        )()
    }
}
//user login and get userinfo
export const setUserInfo = (data) => {
    return {
        type: USER_INFO,
        payload: data
    }
}

export const startGetUserInfo = (token) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.get('user/info', { headers: { 'Authorization': token } })

                    dispatch(setUserInfo(user.data))
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}

export const startLoginUser = (formdata, reset, history) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/login`, formdata)
                    localStorage.setItem('token', user.data.token)
                    if (localStorage.getItem('token') !== 'undefined') {
                        dispatch(startGetUserInfo(user.data.token))
                        reset()
                        toast.success('Login Succesfull', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                        history.push('/')
                    } else {
                        // alert('Please Enter valid email or password')
                        toast.error('Please Enter valid email or password', {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });
                            localStorage.clear()
                    }
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                        });
                }
            }
        )()

    }
}

export const setAllUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}
export const startAllUserInfo = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.get('user/list', { headers: { 'Authorization': localStorage.getItem('token') } })
                    dispatch(setAllUser(user.data))
                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                        });
                }
            }
        )()
    }
}

export const startDeleteUserAccount = (props, id, formdata) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const user = await axios.post(`/user/account/delete/${id}`, formdata, { headers: { 'Authorization': localStorage.getItem('token') } })
                    if ((user.data.hasOwnProperty('error'))) {
                        toast.error(user.data.error, {
                            position: "top-right",
                            autoClose: 1000,
                            theme: "colored",
                            });

                    } else {
                        localStorage.clear()
                        props.history.push('/login')
                        alert(user.data)
                    }

                } catch (error) {
                    toast.error(error, {
                        position: "top-right",
                        autoClose: 1000,
                        theme: "colored",
                        });
                }
            }
        )()
    }
}

export const startGetStationUsers=(customerIds)=>{
    return(dispatch)=>{
        (
            async()=>{
                try {
                    const customers=await axios.get(`/${customerIds}`,{headers:{'Authorization':localStorage.getItem('token')}})
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }
}