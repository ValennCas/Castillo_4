class Lifes{
    constructor(){
        this.vidas=3;
    }
    restarVidas(){
        //Resta una vida
        this.vidas=this.vidas-1;
        let divVidas=document.querySelector(".lifes");
        //En caso de que tenga vidas, segun la cantidad que tenga agregaré la clase correspondiente par aque se muestre la 
        //imagen.
        if(this.vidas>0){
            if(this.vidas==2){
                divVidas.classList.remove("treeLifes"); //Elimina la imagen de tres vidas
                divVidas.classList.add("animacionTitilar");
                divVidas.classList.add("twoLifes");//Agrega la imagen de dos vidas
            }
            if(this.vidas==1){
                divVidas.classList.remove("twoLifes");//Elimina la imagen de dos vidas
                divVidas.classList.add("animacionTitilar");
                divVidas.classList.add("oneLifes");
            }
        }
        else{
            divVidas.classList.remove("oneLifes");//Elimina la imagen de una vida
            divVidas.classList.add("animacionTitilar");
            divVidas.classList.add("zeroLifes");//Agrega la imagen de cero vidas
        }
        this.eliminarAnimacion(divVidas);
    }

    //Se encarga de que, una vez terminada la animación, se elimine.
    eliminarAnimacion(divVidas){
        divVidas.addEventListener("animationend", ()=>{
            divVidas.classList.remove("animacionTitilar");
        })
    }

    //Devuelve true si la cantidad de vidas es mayor a cero.
    cantidadValida(){
        return this.vidas>0;
    }

    //Elimina todas las clases que da la imagen (en caso de no saber cuantas vidas quedan) y 
    //agrega la clase que muestra las tres vidas.
    //Vuelve las vidas a tres
    resetearVidas(){
        document.querySelector(".lifes").classList.remove("zeroLifes");
        document.querySelector(".lifes").classList.remove("twoLifes");
        document.querySelector(".lifes").classList.remove("oneLifes");
        document.querySelector(".lifes").classList.add("treeLifes");
        this.vidas=3;
    }
}