const tileArray = document.querySelectorAll('.tile')

let playerOne = true

for (tile of tileArray) {
    tile.addEventListener('click', playerMove)
}

function playerMove(event) {
    let targetTile = event.target
    if (targetTile.classList.contains('empty')) {
        if (playerOne) {
            targetTile.textContent = "❌"
            targetTile.classList.remove('empty')
            playerOne = false
        } else {
            targetTile.textContent = "⭕"
            targetTile.classList.remove('empty')
            playerOne = true
        }
    }
}