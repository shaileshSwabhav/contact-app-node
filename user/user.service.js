const db = require("../../models")
const CustomError = require("../../errors")
const { UserRepository } = require("../../repository")


class UserService {
  async userCreate(user) {
    const transaction = await db.sequelize.transaction();

    try {
      const userRepo = new UserRepository()

      await userRepo.validateUniqueEmail(user, transaction)
      await userRepo.createRepoUser(user, transaction)
      // users.push(user)

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }

  async userUpdate(user) {
    const transaction = await db.sequelize.transaction();

    try {
      const userRepo = new UserRepository()

      await userRepo.validateUniqueEmail(user, transaction)
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }
}



module.exports = { UserService }