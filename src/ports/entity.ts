import mongoose from "mongoose";

export interface IBaseEntity {
    defineEntity() : mongoose.Model<any>
    getEntity() : mongoose.Model<any>
}