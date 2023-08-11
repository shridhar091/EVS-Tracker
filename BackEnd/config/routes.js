const express = require('express')
const userController = require('../app/controller/userController')
const count = require('../app/middleware/count')
const authenticateUser = require('../app/middleware/authenticateUser')
const authorizeUser = require('../app/middleware/authorization')
const stationController = require('../app/controller/stationController')
const bookingController = require('../app/controller/bookingController')
const router = express.Router()

//user Routes
router.post('/user/register', count, userController.register)
router.post('/user/login', userController.login)
//user List 
router.get('/user/list', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, userController.list)
router.get('/user/Info', authenticateUser, userController.info)
//delete user Account
router.post('/user/account/delete/:id', authenticateUser, userController.account)
//station releated user
router.get('/api/customers',authenticateUser, (req, res, next) => {
    req.permittedRoles = ['staff']
    next()
}, authorizeUser,userController.staffCustomers)

//STATION
//create station
router.post('/api/station', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'staff']
    next()
}, authorizeUser, stationController.create)
//get specific station details 
router.get('/api/station/:id', authenticateUser, (req, res, next) => {

    req.permittedRoles = ['admin', 'staff']
    next()
}, authorizeUser, stationController.show)
//get all station details 
router.get('/api/station', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'Customer']
    next()
}, authorizeUser, stationController.list)
//update station details
router.put('/api/station/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, stationController.update)
//delete station and that related charging options also delete
router.delete('/api/station/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, stationController.destroy)
//find station on staff name
router.get('/station/staffname', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['staff']
    next()
}, authorizeUser, stationController.findOnStaffName)
//search
router.get('/api/search',authenticateUser,stationController.search)

//Booking Api's
router.post('/api/booking', authenticateUser, bookingController.create)
router.get('/api/booking', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['Customer']
    next()
}, authorizeUser, bookingController.show)
router.get('/api/staff/booking', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['staff']
    next()
}, authorizeUser, bookingController.staffAll)
router.delete('/api/booking/:id', authenticateUser, bookingController.destroy)

//all stations booking details
router.get('/api/all/booking', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, bookingController.showAll)
//staff station booking details
router.get('/api/staff/booking', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['staff']
    next()
}, authorizeUser, bookingController.staffAll)

//aggreget
router.get('/api/aggreget',bookingController.aggregate)
module.exports = router