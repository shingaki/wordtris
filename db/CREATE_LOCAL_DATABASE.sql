DROP DATABASE IF EXISTS wordtris_local;

CREATE DATABASE wordtris_local;

USE wordtris_local;

CREATE TABLE Players
(
    id          INT         NOT NULL AUTO_INCREMENT,
    player_name VARCHAR(50) NOT NULL,
    password    VARCHAR(50) NOT NULL,
    email       VARCHAR(50) NOT NULL,
    createdAt   DATETIME    NOT NULL,
    updatedAt   DATETIME    NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE PlayerScores
(
    id           INT      NOT NULL AUTO_INCREMENT,
    player_id    INT      NOT NULL,
    player_score INT      NOT NULL,
    createdAt    DATETIME NOT NULL,
    updatedAt    DATETIME NOT NULL,
    PRIMARY KEY  (id)
);

CREATE TABLE PlayerWords
(
    id           INT      NOT NULL AUTO_INCREMENT,
    player_id    INT      NOT NULL,
    player_word  INT      NOT NULL,
    createdAt    DATETIME NOT NULL,
    updatedAt    DATETIME NOT NULL,
    PRIMARY KEY  (id)
);

CREATE TABLE HighestScores
    (
        id             INT      NOT NULL AUTO_INCREMENT,
        player_id      INT      NOT NULL,
        score_position INT      NOT NULL,
        highest_score  INT      NOT NULL,
        createdAt      DATETIME NOT NULL,
        updatedAt      DATETIME NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE HighestWords
(
    id             INT      NOT NULL AUTO_INCREMENT,
    player_id      INT      NOT NULL,
    score_position INT      NOT NULL,
    highest_word   INT      NOT NULL,
    score          INT      NOT NULL,
    createdAt      DATETIME NOT NULL,
    updatedAt      DATETIME NOT NULL,
    PRIMARY KEY (id)
);