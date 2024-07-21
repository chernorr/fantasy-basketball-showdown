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
                this.teamStats[stat] += Number(performance[stat]);
            }
        }
    }

    resetTeamStats() {
        this.teamStats = this.getEmptyStats();
    }

    getEmptyStats() {
        return {
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
        };
    }

    printStats() {
        return `${this.name} stats... PTS: ${this.teamStats['PTS']}, REB: ${this.teamStats['TRB']}, AST: ${this.teamStats['AST']}, STLS: ${this.teamStats['STL']}, `
        + `BLKS: ${this.teamStats['BLK']}, 3P: ${this.teamStats['3P']}, FG: ${this.teamStats['FG']}, FGA: ${this.teamStats['FGA']}, `
        + `FT: ${this.teamStats['FT']}, FTA: ${this.teamStats['FTA']}, TOV: ${this.teamStats['TOV']}`;
    }

}

export default Team;