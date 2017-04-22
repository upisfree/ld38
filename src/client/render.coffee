config = require '../config'
canvas = require './canvas'
circle = require './circle'

time = 0

render = ->
  # http://stackoverflow.com/a/6722031
  canvas.clearRect 0, 0, config.width, config.height
  
  time++

  # window.playerRadius -= config.regress

  for p in window.players
    p.r -= config.regress + Math.cos(time)

    if p.r <= 0
      p.r = 1

    circle p.x, p.y, p.r, p.fill, p.stroke

  # requestAnimationFrame render

module.exports = render