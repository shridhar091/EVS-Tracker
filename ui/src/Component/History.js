import React, { useEffect } from "react"
import { startGetAllBooking } from "../Actions/bookingAction"
import { useDispatch, useSelector } from "react-redux"
import Calender from "./Calender"
import { startAllUserInfo } from '../Actions/userActions'

const History = (props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startGetAllBooking())
  }, [dispatch])
  //booking history
  const bookings = useSelector((state) => {
    return state.booking.data
  })
  //user info
useEffect(()=>{
  dispatch(startAllUserInfo())
},[dispatch])
const user=useSelector((state)=>{
 return state.user.data
})

  return (
    <div className="container-fluid">
      <div>
        <div>
        <Calender bookings={bookings} user={user}/>
        </div>
      </div>
     
    </div>
  )
}
export default History