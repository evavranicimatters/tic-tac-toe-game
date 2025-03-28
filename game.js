// Tic-Tac-Toe Game
// Copyright (C) 2024 [Your Name]
// Licensed under the MIT License

class TicTacToe {
    constructor() {
        this.board = new Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameMode = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Mode Selection
        document.getElementById('human-mode').addEventListener('click', () => this.startGame('human'));
        document.getElementById('computer-mode').addEventListener('click', () => this.startGame('computer'));
        
        // Game Board Interaction
        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', (e) => this.makeMove(parseInt(e.target.dataset.index)));
        });

        // Reset and Back Buttons
        document.getElementById('reset-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('back-btn').addEventListener('click', () => this.backToModeSelection());
    }

    startGame(mode) {
        this.gameMode = mode;
        this.board = new Array(9).fill(null);
        this.currentPlayer = 'X';
        
        document.querySelector('.mode-selection').classList.add('hidden');
        document.getElementById('game-board').classList.remove('hidden');
        document.getElementById('game-status').textContent = '';
        document.getElementById('current-player').textContent = `Current Player: ${this.currentPlayer}`;
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('x', 'o');
        });
    }

    makeMove(index) {
        if (this.board[index] || this.checkWinner()) return;

        this.board[index] = this.currentPlayer;
        document.querySelector(`.cell[data-index="${index}"]`).classList.add(this.currentPlayer.toLowerCase());

        if (this.checkWinner()) {
            document.getElementById('game-status').textContent = `Player ${this.currentPlayer} wins!`;
            return;
        }

        if (this.isDraw()) {
            document.getElementById('game-status').textContent = 'It\'s a Draw!';
            return;
        }

        this.switchPlayer();

        if (this.gameMode === 'computer' && this.currentPlayer === 'O') {
            this.computerMove();
        }
    }

    computerMove() {
        const availableMoves = this.board.reduce((acc, val, idx) => 
            val === null ? [...acc, idx] : acc, []);
        
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            setTimeout(() => this.makeMove(randomMove), 500);
        }
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('current-player').textContent = `Current Player: ${this.currentPlayer}`;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];

        return winPatterns.some(pattern => 
            this.board[pattern[0]] && 
            this.board[pattern[0]] === this.board[pattern[1]] && 
            this.board[pattern[0]] === this.board[pattern[2]]
        );
    }

    isDraw() {
        return this.board.every(cell => cell !== null);
    }

    resetGame() {
        this.board = new Array(9).fill(null);
        this.currentPlayer = 'X';
        
        document.getElementById('game-status').textContent = '';
        document.getElementById('current-player').textContent = `Current Player: ${this.currentPlayer}`;
        
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('x', 'o');
        });
    }

    backToModeSelection() {
        document.getElementById('game-board').classList.add('hidden');
        document.querySelector('.mode-selection').classList.remove('hidden');
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});