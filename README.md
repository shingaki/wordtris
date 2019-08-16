# WordTris

## Concept
Like tetris + scrabble combined!

Pieces fall from the top of the screen, each containing three random letters on it.  Swap the order of the letters and place it on the board to make words!  Each letter has a number of points assigned to it, so each word you successfully make will add to your score.

Bonuses:
- Place 3+ letters next to each other on the board, and they will disappear.  If there are more of those letters on the board already, they will receive a point bonus (3 letters together = 3X the points, etc.).
- After a word is found and removed, if the remaining letters make another word, that counts as well and gets double the points!

As you play, you will reach new levels of the game, and the speed of the falling piece will increase.

After gameover, you can view your personal best scores and best words played, as well as the global high scores and words.


## Built with:
- React
- Node.js
- Express
- Express-session
- React-move Animate
- Trie
- MySQL
- Sequelize


![game screenshot](./client/public/wordtris-screenshot.png)

## Setup Instructions
- clone repository
- in project folder:
    - run "npm install", then
    - run "npm start"

