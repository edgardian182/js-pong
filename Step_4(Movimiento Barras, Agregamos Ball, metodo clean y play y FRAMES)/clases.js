/* PING PONG
Objetos:
  Board => width, height
  BoardView => canvas, board
  Barras => x,y,width,height,content_object
  Ball => x,y,

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
      var elements = this.bars.map(function(n){return n}); //AGREGADO --> Pasamos el arreglo como copia y no como referencia para evitar BUGS
      elements.push(this.ball);
      return elements;
    }
  }
})();


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

    this.speed = 10;
  }

  self.Bar.prototype = {

    down: function(){
      this.y += this.speed;
    },
    up: function(){
      this.y -= this.speed;
    },

    // toString es un metodo que al definirlo en un objeto se aplica cada vez que se convierta o se aplique una conversión a string en el objeto. Ej: "" + bar
    toString: function(){
      // En que coordenadas estan
      return "x: " + this.x + "y: " + this.y;
    }

  }
})();


// ******************** AGREGADO *********************
// Clase BALL

(function(){

  self.Ball = function(x,y,radius,board){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.board = board;

    this.speed_y = 0;
    this.speed_x = 3;

    board.ball = this;
    this.kind = "circle";

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


  self.BoardView.prototype = {
    draw: function(){
      for (var i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];

        draw(this.ctx, el);
      };
    },

    // ******************** AGREGADO *********************
    // Dibuja un rectangulo en el canvas para limpiar el lienzo o board y dejarlo listo para el siguiente dibujo del frame
    clean: function(){
      this.ctx.clearRect(0,0,this.board.width,this.board.height)
    },

    // El juego se mantiene a partir de ese objeto y este metodo
    play: function(){
      this.clean();
      this.draw();

    }
    // ******************** AGREGADO FIN *******************

  }


  // Helper method: No pertenecen al scope del objeto pero ayudan a realizar ciertas cosas

  // Funcion usada para dibujar el elemento de acuerdo al KIND que tenga definido. Ej: objeto bar tendra bar.kind = "rectangle"
  function draw(ctx,element){
    // Como ball no se ha definido y tiene un valor actual de null es necesario este condicional

      switch(element.kind) {
        case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;

        // *************** AGREGADO ******************

        case "circle":
        ctx.arc(element.x,element.y,element.radius,0,7);
        ctx.fill();
        ctx.closePath();
        break;
      }

  }
})();