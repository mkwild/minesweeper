const mainElement = document.querySelector("main")

class MineGrid {
    constructor (height, width, maxMines) {
        this.rowCount = height
        this.columnCount = width
        this.maxMines = maxMines
        this.mines = this.minePlacement()
        this.isLost = false
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

    checkForWin(cellsArray) {
        let winCondition = (this.rowCount * this.columnCount) - this.maxMines
        let currentCleared = 0
        for (let cell = 0; cell < cellsArray.length; cell++) {
            if (cellsArray[cell].isRevealed) {
                currentCleared++
            }
        }
        if (currentCleared === winCondition) {
            clearInterval(timeCounter)
            alert("You Are Winner!")
            this.isLost === true
        }
    }

    buildGrid() {
        let cellNumber = 1
        let cellsArray = []
        for (let row = 1; row <= this.rowCount; row++) {
            const rowElement = document.createElement("div")
            rowElement.className = "row"
            mainElement.append(rowElement)
            for (let column = 1; column <= this.columnCount; column++) {
                const cellElement = document.createElement("button")
                cellElement.id = cellNumber
                rowElement.append(cellElement)

                const cell = new MineCell(row, column, cellNumber, this.mines)
                cellsArray.push(cell)

                cellElement.addEventListener("mouseup", function (event) {
                    let buttonNumber = event.button
                    cell.clickHandler(buttonNumber, cellsArray)
                })
                cellNumber++
            }
        }
    }
}

class MineCell {
    constructor (x, y, n, mines) {
        this.cellNumber = n
        this.position = [x, y]
        this.isMine = this.isMineHandler(mines)
        this.isRevealed = false
    }

    isMineHandler(mines) {
        let minesArray = mines
        if (minesArray.includes(this.cellNumber)) {
            return true
        }
        return false
    }
    
    clickHandler(mouseButton, cellsArray) {
        let intervalSet
        if (mouseButton === 0) {
            const button = document.getElementById(this.cellNumber)
            button.innerHTML = this.leftClickHandler(cellsArray)
            Game.checkForWin(cellsArray)
        }
        else if (mouseButton === 2) {
            const button = document.getElementById(this.cellNumber)
            button.innerHTML = this.rightClickHandler()
        }
    }

    leftClickHandler(cells) {
        if (this.isMine) {
            clearInterval(timeCounter)
            Game.isLost = true
            alert("Boom! Game Over!")
            this.revealMines(cells)
            return ("&#9760")
        }
        else {
            const currentCell = document.getElementById(this.cellNumber)
            currentCell.className = "cleared"
            this.isRevealed = true
            let neighborMines = 0
            for (let cellCount = 0; cellCount < cells.length; cellCount++) {
                if ((cells[cellCount].position[0] >= (this.position[0] - 1) && cells[cellCount].position[0] <= (this.position[0] + 1)) && (cells[cellCount].position[1] >= (this.position[1] - 1) && cells[cellCount].position[1] <= (this.position[1] + 1))) {
                    if (cells[cellCount].isMine) {
                        neighborMines++
                    }
                }
            }
            if (neighborMines > 0) {
                return(neighborMines)
            }
            else {
                this.revealAdjacent(cells)
                return("")
            }
        }
    }

    revealAdjacent(cells) {
        for (let cellCount = 0; cellCount < cells.length; cellCount++) {
            if ((cells[cellCount].position[0] >= (this.position[0] - 1) && cells[cellCount].position[0] <= (this.position[0] + 1)) && (cells[cellCount].position[1] >= (this.position[1] - 1) && cells[cellCount].position[1] <= (this.position[1] + 1)) && cells[cellCount].isMine === false && cells[cellCount].isRevealed === false) {
                const cell = document.getElementById(cells[cellCount].cellNumber)
                cell.innerHTML = cells[cellCount].leftClickHandler(cells)
            }
        }
    }

    revealMines(cells) {
        for (let cellCount = 0; cellCount < cells.length; cellCount++) {
            if (cells[cellCount].isMine) {
                const mineCell = document.getElementById(cells[cellCount].cellNumber)
                mineCell.innerHTML = "&#9760"
            }
        }
    }

    rightClickHandler() {
        const cell = document.getElementById(this.cellNumber)
        if (this.isRevealed === false) {
            if (cell.innerHTML == "") {
                return("&#9873")
            }
            else {
                return("")
            }
        }
        else {
            return(cell.innerHTML)
        }
    }
}

// Timer
const footerElement = document.querySelector("footer")
const timer = document.createElement("div")
timer.className = "timer"
timer.innerHTML = "0"
footerElement.append(timer)
let counter = 0
let timeCounter = function() {
    counter++
    timer.innerHTML = counter
}
let intervalSet
mainElement.addEventListener("mouseup", function() {
    if (counter === 0 && Game.isLost === false) {
        intervalSet = setInterval(timeCounter, 1000)
    }
})
mainElement.addEventListener("mouseup", function() {
    if (Game.isLost === true) {
        clearInterval(intervalSet)
    }
})

mainElement.addEventListener("contextmenu", function(e) {
    e.preventDefault()
}, false)

const Game = new MineGrid(10, 10, 10)
Game.buildGrid()

const resetButton = document.createElement("button")
resetButton.className = "reset"
resetButton.innerHTML = "RESET"
footerElement.append(resetButton)