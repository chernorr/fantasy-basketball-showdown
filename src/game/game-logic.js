class Game {
    constructor(team1, team2) {
        this.team1 = team1;
        this.team2 = team2;
    }

    calculateScore() {
        const categories = ['points', 'rebounds', 'assists', 'steals', 'blocks', 'fgPercentage', 'ftPercentage', 'threePointers', 'turnovers'];
        let team1Wins = [];
        let team2Wins = [];
        let tiedStats = [];

        categories.forEach(category => {
            let team1Total, team2Total;

            switch (category) {
                case 'fgPercentage':
                    team1Total = this.calculatePercentage(this.team1.teamStats['fgMade'], this.team1.teamStats['fgAttempts']);
                    team2Total = this.calculatePercentage(this.team2.teamStats['fgMade'], this.team2.teamStats['fgAttempts']);
                    this.compareStat(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats);
                    break;
                case 'ftPercentage':
                    team1Total = this.calculatePercentage(this.team1.teamStats['ftMade'], this.team1.teamStats['ftAttempts']);
                    team2Total = this.calculatePercentage(this.team2.teamStats['ftMade'], this.team2.teamStats['ftAttempts']);
                    this.compareStat(team1Total, team2Total, category, team1Wins, team2Wins, tiedStats);
                    break;
                case 'turnovers':
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

module.exports = Game;