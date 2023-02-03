const { StatusCodes } = require('http-status-codes')
const JwtToken = require("../../../middleware/jwt")
const { comparePassword, hashPassword } = require("../../../security/password")
const { UserService } = require('../service/user.service')
const { User } = require("../../../view")
const { CustomError } = require("../../../errors")

const addUser = async (req, res, next) => {
  try {
    const { fname, lname, email, password, isAdmin, isActive } = req.body

    const hashedPassword = await hashPassword(password)

    // this should be part of service.
    const user = new User(fname, lname, email, hashedPassword, isAdmin, isActive)
    const userSerivce = new UserService()
    await userSerivce.userCreate(user)

    res.status(StatusCodes.CREATED).json(null)
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userID = req.params.userID
    let user = new User()

    const { fname, lname, email, isAdmin, isActive } = req.body

    user.setID(userID)
    user.setName(fname, lname)
    user.setEmail(email)
    user.setIsAdmin(isAdmin)
    user.setIsActive(isActive)

    const userSerivce = new UserService()
    await userSerivce.userUpdate(user)

    res.status(StatusCodes.ACCEPTED).json(null)
  } catch (error) {
    console.error(error);
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    let user = new User()

    user.setEmail(email)
    user.setPassword(password)

    const userSerivce = new UserService()
    const loginUser = await userSerivce.login(email, password)

    console.log("password -> ", password);
    console.log("loginUser -> ", loginUser);

    const isMatch = await comparePassword(password, loginUser.password)

    if (!isMatch) {
      throw new CustomError.BadRequestError("Incorrect email or password specified")
    }

    const jwt = new JwtToken(loginUser)
    const token = jwt.generateToken()

    res.cookie('token', token)

    res.status(StatusCodes.OK).json({
      token: token,
      name: loginUser.fname + " " + loginUser.lname
    })

  } catch (error) {
    console.error(error);
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userID = req.params.userID

    const userSerivce = new UserService()
    await userSerivce.deleteUser(userID)
    res.status(StatusCodes.ACCEPTED).json(null)
  } catch (error) {
    console.error(error);
    next(error)
  }

}

const getUsers = async (req, res) => {
  try {
    const user = new UserService()

    const users = await user.getUser(req.query)
    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    console.error(error);
    throw new CustomError.BadRequestError(error)
  }
}

module.exports = { addUser, updateUser, deleteUser, getUsers, login }