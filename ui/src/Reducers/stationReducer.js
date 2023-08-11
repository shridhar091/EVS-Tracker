import { ADD_STATION, DELETE_STATION, EDIT_STATION, GET_STATION, STAFF_STATION } from "../Actions/stationAction";
const initialStations = { error: "", data: [] }

export const stationReducer = (state = initialStations, action) => {
    switch (action.type) {
        //post 
        case ADD_STATION: {
            return { ...state, data: [...state.data, action.payload] }
        }
        //get
        case GET_STATION: {
            return { ...state, data: action.payload }
        }
        case DELETE_STATION: {
            const result = state.data.filter(ele => ele._id !== action.payload._id)
            return { ...state, data: result }
        }
        case STAFF_STATION: {
            return { ...state, data: action.payload }
        }
        case EDIT_STATION: {
            const result = state.data.map(ele => {
                if (ele._id === action.payload._id) {
                    return { ...ele, ...action.payload }
                } else {
                    return { ...ele }
                }
            })
            return { ...state, data: result }
        }
        default: {
            return { ...state }
        }


    }
}
