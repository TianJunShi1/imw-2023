// 1. Interaction - Click on a circle to change background color of container.
// green
document.getElementById("green").onclick = function () {
  interactionContainerBg("green")
}
// plum
document.getElementById("plum").onclick = function () {
  interactionContainerBg("plum")
}
// blue
document.getElementById("blue").onclick = function () {
  interactionContainerBg("blue")
}
// interactionContainer DOM backgroundColor
function interactionContainerBg (color) {
  document.getElementById('interactionContainer').style.backgroundColor = color
}


// 2. Loop - Use a for loop to add repeating text.
// repeating text data
let repeatingText = 'Loop '
// loop conut
let count = 10
// Output the result
let result = ''
// loop repeating text
for (let i = 0; i < count; i++) {
  result += repeatingText
}
// Display page
let h5Element = document.createElement('h5')
h5Element.innerHTML = result
document.getElementById('loopContainer').appendChild(h5Element)


// 3. Condition - Change the color of the square based on a set of conditions.
let square = document.getElementById('square')
// Define the condition
let data = 10
// Change the color of the square based
if (data > 5) {
  square.style.backgroundColor = 'red'
} else {
  square.data.backgroundColor = 'lightsalmon'
}


// 4. Time - Increase the font size of the text as time passes.
// Get the increaseText element
let increaseText = document.getElementById('increaseText')
// Define the initial font size
let fontSize = 32
// Define the initial time counter 
let time = 0
// Update font size per second
let increaseTime = setInterval(() => {
  // Increase time counter per second
  time++
  // Calculate new font size per second
  fontSize += time
  // Update the font size- increaseText element
  increaseText.style.fontSize = fontSize + 'px'
  // Set a certain time interval to stop
  if (time >= 8) {
    clearInterval(increaseTime)
  }
}, 1000)


// 5. Input - Display the number of characters from an input field.
let textLength = document.getElementById('text-length')
document.getElementById('submit').onclick = function (e) {
  e.preventDefault()
  let inputText = document.getElementById('inputText')
  textLength.innerHTML = inputText.value.length
}


// 6. Console - Print a message of your choice to the console.
console.log("Message: Welcome to the console!")