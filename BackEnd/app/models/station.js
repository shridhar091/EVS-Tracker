const mongoose = require('mongoose')

const Schema = mongoose.Schema
const StationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    landmark: {
        type: String
    },
    geo: {
        latitude: Number,
        longitude: Number
    },
    chargingOptions: [
        {
            portType: {
                type: String
            },
            price: {
                type: Number
            }
        }
    ],
    staff: {
        type: String,
        required: true,
    },
    isStationBooked: {
        type: Boolean,
        default: false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }

})
const Station = mongoose.model('Station', StationSchema)

module.exports = Station