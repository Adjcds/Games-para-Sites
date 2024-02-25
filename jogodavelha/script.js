// Variáveis para representar o estado do jogo
let currentPlayer = 'X';
let gameStatus = ['','','','','','','','',''];

// Função para alternar entre jogadores ('X' e 'O')
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Função para verificar se houve um vencedor
function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]              // Diagonais
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameStatus[a] && gameStatus[a] === gameStatus[b] && gameStatus[a] === gameStatus[c]) {
            return gameStatus[a];
        }
    }

    if (!gameStatus.includes('')) return 'draw'; // Verificar empate

    return null;
}

// Função para processar jogadas
function handleClick(cell, index) {
    if (gameStatus[index] === '' && !checkWinner()) {
        cell.textContent = currentPlayer;
        gameStatus[index] = currentPlayer;

        // Alterações para aumentar o tamanho do texto e deixá-lo em neon
        cell.style.fontSize = '36px'; // Aumenta o tamanho do texto
        cell.style.textShadow = '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de, 0 0 80px #ff00de, 0 0 100px #ff00de, 0 0 150px #ff00de'; // Adiciona um efeito de neon

        cell.style.backgroundColor = currentPlayer === 'X' ? 'red' : 'blue'; // Cor do fundo do quadrado

        const winner = checkWinner();
        if (winner) {
            alert(winner === 'draw' ? 'Empate!' : `Jogador ${winner} venceu!`);
            location.reload(); // Reiniciar a página ao final da partida
        } else {
            changePlayer();
        }
    }
}

// Adicionar eventos de clique às células do tabuleiro
const cells = document.querySelectorAll('.cell');
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
});
