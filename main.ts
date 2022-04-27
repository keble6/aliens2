// move the defender
input.onButtonPressed(Button.A, function () {
    defender.move(1)
    defender.ifOnEdgeBounce()
})
// launch a missile at the alien
input.onButtonPressed(Button.B, function () {
    // missile moves from defender x position
    missile = game.createSprite(defender.get(LedSpriteProperty.X), 4)
    missileActive = true
    missile.set(LedSpriteProperty.Blink, 1)
    // set direction to up
    missile.set(LedSpriteProperty.Direction, 0)
})
let bomb: game.LedSprite = null
let missileActive = false
let missile: game.LedSprite = null
let defender: game.LedSprite = null
// alien moves across the top of screen
let alien = game.createSprite(0, 0)
let alienDelay = 1000
let bombDelay = 500
// defender moves across the bottom of screen
defender = game.createSprite(0, 4)
let missileDelay = 200
game.setScore(0)
basic.forever(function () {
    basic.pause(alienDelay)
    alien.move(1)
    alien.ifOnEdgeBounce()
    // The alien drops a bomb at random
    if (Math.randomBoolean()) {
        bomb = game.createSprite(alien.get(LedSpriteProperty.X), 1)
        alien.set(LedSpriteProperty.Blink, 1)
        for (let index = 0; index < 4; index++) {
            basic.pause(bombDelay)
            bomb.change(LedSpriteProperty.Y, 1)
        }
        // Does the bomb hit the defender?
        if (bomb.isTouching(defender)) {
            basic.showIcon(IconNames.No)
        }
        bomb.delete()
        alien.set(LedSpriteProperty.Blink, 0)
    }
    // Is the missile active?
    if (missileActive) {
        basic.pause(missileDelay)
        // Launch the missile
        for (let index = 0; index < 4; index++) {
            missile.move(1)
            basic.pause(missileDelay)
        }
        // Has the missile hit the alien?
        if (missile.isTouching(alien)) {
            basic.showIcon(IconNames.Butterfly)
            missile.delete()
        }
        missileActive = false
        missile.delete()
    }
})
