// 定义游戏状态变量
var score = 0  //定义分数
var bubbles = []  //生成泡泡绘制组成的数组
var time = 120  //定义时间
var keyPressed = ""  //键盘按下
var w = 750  // 设置宽
var h = 500  // 设置高
var timer  //设置定时器默认值
var speedFactor = 0.5 // 减少这个值会使泡泡移动得更慢

// 随机生成泡泡
var o1 = {
  radius: 30,  //半径
  c: 100,  //颜色
  clicked: false,  //是否被点击
  change: { c: 10 }
}

const canvas = document.getElementById("canvasEle")  // 获取 canvas 元素并创建绘图上下文
const ctx = canvas.getContext("2d")
canvas.width = w  // 设置宽
canvas.height = h  // 设置高


// 监听键盘按键事件
document.onkeydown = function (event) {
  keyPressed = event.key.toUpperCase() // 记录按下的键
}

// 开始游戏按钮点击事件
document.getElementById("start").onclick = function () {
  // 开始游戏了设置禁止再点击start按钮
  document.getElementById("start").setAttribute("disabled", true)
  update()
  generateBubble(4)
  timer = setInterval(updateTimer, 1000)  // 每秒调用一次 updateTimer 函数
}


// 更新游戏状态
function update () {
  // 清空画布
  ctx.clearRect(0, 0, w, h)

  // 绘制泡泡
  for (let i = 0; i < bubbles.length; i++) {
    const o = bubbles[i]

    // 绘制泡泡
    drawBubbles(o)

    // 绘制泡泡内的内容
    if (o.type === "text") {  //文字
      drawBubblesText(o)
    }

    // 判断泡泡是否被点击或按下正确的键
    if (o.type === "text" && o.content === keyPressed) {
      bubbles.splice(i, 1)  //删除已经正确的
      i--
      score += 1  //正确的+1
      generateBubble(randZeroOrOne()) // 生成新的泡泡
      break // 只在点击一个泡泡后生成一个新的泡泡
    }

    // 检查泡泡是否碰到边界
    bounce(o)

    // 更新泡泡的位置
    o.x += o.dx
    o.y += o.dy
  }

  // 得分
  document.getElementById("score").innerHTML = score

  // 请求下一帧更新
  requestAnimationFrame(update)
}

// 更新剩余时间
function updateTimer () {
  const minutes = Math.floor(time / 60) // 计算剩余分钟数
  const seconds = time % 60 // 计算剩余秒数

  // 格式化时间为 mm:ss 的形式
  const formatTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  // 更新时间显示
  document.getElementById("time").innerHTML = formatTime

  if (time <= -1) {
    clearInterval(timer) // 清除定时器
    endGame() // 结束游戏逻辑
  }
  time-- // 时间减少1秒
}

function endGame () {  //结束游戏
  // 弹出得分结果
  alert(`Game Over!\nYour Score: ${score}`)
  location.reload()
  document.getElementById("start").setAttribute("disabled", false)
  return
}

// 绘制泡泡
function drawBubbles (o) {
  // 当泡泡类型为 'shape' 时，不绘制外围的圆形泡泡
  if (o.type === 'text') {
    ctx.beginPath()
    ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2)
    ctx.fillStyle = o.color
    ctx.fill()
  }
}

// 绘制泡泡里面的文字
function drawBubblesText (o) {
  ctx.font = "20px Arial"
  ctx.fillStyle = "white"
  ctx.fontWeight = "bold"
  ctx.textAlign = "center"
  ctx.fillText(o.content, o.x, o.y + 6)
}

// 检查泡泡是否碰到边界
function bounce (o) {
  if (o.x - o.radius <= 0 || o.x + o.radius >= canvas.width) {
    o.dx *= -1
  }
  if (o.y - o.radius <= 0 || o.y + o.radius >= canvas.height) {
    o.dy *= -1
  }
}

// 判断点是否在泡泡内部
function isPointInsideBubble (x, y, o) {
  const dx = x - o.x
  const dy = y - o.y
  return dx * dx + dy * dy <= o.radius * o.radius
}

// num 生成的个数
function generateBubble (num) {
  for (let i = 0; i < num; i++) {  //文字
    let c = o1.change.c += o1.c
    const bubble = {
      x: rand() * (w - 60) + 30, // 随机位置，确保不会碰到边界
      y: rand() * (h - 60) + 30,
      radius: o1.radius,  //半径
      color: 'hsla(' + c + ', 100%, 50%, 1)',  //颜色
      content: getRandomTextContent(),  //内容
      type: "text",  //类型-文字
      clicked: o1.clicked,  //是否被点击
      dx: (rand() * 4 - 2) * speedFactor, // x 方向的速度
      dy: (rand() * 4 - 2) * speedFactor, // y 方向的速度
    }
    bubbles.push(bubble)
  }
}



// 随机生成数字或字母
function getRandomTextContent () {
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  var randomIndex = Math.floor(Math.random() * letters.length)
  return letters[randomIndex]
}

// 生成随机值
function rand () {
  return Math.random()
}

// 生成随机值，0或者1
function randZeroOrOne () {
  return Math.random() > 0.5 ? 1 : 0
}