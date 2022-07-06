const playerFactory = (name, symbol) => {
    const score = 0;
    return {name, symbol, score}
}

const displayController = (() => {
    const renderTile = (tile, value) => {
        const changeTile = document.getElementById(`tile${tile}`);
        changeTile.textContent = value;
    }

    const updateScore = () => {
        const playerScore = document.getElementById(`${game.currentPlayer.name}Score`);
        playerScore.textContent = game.currentPlayer.score;
    }

    return {renderTile, updateScore}
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
    let move = 0;

    let currentPlayer = playerOne;

    const changePlayer = () => game.currentPlayer = ((game.currentPlayer == playerOne) ? playerTwo : playerOne);

    const checkRow = (row) => {
        let board = gameboard.getGameboard();
        if (row === 1){
            return (board[0] === board[1] && board[0] === board[2]) ? true: false;
        } else if (row === 2) {
            return (board[3] === board[4] && board[3] === board[5]) ? true: false;
        } else if (row == 3){
            return (board[6] === board[7] && board[6] === board[8]) ? true: false;
        }
    }

    const checkCol = (col) => {
        let board = gameboard.getGameboard();
        if (col === 1){
            return (board[0] === board[3] && board[0] === board[6]) ? true: false;
        } else if (col === 2) {
            return (board[1] === board[4] && board[1] === board[7]) ? true: false;
        } else if (col === 0){
            return (board[2] === board[5] && board[2] === board[8]) ? true: false;
        }
    }

    const checkDiagonal = (diag) => {
        let board = gameboard.getGameboard();
        if ((diag % 4) === 1){
            return (board[0] === board[4] && board[0] === board[8]) ? true: false;
        }
        else {
            return (board[2] === board[4] && board[2] === board[6]) ? true: false;
        }

    }

    const checkWinner = (tile) => {
        let result = false;
        result = (result) ? result : game.checkRow(Math.ceil(tile/3));
        result = (result) ? result :game.checkCol(tile%3);
        if ((tile % 2) === 1) {
            result = (result) ? result : game.checkDiagonal(tile);
        }

        return result;
    }

    const makeMove = (tile) => {
        if (gameboard.getGameboard()[tile-1] != 'X' && gameboard.getGameboard()[tile-1] != 'O')
        {
            game.move++;
            gameboard.setGametile(tile, game.currentPlayer.symbol);
            if (game.checkWinner(tile))
            {  
                alert(`${game.currentPlayer.name} Won`);
                gameboard.resetGameboard();
                game.currentPlayer.score++;
                displayController.updateScore();
                game.currentPlayer = playerOne;
                game.move = 0;
                return;
            }
            else if (game.move === 9) {
                alert(`It was a tie`);
                gameboard.resetGameboard();
                game.currentPlayer = playerOne;
                game.move = 0;
                return;
            }
            game.changePlayer();
        }
    }

    return {currentPlayer, move, checkWinner, checkRow, checkCol, checkDiagonal, changePlayer, makeMove}
})();

const gameTiles = document.querySelectorAll('.gameTile');
gameTiles.forEach(tile => tile.addEventListener('click', event => {
    game.makeMove(event.target.getAttribute('data'))
}));
