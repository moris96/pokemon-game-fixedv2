//IMPORT IMAGES
//battle background 
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './images/battleBackground.png'
//elon
const elonImage = new Image()
elonImage.src = './images/pokes/elon.png'
//charizard
const charizardImage = new Image()
charizardImage.src = './images/pokes/charizard.png'


//draw battle background 
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})


//DRAW POKEMON
//elon = enemy 
const elon = new Sprite({
    position: {
        x: 670,
        y: 60
    },
    image: elonImage,
    frames: {
        max: 4,
        hold: 60 
    },
    animate: true,
    isEnemy: true 
})

//charizard = hero 
const charizard = new Sprite({
    position: {
        x: 210,
        y: 250
    },
    image: charizardImage,
    frames: {
        max: 4,
        hold: 60
    },
    animate: true 
})



////////////////////////BATTLE!!!/////////////////////////////////////////////////////////////////////////////

const renderedSprites = [elon, charizard]




document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        charizard.attack({
            attack: selectedAttack,
            recipient: elon,
            renderedSprites
        })
    })
})