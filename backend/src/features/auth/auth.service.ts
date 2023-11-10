import Service from "globalInterfaces/service.interface";
import { UserDocument } from "models/user.model";
import mongoose from "mongoose";
import { User } from "types/types";

export class AuthService implements Service {
    dbModel: mongoose.Model<UserDocument>;
    constructor(db: mongoose.Model<UserDocument>) {
        this.dbModel = db;
    }

    public async temp() {
        try {
            const data = this.dbModel.find();
            console.log(data);
        }
        catch (err) {

        }
    }

    public async register(data: User) {
        try {

        } catch (err) {
            console.error(err);
            return err;
        }
    }
}

