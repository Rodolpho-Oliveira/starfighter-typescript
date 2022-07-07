import express, {json} from "express"
import "express-async-errors"
import cors from "cors"
import usersRouter from "./src/routes/usersRouter.js"

const app = express()
app.use(json())
app.use(cors())

app.use(usersRouter)

app.listen(4000)
