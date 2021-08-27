//classe para alterar elementos da tela

function ControllerElementos() {

  this.add_loading = function () {
    //nessa linha adicionar ao corpo a div frame!
    $('#frame').append('<div id="loading"></div>');
    $('#loading').append('<div></div>');
    $('#loading').append('<div></div>');
    $('#loading').append('<div></div>');
    $('#loading').append('<div></div>');
    addClass('loading', 'lds-ellipsis');
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
    $('#frame').append('<div class="motionL" id="overlay">'); //estudar a melhor transição aqui!
    $('#overlay').append('<div id="inventario" class="motionL"></div>');
    //Primeiro elemento do iventario! Dados do Persongem e Life
    $('#inventario').append('<div class="container-inventario-card-barralife"></div>');
    $('.container-inventario-card-barralife').append('<div class="card-barralife">\
            <div class="progress">\
                 <div class="progress-bar">\
                     <div id="valor-life" class="progress-valor">100%</div>\
                </div>\
            </div>\
        </div>');
    $('.container-inventario-card-barralife').append('<div class="item-img-person-clip"><img class="img-person-clip" src="assets/caixa2.png"></div>');
    $('.container-inventario-card-barralife').append('<div class="item-nome-person-clip ">\
             <p id="person-name">Mr. Donald Trump</p>\
         </div>');
    //Cronometro
    $('#inventario').append('<div class="container-inventario-card-cronometro"></div>');
    $('.container-inventario-card-cronometro').append('<div class="card-cronometro">\
                <div class="titulo-card-cronometro">Tempo</div>\
                <div id="cronometro">00:00:00</div>\
        </div>');
    //Expressão Logica Card
    $('#inventario').append('<div class="container-inventario-card-expressao-logica"></div>');
    $('.container-inventario-card-expressao-logica').append('<div class="card-expressao-logica"></div>');
    $('.card-expressao-logica').append('<div id="titulo-card-expressao-logica" class="titulo-card-expressao-logica">Conjução Lógica "OU"</div>');
    //Item 1 - Expressão Logica Card
    $('.card-expressao-logica').append('<div id="item-card-expressao-logica-1" class="item-card-expressao-logica"></div>');
    $('#item-card-expressao-logica-1').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
       <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-1"></div>\
       <div id="" class="resultado-item-card-expressao-logica resultado-expressao-1"></div>');
    //Item 2 - Expressão Logica Card
    $('.card-expressao-logica').append('<div id="item-card-expressao-logica-2" class="item-card-expressao-logica"></div>');
    $('#item-card-expressao-logica-2').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
       <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-2"></div>\
       <div id="" class="resultado-item-card-expressao-logica resultado-expressao-2"></div>');
    //Item 3 - Expressão Logica Card
    $('.card-expressao-logica').append('<div id="item-card-expressao-logica-3" class="item-card-expressao-logica"></div>');
    $('#item-card-expressao-logica-3').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
       <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-3"></div>\
       <div id="" class="resultado-item-card-expressao-logica resultado-expressao-3"></div>');
    //Item 4 - Expressão Logica Card
    $('.card-expressao-logica').append('<div id="item-card-expressao-logica-4" class="item-card-expressao-logica"></div>');
    $('#item-card-expressao-logica-4').append('<div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica" src="assets/caixagame.png" alt=""></div>\
       <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-4"></div>\
       <div id="" class="resultado-item-card-expressao-logica resultado-expressao-4"></div>');
    // Card Bottões
    $('#inventario').append('<div class="container-inventario-card-botoes"></div>');
    $('.container-inventario-card-botoes').append('<div class="card-botoes"></div>');
    $('.card-botoes').append('<div class="titulo-card-botoes">Menu interativo</div></div>');
    //Bottão 1 - Controles
    $('.card-botoes').append('<div id="item-card-botoes-controles" class="item-card-botoes">\
      <button class="btn-item-card-botoes aux-btn-item-card-botoes">Controles</button>\
      </div>');
    //Bottão 2 - Verificar Respostas
    $('.card-botoes').append('<div id="item-card-botoes-verificar-respostas" class="item-card-botoes">\
      <button class="btn-item-card-botoes aux-btn-item-card-botoes">Verificar Respostas</button>\
      </div>');
    //Bottão 3 - Resetar Caixas
    $('.card-botoes').append('<div id="item-card-botoes-resetar-caixas" class="item-card-botoes">\
      <button class="btn-item-card-botoes aux-btn-item-card-botoes">Resetar Caixas</button>\
      </div>');
    //Bottão 4 - Sair do jogo
    $('.card-botoes').append('<div id="item-card-botoes-sair-jogo" class="item-card-botoes">\
      <button class="btn-item-card-botoes aux-btn-item-card-botoes">Sair do jogo</button>\
      </div>');
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


  this.add_alerta_menu_verificar_respostas = function () {
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
    $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">Correto</div>');
    //R2
    $(".card-verificar-respostas").append('<div class="item-card-expressao-logica item-card-verificar-respostas">\
    <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"\
        src="assets/caixagame.png" alt=""></div>\
    <div class="sintaxe-item-card-expressao-logica sintaxe-expressao-2"></div>\
    <div class="resultado-item-card-expressao-logica resultado-expressao-2"></div>\
    </div>');
    $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">Correto</div>');
    //R3
    $(".card-verificar-respostas").append('<div class="item-card-expressao-logica item-card-verificar-respostas">\
        <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"\
            src="assets/caixagame.png" alt=""></div>\
        <div  class="sintaxe-item-card-expressao-logica sintaxe-expressao-3"></div>\
        <div  class="resultado-item-card-expressao-logica resultado-expressao-3"></div>\
        </div>');
    $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">Correto</div>');
    //R4
    $(".card-verificar-respostas").append('<div class="item-card-expressao-logica item-card-verificar-respostas">\
      <div class="icon-item-card-expressao-logica"><img class="img-icon-item-card-expressao-logica"\
          src="assets/caixagame.png" alt=""></div>\
      <div id="" class="sintaxe-item-card-expressao-logica sintaxe-expressao-4"></div>\
      <div id="" class="resultado-item-card-expressao-logica resultado-expressao-4"></div>\
      </div>');
    $(".card-verificar-respostas").append('<div class="resultado-verificar-respostas-correto">Correto</div>');


    $('.sintaxe-expressao-1').text( $('.sintaxe-expressao-1').text());
    $('.sintaxe-expressao-2').text( $('.sintaxe-expressao-2').text());
    $('.sintaxe-expressao-3').text( $('.sintaxe-expressao-3').text());
    $('.sintaxe-expressao-4').text( $('.sintaxe-expressao-4').text());
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

    $(".btn-nao-item-card-sair-jogo").on("click",function(){
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
    $(".progress-bar").css("width", life + "%");
    $('#valor-life').text("" + life + "%");
  }
  this.get_cronometro = function(){
    return  $("#cronometro");
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