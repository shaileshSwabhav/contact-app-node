const db = require("../models")
const CustomError = require("../errors");

class ContactRepository {

  async createContact(contact, transaction) {
    try {
      await db.Contact.create(contact, { transaction: transaction })
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }

  async updateContact(contact, contactID, transaction) {
    try {
      await db.Contact.update(contact, {
        where: {
          id: contactID
        },
        transaction: transaction,
      })
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }

  async deleteContact(contactID, transaction) {
    try {
      await db.Contact.destroy({
        where: {
          id: contactID
        },
        transaction: transaction,
      })
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }

  async getContact(queryparams) {
    try {
      queryparams = queryparams || {}

      const contact = await db.Contact.findOne({
        where: queryparams,
      })

      return contact
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }

  async getContacts(queryparams) {
    try {
      queryparams = queryparams || {}

      const contacts = await db.Contact.findAll({
        where: queryparams,
        order: [
          ['createdAt', 'ASC']
        ],
      })

      return contacts
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }
}

module.exports = { ContactRepository }