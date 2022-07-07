import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export async function authUser(req: Request, res: Response, next: NextFunction) {
    const userSchema = Joi.object({
        firstUser: Joi.string().required(),
        secondUser: Joi.string().required()
    })
    const valid = userSchema.validate(req.body)
    if(valid.error){
        return res.sendStatus(401)
    }
    next()
}