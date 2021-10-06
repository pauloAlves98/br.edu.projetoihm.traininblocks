//constantes
var TAM_WIDTH_TELA_CANVAS = 768;
var TAM_HEGTH_TELA_CANVAS = 320;
var TAM_HEGTH_TELA_CANVAS_JOGAVEL = 320;
var TAM_WIDTH_CONTENT_CANVAS = 768;
var QUANTIDADE_DE_VILOES = 5;
var TILE_AREA = 32;
//personagens
var personagem = new Personagem(); //globalvar
var viloes = new Array();
//Outras variaveis
var movimentos = {
    '#b1': "VAZIO", '#b2': "VAZIO", '#b3': "VAZIO", '#b4': "VAZIO", '#b5': "VAZIO", '#b6': "VAZIO",
    '#b7': "VAZIO", '#b8': "VAZIO", '#b9': "VAZIO", '#b10': "VAZIO", '#b11': "VAZIO", '#b12': "VAZIO", '#b13': "VAZIO",
    '#b14': "VAZIO", '#b15': "VAZIO", '#b16': "VAZIO", '#b17': "VAZIO"
};
//intervalos
var intervalo_sprite_persongem;//global mudança de sprite person
var intervalo_cronometro; //global!
//controlles
var elementos = new ControllerElementos(); //global
var cronometro = new Cronometro(); //global
var controllerFase1 = new ControllerFase1();
//sons
var sounds = new Howl({
    src: ["audio\\sprites.mp3"],
    volume: 0.25,
    sprite: {
        "colisao_caixa": [
            0,
            574.6938775510204
        ]
    }
});

var sound_fundo = new Howl({
    src: ["audio\\tema.mp3"],
    volume: 0.05,
    html5: true,
    loop: true,
});
//direcionador
function main() {
    elementos.add_loading();
    carregar_imagens_fase_1();
    document.addEventListener('keydown', key_adapter_personagem);
    intervalo_sprite_persongem = setInterval(function () {
        personagem.podeMudarSprite = true;
    }, 1000 / 10);
    movimento_personagem()

    // myVar = setInterval(myTimer, 1000 / 10);
}

function checar_loop_game() {
    //veridicar fase ativa
    if (!personagem.checarGameOver()) {
        controllerFase1.loop_game();
        window.requestAnimationFrame(checar_loop_game);
    }
    else
        alert("Game Over");

}
//metodo para todos os controllers
function movimento_personagem() {
    controllerFase1.movimento_personagem();
    setTimeout(movimento_personagem, 1000 / 10);//atualizar sprite
}

function carregar_imagens_fase_1() {
    perImg.src = "assets/trump.png";
    bordaInventarioImg.src = "assets/fundo2.png";
    perImg.onload = function () {
        //inicio load
        fase1c1Img.src = "mapas/fase1_renovada/camada1_livre.png";
        fase1c1Img.onload = function () {
            fase1c2Img.src = "mapas/fase1_renovada/camada2_trilhos.png";
            fase1c2Img.onload = function () {
                fase1c3Img.src = "mapas/fase1_renovada/camada3_obstaculos.png";
                fase1c3Img.onload = function () {
                    caixa.src = "assets/caixa2.png";
                    caixa.onload = function () {
                        caixaenergia.src = "assets/pegadas.png";
                        caixaenergia.onload = function () {
                            circuloImg.src = "assets/quadrado2.png";
                            circuloImg.onload = function () {
                                caixaFalseImg.src = "assets/caixaFalse.png";
                                caixaFalseImg.onload = function () {
                                    vilaoImg.src = "mapas/fase1_renovada/camada_colisao_barreiras.png";
                                    vilaoImg.onload = function () {
                                        setTimeout(function () {
                                            elementos.remove_id('loading');
                                            //adicionar Canvas
                                            elementos.add_canvas(TAM_WIDTH_TELA_CANVAS, TAM_HEGTH_TELA_CANVAS)
                                            //adicionar iventario
                                            elementos.add_inventario();
                                            //Carregar elementos do iventario como nome do persongem!
                                            elementos.alterar_nome_personagem_iventario("José Donald Trump");
                                            //refatorar essa parte.!
                                            $("#item-card-botoes-controles").on("click", function () {
                                                elementos.add_alerta_menu_controles();
                                            });
                                            $("#item-card-botoes-verificar-respostas").on("click", function () {
                                                elementos.add_alerta_menu_verificar_respostas(controllerFase1.verificar_respostas(0),
                                                    controllerFase1.verificar_respostas(1),
                                                    controllerFase1.verificar_respostas(2),
                                                    controllerFase1.verificar_respostas(3));
                                            });
                                            $("#item-card-botoes-resetar-caixas").on("click", function () {
                                                controllerFase1.resetar_caixas();


                                                //captura todas as formas de colisao do cenario
                                            });
                                            $("#item-card-botoes-sair-jogo").on("click", function () {
                                                elementos.add_alerta_menu_sair_jogo();
                                                sound_fundo.play()
                                            });

                                            controllerFase1.initgame();
                                         

                                            checar_loop_game();



                                        }, 2000);//2 segundos para aparecer tela de carregamento!
                                    }
                                }
                            }

                        }

                    }
                }
            }
        }
    }
}
window.addEventListener("load", main);
document.addEventListener('keydown', key_adapter_personagem);