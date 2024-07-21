import Team from '../src/game/team';
import Player from '../src/game/player';

describe('Team class tests', () => {
    let team, player1, player2, player3;

    beforeEach(() => {
        team = new Team('Test');

        player1 = new Player('Shai Gilgeous-Alexander', [
            {"FGA":"19","FT":"4","PF":"1","+/-":"+21","AST":"8","BLK":"2","TRB":"4","Rk":"55","FG":"12","TOV":"2","Age":"25-225","Opp":"LAC","MP":"34:33","3P":"3","PTS":"31","3P%":".500","GmSc":"28.5","ORB":"0","FT%":".667","FTA":"6","GS":"1","3PA":"6","G":"54","FG%":".632","STL":"1","DRB":"4","Tm":"OKC","Date":"2024-02-22"},
            {"FTA":"6","TRB":"4","AST":"7","+/-":"+35","Rk":"22","Opp":"UTA","3P":"0","PF":"1","Date":"2023-12-11","3PA":"1","TOV":"1","FGA":"17","DRB":"3","FG":"12","GS":"1","3P%":".000","FT":"6","GmSc":"31.0","FT%":"1.000","Age":"25-152","G":"21","STL":"3","ORB":"1","FG%":".706","PTS":"30","BLK":"0","MP":"27:57","Tm":"OKC"}
        ]);
        player2 = new Player('Luka Doncic', [{"FGA":"27","FG%":".481","PTS":"39","GmSc":"34.8","Rk":"29","+/-":"+37","MP":"31:37","FT%":".727","GS":"1","3P%":".500","3PA":"10","STL":"1","G":"27","FG":"13","Date":"2023-12-23","PF":"1","Opp":"SAS","FT":"8","AST":"10","Age":"24-298","ORB":"2","TRB":"12","FTA":"11","3P":"5","Tm":"DAL","TOV":"2","BLK":"1","DRB":"10"}]);
        player3 = new Player('Kevin Durant', [{"G":"14","Age":"35-053","Tm":"PHO","Opp":"POR","FGA":"21","STL":"0","FTA":"3","3PA":"2","BLK":"1","FG":"13","PTS":"31","FG%":".619","TRB":"4","MP":"37:14","AST":"9","3P":"2","Date":"2023-11-21","3P%":"1.000","GmSc":"25.1","Rk":"14","FT%":"1.000","FT":"3","ORB":"0","PF":"4","DRB":"4","TOV":"3","GS":"1","+/-":"+20"}]);
    });

    test('should initialize team as expected', () => {
        expect(team.name).toBe('Test');
        expect(team.players).toEqual(new Map());
        expect(team.selectedPerformances).toEqual(new Map());
        expect(team.teamStats).toEqual({
            'PTS': 0,
            'TRB': 0,
            'AST': 0,
            'STL': 0,
            'BLK': 0,
            'FG': 0,
            'FGA': 0,
            '3P': 0,
            'FT': 0,
            'FTA': 0,
            'TOV': 0
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
        // PTS: 30, REB: 4, AST: 7, STLS: 3, BLKS: 0, FG: 12, FGA: 17, 3P: 0, FT: 6, FTA: 6, TOV: 1

        expect(team.selectedPerformances.get(player1.name)).toEqual(player1.performances[1]);
        expect(team.teamStats).toEqual({ 'PTS': 30, 'TRB': 4, 'AST': 7, 'STL': 3, 'BLK': 0, 'FG': 12, 'FGA': 17, 'FT': 6, 'FTA': 6, '3P': 0, 'TOV': 1 });

        team.selectPerformance("Luka Doncic", 0);
        // PTS: 39, REB: 12, AST: 10, STLS: 1, BLKS: 1, FG: 13, FGA: 27, 3P: 5, FT: 8, FTA: 11, TOV: 2

        expect(team.selectedPerformances.get(player2.name)).toEqual(player2.performances[0]);
        expect(team.teamStats).toEqual({ 'PTS': 69, 'TRB': 16, 'AST': 17, 'STL': 4, 'BLK': 1, 'FG': 25, 'FGA': 44, 'FT': 14, 'FTA': 17, '3P': 5, 'TOV': 3 });

        team.selectPerformance("Kevin Durant", 0);
        // PTS: 31, REB: 4, AST: 9, STLS: 0, BLKS: 1, FG: 13, FGA: 21, 3P: 2, FT: 3, FTA: 3, TOV: 3

        expect(team.selectedPerformances.get(player3.name)).toEqual(player3.performances[0]);
        expect(team.teamStats).toEqual({ 'PTS': 100, 'TRB': 20, 'AST': 26, 'STL': 4, 'BLK': 2, 'FG': 38, 'FGA': 65, 'FT': 17, 'FTA': 20, '3P': 7, 'TOV': 6 });
    });

    test('should properly reset team stats', () => {
        team.addPlayer(player1);
        team.selectPerformance("Shai Gilgeous-Alexander", 0);

        team.resetTeamStats();

        expect(team.teamStats).toEqual({
            'PTS': 0,
            'TRB': 0,
            'AST': 0,
            'STL': 0,
            'BLK': 0,
            'FG': 0,
            'FGA': 0,
            '3P': 0,
            'FT': 0,
            'FTA': 0,
            'TOV': 0
        });
    });
});