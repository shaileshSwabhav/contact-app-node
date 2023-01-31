const express = require("express")
const router = express.Router()
const { addUser, updateUser, deleteUser, getUsers } = require("./user.service")

router.post("/users", addUser)
router.put("/users/:userID", updateUser)
router.delete("/users/:userID", deleteUser)
router.get("/users", getUsers)

module.exports = router