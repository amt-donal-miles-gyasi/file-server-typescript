CREATE TABLE users(
    user_id serial primary key,
    username varchar(100) unique not null,
    email varchar(225) unique not null,
    password varchar(225) unique not null,
    created_at date default current_date
    roles varchar(10) default 'user'
);

CREATE TABLE filess(
    id serial primary key,
    title varchar(150) NULL default 'none',
    description varchar(300) NULL default 'none',
    path varchar(150) NULL,
    originalname varchar(200) NULL,
    downloadcount integer NOT NULL default 0,
    emailcount integer NOT NULL default 0
);