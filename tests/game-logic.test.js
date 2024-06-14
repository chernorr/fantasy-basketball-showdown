const Game = require('../src/game/game-logic')
const Team = require('../src/game/team')

describe('Game class tests', () => {
    let game, team1, team2;

    beforeEach(() => {
        team1 = new Team('team1');
        team2 = new Team('team2');
        game = new Game(team1, team2);
    })

    test('team 1 wins 5-4', () => {
        team1.teamStats = { points: 100, rebounds: 50, assists: 50, steals: 10, blocks: 7, fgMade: 30, fgAttempts: 60, threePointers: 7, ftMade: 21, ftAttempts: 30, turnovers: 6 };
        team2.teamStats = { points: 90, rebounds: 40, assists: 45, steals: 15, blocks: 8, fgMade: 30, fgAttempts: 65, threePointers: 9, ftMade: 21, ftAttempts: 35, turnovers: 4 };

        const expectedTeam1Wins = ['points', 'rebounds', 'assists', 'fgPercentage', 'ftPercentage'];
        const expectedTeam2Wins = ['steals', 'blocks', 'threePointers', 'turnovers'];
        
        score = game.calculateScore();

        expect(score.team1Wins.length).toBe(5);
        expect(score.team2Wins.length).toBe(4);
        expect(score.tiedStats.length).toBe(0);

        expect(score.team1Wins).toEqual(expect.arrayContaining(expectedTeam1Wins));
        expect(score.team2Wins).toEqual(expect.arrayContaining(expectedTeam2Wins));
    });

    test('the teams are tied 3-3', () => {
        team1.teamStats = { points: 100, rebounds: 50, assists: 50, steals: 10, blocks: 7, fgMade: 30, fgAttempts: 75, threePointers: 7, ftMade: 21, ftAttempts: 30, turnovers: 6 };
        team2.teamStats = { points: 100, rebounds: 40, assists: 45, steals: 15, blocks: 7, fgMade: 30, fgAttempts: 75, threePointers: 9, ftMade: 21, ftAttempts: 35, turnovers: 4 };

        const expectedTeam1Wins = ['rebounds', 'assists', 'ftPercentage'];
        const expectedTeam2Wins = ['steals', 'threePointers', 'turnovers'];
        const expectedTiedStats = ['points', 'blocks', 'fgPercentage'];
        
        score = game.calculateScore();

        expect(score.team1Wins.length).toBe(3);
        expect(score.team2Wins.length).toBe(3);
        expect(score.tiedStats.length).toBe(3);

        expect(score.team1Wins).toEqual(expect.arrayContaining(expectedTeam1Wins));
        expect(score.team2Wins).toEqual(expect.arrayContaining(expectedTeam2Wins));
        expect(score.tiedStats).toEqual(expect.arrayContaining(expectedTiedStats));
    });

    test('team 2 wins in every stat', () => {
        team1.teamStats = { points: 85, rebounds: 20, assists: 40, steals: 10, blocks: 7, fgMade: 30, fgAttempts: 66, threePointers: 7, ftMade: 21, ftAttempts: 36, turnovers: 6 };
        team2.teamStats = { points: 90, rebounds: 40, assists: 45, steals: 15, blocks: 8, fgMade: 30, fgAttempts: 65, threePointers: 9, ftMade: 21, ftAttempts: 35, turnovers: 4 };

        const expectedTeam2Wins = ['points', 'rebounds', 'assists', 'steals', 'blocks', 'fgPercentage', 'ftPercentage', 'threePointers', 'turnovers'];
        
        score = game.calculateScore();

        expect(score.team1Wins.length).toBe(0);
        expect(score.team2Wins.length).toBe(9);
        expect(score.tiedStats.length).toBe(0);

        expect(score.team2Wins).toEqual(expect.arrayContaining(expectedTeam2Wins));
    });

    test('the teams are tied in every stat', () => {
        team1.teamStats = { points: 100, rebounds: 50, assists: 50, steals: 10, blocks: 7, fgMade: 30, fgAttempts: 60, threePointers: 7, ftMade: 21, ftAttempts: 30, turnovers: 6 };
        team2.teamStats = { points: 100, rebounds: 50, assists: 50, steals: 10, blocks: 7, fgMade: 30, fgAttempts: 60, threePointers: 7, ftMade: 21, ftAttempts: 30, turnovers: 6 };

        const expectedTiedStats = ['points', 'rebounds', 'assists', 'steals', 'blocks', 'fgPercentage', 'ftPercentage', 'threePointers', 'turnovers'];
        
        score = game.calculateScore();

        expect(score.team1Wins.length).toBe(0);
        expect(score.team2Wins.length).toBe(0);
        expect(score.tiedStats.length).toBe(9);

        expect(score.tiedStats).toEqual(expect.arrayContaining(expectedTiedStats));
    });

    test('test calculate percentage', () => {
        expect(game.calculatePercentage(10, 10)).toEqual(1)
        expect(game.calculatePercentage(2, 4)).toEqual(0.5)
        expect(game.calculatePercentage(8, 10)).toEqual(0.8)
        expect(game.calculatePercentage(15, 20)).toEqual(0.75)
        expect(game.calculatePercentage(0, 0)).toEqual(0)
    });

});