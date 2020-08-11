const mainElement = document.querySelector("main")

class MineGrid {
    constructor (height, width, maxMines) {
        this.rowCount = height
        this.columnCount = width
        this.maxMines = maxMines
        this.mines = this.minePlacement()
    }

    minePlacement() {
        const numOfCells = this.rowCount * this.columnCount
        let minedCells = []
        while (minedCells.length < this.maxMines) {
            let mine = Math.ceil(Math.random()*numOfCells)
            if (minedCells.includes(mine) === false) {
                minedCells.push(mine)
            }
        }
        return minedCells
    }

    buildGrid() {

    }

}

class MineCell {
    constructor (x, y, n, mines) {
        this.cellNumber = n
        this.position = [x, y]
        this.isMine = this.isMineHandler()
    }

    isMineHandler(mines) {
        if (mines.includes(this.cellNumber)) {
            return true
        }
        return false
    }

    clickHandler(cells) {
        if (this.isMine) {
            alert("Boom! Game Over!")
            return("X")
        }
        else {
            let neighborMines = 0
            for (let cellCount = 0; cellCount < cells.length; cellCount++) {
                if ((cells[cellCount].position[0] >= (this.position[0] - 1) && cells[cellCount].position[0] <= (this.position[0] + 1)) && (cells[cellCount].position[1] >= (this.position[1] - 1) && cells[cellCount].position[1] <= (this.position[1] + 1))) {
                    if (cells[cellcount].isMine) {
                        neighborMines++
                    }
                }
            }
            if (neighborMines > 0) {
                return(toString(neighborMines))
            }
            else {
                this.revealAdjacent(cells)
                return("")
            }
        }
    }

    revealAdjacent(cells) {
        for (let cellCount = 0; cellCount < cells.length; cellCount++) {
            if ((cells[cellCount].position[0] >= (this.position[0] - 1) && cells[cellCount].position[0] <= (this.position[0] + 1)) && (cells[cellCount].position[1] >= (this.position[1] - 1) && cells[cellCount].position[1] <= (this.position[1] + 1)) && cells[cellCount].isMine === false) {
                const cell = document.getElementById(cellCount)
                cell.innerHTML = cells[cellCount].clickHandler(cells)
            }
        }
    }
}

const Game = new MineGrid(10, 10, 20)
Game.buildGrid()