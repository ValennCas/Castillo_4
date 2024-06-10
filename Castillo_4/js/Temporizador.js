class Temporizador{
    constructor(){
        this.tiempoTemporizadorSegundos=45;
        this.tiempoTemporizadorMinutos=0;
        this.contadorID=0;
    }


    //Inicializa el intervalo que, cada un segundo, va a restar un segundo.
    empezarContador(){
        let segundos=document.getElementById("segundos");
        let minutos=document.getElementById("minutos");
        this.contadorID=setInterval(()=>{
            if(this.tiempoTemporizadorSegundos<10){
                segundos.innerHTML=`0${this.tiempoTemporizadorSegundos}`;
            }
            else{
                segundos.innerHTML=this.tiempoTemporizadorSegundos;
            }
            minutos.innerHTML=`0${this.tiempoTemporizadorMinutos}`;
            this.tiempoTemporizadorSegundos--;
            //En caso de que no se tenga más tiempo se limpia el intervalo
            if(this.tiempoTemporizadorSegundos==0 && this.tiempoTemporizadorMinutos==0){
                clearInterval(this.contadorID);
            }
            //En caso de que se llegue a más o igual de 60, se sumará un minuto y lo que resta a los segundos
            else if(this.tiempoTemporizadorSegundos>=60){
                this.tiempoTemporizadorMinutos=1;
                this.tiempoTemporizadorSegundos=this.tiempoTemporizadorSegundos-60;
                segundos.innerHTML=`0${this.tiempoTemporizadorSegundos}`;
                minutos.innerHTML==`0${this.tiempoTemporizadorMinutos}`;
            }
            //En caso de llegar al minuto y no contar con mas segundos, se le resta el minuto y se le pone 59 seg.
            else if(this.tiempoTemporizadorSegundos==0 && this.tiempoTemporizadorMinutos==1){
                this.tiempoTemporizadorMinutos=0;
                this.tiempoTemporizadorSegundos=59;
                segundos.innerHTML=this.tiempoTemporizadorSegundos;
                minutos.innerHTML=`0${this.tiempoTemporizadorMinutos}`;
            }
        }, 1000);
    }

    //Se limpia el intervalo del temporizador
    detenerTemporizador(){
        clearInterval(this.contadorID);
    }

    //Retorna true si todavia tengo tiempo
    tiempoValido(){
        return (this.tiempoTemporizadorSegundos>0 || this.tiempoTemporizadorMinutos>0);
    }

    //Sumará la cantidad de tiempo que se pase por parametro
    sumarTiempo(tiempo){
        if(this.tiempoTemporizadorMinutos==0 && this.tiempoTemporizadorSegundos>0){
            if(this.tiempoTemporizadorSegundos+tiempo>=60){ //En caso de que pase o iguale los 60 seg
                this.tiempoTemporizadorMinutos=1;
                this.tiempoTemporizadorSegundos=this.tiempoTemporizadorSegundos-60;
            }
            this.tiempoTemporizadorSegundos+=tiempo;
        }
        //Si se tiene un minuto y la suma del tiempo acumulado con lo que viene en parametro es menor o igual a treinta se actualiza el tiempo
        else if(this.tiempoTemporizadorMinutos==1 && (this.tiempoTemporizadorSegundos+tiempo)<=30){
            this.tiempoTemporizadorSegundos+=tiempo;
        }
        //Si se tiene un minuto y la suma del tiempo acumulado con lo que viene en parametro es mayor a treinta se actualiza el tiempo al máx se se puede 
        //acumular (01:30)
        else if(this.tiempoTemporizadorMinutos==1 && (this.tiempoTemporizadorSegundos+tiempo)>30){
                this.tiempoTemporizadorSegundos=30;
        }
    }

    //Se enncarga de actualizar el tiempo restando su valor segun lo que viene por parametro
    restarTiempo(tiempo){
        //En caso de no tener minutos y que la resta entre segundos y lo que viene por parametro de 0 o menos, se actualiza a cero
        if(this.tiempoTemporizadorMinutos==0 && this.tiempoTemporizadorSegundos-tiempo<=0){
            this.tiempoTemporizadorSegundos=0;
            segundos.innerHTML=`0${this.tiempoTemporizadorSegundos}`;
        }
        //En caso de no tener minutos y que la resta entre segundos y lo que viene por parametro de mas de 0, se actualiza los seg
        if(this.tiempoTemporizadorMinutos==0 && this.tiempoTemporizadorSegundos-tiempo>0){
            this.tiempoTemporizadorSegundos-=tiempo;
        }
        //En caso de tener un minuto y los segundos den cero o menos
        //Se actualiza minutos y segundos
        else if(this.tiempoTemporizadorMinutos==1 && (this.tiempoTemporizadorSegundos-tiempo)<=0){
            this.tiempoTemporizadorMinutos=0;
            this.tiempoTemporizadorSegundos=60+(this.tiempoTemporizadorSegundos-tiempo);
        }
        else{
            this.tiempoTemporizadorSegundos-=tiempo;
        }
    }

    //Se encarga de setear todos los valores a como estan originalmente
    resetearTemporizador(){
        this.tiempoTemporizadorSegundos=45;
        this.tiempoTemporizadorMinutos=0;
        this.contadorID=0;
    }
}