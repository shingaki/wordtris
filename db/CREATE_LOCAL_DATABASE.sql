DROP DATABASE IF EXISTS wordtris_local;

CREATE DATABASE wordtris_local;

USE wordtris_local;

CREATE TABLE players
(
    id          INT         NOT NULL AUTO_INCREMENT,
    playerName VARCHAR(50) NOT NULL,
    password    VARCHAR(50) NOT NULL,
    email       VARCHAR(50) NOT NULL,
    createdAt   DATETIME    NOT NULL,
    updatedAt   DATETIME    NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE playerScores
(
    id           INT      NOT NULL AUTO_INCREMENT,
    -- player_id    INT      NOT NULL,
    playerScore INT      NOT NULL,
    createdAt    DATETIME NOT NULL,
    updatedAt    DATETIME NOT NULL,
    PRIMARY KEY  (id)
);

CREATE TABLE playerWords
(
    id           INT      NOT NULL AUTO_INCREMENT,
    player_id    INT      NOT NULL,
    player_word  INT      NOT NULL,
    createdAt    DATETIME NOT NULL,
    updatedAt    DATETIME NOT NULL,
    PRIMARY KEY  (id)
);

CREATE TABLE highestScores
    (
        id             INT      NOT NULL AUTO_INCREMENT,
        playerID      INT      NOT NULL,
        scorePosition INT      NOT NULL,
        highestScore  INT      NOT NULL,
        createdAt      DATETIME NOT NULL,
        updatedAt      DATETIME NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE highestWords
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