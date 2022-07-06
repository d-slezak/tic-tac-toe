const playerFactory = (name, symbol) => {
    return {name, symbol}
}

const displayController = (() => {
    const renderTile = (tile, value) => {
        const changeTile = document.getElementById(`tile${tile}`);
        changeTile.textContent = value;
    }

    return {renderTile}
})();

const gameboard = (() => {
    let gameboard = ['','','','','','','','',''];

    const getGameboard = () => {
        return gameboard;
    }

    const setGametile = (tile, value) => {
        gameboard[tile - 1] = value;
        displayController.renderTile(tile, value);
    }


    const resetGameboard = () => {
        for(let i = 0; i < gameboard.length; i++)
        {
            gameboard[i] = '';
            displayController.renderTile(i + 1, '');
        }
    }

    return {getGameboard, setGametile, resetGameboard}
})();

const game = (() => {
    let playerOne = playerFactory('playerOne', 'X');
    let playerTwo = playerFactory('playerTwo', 'O');

    let currentPlayer = playerOne;

    const changePlayer = () => game.currentPlayer = ((game.currentPlayer == playerOne) ? playerTwo : playerOne);

    const checkRow = (row) => {
        let board = gameboard.getGameboard();
        console.log(board);
        if (row === 1){
            return (board[0] === board[1] && board[0] === board[2]) ? true: false;
        } else if (row === 2) {
            return (board[3] === board[4] && board[3] === board[5]) ? true: false;
        } else if (row == 3){
            return (board[6] === board[7] && board[6] === board[8]) ? true: false;
        }
    }

    const checkCol = (col) => {

    }

    const checkWinner = (tile) => {
        console.log(game.checkRow(Math.ceil(tile/3)));
    }

    const makeMove = (tile) => {
        gameboard.setGametile(tile, game.currentPlayer.symbol);
        game.checkWinner(tile);
        game.changePlayer();
    }

    return {currentPlayer, checkWinner, checkRow,changePlayer, makeMove}
})();

const gameTiles = document.querySelectorAll('.gameTile');
gameTiles.forEach(tile => tile.addEventListener('click', event => {
    game.makeMove(event.target.getAttribute('data'))
}));
