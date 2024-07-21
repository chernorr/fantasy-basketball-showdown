import { getPlayer, getAllPlayers } from '../src/utility/firestore.js';

describe('Firestore class tests', () => {
    test('should successfully retrieve list of all players as expected', async () => {
        const players = await getAllPlayers();
        const expected = [{"id": "adlal3", "name": "Anthony Davis", "team": "Los Angeles Lakers"}, {"id": "aemin5", "name": "Anthony Edwards", "team": "Minnesota Timberwolves"}, {"id": "bamia13", "name": "Bam Adebayo", "team": "Miami Heat"}]

        expect(players.length).toBe(27);
        expect(players).toEqual(expect.arrayContaining(expected));
    });

    test('should retrieve player object successfully', async () => {
        const player = await getPlayer("Luka Doncic", "lddal77");

        expect(player.name).toEqual("Luka Doncic");
        expect(player.performances.length).toBe(5);
    });
});