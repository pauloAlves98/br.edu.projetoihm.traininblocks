const DIREITA = 'DIREITA';
const ESQUERDA = 'ESQUERDA';
const CIMA = 'CIMA';
const BAIXO = 'BAIXO';
const PAINEL = 'PAINEL';
const TUNEL = 'TUNEL';
const VAZIO = 'VAZIO';
const BARREIRA_OPEN = 'ABERTA'
const BARREIRA_CLOSE = 'FECHADA'
const ATIVO = 'ATIVO'
const INATIVO = 'DESATIVADO'
const DANO_COLISAO_VEICULO_TREM = 30; //segundos
const DANO_MOVIMENTO_ERRADO = 5; //segundos

const TAM_WIDTH_TELA_CANVAS = 768;
const TAM_HEGTH_TELA_CANVAS = 320;
const TAM_HEGTH_TELA_CANVAS_JOGAVEL = 320;
const TAM_WIDTH_CONTENT_CANVAS = 768;
const QUANTIDADE_DE_VILOES = 5;
const TILE_AREA = 32;
const MSG_TREM_VIA = 'O TREM ATRAVESSOU A VIA'
const MSG_TREM_VINDO = 'O TREM ESTA VINDO!'
const MSG_DANO_MOV_COLISAO_CENARIO = 'COLISÃO COM O CENÁRIO. DANO DE +'+DANO_MOVIMENTO_ERRADO+' SEGUNDOS'
const MSG_DANO_MOV_ERRADO = 'MOVIMENTO ERRADO. DANO DE +'+DANO_MOVIMENTO_ERRADO+' SEGUNDOS'
const MSG_DANO_COLISAO_TREM = 'COLISÃO TREM/VEÍCULO. DANO DE +'+DANO_COLISAO_VEICULO_TREM+' SEGUNDOS'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
} 
function arredondar(numero){
    return Math. round(numero * 100) / 100;
}