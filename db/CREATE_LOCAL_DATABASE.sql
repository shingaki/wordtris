DROP DATABASE IF EXISTS wordtris_db;
#
CREATE DATABASE wordtris_db;

USE wordtris_db;

# SEED RECORDS FOR PLAYERS
INSERT INTO Players (playerName, password, email, createdAt, updatedAt) VALUES ('jpaul', '1234', 'j@smu.com', current_date, current_date);
INSERT INTO Players (playerName, password, email, createdAt, updatedAt) VALUES ('Gabriela', 'A1234', 'gabrielaruizblake@gmail.com', current_date, current_date);
INSERT INTO Players (playerName, password, email, createdAt, updatedAt) VALUES ('Tamami', 'tamami', 'tamami@smu.com', current_date, current_date);
INSERT INTO Players (playerName, password, email, createdAt, updatedAt) VALUES ('Julia', 'julia', 'julia@smu.com', current_date, current_date);
INSERT INTO Players (playerName, password, email, createdAt, updatedAt) VALUES ('Michael', 'michael', 'michael@smu.com', current_date, current_date);


# SEED RECORDS FOR HIGHEST SCORES
INSERT INTO highestscores (id, scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (1, 1, 20, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestscores (id, scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (2, 2, 19, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestscores (id, scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (3, 3, 14, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestscores (id, scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (4, 4, 13, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 2);
INSERT INTO highestscores (id, scorePosition, highestScore, createdAt, updatedAt, PlayerId) VALUES (5, 5, 12, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 3);

# SEED RECORDS FOR HIGHEST WORDS
INSERT INTO highestwords (id, wordPosition, highestWord, score, createdAt, updatedAt, PlayerId) VALUES (1, 1, 'highway', 20, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestwords (id, wordPosition, highestWord, score, createdAt, updatedAt, PlayerId) VALUES (2, 2, 'parkway', 19, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestwords (id, wordPosition, highestWord, score, createdAt, updatedAt, PlayerId) VALUES (3, 3, 'roadway', 14, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4);
INSERT INTO highestwords (id, wordPosition, highestWord, score, createdAt, updatedAt, PlayerId) VALUES (4, 4, 'today', 13, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 2);
INSERT INTO highestwords (id, wordPosition, highestWord, score, createdAt, updatedAt, PlayerId) VALUES (5, 5, 'country', 12, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 3);


# PLAYER WORDS : TOP 5 WORDS (WORDS WITH THE HIGHEST SCORES) RECEIVED BY THE PLAYER SINCE THE PLAYER BEGAN PLAYING WORDTRIS
# PLAYER SCORES: UP TO TOP 5 SCORES FOR THE PLAYER - PLAYER EARNS A SCORE FOR EACH GAME COMPLETED

# CREATED SEED RECORDS FOR PLAYERS. PLAYERS HAVE DIFFERENT NUMBER OF SEEDS RECORDS FOR TESTING PURPOSES.


# PLAYER ONE HAS '5' SEED RECORDS FOR PLAYER WORDS AND PLAYER SCORES
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('knowledgeable', 24, 1, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('keyboard', 18, 4, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('jubilantly', 22, 2, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('kaleidoscope', 21, 3, current_date, current_date, 1);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('abandoned', 13, 2, current_date, current_date, 1);

# PLAYER TWO HAS '4' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('tomorrow', 9, 4, current_date, current_date, 2);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('today', 13, 3, current_date, current_date, 2);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('knockout', 18, 1, current_date, current_date, 2);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking,createdAt, updatedAt, PlayerId) VALUES ('ladybug', 14, 2, current_date, current_date, 2);

# PLAYER THREE HAS '4' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('hamburger', 17, 4, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('bridge', 10, 1, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('staunchest', 15, 3, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('picture', 11, 2, current_date, current_date, 4);

# PLAYER FOUR HAS '4' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('avenue', 9, 1, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('parkway', 19, 3, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('highway', 20, 4, current_date, current_date, 4);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('roadway', 14, 2, current_date, current_date, 4);

# PLAYER FIVE HAS '2' SEED RECORDS FOR PLAYER WORDS
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('movie', 10, 1, current_date, current_date, 5);
INSERT INTO playerwords (playerWord, wordPoints, playerWordRanking, createdAt, updatedAt, PlayerId) VALUES ('sitcom', 10, 2, current_date, current_date, 5);

# PLAYERS SEED INSERT STATEMENTS FOR playerscores
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (1, 24, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 4);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (2, 40, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 2);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (3, 21, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 5);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (4, 26, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 3);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (5, 48, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 1, 1);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (6, 53, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 2, 1);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (7, 42, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 1);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (8, 38, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 2);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (9, 34, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 4);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (10, 36, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 4, 3);
INSERT INTO playerscores (id, playerScore, createdAt, updatedAt, PlayerId, playerScoreRanking) VALUES (11, 20, '2019-08-06 00:00:00', '2019-08-06 00:00:00', 5, 1);