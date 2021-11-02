//classe para alterar elementos da tela

function ControllerElementos() {

  this.add_loading = function () {
    //nessa linha adicionar ao corpo a div frame!
    $('#frame').append('<div id="loading"></div>');
    $('#loading').append('<div></div>');
    $('#loading').append('<div></div>');
    $('#loading').append('<div></div>');
    $('#loading').append('<div></div>');
    $('#loading').addClass('lds-ellipsis')
  }

  this.remove_id = function (id) {
    $("#" + id).remove();
  }

  this.add_canvas = function (wdt_canvas, hgt_canvas) {
    //aki add o content canvas ao frame!
    let sintaxe = '<canvas id="canvas" width="' + wdt_canvas + 'px" height="' + hgt_canvas + 'px"></canvas>'
    $('#contentCanvas').append(sintaxe);
    $('#contentCanvas').addClass("motionL");//transição
  }

  this.add_inventario = function () {
    let quem_chamou_o_menu_supenso = ""
    $('#frame').append('<div class="motionL" id="overlay">'); //estudar a melhor transição aqui!
    $('#overlay').append('<div id="inventario" class="motionL"></div>');

    //Barra de comandos
    $('#inventario').append('<div class="container-inventario-comandos"></div>');
    $('.container-inventario-comandos').append('<div class="titulo-card-comandos">Comandos - <span class="aviso-painel"> Clique abaixo e obtenha as opções de direção</span> </div>');
    $('.container-inventario-comandos').append('<div class="card-comandos"></div>');
    $('.card-comandos').append('<div class="card-item-comandos">\
            <div id="b1" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b2" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b3" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b4" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b5" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b6" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b7" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b8" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b9" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b10" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b11" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b12" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b13" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b14" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b15" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b16" type="button" name ="vazio" class="item-card-comandos"></div>\
            <div id="b17" type="button" name ="vazio" class="item-card-comandos"></div>\
      </div>');
    $('.card-comandos').append('<div class="card-button-comandos"><div id="play" type="button" class="item-card-button-comandos"></div>\</div>');
    //temporario
    $('#inventario').append('<div class="container-inventario-menu-suspenso"></div>');
    $('.container-inventario-menu-suspenso').append('<div class="card-menu-suspenso">\
                <div id="b_esquerda" type="button" class="item-card-menu-suspenso">&#8592</div>\
                <div id="b_direita" type="button" class="item-card-menu-suspenso">&#8594</div>\
                <div id="b_cima" type="button" class="item-card-menu-suspenso">&#8593</div>\
                <div id="b_baixo" type="button" class="item-card-menu-suspenso">&#8595</div>\
                <div id="b_painel" type="button" class="item-card-menu-suspenso">P</div>\
                <div id="b_tunel" type="button" class="item-card-menu-suspenso">T</div>\
                <div id="b_remove" type="button" class="item-card-menu-suspenso">&#10060</div>\
          </div>');

    //Functions
    //implementar função pause
    $('#play').attr('name', 'play')
    $('#play').on('click', function () {
      $(".card-item-comandos").find("*").prop('disabled', true);
      $(".card-item-comandos").find("*").prop('opacity', 0.4);
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");

      if ($(this).attr('name') == 'pause') {
        $(this).css('background-image', "url('assets/play.png')");
        $(this).attr('name', 'play')
        controllerFase1.autorizar_movimento = false;
        if(controllerFase1.movimentos_validos.length>0)
           personagem.resetar_movimento();
        controllerFase1.movimentos_validos = []
        personagem.emMovimento = false;
      } else {
        $(this).css('background-image', "url('assets/pause.png')");
        $(this).attr('name', 'pause')
        controllerFase1.autorizar_movimento_personagem();
      }


    });
    //evento card suspenso
    for (let i = 0; i < 17; i++) {
      $('#b' + (i + 1)).on('click', function () {
        $('.container-inventario-menu-suspenso').css("visibility", "hidden");
        quem_chamou_o_menu_supenso = '#b' + (i + 1);
        $('.container-inventario-menu-suspenso').css('top', $(this).position().top + $(this).height() + 4)
        $('.container-inventario-menu-suspenso').css('left', $(this).position().left)
        $('.container-inventario-menu-suspenso').css("visibility", "visible");

      });
    }
    //menu suspenso
    $('#b_esquerda').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', ESQUERDA);
      $(quem_chamou_o_menu_supenso).text($(this).text())
      movimentos[quem_chamou_o_menu_supenso] = ESQUERDA;
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
    });
    $('#b_direita').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', DIREITA);
      $(quem_chamou_o_menu_supenso).text($(this).text())
      movimentos[quem_chamou_o_menu_supenso] = DIREITA;
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
    });
    $('#b_cima').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', CIMA);
      $(quem_chamou_o_menu_supenso).text($(this).text())
      movimentos[quem_chamou_o_menu_supenso] = CIMA;
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
    });
    $('#b_baixo').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'baixo');
      $(quem_chamou_o_menu_supenso).text($(this).text())
      movimentos[quem_chamou_o_menu_supenso] = BAIXO;
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");

    });
    $('#b_painel').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'painel');
      $(quem_chamou_o_menu_supenso).text($(this).text())
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = PAINEL;
    });
    $('#b_tunel').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'tunel');
      $(quem_chamou_o_menu_supenso).text($(this).text())
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = TUNEL;
    });
    $('#b_remove').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'vazio');
      $(quem_chamou_o_menu_supenso).text('')
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = VAZIO;
    });

    //Primeiro elemento do iventario! Dados do Persongem e Life
    $('#inventario').append('<div class="container-inventario-card-barralife"></div>');
    $('.container-inventario-card-barralife').css('top', 80)
    $('.container-inventario-card-barralife').append('<div class="card-barralife">\
            <div class="progress">\
                 <div class="progress-bar">\
                     <div id="valor-life" class="progress-valor">0s</div>\
                </div>\
            </div>\
        </div>');
    $('.container-inventario-card-barralife').append('<div class="item-img-person-clip"><img class="img-person-clip" src="assets/police_perfil.png"></div>');
    $('.container-inventario-card-barralife').append('<div class="item-nome-person-clip ">\
             <p id="person-name">Mr. Donald Trump</p>\
         </div>');

    $('#inventario').append('<div class="container-inventario-card-tempo-restante"></div>');
    $('.container-inventario-card-tempo-restante').css('top', 80)
    $('.container-inventario-card-tempo-restante').css('left', 580)
    $('.container-inventario-card-tempo-restante').append('<div class="card-tempo-restante">\
                <div class="titulo-card-tempo-restante">Hora do trem vir</div>\
                <div id="tempo-restante">00:02:00</div>\
        </div>');

    //tempo restante
    $('#inventario').append('<div class="container-inventario-card-cronometro"></div>');
    $('.container-inventario-card-cronometro').css('top', 80)
    $('.container-inventario-card-cronometro').css('left', 300)
    $('.container-inventario-card-cronometro').append('<div class="card-cronometro">\
                <div class="titulo-card-cronometro">Hora atual</div>\
                <div id="cronometro">00:00:00</div>\
        </div>');
    //objetivo
    $('#inventario').append('<div class="container-inventario-card-objetivo"></div>');
    $('.container-inventario-card-objetivo').css('top', 150)
    $('.container-inventario-card-objetivo').css('left', 0)
    // $('.container-inventario-card-cronometro').css('left', 200)
    $('.container-inventario-card-objetivo').append('<div class="card-objetivo">\
                <div class="titulo-card-objetivo">Objetivo</div>\
                <div class="item-card-objetivo">Vá em direção aos paineis de comando e abra as porteiras necessárias para os veículos atravessarem a via!.</div>\
        </div>');
    //Expressão Logica Card
    // $('#inventario').append('<div class="container-inventario-card-expressao-logica"></div>');
    // $('.container-inventario-card-expressao-logica').append('<div class="card-expressao-logica"></div>');
    // $('.card-expressao-logica').append('<div id="titulo-card-expressao-logica" class="titulo-card-expressao-logica">Conjução Lógica "OU"</div>');
    // //Item 1 - Expressão Logica Card
    // $('.card-expressao-logica').append('<div id="item-card-expressao-logica-1" class="item-card-expressao-logica"></div>');
    // $('#item-card-expressao-logica-1').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
    //    <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-1"></div>\
    //    <div id="" class="resultado-item-card-expressao-logica resultado-expressao-1"></div>');
    // //Item 2 - Expressão Logica Card
    // $('.card-expressao-logica').append('<div id="item-card-expressao-logica-2" class="item-card-expressao-logica"></div>');
    // $('#item-card-expressao-logica-2').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
    //    <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-2"></div>\
    //    <div id="" class="resultado-item-card-expressao-logica resultado-expressao-2"></div>');
    // //Item 3 - Expressão Logica Card
    // $('.card-expressao-logica').append('<div id="item-card-expressao-logica-3" class="item-card-expressao-logica"></div>');
    // $('#item-card-expressao-logica-3').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
    //    <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-3"></div>\
    //    <div id="" class="resultado-item-card-expressao-logica resultado-expressao-3"></div>');
    // //Item 4 - Expressão Logica Card
    // $('.card-expressao-logica').append('<div id="item-card-expressao-logica-4" class="item-card-expressao-logica"></div>');
    // $('#item-card-expressao-logica-4').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
    //    <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-4"></div>\
    //    <div id="" class="resultado-item-card-expressao-logica resultado-expressao-4"></div>');
    // // Card Bottões
    // $('#inventario').append('<div class="container-inventario-card-botoes"></div>');
    // $('.container-inventario-card-botoes').append('<div class="card-botoes"></div>');
    // $('.card-botoes').append('<div class="titulo-card-botoes">Menu interativo</div></div>');
    // //Bottão 1 - Controles
    // $('.card-botoes').append('<div id="item-card-botoes-controles" class="item-card-botoes">\
    //   <button class="btn-item-card-botoes aux-btn-item-card-botoes">Controles</button>\
    //   </div>');
    // //Bottão 2 - Verificar Respostas
    // $('.card-botoes').append('<div id="item-card-botoes-verificar-respostas" class="item-card-botoes">\
    //   <button class="btn-item-card-botoes aux-btn-item-card-botoes">Verificar Respostas</button>\
    //   </div>');
    // //Bottão 3 - Resetar Caixas
    // $('.card-botoes').append('<div id="item-card-botoes-resetar-caixas" class="item-card-botoes">\
    //   <button class="btn-item-card-botoes aux-btn-item-card-botoes">Resetar Caixas</button>\
    //   </div>');
    // //Bottão 4 - Sair do jogo
    // $('.card-botoes').append('<div id="item-card-botoes-sair-jogo" class="item-card-botoes">\
    //   <button class="btn-item-card-botoes aux-btn-item-card-botoes">Sair do jogo</button>\
    //   </div>');
  }

  //elementos do menu controles
  this.add_alerta_menu_controles = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    $('.alerta-container-close').on('click', function () {
      $('.alerta-container').remove();
    });

    $(".alerta-container").append('<div class="container-alerta-card-controles">\
       <div class="titulo-card-controles">Controles</div>\
        <div class="item-card-controles"></div>\
      </div>');


    //   <!-- <a class="alerta-container motionL" href="#">
    //   <span></span>
    //   <span></span>
    //   <span></span>
    //   <div class="alerta-container-close">X</div>
    //   <div class="container-alerta-card-controles">
    //     <div class="titulo-card-controles">Controles</div>
    //     <div class="item-card-controles">
    //     </div>
    //   </div>
    // </a> -->
  }


  this.add_alerta_menu_verificar_respostas = function (r1, r2, r3, r4) {
    $('.alerta-container').remove();

    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    $('.alerta-container-close').on('click', function () {
      $('.alerta-container').remove();
    });

    $(".alerta-container").append('<div class="container-alerta-card-verificar-respostas"></div>');
    $(".container-alerta-card-verificar-respostas").append('<div class="card-verificar-respostas"></div>');
    $(".card-verificar-respostas").append('<div class="titulo-card-verificar-respostas">Resultado Expressão "OU"</div>');
    //R1
    $(".card-verificar-respostas").append('<div class="item-card-expressao-logica item-card-verificar-respostas">\
    <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"\
        src="assets/caixagame.png" alt=""></div>\
    <div class="sintaxe-item-card-expressao-logica sintaxe-expressao-1"></div>\
    <div id="" class="resultado-item-card-expressao-logica resultado-expressao-1"></div>\
    </div>');
    if (r1 == 'ERRADO') $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-errado">' + r1 + '</div>');
    else $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">' + r1 + '</div>');
    //R2
    $(".card-verificar-respostas").append('<div class="item-card-expressao-logica item-card-verificar-respostas">\
    <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"\
        src="assets/caixagame.png" alt=""></div>\
    <div class="sintaxe-item-card-expressao-logica sintaxe-expressao-2"></div>\
    <div class="resultado-item-card-expressao-logica resultado-expressao-2"></div>\
    </div>');
    if (r2 == 'ERRADO') $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-errado">' + r2 + '</div>');
    else $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">' + r2 + '</div>');

    //R3
    $(".card-verificar-respostas").append('<div class="item-card-expressao-logica item-card-verificar-respostas">\
        <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"\
            src="assets/caixagame.png" alt=""></div>\
        <div  class="sintaxe-item-card-expressao-logica sintaxe-expressao-3"></div>\
        <div  class="resultado-item-card-expressao-logica resultado-expressao-3"></div>\
        </div>');
    if (r3 == 'ERRADO') $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-errado">' + r3 + '</div>');
    else $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">' + r3 + '</div>');
    //R4
    $(".card-verificar-respostas").append('<div class="item-card-expressao-logica item-card-verificar-respostas">\
      <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"\
          src="assets/caixagame.png" alt=""></div>\
      <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-4"></div>\
      <div id="" class="resultado-item-card-expressao-logica resultado-expressao-4"></div>\
      </div>');
    if (r4 == 'ERRADO') $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-errado">' + r4 + '</div>');
    else $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">' + r4 + '</div>');

    $('.sintaxe-expressao-1').text($('.sintaxe-expressao-1').text());
    $('.sintaxe-expressao-2').text($('.sintaxe-expressao-2').text());
    $('.sintaxe-expressao-3').text($('.sintaxe-expressao-3').text());
    $('.sintaxe-expressao-4').text($('.sintaxe-expressao-4').text());
  }
  this.add_alerta_menu_resetar_caixas = function () {
    //aguarde!

    //   <!-- <div class="container-alerta-card-resetar-caixas">
    //   <div class="card-botoes">

    //     <div class="titulo-card-resetar-caixas">Resetar Caixas?</div>

    //     <div class="item-card-resetar-caixas">
    //       <button class="btn-sim-item-card-resetar-caixas aux-btn-card-resetar-caixas">Sim</button>

    //     </div>

    //     <div class="item-card-resetar-caixas">
    //       <button class="btn-nao-item-card-resetar-caixas aux-btn-card-resetar-caixas">Não</button>
    //     </div>
    //   </div>
    // </div> -->
  }
  this.add_alerta_menu_sair_jogo = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    $('.alerta-container-close').on('click', function () {
      $('.alerta-container').remove();
    });

    $(".alerta-container").append('\
    <div class="container-alerta-card-sair-jogo">\
        <div class="titulo-card-sair-jogo">Sair do Jogo?</div>\
        <div class="card-botoes">\
            <div class="item-card-sair-jogo">\
              <button class="btn-sim-item-card-sair-jogo aux-btn-card-sair-jogo">Sim</button>\
          </div>\
          <div class="item-card-sair-jogo">\
             <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
         </div>\
        </div>\
    </div>');

    $(".btn-nao-item-card-sair-jogo").on("click", function () {
      $('.alerta-container').remove();
    })

  }
  this.alterar_nome_personagem_iventario = function (nome) {
    //person-name esta em no card do inventirio referente a life.
    $('#person-name').text(nome);
  }
  this.alterar_expressao_iventario = function (codigo_expressao, expressao) {
    $(".sintaxe-expressao-" + String(codigo_expressao)).text(String(codigo_expressao) + " - " + expressao + ":");
  }
  this.alterar_resultado_expressao_iventario = function (codigo_resultado, resultado) {
    $(".resultado-expressao-" + String(codigo_resultado)).text(resultado);
  }
  this.mover_camera = function (deslocamento) {
    $("#canvas").css("left", deslocamento);
  }
  this.alterar_valor_life_inventario = function (life) {
    $(".progress-bar").css("width", life + "s");
    $('#valor-life').text("" + life + " s");
  }
  this.get_cronometro = function () {
    return $("#cronometro");
  }
  this.get_cronometro_trem = function () {
    return $("#tempo-restante");
  }
}

   //Estrutura final inventario - modelo
        //   <div class="motionL " id="overlay">
        //   <div id="inventario">
        //     <div class="container-inventario-card-barralife">
        //       <div class="card-barralife">
        //         <div class="progress">
        //           <div class="progress-bar">
        //             <div id="valor-life" class="progress-valor">100%</div>
        //           </div>
        //         </div>
        //       </div>
        //       <div class="item-img-person-clip"><img class="img-person-clip" src="assets/caixa2.png"></div>
        //       <div class="item-nome-person-clip ">
        //         <p>Mr. Donald Trump</p>
        //       </div>
        //     </div>
        //     <!-- cronometro -->
        //     <div class="container-inventario-card-cronometro">
        //       <div class="card-cronometro">
        //         <div class="titulo-card-cronometro">Tempo</div>
        //         <div id="cronometro">00:00:00</div>
        //       </div>
        //     </div>
        //     <!-- container posicionado no inventario no local adequado -->
        //     <div class="container-inventario-card-expressao-logica">
        //       <div class="card-expressao-logica">
        //         <div class="titulo-card-expressao-logica">Conjução Lógica "OU"</div>
        //         <div class="item-card-expressao-logica">
        //           <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"
        //               src="assets/caixagame.png" alt=""></div>
        //           <div id="sintaxe-expressao-1" class="sintaxe-item-card-expressao-logica"></div>
        //           <div id="resultado-expressao-1" class="resultado-item-card-expressao-logica"></div>
        //         </div>
        //         <div class="item-card-expressao-logica">
        //           <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"
        //               src="assets/caixagame.png" alt=""></div>
        //           <div id="sintaxe-expressao-2" class="sintaxe-item-card-expressao-logica"></div>
        //           <div id="resultado-expressao-2" class="resultado-item-card-expressao-logica"></div>
        //         </div>
        //         <div class="item-card-expressao-logica">
        //           <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"
        //               src="assets/caixagame.png" alt=""></div>
        //           <div id="sintaxe-expressao-3" class="sintaxe-item-card-expressao-logica"></div>
        //           <div id="resultado-expressao-3" class="resultado-item-card-expressao-logica"></div>
        //         </div>
        //         <div class="item-card-expressao-logica">
        //           <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"
        //               src="assets/caixagame.png" alt=""></div>
        //           <div id="sintaxe-expressao-4" class="sintaxe-item-card-expressao-logica"></div>
        //           <div id="resultado-expressao-4" class="resultado-item-card-expressao-logica"></div>
        //         </div>
        //       </div>
        //     </div>
        //     <!-- card bottoes -->
        //     <div class="container-inventario-card-botoes">
        //       <div class="card-botoes">

        //         <div class="titulo-card-botoes">Menu interativo</div>
        //         <!-- b1 -->
        //         <div class="item-card-botoes">
        //           <button class="btn-item-card-botoes aux-btn-item-card-botoes">Controles</button>
        //           <!-- <div class="sintaxe-item-card-botoes">Controles</div> -->
        //         </div>
        //         <!-- b2 -->
        //         <div class="item-card-botoes">
        //           <button class="btn-item-card-botoes aux-btn-item-card-botoes">Verificar Respostas</button>

        //         </div>
        //         <!-- b3 -->
        //         <div class="item-card-botoes">
        //           <button class="btn-item-card-botoes aux-btn-item-card-botoes">Resetar caixas</button>
        //         </div>
        //         <!-- b4 -->
        //         <div class="item-card-botoes">
        //           <button class="btn-item-card-botoes aux-btn-item-card-botoes">Sair do jogo</button>

        //         </div>

        //       </div>
        //     </div>
        //   </div>
        // </div>