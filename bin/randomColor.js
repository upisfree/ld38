var randomColor;

randomColor = function() {
  var chars, hex, length;
  length = 6;
  chars = '0123456789ABCDEF';
  hex = '#';
  while (length--) {
    hex += chars[(Math.random() * 16) | 0];
  }
  return hex;
};

module.exports = randomColor;
