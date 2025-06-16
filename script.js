const gameboard = {
    board:
    [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    markCell: function (row, column, currentPlayer){
        
        this.board[row][column] = currentPlayer.marker;
        console.log(this.board)
        
    },
    winnningCombinations: 
    [
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
}

function Player(name, marker) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.name = name;
    this.marker = marker;
}

const player1 = new Player("Odai", "X");
const player2 = new Player("Ali", "O");

let currentPlayer = player1;

const gameController = {
    placeMark: function(row, column) {
        console.log(`${currentPlayer.name}' turn`);
        gameboard.markCell(row, column, currentPlayer)
        this.checkWinner()
        this.changePlayer();
    },
    changePlayer: function(){
        currentPlayer = (currentPlayer == player1) ? player2 : player1;
    },
    checkWinner: function(){
        
        for(const combo of gameboard.winnningCombinations) {
            const [row0, col0] = combo[0];
            const [row1, col1] = combo[1];
            const [row2, col2] = combo[2];
            const cellA = gameboard.board[row0][col0];
            const cellB = gameboard.board[row1][col1];
            const cellC = gameboard.board[row2][col2];
            if (cellA && cellA === cellB && cellB === cellC) {
            console.log(`${currentPlayer.name} wins with ${cellA}!`);
            return true;
            }
        }
    return false;
    }

    
}
