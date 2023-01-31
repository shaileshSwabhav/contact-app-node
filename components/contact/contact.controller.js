const express = require("express")
const router = express.Router()

const { addContact, updateContact, deleteContact, getUserContact } = require("./contact.service")

router.post("/users/:userID/contacts", addContact)
router.put("/users/:userID/contacts/:contactID", updateContact)
router.delete("/users/:userID/contacts/:contactID", deleteContact)
router.get("/users/:userID/contacts", getUserContact)

module.exports = router