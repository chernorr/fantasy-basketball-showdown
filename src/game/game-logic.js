class Game {
    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
    }

    calculateScore() {
        const categories = ['PTS', 'TRB', 'AST', 'STL', 'BLK', '3P', 'FGP', 'FTP', 'TOV'];
        let team1Wins = [];
        let team2Wins = [];
        let tiedStats = [];

        categories.forEach(category => {
            let team1Total, team2Total;

            switch (category) {
                case 'FGP':
                    team1Total = this.calculatePercentage(this.team1.teamStats['FG'], this.team1.teamStats['FGA']);
                    team2Total = this.calculatePercentage(this.team2.teamStats['FG'], this.team2.teamStats['FGA']);
                    this.compareStat(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats);
                    break;
                case 'FTP':
                    team1Total = this.calculatePercentage(this.team1.teamStats['FT'], this.team1.teamStats['FTA']);
                    team2Total = this.calculatePercentage(this.team2.teamStats['FT'], this.team2.teamStats['FTA']);
                    this.compareStat(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats);
                    break;
                case 'TOV':
                    team1Total = this.team1.teamStats[category];
                    team2Total = this.team2.teamStats[category];
                    this.compareTurnovers(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats);
                    break;
                default:
                    team1Total = this.team1.teamStats[category];
                    team2Total = this.team2.teamStats[category];
                    this.compareStat(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats);
                    break;
            }
        });

        return {team1Wins, team2Wins, tiedStats};
    }

    calculatePercentage(made, attempts) {
        return attempts > 0 ? made / attempts : 0;
    }

    compareStat(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats) {
        if (team1Total > team2Total) {
            team1Wins.push(category);
        } else if (team1Total < team2Total) {
            team2Wins.push(category);
        } else {
            tiedStats.push(category);
        }
    }

    compareTurnovers(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats) {
        if (team1Total < team2Total) {
            team1Wins.push(category);
        } else if (team1Total > team2Total) {
            team2Wins.push(category);
        } else {
            tiedStats.push(category);
        }
    }
}

export default Game;