//App
//personagens
let personagem = new Personagem(); //globalvar
//Outras variaveis
let EM_JOGO = true;
let EM_PAUSE = true;
let FASE = 1;

let movimentos = {
    '#b1': VAZIO, '#b2': VAZIO, '#b3': VAZIO, '#b4': VAZIO, '#b5': VAZIO, '#b6': VAZIO,
    '#b7': VAZIO, '#b8': VAZIO, '#b9': VAZIO, '#b10': VAZIO, '#b11': VAZIO, '#b12': VAZIO, '#b13': VAZIO,
    '#b14': VAZIO, '#b15': VAZIO, '#b16': VAZIO, '#b17': VAZIO
};
//intervalos
var intervalo_sprite_persongem;//global mudança de sprite person
var intervalo_cronometro; //global!
//controlles
var elementos_inventario = new ControllerElementos(personagem, movimentos); //Elementos do inventario!
var cronometro = new Cronometro(); //global
var cronometroTrem = new Cronometro(); //global
var controllerFase1 = new ControllerFase1(personagem, movimentos, elementos_inventario, cronometro, cronometroTrem);
var controllerFase3 = new ControllerFase3(personagem, movimentos, elementos_inventario, cronometro, cronometroTrem);
// var sound_fundo = new Howl({
//     src: ["audio\\tema.mp3"],
//     volume: 0.10,
//     html5: true,
//     loop: true,
// });
var sound_trem = new Howl({
    src: ["audio\\som_trem3.mp3"],
    volume: 0.15,
    html5: true,
    // onend: function() {
    //     console.log('Finished!');
    // }
});
//direcionador
function main() {
    elementos_inventario.add_loading();
    carregar_imagens_fase_1();
    // document.addEventListener('keydown', key_adapter_personagem);
    intervalo_sprite_persongem = setInterval(function () {
        personagem.podeMudarSprite = true;
    }, 1000 / 10);
    thead_movimento_jogo()

    // myVar = setInterval(myTimer, 1000 / 10);
}

function checar_loop_game() {
    //veridicar fase ativa
    if (EM_JOGO) {

        if (!EM_PAUSE) {

            if (FASE == 1) {

                if (!controllerFase1.checar_fim_fase())
                    controllerFase1.loop_game();

                else {
                    EM_PAUSE = true;
                    cronometro.set_intervalo(false);
                    elementos_inventario.add_alerta_proxima_fase(2);
                    //ADD ALERTA
                }

            } else if (FASE == 2) {
                if (!controllerFase1.checar_fim_fase())
                    controllerFase1.loop_game();
                else {
                    EM_PAUSE = true;
                    cronometro.set_intervalo(false);
                    elementos_inventario.add_alerta_proxima_fase(2);
                    //ADD ALERTA
                }

            } else if (FASE == 3) {
                if (!controllerFase1.checar_fim_fase())
                    controllerFase1.loop_game();
                else {
                    EM_PAUSE = true;
                    cronometro.set_intervalo(false);
                    elementos_inventario.add_alerta_proxima_fase(2); //tela cadastro pontuação!
                    //ADD ALERTA
                }

            }
        }
        // e em pause == false!

    }
    //EMJOGO FALSE = GAME_OVER
    if (personagem.checar_game_over()) {
        EM_PAUSE = true
        EM_JOGO = false
        elementos_inventario.add_alerta_game_over()
    } else
        window.requestAnimationFrame(checar_loop_game);

}
//metodo para todos os controllers
function thead_movimento_jogo() {
    controllerFase1.movimentos();
    setTimeout(thead_movimento_jogo, 1000 / 10);//atualizar sprite
}

function carregar_imagens_fase_1() {
    perImg.src = "assets/polic.png";
    // bordaInventarioImg.src = "assets/fundo2.png";
    perImg.onload = function () {
        //inicio load
        fase1c1Img.src = "mapas/fase1_renovada/camada1_livre.png";
        fase1c1Img.onload = function () {
            fase1c2Img.src = "mapas/fase1_renovada/camada2_trilhos.png";
            fase1c2Img.onload = function () {
                fase1c3Img.src = "mapas/fase1_renovada/camada3_obstaculos.png";
                fase1c3Img.onload = function () {
                    tremImg.src = "assets/trem.png";
                    tremImg.onload = function () {
                        pegadasImg.src = "assets/pegadas.png";
                        pegadasImg.onload = function () {
                            circuloImg.src = "assets/caixaenergia.png";
                            circuloImg.onload = function () {
                                painelImg.src = "assets/painel.png";
                                painelImg.onload = function () {
                                    barreiraImg.src = "assets/barreira.png";
                                    barreiraImg.onload = function () {
                                        carro1Img.src = "assets/carro1.png";
                                        carro1Img.onload = function () {
                                            tunelImg.src = 'assets/tunel.png';
                                            tunelImg.onload = function () {
                                                carro2Img.src = "assets/carro2.png";
                                                carro2Img.onload = function () {
                                                    setTimeout(function () {
                                                        elementos_inventario.remove_id('loading');
                                                        //adicionar Canvas
                                                        elementos_inventario.add_canvas(TAM_WIDTH_TELA_CANVAS, TAM_HEGTH_TELA_CANVAS)
                                                        //adicionar iventario
                                                        elementos_inventario.add_inventario();
                                                        elementos_inventario.add_alerta_menu_tutorial_p1()
                                                        //Carregar elementos_inventario do iventario como nome do persongem!
                                                        elementos_inventario.alterar_nome_personagem_iventario("Operador");
                                                        //refatorar essa parte.!
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
        }
    }
}
window.addEventListener("load", main);
// document.addEventListener('keydown', key_adapter_personagem);