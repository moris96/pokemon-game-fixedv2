
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


// gsap.to('#overlapping-div', {
//     opacity: 1,
//     repeat: 3,
//     yoyo: true,
//     duration: 0.4
// })


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


const battle = {
    initiated: false 
}




/////////////////////////////////////////////////////////////////////////////////////// ANIMATE GAME //////////////////////////////////////////////////////////////////////////////////

function animate(){
    const animationID = window.requestAnimationFrame(animate)

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

    let moving = true 
    player.animate = false 

    if(battle.initiated) return 

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
                console.log('activate battle')
                //deactivate current animation loop 
                window.cancelAnimationFrame(animationID)
                battle.initiated = true 
                gsap.to('#overlapping-div', {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete(){
                        gsap.to('#overlapping-div', {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                //activate new animation loop
                                animateBattle()
                                gsap.to('#overlapping-div', {
                                    opacity: 0,
                                    duration: 0.4
                                })
                            }
                        })
                    }
                })
                break 
            }
        }
    }

    

    // ctx.drawImage(playerDownImage, 0, 0, playerDownImage.width/4, playerDownImage.height, canvas.width/2 - playerDownImage.width/2, canvas.height/2 - playerDownImage.height/4, playerDownImage.width/4, playerDownImage.height)


    //player mobility 
    if(keys.w.pressed && lastKey==='w'){
        player.animate = true 
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
        player.animate = true 
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
        player.animate = true 
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
    player.animate = true 
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


// // const renderedSprites = []
// function animateBattle(){
//     window.requestAnimationFrame(animateBattle)
//     battleBackground.draw()
//     elon.draw()
//     charizard.draw()

//     renderedSprites.forEach((sprite) => {
//         sprite.draw()
//     })
// };

// // animate()
// animateBattle()












// document.querySelectorAll('button').forEach((button) => {
//     button.addEventListener('click', () => {
//         charizard.attack({
//             attack: {
//                 name: 'Slash',
//                 damage: 10,
//                 type: 'Normal'
//             },
//             recipient: elon
//         })
//     })
// })

