import {UserEntity} from "@entity";

export class User {
    constructor(
        public id: string,
        public phoneNumber: string,
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public activityStatus: number,
        public password: string,
        public nationalId: string,
        public totalVerificationCountInDay: Number,
        public role: string,
        public sex: string,
        public birthday: Date,
        public lastVerificationTime: Date,
        public createdOn: Date,
        public updatedOn: Date
    ) {
    }


    mapToEntity(): UserEntity {
        return new UserEntity(
            this.id, this.phoneNumber,
            this.username, this.firstname,
            this.lastname, this.email,
            this.activityStatus, this.password,
            this.nationalId, this.totalVerificationCountInDay,
            this.role, this.sex,
            this.birthday.toISOString(), this.lastVerificationTime.toISOString(),
            this.createdOn.toISOString(), this.updatedOn.toISOString()
        );
    }

}