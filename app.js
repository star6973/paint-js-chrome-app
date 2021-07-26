const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d") // context란 canvas내의 픽셀에 접근할 수 있는 방법
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const save = document.getElementById("jsSave")
const DEFAULT_COLOR = "#2C2C2C"
const DEFAULT_SIZE = 700

let painting = false
let filling = false

canvas.width = DEFAULT_SIZE
canvas.height = DEFAULT_SIZE

ctx.strokeStyle = DEFAULT_COLOR
ctx.fillStyle = "white"
ctx.fillRect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE)
ctx.lineWidth = 2.5

canvas.addEventListener("mousedown", e => {
    painting = true
})

canvas.addEventListener("mousemove", e => {
    const x = e.offsetX
    const y = e.offsetY

    if (painting === false) { // 마우스를 손에서 떼어냈을 경우
        ctx.beginPath() // 선을 만듦
        ctx.moveTo(x, y) // path를 만들면 마우스의 x, y좌표로 path를 옮김 => path의 시작점은 현재 마우스 포인트 위치
    } else { // 마우스를 클릭했을 경우
        ctx.lineTo(x, y) // path의 이전 위치에서부터 현재 위치까지 선을 만듦
        ctx.stroke() // 마우스를 움직이는 내내 생성되지만, 클릭하는 순간 보여진다
    }
})

canvas.addEventListener("mouseup", e => {
    painting = false
})

canvas.addEventListener("mouseleave", e => {
    painting = false
})

canvas.addEventListener("click", e => {
    if (filling === true) {
        ctx.rect(0, 0, DEFAULT_SIZE, DEFAULT_SIZE)
        ctx.fill()
    }
})

// 마우스 우클릭 이벤트
canvas.addEventListener("contextmenu", e => {
    e.preventDefault()
})

if (colors) {
    Array.from(colors).forEach(color => color.addEventListener("click", e => {
        const color = e.target.style.backgroundColor

        ctx.strokeStyle = color
        ctx.fillStyle = color
    }))
}

if (range) {
    range.addEventListener("input", e => {
        const size = e.target.value

        ctx.lineWidth = size
    })
}

if (mode) {
    mode.addEventListener("click", e => {
        if (filling === true) {
            painting = false
            filling = false
            mode.innerText = "Fill"
        } else {
            painting = true
            filling = true
            mode.innerText = "Paint"
        }
    })
}

if (save) {
    save.addEventListener("click", e => {
        // canvas를 이미지 형태로 가져오기
        const image = canvas.toDataURL() // default = png 
        // 가져온 이미지 URL을 보이지 않는 a 태그에 삽입하기
        const link = document.createElement("a")

        link.href = image
        link.download = "PaintJS"
        link.click()
    })
}