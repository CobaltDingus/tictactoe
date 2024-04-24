const conclusionMessage = document.querySelector('.message')

let isPlayerOne = true
let concluded = false
let playerOneMoves = 0
let playerTwoMoves = 0

const tileArray = document.querySelectorAll('.tileEmpty')

for (tile of tileArray) {
    tile.addEventListener('click', playerMove)
}


// Check which player's turn it is and alternate symbols for each player.
function playerMove(event) {
    let targetTile = event.target
    if (targetTile.classList.contains('tileEmpty')) {
        if (isPlayerOne) {
            targetTile.textContent = "❌"
            targetTile.classList = 'tileX '
            playerOneMoves++
            isPlayerOne = false
        } else {
            targetTile.textContent = "⭕"
            targetTile.classList = 'tileO'
            playerTwoMoves++
            isPlayerOne = true
        }
    }
    conclusionMessage.textContent = scanRows()
}

function checkVictory() {
    if (playerOneMoves >= 3) {
        scanRows()
        scanColumns()
        scanDiagonals()
    } else if (playerOneMoves + playerTwoMoves === 9) {
        console.log('draw');
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
                    console.log('P1')
                    // concluded = true
                    winner = "Player"
                    return winner
                } else if (rowArray.every(checkClassO)) {
                    console.log('P2')
                    concluded = true
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
                    console.log('P1')
                    concluded = true
                } else if (columnArray.every(checkClassO)) {
                    console.log('P2')
                    concluded = true
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
    if (!concluded) {
        let i = 0, j = 8
        let loopCount = 0
        let middleTile = tileArray[4].classList
        if (!middleTile.contains('tileEmpty')) {
            while (loopCount !== 2 && !concluded) {
                let diagonalArray = []
                let tile1 = tileArray[i].classList
                let tile2 = middleTile
                let tile3 = tileArray[j].classList
                diagonalArray.push(tile1,tile2,tile3)
                
                if (diagonalArray.every(checkClassX)) {
                    console.log('P1')
                    concluded = true
                } else if (diagonalArray.every(checkClassO)) {
                    console.log('P2')
                    concluded = true
                } else {
                    i = 2
                    j = 6
                    loopCount++
                }
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
