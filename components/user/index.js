const express = require("express")
const userRouter = express.Router()
const JwtToken = require("../../middleware/jwt")

const { addUser, updateUser, deleteUser, getUsers, login } = require("./controller/user.controller")

userRouter.post("/users", addUser)
userRouter.post("/login", login)
userRouter.put("/users/:userID", updateUser)
userRouter.delete("/users/:userID", deleteUser)
userRouter.get("/users", getUsers)

module.exports = userRouter
