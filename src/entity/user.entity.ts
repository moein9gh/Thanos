import {User} from "@model";

new Date().toISOString();

export class UserEntity {
    constructor(
        public id: string,
        public phone_number: string,
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public activity_status: number,
        public password: string,
        public national_id: string,
        public total_verification_count_in_day: Number,
        public role: string,
        public sex: string,
        public birthday: string,
        public last_verification_time: string,
        public created_on: string,
        public updated_on: string
    ) {

    }

    static Create(queryResult: UserEntity): UserEntity {
        return new UserEntity(
            queryResult.id, queryResult.phone_number,
            queryResult.username, queryResult.firstname,
            queryResult.lastname, queryResult.email,
            queryResult.activity_status, queryResult.password,
            queryResult.national_id, queryResult.total_verification_count_in_day,
            queryResult.role, queryResult.sex,
            queryResult.birthday, queryResult.last_verification_time,
            queryResult.created_on, queryResult.updated_on
        );
    }


    mapToModel(): User {
        return new User(
            this.id, this.phone_number,
            this.username, this.firstname,
            this.lastname, this.email,
            this.activity_status, this.password,
            this.national_id, this.total_verification_count_in_day,
            this.role, this.sex,
            new Date(this.birthday), new Date(this.last_verification_time),
            new Date(this.created_on), new Date(this.updated_on)
        );
    }

}