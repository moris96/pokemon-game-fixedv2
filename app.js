// import { collisions } from "./collisions/collisions"
// import { background } from "./classes"

//load & draw canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576 
ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)



// const battleZonesMap = []
// for(let i=0; i<battleZones.length; i+=70){
//     battleZonesMap.push(battleZones.slice(i, 70+i))
// }
// console.log(battleZonesMap)









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





/////////////////////////////////////////////////////////////////////////////////////// ANIMATE GAME //////////////////////////////////////////////////////////////////////////////////



//animate game
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()

    
    //draw boundaries 
    boundaries.forEach(boundary => {
        boundary.draw()
    })

    //draw battle zones 
    battleZones.forEach((battleZone) => {
        battleZone.draw()
    })


    player.draw()

    if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
        for (const battleZone of battleZones) {
            const overlappingArea = (Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) - Math.max(player.position.x, battleZone.position.x)) * Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) - Math.max(player.position.y, battleZone.position.y)
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: battleZone
                }) && 
                overlappingArea > (player.width * player.height) / 2
                && Math.random() < 0.001
            ) {
                console.log('battle zone collision')
                break 
            }
        }
    }

    

    // ctx.drawImage(playerDownImage, 0, 0, playerDownImage.width/4, playerDownImage.height, canvas.width/2 - playerDownImage.width/2, canvas.height/2 - playerDownImage.height/4, playerDownImage.width/4, playerDownImage.height)


    let moving = true 
    player.moving = false 
    //player mobility 
    if(keys.w.pressed && lastKey==='w'){
        player.moving = true 
        player.image = player.sprites.up
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
                // console.log('colliding up')
                moving = false 
                break 
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y += 3
        })
        return;
    } 
    if(keys.s.pressed && lastKey==='s'){
        player.moving = true 
        player.image = player.sprites.down
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
                // console.log('colliding down')
                moving = false 
                break 
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
        return;
    } 
    if(keys.a.pressed && lastKey==='a'){
        player.moving = true 
        player.image = player.sprites.left 
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
                // console.log('colliding left')
                moving = false 
                break 
            }
        }
        if(moving)
        movables.forEach((movable) => {
            movable.position.x += 3
        })
        return;
    } 
    if(!(keys.d.pressed && lastKey==='d')){
        return;
    } 
    player.moving = true 
    player.image = player.sprites.right
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
            // console.log('colliding right')
            moving = false 
            break 
        }
    }
    if(moving)
    movables.forEach((movable) => {
        movable.position.x -= 3
    }) 
    return;
}
animate()


