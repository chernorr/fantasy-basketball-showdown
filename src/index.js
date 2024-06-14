const getPlayers = require('./utility/read-stats');
const Team = require('./game/team');
const Game = require('./game/game-logic');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt the user with a question and return their response
const prompt = (query) => new Promise(resolve => rl.question(query, resolve));

// Run the play function to start the game
play();

// Function to play the game
async function play() {
    // Get players
    const players = getPlayers();

    // Create teams
    const team1 = new Team('Team 1');
    const team2 = new Team('Team 2');

    console.log('Welcome to Fantasy Basketball Showdown!');
    console.log('Each team will select 3 players.');

    for (let i = 0; i < 3; i++) {
        await selectPlayer(players, team1, i + 1);
        await selectPlayer(players, team2, i + 1);
    }

    console.log(`Team 1 Players: ${[...team1.players.keys()]}`);
    console.log(`Team 2 Players: ${[...team2.players.keys()]}`);

    console.log('\nTeams have selected their players. Now, each team will select performances for their players.');

    const game = new Game(team1, team2);
    let score;

    for (let i = 0; i < 3; i++) {
        await selectPerformance(team1);
        await selectPerformance(team2);

        console.log(`Team 1 Stats: ${JSON.stringify(team1.teamStats)}`);
        console.log(`Team 2 Stats: ${JSON.stringify(team2.teamStats)}`);

        console.log('**********************************************************************************************');
        score = game.calculateScore();
        console.log(`Team 1 Wins: ${score.team1Wins}`);
        console.log(`Team 2 Wins: ${score.team2Wins}`);
        console.log(`Tied Stats: ${score.tiedStats}`);
    }

    console.log('**********************************************************************************************');
    console.log(`\nGame Over!`);
    if (score.team1Wins.length > score.team2Wins.length) {
        console.log('Team 1 is the winner!');
    } else if (score.team2Wins.length > score.team1Wins.length) {
        console.log('Team 2 is the winner!');
    } else {
        console.log('The game is a tie!');
    }

    rl.close();
}

async function selectPlayer(players, team, playerNum) {
    console.log(`\n${team.name}, it's your turn to select a player.`);
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name}`);
    });

    let playerIndex;
    while (true) {
        playerIndex = parseInt(await prompt(`Select player ${playerNum} (1-${players.length}): `), 10) - 1;
        if (playerIndex >= 0 && playerIndex < players.length && !team.players.has(players[playerIndex].name)) {
            break;
        }
        console.log('Invalid selection, please try again.');
    }

    team.addPlayer(players[playerIndex]);
    players.splice(playerIndex, 1)
}

async function selectPerformance(team) {
    console.log(`\n${team.name}, it's your turn to select a performance for a player.`);

    const availablePlayers = Array.from(team.players.keys()).filter(playerName => !team.selectedPerformances.has(playerName));
    availablePlayers.forEach((playerName, index) => {
        console.log(`${index + 1}. ${playerName}`);
    });

    let playerIndex;
    while (true) {
        playerIndex = parseInt(await prompt(`Select a player (1-${availablePlayers.length}): `), 10) - 1;
        if (playerIndex >= 0 && playerIndex < availablePlayers.length) {
            break;
        }
        console.log('Invalid selection. Please try again.');
    }

    const selectedPlayer = availablePlayers[playerIndex];

    const performances = team.players.get(selectedPlayer);
    console.log(`\n${team.name}, please select a performance for ${selectedPlayer}.`);
    performances.forEach((performance, index) => {
        console.log(`${index + 1}. ${JSON.stringify(performance)}`);
    });

    let performanceIndex;
    while (true) {
        performanceIndex = parseInt(await prompt(`Select a performance (1-${performances.length}) for ${selectedPlayer}: `), 10) - 1;
        if (performanceIndex >= 0 && performanceIndex < performances.length) {
            break;
        }
        console.log('Invalid selection. Please try again.');
    }

    team.selectPerformance(selectedPlayer, performanceIndex);
}