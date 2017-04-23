config = require '../config'
canvas = require './canvas'

circle = (x, y, r, f, s) ->
  canvas.beginPath();
  canvas.arc x, y, r, 0, 2 * Math.PI, false
  canvas.fillStyle = f
  canvas.fill()
  canvas.lineWidth = 2
  canvas.strokeStyle = s
  canvas.stroke()

module.exports = circle