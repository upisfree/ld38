config = require '../config'
canvas = require './canvas'
render = require './render'
circle = require './circle'
net = require('./net') ->
  window.onkeyup = (e) ->
    net.socket.send window.myId

  setInterval render, 15

window.players = []