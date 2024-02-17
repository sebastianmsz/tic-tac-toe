(function updateYear() {
    document.querySelector('#year').textContent = new Date().getFullYear();
})();

(function game() {
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = true;
    let userFeedback = `It's ${currentPlayer ? 'X' : 'O'}'s turn`;
    
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

    function playerMoveFactory(player) {
        return function(position) {
            if (gameBoard[position] === '') {
                gameBoard[position] = player;
                currentPlayer = !currentPlayer;
            }
        }
    }

    const playerXMove = playerMoveFactory('X');
    const playerOMove = playerMoveFactory('O');

    function playRound(position){
        if (!checkForWinner() && gameBoard.includes('')){
            userFeedback = `It's ${!currentPlayer ? 'X' : 'O'}'s turn`;
            currentPlayer ? playerXMove(position) : playerOMove(position);
        }
        if (!checkForWinner() && !gameBoard.includes('')) {
            userFeedback = `It's a tie! 🟰`;
        }
        if (checkForWinner()){
            userFeedback = `Player ${!currentPlayer ? 'X' : 'O'} wins! 🥳`;
        }        
    }

    function resetGame(){
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = true;
        userFeedback = `It's ${currentPlayer ? 'X' : 'O'}'s turn`;
    }

    (function render(){
        const boardPosition = document.querySelectorAll('.board-position');
        const resetBtn = document.querySelector('#resetBtn');

        function renderUi (){
            const userFeedbackUi = document.querySelector('#userMessage');
            userFeedbackUi.textContent = userFeedback;
            for (let i = 0; i < 9; i++) {
                boardPosition[i].textContent = gameBoard[i];
            }
        }

        resetBtn.addEventListener('click',()=>{
            resetGame();
            renderUi();
        })
    
        for (let i = 0; i < 9; i++) {
            boardPosition[i].addEventListener('click', ()=>{
                playRound(i);
                renderUi();
            })
        }
    })()
})()
