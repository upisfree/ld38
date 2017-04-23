var Player, WebSocket, colors, config, generatePlayerPosition, playerId, players, randomColor, server, tick;

WebSocket = require('ws');

config = require('../config');

Player = require('../player');

tick = require('./tick');

randomColor = require('../randomColor');

generatePlayerPosition = require('./generatePlayerPosition');

server = new WebSocket.Server({
  port: config.port
});

players = [];

playerId = -1;

colors = [['#27282E', '#09060C'], ['#BCB9B4', '#48433E']];

console.log("Starting server on ws://" + config.host + ":" + config.port);

setInterval(function() {
  return tick(players);
}, 30);

server.on('connection', function(socket) {
  var i, j, len, p;
  playerId += 1;
  p = new Player(playerId, socket, generatePlayerPosition(players).x, generatePlayerPosition(players).y, config.startRadius, colors[playerId % 2][0], colors[playerId % 2][1]);
  players.push(p);
  console.log("New player \#" + p.id + ".");
  socket.send("~" + p.id);
  for (j = 0, len = players.length; j < len; j++) {
    i = players[j];
    socket.send("+" + i.id + "," + i.x + "," + i.y + "," + (~~i.r) + "," + i.fill + "," + i.stroke);
  }
  socket.on('close', (function(_this) {
    return function() {
      i = players.indexOf(p);
      if (i > -1) {
        players.splice(i, 1);
      }
      server.clients.forEach(function(client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          return client.send("-" + p.id);
        }
      });
      return console.log("Player \#" + p.id + " disconnected.");
    };
  })(this));
  socket.on('error', (function(_this) {
    return function() {
      i = players.indexOf(p);
      if (i > -1) {
        players.splice(i, 1);
      }
      server.clients.forEach(function(client) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          return client.send("-" + p.id);
        }
      });
      return console.log("Player \#" + p.id + " disconnected with error.");
    };
  })(this));
  socket.on('message', (function(_this) {
    return function(data) {
      p.r += config.progress;
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
        return client.send("+" + p.id + "," + p.x + "," + p.y + "," + (~~i.r) + "," + p.fill + "," + p.stroke);
      }
    };
  })(this));
});
