const db = require("../../../models")
const CustomError = require("../../../errors")
const { ContactRepository } = require("../../../repository")

class ContactService {
  async addContact(contact) {
    const transaction = await db.sequelize.transaction();

    try {
      const contactRepo = new ContactRepository()

      await contactRepo.createContact(contact, transaction)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }

  async updateContact(contact, contactID) {
    const transaction = await db.sequelize.transaction();

    try {
      const contactRepo = new ContactRepository()
      await contactRepo.updateContact(contact, contactID, transaction)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }

}

module.exports = { ContactService }