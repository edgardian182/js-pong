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


// ******************** AGREGADO *********************
// Clase para Bars
(function(){
  // La Barra debe tener una posicion (x,y), dimesiones (width,height) y donde va a crearse (board)
  self.Bar = function(x,y,width,height,board){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;

    // Mandamos a la propiedad .bars de Board a guardar la instancia del objeto que crearemos con esta Clase.
    this.board.bars.push(this);

    // Variable para saber como dibujar este objeto
    this.kind = "rectangle";
  }

  self.Bar.prototype = {
    down: function(){

    },
    up: function(){

    }
  }
})();

// ******************** AGREGADO FIN *********************




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

  // ******************** AGREGADO *********************

  self.BoardView.prototype = {
    draw: function(){
      for (var i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];

        draw(this.ctx, el);
      };
    }
  }



  // Helper method: No pertenecen al scope del objeto pero ayudan a realizar ciertas cosas

  // Funcion usada para dibujar el elemento de acuerdo al KIND que tenga definido. Ej: objeto bar tendra bar.kind = "rectangle"
  function draw(ctx,element){
    // Como ball no se ha definido y tiene un valor actual de null es necesario este condicional
    if(element !== null && element.hasOwnProperty("kind")) {
      switch(element.kind) {
        case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;
      }
    }
  }

  // ******************** AGREGADO FIN *********************


})();