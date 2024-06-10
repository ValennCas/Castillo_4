class Enemigo{
    constructor(){
        this.enemigos=this.generarEnemigos();
        this.contadorPos=0;
        this.aux=[];
    }
    //GenerarEnemigos, limita la cantidad de enemigos que se pueden generar, donde se hará un for para iterar hasta 
    //ese numero, se crea el div, se lo asigna como hijo al contenedor y se agrega al arreglo
    generarEnemigos(){
        let cantEnemigos=4;
        let enemigos=[];
        for(let i=0;i<cantEnemigos;i++){
            let enemigo=document.createElement("div");
            enemigo.classList.add("enemigo");
            document.getElementById("contenedor").appendChild(enemigo);
            let colisionEnemigo=document.createElement("div");//Se genera otro div
            colisionEnemigo.classList.add("colisionTamanio");//La clase centra el div y le da un ancho y alto
            enemigo.appendChild(colisionEnemigo);//Se le asigna como hijo de enemigo para usarlo como referencia cuando el personaje colisiona contra el enemigo
            enemigos.push(enemigo);
        }
        //Devuelve el arreglo generado para que se guarde
        return enemigos;
    }
    //Agarra el ultimo enemigo del arreglo, lo elimina, le agrega 
    tomarEnemigo(){
        if(this.enemigos.length>0){
                let enemigo=this.enemigos[this.enemigos.length-1];
                this.enemigos.pop();
                this.aux.push(enemigo);//Aux guarda los enemigos que se van sacando del arreglo
                enemigo.classList.add("posicion");//Permite que se pueda ver el enemigo
                enemigo.classList.add("enemigoAnimacion");//Agrega la animación para que se desplace del borde derecho a izq
                this.generarPos(enemigo);//Le agrega una posicion en pantalla
            }
    }

    //Agarra todos los enemigos, los itera y les elimina la animacion que le permite ir del borde derecho al izq y 
    //solo deja la animacion que mueve las imagenes y le dan el movimiento de "volar" al dragon (enemigoMoviemto).
    eliminarTodosLosEnemigos(){
        let enemigos=document.querySelectorAll(".enemigo");
        for(let i=0;i<enemigos.length;i++){
            let enemigo=enemigos[i];
            enemigo.classList.remove("enemigoAnimacion");
            enemigo.classList.add("enemigoMovimiento");
        }
    }

    //Vuelve contadorPos a 0 y elimina todas las clases, además que se copia aux a enemigos.
    resetearEnemigos(){
        this.contadorPos=0;
        for(let i=0;i<this.aux.length;i++){
            let enemigo=this.aux[i];
            enemigo.classList.remove("posicion");
            enemigo.classList.remove("enemigoMovimiento");
            enemigo.classList.remove("enemigoAnimacion");
        }
        this.enemigos=[];
        for(let i=0;i<this.aux.length;i++){
            let enemigo=this.aux[i];
            this.enemigos.push(enemigo);
        }
    }

    //Se define un arreglo con posiciones como string con valores en píxeles.
    // Estos valores se usarán para asignar las coordenadas 'left' y 'bottom' al enemigo.
    generarPos(enemigo){
        let pos=["100px", "20px","302px","33px","200px","800px", "460px","283px"]

        //Obtiene un valor del arreglo usando contadorPos
        let bottom=pos[this.contadorPos];
        this.contadorPos++;
        //Se incrementa un valor y se vuelve a asignar un valor del arreglo usando contadorPos
        let left=pos[this.contadorPos];
        this.contadorPos++;

        //Se le asigna las coordenadas 'left' y 'bottom' al enemigo.
        enemigo.style.left = left;
        enemigo.style.bottom = bottom;
    }

    //Toma todos los elementos que contengan la clase colisionTamanio, los itera, guarda la coordenada de 
    //un elemento en una lista de pares clave-valor y detecta si se superponen las areas
    detectarColisionEnemigos(personaje_pos){
        let divs=document.querySelectorAll(".colisionTamanio");
        for(let i=0;i<divs.length;i++){
                let enemigo = divs[i];
                let enemigo_rect = enemigo.getBoundingClientRect();
                let enemigo_pos = {
                t: enemigo_rect.top,
                l: enemigo_rect.left,
                r: enemigo_rect.right,
                b: enemigo_rect.bottom
                }
                //Detecta si se superponen las áreas, en caso de serlo devuelve true;
                if (personaje_pos.l < enemigo_pos.r && personaje_pos.r > enemigo_pos.l 
                    && personaje_pos.b > enemigo_pos.t && personaje_pos.t < enemigo_pos.b) {
                        return true;
                }
        }
        return false;
    }

}
