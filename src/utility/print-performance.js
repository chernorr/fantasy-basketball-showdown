function printPerformance(performance) {
    return `PTS: ${performance['PTS']}, REB: ${performance['TRB']}, AST: ${performance['AST']}, STLS: ${performance['STL']}, `
        + `BLKS: ${performance['BLK']}, 3P: ${performance['3P']}, FG: ${performance['FG']}, FGA: ${performance['FGA']}, `
        + `FT: ${performance['FT']}, FTA: ${performance['FTA']}, TOV: ${performance['TOV']}   ...........   on ${transformDate(performance['Date'])} vs ${performance['Opp']} `;
}

function printPerformanceVerbose(performance) {
    return `Game Num: ${performance['G']}, Min: ${performance['MP']} .......... PTS: ${performance['PTS']}, REB: ${performance['TRB']}, AST: ${performance['AST']}, STLS: ${performance['STL']}, `
        + `BLKS: ${performance['BLK']}, 3P: ${performance['3P']}, FG: ${performance['FG']}, FGA: ${performance['FGA']}, `
        + `FT: ${performance['FT']}, FTA: ${performance['FTA']}, TOV: ${performance['TOV']}   ..........   on ${transformDate(performance['Date'])} vs ${performance['Opp']} `;
}

function transformDate(date) {
    const dte = date.split('-');
    return `${dte[1]}/${dte[2]}/${dte[0]}`
}

export { printPerformance, printPerformanceVerbose };