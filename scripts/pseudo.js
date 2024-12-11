function init() {

  // ! Elements
  // start button
  // score display
  // lives display
  // grid cells

  // ! Variables
  // score
  // lives
  // timer

  // ! Executions
  // ACTIONS:
  
  // User clicks on start button to start the game
  function startGame(){
    // this starts an interval that runs our logic - this should repeat every second
    // ? remove the old mole
    // ? add the new mole
    // we need to check to see if the lives are greater than 0:
    // ? if they aren't we end the game
  }

  
  // User clicks on the mole
  function whackMole(){
    // if the cell is clicked while a mole is present we:
    // remove the mole
    // add 100 to the score
    // update the score display innerHTML
  }
  
  function addMole(position) {
    // remove mole class from cell at the same index as the position
  }

  function removeMole() {
    // remove mole from the board
  }

  function endGame() {
    // Stop the timer
    // Remove the mole that wasn't clicked
    // alert the score
  }

  function startGame() {
    // Reset variables & timers
    resetVariables()

    // Start timer
    timer = setInterval(() => {
      // Remove mole
      // If it has been clicked, wasClicked will return true
      const wasRemoved = removeMole()
      // If mole was removed, it means the mole wasn't clicked as it was still on the board
      if (wasRemoved) {
        // Remove a life from lives variable
        lives--
        // Update lives display
        livesDisplay.innerHTML = lives ? "❤️".repeat(lives) : "💔"
        // If lives is 0
        if(lives === 0){
          // Return ends the function so the mole won't be added below
          return endGame()
        }
      }
      // Add mole to random position
      addMole(Math.floor(Math.random() * cells.length))
    }, 1000)
  }

  // ! Events
  start.addEventListener('click', startGame)
  cells.forEach(cell => cell.addEventListener('click', handleWhack))
}

document.addEventListener('DOMContentLoaded', init)
