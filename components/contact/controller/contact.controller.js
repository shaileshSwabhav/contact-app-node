const { StatusCodes } = require('http-status-codes')
const CustomError = require("../../../errors")
const { User, Contact, users } = require("../../../view")
const { ContactService } = require("../service/contact.service")

const addContact = async (req, res) => {
  try {
    const userID = req.params.userID

    const { fname, lname, isActive, contactDetails } = req.body

    const contact = new Contact(fname, lname, isActive, userID)
    const contactServ = new ContactService()

    await contactServ.addContact(contact)

    res.status(StatusCodes.CREATED).json(null)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(error)
  }
}

const updateContact = (req, res) => {

  try {
    const userID = req.params.userID
    const contactID = req.params.contactID
    const userIndex = User.findUser(userID)

    doesContactExist(userIndex, contactID)

    const { fname, lname, isActive } = req.body

    const contact = new Contact(fname, lname, isActive)
    users[userIndex].updateContact(contact, contactID)

    res.status(StatusCodes.ACCEPTED).json(null)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(error)
  }

}

const deleteContact = (req, res) => {
  try {
    const userID = req.params.userID
    const contactID = req.params.contactID
    const userIndex = User.findUser(userID)

    if (users[userIndex].isAdmin) {
      throw new CustomError.BadRequestError("Admins cannot delete user contacts")
    }

    const userContactIndex = doesContactExist(userIndex, contactID)
    // users[userIndex].contacts.splice(userContactIndex, 1)

    users[userIndex].contacts[userContactIndex].isActive = false

    res.status(StatusCodes.ACCEPTED).json(null)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(error)
  }

}

const getUserContact = (req, res) => {

  try {
    const userID = req.params.userID
    const userIndex = User.findUser(userID)

    res.status(StatusCodes.OK).json(users[userIndex].contacts)

  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(error)
  }

}

const doesContactExist = (userIndex, contactID) => {
  let userContactIndex = -1


  for (let index = 0; index < users[userIndex].contacts.length; index++) {
    if (contactID == users[index].contacts[index].id && users[userIndex].id == users[index].contacts[index].userID) {
      userContactIndex = index
      break
    }
  }


  if (userContactIndex == -1) {
    throw new CustomError.BadRequestError("contact not found for specified user.")
  }

  return userContactIndex
}

module.exports = { addContact, updateContact, deleteContact, getUserContact }