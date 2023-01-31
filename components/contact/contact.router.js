const express = require("express")
const router = express.Router()

const JwtToken = require("../../middleware/jwt")

const { addContact, updateContact, deleteContact, getUserContact } = require("./contact.controller")

router.post("/users/:userID/contacts", JwtToken.validateToken, addContact)
router.put("/users/:userID/contacts/:contactID", JwtToken.validateToken, updateContact)
router.delete("/users/:userID/contacts/:contactID", JwtToken.validateToken, deleteContact)
router.get("/users/:userID/contacts", getUserContact)

module.exports = router