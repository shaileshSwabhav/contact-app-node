const { StatusCodes } = require('http-status-codes')
const { User, users } = require("../../view")

const addUser = (req, res) => {
  const { fname, lname, email, isAdmin, isActive } = req.body

  for (let index = 0; index < users.length; index++) {
    if (email == users[index].email) {
      res.status(StatusCodes.BAD_REQUEST).json("Email already exist")
      return
    }
  }

  const user = new User(fname, lname, email, isAdmin, isActive)
  users.push(user)

  res.status(StatusCodes.CREATED).json(null)
}

const updateUser = (req, res) => {

  const userID = req.params.userID
  console.log(userID);

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

const getUsers = (req, res) => {
  res.status(StatusCodes.OK).json(users)
}

const deleteUser = (req, res) => {
  const userID = req.params.userID
  console.log(userID);

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

  users.splice(userIndex, 1)

  res.status(StatusCodes.ACCEPTED).json(null)
}

module.exports = { addUser, updateUser, deleteUser, getUsers }