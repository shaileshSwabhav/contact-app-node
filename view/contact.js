const { v4 } = require('uuid');
const ContactDetail = require("./contact-detail") 

class Contact {
  constructor (fname, lname, isActive, userID) {
    this.id = v4()
    this.fname = fname
    this.lname = lname
    this.isActive = isActive
    this.userID = userID
    this.contactDetails = []
  }

  setName(fname, lname) {
    this.fname = fname
    this.lname = lname
  }

  setIsActive(isActive) {
    this.isActive = isActive
  }
}

module.exports = { Contact }
