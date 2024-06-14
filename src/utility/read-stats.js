const fs = require('fs');
const path = require('path');
const Player = require('../game/player');

function getPlayers() {
    const filePath = path.join(__dirname, '../data', 'stats.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data).players.map(data => new Player(data.name, data.performances));
}

module.exports = getPlayers;