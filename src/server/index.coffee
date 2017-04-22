WebSocket = require 'ws'
config = require '../config'
Player = require '../player'
randomColor = require '../randomColor'
server = new WebSocket.Server { port: config.port }
players = []
playerId = -1

console.log "Starting server on ws://#{config.host}:#{config.port}"

# tick
setInterval ->
  if players.length isnt 0
    for p in players
      p.r -= config.regress

      console.log p.r

      if p.r <= 0
        p.socket.send '#' # player lost

, 15 # 15 ms is ~66.666... ticks per second

server.on 'connection', (socket) ->
  playerId += 1

  p = new Player playerId,
                 socket,
                 ~~(config.width * Math.random()),
                 ~~(config.height * Math.random()),
                 config.startRadius,
                 randomColor(),
                 randomColor()

  players.push p

  # tell client about his id and other players
  socket.send "~#{p.id}"

  for i in players
    socket.send "+#{i.id},#{i.x},#{i.y},#{i.fill},#{i.stroke}"

  socket.on 'close', =>
    i = players.indexOf p

    if i > -1
      players.splice i, 1

    # tell other clients about disconnect
    server.clients.forEach (client) =>
      if client isnt socket and client.readyState is WebSocket.OPEN
        client.send "-#{p.id}"

  socket.on 'error', =>
    i = players.indexOf p

    if i > -1
      players.splice i, 1

    # tell other clients about disconnect
    server.clients.forEach (client) =>
      if client isnt socket and client.readyState is WebSocket.OPEN
        client.send "-#{p.id}"

  socket.on 'message', (data) =>
    for i in players
      if i isnt undefined
        if (i.id + '') is data
          i.r += config.progress

    server.clients.forEach (client) =>
      # if client isnt socket and client.readyState is WebSocket.OPEN
      if client.readyState is WebSocket.OPEN
        client.send p.id

  # tell other clients about new client
  server.clients.forEach (client) =>
    if client isnt socket and client.readyState is WebSocket.OPEN
      client.send "+#{p.id},#{p.x},#{p.y},#{p.fill},#{p.stroke}"