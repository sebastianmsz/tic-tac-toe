(function () {
    document.querySelector('#year').textContent = new Date().getFullYear();
})();
(function render(){
    const boardPosition = document.querySelectorAll('.board-position');
    const resetBtn = document.querySelector('#resetBtn');

    boardPosition.forEach(position => {
        position.addEventListener('click',()=>{
            position.textContent = 'O';
        })
    });
    
    resetBtn.addEventListener('click',()=>{
        boardPosition.forEach(position => {
            position.textContent = '';
        });
    })
})()
(function game() {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let printGameBoard = ()=> console.log(`${gameBoard.slice(0,3)}\n${gameBoard.slice(3,6)}\n${gameBoard.slice(6,9)}`);
    let currentPlayer = true;
    
    function checkForWinner() {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let condition of winningConditions) {
            if (gameBoard[condition[0]] === gameBoard[condition[1]] &&
                gameBoard[condition[1]] === gameBoard[condition[2]] &&
                gameBoard[condition[0]]){
                    return true;
            }
        }
        return false;
    }
    function playRound() {
        do {
            printGameBoard();
            const move = prompt(`Player ${currentPlayer ? "X" : "O"}, enter your move (1-9):`);
            const position = parseInt(move, 10) - 1;
            if (position >= 0 && position < 9 && gameBoard[position] === '') {
                gameBoard[position] = currentPlayer ? "X" : "O";
                currentPlayer = !currentPlayer;
                break;
            } else {
                console.error('Invalid move. Try again.');
            }
        } while (true);
    }

    function game(){
        while (!checkForWinner() && gameBoard.includes('')){
            playRound();
        }
        if (!checkForWinner()) {
            printGameBoard();
            console.log(`Its a tie!`);
            gameBoard = ['', '', '', '', '', '', '', '', '']; 
        } else {
            printGameBoard();
            console.log(`Player ${!currentPlayer ? "X" : "O"} wins!`);
            gameBoard = ['', '', '', '', '', '', '', '', ''];
        }        
    }
})();