class Team {
    constructor(name) {
        this.name = name;
        this.players = new Map();
        this.selectedPerformances = new Map();
        this.teamStats = this.getEmptyStats();
    }

    addPlayer(player) {
        if(this.players.has(player.name)) {
            console.log("Player already in team");
        } else if (this.players.size < 5) {
            this.players.set(player.name, player.performances);
        } else {
            console.log("Team is already full.");
        }
    }

    selectPerformance(name, performanceIndex) {
        if (this.players.has(name)) {
            const performance = this.players.get(name)[performanceIndex]
            this.selectedPerformances.set(name, performance);
            this.updateTeamStats(performance);
        } else {
            console.log("Player not in team.");
        }
    }

    updateTeamStats(performance) {
        for (let stat in performance) {
            if (this.teamStats.hasOwnProperty(stat)) {
                this.teamStats[stat] += performance[stat];
            }
        }
    }

    resetTeamStats() {
        this.teamStats = this.getEmptyStats();
    }

    getEmptyStats() {
        return {
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
        };
    }
}

module.exports = Team;