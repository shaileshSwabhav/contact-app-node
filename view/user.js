const { v4 } = require('uuid');

const users = []

class User {
  constructor(fname, lname, email, isAdmin, isActive) {
    this.id = v4()
    this.fname = fname
    this.lname = lname
    this.email = email
    this.isActive = isActive
    this.isAdmin = isAdmin // if user is not admin then consider them as staff
    this.contacts = []
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

  addContact(contact) {
    this.contacts.push(contact)
    console.log(this.contacts);
  }

  updateContact(contact, contactID) {
    for (let index = 0; index < this.contacts.length; index++) {
      if (this.contacts[index].id == contactID) {
        this.contacts[index].setName(contact.fname, contact.lname)
        this.contacts[index].setIsActive(contact.isActive)
      }
    }
  }
}

module.exports = { User, users }