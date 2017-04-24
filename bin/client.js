(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var config, e;

config = require('../config');

e = document.getElementsByTagName('canvas')[0];

e.width = config.width;

e.height = config.height;

module.exports = e.getContext('2d');


},{"../config":6}],2:[function(require,module,exports){
var canvas, circle, config;

config = require('../config');

canvas = require('./canvas');

circle = function(x, y, r, f, s) {
  canvas.beginPath();
  canvas.arc(x, y, r, 0, 2 * Math.PI, false);
  canvas.fillStyle = f;
  canvas.fill();
  canvas.lineWidth = 2;
  canvas.strokeStyle = s;
  return canvas.stroke();
};

module.exports = circle;


},{"../config":6,"./canvas":1}],3:[function(require,module,exports){
var canvas, circle, config, render;

config = require('../config');

canvas = require('./canvas');

render = require('./render');

circle = require('./circle');

setTimeout(function() {
  var net;
  return net = require('./net')(function() {
    document.getElementById('start').style.display = 'none';
    window.onkeyup = function(e) {
      return net.socket.send(window.myId);
    };
    return setInterval(render, 15);
  });
}, 4000);

window.players = [];


},{"../config":6,"./canvas":1,"./circle":2,"./net":4,"./render":5}],4:[function(require,module,exports){
var Player, config, net;

config = require('../config');

Player = require('../player');

net = {
  socket: new WebSocket("ws://" + config.host + ":" + config.port)
};

net.socket.onmessage = function(e) {
  var data, i, j, k, len, len1, p, ref, ref1, results, results1;
  if (e.data[0] === '+') {
    data = e.data.substring(1).split(',');
    console.log(e.data);
    return window.players.push(new Player(data[0], null, data[1], data[2], data[3], data[4], data[5]));
  } else if (e.data[0] === '-') {
    ref = window.players;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      p = ref[j];
      if (p !== void 0) {
        if (p.id === e.data.substring(1)) {
          i = window.players.indexOf(p);
          results.push(window.players.splice(i, 1));
        } else {
          results.push(void 0);
        }
      } else {
        results.push(void 0);
      }
    }
    return results;
  } else if (e.data[0] === '~') {
    return window.myId = e.data.substring(1);
  } else if (e.data[0] === '#') {
    return setTimeout(function() {
      return document.getElementById('fail').style.display = 'block';
    }, 1000);
  } else if (e.data[0] === '!') {
    return setTimeout(function() {
      return document.getElementById('win').style.display = 'block';
    }, 1000);
  } else {
    ref1 = window.players;
    results1 = [];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      p = ref1[k];
      if (p !== void 0) {
        if (p.id === e.data) {
          results1.push(p.r += config.progress);
        } else {
          results1.push(void 0);
        }
      } else {
        results1.push(void 0);
      }
    }
    return results1;
  }
};

net.socket.onclose = function(e) {
  if (!e.wasClean) {
    return console.log(e);
  }
};

net.socket.onerror = function(e) {
  alert('Ошибка! Перезагрузи страницу (Ctrl+R)!');
  return console.log(e);
};

net.send = function(data) {
  return net.socket.send(data);
};

module.exports = function(callback) {
  if (callback) {
    net.socket.onopen = function() {
      return callback();
    };
    return net;
  } else {
    return net;
  }
};


},{"../config":6,"../player":7}],5:[function(require,module,exports){
var canvas, circle, config, render, time;

config = require('../config');

canvas = require('./canvas');

circle = require('./circle');

time = 0;

render = function() {
  var i, len, p, ref, results;
  canvas.clearRect(0, 0, config.width, config.height);
  time++;
  ref = window.players;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    p = ref[i];
    if (p !== void 0) {
      if (isNaN(p.r)) {
        p.r = config.startRadius;
      }
      p.r -= ~~(config.regress + Math.cos(time));
      if (p.r <= 0) {
        p.r = 1;
      } else if (p.r >= 1000) {
        p.r = config.startRadius;
      }
      results.push(circle(p.x, p.y, p.r, p.fill, p.stroke));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

module.exports = render;


},{"../config":6,"./canvas":1,"./circle":2}],6:[function(require,module,exports){
var config;

config = {
  width: 1024,
  height: 768,
  startRadius: 100,
  host: 'weakness-upisfree.rhcloud.com',
  port: 3000,
  progress: 1.5,
  regress: 1
};

module.exports = config;


},{}],7:[function(require,module,exports){
var Player;

Player = (function() {
  function Player(id, socket, x, y, r, fill, stroke) {
    this.id = id;
    this.socket = socket;
    this.x = x;
    this.y = y;
    this.r = r;
    this.fill = fill;
    this.stroke = stroke;
  }

  return Player;

})();

module.exports = Player;


},{}]},{},[3])