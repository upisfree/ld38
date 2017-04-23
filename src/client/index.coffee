config = require '../config'
canvas = require './canvas'
render = require './render'
circle = require './circle'

setTimeout ->
  net = require('./net') ->
    document.getElementById('start').style.display = 'none'

    window.onkeyup = (e) ->
      net.socket.send window.myId

    setInterval render, 15
, 4000

window.players = []