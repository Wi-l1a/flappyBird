const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')



const bird = new Image()
const bg = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()
bird.src = ('./images/diyaz.png')
bg.src = ('./images/bg.png')
fg.src = ('./images/fg.png')
pipeUp.src = ('./images/pipeUp.png')
pipeBottom.src = ('./images/pipeBottom.png')


const fly = new Audio()

const score_audio = new Audio()

fly.src = './audio/Nani.mp3'
score_audio.src = './audio/score.mp3'





// отступ между труп
let gap = 90
// позиция птички
let posX = 10
let posY = 150

// Графвтация падение птички
let grav = 1.5
// создание очков
let score = 0
// создание труб
const pipe = []
pipe[0] = {
    x: canvas.clientWidth,
    y: 0
}

const moveUp = () => {
    posY -= 35
}

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 32) {
        moveUp()
        fly.play()
    }
})

const draw = () => {
    context.drawImage(bg, 0, 0)
    context.drawImage(fg, 0, canvas.height - fg.height)
    context.drawImage(bird, posX, posY)

    for (let i = 0; i < pipe.length; i++) {
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)

        pipe[i].x--

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        // отслеэивание касаний
        if (posX + bird.width >= pipe[i].x
            && posX <= pipe[i].x + pipeUp.width
            && (posY <= pipe[i].y + pipeUp.height
                || posY + bird.height >= pipe[i].y + pipeUp.height + gap) || posY + bird.height >= canvas.height - fg.height
        ) {
            location.reload(); //перезагрузка страницы
        }

        if (pipe[i].x == 5) {
            score++
            score_audio.play()

        }
    }

    posY += grav

    context.fillText("score: " + score, 10, canvas.height - 20)
    context.fillStyle = '#000'
    context.font = '24px Verdana'

    requestAnimationFrame(draw)
}
pipeBottom.onload = draw;