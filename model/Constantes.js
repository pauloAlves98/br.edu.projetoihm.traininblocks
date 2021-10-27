const DIREITA = 'DIREITA';
const ESQUERDA = 'ESQUERDA';
const CIMA = 'CIMA';
const BAIXO = 'BAIXO';
const PAINEL = 'PAINEL';
const VAZIO = 'VAZIO';
const BARREIRA_OPEN = 'ABERTA'
const BARREIRA_CLOSE = 'FECHADA'


const TAM_WIDTH_TELA_CANVAS = 768;
const TAM_HEGTH_TELA_CANVAS = 320;
const TAM_HEGTH_TELA_CANVAS_JOGAVEL = 320;
const TAM_WIDTH_CONTENT_CANVAS = 768;
const QUANTIDADE_DE_VILOES = 5;
const TILE_AREA = 32;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} 
function arredondar(numero){
    return Math. round(numero * 100) / 100;
}