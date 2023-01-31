const { v4 } = require('uuid');

class ContactDetail {
  constructor(type, number, email, contactID) {
    this.id = v4()
    this.type = type
    this.number = number
    this.email = email
    this.contactID = contactID
  }

  setType(type) {
    this.type = type
  }

  setNumber(number) {
    this.number = number
  }

  setEmail(email) {
    this.email = email
  }
}

module.exports = { ContactDetail }
