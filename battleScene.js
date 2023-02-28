//IMPORT IMAGES
//battle background 
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './images/battleBackground.png'

const elonImage = new Image()
elonImage.src = './images/pokes/elon.png'
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


// DRAW POKEMON
const elon = new Monster({
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
    name: 'Elon',
    attacks: [attacks.Flamethrower, attacks.DragonPulse, attacks.AerialAce, attacks.Slash]
})

const charizard = new Monster({
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
    name: 'Charizard',
    attacks: [attacks.Flamethrower, attacks.DragonPulse, attacks.AerialAce, attacks.Slash]
})



////////////////////////BATTLE!!!/////////////////////////////////////////////////////////////////////////////


const renderedSprites = [elon, charizard]

charizard.attacks.forEach((attack) => {
    const button = document.createElement('button')
    button.innerHTML = attack.name 
    document.querySelector('#attacks-box').append(button)
})

function animateBattle(){
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    elon.draw()
    charizard.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
};
animateBattle()

const queue = [] 

//event listeners for attack buttons 
document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (e) => {
        //charizard attacks!
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        charizard.attack({
            attack: selectedAttack,
            recipient: elon,
            renderedSprites
        })

        //elon faints 
        if(elon.health <= 0){
            queue.push(() => {
                elon.faint()
        })
        }
        //elon attacks!
        const randomAttack = elon.attacks[Math.floor(Math.random() * elon.attacks.length)]
        queue.push(() => {
            elon.attack({
                attack: randomAttack,
                recipient: charizard,
                renderedSprites
            })
        })

        //charizard faints 
        if(charizard.health <= 0){
            queue.push(() => {
                charizard.faint()
        })
        }

    })

    button.addEventListener('mouseenter', (e) => {
        const selectedAttack = attacks[e.currentTarget.innerHTML]
        document.querySelector('#attack-type-text').innerHTML = selectedAttack.type 
        document.querySelector('#attack-type-text').style.color = selectedAttack.color
    })
})

document.querySelector('#dialouge-box').addEventListener('click', (e) => {
    if(queue.length > 0){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})