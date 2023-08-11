import { GET_USER, USER_INFO } from "../Actions/userActions"
const userIntialState={error:"",data:[]}

const userReducer=(state=userIntialState,action)=>{
    switch(action.type){
        case GET_USER:{
               return {...state,data:action.payload}
        }
        case USER_INFO:{
            return{...state,data:action.payload}
        }
        default:{
            return{...state}
        }
    }
}

export default userReducer