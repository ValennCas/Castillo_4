class Potions{
    constructor(){
        this.pociones=[];
        this.crearPociones();
        this.cantNecesariaPosiciones=7;
        this.pocionesRecogidas=0;
    }
    //crearPociones, limita la cantidad de pociones que se pueden generar, donde se hará un for para iterar hasta 
    //ese numero, se crea el div, se lo asigna como hijo al contenedor y se agrega al arreglo
    crearPociones(){
        let cantPos=10;
        let nro=1;
        for (let i = 0; i < cantPos; i++) {
                let pocion = document.createElement("div");
                pocion.classList.add("pociones");
                pocion.classList.add(`pocion${nro}`);//Le agrega la imagen segun la pocion
                this.generarPosAleatoria(pocion); //Genera una pocion aleatoria
                document.getElementById("contenedor").appendChild(pocion); 
                let colisionPocion = document.createElement("div");//Se genera otro div
                colisionPocion.classList.add("colisionPocion");//La clase centra el div y le da un ancho y alto
                pocion.appendChild(colisionPocion);//Se le asigna como hijo de la pocion para usarlo como referencia cuando el personaje colisiona contra una pocion
                this.pociones.push(pocion);
                nro++;
        }
    }

    //Genera un numero random con el tamaño del array, toma esa pocion y le da la clase que permite que sea visible
    //y le de animacion.
    tomarPotion(){
        if(this.pociones.length>0){
            let nro=Math.floor(Math.random()*this.pociones.length);
            let pocion=this.pociones[nro];
            pocion.classList.add("pocionAnimacion");
            this.eliminarPocion(pocion);
        }
    }

    //Cuando la animacion termine, elimina la clase que da la animacion y que permite ver la pocion
    eliminarPocion(pocion){
        pocion.addEventListener("animationend", ()=>{
            pocion.classList.remove("pocionAnimacion");
        })
    }

    //Elimina la clase que da la animacion y que permite ver la pocion
    borrarPocion(pocion){
        pocion.classList.remove("pocionAnimacion");
    }
    
    //Se genera una posición aleatoria en el contenedor y se lo asigna al bottom de la pocion
    generarPosAleatoria(pocion){
        let contenedor = document.getElementById("contenedor");
        let contenedorHeight = contenedor.clientHeight;
        
        let y = Math.random() * (contenedorHeight -pocion.clientHeight);
        
        pocion.style.bottom = `${y+60}px`;
    }

    //Toma todos los elementos que contengan la clase pociones, los itera, guarda la coordenada de 
    //un elemento en una lista de pares clave-valor y detecta si se superponen las areas con el personaje
    detectarColisionPociones(personaje_pos){
        let divs=document.querySelectorAll(".pociones");
        for(let i=0;i<divs.length;i++){
                let pocion = divs[i];
                let pocion_rect = pocion.getBoundingClientRect();
                let pocion_pos = {
                t: pocion_rect.top,
                l: pocion_rect.left,
                r: pocion_rect.right,
                b: pocion_rect.bottom
                }
                //Detecta si se superponen las áreas
                if (personaje_pos.l < pocion_pos.r && personaje_pos.r > pocion_pos.l 
                    && personaje_pos.b > pocion_pos.t && personaje_pos.t < pocion_pos.b) {
                        //En caso de ser una pocion mala, se fijará si hay pociones para restar y actualiza el valor de las pociones recogidas
                    if(pocion.classList.contains("pocion8") || pocion.classList.contains("pocion7") || pocion.classList.contains("pocion9")){
                        if(this.pocionesRecogidas>0){
                            this.pocionesRecogidas--;
                        }
                        this.borrarPocion(pocion);
                        parrafo.innerHTML="";
                        parrafo.innerHTML=this.pocionesRecogidas;
                        return "pocion Mala";
                    }
                    else{
                        //En caso de ser una pocion buena, aumenta la cantidad de pociones recogidas, actualiza el parrafo que muestra 
                        //cuantas se recogieron y se retorna pocion buena.
                        this.pocionesRecogidas++;
                        this.borrarPocion(pocion);
                        parrafo.innerHTML="";
                        parrafo.innerHTML=this.pocionesRecogidas;
                        return "pocion Buena";
                    }
                }
        }
        return "ninguna pocion";
    }

    //Selecciona todos los elementos que tenga la clase pociones, los itera y les remueve la clase que les da la animacion y la visibilidad
    detenerPociones(){
        let pociones=document.querySelectorAll(".pociones");
        for(let i=0;i<pociones.length;i++){
            let pocion=pociones[i];
            pocion.classList.remove("pocionAnimacion");
        }
    }

    //Devuelve la cantidad de pociones que se tienen recogidas hasta el momento
    obtenerCantidad(){
        return this.pocionesRecogidas;
    }

    //Devuelve true si la cantidad de pociones que llevo recogiendo son menores a las que necesito recoger
    seguirJugando(){
        return this.pocionesRecogidas<this.cantNecesariaPosiciones;
    }

    //Retorna true en caso de que los valores sean iguales
    cantPocionesIguales(){
        return this.pocionesRecogidas==this.cantNecesariaPosiciones;
    }

    //Vuelve la cantidad de pociones a cero y las actualiza en el parrafo
    resetearPociones(){
        this.pocionesRecogidas=0;
        parrafo.innerHTML=this.pocionesRecogidas;
    }
}