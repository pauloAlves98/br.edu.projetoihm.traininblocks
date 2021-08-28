//constantes
var TAM_WIDTH_TELA_CANVAS = 960;
var TAM_HEGTH_TELA_CANVAS = 500;
var TAM_HEGTH_TELA_CANVAS_JOGAVEL = 320;
var TAM_WIDTH_CONTENT_CANVAS = 800;
var QUANTIDADE_DE_VILOES = 5;
//personagens
var personagem = new Personagem(); //globalvar
var viloes = new Array();
//intervalos
var intervalo_sprite_persongem;//global mudança de sprite person
var intervalo_cronometro; //global!
//controlles
var elementos = new ControllerElementos(); //global
var cronometro = new Cronometro(); //global
var controllerFase1 = new ControllerFase1();


//direcionador
function main (){
    elementos.add_loading();
    carregar_imagens_fase_1 ();
    document.addEventListener('keydown', key_adapter_personagem);
    intervalo_sprite_persongem = setInterval(function(){
        personagem.podeMudarSprite = true;
    }, 1000/10);
    movimento_vilao();
    // myVar = setInterval(myTimer, 1000 / 10);
}

function checar_loop_game() {
    //veridicar fase ativa
    if (!personagem.checarGameOver()){
        controllerFase1.loop_game();
        window.requestAnimationFrame(checar_loop_game);
    }
    else
        alert("Game Over");

}

//metodo para todos os controllers
function movimento_vilao() {
    //fase 1
    //verificar fase ativa
    controllerFase1.movimento_vilao_fase1();
    setTimeout(movimento_vilao, 1000 / 10);//atualizar sprite
}

function carregar_imagens_fase_1 () {
    perImg.src = "assets/trump.png";
    bordaInventarioImg.src = "assets/fundo2.png";
    perImg.onload = function () {
        //inicio load
        fase1c1Img.src = "mapas/fase1/camada1fase1.png";
        fase1c1Img.onload = function () {
            fase1c2Img.src = "mapas/fase1/camada2fase1.png";
            fase1c2Img.onload = function () {
                fase1c3Img.src = "mapas/fase1/camada3fase1.png";
                fase1c3Img.onload = function () {
                    caixa.src = "assets/caixa2.png";
                    caixa.onload = function () {
                        caixaenergia.src = "assets/caixaenergia.png";
                        caixaenergia.onload = function () {
                            circuloImg.src = "assets/circulo.png";
                            circuloImg.onload = function () {
                                caixaFalseImg.src = "assets/caixaFalse.png";
                                caixaFalseImg.onload = function () {
                                    vilaoImg.src = "assets/vader.png";
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



window.addEventListener("load",main);
document.addEventListener('keydown', key_adapter_personagem);