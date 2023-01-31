const express = require("express")
const router = express.Router()
const { StatusCodes } = require('http-status-codes')
const JwtToken = require("../../middleware/jwt")
const { User } = require("../../view")
const CustomError = require("../../errors")

const { addUser, updateUser, deleteUser, getUsers, login } = require("./user.controller")

router.post("/users", addUser)

router.post("/login", login)
router.put("/users/:userID", JwtToken.validateToken, updateUser)
router.delete("/users/:userID", deleteUser)
router.get("/users", JwtToken.validateToken, getUsers)

module.exports = router