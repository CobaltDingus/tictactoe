const mainMessage = document.querySelector('.message-text')
const playerScores = document.querySelectorAll('.score-counter')

let isPlayerOne = true
let concluded = false
let playerMoves = 0
let playerOneScore = 0
let playerTwoScore = 0
let triviaIndex = 0

const tileArray = document.querySelectorAll('.tileEmpty')

for (tile of tileArray) {
    tile.addEventListener('click', playerMove)
}

const triviaBtn = document.querySelector('.trivia-btn')
const newRoundBtn = document.querySelector('.new-round-btn')
const resetBtn = document.querySelector('.reset-btn')

triviaBtn.addEventListener('click', handleTrivia)
newRoundBtn.addEventListener('click', handleNewRound)
resetBtn.addEventListener('click', handleReset)

let triviaContent = document.querySelector('.trivia-content')
const triviaArray = [
    "The earliest recorded games of Tic-Tac-Toe date back to 1300 BC in Ancient Egypt, played on roof tilings of all things.",
    "There was a variation of Tic-Tac-Toe that the Romans played. It was called terni lapilli and each player only had three counters which they had to keep moving around.",
    "No one is really sure where the name Tic-Tac-Toe came from. The first time the name was used was in the 1880s, apparently from the sounds pencils made when you drew the symbols.",
    "Alternative names for Tic-Tac-Toe include 'Noughts and Crosses' and 'Xs and O's'. Some weirdos may also call it 'Tick-Tat-Toe' or 'Tit-Tat-Toe'.",
    "Tic-Tac-Toe was one of the first video games ever created, under the name OXO in 1952. Players could even play, and lose, against a computer player.",
    "In 1975, an entire computer capable of playing Tic-Tac-Toe was made out of Tinkertoys - basically sets of colorful sticks and strings for little kids. Still better than my gaming setup.",
    "Tic-Tac-Toe is a classic example of a 'solved game' and in its case, a 'futile game'. Assuming both players have a functional brain, the game will always be forcibly ended in a tie.",
    "Because of its simplicity, Tic-Tac-Toe is often used as a teaching tool for kids to learn things like sportsmanship. Perhaps some gamers would stand to benefit from playing a bit more Tic-Tac-Toe."
]

// Check which player's turn it is and alternate symbols for each player.
function playerMove(event) {
    let targetTile = event.target
    if (targetTile.classList.contains('tileEmpty')) {
        if (isPlayerOne) {
            targetTile.classList = 'tileX'
            isPlayerOne = false
            mainMessage.textContent = "Player 2's turn!"
        } else {
            targetTile.classList = 'tileO'
            isPlayerOne = true
            mainMessage.textContent = "Player 1's turn!"
        }
    }
    playerMoves++
    checkVictory()
}

function checkVictory() {
    if (playerMoves >= 5) {
        scanRows()
        scanColumns()
        scanDiagonals()
        if (playerMoves === 9 && !concluded) {
            mainMessage.textContent = "It's a draw!"
            concluded = true
        } else if (concluded) {
            mainMessage.textContent = `${winner} has won!`
        }
    }
}


function scanRows() {
    if (!concluded) {
        i = 0
        let rowArray = []

        while (i < 7 && !concluded) {
            rowArray = [];
            let tile1 = tileArray[i].classList
            let tile2 = tileArray[i+1].classList
            let tile3 = tileArray[i+2].classList
            rowArray.push(tile1,tile2,tile3)

            if (!tile1.contains('tileEmpty')) {
                if (rowArray.every(checkClassX)) {
                    playerOneVictory()
                } else if (rowArray.every(checkClassO)) {
                    playerTwoVictory()
                } else {
                    i += 3
                }
            } else {
                i += 3
            }
        }
    }
}

function scanColumns() {
    if (!concluded) {
        i = 0
        let columnArray = []

        while (i < 3 && !concluded) {
            columnArray = []
            let tile1 = tileArray[i].classList
            let tile2 = tileArray[i+3].classList
            let tile3 = tileArray[i+6].classList
            columnArray.push(tile1,tile2,tile3)

            if (!tile1.contains('tileEmpty')) {
                if (columnArray.every(checkClassX)) {
                    playerOneVictory()
                } else if (columnArray.every(checkClassO)) {
                    playerTwoVictory()
                } else {
                    i++
                }
            } else {
                i++
            }
        }
    }
}

function scanDiagonals() {
    // First diagonal tile positions
    let i = 0, j = 8
    let middleTile = tileArray[4].classList
    if (!middleTile.contains('tileEmpty')) {
        for (let loopCount = 0; loopCount < 2 && !concluded; loopCount++) {
            let diagonalArray = []
            let tile1 = tileArray[i].classList
            let tile2 = middleTile
            let tile3 = tileArray[j].classList
            diagonalArray.push(tile1,tile2,tile3)
            
            if (diagonalArray.every(checkClassX)) {
                playerOneVictory()
            } else if (diagonalArray.every(checkClassO)) {
                playerTwoVictory()
            } else {
                // Second diagonal tile positions
                i = 2
                j = 6
            }
        }
    }
}

function checkClassX(classList) {
    return classList.contains('tileX')
}

function checkClassO(classList) {
    return classList.contains('tileO')
}

function playerOneVictory() {
    winner = 'Player 1'
    playerOneScore++
    playerScores[0].textContent = playerOneScore
    concluded = true
}

function playerTwoVictory() {
    winner = 'Player 2'
    playerTwoScore++
    playerScores[1].textContent = playerTwoScore
    concluded = true
}

function handleTrivia() {
    //let randomTriviaIndex = Math.floor(Math.random() * triviaArray.length)
    triviaContent.textContent = triviaArray[triviaIndex]
    triviaIndex++
    if (triviaIndex === triviaArray.length) {
        triviaIndex = 0
    }
}

function handleNewRound() {
    isPlayerOne = true
    concluded = false
    playerMoves = 0

    for (tile of tileArray) {
        tile.className = 'tileEmpty'
    }

    mainMessage.textContent = "Player 1, click a tile to begin!"
}

function handleReset() {
    isPlayerOne = true
    concluded = false
    playerMoves = 0
    playerOneScore = 0
    playerTwoScore = 0

    for (tile of tileArray) {
        tile.className = 'tileEmpty'
    }
    
    playerScores[0].textContent = playerOneScore
    playerScores[1].textContent = playerTwoScore
    mainMessage.textContent = "Player 1, click a tile to begin!"
}