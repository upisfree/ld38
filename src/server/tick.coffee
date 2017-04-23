config = require '../config'

tick = (players) ->
  if players.length isnt 0
    for p in players
      if p isnt undefined
        p.r -= config.regress

        # checking for two players
        a = players.indexOf p # index of this player
        b = if a is 0 then 1 else 0

        try
          if p.r > 256 + players[b].r / 2
            players[a].socket.send '!', -> # another player win
              players[a].socket.terminate()

            players[b].socket.send '#', -> # player lost
              players[b].socket.terminate()

            console.log "Player \##{players[a].id} win."
            console.log "Player \##{players[b].id} lost."

            players.splice b, 1
        catch e

        if p.r <= 0 or p.r >= config.width / 8 * 3 # 384 (border)
          p.socket.send '#', -> # player lost
            p.socket.terminate()

          players[b].socket.send '!', -> # player win
            players[b].socket.terminate()

          console.log "Player \##{p.id} lost."

          i = players.indexOf p

          if i > -1
            players.splice i, 1

module.exports = tick