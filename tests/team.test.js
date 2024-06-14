const Team = require('../src/game/team')
const Player = require('../src/game/player')

describe('Team class tests', () => {
    let team, player1, player2, player3;

    beforeEach(() => {
        team = new Team('Test');

        player1 = new Player('Shai Gilgeous-Alexander', [
            { points: 40, rebounds: 5, assists: 12, steals: 1, blocks: 3, fgMade: 11, fgAttempts: 19, ftMade: 17, ftAttempts: 18, threePointers: 1, turnovers: 2 },
            { points: 43, rebounds: 7, assists: 6, steals: 2, blocks: 1, fgMade: 15, fgAttempts: 22, ftMade: 12, ftAttempts: 13, threePointers: 1, turnovers: 3 }
        ]);
        player2 = new Player('Luka Doncic', [{ points: 73, rebounds: 10, assists: 7, steals: 1, blocks: 0, fgMade: 25, fgAttempts: 33, ftMade: 15, ftAttempts: 16, threePointers: 8, turnovers: 4 }]);
        player3 = new Player('Kevin Durant', [{ points: 38, rebounds: 9, assists: 9, steals: 0, blocks: 0, fgMade: 15, fgAttempts: 22, ftMade: 2, ftAttempts: 2, threePointers: 6, turnovers: 1 }]);
    });

    test('should initialize team as expected', () => {
        expect(team.name).toBe('Test');
        expect(team.players).toEqual(new Map());
        expect(team.selectedPerformances).toEqual(new Map());
        expect(team.teamStats).toEqual({
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0,
            fgMade: 0,
            fgAttempts: 0,
            threePointers: 0,
            ftMade: 0,
            ftAttempts: 0,
            turnovers: 0
        });
    });

    test('should not exceed player limit', () => {
        const dummyPlayer1 = new Player('Player 1', []);
        const dummyPlayer2 = new Player('Player 2', []);
        const dummyPlayer3 = new Player('Player 3', []);
        const dummyPlayer4 = new Player('Player 4', []);
        const dummyPlayer5 = new Player('Player 5', []);
        const dummyPlayer6 = new Player('Player 6', []);

        team.addPlayer(dummyPlayer1);
        team.addPlayer(dummyPlayer2);
        team.addPlayer(dummyPlayer3);
        team.addPlayer(dummyPlayer4);
        team.addPlayer(dummyPlayer5);
        
        expect(team.players.size).toBe(5);

        team.addPlayer(dummyPlayer6); 
        expect(team.players.size).toBe(5);
    });

    test('should not add the same player twice', () => {
        const dummyPlayer1 = new Player('Player 1', []);
        team.addPlayer(dummyPlayer1);
       
        expect(team.players.size).toBe(1);

        team.addPlayer(dummyPlayer1); 
        expect(team.players.size).toBe(1);
    });

    test('should select performances and update team stats', () => {
        team.addPlayer(player1);
        team.addPlayer(player2);
        team.addPlayer(player3);

        team.selectPerformance("Shai Gilgeous-Alexander", 1);

        expect(team.selectedPerformances.get(player1.name)).toEqual(player1.performances[1]);
        expect(team.teamStats).toEqual({ points: 43, rebounds: 7, assists: 6, steals: 2, blocks: 1, fgMade: 15, fgAttempts: 22, ftMade: 12, ftAttempts: 13, threePointers: 1, turnovers: 3 });

        team.selectPerformance("Luka Doncic", 0);

        expect(team.selectedPerformances.get(player2.name)).toEqual(player2.performances[0]);
        expect(team.teamStats).toEqual({ points: 116, rebounds: 17, assists: 13, steals: 3, blocks: 1, fgMade: 40, fgAttempts: 55, ftMade: 27, ftAttempts: 29, threePointers: 9, turnovers: 7 });

        team.selectPerformance("Kevin Durant", 0);

        expect(team.selectedPerformances.get(player3.name)).toEqual(player3.performances[0]);
        expect(team.teamStats).toEqual({ points: 154, rebounds: 26, assists: 22, steals: 3, blocks: 1, fgMade: 55, fgAttempts: 77, ftMade: 29, ftAttempts: 31, threePointers: 15, turnovers: 8 });
    });

    test('should properly reset team stats', () => {
        team.addPlayer(player1);
        team.selectPerformance("Shai Gilgeous-Alexander", 0);

        team.resetTeamStats();

        expect(team.teamStats).toEqual({
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0,
            fgMade: 0,
            fgAttempts: 0,
            threePointers: 0,
            ftMade: 0,
            ftAttempts: 0,
            turnovers: 0
        });
    });
});