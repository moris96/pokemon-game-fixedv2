// import { collisions } from "./collisions/collisions";

//load & draw canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576 
ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)


//collision detection 
const collisionsMap = []
for(const i=0; i<collisionsMap.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70+i))
}








const keys = {
    w: {
        pressed: false 
    },
    a: {
        pressed: false 
    },
    s: {
        pressed: false 
    },
    d: {
        pressed: false 
    }
}





//player mobility
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true 
            lastKey = 'w'
            break 
        case 'a':
            keys.a.pressed = true 
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true 
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true 
            lastKey = 'd'
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false 
            break 
        case 'a':
            keys.a.pressed = false 
            break
        case 's':
            keys.s.pressed = false 
            break
        case 'd':
            keys.d.pressed = false 
            break
    }
})





//animate game
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    ctx.drawImage(playerDownImage, 0, 0, playerDownImage.width/4, playerDownImage.height, canvas.width/2 - playerDownImage.width/2, canvas.height/2 - playerDownImage.height/4, playerDownImage.width/4, playerDownImage.height)
    
    if(keys.w.pressed && lastKey==='w') background.position.y += 3
    else if(keys.s.pressed && lastKey==='s')  background.position.y -= 3
    else if(keys.a.pressed && lastKey==='a') background.position.x += 3
    else if(keys.d.pressed && lastKey==='d') background.position.x -= 3
}
animate()