import { Router } from "express";
import { getUserInformation, showAllFighters } from "../controller/usersController.js";
import { authUser } from "../middleware/usersMiddleware.js";

const usersRouter = Router()

usersRouter.post("/battle", authUser, getUserInformation)
usersRouter.get("/ranking", showAllFighters)

export default usersRouter