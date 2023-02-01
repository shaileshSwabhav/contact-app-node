const { StatusCodes } = require('http-status-codes')
const JwtToken = require("../../middleware/jwt")
const { comparePassword, hashPassword } = require("../../security/password")
const { userCreate } = require('./user.service')
const { User, users } = require("../../view")

const addUser = async (req, res, next) => {
  // let fetchedCookie = req.cook
  try {
    const { fname, lname, email, password, isAdmin, isActive } = req.body

    const hashedPassword = await hashPassword(password)

    // this should be part of service.
    const user = new User(fname, lname, email, hashedPassword, isAdmin, isActive)
    await userCreate(user)

    res.status(StatusCodes.CREATED).json(null)
  } catch (error) {
    console.error(error);
    next(error)
    // throw new CustomError.BadRequestError({
    //   error: "user could not be added"
    // })
  }
}

const login = async (req, res) => {
  try {

    const { email, password } = req.body
    let userIndex = -1

    if (users.length <= 0) {
      throw new CustomError.BadRequestError("Email not found")
    }

    for (let index = 0; index < users.length; index++) {
      if (email == users[index].email) {
        userIndex = index
        break
      }
    }

    const isMatch = await comparePassword(password, users[userIndex].password)

    if (!isMatch) {
      throw new CustomError.BadRequestError("Incorrect email or password specified")
    }

    const jwt = new JwtToken(users[userIndex])
    const token = jwt.generateToken()

    res.cookie('token', token)

    res.status(StatusCodes.OK).json({
      token: token,
      name: users[userIndex].fname + " " + users[userIndex].lname
    })

  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(error)
  }
}

const updateUser = (req, res) => {

  const userID = req.params.userID
  let user = new User()

  // check if user exist
  for (let index = 0; index < users.length; index++) {
    if (userID == users[index].id) {
      user = users[index]
      break
    }
  }

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json("User not found")
    return
  }

  const { fname, lname, email, isAdmin, isActive } = req.body

  user.setName(fname, lname)
  user.setEmail(email)
  user.setIsAdmin(isAdmin)
  user.setIsActive(isActive)

  res.status(StatusCodes.ACCEPTED).json(null)
}

const deleteUser = (req, res) => {
  const userID = req.params.userID
  let userIndex = -1

  for (let index = 0; index < users.length; index++) {
    if (userID == users[index].id) {
      userIndex = index
      break
    }
  }

  if (!userIndex == -1) {
    res.status(StatusCodes.BAD_REQUEST).json("User not found")
    return
  }

  users[userIndex].isActive = false
  res.status(StatusCodes.ACCEPTED).json(null)
}

const getUsers = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(error)
  }
}

module.exports = { addUser, updateUser, deleteUser, getUsers, login }