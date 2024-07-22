import Team from './game/team.js';
import Game from './game/game-logic.js';
import { getPlayer, getAllPlayers } from './utility/firestore.js';
import { printPerformance } from './utility/print-performance.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (query) => new Promise(resolve => rl.question(query, resolve));

play();

async function play() {
    // Get players
    const players = await getAllPlayers();

    // Create teams
    const team1 = new Team('Player 1');
    const team2 = new Team('Player 2');

    console.log('Welcome to Fantasy Basketball Showdown!');
    console.log('Each team will select 5 players.');

    for (let i = 0; i < 5; i++) {
        await selectPlayer(players, team1, i + 1);
        await selectPlayer(players, team2, i + 1);
    }

    console.log(`Player 1 Players: ${[...team1.players.keys()]}`);
    console.log(`Player 2 Players: ${[...team2.players.keys()]}`);

    console.log('\nTeams have selected their players. Now, each team will select performances for their players.');

    const game = new Game(team1, team2);
    let score;
    let t1first = true;

    for (let i = 0; i < 5; i++) {
        if (t1first) {
            await selectPerformance(team1);   
            logStats(team1, team2);    
            await selectPerformance(team2);
        } else {
            await selectPerformance(team2);
            logStats(team1, team2);
            await selectPerformance(team1);
        }

        t1first = !t1first;
        
        logStats(team1, team2); 
        score = game.calculateScore();
        console.log(`Player 1 Wins: ${score.team1Wins}`);
        console.log(`Player 2 Wins: ${score.team2Wins}`);
        console.log(`Tied Stats: ${score.tiedStats}`);
    }

    console.log('**********************************************************************************************');
    console.log(`\nGame Over!`);
    if (score.team1Wins.length > score.team2Wins.length) {
        console.log('Player 1 is the winner!');
    } else if (score.team2Wins.length > score.team1Wins.length) {
        console.log('Player 2 is the winner!');
    } else {
        console.log('The game is a tie!');
    }

    rl.close();
}

function logStats(t1, t2) {
    console.log('**********************************************************************************************');
    console.log(t1.printStats());
    console.log(t2.printStats());
    console.log('**********************************************************************************************');
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

    const player = await getPlayer(players[playerIndex].name, players[playerIndex].id);
    team.addPlayer(player);
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
        console.log(`${index + 1}. ${printPerformance(performance)}`);
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