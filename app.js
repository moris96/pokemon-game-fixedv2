// import { collisions } from "./collisions/collisions"
// import { background } from "./classes"

//load & draw canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576 
ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)












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


// const movables = [background, testBoundary]


//animate game
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()

    
    //draw boundaries 
    // boundaries.forEach(boundary => {
    //     boundary.draw()
    // })

    testBoundary.draw()

    // ctx.drawImage(playerDownImage, 0, 0, playerDownImage.width/4, playerDownImage.height, canvas.width/2 - playerDownImage.width/2, canvas.height/2 - playerDownImage.height/4, playerDownImage.width/4, playerDownImage.height)

    // if(playerDownImage.position.x + playerDownImage.width)
    
    //player mobility 
    if(keys.w.pressed && lastKey==='w'){
        movables.forEach((movable) => {
            movable.position.y += 3
        })

        // background.position.y += 3
        // boundaries.position.y += 3
    } 
    else if(keys.s.pressed && lastKey==='s'){
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
        // background.position.y -= 3
        // boundaries.position.y -= 3
    }  
    else if(keys.a.pressed && lastKey==='a'){
        movables.forEach((movable) => {
            movable.position.x += 3
        })
        // background.position.x += 3
    } 
    else if(keys.d.pressed && lastKey==='d'){
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
        // background.position.x -= 3
    } 
}
animate()