import { Router } from "express";
import { getUserInformation, showAllFighters } from "../controller/usersController.js";

const usersRouter = Router()

usersRouter.post("/battle", getUserInformation)
usersRouter.get("/ranking", showAllFighters)

export default usersRouter