/* PING PONG
Objetos:
  Board => width, height
  BoardView => canvas, board
  Barras, Ball

*/

// Las clases las definimos en un SCRIPT aparte para dejar este solo a la logica


// SE TUVO QUE SACAR TODAS LAS VARIABLES PORQUE SI SE CREAN CON CADA NUEVO FRAME NO PODRÍAN SIMULAR EL MOVIMIENTO AL CREARSE EN EL MISMO PUNTO UNA Y OTRA VEZ

// Creamos los objetos
  var board = new Board(800,400);
  var canvas = document.getElementById("canvas");
  var board_view = new BoardView(canvas, board);

  var bar_2 = new Bar(20,100,40,100,board);
  var bar = new Bar(735,100,40,100,board);

  var ball = new Ball(350,100,10,board);

  document.addEventListener("keydown", function(ev){
    // Quita función por default a teclas
    //ev.preventDefault();

   if (ev.keyCode === 38) {
    ev.preventDefault();
    bar.up();
   }
   else if(ev.keyCode === 40) {
    ev.preventDefault();
    bar.down();
   }
   else if (ev.keyCode === 87) {
    ev.preventDefault();
    bar_2.up();
   }
   else if(ev.keyCode === 83) {
    ev.preventDefault();
    bar_2.down();
   }
   else if(ev.keyCode === 32){
    ev.preventDefault();
    board.playing = !board.playing;
   }
  })


// Ejecutamos la logica del programa al cargar la ventana
// window.addEventListener("load", main);


// Para utilizar frames y cargar la función main en la carga del siguiente frame
board_view.draw();  //AGREGADO
window.requestAnimationFrame(main);

// MAIN posee la LOGICA del Programa => CONTROLADOR
function main(){
  window.requestAnimationFrame(main);
  board_view.play();
}
