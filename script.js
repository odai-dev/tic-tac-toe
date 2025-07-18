const Gameboard = (() => {
    const board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    const markCell = (row, col, marker) => {
        
        if (board[row][col] === "") {
            board[row][col] = marker;
            console.log(board);
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


const Player = (name, marker) => ({name, marker});

const player1 =  Player("", "X");
const player2 =  Player("", "O");

const form = document.querySelector("#form");
const resetBtn = document.querySelector(".reset-btn");

form.addEventListener('submit', event => {
    event.preventDefault();
    const player1Name = document.querySelector("#player1").value;
    const player2Name = document.querySelector("#player2").value;
    if(player1Name && player2Name) {
        player1.name = player1Name;
        player2.name = player2Name;
        form.classList.add("hide-form");   
        resetBtn.classList.remove("hide-btn");
        resetBtn.textContent = "Start Game";
    }
})


const status = document.querySelector("#status");

const GameController = (() => {
    let currentPlayer = player1;
    let gameOver = true;

    const changePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 :  player1;
    }

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
                
                console.log(`${currentPlayer.name} Wins`);
                status.textContent = `${currentPlayer.name} Wins`;
                gameOver = true;
                return true;
            }
        }
        const isDraw = board.flat().every(cell => cell !== "");
    if (isDraw) {
        status.textContent = "It's a draw!";
        gameOver = true;
        return true;
    }
        return false;
    }
    

    
    const placeMark = (row, col) => {
        if(GameController.getGameOver()) return;
        if(Gameboard.markCell(row, col, currentPlayer.marker)) {
            if(!checkWinner()){
                changePlayer();
            }
        } else {
            console.log("Spot taken!");
        }
    }
    
    const resetGame = () => {
        const board = Gameboard.getBoard();
        for (let r=0; r<3; r++) {
            for(let c = 0; c<3; c++) {
                board[r][c] = "";
            }
        }
        RenderGameContent.renderBoard();
        status.textContent = `${player1.name}'s Turn`;
        currentPlayer = player1;
        gameOver=false;

        resetBtn.textContent = "Restart Game"; 
    }
    
    resetBtn.onclick = () => {
        resetGame();
    }

    

    return {placeMark, getCurrentPlayerName: ()=> currentPlayer.name, getGameOver: () => gameOver};
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
        if(!GameController.getGameOver()) {
            status.textContent = `${GameController.getCurrentPlayerName()}'s Turn`;
            console.log(`${GameController.getCurrentPlayerName()}' turn`);
        }
        
        
    };
    renderBoard();
    return {renderBoard};
})();

const InteractWithBoard  = (() => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.addEventListener('click', () => {
        if (GameController.getGameOver()) return;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        GameController.placeMark(row,col)
        RenderGameContent.renderBoard();
    }))
})();
