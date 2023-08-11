const nodemailer = require("nodemailer");
const Booking = require('../models/booking')
const Station = require('../models/station');
const User = require("../models/user");
require('dotenv').config()
const bookingController = {}

// Function to update the isStationBooked field for a station
async function updateStationBookingStatus(stationId, isBooked) {
    try {
        await Station.findByIdAndUpdate(stationId, { isStationBooked: isBooked }, { new: true, runValidators: true })
    } catch (error) {
        res.json(error)
    }
}

bookingController.create = async (req, res) => {
    try {
        const { body } = req
        // Parse date values from the request body
        const newStartTime = (body.startDateTime)
        const newEndTime = (body.endDateTime)
        // Check if the station is already booked at the requested time
        const existingBooking = await Booking.findOne({
            stationId: body.stationId,
            chargingOptionId: body.chargingOptionId,
            startDateTime: { $lt: newEndTime },  //Matches if values are less than the given value.
            endDateTime: { $gt: newStartTime }   //Matches if values are greater than the given value.
        })
        if (existingBooking) {
            res.json({ error: "Station already booked for the requested time.", existingBooking })
            return
        }
        // If the station is available, create the new booking
        const booking = await Booking.create({
            stationId: body.stationId,
            customerId: req.user.id,
            chargingOptionId: body.chargingOptionId,
            ...body
        })

        if (booking) {
            // Update the isStationBooked field in the Station model to true
            await updateStationBookingStatus(body.stationId, true)
            //FIND CUSTOMER 
            // Find the customer based on their ID
            const customerId = req.user.id
            const user = await User.findById(customerId)
            
            //Find station
            const stationId = body.stationId
            const station = await Station.findById(stationId)
            //NODEMAILER 
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'vitthalss2001@gmail.com',
                    pass: process.env.PASS_KEY
                }
            });
            let info = await transporter.sendMail({
                from: `${station.name}🔌  <vitthalss2001@gmail.com>`, // sender address
                to: user.email, //  receivers
                subject: "Slot Book ✔", // Subject line
                text: "Your Slot is Booked successfull", // plain text body
                html: `<h1>Station Name:${station.name}</h1>
                <h1>Staff Name:${station.staff}</h1>
                <b>Booking Id:${booking._id}</b> <br/>
                <span>Start Date:${booking.startDateTime}</span><br/>
                <span >Start Date:${booking.endDateTime}</span>
                `,
            })
            console.log("Message sent: %s", info.messageId)
            res.json(booking)
            const now = new Date()
            const timeUntilEnd = new Date(body.endDateTime).getTime() - now.getTime()
            if (timeUntilEnd > 0) {
                setTimeout(async () => {
                    // Update the isStationBooked field in the Station model to false after newEndTime
                    await updateStationBookingStatus(body.stationId, false)
                    const updatedBooking = await Booking.findByIdAndUpdate(
                        booking._id,
                        { isBooked: false },
                        { new: true }
                    )

                }, timeUntilEnd)
            }
        } else {
            res.json({})
        }

    } catch (err) {
        res.json(err)
    }
}
bookingController.show = async (req, res) => {
    try {
        const booking = await Booking.find({ customerId: req.user.id })
        if (booking) {
            res.json(booking)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

bookingController.staffAll = async (req, res) => {
    try {
        // Get the station IDs from the request query (assuming stationIds is an array of station IDs)
        const stationIds = req.query.stationIds

        // Find bookings that match any of the provided station IDs
        const bookings = await Booking.find({ stationId: { $in: stationIds } })

        if (bookings.length > 0) {
            res.json(bookings)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}


bookingController.destroy = async (req, res) => {
    try {
        //deleting the specific booking status
        const { id } = req.params
        const booking = await Booking.findByIdAndDelete(id)
        if (booking) {
            res.json(booking)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

//show bookings on specific station  
bookingController.showAll = async (req, res) => {
    try {
        // const stationId = req.query.stationId
        const booking = await Booking.find()
        if (booking) {
            res.json(booking)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

bookingController.staffAll = async (req, res) => {
    try {
        // Get the station IDs from the request query (assuming stationIds is an array of station IDs)
        const stationId = req.query.stationId
        // Find bookings that match any of the provided station IDs
        const bookings = await Booking.find({ stationId: { $in: stationId } }) //{ stationId: { $in: stationId}
        if (bookings.length > 0) {
            res.json(bookings)
        } else {
            res.json({})
        }
    } catch (err) {
        res.json(err)
    }
}

//aggregation

bookingController.aggregate = async (req, res) => {
    try {
        const booking = await Booking.aggregate([
            {
                $match: {
                    amount: { $gte: 100, $lte: 1000 }
                }
            }
        ]);
        console.log(booking, 'hi');
        res.json(booking)
    } catch (error) {
        // Handle the error appropriately
        res.json(error)
    }
};

module.exports = bookingController