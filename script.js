const Gameboard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    const markCell = (row, col, marker) => {
        
        if (board[row][col] === "") {
            board[row][col] = marker;
            return true;
        }
        return false;
    };

    const winningCombinations = [
        // Rows
        [[0,0], [0,1], [0,2]],
        [[1,0], [1,1], [1,2]],
        [[2,0], [2,1], [2,2]],
        
        // Columns
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        
        // Diagonals
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
    ]

    const getBoard = () => board;
    const getWinningCombinations = () => winningCombinations;

    return {
        markCell,
        getBoard,
        getWinningCombinations
    }
})();


const Player = (name, marker) => ({name, marker})

const player1 =  Player("Odai", "X");
const player2 =  Player("Ali", "O");

const GameController = (() => {
    let currentPlayer = player1;
    let gameOver = false;

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 :  player1;
    };

    const checkWinner = () => {
        const board  = Gameboard.getBoard();
        const combos = Gameboard.getWinningCombinations();

        for(const combo of combos) {
            const [r0, c0] = combo[0];
            const [r1, c1] = combo[1];
            const [r2, c2] = combo[2];

            const cellA = board[r0][c0];
            const cellB = board[r1][c1];
            const cellC = board[r2][c2];

            if (cellA && cellA === cellB && cellB === cellC){
                console.log(`${currentPlayer.name}' Win`);
                return true;
            }
        }
        return false;
        
    }
    
    const placeMark = (row, col) => {
        console.log(`${currentPlayer.name}' turn`);
        if(Gameboard.markCell(row, col, currentPlayer.marker)) {
            checkWinner()
            changePlayer();
        } else {
            console.log("Spot taken!");
        }
        
    }

    return {placeMark};
}) ();
    

const RenderGameContent = (() => {
    const renderBoard = () => {
        const board = Gameboard.getBoard();
        const cells = document.querySelectorAll(".cell");

        board.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                const cellIndex = rowIndex * 3 + colIndex;
                cells[cellIndex].innerHTML = value;
                cells[cellIndex].setAttribute("data-row", rowIndex);
                cells[cellIndex].setAttribute("data-col", colIndex);
            });
        });
    };
    renderBoard();
    return {renderBoard};
})();

const IntractWithBoard = (() => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.addEventListener('click', () => {
        console.log(cell)
        const row = cell.dataset.row;
        const col = cell.dataset.col;
        console.log(col);
        console.log(row)
        GameController.placeMark(row,col)
        RenderGameContent.renderBoard();
    }))

})();