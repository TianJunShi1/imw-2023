const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
let score = 0
let totalTyped = 0
let correctTyped = 0
let incorrectTyped = 0
let timer
let secondsLeft = 20
let currentChars = []

function generateRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)]
}

function displayCharacters() {
  const container = document.getElementById('container')
  container.innerHTML = ''
  for (let i = 0; i < currentChars.length; i++) {
    const char = currentChars[i]
    const top = Math.floor(Math.random() * (container.clientHeight - 80))
    const left = Math.floor(Math.random() * (container.clientWidth - 80))

    const charDiv = document.createElement('div')
    charDiv.textContent = char
    charDiv.classList.add('character')
    charDiv.style.top = top + 'px'
    charDiv.style.left = left + 'px'
    charDiv.style.backgroundColor = 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')'

    container.appendChild(charDiv)
  }
}

function startGame() {
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

function resetGame() {
  currentChars = []
  clearInterval(timer)
  displayCharacters()
  secondsLeft = 5
  score = 0
  totalTyped = 0
  correctTyped = 0
  incorrectTyped = 0
  startGame()
}

document.addEventListener('keydown', (event) => {
  const typedChar = String.fromCharCode(event.keyCode).toUpperCase()
  const charDivs = document.getElementsByClassName('character')
  let matchedChar = null

  for (let i = 0; i < charDivs.length; i++) {
    const charDiv = charDivs[i]
    const char = charDiv.textContent

    if (typedChar === char) {
      matchedChar = charDiv
      break
    }
  }

  if (matchedChar) {
    score++
    correctTyped++

    let top, left
    let overlapped = true
    while (overlapped) {
      top = Math.floor(Math.random() * (container.clientHeight - 20))
      left = Math.floor(Math.random() * (container.clientWidth - 20))

      overlapped = false
      for (let j = 0; j < charDivs.length; j++) {
        if (charDivs[j] !== matchedChar && Math.abs(top - parseInt(charDivs[j].style.top)) < 20 && Math.abs(left - parseInt(charDivs[j].style.left)) < 20) {
          overlapped = true
          break
        }
      }
    }

    matchedChar.style.top = top + 'px'
    matchedChar.style.left = left + 'px'
    matchedChar.style.backgroundColor = 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')'
    matchedChar.textContent = generateRandomCharacter()
  } else {
    incorrectTyped++
  }

  totalTyped++
})


startGame()

