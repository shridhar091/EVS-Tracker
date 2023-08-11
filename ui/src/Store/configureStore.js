import {createStore,combineReducers ,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../Reducers/userReducer'
import { stationReducer } from '../Reducers/stationReducer'
import { bookingReducer } from '../Reducers/bookingReducer'

 const configureStore =()=>{
    const store = createStore(combineReducers({
        user:userReducer,
        station:stationReducer,
        booking:bookingReducer
    }),applyMiddleware(thunk))
    return store
 }
 export default configureStore