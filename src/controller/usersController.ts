import { Request, Response } from "express"
import { rankAllFighters } from "../repositories/usersRepositories.js"
import { checkUserInformation } from "../services/usersServices.js"

export async function getUserInformation(req: Request, res: Response) {
    try{
        const {firstUser, secondUser}: {firstUser: string, secondUser: string} = req.body
        const information: object = await checkUserInformation({firstUser, secondUser})
        res.send(information).status(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

export async function showAllFighters(req: Request, res: Response){
    try{
        const list:object = await rankAllFighters()
        res.status(200).send({
            fighters: list})
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}