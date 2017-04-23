config = require '../config'
canvas = require './canvas'
circle = require './circle'

time = 0

render = ->
  # http://stackoverflow.com/a/6722031
  canvas.clearRect 0, 0, config.width, config.height
  
  time++

  for p in window.players
    if p isnt undefined
      if isNaN p.r
        p.r = config.startRadius

      p.r -= ~~(config.regress + Math.cos(time))

      if p.r <= 0
        p.r = 1
      else if p.r >= 1000 # !!!!!!!!!!!
        p.r = config.startRadius

      circle p.x, p.y, p.r, p.fill, p.stroke

  # requestAnimationFrame render

module.exports = render