require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const cors = require("cors")

const userRoute = require("./components/user/user.router")
const contactRoute = require("./components/contact/contact.router")

const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Welcome to Contact App")
})

app.use("/", userRoute, contactRoute)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

// const userOne = new User("john", "doe", true, true)
// users.push(userOne)

// const userTwo = new User("adam", "domingo", true, true)
// users.push(userTwo)


// console.log(users);
const startApp = async () => {
  app.listen(PORT, console.log(`Server started at port ${PORT}`))
}

startApp()