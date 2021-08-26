var TAM_WIDTH_TELA_CANVAS = 960;
var TAM_HEGTH_TELA_CANVAS = 500;
var TAM_HEGTH_TELA_CANVAS_JOGAVEL = 320;
var TAM_WIDTH_CONTENT_CANVAS = 800;
var QUANTIDADE_DE_VILOES = 5;
var ctx, personagem = new Personagem();
var myVar;
var viloes= new Array();
var fase1colisao = new Camada();
var cenario1 = new Cenario();
var elementos = new ControllerElementos();


function main(){ //chama todas
   $(document).ready(function(){
       elementos.add_loading();
       carregar_imagens_do_jogo();
       document.addEventListener("mousedown", click);
       document.addEventListener('keydown', key_adapter_personagem);
       myVar = setInterval(myTimer, 1000/10);
       movimento_vilao_fase1()
   });

}

function loop_game(){
    renderiza();
    desenha();
    checar_loop_fase1();
}
function checar_loop_fase1(){
    if(!personagem.checarGameOver())
        window.requestAnimationFrame(loop_game);
    else
        alert("Game Over");
}
function myTimer (){//metodo de personagem.
    personagem.podeMudarSprite  = true;
}

// ter uma classe main
function carregar_imagens_do_jogo(){
    perImg.src = "assets/trump.png";
    bordaInventarioImg.src = "assets/fundo2.png";
    perImg.onload = function(){
        //inicio load
        fase1c1Img.src = "mapas/fase1/camada1fase1.png";
        fase1c1Img.onload = function(){
            fase1c2Img.src = "mapas/fase1/camada2fase1.png";
            fase1c2Img.onload = function(){
                fase1c3Img.src = "mapas/fase1/camada3fase1.png";
                fase1c3Img.onload = function(){
                    caixa.src = "assets/caixa2.png";
                    caixa.onload = function(){
                        caixaenergia.src = "assets/caixaenergia.png";
                        caixaenergia.onload = function(){
                           circuloImg.src = "assets/circulo.png";
                           circuloImg.onload = function(){
                            caixaFalseImg.src = "assets/caixaFalse.png";
                                caixaFalseImg.onload = function(){
                                    vilaoImg.src = "assets/vader.png";
                                    vilaoImg.onload = function(){
                                        setTimeout(function(){
                                            elementos.remove_id('loading');
                                            //adicionar Canvas
                                            elementos.add_canvas(TAM_WIDTH_TELA_CANVAS,TAM_HEGTH_TELA_CANVAS)
                                            //adicionar iventario
                                            elementos.add_inventario();
                                            //Carregar elementos do iventario como nome do persongem!
                                            elementos.alterar_nome_personagem_iventario("José Donald Trump");
                                            //refatorar essa parte.!
                                            $("#item-card-botoes-controles").on("click", function(){
                                               elementos.add_alerta_menu_controles();
                                            });
                                            $("#item-card-botoes-verificar-respostas").on("click", function(){
                                                elementos.add_alerta_menu_verificar_respostas();
                                            });
                                            $("#item-card-botoes-resetar-caixas").on("click", function(){
                                                alert("Resetar");
                                            });
                                            $("#item-card-botoes-sair-jogo").on("click", function(){
                                                alert("Sair");
                                            });
                                            initgame();
                                        }, 2000);//2 segundos para aparecer tela de carregamento!
                                    }
                                }
                           }

                        }

                    }
                }
            }
        }

        //fim load

    }
}

function initgame(){//FASE 1

    let camada = [0,0,0,0,0,0,0,0,0,0,184,185,0,0,0,0,0,0,0,0,0,0,0,0,186,187,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,200,201,0,0,0,0,0,0,0,0,0,0,0,0,202,203,0,0,0,0,
        0,0,88,0,0,0,0,88,0,0,216,217,0,0,0,0,0,0,0,0,0,0,0,0,218,219,0,0,88,0,
        0,0,88,171,172,173,174,88,0,0,0,0,0,0,0,0,0,171,172,173,174,0,0,171,172,173,174,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        88,88,88,171,172,173,174,88,0,0,0,0,0,0,0,0,0,171,172,173,174,0,0,171,172,173,174,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        81,82,83,84,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,0,0,0,
        97,98,99,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,0,0,0];//camada de colisao fase1

    ctx = document.getElementById("canvas").getContext("2d");
    // document.getElementById("canvas").style.border = "1px solid gray";
    fase1colisao.init(10,30,32,32,camada,0, ctx);//inicia a distribuição das forma de colisao
    personagem.sprite.carregarSprite(4,6,perImg);
    personagem.forma.init(0,personagem.altura/2, personagem.largura/2 - 8,personagem.altura/2);



    cenario1.init([fase1c1Img,fase1c2Img,fase1c3Img],TAM_HEGTH_TELA_CANVAS_JOGAVEL,TAM_WIDTH_TELA_CANVAS,[fase1colisao]);

    cenario1.addCaixas(1,1,caixa,312,192 - (3*32),24,24,true);
    cenario1.addCaixas(1,1,caixa,0,40,24,24,true);
    cenario1.addCaixas(1,1,caixa,600,264,24,24,true);
    cenario1.addCaixas(1,1,caixaFalseImg,864,32,24,24,false);

    //vilao
    for(let i = 0;i<QUANTIDADE_DE_VILOES;i++){ //Posiciona aleatoriamente os viloes no cenario
        let vilao = new Vader();
        vilao.sprite.carregarSprite(4,4,vilaoImg);
        vilao.posicionar(fase1colisao.formasTile,TAM_WIDTH_TELA_CANVAS,TAM_HEGTH_TELA_CANVAS_JOGAVEL)
        viloes.push(vilao);
    }

    //Encaixe das caixs
    cenario1.addCirculos(300,250,32,32,"V OU V",true);//304x 256y encaixe
    elementos.alterar_expressao_iventario(cenario1.circulosCaixa.length, cenario1.circulosCaixa[cenario1.circulosCaixa.length-1].expressaoLogica);
    elementos.alterar_resultado_expressao_iventario(cenario1.circulosCaixa.length,"?");
    cenario1.addCirculos(900,204,32,32,"V OU F",true);//pos encaixe 904x 208y
    elementos.alterar_expressao_iventario(cenario1.circulosCaixa.length, cenario1.circulosCaixa[cenario1.circulosCaixa.length-1].expressaoLogica);
    elementos.alterar_resultado_expressao_iventario(cenario1.circulosCaixa.length,"?");
    cenario1.addCirculos(700,34,32,32,"F OU V",true);//704x 40y encaixe
    elementos.alterar_expressao_iventario(cenario1.circulosCaixa.length, cenario1.circulosCaixa[cenario1.circulosCaixa.length-1].expressaoLogica);
    elementos.alterar_resultado_expressao_iventario(cenario1.circulosCaixa.length,"?");
    cenario1.addCirculos(4,224,32,32,"F OU F",false);//8x 224y encaixe.
    elementos.alterar_expressao_iventario(cenario1.circulosCaixa.length, cenario1.circulosCaixa[cenario1.circulosCaixa.length-1].expressaoLogica);
    elementos.alterar_resultado_expressao_iventario(cenario1.circulosCaixa.length,"?");

    //Encaixes Perfeitos
    cenario1.addEncaixes(304,256);
    cenario1.addEncaixes(904,208);
    cenario1.addEncaixes(704,40);
    cenario1.addEncaixes(8,224);

    loop_game();
}


function movimento_vilao_fase1(){
 
    for(let i = 0;i<viloes.length;i++){ //fazer andar no cenario.
        let vilao = viloes[i];
        vilao.andar()
        //vilao.deslocamento(800,960)//800 é a parte visivel e 960 a tla inteira
        vilao.checarColisaoCenario(fase1colisao.formasTile,0,TAM_WIDTH_TELA_CANVAS,TAM_HEGTH_TELA_CANVAS_JOGAVEL)//vilao nao precisa de deslocamento pois pode ser considerado a tela inteira para ele.
        vilao.checarColisaoPersonagem(personagem)?personagem.aplicarDano():"nao aplicar dano";
    }
    setTimeout(movimento_vilao_fase1,1000/10);//atualizar sprite
}
function click(evt){

}

function desenha(){
    //ctx.font = "30px Arial ";
    ctx.fillStyle = "white";
    //ctx.fillRect(0,0,926,500);
    //Camadas
    ctx.drawImage(cenario1.camadasImg[0],0,0,cenario1.largura,cenario1.altura)
    ctx.drawImage(cenario1.camadasImg[1],0,0,cenario1.largura,cenario1.altura);
    ctx.drawImage(cenario1.camadasImg[2],0,0,cenario1.largura,cenario1.altura);

   // console.log("Altuta: "+cenario1.altura)
    //Gradiente
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif ";

    //Encaixes
    for(let i=0;i<cenario1.circulosCaixa.length;i++){
        let encaixe1 = cenario1.circulosCaixa[i];
        ctx.drawImage(circuloImg,encaixe1.x+0,encaixe1.y,encaixe1.largura,encaixe1.altura);
        ctx.font = "28px sans-serif ";
        ctx.fillStyle = "red";
        ctx.fillText(""+(i+1),encaixe1.x+7+0,encaixe1.y-1);//sombra
        ctx.font = "24px sans-serif ";
        ctx.fillStyle = "white";
        ctx.fillText(""+(i+1),encaixe1.x+8+0,encaixe1.y-2);
    }
    //Caixas
    ctx.drawImage(caixaenergia,400 - 50 + 0,200 - (2*32) -10,64,64);//Central
    //ctx.drawImage(caixaC.sprite.folheto,caixaC.forma.x+deslocamento,caixaC.forma.y,32,32)
    for(let i=0;i<cenario1.caixas.length;i++){
        let caixaC = cenario1.caixas[i];
        ctx.drawImage(caixaC.sprite.folheto,caixaC.forma.x+0,caixaC.forma.y,caixaC.forma.largura,caixaC.forma.altura);
        ctx.strokeRect(caixaC.forma.x+0,caixaC.forma.y,caixaC.forma.largura,caixaC.forma.altura);
    }

    //Personagem
    personagem.atualizaSprite(ctx, personagem.direcaoAtual);

    for(let i=0;i<viloes.length;i++){
        let vilao = viloes[i];
       //checar se eele esta visivel na tela;
        ctx.strokeRect(vilao.forma.x+0,  vilao.forma.y, vilao.forma.largura,  vilao.forma.altura);
        vilao.atualizaSprite(ctx,vilao.direcaoAtual,0);

    }

    //formas Cenario.
    ctx.strokeRect(personagem.forma.x,  personagem.forma.y, personagem.forma.largura,  personagem.forma.altura);
    for(let i = 0;i<fase1colisao.formasTile.length;i++){
        let forma = fase1colisao.formasTile[i];
        ctx.strokeRect((forma.x + 0),  forma.y, forma.largura,  forma.altura);//deslocamento ja vem negativo.
        //console.log(i);
    }

    draw_life();
    draw_fase1_valor_caixas();
    //funcao para printar valor da caixas na tela.

}

function renderiza(){
   personagem.checarColisaoCenario(fase1colisao.formasTile,0,TAM_WIDTH_TELA_CANVAS,cenario1.altura);//pq o canvas eh maior que a altura jogavel do cenario
   colisao_caixa();
   mover_cena_fase1()
   //verificar encaixes
}
function mover_cena_fase1(){
    personagem.deslocamento(800,960);
    elementos.mover_camera(personagem.desl)
  

}
function colisao_caixa(){//transferir esse metodo para cenario!
  //caixaC.checarColisao([],deslocamento,804,cenario1.altura,personagem);
  for(let i = 0;i<cenario1.caixas.length;i++){
      let caixaC = cenario1.caixas[i];
    if(caixaC.checarColisaoPersonagem(personagem)){
        personagem.x+=-personagem.dx;
        personagem.y+=-personagem.dy;
        personagem.atualizarForma();
    }
    caixaC.checarColisaoLimites(960,cenario1.altura);
    caixaC.checarColisaoFormas(fase1colisao.formasTile,0);
  }
}

function draw_fase1_valor_caixas(){//Ficara dentro do controller inventario!
    $(document).ready(function(){
        for (let j=0;j<cenario1.circulosCaixa.length;j++){
            let c = cenario1.circulosCaixa[j];
            let colidiu = false;
            for(let i = 0;i<cenario1.caixas.length;i++){ //verifica se houve colisao com alguma caixa!
                let caixaC = cenario1.caixas[i];
                if(caixaC.forma.colisao(c.x,c.y,c.largura,c.altura)){//Se for vdd esse encaixe foi preenchido
                    elementos.alterar_resultado_expressao_iventario(String(j+1),caixaC.tipo===true?"V":"F");
                    colidiu = true;
                    break;
                }
            }
            if(!colidiu)
                elementos.alterar_resultado_expressao_iventario(String(j+1),"?");
        }
    });

}

function draw_life(){ //ficara dentro do controle inventario!
  elementos.alterar_valor_life_inventario(personagem.life);
}
//AJEITAR ALERTA E HISTORIAS.
function verificar_respostas(){//talvez possa ser um metodo de cenariq
    // P Q POUQ
    // V V V
    // V F V
    // F V V
    // F F F
    let errados = [];
    let certos = [];

    //olhar se a caixa colide com algum circulo e nao o circulo com a caixa!
    for (let j=0;j<cenario1.circulosCaixa.length;j++){
        let c = cenario1.circulosCaixa[j];
        let colidiu = false;
        for(let i = 0;i<cenario1.caixas.length;i++){
            let caixaC = cenario1.caixas[i];
            if(caixaC.forma.colisao(c.x,c.y,c.largura,c.altura)){//Se for vdd esse encaixe foi preenchido
                if(c.verificar_respostas(caixaC))
                    certos.push(j+1);
                else
                    errados.push(j+1)
                colidiu = true;
                break;
            }
        }
    }

    if(certos.length==0 && errados.length==0)
         alert("NEUNHUM ENCAIXE FOI PREENCHIDO!");
    else if(errados.length!=0 && errados.length<4 || certos.length!=0 && certos.length<4)
         alert('ENCAIXES PREENCHIDOS:'+errados.toString()+","+certos.toString())
    else if(errados.length!=0)
         alert('ENCAIXES:'+errados.toString() + " INCORRETOS!")
    else
         alert("PARABÉNS!!!");
}
function key_adapter_personagem(event){
    let velocidade = personagem.velocidade;
 
    //console.log("adp");
    if(event.keyCode == DIREITA){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.x+=velocidade ;
        personagem.direcaoAtual = DIREITA;
        personagem.dx = velocidade ;
        personagem.dy = 0;
        personagem.atualizarForma();
    }else if(event.keyCode == ESQUERDA){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.x-=velocidade ;
        personagem.direcaoAtual = ESQUERDA;
        personagem.dx = -velocidade ;
        personagem.dy = 0;
        personagem.atualizarForma();
    }else if(event.keyCode == CIMA){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.y-=velocidade ;
        personagem.direcaoAtual = CIMA;
        personagem.dx = 0;
        personagem.dy = -velocidade ;
        personagem.atualizarForma();
    }else if(event.keyCode == BAIXO){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.y+=velocidade;
        personagem.direcaoAtual = BAIXO;
        personagem.dx = 0;
        personagem.dy = velocidade ;
        personagem.atualizarForma();
        // var elemento = document.getElementById('overlay');
        // elemento.style.display="none";
    }
    else if(event.keyCode == 32){
        verificar_respostas();
        var elemento = document.getElementById('overlay');

         elemento.style.display="block";
        //  delClass('overlay', 'motionL');
        //  addClass('overlay', 'motionL')


    }

    velocidade  = 0;
    //console.log(personagem.velocidade);
}
//cronometro
//tela controles
//tela verificar respostas
//refatorar fase.
function addClass(id, classe) {
    var elemento = document.getElementById(id);
    var classes = elemento.className.split(' ');
    var getIndex = classes.indexOf(classe);

    if (getIndex === -1) {
      classes.push(classe);
      elemento.className = classes.join(' ');
    }
  }
  //apagar
  function delClass(id, classe) {
    var elemento = document.getElementById(id);
    var classes = elemento.className.split(' ');
    var getIndex = classes.indexOf(classe);

    if (getIndex > -1) {
      classes.splice(getIndex, 1);
    }
    elemento.className = classes.join(' ');
  }


window.addEventListener("load", main);
//testar colisão;

