
let botonInstrucciones=document.querySelector(".botonInstrucciones");
let botonControles=document.querySelector("#botonControles");
let instrucciones=document.querySelector(".instrucciones");
let botonesJugar=document.querySelectorAll(".botonJugar");
asignarEvento();
let controlesDiv=document.querySelector(".controles");
let inicio=document.querySelector(".inicio");
let botonReiniciar=document.querySelector(".botonReiniciar");
let activarAudio=document.getElementById("audioMenu");
let audioCargar=new Audio();
let miSonidoMenu=null;
let miSonidoJuego=null;
let contadorDeHijos=0;

//Se asigna el evento click al boton que activa el audio
activarAudio.addEventListener("click", ()=>{
    miSonidoMenu=audioCargar.cargarAudio("../audio/menu.mp3"); //Se genera el elemento audio
    audioCargar.reproducirAudio(miSonidoMenu); //Se reproduce la musica
    activarAudio.style.display="none"; //Se asigna la propiedad none para que el boton ya no sea visible
    crearHijo();
})

//S eencarga de verificar si todavia no existe el boton con la clase detenerAudio, en caso de existir,
//Solo se le dará la propiedad block para que sea visible
function crearHijo(){
    let hijos=document.querySelector(".botones").children; //Toma los hijos de .botones
    for(let i=0;i<hijos.length;i++){ //los itera
        let hijo=hijos[i];
        if(hijo.classList.contains("detenerAudio")){ //En caso de contener el elemento, contador incrementa
            contadorDeHijos++;
        }
    }
    if(contadorDeHijos==0){
        let boton = document.createElement('button'); //Crea un boton
        boton.classList.add("detenerAudio"); //Le agrega la clase
        boton.textContent = 'desactivar audio'; //Le agrega texto
        document.querySelector(".botones").appendChild(boton); //Se lo asigna como hijo al div con la clase botones
        boton.addEventListener("click", ()=>{
            audioCargar.stop(miSonidoMenu); //Detiene el audio del menú
            activarAudio.style.display="block"; //Se le da visibilidad al boton que activa el audio
            document.querySelector(".detenerAudio").style.display="none"; //Se esconde el boton que desactiva el audio
        })
    }
    else{
        document.querySelector(".detenerAudio").style.display="block";
    }
}
//Boton instrucciones estará pendiente al click
botonInstrucciones.addEventListener("click", ()=>{
    inicio.classList.add("animacionDiv"); //Se le agrega una animación donde hace que su alto se vaya reduciendo para que parezca que se compacta en el medio
    document.querySelector(".botones").classList.add("noMostrar");//Se agrega la clase noMostrar para que no se muestre mas los botones
    inicio.firstElementChild.classList.add("noMostrar"); //Se esconde el titulo
    inicio.addEventListener("animationend", ()=>{ //Cuando termine la animacion
        inicio.classList.remove("animacionDiv"); //Se le quita la animacion
        inicio.classList.add("noMostrar");//El div  se oculta para que no se pueda ver
        instrucciones.classList.remove("noMostrar"); //Se remueve la clase que impedia que se vea
        instrucciones.classList.add("animacionMostrar");//Se le agrega una animación donde hace que su alto se vaya incrementando para que parezca que crece desde el medio hasta cierta altura
    })
})

botonControles.addEventListener("click", ()=>{
    inicio.classList.add("animacionDiv");//Se le agrega una animación donde hace que su alto se vaya reduciendo para que parezca que se compacta en el medio
    document.querySelector(".botones").classList.add("noMostrar");//Se agrega la clase noMostrar para que no se muestre mas los botones
    inicio.firstElementChild.classList.add("noMostrar"); //Se esconde el titulo
    inicio.addEventListener("animationend", ()=>{//Cuando termine la animacion
        inicio.classList.remove("animacionDiv");//Se le quita la animacion
        inicio.classList.add("noMostrar");//El div  se oculta para que no se pueda ver
        controlesDiv.classList.add("mostrarDiv");//Se remueve la clase que impedia que se vea
        controlesDiv.classList.add("animacionMostrar");//Se le agrega una animación donde hace que su alto se vaya incrementando para que parezca que crece desde el medio hasta cierta altura
    })
})



botonReiniciar.addEventListener("click", ()=>{
    let padre=botonReiniciar.parentNode;//Se toma el padre del boton
    padre.classList.add("animacionDiv");//Se le agrega una animación donde hace que su alto se vaya reduciendo para que parezca que se compacta en el medio
    ocultar(padre);//Se selecciona a los hijos del padre para que se oculten
    padre.addEventListener("animationend", ()=>{//Cuando termine la animacion
        padre.classList.remove("animacionDiv");//Se le quita la animacion
        padre.classList.add("mostrarPanelPerder");//Se oculta el panel para que no se vea
        audioCargar.stop(miSonidoJuego); //Se detiene el sonido
        audioCargar.reproducirAudio(miSonidoJuego);//Se vuelve a reproducir
        reiniciarJuego();//Se vuelve a reiniciar los valores
        comenzarJuego();
    })
})

//Itera todos los botones con la clase "botonJugar".
function asignarEvento(){
    for(let i=0;i<botonesJugar.length;i++){
        let botonJugar=botonesJugar[i];//Toma el boton segun i
        botonJugar.addEventListener("click", ()=>{
            let padre=botonJugar.parentNode;//Toma al padre del elemento
            padre.classList.add("animacionDiv");//Se le agrega una animación donde hace que su alto se vaya reduciendo para que parezca que se compacta en el medio
            ocultar(padre);//Se selecciona a los hijos del padre para que se oculten
            padre.addEventListener("animationend", ()=>{//Cuando termine la animacion
                padre.style.display="none";//Se oculta al padre
                document.querySelector(".Menu").classList.add("esconderMenu");//Se le agrega la clase que esconde al menu
                miSonidoJuego=audioCargar.cargarAudio("../audio/juego.wav"); //Se genera un nuevo elemento de audio
                if(miSonidoMenu!=null){ //En caso de estar activo
                    audioCargar.stop(miSonidoMenu);//Se detiene el audio
                }
                audioCargar.reproducirAudio(miSonidoJuego); //Se reproduce el audio del juego
                comenzarJuego();//Inicia los intervalos para empezar el juego
            })
        })
    }
}

//Toma todos los hijos del padre por parametro, los itera y les agrega display=none para que no se vevan
function ocultar(padre){
    let elementos=padre.children;
    for(let i=0;i<elementos.length;i++){
        let elem=elementos[i];
        elem.style.display="none";
    }
}
controlesDiv.addEventListener("animationend", ()=>{
    controlesDiv.classList.remove("animacionDiv"); //Le quita la animacion donde hace que su alto se vaya reduciendo para que parezca que se compacta en el medio
    controlesDiv.classList.remove("animacionMostrar");//Se le quita la animación donde hace que su alto se vaya incrementando para que parezca que crece desde el medio hasta cierta altura
    let elementos=controlesDiv.children; //obtiene a los hijos
    for(let i=0;i<elementos.length;i++){ //los itera
        let elem=elementos[i];
        elem.style.display="block"; //los vuelve visibles con el display=block
    }
})
instrucciones.addEventListener("animationend", ()=>{
    instrucciones.classList.remove("animacionDiv");//Le quita la animacion donde hace que su alto se vaya reduciendo para que parezca que se compacta en el medio
    instrucciones.classList.remove("animacionMostrar");//Se le quita la animación donde hace que su alto se vaya incrementando para que parezca que crece desde el medio hasta cierta altura
    let elementos=instrucciones.children; //obtiene todos los hijos
    for(let i=0;i<elementos.length;i++){ //los itera
        let elem=elementos[i];
        elem.classList.remove("noMostrar"); //Remueve la clase que impide que se vean
    }
})


