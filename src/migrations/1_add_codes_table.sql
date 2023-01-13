-- +migrate Up

-- create codes table
create table if not exists "codes"
(
    id          INT GENERATED ALWAYS AS IDENTITY,
    code        VARCHAR(10) UNIQUE NOT NULL,
    reason      VARCHAR(250)       NOT NULL,
    expired     BOOLEAN            NOT NULL DEFAULT FALSE,
    expire_time TIMESTAMP          NOT NULL,
    userId      INT                NOT NULL,
    created_on  TIMESTAMP          NOT NULL DEFAULT now(),
    updated_on  TIMESTAMP          NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY(id),
    CONSTRAINT fk_user
        FOREIGN KEY (userId)
            REFERENCES users (id)
);