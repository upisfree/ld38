var Player, WebSocket, config, playerId, players, randomColor, server;

WebSocket = require('ws');

config = require('../config');

Player = require('../player');

randomColor = require('../randomColor');

server = new WebSocket.Server({
  port: config.port
});

players = [];

playerId = -1;

console.log("Starting server on ws://" + config.host + ":" + config.port);

setInterval(function() {
  var j, len, p, results;
  if (players.length !== 0) {
    results = [];
    for (j = 0, len = players.length; j < len; j++) {
      p = players[j];
      p.r -= config.regress;
      console.log(p.r);
      if (p.r <= 0) {
        results.push(p.socket.send('#'));
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
}, 15);

server.on('connection', function(socket) {
  var i, j, len, p;
  playerId += 1;
  p = new Player(playerId, socket, ~~(config.width * Math.random()), ~~(config.height * Math.random()), config.startRadius, randomColor(), randomColor());
  players.push(p);
  socket.send("~" + p.id);
  for (j = 0, len = players.length; j < len; j++) {
    i = players[j];
    socket.send("+" + i.id + "," + i.x + "," + i.y + "," + i.fill + "," + i.stroke);
  }
  socket.on('close', (function(_this) {
    return function() {
      i = players.indexOf(p);
      if (i > -1) {
        players.splice(i, 1);
      }
      return server.clients.forEach(function(client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          return client.send("-" + p.id);
        }
      });
    };
  })(this));
  socket.on('error', (function(_this) {
    return function() {
      i = players.indexOf(p);
      if (i > -1) {
        players.splice(i, 1);
      }
      return server.clients.forEach(function(client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          return client.send("-" + p.id);
        }
      });
    };
  })(this));
  socket.on('message', (function(_this) {
    return function(data) {
      var k, len1;
      for (k = 0, len1 = players.length; k < len1; k++) {
        i = players[k];
        if (i !== void 0) {
          if ((i.id + '') === data) {
            i.r += config.progress;
          }
        }
      }
      return server.clients.forEach(function(client) {
        if (client.readyState === WebSocket.OPEN) {
          return client.send(p.id);
        }
      });
    };
  })(this));
  return server.clients.forEach((function(_this) {
    return function(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        return client.send("+" + p.id + "," + p.x + "," + p.y + "," + p.fill + "," + p.stroke);
      }
    };
  })(this));
});
