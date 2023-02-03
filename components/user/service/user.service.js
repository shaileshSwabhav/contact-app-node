const db = require("../../../models")
const CustomError = require("../../../errors")
const { UserRepository } = require("../../../repository");

class UserService {
  async userCreate(user) {
    const transaction = await db.sequelize.transaction();

    try {
      const userRepo = new UserRepository()

      await userRepo.validateUniqueEmail(user, transaction)
      await userRepo.createUser(user, transaction)
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
      await userRepo.doesUserExist(user.id)
      await userRepo.validateUniqueEmail(user, transaction)
      await userRepo.updateUser(user, user.id, transaction)
      await transaction.commit()

    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }

  async deleteUser(userID) {
    const transaction = await db.sequelize.transaction();

    try {
      const userRepo = new UserRepository()
      await userRepo.doesUserExist(userID)
      await userRepo.deleteUser(userID)
      await transaction.commit()

    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }

  async login(email, password) {
    const transaction = await db.sequelize.transaction();
    try {
      const userRepo = new UserRepository()

      const user = await userRepo.getUser({ email: email })
      await transaction.commit()

      console.log("user -> ", user);
      return user
    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }

  async getUser(queryparams) {
    const transaction = await db.sequelize.transaction();

    try {
      console.log("query is -> ", queryparams);
      const userRepo = new UserRepository()

      const users = await userRepo.getUsers(queryparams)
      await transaction.commit()

      return users
    } catch (error) {
      await transaction.rollback()
      throw new CustomError.BadRequestError(error)
    }
  }
}



module.exports = { UserService }