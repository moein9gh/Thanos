import {Request,Response} from "express";

export interface IUserController {
    create(req:Request,res:Response):any
}