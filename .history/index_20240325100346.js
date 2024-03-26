const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let score = 0
let totalTyped = 0
let correctTyped = 0
let timer
let secondsLeft = 60

function generateRandomCharacter () {
  return characters[Math.floor(Math.random() * characters.length)]
}

function displayCharacter () {
  const container = document.getElementById('container')
  container.textContent = generateRandomCharacter()
}

function startGame () {
  displayCharacter()
  timer = setInterval(() => {
    secondsLeft--
    if (secondsLeft < 0) {
      clearInterval(timer)
      const accuracy = (correctTyped / totalTyped) * 100 || 0
      alert(`Game Over! Score: ${score}, Accuracy: ${accuracy.toFixed(2)}%`)
    }
  }, 1000)
}

document.addEventListener('keydown', (event) => {
  const typedChar = String.fromCharCode(event.keyCode)
  const currentChar = document.getElementById('container').textContent

  if (typedChar === currentChar) {
    score++
    correctTyped++
  }

  totalTyped++
  displayCharacter()
})
