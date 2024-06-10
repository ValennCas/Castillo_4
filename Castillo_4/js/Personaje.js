class Personaje{

    constructor(){
        this.personaje=document.getElementById("personaje");
        this.perderVariable=false; //Es una bandera para saber cuando se perdió y no se pueda hacer otro movimiento al menos que se reinicie el juego
    }

    //Elimina todas las clases y le asigna la clase caminar al personaje
    caminar(){
        this.borrar();
        this.personaje.classList.add("caminar");
    }

    //Remueve la clase perder y agrega la clase caminar, además que vuelve perderVariable a false.
    resetearPersonaje(){
        document.querySelector("#personaje").classList.remove("perder");
        document.querySelector("#personaje").classList.add("caminar");
        this.perderVariable=false;
    }

    //Si no se perdió, se elimina todas las clases, se agrega la clase herido, que le da la animación.
    //Una vez que acabó la animación, sino se perdió, se vuelve a agregar caminar y si se perdió, solo se remueve la clase
    herido(){
        if(!this.perderVariable){
                this.borrar();
                this.personaje.classList.add("herido");
                this.personaje.addEventListener("animationend", ()=>{
                    if(!this.perderVariable){
                        this.caminar();
                    }
                    else{
                        this.personaje.classList.remove("herido");
                    }
                })
        }   
    }
//Si no se perdió y si se encuentra caminando se elimina todas las clases, se agrega la clase agacharse, que le da la animación.
//Una vez que acabó la animación, sino se perdió, se vuelve a agregar caminar y si se perdió, solo se remueve la clase
    agacharse(){
        if(!this.perderVariable){
            if(this.personaje.classList.contains("caminar")){
                this.borrar();
                this.personaje.classList.add("agacharse");
                this.personaje.addEventListener("animationend", ()=>{
                    if(!this.perderVariable){
                        this.caminar();
                    }
                    else{
                        this.personaje.classList.remove("agacharse");
                    }
                })
            }
        }
    }

    //Si no se perdió y si se encuentra caminando se elimina todas las clases, se agrega la clase saltar, que le da la animación.
    //Una vez que acabó la animación, sino se perdió, se agrega la clase caer y si se perdió, solo se remueve la clase
    saltar(){
        if(!this.perderVariable){
            if(this.personaje.classList.contains("caminar")){
                this.borrar();
                this.personaje.classList.add("saltar");
                this.personaje.addEventListener("animationend", ()=>{
                    if(!this.perderVariable){
                        this.caer();
                    }
                    else{
                        this.personaje.classList.remove("saltar");
                    }
                })
            }
        }   
    }

//Se elimina todas las clases, se agrega la clase caer, que le da la animación.
//Una vez que acabó la animación, sino se perdió, se vuelve a agregar caminar y si se perdió, solo se remueve la clase
    caer(){
        this.borrar();
        if(!this.perderVariable){
            this.personaje.classList.add("caer");
            this.personaje.addEventListener("animationend", ()=>{
                if(!this.perderVariable){
                    this.caminar();
                }
                else{
                    this.personaje.classList.remove("caer");
                }
            })
        }
    }

    //Vuelve la variable a true (es la bandera para saber si se puede seguir haciendo otra animación)
    //Se declara que el personaje deje de escuchar cuando la animacion termine
    //Elimina todas las clases(this.borrar())
    //Se le agrega la clase perder para mostrar la animación
    perder(){
        this.perderVariable=true;
        this.personaje.removeEventListener("animationend", ()=>{});
        this.borrar();
        this.personaje.classList.add("perder");
    }

    //Elimina todas las clases y se declara que el personaje deje de escuchar cuando la animacion termine
    borrar(){
        this.personaje.classList.remove("correr");
        this.personaje.classList.remove("caer");
        this.personaje.classList.remove("saltar");
        this.personaje.classList.remove("caminar");
        this.personaje.classList.remove("agacharse");
        this.personaje.classList.remove("herido");
        this.personaje.removeEventListener("animationend", ()=>{});
    }
}