import Game from '../src/game/game-logic';
import Team from '../src/game/team';

describe('Game class tests', () => {
    let game, team1, team2, score;

    beforeEach(() => {
        team1 = new Team('team1');
        team2 = new Team('team2');
        game = new Game(team1, team2);
    })

    test('team 1 wins 5-4', () => {
        team1.teamStats = { 'PTS': 100, 'TRB': 50, 'AST': 50, 'STL': 10, 'BLK': 7, 'FG': 30, 'FGA': 60, '3P': 7, 'FT': 21, 'FTA': 30, 'TOV': 6 };
        team2.teamStats = { 'PTS': 90, 'TRB': 40, 'AST': 45, 'STL': 15, 'BLK': 8, 'FG': 30, 'FGA': 65, '3P': 9, 'FT': 21, 'FTA': 35, 'TOV': 4 };

        const expectedTeam1Wins = ['PTS', 'TRB', 'AST', 'FGP', 'FTP'];
        const expectedTeam2Wins = ['STL', 'BLK', '3P', 'TOV'];
        
        score = game.calculateScore();

        console.log(score.team1Wins);

        expect(score.team1Wins.length).toBe(5);
        expect(score.team2Wins.length).toBe(4);
        expect(score.tiedStats.length).toBe(0);

        expect(score.team1Wins).toEqual(expect.arrayContaining(expectedTeam1Wins));
        expect(score.team2Wins).toEqual(expect.arrayContaining(expectedTeam2Wins));
    });

    test('the teams are tied 3-3', () => {
        team1.teamStats = { 'PTS': 100, 'TRB': 50, 'AST': 50, 'STL': 10, 'BLK': 7, 'FG': 30, 'FGA': 75, '3P': 7, 'FT': 21, 'FTA': 30, 'TOV': 6 };
        team2.teamStats = { 'PTS': 100, 'TRB': 40, 'AST': 45, 'STL': 15, 'BLK': 7, 'FG': 30, 'FGA': 75, '3P': 9, 'FT': 21, 'FTA': 35, 'TOV': 4 };

        const expectedTeam1Wins = ['TRB', 'AST', 'FTP'];
        const expectedTeam2Wins = ['STL', '3P', 'TOV'];
        const expectedTiedStats = ['PTS', 'BLK', 'FGP'];
        
        score = game.calculateScore();

        expect(score.team1Wins.length).toBe(3);
        expect(score.team2Wins.length).toBe(3);
        expect(score.tiedStats.length).toBe(3);

        expect(score.team1Wins).toEqual(expect.arrayContaining(expectedTeam1Wins));
        expect(score.team2Wins).toEqual(expect.arrayContaining(expectedTeam2Wins));
        expect(score.tiedStats).toEqual(expect.arrayContaining(expectedTiedStats));
    });

    test('team 2 wins in every stat', () => {
        team1.teamStats = { 'PTS': 85, 'TRB': 20, 'AST': 40, 'STL': 10, 'BLK': 7, 'FG': 30, 'FGA': 66, '3P': 7, 'FT': 21, 'FTA': 36, 'TOV': 6 };
        team2.teamStats = { 'PTS': 90, 'TRB': 40, 'AST': 45, 'STL': 15, 'BLK': 8, 'FG': 30, 'FGA': 65, '3P': 9, 'FT': 21, 'FTA': 35, 'TOV': 4 };

        const expectedTeam2Wins = ['PTS', 'TRB', 'AST', 'STL', 'BLK', 'FGP', 'FTP', '3P', 'TOV'];
        
        score = game.calculateScore();

        expect(score.team1Wins.length).toBe(0);
        expect(score.team2Wins.length).toBe(9);
        expect(score.tiedStats.length).toBe(0);

        expect(score.team2Wins).toEqual(expect.arrayContaining(expectedTeam2Wins));
    });

    test('the teams are tied in every stat', () => {
        team1.teamStats = { 'PTS': 100, 'TRB': 50, 'AST': 50, 'STL': 10, 'BLK': 7, 'FG': 30, 'FGA': 60, '3P': 7, 'FT': 21, 'FTA': 30, 'TOV': 6 };
        team2.teamStats = { 'PTS': 100, 'TRB': 50, 'AST': 50, 'STL': 10, 'BLK': 7, 'FG': 30, 'FGA': 60, '3P': 7, 'FT': 21, 'FTA': 30, 'TOV': 6 };

        const expectedTiedStats = ['PTS', 'TRB', 'AST', 'STL', 'BLK', 'FGP', 'FTP', '3P', 'TOV'];
        
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