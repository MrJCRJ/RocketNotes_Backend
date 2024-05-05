const {Router} = require("express")

const SessionsController = require("../controllers/SessionController")
const sessionController = new SessionsController()

const sessionRoutes = Router()
sessionRoutes.post("/", sessionController.create)

module.exports = sessionRoutes