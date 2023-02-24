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
    constructor({ position, image, frames = { max: 1 }, sprites }) {
        this.position = position
        this.image = image 
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
           this.width = this.image.width / this.frames.max 
           this.height = this.image.height 
        }

        this.moving = false 
        this.sprites = sprites
        
    }
    draw(){
        // ctx.drawImage(this.image, this.position.x, this.position.y)
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

            if(!this.moving) return 
            
            if(this.frames.max > 1){
                this.frames.elapsed++
            }
            
            if(this.frames.elapsed % 20 === 0){
                if(this.frames.val < this.frames.max - 1) this.frames.val++
                else this.frames.val = 0 
            }

            
    }
}

//create player
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2 
    },
    image: playerDownImage,
    frames: {
        max: 4
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