import { ADD_BOOKING, GETALL_BOOKING, GET_BOOKING, SETALL_BOOKING } from "../Actions/bookingAction"

const intialbooking={error:'',data:[]}

export const bookingReducer=(state=intialbooking,action)=>{
    switch (action.type){
        case ADD_BOOKING:{
            return {...state,data:{...state.data, ...action.payload}}
        }
        case GET_BOOKING:{
            return {...state,data:action.payload}
        }
        case GETALL_BOOKING:{
            return{...state,data:action.payload}
        }
        case SETALL_BOOKING:{
            return {...state,data:action.payload}
        }

        default:{
            return {...state}
        }
    }
}