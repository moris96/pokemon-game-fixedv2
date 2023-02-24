//import battle background image 
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './images/battleBackground.png'

const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})