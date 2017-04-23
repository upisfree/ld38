config = require '../config'
Player = require '../player'

net =
  socket: new WebSocket "ws://#{config.host}:#{config.port}"

#       заставка + инструкция,
#       динамичность / скорость (!)


net.socket.onmessage = (e) ->
  if e.data[0] is '+' # new player
    data = e.data.substring(1).split ','

    console.log e.data

    window.players.push new Player data[0], null, data[1], data[2], data[3], data[4], data[5]
  else if e.data[0] is '-' # remove player from array
    for p in window.players
      if p isnt undefined
        if p.id is e.data.substring(1)
          i = window.players.indexOf p

          window.players.splice i, 1
  else if e.data[0] is '~'
    window.myId = e.data.substring(1)
  else if e.data[0] is '#'
    setTimeout ->
      document.getElementById('fail').style.display = 'block'
    , 1000

    # alert 'Ты проиграл! Лох!'
  else if e.data[0] is '!'
    setTimeout ->
      document.getElementById('win').style.display = 'block'
    , 1000

    # alert 'Ты победил! Красава!'
  else # onkeyup
    for p in window.players
      if p isnt undefined
        if p.id is e.data
          p.r += config.progress

net.socket.onclose = (e) ->
  if not e.wasClean
    # alert 'Что-то случилось с сервером...'
    console.log e

net.socket.onerror = (e) ->
  alert 'Ошибка! Перезагрузи страницу (Ctrl+R)!'

  console.log e

net.send = (data) ->
  net.socket.send data

module.exports = (callback) ->
  if callback
    net.socket.onopen = ->
      callback()

    return net
  else
    return net