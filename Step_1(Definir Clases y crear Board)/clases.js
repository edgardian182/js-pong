/* PING PONG
Objetos:
  Board => width, height
  BoardView => canvas, board
  Barras, Ball

*/

// Definimos las "clases" con las que crearemos los objetos de la APP

// CLASE BOARD
(function(){
  // Constructor
  self.Board = function(width, height){
    this.width = width;
    this.height = height;
    // Variables booleanas para saber si se esta jugando y si el juego ha terminado
    this.playing = false;
    this.game_over = false;
    // Elementos dentro del Board
    this.bars = [];
    this.ball = null;
  }

  // Metodos de la clase
  self.Board.prototype = {
    // Getter para obtener los elementos del Board
    get elements() {
      var elements = this.bars;
      elements.push(this.ball);
      return elements;
    }
  }
})();



// CLASE BoardView
(function(){
  // Constructor
  self.BoardView = function(canvas,board){
    this.canvas = canvas;
    this.board = board;
    // Definimos las propiedades del canvas con las del board
    this.canvas.width = board.width;
    this.canvas.height = board.height;

    this.ctx = canvas.getContext('2d');
  }
})();