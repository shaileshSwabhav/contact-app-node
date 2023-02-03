require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require('cookie-parser')
const route = require("./components")
// const userRoute = require("./components/user")
// const contactRoute = require("./components/contact")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.get('/', (req, res) => {
  res.send("Welcome to Contact App")
})

app.use("/", route)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

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