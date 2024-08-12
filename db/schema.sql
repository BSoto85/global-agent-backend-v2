-- db/schema.sql
DROP DATABASE IF EXISTS global_agent;
CREATE DATABASE global_agent;

\c global_agent;

-- User table takes in input from register, google login, or email login. A uid is assigned for firebase.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uid VARCHAR(255),
    email VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    dob DATE DEFAULT NULL,
    photo TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Each user is assigned a set of stats. They start at 0 for each stat until they play the game and the stats update.
CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    xp INTEGER DEFAULT 0,
    games_played INTEGER DEFAULT 0,
    questions_correct INTEGER DEFAULT 0,
    questions_wrong INTEGER DEFAULT 0,
    user_id INTEGER REFERENCES users(id)
);

-- Hard-coded countries used to retrieve data from the news endpoint. Flag is a url for each country's flag. The country code and langause code pertain to the shorthand used for each country and their language respectively. These are needed for the news endpoint
CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    flag TEXT NOT NULL,
    country_code VARCHAR(2),
    name VARCHAR(30),
    language_code VARCHAR(2),
    silhouette TEXT NOT NULL
);

-- **Change names of older and younger to add demographic at the end
-- Case files retrieved from the news endpoint are saved to this table. Summary_young (for our younger demographic) and summary_old (for our older demographic) are then updated after the article gets passed into claude and gives back a summary 
CREATE TABLE case_files (
    id SERIAL PRIMARY KEY,
    article_id INTEGER UNIQUE,
    article_content TEXT,
    article_title TEXT,
    publish_date VARCHAR(50),
    summary_young TEXT DEFAULT NULL,
    summary_old TEXT DEFAULT NULL,
    countries_id INTEGER REFERENCES countries(id),
    photo_url TEXT
);

-- **Possibly change questions tables to be one table with a questions type added
-- Case file summaries are fed to claude and questions for the younger demographic are generated and saved to this table. Each key starts with a y to differentiate from the same keys in the older demographic questions table.
CREATE TABLE questions_younger (
    id SERIAL PRIMARY KEY,
    y_question VARCHAR(150),
    y_correct_answer VARCHAR(100),
    y_incorrect_answer1 VARCHAR(100),
    y_incorrect_answer2 VARCHAR(100),
    y_incorrect_answer3 VARCHAR(100),
    y_case_files_article_id INTEGER REFERENCES case_files(article_id) ON DELETE CASCADE
);

-- Case file summaries are fed to claude and questions for the older demographic are generated and saved to this table. Each key starts with an o to differentiate from the same keys in the younger demographic questions table.
CREATE TABLE questions_older (
    id SERIAL PRIMARY KEY,
    o_question VARCHAR(150),
    o_correct_answer VARCHAR(100),
    o_incorrect_answer1 VARCHAR(100),
    o_incorrect_answer2 VARCHAR(100),
    o_incorrect_answer3 VARCHAR(100),
    o_case_files_article_id INTEGER REFERENCES case_files(article_id) ON DELETE CASCADE
);
