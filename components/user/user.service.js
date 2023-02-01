const { users } = require("../../view")
const CustomError = require("../../errors")

const userCreate = async (user) => {
  try {
    await validateUniqueEmail(user.email)
    users.push(user)
  } catch (error) {
    throw new CustomError.BadRequestError(error)
  }
}

const validateUniqueEmail = async (email) => {

  for (let index = 0; index < users.length; index++) {
    if (email == users[index].email) {
      throw new CustomError.BadRequestError("Email already exist")
    }
  }
}

module.exports = { userCreate }