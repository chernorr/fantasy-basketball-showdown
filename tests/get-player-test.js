import { getPlayer }  from '../src/utility/firestore.js';
import { printPerformanceVerbose } from '../src/utility/print-performance.js'

async function testGetPlayer() {
    const selected = new Map();
    let player;

    for(let i = 0; i < 100; i++) {
        player = await getPlayer('Kevin Durant', 'kdphx35');

        console.log('----------------------------------------------------------------------------------------------------------');
        
        player.performances.forEach((perf) => {
            console.log(printPerformanceVerbose(perf));
            if (selected.has(perf['G'])) {
                selected.set(perf['G'], selected.get(perf['G']) + 1);
            } else {
                selected.set(perf['G'], 1);
            }
        });
        
        console.log('----------------------------------------------------------------------------------------------------------');
    }

    console.log(Object.fromEntries([...selected]));

}

testGetPlayer();