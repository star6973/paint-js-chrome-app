const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d") // context란 canvas내의 픽셀에 접근할 수 있는 방법
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")

const DEFAULT_COLOR = "#2C2C2C"
const DEFAULT_SIZE = 700

canvas.width = DEFAULT_SIZE
canvas.height = DEFAULT_SIZE
ctx.strokeStyle = DEFAULT_COLOR
ctx.fillStyle = DEFAULT_COLOR
ctx.lineWidth = 2.5

let painting = false
let filling = false
let x
let y

function startPainting() {
    painting = true
}

function stopPainting() {
    painting = false
}

function onMouseDown(event) {
    painting = true
}

function onMouseMove(event) {
    x = event.offsetX
    y = event.offsetY

    if (painting === false) { // 마우스를 손에서 떼어냈을 경우
        ctx.beginPath() // 선을 만듦
        ctx.moveTo(x, y) // path를 만들면 마우스의 x, y좌표로 path를 옮김 => path의 시작점은 현재 마우스 포인트 위치
    } else { // 마우스를 클릭했을 경우
        ctx.lineTo(x, y) // path의 이전 위치에서부터 현재 위치까지 선을 만듦
        ctx.stroke() // 마우스를 움직이는 내내 생성되지만, 클릭하는 순간 보여진다
    }
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", onClickCanvas)
}

function onSelectColor(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = color
}

Array.from(colors).forEach(color => color.addEventListener("click", onSelectColor))

function onChangeRange(event) {
    const size = event.target.value
    ctx.lineWidth = size
}

if (range) {
    range.addEventListener("input", onChangeRange)
}

// canvas 전체를 색으로 채워주는 function
function onClickMode(event) {
    if (filling === true) {
        filling = false
        mode.innerText = "Fill"
    } else {
        filling = true
        mode.innerText = "Paint"
    }
}

if (mode) {
    mode.addEventListener("click", onClickMode)
}

function onClickCanvas() {
    if (filling === true) {
        ctx.rect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE)
        ctx.fill()
    }
}