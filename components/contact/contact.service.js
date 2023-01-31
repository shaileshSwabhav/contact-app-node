const { StatusCodes } = require('http-status-codes')
const CustomError = require("../../errors")
const { Contact, users } = require("../../view")

const addContact = (req, res) => {
  try {
    const userID = req.params.userID
    const userIndex = doesUserExist(userID)

    if (users[userIndex].isAdmin) {
      throw new CustomError.BadRequestError("Admins cannot add contacts")
    }

    const { fname, lname, isActive } = req.body

    const contact = new Contact(fname, lname, isActive, userID)
    users[userIndex].addContact(contact)

    res.status(StatusCodes.CREATED).json(null)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(err)
  }
}

const updateContact = (req, res) => {

  try {
    const userID = req.params.userID
    const contactID = req.params.contactID
    const userIndex = doesUserExist(userID)

    if (users[userIndex].isAdmin) {
      throw new CustomError.BadRequestError("Admins cannot add contacts")
    }

    doesContactExist(userIndex, contactID)

    const { fname, lname, isActive } = req.body

    const contact = new Contact(fname, lname, isActive)
    users[userIndex].updateContact(contact, contactID)

    res.status(StatusCodes.ACCEPTED).json(null)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(err)
  }

}

const deleteContact = () => {
  try {
    const userID = req.params.userID
    const contactID = req.params.contactID
    const userIndex = doesUserExist(userID)

    if (users[userIndex].isAdmin) {
      throw new CustomError.BadRequestError("Admins cannot delete user contacts")
    }

    const userContactIndex = doesContactExist(userIndex, contactID)
    users[userIndex].contacts.splice(userContactIndex, 1)

    res.status(StatusCodes.ACCEPTED).json(null)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(err)
  }

}

const getUserContact = (req, res) => {

  try {
    const userID = req.params.userID
    let userIndex = doesUserExist(userID)

    res.status(StatusCodes.OK).json(users[index].contacts)

  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(err)
  }

}

const doesUserExist = (userID) => {
  let userIndex = -1

  for (let index = 0; index < users.length; index++) {
    if (userID == users[index].id) {
      userIndex = index
      break
    }
  }

  if (userIndex == -1 || !users[userIndex].isActive) {
    throw new CustomError.BadRequestError("user not found")
  }

  return userIndex
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