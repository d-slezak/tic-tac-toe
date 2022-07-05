const playerFactory = (name, symbol) => {
    return {name, symbol}
}

const gameboard = (() => {
    let gameboard = ['','','','','','','','',''];

    const getGameboard = () => {
        return gameboard;
    }

    const setGametile = (tile, value) => {
        gameboard[tile] = value;
    }

    const resetGameboard = () => {
        gameboard = ['','','','','','','','',''];
    }

    return {getGameboard, setGametile, resetGameboard}
})();

const game = (() => {
    let playerOne = playerFactory('playerOne', 'X');
    let playerTwo = playerFactory('playerTwo', 'O');

    let currentPlayer = playerOne;

    const changePlayer = () => game.currentPlayer = ((game.currentPlayer == playerOne) ? playerTwo : playerOne);

    return {currentPlayer, changePlayer}
})();

