const cors = require("cors")
const cookieParser = require('cookie-parser')
const router = require("./components")

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const intializeApp = (app) => {
  app.use(cors());
  app.use(cookieParser());

  app.use("/api/v1", router);

  app.use(errorHandlerMiddleware)
  app.use(notFoundMiddleware)
}

module.exports = intializeApp;
