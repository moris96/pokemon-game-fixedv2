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
    isEnemy: true,
    name: 'Elon'
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
    animate: true,
    name: 'Charizard'
})



////////////////////////BATTLE!!!/////////////////////////////////////////////////////////////////////////////

const renderedSprites = [elon, charizard]

function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    elon.draw()
    charizard.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
};

// animate()
animateBattle()

const queue = [] 

//event listeners for attack buttons 
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        charizard.attack({
            attack: selectedAttack,
            recipient: elon,
            renderedSprites
        })

        queue.push(() => {
            elon.attack({
                attack: attacks.Flamethrower,
                recipient: charizard,
                renderedSprites
            })
        })

        queue.push(() => {
            elon.attack({
                attack: attacks.DragonPulse,
                recipient: charizard,
                renderedSprites
            })
        })
    })
})

document.querySelector('#dialouge-box').addEventListener('click', (e) => {
    if(queue.length > 0){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})