// const db = require("../models")
const CustomError = require("../errors");

class Repository {

  constructor(db) {
    this.db = db
  }

  async create(payload, transaction) {
    try {
      await this.db.create(payload, { transaction: transaction })
    } catch (error) {
      console.error(error);
      throw new CustomError.BadRequestError(error)
    }
  }

}

module.exports = { Repository }