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





function rectangularCollision({rectangle1, rectangle2}){
    return(rectangle1.position.x + rectangle1.width >= rectangle2.position.x 
        && rectangle1.position.x <= rectangle2.position.x + rectangle2.width 
        && rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        && rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}





//animate game
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()

    
    // draw boundaries 
    boundaries.forEach(boundary => {
        boundary.draw()


    })

    player.draw()

    

    // ctx.drawImage(playerDownImage, 0, 0, playerDownImage.width/4, playerDownImage.height, canvas.width/2 - playerDownImage.width/2, canvas.height/2 - playerDownImage.height/4, playerDownImage.width/4, playerDownImage.height)


    let moving = true 
    //player mobility 
    if(keys.w.pressed && lastKey==='w'){
        for (const boundary of boundaries) {
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                }
                })
            ) {
                console.log('colliding up')
                moving = false 
                break 
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })

        // background.position.y += 3
        // boundaries.position.y += 3
    } 
    else if(keys.s.pressed && lastKey==='s'){
        for (const boundary of boundaries) {
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                }
                })
            ) {
                console.log('colliding down')
                moving = false 
                break 
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
        // background.position.y -= 3
        // boundaries.position.y -= 3
    }  
    else if(keys.a.pressed && lastKey==='a'){
        for (const boundary of boundaries) {
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y 
                    }
                }
                })
            ) {
                console.log('colliding left')
                moving = false 
                break 
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x += 3
        })
        // background.position.x += 3
    } 
    else if(keys.d.pressed && lastKey==='d'){
        for (const boundary of boundaries) {
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y 
                    }
                }
                })
            ) {
                console.log('colliding right')
                moving = false 
                break 
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
        // background.position.x -= 3
    } 
}
animate()