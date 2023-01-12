import mongoose, {Document} from "mongoose";

export interface IBaseEntity {
    defineEntity() : mongoose.Model<any>
    getEntity() : mongoose.Model<any>
}


export interface UserEntity extends Document {
    username: String,
    password: { type: String, maxlength: 200, minlength: 4 },
}