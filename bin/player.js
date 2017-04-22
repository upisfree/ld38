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
