/* PING PONG
Objetos:
  Board => width, height
  BoardView => canvas, board
  Barras, Ball

*/

// Las clases las definimos en un SCRIPT aparte para dejar este solo a la logica




// Ejecutamos la logica del programa al cargar la ventana
window.addEventListener("load", main);

// MAIN posee la LOGICA del Programa => CONTROLADOR
function main(){
  // Creamos un objeto Board
  var board = new Board(800,400);
  var canvas = document.getElementById("canvas");
  var board_view = new BoardView(canvas, board);

  var bar = new Bar(20,100,40,100,board);
  var bar = new Bar(735,100,40,100,board);
  board_view.draw();



  // ******************** AGREGADO *********************

  document.addEventListener("keydown", function(ev){
   if (ev.keyCode == 38) {
    bar.up();
   }
   else if(ev.keyCode == 40) {
    bar.down();
   }
   console.log("" + bar)
  })

  // ******************** AGREGADO FIN *********************


}
