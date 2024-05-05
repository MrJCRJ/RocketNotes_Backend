require("dotenv/config")
require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")

const express = require("express")
const cors = require("cors")

const routes = require("./routes")
const uploadConfig = require("./configs/upload")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

migrationsRun()

app.use((error, request, response, next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const port = process.env.SERVER_PORT || 6666
app.listen(port, () => console.log(`Server is running on Port ${port}`))

