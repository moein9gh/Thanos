-- +migrate Up

-- create users table
create table if not exists "users"
(
    id INT GENERATED ALWAYS AS IDENTITY,
    phone_number VARCHAR ( 50 ) UNIQUE NOT NULL,
    username VARCHAR ( 250 ) UNIQUE NOT NULL,
    firstname VARCHAR ( 250 ),
    lastname VARCHAR ( 250 ),
    email VARCHAR ( 250 ) UNIQUE,
    activity_status INT NOT NULL,
    password VARCHAR ( 250 ),
    national_id VARCHAR ( 250 ),
    total_verification_count_in_day INT NOT NULL,
    role INT NOT NULL,
    sex INT,
    birthday TIMESTAMP,
    Last_verification_time TIMESTAMP NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT now(),
    updated_on TIMESTAMP NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY(id)
    );

/*
 username: String,
    verifyCode: { type: String, expires: '2m' },
    activeSession: [String],
    fcmRegistrationToken: {type:String,default:"none"},
    favoritesProducts:[{type: mongoose.Schema.Types.ObjectId,ref:"Product"}],
    addresses:[Address],
 */


