require("dotenv").config()
const jwt = require("jsonwebtoken")
const CustomError = require('../errors');

class JwtToken {
  constructor(user) {
    this.email = user.email
    this.isAdmin = user.isAdmin
    this.fname = user.fname
    this.lname = user.lname
  }

  generateToken() {
    console.log(this);
    console.log(process.env.JWT_SECRET);
    return jwt.sign(JSON.stringify(this), process.env.JWT_SECRET)
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
      throw new CustomError.UnauthenticatedError("token not provided");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      next();
    } catch (error) {
      console.log(error);
      throw new CustomError.UnauthenticatedError("route cannot be acccessed");
    }

  }
}

module.exports = JwtToken