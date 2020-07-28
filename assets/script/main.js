const mainElement = document.querySelector("main")

class MineGrid {
    constructor (height, width, maxMines) {
        this.rowCount = height
        this.columnCount = width
        this.maxMines = maxMines
    }

    minePlacement() {
        const maxMines = this.maxMines
        const numOfCells = this.rowCount * this.columnCount
        let minedCells = []
        while (minedCells.length < maxMines) {
            let mine = Math.ceil(Math.random()*numOfCells)
            if (minedCells.includes(mine) === false) {
                minedCells.push(mine)
            }
        }
        return minedCells
    }

    buildGrid() {
        let cellCount = 1
        let mines = this.minePlacement()
        for (let row = 1; row < this.rowCount; row++) {
            const rowElement = document.createElement("div")
            rowElement.className = "row"
            mainElement.append(rowElement)
            for (let cell = 1; cell < this.columnCount; cell++) {
                const cellElement = document.createElement("button")
                const newCell = new mineCell(cellCount, mines)
                if (newCell.isMine()) {
                    cellElement.className = "mine"
                }
                else {
                    cellElement.className = "safe" 
                }
                rowElement.append(cellElement)
                cellCount++
            }
        }
    }

}

class mineCell {
    constructor (x, mines) {
        this.cellNumber = x
        this.mines = mines
    }

    isMine() {
        if (this.mines.includes(this.cellNumber)) {
            return true
        }
        return false
    }

}

const game = new MineGrid(10, 10, 10)
game.buildGrid()