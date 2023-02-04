require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const intializeApp = require("./app")

const route = require("./components")
// const userRoute = require("./components/user")
// const contactRoute = require("./components/contact")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Welcome to Contact App")
})

app.use("/", route)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

// intializeApp(app)

const PORT = process.env.PORT || 5000

const startApp = async () => {
  app.listen(PORT, console.log(`Server started at port ${PORT}`))
}

startApp()