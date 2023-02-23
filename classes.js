//load images
//background
const image = new Image()
image.src = './images/gameMap.png'
ctx.drawImage(image, 0, 0)
//playerDown 
const playerDownImage = new Image()
playerDownImage.src = './images/player/playerDown.png'


//sprite class
class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image 
        this.frames = frames

        this.image.onload = () => {
           this.width = this.image.width / this.frames.max 
           this.height = this.image.height 
           console.log(this.width)
           console.log(this.height)
        }
        
    }
    draw(){
        // ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.drawImage(
            this.image, 
            0, 
            0, 
            this.image.width/this.frames.max, 
            this.image.height, 
            this.position.x,
            this.position.y,            
            this.image.width/this.frames.max, 
            this.image.height
            )
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
    }
})


const background = new Sprite({
    position: {
        x: -425,
        y: -280 
    },
    image 
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//boundary class for collision detection 
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

//collision detection 
const collisionsMap = []
for(let i=0; i<collisions.length; i+=70){
    collisionsMap.push(collisions.slice(i, 70+i))
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

const testBoundary = new Boundary({
    position: {
        x: 400,
        y: 400
    }
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//movables object for animate in app.js 
const movables = [background, ...boundaries]