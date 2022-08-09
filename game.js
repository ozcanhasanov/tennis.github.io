const cvs = document.getElementById('game')
const ctx = cvs.getContext('2d')

// oyun sahesi (yeniki duzbucaqli sahe)
const drawRect = (x,y,w,h,color) => {         
    ctx.fillStyle = color
    ctx.fillRect(x,y,w,h)
}
// top (ball)
const drawCircleF = (x,y,r,color) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x,y,r,0,2 * Math.PI,false)
    ctx.closePath()
    ctx.fill()
}
//oyun sahesinin artasindaki cevre
const drawCircleS = (x,y,r,w,color) => {
    ctx.strokeStyle = color
    ctx.lineWidth = w
    ctx.beginPath()
    ctx.arc(x,y,r,0,2 * Math.PI,false)
    ctx.closePath()
    ctx.stroke()
}
// xal tablosu (yazi)
const drawText = (text,x,y,color) => {
    ctx.fillStyle = color
    ctx.font = "50px sans-serif"
    ctx.fillText(text,x,y)
}
// xal tablosu (user)
const user = {
    x: 20,
    y: cvs.height/2 -50,
    w: 10,
    h: 100,
    color: '#fff',
    score: 0
}
// xal tablosu (bot)
const comp = {
    x: cvs.width - 30,
    y: cvs.height/2 -50,
    w: 10,
    h: 100,
    color: '#fff',
    score: 0
}
// top (ball)
const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    r: 13,
    color: '#a51890',
    speed: 5,
    velocityX: 3,
    velocityY: 4,
    stop: true
}

const movePaddle = (e) => {
    let rect = cvs.getBoundingClientRect()
    user.y = e.clientY - rect.top - user.h/2
    ball.stop = false
}

cvs.addEventListener('mousemove',movePaddle)

const collision = (b,p) => {
    b.top = b.y - b.r
    b.bottom = b.y + b.r
    b.left = b.x - b.r
    b.right = b.x + b.r

    p.top = p.y
    p.bottom = p.y + p.h
    p.left = p.x
    p.right = p.x + p.w

    return(b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left)
}

const resetBall = () => {
    ball.x = cvs.width/2
    ball.y = cvs.height/2


    ball.speed = 5
    ball.velocityX = 3
    ball.velocityY = 4
    ball.stop = true
}

// topa suret veririk ve botumuzu topu tutacaq sekilde nizamlayiriq
const update = () => {
    if(!ball.stop){
        ball.x += ball.velocityX
        ball.y += ball.velocityY
    }

    if(ball.y + ball.r > cvs.height || ball.y - ball.r < 0)
       ball.velocityY = -ball.velocityY

       let compLvl = 0.09
       comp.y += (ball.y - (comp.y + comp.h/2)) * compLvl

       let player = (ball.x < cvs.width/2) ? user : comp
       if(collision(ball,player)){
        let intersectY = ball.y - (player.y + player.h/2)
        intersectY /= player.h/2
        
        let maxBounceRate = Math.PI / 3
        let bounceAngle = intersectY * maxBounceRate

        let direction = (ball.x < cvs.width/2) ? 1 : -1
        
        ball.velocityX = direction * ball.speed * Math.cos(bounceAngle)
        ball.velocityX = ball.speed * Math.sin(bounceAngle)

        ball.speed += 2
    }

    if(ball.x > cvs.width){
        user.score++
        resetBall()
    }else if(ball.x < 0) {
        comp.score++ 
        resetBall()
    }
          
}
// oyun sahesindeki xetler ve cevreler
const render = () => {
    drawRect(0,0,cvs.width,cvs.height,'#008374')
    drawRect(cvs.width/2 - 2,0, 4,cvs.height,'#fff')
    drawCircleF(cvs.width/2,cvs.height/2,8,"#fff")
    drawCircleS(cvs.width/2,cvs.height/2,50,4,'#fff')
    drawText(user.score,cvs.width/4,100,'#fff')
    drawText(comp.score,cvs.width/4 * 3,100,'#fff')

    drawRect(user.x,user.y,user.w,user.h,user.color)
    drawRect(comp.x,comp.y,comp.w,comp.h,comp.color)
    drawCircleF(ball.x,ball.y,ball.r,ball.color)
}

const game = () => {
    update()
    render()
}


const fps = 70
setInterval(game,1000/fps)
























































