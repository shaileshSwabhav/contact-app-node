const { v4 } = require('uuid');
const { Contact } = require("./contact")
const CustomError = require("../errors")

const users = []

class User {
  constructor(fname, lname, email, password, isAdmin, isActive) {
    this.id = v4()
    this.fname = fname
    this.lname = lname
    this.email = email
    this.password = password
    this.isActive = isActive
    this.isAdmin = isAdmin // if user is not admin then consider them as staff
    this.contacts = []

    console.log(this);
  }

  setName(fname, lname) {
    this.fname = fname
    this.lname = lname
  }

  setEmail(email) {
    this.email = email
  }

  setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin
  }

  setIsActive(isActive) {
    this.isActive = isActive
  }

  addContact(fname, lname, isActive) {
    if (this.isAdmin) {
      throw new CustomError.BadRequestError("Admins cannot add contacts")
    }

    const contact = new Contact(fname, lname, isActive, this.id)
    this.contacts.push(contact)
    console.log(this.contacts);
  }

  updateContact(contact, contactID) {
    if (this.isAdmin) {
      throw new CustomError.BadRequestError("Admins cannot add contacts")
    }

    for (let index = 0; index < this.contacts.length; index++) {
      if (this.contacts[index].id == contactID) {
        this.contacts[index].setName(contact.fname, contact.lname)
        this.contacts[index].setIsActive(contact.isActive)
      }
    }
  }
}

module.exports = { User, users }