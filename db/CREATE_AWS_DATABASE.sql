DROP DATABASE IF EXISTS wordtris_db;
#
CREATE DATABASE wordtris_db;

USE wordtris_db;

# CREATE TABLE FOR PLAYERS
create table players (
                         id   BIGINT  not null auto_increment,
                         playerName VARCHAR(50) not null,
                         password   VARCHAR(50) not null,
                         email      VARCHAR(75) not null,
                         createdAt  TIMESTAMP   not null,
                         updatedAt  TIMESTAMP   not null DEFAULT CURRENT_TIMESTAMP ,
                         primary key (id)
);

# SEED RECORDS FOR PLAYERS
INSERT INTO players (playerName, password, email, createdAt, updatedAt) VALUES ('jpaul', '1234', 'j@smu.com', current_date, current_date);
INSERT INTO players (playerName, password, email, createdAt, updatedAt) VALUES ('Gabriela', 'A1234', 'gabrielaruizblake@gmail.com', current_date, current_date);
INSERT INTO players (playerName, password, email, createdAt, updatedAt) VALUES ('Tamami', 'tamami', 'tamami@smu.com', current_date, current_date);
INSERT INTO players (playerName, password, email, createdAt, updatedAt) VALUES ('Julia', 'julia', 'julia@smu.com', current_date, current_date);
INSERT INTO players (playerName, password, email, createdAt, updatedAt) VALUES ('Michael', 'michael', 'michael@smu.com', current_date, current_date);


# CREATE HIGHEST SCORES TABLE
create table highestscores (
                               highestscoresId    BIGINT  not null auto_increment,
                               scorePosition      BIGINT not null,
                               highestScore       BIGINT not null,
                               createdAt          timestamp   not null,
                               updatedAt          timestamp   not null DEFAULT CURRENT_TIMESTAMP ,
                               playerId           BIGINT not null,
                               primary key (highestscoresId)
);

# SEED RECORDS FOR HIGHEST SCORES
INSERT INTO highestscores (scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (1, 20, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestscores (scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (2, 19, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestscores (scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (3, 14, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestscores (scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (4, 13, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 2);
INSERT INTO highestscores (scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (5, 12, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 3);


# CREATE HIGHEST WORDS TABLE
create table highestwords (
                              highestwordsId     BIGINT  not null auto_increment,
                              scorePosition      BIGINT not null,
                              highestWord        VARCHAR(50) not null,
                              score              BIGINT not null,
                              letterBonus        BIGINT not null,
                              wordBonus          BIGINT not null,
                              createdAt          timestamp  not null,
                              updatedAt          timestamp  not null DEFAULT CURRENT_TIMESTAMP ,
                              playerId           BIGINT not null,
                              primary key (highestwordsId)
);

# SEED RECORDS FOR HIGHEST WORDS
INSERT INTO highestwords (scorePosition, highestWord, score, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES (1, 'highway', 20, 0, 0, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestwords (scorePosition, highestWord, score, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES (2, 'parkway', 19, 0, 0, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestwords (scorePosition, highestWord, score, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES (3, 'roadway', 14, 0, 0, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestwords (scorePosition, highestWord, score, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES (4, 'today', 13, 0, 0, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 2);
INSERT INTO highestwords (scorePosition, highestWord, score, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES (5, 'country', 12, 0, 0, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 3);


# PLAYER WORDS : TOP 5 WORDS (WORDS WITH THE HIGHEST SCORES) RECEIVED BY THE PLAYER SINCE THE PLAYER BEGAN PLAYING WORDTRIS
# PLAYER SCORES: UP TO TOP 5 SCORES FOR THE PLAYER - PLAYER EARNS A SCORE FOR EACH GAME COMPLETED

# CREATE PLAYER WORDS TABLE
create table playerwords (
                             playerWordId              BIGINT  not null auto_increment,
                             playerWord                VARCHAR(50) not null,
                             wordPoints                BIGINT not null,
                             playerWordRanking         BIGINT not null,
                             letterBonus               BIGINT not null,
                             wordBonus                 BIGINT not null,
                             createdAt                 timestamp  not null,
                             updatedAt                 timestamp  not null DEFAULT CURRENT_TIMESTAMP ,
                             playerId                  BIGINT not null,
                             primary key (playerWordId)
);

# CREATED SEED RECORDS FOR PLAYERS. PLAYERS HAVE DIFFERENT NUMBER OF SEEDS RECORDS FOR TESTING PURPOSES.

# PLAYER ONE HAS '5' SEED RECORDS FOR PLAYER WORDS AND PLAYER SCORES
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('knowledgeable', 24, 1, 0, 0, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('keyboard', 18, 4, 0, 0, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('jubilantly', 22, 2, 0, 0, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('kaleidoscope', 21, 3, 0, 0, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('abandoned', 13, 5, 0, 0, current_date, current_date, 1);

# PLAYER TWO HAS '4' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('tomorrow', 9, 4, 0, 0, current_date, current_date, 2);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('today', 13, 3, 0, 0, current_date, current_date, 2);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('knockout', 18, 1, 0, 0, current_date, current_date, 2);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('ladybug', 14, 2, 0, 0, current_date, current_date, 2);

# PLAYER THREE HAS '4' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('hamburger', 17, 4, 0, 0, current_date, current_date, 3);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('bridge', 10, 1, 0, 0, current_date, current_date, 3);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('staunchest', 15, 3, 0, 0, current_date, current_date, 3);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('picture', 11, 2, 0, 0, current_date, current_date, 3);

# PLAYER FOUR HAS '4' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('avenue', 9, 1, 0, 0, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('parkway', 19, 3, 0, 0, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('highway', 20, 4, 0, 0, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('roadway', 14, 2, 0, 0, current_date, current_date, 4);

# PLAYER FIVE HAS '2' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('movie', 10, 1, 0, 0, current_date, current_date, 5);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, letterBonus, wordBonus, createdAt, updatedAt, PlayerId) VALUES ('sitcom', 10, 2, 0, 0, current_date, current_date, 5);

# CREATE PLAYER SCORES TABLE

create table playerscores (
                              playerScoreId            BIGINT  not null auto_increment,
                              playerScore               BIGINT not null,
                              createdAt                 timestamp  not null,
                              updatedAt                 timestamp  not null DEFAULT CURRENT_TIMESTAMP ,
                              playerId                  BIGINT not null,
                              playerScoreRanking        BIGINT not null,

                              primary key (playerScoreId)
);

# PLAYERS SEED INSERT STATEMENTS FOR playerscores
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (24, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 4);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (40, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 2);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (21, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 5);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (26, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 3);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (48, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 1);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (53, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 2, 1);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (42, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 1);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (38, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 2);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (34, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 4);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (36, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 3);
INSERT INTO playerscores (playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (20, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 5, 1);