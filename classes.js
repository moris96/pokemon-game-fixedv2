/////////////////////////////////////////////////////////////////////////////////////// LOAD IMAGES //////////////////////////////////////////////////////////////////////////////////
//background
const image = new Image()
image.src = './images/gameMap.png'
ctx.drawImage(image, 0, 0)
//playerDown 
const playerDownImage = new Image()
playerDownImage.src = './images/player/playerDown.png'
//playerUp
const playerUpImage = new Image()
playerUpImage.src = './images/player/playerUp.png'
//playerRight
const playerRightImage = new Image()
playerRightImage.src = './images/player/playerRight.png'
//playerLeft
const playerLeftImage = new Image()
playerLeftImage.src = './images/player/playerLeft.png'


/////////////////////////////////////////////////////////////////////////////////////// SPRITE CLASS //////////////////////////////////////////////////////////////////////////////////
class Sprite {
    constructor({ position, image, frames = { max: 1, hold: 10 }, sprites, animate = false, isEnemy = false, rotation = 0, name }) {
        this.position = position
        this.image = image 
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
           this.width = this.image.width / this.frames.max 
           this.height = this.image.height 
        }

        this.animate = animate 
        this.sprites = sprites
        this.opacity = 1
        this.health = 100 
        this.isEnemy = isEnemy
        this.rotation = rotation
        this.name = name 
        
    }
    draw(){
        // ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.save()
        ctx.translate(this.position.x + this.width / 2, this.position.y + this.height / 2)
        ctx.rotate(this.rotation)
        ctx.translate(-this.position.x - this.width / 2, -this.position.y - this.height / 2)
        ctx.globalAlpha = this.opacity
        ctx.drawImage(
            this.image, 
            this.frames.val * this.width, 
            0, 
            this.image.width/this.frames.max, 
            this.image.height, 
            this.position.x,
            this.position.y,            
            this.image.width/this.frames.max, 
            this.image.height
            )
            ctx.restore()

            if(!this.animate) return 
            
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
            
            if(this.frames.elapsed % this.frames.hold === 0){
                if(this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0 
            }
    }
    attack({ attack, recipient, renderedSprites }){
        document.querySelector('#dialouge-box').style.display = 'block'
        document.querySelector('#dialouge-box').innerHTML = `${this.name} used ${attack.name}!` 

        const healthBar = this.isEnemy ? '#charizard-health2' : '#elon-health2'
        this.health -= attack.damage

        const rotation = this.isEnemy ? -2.2 : 1

        const tl = gsap.timeline() 

        const movementDistance = this.isEnemy ? -20 : 20 

        switch(attack.name){
            case 'Flamethrower':
                const flamethrowerImage = new Image()
                flamethrowerImage.src = './images/moves/flamethrower.png'
                const flamethrower = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y 
                    },
                    image: flamethrowerImage,
                    frames: {
                        max: 4,
                        hold: 30 
                    },
                    animate: true,
                    rotation 
                })

                renderedSprites.splice(1, 0, flamethrower)

                gsap.to(flamethrower.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                    //enemy gets hit
                    gsap.to(healthBar, {
                        width: `${this.health}%`
                    })
                    gsap.to(recipient.position, {
                        x: recipient.position.x + 10,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.08
                    })

                    gsap.to(recipient, {
                        opacity: 0,
                        repeat: 5,
                        yoyo: true,
                        duration: 0.08 
                    })
                        renderedSprites.splice(1, 1)
                    }
                })
                break; 

                case 'Dragon Pulse':
                const dragonPulseImage = new Image()
                dragonPulseImage.src = './images/moves/dragonpulse.png'
                const dragonPulse = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y 
                    },
                    image: dragonPulseImage,
                    frames: {
                        max: 4,
                        hold: 30 
                    },
                    animate: true,
                    rotation
                })

                renderedSprites.push(dragonPulse)

                gsap.to(dragonPulse.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    onComplete: () => {
                    //enemy gets hit
                    gsap.to(healthBar, {
                        width: `${this.health}%`
                    })
                    gsap.to(recipient.position, {
                        x: recipient.position.x + 10,
                        yoyo: true,
                        repeat: 5,
                        duration: 0.08
                    })

                    gsap.to(recipient, {
                        opacity: 0,
                        repeat: 5,
                        yoyo: true,
                        duration: 0.08 
                    })
                        renderedSprites.pop()
                    }
                })
                break; 




            case 'Slash': 
            // const tl = gsap.timeline() 

        // const movementDistance = this.isEnemy ? -20 : 20 

        tl.to(this.position, {
            x: this.position.x - movementDistance
        })
        .to(this.position.x, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
                //enemy gets hit
                gsap.to(healthBar, {
                    width: `${this.health}%`
                })
                gsap.to(recipient.position, {
                    x: recipient.position.x + 10,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.08
                })

                gsap.to(recipient, {
                    opacity: 0,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.08 
                })
            }
        })
        .to(this.position, {
            x: this.position.x 
        })
            break; 

        case 'Aerial Ace': 
        tl.to(this.position, {
            x: this.position.x - movementDistance
        })
        .to(this.position.x, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
                //enemy gets hit
                gsap.to(healthBar, {
                    width: `${this.health}%`
                })
                gsap.to(recipient.position, {
                    x: recipient.position.x + 10,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.08
                })

                gsap.to(recipient, {
                    opacity: 0,
                    repeat: 5,
                    yoyo: true,
                    duration: 0.08 
                })
            }
        })
        .to(this.position, {
            x: this.position.x 
        })
            break; 




        }

        
    }
};


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







//create player
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2 
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 15
    },
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    }
})




const background = new Sprite({
    position: {
        x: -425,
        y: -280 
    },
    image 
})







/////////////////////////////////////////////////////////////////////////////////////// BOUNDARY CLASS ////////////////////////////////////////////////////////////////////////////////
//boundary class for collision detection && battle zones 
class Boundary {
    static width = 48
    static height = 48 
    constructor({ position }){
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw(){
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//collision detection functionality for collisions && battle zones 
const collisionsMap = []
for(let i=0; i<collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70+i))
}

const battleZonesMap = []
for(let i=0; i<battleZonesData.length; i+=70){
    battleZonesMap.push(battleZonesData.slice(i, 70+i))
}

const boundaries = []
const offset = {
    x: -425,
    y: -280
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

const battleZones = []
battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025)
        battleZones.push(
            new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            })
        )
    })
})






// const testBoundary = new Boundary({
//     position: {
//         x: 400,
//         y: 400
//     }
// })






/////////////////////////////////////////////////////////////////////////////////////// MOVABLES ARR //////////////////////////////////////////////////////////////////////////////////
//movables object for animate in app.js 
const movables = [background, ...boundaries, ...battleZones]







// const renderedSprites = []




// document.querySelectorAll('button').forEach((button) => {
//     button.addEventListener('click', (e) => {
//         const selectedAttack = attacks[e.currentTarget.innerHTML]
//         charizard.attack({
//             attack: selectedAttack,
//             recipient: elon,
//             renderedSprites
//         })
//     })
// })