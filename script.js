const html = document.querySelector('html');

const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span')
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');



const musicaTemporizadorInicia = new Audio('./sonidos/play.wav');
const musicaTemporizadorTermina = new Audio('./sonidos/beep.mp3');
const musicaTemporizadorPausa = new Audio('./sonidos/pause.mp3');




let tiempoTranscurridoEnSegundos = 1500; //25 minutos

let idIntervalo =null;


musica.loop = true;

inputEnfoqueMusica.addEventListener('change', ()=> {  
    musica.paused? musica.play() : musica.pause();
});




botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;  //5minutos * 60 segundos 
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active'); //activo el fondo del boton cuando hacen click
});

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;  //25minutos * 60 segundos 
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active'); //activo el fondo del boton
});

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;  //15minutos * 60 segundos 
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active'); //activo el fondo del boton
});

function cambiarContexto(contexto){    
    mostrarTiempo();
    botones.forEach(boton => boton.classList.remove('active')); //borro el active de todos los botones   
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);      
    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`            
            break;

        case 'descanso-corto':
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro?,</br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`   
            break;

        case 'descanso-largo':
            titulo.innerHTML = `
            Hora de volver a la superficie.</br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>`    
        default:
            break;
    }

}

const cuentaRegresiva = ()=> {
    if(tiempoTranscurridoEnSegundos <= 0){
        musicaTemporizadorTermina.play();         
        alert('Tiempo final');        
        detener();
        return;  //return sin nada interrumpe el flujo de la aplicacion 
    }   
    textoIniciarPausar.textContent = 'Pausar'; //Cuando queremos agregar texto al html
    iconoIniciarPausar.setAttribute('src', './imagenes/pause.png')
    
    //diferencia entre innerHTML y textcontent?
    // text content comprende todo como texto
    //innherHTML considera los textos, las etiquetas y las variables `${}` 

    tiempoTranscurridoEnSegundos -=1;
    //console.log('Temporizador: ' +tiempoTranscurridoEnSegundos);    
    mostrarTiempo();
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar(){
    if(idIntervalo){  //si es diferente de null   
        musicaTemporizadorPausa.play();  
        detener();        
        return;  //breaker
    }    
    
    musicaTemporizadorInicia.play();
    idIntervalo = setInterval(cuentaRegresiva,1000) //metodo para establecer el intervalo con que
    
    //algo va a ocurrir, en milisegundos para este caso una cuenta regresiva cada segundo
}

function detener(){  //    
    clearInterval(idIntervalo); // cancela una acción repetitiva cronometrada que se estableció previamente mediante una llamada a setInterval(). 
    idIntervalo=null;  
    textoIniciarPausar.textContent = 'Comenzar';  
    iconoIniciarPausar.setAttribute('src','./imagenes/play_arrow.png')
    
}

function mostrarTiempo(){
    //formatear fechas new Date la variable debe estar en milisegundos entonces multiplico *1000
    const tiempo = new Date (tiempoTranscurridoEnSegundos*1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit',second:'2-digit'})  //es-MX elijo mexico
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}

mostrarTiempo();
