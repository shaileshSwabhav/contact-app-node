const express = require("express")
const contactRouter = express.Router()

const JwtToken = require("../../middleware/jwt")

const { addContact, updateContact, deleteContact, getUserContact } = require("./controller/contact.controller")

contactRouter.post("/users/:userID/contacts", JwtToken.validateToken, addContact)
contactRouter.put("/users/:userID/contacts/:contactID", JwtToken.validateToken, updateContact)
contactRouter.delete("/users/:userID/contacts/:contactID", JwtToken.validateToken, deleteContact)
contactRouter.get("/users/:userID/contacts", getUserContact)

module.exports = contactRouter