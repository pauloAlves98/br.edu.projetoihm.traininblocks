//classe para alterar elementos da tela

function ControllerElementos(personagem,movimentos) {

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
            <div id="b1" type="button" name ="vazio" class="item-card-comandos">1</div>\
            <div id="b2" type="button" name ="vazio" class="item-card-comandos">2</div>\
            <div id="b3" type="button" name ="vazio" class="item-card-comandos">3</div>\
            <div id="b4" type="button" name ="vazio" class="item-card-comandos">4</div>\
            <div id="b5" type="button" name ="vazio" class="item-card-comandos">5</div>\
            <div id="b6" type="button" name ="vazio" class="item-card-comandos">6</div>\
            <div id="b7" type="button" name ="vazio" class="item-card-comandos">7</div>\
            <div id="b8" type="button" name ="vazio" class="item-card-comandos">8</div>\
            <div id="b9" type="button" name ="vazio" class="item-card-comandos">9</div>\
            <div id="b10" type="button" name ="vazio" class="item-card-comandos">10</div>\
            <div id="b11" type="button" name ="vazio" class="item-card-comandos">11</div>\
            <div id="b12" type="button" name ="vazio" class="item-card-comandos">12</div>\
            <div id="b13" type="button" name ="vazio" class="item-card-comandos">13</div>\
            <div id="b14" type="button" name ="vazio" class="item-card-comandos">14</div>\
            <div id="b15" type="button" name ="vazio" class="item-card-comandos">15</div>\
            <div id="b16" type="button" name ="vazio" class="item-card-comandos">16</div>\
            <div id="b17" type="button" name ="vazio" class="item-card-comandos">17</div>\
      </div>');
    $('.card-comandos').append('<div class="card-button-comandos"><div id="play" type="button" class="item-card-button-comandos"></div>\</div>');
    //temporario
    $('#inventario').append('<div class="container-inventario-menu-suspenso"></div>');
    $('.container-inventario-menu-suspenso').append('<div class="card-menu-suspenso">\
                <div id="b_esquerda" type="button" class="item-card-menu-suspenso"></div>\
                <div id="b_direita" type="button" class="item-card-menu-suspenso"></div>\
                <div id="b_cima" type="button" class="item-card-menu-suspenso"></div>\
                <div id="b_baixo" type="button" class="item-card-menu-suspenso"></div>\
                <div id="b_painel" type="button" class="item-card-menu-suspenso"></div>\
                <div id="b_tunel" type="button" class="item-card-menu-suspenso"></div>\
                <div id="b_remove" type="button" class="item-card-menu-suspenso"></div>\
                <div id="b_limpar_tudo" type="button" class="item-card-menu-suspenso-limpar-tudo">Limpar tudo</div>\
          </div>');

    //Functions
    //implementar função pause
    $('#play').attr('name', 'play')

    $('#play').on('click', function () {//em menu_game!
      if (EM_JOGO && !EM_PAUSE) {
        $(".card-item-comandos").find("*").prop('disabled', true);
        $('.container-inventario-menu-suspenso').css("visibility", "hidden");
        if ($(this).attr('name') == 'pause') {
          $(this).css('background-image', "url('assets/play.png')");
          $(this).attr('name', 'play')
          for (let i = 0; i < 17; i++) {
            $('#b' + (i + 1)).css('opacity', 1.0)
          }
          personagem.autorizar_movimento = false;
       
          if (personagem.movimentos_validos.length > 0)
            personagem.resetar_movimento();

          personagem.movimentos_validos = []
          personagem.emMovimento = false;

          if(FASE == 1 || FASE == 2){
            personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO_LIFE)
            personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO_LIFE)
            elementos_inventario.add_alerta_comum(MSG_DANO_MOVIMENTO_SUSPENSO)
           //elementos_inventario.add_alerta_game_over()
          } //SUSPENDEU O MOVIMENTO
             
        } else {
          $(this).css('background-image', "url('assets/pause.png')");
          $(this).attr('name', 'pause')
          personagem.autorizar_movimento_personagem(movimentos);
          
          //MUDAR COR PARA CINZA 
          for (let i = 0; i < 17; i++) {
            $('#b' + (i + 1)).css('opacity', 0.7)
          }
        }
      }

    });
    //evento card suspenso
    for (let i = 0; i < 17; i++) {
      $('#b' + (i + 1)).on('click', function () {
        $('.container-inventario-menu-suspenso').css("visibility", "hidden");
        quem_chamou_o_menu_supenso = '#b' + (i + 1);
        $('.container-inventario-menu-suspenso').css('top', $(this).position().top + $(this).height() + 4)
        $('.container-inventario-menu-suspenso').css('left', $(this).position().left)
        if ($('#play').attr('name') != 'pause')
          $('.container-inventario-menu-suspenso').css("visibility", "visible");
        // alert($(quem_chamou_o_menu_supenso).css('background-color')=='rgb(255, 255, 259)')

      });
    }
    //menu suspenso
    $('#b_esquerda').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', ESQUERDA);
      $(quem_chamou_o_menu_supenso).text("")
      $(quem_chamou_o_menu_supenso + ' div').remove();
      $(quem_chamou_o_menu_supenso).append('<div class="div-aux-image-painel"></div>');
      let bg = $(this).css('background-image');
      bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      $(quem_chamou_o_menu_supenso + ' div').css('background-image', 'url(' + bg + ')');
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = ESQUERDA;
    });
    $('#b_direita').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', DIREITA);
      $(quem_chamou_o_menu_supenso).text("")
      $(quem_chamou_o_menu_supenso + ' div').remove();
      $(quem_chamou_o_menu_supenso).append('<div class="div-aux-image-painel"></div>');
      let bg = $(this).css('background-image');
      bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      $(quem_chamou_o_menu_supenso + ' div').css('background-image', 'url(' + bg + ')');
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = DIREITA;
    });
    $('#b_cima').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', CIMA);
      $(quem_chamou_o_menu_supenso).text("")
      $(quem_chamou_o_menu_supenso + ' div').remove();
      $(quem_chamou_o_menu_supenso).append('<div class="div-aux-image-painel"></div>');
      let bg = $(this).css('background-image');
      bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      $(quem_chamou_o_menu_supenso + ' div').css('background-image', 'url(' + bg + ')');
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = CIMA;
    });
    $('#b_baixo').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'baixo');
      $(quem_chamou_o_menu_supenso).text("")
      $(quem_chamou_o_menu_supenso + ' div').remove();
      $(quem_chamou_o_menu_supenso).append('<div class="div-aux-image-painel"></div>');
      let bg = $(this).css('background-image');
      bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      $(quem_chamou_o_menu_supenso + ' div').css('background-image', 'url(' + bg + ')');
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = BAIXO;

    });
    $('#b_painel').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'painel');
      $(quem_chamou_o_menu_supenso).text("")
      $(quem_chamou_o_menu_supenso + ' div').remove();
      $(quem_chamou_o_menu_supenso).append('<div class="div-aux-image-painel"></div>');
      let bg = $(this).css('background-image');
      bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      $(quem_chamou_o_menu_supenso + ' div').css('background-image', 'url(' + bg + ')');
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = PAINEL;
    });
    $('#b_tunel').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'tunel');
      $(quem_chamou_o_menu_supenso).text("")
      $(quem_chamou_o_menu_supenso + ' div').remove();
      $(quem_chamou_o_menu_supenso).append('<div class="div-aux-image-painel"></div>');
      let bg = $(this).css('background-image');
      bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
      $(quem_chamou_o_menu_supenso + ' div').css('background-image', 'url(' + bg + ')');
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = TUNEL;
    });
    $('#b_remove').on('click', function () {
      $(quem_chamou_o_menu_supenso).attr('name', 'vazio');
      $(quem_chamou_o_menu_supenso + ' div').remove();
      $(quem_chamou_o_menu_supenso).text(quem_chamou_o_menu_supenso.replace("#b", ""))
      $('.container-inventario-menu-suspenso').css("visibility", "hidden");
      movimentos[quem_chamou_o_menu_supenso] = VAZIO;
    });
    $('#b_limpar_tudo').on('click', function () {
      let quem_chamou_o_menu_supenso_aux = '';
      for (let i = 0; i < 17; i++) {
        quem_chamou_o_menu_supenso_aux = '#b' + (i + 1);
        $(quem_chamou_o_menu_supenso_aux).attr('name', 'vazio');
        $(quem_chamou_o_menu_supenso_aux + ' div').remove();
        $(quem_chamou_o_menu_supenso_aux).text(quem_chamou_o_menu_supenso_aux.replace("#b", ""))
        $('.container-inventario-menu-suspenso').css("visibility", "hidden");
        movimentos[quem_chamou_o_menu_supenso_aux] = VAZIO;
        // alert($(quem_chamou_o_menu_supenso).css('background-color')=='rgb(255, 255, 259)')    
      }
    });

    //Primeiro elemento do iventario! Dados do Persongem e Life
    $('#inventario').append('<div class="container-inventario-card-barralife"></div>');
    $('.container-inventario-card-barralife').css('top', 80)
    $('.container-inventario-card-barralife').append('<div class="card-barralife">\
            <div class="progress">\
                 <div class="progress-bar">\
                     <div id="valor-life" class="progress-valor">100%</div>\
                     <div id="progress-tempo">+0s</div>\
                </div>\
            </div>\
        </div>');
    $('.container-inventario-card-barralife').append('<div class="item-img-person-clip"><img class="img-person-clip" src="assets/police_perfil.png"></div>');
    $('.container-inventario-card-barralife').append('<div class="item-nome-person-clip ">\
             <p id="person-name">Operador</p>\
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
                <div id="msg_objetivo" class="item-card-objetivo"></div>\
        </div>');
//Vá em direção às <img   width="20px" height="25px" src = "assets/comando_painel.png" alt="alavanca"> e abra as barreiras ( <img   width="50px" height="30px" src = "assets/barreira_inventario.png" alt="barreiras">) necessárias para <span class="span-quantidade-veiculos" id="quantidade_veiculos">10</span> veículos atravessarem a via!
  }
  this.alterar_objetivo = function (tag_html) {
    $('#msg_objetivo div').remove()
    $('#msg_objetivo').append(tag_html)
    // $('.item-card-objetivo').append(tag_html)
  }
  this.alterar_quantidade_veiculos_inventario = function (nova_quant) {
    $('#quantidade_veiculos').text(nova_quant)
  }
  this.get_url_bakcground_image = function (id) {
    let bg = $(id).css('background-image');
    bg = bg.replace('url(', '').replace(')', '').replace(/\"/gi, "");
    alert(bg)
    return bg;
  }
  this.set_background_image = function (id, url) {
    $(id).css('background-size', '95% 95%');
    $(id).css('background-image', 'url(' + url + ')');
  }
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
  }

  this.add_alerta_menu_tutorial_p1 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial">Olá, seja bem vindo ao <br> Train in <b class="titulo-span-tutorial">Blocks</b> <br><br></div>\
        <br>\
        <div class="card-botoes">\
        <div class="item-card-tutorial">\
              <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
        </div>\
       <div class="item-card-tutorial">\
              <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
        </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
     // EM_JOGO = true;
      EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

    $(".btn-proximo-item-tutorial").on("click", this.add_alerta_menu_tutorial_p2)

  }
  this.add_alerta_menu_tutorial_p2 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial">Fique sempre atento aos objetivos expostos no canto inferior do inventário <br> <img   width="80%" height="40px" src = "assets/objetivo.png" alt="objetivo"><br><br></div>\
        <div class="card-botoes">\
          <div class="item-card-tutorial">\
             <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p3() //ficou sem contexto!
    });
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p1() //ficou sem contexto!
    });
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
      //EM_JOGO = true;
      EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

  }

  this.add_alerta_menu_tutorial_p3 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial">É necessário manusear as alavancas <img   width="40px" height="60px" src = "assets/comando_painel.png" alt="alavanca"> para abrir ou fechar as barreiras <img   width="60px" height="50px" src = "assets/barreira_inventario.png" alt="barreiras"><br><br></div>\
        <div class="card-botoes">\
          <div class="item-card-tutorial">\
             <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p4() //ficou sem contexto!
    });
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p2() //ficou sem contexto!
    });
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
      //EM_JOGO = true;
      EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

  }
  this.add_alerta_menu_tutorial_p4 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial">Utilize a barra de comandos para executar os movimentos do jogo <br> <img   width="80%" height="40px" src = "assets/barra_comandos.png" alt="barra de comandos"> Aperte o botão  <img   width="40px" height="30px" src = "assets/play.png" alt="play"> quando estiver pronto!<br> </div>\
        <div class="card-botoes">\
        <div class="item-card-tutorial">\
        <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
     </div>\
          <div class="item-card-tutorial">\
            <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p5() //ficou sem contexto!
    });
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p3() //ficou sem contexto!
    });
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
     // EM_JOGO = true;
     EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

  }
  this.add_alerta_menu_tutorial_p5 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial">Os movimentos sempre serão lidos da esquerda para direita começando do quadrado de nº 1 <br> <img width="80%" height="40px" src = "assets/barra_comandos.png" alt="barra de comandos"><br><br></div>\
        <div class="card-botoes">\
        <div class="item-card-tutorial">\
        <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
     </div>\
          <div class="item-card-tutorial">\
            <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p6() //ficou sem contexto!
    });
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p4() //ficou sem contexto!
    });
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
     // EM_JOGO = true;
     EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

  }
  this.add_alerta_menu_tutorial_p6 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial"> Os movimentos são: <br> <b class="exemplo-comandos-tutorial"><img width="20px" height="20px" src = "assets/seta_direita.png" alt="play">: Mover uma casa para direita</b>\
        / <b class="exemplo-comandos-tutorial"><img width="20px" height="20px" src = "assets/seta_esquerda.png" alt="esquerda">: Mover uma casa para esquerda</b><br>\
        <b class="exemplo-comandos-tutorial"><img width="30px" height="20px" src = "assets/seta_cima.png" alt="cima">: Mover uma casa para cima</b>\
        /<b class="exemplo-comandos-tutorial"><img width="30px" height="20px" src = "assets/seta_cima.png" alt="baixo">: Mover uma casa para baixo</b><br>\
       <b class="exemplo-comandos-tutorial"><img width="30px" height="20px" src = "assets/comando_painel.png" alt="alavanca">: Abrir/Fechar barreira</b><br>\
       <b class="exemplo-comandos-tutorial"><img width="60px" height="30px" src = "assets/tunel.png" alt="tunel">: Entrar/Sair Túnel</b>\
       </div>\
        <div class="card-botoes">\
         <div class="item-card-tutorial">\
            <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
         </div>\
          <div class="item-card-tutorial">\
            <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p7() //ficou sem contexto!
    });
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p5() //ficou sem contexto!
    });
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
      //EM_JOGO = true;
      EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

  }
  this.add_alerta_menu_tutorial_p7 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial"> Outros Movimentos: <br> <b class="exemplo-comandos-tutorial"><img width="20px" height="20px" src = "assets/remover.png" alt="play">: Remover um comando</b>\
        / <b class="exemplo-comandos-tutorial"> Limpar tudo: Remove todos os comandos</b><br><br><br><br>\
       </div>\
        <div class="card-botoes">\
         <div class="item-card-tutorial">\
            <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
         </div>\
          <div class="item-card-tutorial">\
            <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
          </div>\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p8() //ficou sem contexto!
    });
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p6() //ficou sem contexto!
    });
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
      //EM_JOGO = true;
      EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

  }
  this.add_alerta_menu_tutorial_p8 = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial"> O jogador sofrerá danos ao:<br> <b class="exemplo-comandos-tutorial"> *Colidir com Barreiras, cavaletes, veículos e afins</b>\
        <b class="exemplo-comandos-tutorial">*Existir uma colisão entre o trem e o veículo / Não cumprir o objetivo durante a execução</b><br>\
        <b class="exemplo-comandos-tutorial">*Executar erroneamente os movimentos:</b>\
        <b class="exemplo-comandos-tutorial"><img width="30px" height="20px" src = "assets/comando_painel.png" alt="alavanca"></b>\
       /<b class="exemplo-comandos-tutorial"><img width="60px" height="30px" src = "assets/tunel.png" alt="tunel"></b>\
       </div>\
       <div class="card-botoes">\
       <div class="item-card-tutorial">\
          <button class="btn-pular-item-tutorial aux-btn-card-tutorial">Pular</button>\
       </div>\
       <div class="item-card-tutorial">\
         <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
       </div>\
       <div class="item-card-tutorial">\
         <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Próximo</button>\
       </div>\
     </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_final() //ficou sem contexto!
    });
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      new ControllerElementos().add_alerta_menu_tutorial_p7() //ficou sem contexto!
    });
    $(".btn-pular-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
     // EM_JOGO = true;
     EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    })

  }
  this.add_alerta_menu_tutorial_final = function () {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial">Fique atento ao relógio do jogo <b class="titulo-span-tutorial">(Hora atual)</b> e ao relógio que notifica o horário do trem vir <b class="titulo-span-tutorial">(Hora do Trem vir)</b><br> Bom jogo!</div>\
        <div class="card-botoes">\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Jogar</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
      //EM_JOGO = true;
      EM_PAUSE = false;
      cronometro.set_intervalo(true);
      let c = new ControllerElementos()
      // sound_fundo.play()
      c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      setTimeout(function () {
        c.remove_add_alerta_comum()
      }, 5000)
    });
  }
  this.add_alerta_proxima_fase = function (nova_fase) {
    $('.alerta-container').remove();
    $("#frame").append('<a class="alerta-container motionL" href="#"></a>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial"> Você finalizou essa fase, clique no botão abaixo e avance para próxima! <br> <b class="titulo-span-tutorial">Fase de nº '+nova_fase+'</b></div>\
        <div class="card-botoes">\
          <div class="item-card-tutorial">\
            <button class="btn-proximo-item-tutorial aux-btn-card-tutorial">Jogar</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-proximo-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
      //EM_JOGO = true;
      EM_PAUSE = false;
      FASE = nova_fase;
      cronometro.set_intervalo(true);
      // let c = new ControllerElementos()
      // // sound_fundo.play()
      // c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      // setTimeout(function () {
      //   c.remove_add_alerta_comum()
      // }, 5000)
    });
  }

  this.add_alerta_game_over = function () {
    $('.alerta-container').remove();

    $("#frame").append('<div class="alerta-container motionL"></div>');
    $(".alerta-container").append('<span></span><span></span><span></span><span></span>');
    // $(".alerta-container").append('<div class="alerta-container-close">X</div>');

    // $('.alerta-container-close').on('click', function () {
    //   $('.alerta-container').remove();
    // });

    $(".alerta-container").append('\
    <div class="container-alerta-card-tutorial">\
        <div class="titulo-card-tutorial"><b class="titulo-span-tutorial">GAME OVER</b><br>Não foi dessas vez! <br> Clique em voltar e Tente novamente <br></div>\
        <div class="card-botoes">\
          <div class="item-card-tutorial">\
            <button class="btn-voltar-item-tutorial aux-btn-card-tutorial">Voltar</button>\
          </div>\
        </div>\
    </div>');
    //     <div class="item-card-sair-jogo">\
    //     <button class="btn-nao-item-card-sair-jogo aux-btn-card-sair-jogo">Não</button>\
    // </div>\
    $(".btn-voltar-item-tutorial").on("click", function (params) {
      $('.alerta-container').remove();
      window.location.replace("game.html");
      //EM_JOGO = true;
      // let c = new ControllerElementos()
      // // sound_fundo.play()
      // c.add_alerta_comum("JOGO INICIADO, BOA SORTE!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
      // setTimeout(function () {
      //   c.remove_add_alerta_comum()
      // }, 5000)
    });
  }

  this.add_alerta_comum = function (msg) {
    $('.alerta-container-comum').remove();
    $("#frame").append('<a class="alerta-container-comum motionL-alerta-comum" href="#"></a>');
    $(".alerta-container-comum").append('<span></span><span></span><span></span><span></span>');
    $(".alerta-container-comum").append('<div class="alerta-container-close">X</div>');


    $('.alerta-container-close').on('click', function () {
      $('.alerta-container-comum').remove();
    });

    $(".alerta-container-comum").append('\
    <div class="container-alerta-card-comum">\
        <div class="titulo-card-comum">Menu</div>\
        </div>\
    </div>');
    $(".titulo-card-comum").text(msg)
    // $(".btn-nao-item-card-sair-jogo").on("click", function () {
    //   $('.alerta-container-comum').remove();
    // })

  }
  this.remove_add_alerta_comum = function () {
    $('.alerta-container-comum').css('opacity', 0.1)
    setTimeout(function () { $('.alerta-container-comum').remove(); }, 500);

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
    $(".progress-bar").css("width", life + "%");
    $('#valor-life').text("" + life + "%");
  }
  this.alterar_valor_dano_tempo_inventario = function (dano) {
    $('#progress-tempo').text("+" + dano + "s");
  }
  this.get_cronometro = function () {
    return $("#cronometro");
  }
  this.get_cronometro_trem = function () {
    return $("#tempo-restante");
  }
}
