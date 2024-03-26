const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let score = 0
let totalTyped = 0
let correctTyped = 0
let incorrectTyped = 0
let timer
let secondsLeft = 5
let currentChars = []
let correct = document.getElementById('correct')
let incorrect = document.getElementById('incorrect')

function generateRandomCharacter () {
  return characters[Math.floor(Math.random() * characters.length)]
}

function displayCharacters () {
  const container = document.getElementById('container')
  container.innerHTML = ''
  for (let i = 0; i < currentChars.length; i++) {
    const char = currentChars[i]
    const top = Math.floor(Math.random() * (container.clientHeight - 20))
    const left = Math.floor(Math.random() * (container.clientWidth - 20))

    const charDiv = document.createElement('div')
    charDiv.textContent = char
    charDiv.classList.add('character')
    charDiv.style.top = top + 'px'
    charDiv.style.left = left + 'px'

    container.appendChild(charDiv)
  }
}

function startGame () {
  for (let i = 0; i < 6; i++) {
    currentChars.push(generateRandomCharacter())
  }
  displayCharacters()

  timer = setInterval(() => {
    secondsLeft--
    if (secondsLeft < 0) {
      clearInterval(timer)
      const accuracy = (correctTyped / totalTyped) * 100 || 0
      alert(`Game Over! Score: ${score}, Accuracy: ${accuracy.toFixed(2)}%, Incorrect: ${incorrectTyped}`)
      resetGame()
    }
  }, 1000)
}

function resetGame () {
  currentChars = []
  clearInterval(timer)
  displayCharacters()
  secondsLeft = 5
  score = 0
  totalTyped = 0
  correctTyped = 0
  incorrectTyped = 0
  document.getElementById("start").removeAttribute("disabled")
}

document.addEventListener('keydown', (event) => {
  const typedChar = String.fromCharCode(event.keyCode).toUpperCase()
  const charDivs = document.getElementsByClassName('character')
  let matched = false

  for (let i = 0; i < charDivs.length; i++) {
    const charDiv = charDivs[i]
    const char = charDiv.textContent

    if (typedChar === char) {
      score++
      correctTyped++
      charDiv.remove()
      totalTyped++
      currentChars.splice(i, 1)
      currentChars.push(generateRandomCharacter())
      displayCharacters()
      matched = true
      break
    }
  }

  if (!matched) {
    incorrectTyped++
    incorrect.innerHTML = incorrectTyped
  }
})

document.getElementById("start").onclick = function () {
  document.getElementById("start").setAttribute("disabled", true)
  startGame()
}

