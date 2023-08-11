const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BookingSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    stationId: {
        type: Schema.Types.ObjectId,
        ref: "Station"
        
    },
    chargingOptionId: {
        type: Schema.Types.ObjectId,
        ref: "ChargingOptions"
    },
    amount: {
        type: Number
    },
    bookedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    startDateTime: {
        type: String,
        required:true
    },
    endDateTime: {
        type: String,
        required:true
    },
    isBooked:{
        type:Boolean,
        default:true
    },
    stationName:{
        type:String
    },
    carName:{
        type:String
    },
    model:{
        type:String
    }
})
const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking