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

    this.playing = false;
  }

  // Metodos de la clase
  self.Board.prototype = {
    // Getter para obtener los elementos del Board
    get elements() {
      var elements = this.bars.map(function(n){return n;});
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

// Clase BALL

(function(){

  self.Ball = function(x,y,radius,board){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.board = board;

    this.speed_y = 0;
    this.speed_x = 3;

    this.direction = 1;
    this.bounce_angle = 0;
    this.max_bounce_angle = Math.PI/12;
    this.speed = 3; //Es para el calculo de colisiones

    board.ball = this;
    this.kind = "circle";
  };

  self.Ball.prototype = {
    move: function(){
      this.x += (this.speed_x * this.direction);
      this.y += (this.speed_y);
    },

    // ******************** AGREGADO *********************
    get width(){
      return this.radius * 2;
    },

    get height(){
      return this.radius * 2;
    },



    // Reacciona a la colision con una Barra que recibe como parametro
    collision: function(bar){
      //

      var relative_intersect_y = ( bar.y + (bar.height / 2) ) - this.y;

      var normalized_intersect_y = relative_intersect_y / (bar.height / 2);

      this.bounce_angle = normalized_intersect_y * this.max_bounce_angle;
      console.log(this.bounce_angle);
      this.speed_y = this.speed * -Math.sin(this.bounce_angle);
      this.speed_x = this.speed * Math.cos(this.bounce_angle);

      if(this.x > (this.board.width / 2)) this.direction = -1;
      else this.direction = 1;

    }
    // ******************** AGREGADO FIN *******************

  };

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


  self.BoardView.prototype = {
    draw: function(){
      for (var i = this.board.elements.length - 1; i >= 0; i--) {
        var el = this.board.elements[i];

        draw(this.ctx, el);
      };
    },

    // Dibuja un rectangulo en el canvas para limpiar el lienzo o board y dejarlo listo para el siguiente dibujo del frame
    clean: function(){
      this.ctx.clearRect(0,0,this.board.width,this.board.height);
    },

    // ******************** AGREGADO *********************
    check_collisions: function(){
      for (var i = this.board.bars.length - 1; i >= 0; i--) {
        var bar = this.board.bars[i];
        // Se usa para confirmar colisión
        if(hit(bar,this.board.ball)) {
          this.board.ball.collision(bar);
        }
      };

    },
    // ******************** AGREGADO FIN ********************



    // El juego se mantiene a partir de ese objeto y este metodo
    play: function(){
      if(this.board.playing){
        this.clean();
        this.draw();
        this.check_collisions();  //AGREGADO
        this.board.ball.move();
      }
    }
  };


  // Helper method: No pertenecen al scope del objeto pero ayudan a realizar ciertas cosas

  // Funcion usada para dibujar el elemento de acuerdo al KIND que tenga definido. Ej: objeto bar tendra bar.kind = "rectangle"
  function draw(ctx,element){
    // Como ball no se ha definido y tiene un valor actual de null es necesario este condicional

      switch(element.kind) {
        case "rectangle":
        ctx.fillRect(element.x, element.y, element.width, element.height);
        break;

        case "circle":
        ctx.beginPath();
        ctx.arc(element.x,element.y,element.radius,0,7);
        ctx.fill();
        ctx.closePath();
        break;
      }
  }

  // ******************** AGREGADO *********************
  // Se usa para comprobar la existencia de una colisión entre a y b
  function hit(a,b){
    var hit = false;
    // Colisiones horizontales
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
      // Colisiones verticales
      if(b.y + b.height >= a.y && b.y < a.y + a.height) {
        hit = true
      }
    }
    // Colisiones de a con b
    if(b.x <= a.x && b.x + b.width >= a.x + a.width) {
      if(b.y <= a.y && b.y + b.height >= a.y + a.height){
        hit = true;
      }
    }
    // Colisiones de b con a
    if(a.x <= b.x && a.x + a.width >= b.x + b.width) {
      if(a.y <= b.y && a.y + a.height >= b.y + b.height){
        hit = true;
      }
    }

    return hit;
  }

  // ******************** AGREGADO FIN *********************
})();