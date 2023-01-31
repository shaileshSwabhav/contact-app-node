require("dotenv").config()
const jwt = require("jsonwebtoken")
const CustomError = require('../errors');

class JwtToken {
  constructor(user) {
    this.userID = user.id
    this.email = user.email
    this.isAdmin = user.isAdmin
    this.fname = user.fname
    this.lname = user.lname
  }

  createPayload() {
    return {
      id: this.userID,
      email: this.email,
      fname: this.fname,
      lname: this.lname,
    }
  }

  generateToken() {
    return jwt.sign(this.createPayload(), process.env.JWT_SECRET, {
      expiresIn: "1d"
    })
  }

  static validateToken(req, res, next) {
    // let cookie = req.headers.cookie
    // console.log("cookie -> ", cookie);
    // if (!cookie) {
    //   throw new CustomError.UnauthorizedError("Cookie not found")
    // }

    // try {
    //   const decoded = jwt.verify(cookie['token'], process.env.JWT_SECRET);
    //   console.log(decoded);
    //   next();
    // } catch (error) {
    //   console.log(error);
    //   throw new CustomError.UnauthenticatedError("route cannot be acccessed");
    // }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new CustomError.UnauthorizedError("token not provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decoded -> ", decoded);
      next();
    } catch (error) {
      console.log(error);
      throw new CustomError.UnauthorizedError("route cannot be acccessed");
    }

  }
}

module.exports = JwtToken