let personaje= new Personaje();
let enemigo=new Enemigo();
let pociones=new Potions();
let temporizador= new Temporizador();
let vidas=new Lifes();
let contadorEnemigos=0;
let contadorRestarVidas=0; //Se inicializa con el motivo que se solo se reste una vida en caso de colision (ahi incrementa e incrementa a uno), cuando se vuelve a llamar al gameLoop su valor vuelve a cero
let parrafo=document.getElementById("cantPociones");
parrafo.innerHTML=pociones.obtenerCantidad();
let chequear=0;
let IDEnemigos=null;
let potions=null;
let colision=0;


/*Se inicializan intervalos para detectar la colision entre objetos, generar las pociones cada 2seg, el bucle principal
del juego (gameLoop) cada 1seg y el inicio del contador */
function comenzarJuego(){
    colision=setInterval(detectarColision, 400);
    potions=setInterval(generarPociones, 2000);
    chequear=setInterval(gameLoop, 1000);
    temporizador.empezarContador();
}

/*Se vuelve todas las variables a cero, como se crean originalmente y se limpian los intervalos en caso
de que alguno haya quedado, se vuelve a llamar a comenzarJuego para volver a inicializar los intervalos */
function reiniciarJuego(){
    contadorEnemigos=0;
    vidas.resetearVidas();
    personaje.resetearPersonaje();
    enemigo.resetearEnemigos();
    temporizador.detenerTemporizador();
    clearInterval(potions);
    clearInterval(IDEnemigos);
    clearInterval(colision);
    clearInterval(chequear);
    temporizador.resetearTemporizador();
    pociones.resetearPociones();
}

/*Se le pide al documento que escuche ciertas teclas (flecha abajo y flecha arriba para que se llame a cierta funcion 
en la clase personaje) */
document.addEventListener("keydown", function(event){
    if(event.keyCode==38){
        personaje.saltar();
    }
    if(event.keyCode==40){
        personaje.agacharse();
    }

});

//Se encarga de tomar un solo enemigo (ese es la razón que se creó el contador para limitar la cantidad de enemigos)
function GenerarEnemigos(){
    if(contadorEnemigos==0){
        contadorEnemigos++;
        enemigo.tomarEnemigo();
    }
}

//Se encarga de tomar una sola pocion
function generarPociones(){
    pociones.tomarPotion();
}

//Es el bucle principal del juego, se encarga de ver si, se puede seguir jugando(ya sea por la cantidad de vidas,
//el tiempo o la cantidad de pociones recogidas)
function gameLoop(){
    //Chequea si se puede seguir jugando (que tenga vidas, que el tiempo > 0 y que no haya llegado a la cantidad
    //necesaria de pociones, en caso de cumplirlo, genera enemigos y el contador de enemigos lo vuelve a 0)
    if(vidas.cantidadValida() && temporizador.tiempoValido() && pociones.seguirJugando()){
        IDEnemigos=setInterval(GenerarEnemigos, 3200);
        contadorEnemigos=0;
        contadorRestarVidas=0;
    }
    //En caso de tener vidas, tener tiempo y haber llegado a la cantidad necesaria de pociones, detendrá él juego
    //limpiará los intervalos y mostrará el panel de ganador
    else if(vidas.cantidadValida() && temporizador.tiempoValido() && pociones.cantPocionesIguales()){
        clearInterval(potions);
        clearInterval(IDEnemigos);
        clearInterval(colision);
        clearInterval(chequear);
        pociones.detenerPociones();
        temporizador.detenerTemporizador();
        enemigo.eliminarTodosLosEnemigos();
        mostrarPanelGanador();
    }
    //Caso contrario, que no tenga tiempo ni vidad y no haya llegado al objetivo, agregará la animacion de perder al
    //personaje, limpiará los intervalos y detendrá los enemigos y las pociones, además mostrará el panel de cuando se pierde
    else{
        personaje.perder();
        clearInterval(potions);
        clearInterval(IDEnemigos);
        clearInterval(colision);
        clearInterval(chequear);
        pociones.detenerPociones();
        temporizador.detenerTemporizador();
        enemigo.eliminarTodosLosEnemigos();
        mostrarPanelPerdida();
    }
}

//Toma el div que contiene los elementos, le remueve la clase que hace que no se vea y llama a mostrar para 
//que se muestren los hijos de ese div.
function mostrarPanelPerdida(){
    let panel=document.getElementById("panelPerder");
    panel.classList.remove("mostrarPanelPerder");
    mostrar(panel);
}

//Toma el div que contiene los elementos, le agrega el estilo para que se vea en pantalla y llama a mostrar para 
//que se muestren los hijos de ese div.
function mostrarPanelGanador(){
    let panel=document.querySelector(".panelGanar")
    panel.style.display="flex";
    mostrar(panel);
}

//Segun el parametro "padre" se le obtiene todos los hijos, se los itera y se les pone el estilo de "block"
//para que pasen a ser visibles.
function mostrar(padre){
    let elementos=padre.children;
    for(let i=0;i<elementos.length;i++){
        let elem=elementos[i];
        elem.style.display="block";
    }
}

//Se encarga de ver si el personaje, segun su posición guardo en una 
//lista de pares clave-valor, colisiona con un elemento
function detectarColision(){
    let personajeDiv = document.getElementById("personaje");
    let personaje_rect = personajeDiv.getBoundingClientRect();
    let personaje_pos = {
      t: personaje_rect.top,
      l: personaje_rect.left,
      r: personaje_rect.right,
      b: personaje_rect.bottom
    };
    //En caso de ser un enemigo, restará una vida y agregará la animación de herido al personaje
    if(enemigo.detectarColisionEnemigos(personaje_pos)){
        if(contadorRestarVidas==0){
            vidas.restarVidas();
            personaje.herido();
            contadorRestarVidas++;
        }
    }
    //En caso de ser una pocion, se fijará si es buena, sumará tiempo, en caso de ser mala, restará tiempo
    let resultado=pociones.detectarColisionPociones(personaje_pos);
    if(resultado== "pocion Buena"){
        temporizador.sumarTiempo(3);
        return;
    }
    if(resultado== "pocion Mala"){
        temporizador.restarTiempo(5);
        return;
    }
}
