//load images
//background
const image = new Image()
image.src = './images/gameMap.png'
ctx.drawImage(image, 0, 0)
//playerDown 
const playerDownImage = new Image()
playerDownImage.src = './images/player/playerDown.png'


//sprite classes 
class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image 
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: -500,
        y: -250 
    },
    image 
})