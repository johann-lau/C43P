var iss_, spacebg_, spacecraft_, spacecraftl_, spacecraftr_, spacecraftlr_
var iss, craft, square
var docked, speed, brake

function preload() {
  iss_ = loadImage("assets/iss.png")
  spacebg_ = loadImage("assets/spacebg.jpg")
  spacecraft_ = loadImage("assets/spacecraft.png")
  spacecraftl_ = loadImage("assets/spacecraftl.png")
  spacecraftr_ = loadImage("assets/spacecraftr.png")
  spacecraftlr_ = loadImage("assets/spacecraftlr.png")
}

function setup() {
  createCanvas(939, 615);
  docked = false
  brake = true
  speed = 0
  textAlign(CENTER)
  fill(255)
  textSize(20)

  iss = createSprite(450, 260, 0, 0);
  iss.addImage(iss_)
  craft = createSprite(random(300, 600), random(480, 520), 0, 0);
  craft.addImage("n", spacecraft_)
  craft.addImage("l", spacecraftl_)
  craft.addImage("r", spacecraftr_)
  craft.addImage("m", spacecraftlr_)
  craft.scale = 0.3

  square = createSprite(380, 280, 60, 60);
  square.visible = false
}

function draw() {
  background(0);
  image(spacebg_, 0, 0, 939, 615)
  drawSprites();

  if (brake) {
    speed = 0
    text("Handbrake on | press SPACE to disable", 469, 570)
  }

  craft.setSpeed(speed, craft.rotation-90)

  if (!docked) {
    if (keyDown(LEFT)) {
      craft.changeImage("r")
      craft.rotation -= 1.2
    }

    if (keyDown(RIGHT)) {
      craft.changeImage("l")
      craft.rotation += 1.2
    }

    if (keyDown(40)) {
      if (speed >= 0.15) {
        speed -= 0.075
      }
      craft.changeImage("m")
    }

    if (keyWentDown(32) && (speed <= 0.15 || brake)) {
      brake = !brake
    }

    if (keyDown(38)) {
      speed += 0.15
    }

    if (craft.overlap(square) && speed == 0) {
      docked = true
    }
  } else {
    text("Successfully docked the spacecraft!", 469, 540)
  }
}