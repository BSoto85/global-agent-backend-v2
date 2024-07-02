-- db/schema.sql
DROP DATABASE IF EXISTS global_agent;
CREATE DATABASE global_agent;

\c global_agent;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    dob DATE,
    photo VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    xp INTEGER NOT NULL,
    games_played INTEGER NOT NULL,
    questions_correct INTEGER NOT NULL,
    questions_wrong INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id)
);

-- CREATE TABLE badges (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100),
--     image TEXT NOT NULL,
--     description VARCHAR(200),
--     xp_required INTEGER NOT NULL
-- );

CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    flag TEXT NOT NULL,
    name VARCHAR(30)
);

-- CREATE TABLE user_badges (
--     id SERIAL PRIMARY KEY,
--     badge_id INTEGER NOT NULL REFERENCES badges(id),
--     user_id INTEGER NOT NULL REFERENCES users(id)
-- );

-- CREATE TABLE visited_countries (
--    id SERIAL PRIMARY KEY,
--    countries_id INTEGER NOT NULL REFERENCES countries(id),
--    user_id INTEGER NOT NULL REFERENCES users(id)
-- );

CREATE TABLE case_files (
    id SERIAL PRIMARY KEY,
    article_content VARCHAR(1500),
    article_title VARCHAR(200),
    countries_id INTEGER REFERENCES countries(id)
);

CREATE TABLE questions_younger (
    id SERIAL PRIMARY KEY,
    question VARCHAR(150),
    correct_answer VARCHAR(100),
    incorrect_answer1 VARCHAR(100),
    incorrect_answer2 VARCHAR(100),
    incorrect_answer3 VARCHAR(100),
    case_files_id INTEGER REFERENCES case_files(id)
);

CREATE TABLE questions_older (
    id SERIAL PRIMARY KEY,
    question VARCHAR(150),
    correct_answer VARCHAR(100),
    incorrect_answer1 VARCHAR(100),
    incorrect_answer2 VARCHAR(100),
    incorrect_answer3 VARCHAR(100),
    case_files_id INTEGER REFERENCES case_files(id)
);
