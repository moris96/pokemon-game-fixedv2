//load & draw canvas
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576 
ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)


const image = new Image()
image.src = './images/gameMap.png'
ctx.drawImage(image, 0, 0)

image.onload = () => {
    ctx.drawImage(image, -500, -250)
}