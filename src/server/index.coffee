WebSocket = require 'ws'
config = require '../config'
Player = require '../player'
tick = require './tick'
randomColor = require '../randomColor'
generatePlayerPosition = require './generatePlayerPosition'
server = new WebSocket.Server { port: config.port }
players = []
playerId = -1

colors = [['#27282E', '#09060C'], ['#BCB9B4', '#48433E']]

console.log "Starting server on ws://#{config.host}:#{config.port}"

# tick
setInterval ->
  tick players
, 30 # 15 ms is ~66.666... ticks per second

server.on 'connection', (socket) ->
  playerId += 1

  p = new Player playerId,
                 socket,
                 generatePlayerPosition(players).x,
                 generatePlayerPosition(players).y,
                 config.startRadius,
                 colors[playerId % 2][0],
                 colors[playerId % 2][1]

  players.push p

  console.log "New player \##{p.id}."

  # tell client about his id and other players
  socket.send "~#{p.id}"

  for i in players
    socket.send "+#{i.id},#{i.x},#{i.y},#{~~(i.r)},#{i.fill},#{i.stroke}"

  socket.on 'close', =>
    i = players.indexOf p

    if i > -1
      players.splice i, 1

    # tell other clients about disconnect
    server.clients.forEach (client) =>
      if client isnt socket and client.readyState is WebSocket.OPEN
        client.send "-#{p.id}"

    console.log "Player \##{p.id} disconnected."

  socket.on 'error', =>
    i = players.indexOf p

    if i > -1
      players.splice i, 1

    # tell other clients about disconnect
    server.clients.forEach (client) =>
      if client isnt socket and client.readyState is WebSocket.OPEN
        client.send "-#{p.id}"

    console.log "Player \##{p.id} disconnected with error."

  socket.on 'message', (data) =>
    p.r += config.progress

    server.clients.forEach (client) =>
      # if client isnt socket and client.readyState is WebSocket.OPEN
      if client.readyState is WebSocket.OPEN
        client.send p.id

  # tell other clients about new client
  server.clients.forEach (client) =>
    if client isnt socket and client.readyState is WebSocket.OPEN
      client.send "+#{p.id},#{p.x},#{p.y},#{~~(i.r)},#{p.fill},#{p.stroke}"