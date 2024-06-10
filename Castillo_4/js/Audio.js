class Audio{

    //Crea un elemento audio, le declara la fuente del archivo
    cargarAudio(fuente) {
        const sonido = document.createElement("audio");
        sonido.src = fuente;
        sonido.setAttribute("preload", "auto");// Configura el audio para que se cargue automáticamente
        sonido.setAttribute("controls", "none");// Oculta los controles del audio
        sonido.style.display = "none"; //oculta al elemento
        document.body.appendChild(sonido);
        //Cuando el audio se termine de reproducir
        sonido.addEventListener('ended', function() {
            this.currentTime = 0; // Reiniciar el tiempo del audio
            this.play(); // Reproducir nuevamente
        });
        return sonido;
    };

    //Detiene el audio y reiniciar el tiempo del audio
    stop(audio) {
        audio.pause();
        audio.currentTime = 0;
    }

    reproducirAudio(audio){
        audio.play(); //Se encarga de reproducir el audio
    }
}