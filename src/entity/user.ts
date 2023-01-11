import mongoose from 'mongoose';
import {IBaseEntity} from "../ports/entity";

export class User implements IBaseEntity {

    model: mongoose.Model<any> | null = null

    defineEntity(): mongoose.Model<any> {
        const UserSchema = new mongoose.Schema({
            username: String,
            password: {type: String, maxlength: 200, minlength: 4},
        }, {timestamps: true});
        const model = mongoose.model('User', UserSchema)

        this.model = model

        return model
    }

    getEntity(): mongoose.Model<any> {
        return this.model!
    }
}
