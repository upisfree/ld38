var config, tick;

config = require('../config');

tick = function(players) {
  var a, b, e, i, j, len, p, results;
  if (players.length !== 0) {
    results = [];
    for (j = 0, len = players.length; j < len; j++) {
      p = players[j];
      if (p !== void 0) {
        p.r -= config.regress;
        a = players.indexOf(p);
        b = a === 0 ? 1 : 0;
        try {
          if (p.r > 256 + players[b].r / 2) {
            players[a].socket.send('!', function() {
              return players[a].socket.terminate();
            });
            players[b].socket.send('#', function() {
              return players[b].socket.terminate();
            });
            console.log("Player \#" + players[a].id + " win.");
            console.log("Player \#" + players[b].id + " lost.");
            players.splice(b, 1);
          }
        } catch (error) {
          e = error;
        }
        if (p.r <= 0 || p.r >= config.width / 8 * 3) {
          p.socket.send('#', function() {
            return p.socket.terminate();
          });
          players[b].socket.send('!', function() {
            return players[b].socket.terminate();
          });
          console.log("Player \#" + p.id + " lost.");
          i = players.indexOf(p);
          if (i > -1) {
            results.push(players.splice(i, 1));
          } else {
            results.push(void 0);
          }
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  }
};

module.exports = tick;
