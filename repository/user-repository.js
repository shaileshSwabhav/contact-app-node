const db = require("../models")
const CustomError = require("../errors");

class UserRepository {

  async createUser(user, transaction) {
    try {
      await db.User.create(user, { transaction: transaction })
    } catch (error) {
      console.error(error);
      throw new CustomError.BadRequestError(error)
    }
  }

  async updateUser(user, userID, transaction) {
    try {
      await db.User.update(user, {
        where: {
          id: userID
        },
        transaction: transaction,
      })
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }

  async deleteUser(userID, transaction) {
    try {
      await db.User.destroy({
        where: {
          id: userID
        },
        transaction: transaction,
      })
    } catch (error) {
      console.error(error);
      throw new CustomError.BadRequestError(error)
    }
  }

  async getUser(queryparams) {
    try {
      queryparams = queryparams || {}

      const user = await db.User.findOne({
        where: queryparams
      })
      console.log(user);
      return user
    } catch (error) {
      console.error(error);
      throw new CustomError.BadRequestError(error)
    }
  }

  async getUsers(queryparams) {
    try {
      queryparams = queryparams || {}

      const users = await db.User.findAll({
        where: queryparams,
        order: [
          ['createdAt', 'ASC']
        ],
      })

      return users
    } catch (error) {
      console.error(error);
      throw new CustomError.BadRequestError(error)
    }
  }

  async doesUserExist(userID) {
    try {
      const findUser = await db.User.findOne({
        where: {
          id: userID,
        }
      })

      if (!findUser) {
        throw new CustomError.BadRequestError("User not found")
      }
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }

  async validateUniqueEmail(user, transaction) {
    try {

      if (!user.email) {
        throw new CustomError.BadRequestError("Email must be specified")
      }

      // check if email exist
      const findEmail = await db.User.findOne({
        where: {
          email: user.email
        }
      }, { transaction: transaction })

      if (findEmail) {
        throw new CustomError.BadRequestError("Email already exist")
      }
    } catch (error) {
      throw new CustomError.BadRequestError(error)
    }
  }
}


module.exports = { UserRepository }