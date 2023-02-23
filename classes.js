//load images
//background
const image = new Image()
image.src = './images/gameMap.png'
ctx.drawImage(image, 0, 0)
//playerDown 
const playerDownImage = new Image()
playerDownImage.src = './images/player/playerDown.png'


//sprite classe
class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image 
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.drawImage(playerDownImage, 0, 0, playerDownImage.width/4, playerDownImage.height, canvas.width/2 - playerDownImage.width/2, canvas.height/2 - playerDownImage.height/4, playerDownImage.width/4, playerDownImage.height)
    }
}

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
        ctx.fillStyle = 'red'
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





//movables object for animate in app.js 
const movables = [background, testBoundary]