const express = require("express")
const userRouter = require("./user/index")
const contactRouter = require("./contact/index")

const router = express.Router()
router.use("/", userRouter)
router.use("/", contactRouter)

module.exports = router
