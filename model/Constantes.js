const DIREITA = 39;
const ESQUERDA = 37;
const CIMA = 38;
const BAIXO = 40;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} 

function arredondar(numero){
    return Math. round(numero * 100) / 100;
}