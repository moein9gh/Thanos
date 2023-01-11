import mongoose, {Document} from 'mongoose';
import {IBaseEntity, UserEntity} from "@ports";


export class User implements IBaseEntity {

    model: mongoose.Model<UserEntity> | null = null

    defineEntity(): mongoose.Model<any> {

        const UserSchema = new mongoose.Schema({
            username: String,
            password: {type: String, maxlength: 200, minlength: 4},
        }, {timestamps: true});

        const model = mongoose.model<UserEntity>('User', UserSchema)

        this.model = model

        return model
    }

    getEntity(): mongoose.Model<any> {
        return this.model!
    }
}
