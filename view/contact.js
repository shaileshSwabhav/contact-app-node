const { v4 } = require('uuid');
const { ContactDetail } = require("./contact-detail")

class Contact {
  constructor(fname, lname, isActive, userID) {
    this.id = v4()
    this.fname = fname
    this.lname = lname
    this.isActive = isActive
    this.userID = userID
    this.contactDetails = []
  }
  // - npx sequelize-cli model:generate --name user --attributes firstName:string,lastName:string,email:string

  setName(fname, lname) {
    this.fname = fname
    this.lname = lname
  }

  setIsActive(isActive) {
    this.isActive = isActive
  }

  addContactDetails(type, number, email) {
    const detail = new ContactDetail(type, number, email, this.id)
    this.contactDetails.push(detail)
  }
}

module.exports = { Contact }
