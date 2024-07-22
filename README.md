# Fantasy Basketball Showdown

Fantasy Basketball Showdown is a 2-player, turn based game that is based on 9-Category Fantasy Basketball and uses real
NBA stats.

## How to Play

The objective of the game is to win in more categories than your opponenet. 
The categories are: **Points, Rebounds, Assists, Steals, Blocks, 3 Pointers, Field Goal %, Free Throw %, and Turnovers**

Players first take turns drafting their teams, then they will take turns selecting a performance for each of their players. Performances will be selected 'snake style', meaning the player who chooses a performance second in one round, will go first in the following round.

The performances that the players will choose from will be 5 randomly selected performances from the 23-24 NBA season.

Once both players have selected performances for each player on their team, all categories will be compared to determine the winner. The game ends in a tie if both players win the same number of categories.

## Playing the Game

First, clone the repo to your computer using `git clone`
Call `npm i` to install the necessary dependencies
Run the `npm run play` command to play. You should be greeted with a welcome message and a list of players for player 1 to choose.


All stats are from [Basketball Reference](https://www.basketball-reference.com/)