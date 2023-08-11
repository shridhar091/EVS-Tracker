const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Booking = require('../models/booking')
require('dotenv').config()

const userController = {}

userController.register = async (req, res) => {
    try {
        const { body } = req
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const encrypted = await bcrypt.hash(user.password, salt)
        user.password = encrypted
        const result = await user.save()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

userController.login = async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOne({ email: body.email })
        if (!user) {
            res.json({ error: "Invalid password or email" })
        } else {
            const match = await bcrypt.compare(body.password, user.password)
            if (match) {
                const tokendata = {
                    id: user._id,
                    name: user.name,
                    role: user.role
                }
                const token = jwt.sign(tokendata, process.env.JWT_KEY)
                res.json({
                    token: `Bearer ${token}`
                })
            } else {
                res.json({ error: "Invalid Password or Email" })
            }
        }
    } catch (error) {
        res.json(error)
    }
}

//user Info
userController.list = async (req, res) => {
    try {
        const users = await User.find()
        if (users) {
            res.json(users)
        } else {
            res.json({ error: "Users not Found" })
        }
    } catch (error) {
        res.json(error)
    }
}

//user Info
userController.info = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        res.json(user)
    } catch (error) {
        res.json(error)
    }
}

userController.account = async (req, res) => {
    try {
        const { body } = req
        const { id } = req.params
        const user = await User.findOneAndDelete({ _id: id })
        const compare = await bcrypt.compare(body.password, user.password)
        if (compare) {
            res.json('Account Deleted Successfuly')
        } else {
            res.json({ error: "Check Your Password" })
        }

    } catch (error) {
        res.json(error)
    }
}
userController.staffCustomers=async(req,res)=>{
    try {
        const {id}=req.params
        const customers=await User.find({_id:id})
        
    } catch (error) {
        res.json(error)
    }
}
module.exports = userController