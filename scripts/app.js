function init() {
  // ! Elements
  const start = document.querySelector('#start')
  const highScoreDisplay = document.querySelector('#high-score')
  const scoreDisplay = document.querySelector('#score-display')
  const livesDisplay = document.querySelector('#lives-display')
  const cells = document.querySelectorAll('.cell') // we want this in order to have a track of what the cell ids are

  // ! Variables
  let timer
  let score = 0
  let lives = 3

  // ! On page load
  // Add high score from local storage
  highScoreDisplay.innerHTML = getHighScore()

  // ! Executions
  function getHighScore(){
    // Checks if a high score exists, if it does it's returned as a number, otherwise return 0.
    return localStorage.getItem('whack-a-mole-high-score') ? parseFloat(localStorage.getItem('whack-a-mole-high-score')) : 0
  }

  function setHighScore(score){
    // if highscore is 0 or the current score is greater than the saved high score, then update to new high score.
    if(!getHighScore() || getHighScore() < score){
      // Set to localStorage
      localStorage.setItem('whack-a-mole-high-score', score)
      // Display new high score on the page
      highScoreDisplay.innerHTML = getHighScore()
    }
  }

  function addMole(position) {
    cells[position].classList.add('mole')
  }

  function removeMole() {
    const mole = document.querySelector('.mole')
    if(mole){
      mole.classList.remove('mole')
      return true
    }
  }

  function handleWhack(event) {
    if (event.target.classList.contains('mole')) {
      score += 100
      setHighScore(score)
      scoreDisplay.textContent = score
      removeMole()
    }
  }

  function endGame() {
    // Stop the timer
    clearInterval(timer)
    // Remove the mole that wasn't clicked
    removeMole()
    // After a short delay (due to alert behaviour) alert the score and also update high score if needed
    setTimeout(() => {
      // Alert score
      alert(score)
      // Update high score
      setHighScore(score)
    }, 50)
  }

  function reset(){
    // Cleanup
    clearInterval(timer)
    removeMole()
    score = 0
    scoreDisplay.innerHTML = score
    lives = 3
    livesDisplay.innerHTML = "❤️".repeat(lives)
    start.innerText = 'Restart'
  }


  function startGame() {
    // Reset
    reset()
    // Start timer
    timer = setInterval(() => {
      // Remove mole
      // If it has been clicked, wasClicked will return true
      const wasRemoved = removeMole()
      // If wasClicked is undefined, it means the mole wasn't clicked
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
