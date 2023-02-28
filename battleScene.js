//IMPORT IMAGES
//battle background 
const battleBackgroundImage = new Image()
battleBackgroundImage.src = './images/battleBackground.png'

// const elonImage = new Image()
// elonImage.src = './images/pokes/elon.png'
// const charizardImage = new Image()
// charizardImage.src = './images/pokes/charizard.png'


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
    // image: elonImage,
    image: {
        src: './images/pokes/elon.png'
    },
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
    // image: elonImage,
    image: {
        src: './images/pokes/charizard.png'
    },
    frames: {
        max: 4,
        hold: 60
    },
    animate: true,
    name: 'Charizard',
    attacks: [attacks.Flamethrower, attacks.DragonPulse, attacks.AerialAce, attacks.Slash]
})



////////////////////////BATTLE!!!/////////////////////////////////////////////////////////////////////////////


// const renderedSprites = [elon, charizard]
let renderedSprites
let battleAnimationId 
let queue 


function initBattle(){
    document.querySelector('#user-interface').style.display = 'block'
    document.querySelector('#dialouge-box').style.display = 'none'
    document.querySelector('#elon-health2').style.width = '100%'
    document.querySelector('#charizard-health2').style.width = '100%'
    document.querySelector('#attacks-box').replaceChildren()
    

    
    charizard.draw()
    elon.draw()
    renderedSprites = [elon, charizard]
    queue = [] 

    charizard.attacks.forEach((attack) => {
        const button = document.createElement('button')
        button.innerHTML = attack.name 
        document.querySelector('#attacks-box').append(button)
    })

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
                queue.push(() => {
                    //fade back to black 
                    gsap.to('#overlapping-div', {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector('#user-interface').style.display = 'none'

                            gsap.to('#overlapping-div', {
                                opacity: 0 
                            })

                            battle.initiated = false 
                        }
                    })
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
                gsap.to('#overlapping-div', {
                    opacity: 1,
                    onComplete: () => {
                        cancelAnimationFrame(battleAnimationId)
                        animate()
                        document.querySelector('#user-interface').style.display = 'none'

                        gsap.to('#overlapping-div', {
                            opacity: 0 
                        })

                        battle.initiated = false 
                    }
                })
            }

        })

        button.addEventListener('mouseenter', (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            document.querySelector('#attack-type-text').innerHTML = selectedAttack.type 
            document.querySelector('#attack-type-text').style.color = selectedAttack.color
        })
    })
};





function animateBattle(){
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    elon.draw()
    charizard.draw()

    renderedSprites.forEach((sprite) => {
        sprite.draw()
    })
};

animate()
// initBattle()
// animateBattle()



document.querySelector('#dialouge-box').addEventListener('click', (e) => {
    if(queue.length > 0){
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = 'none'
})