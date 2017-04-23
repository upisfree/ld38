var config, generatePlayerPosition;

config = require('../config');

generatePlayerPosition = function(players) {
  if (players.length === 0) {
    return {
      x: config.width / 8 * 3,
      y: config.height / 2
    };
  }
  if (players[0].x === 384) {
    return {
      x: config.width / 8 * 5,
      y: config.height / 2
    };
  } else {
    return {
      x: config.width / 8 * 3,
      y: config.height / 2
    };
  }
};

module.exports = generatePlayerPosition;
