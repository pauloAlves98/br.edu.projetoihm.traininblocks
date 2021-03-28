var ctx, personagem = new Personagem();
var myVar;
var viloes= new Array();
var fase1colisao = new Camada();
var cenario1 = new Cenario();

function main(){ //chama todas
   $(document).ready(function(){
       $('#frame').append('<div id="loading"></div>');
       $('#loading').append('<div ></div>');
       $('#loading').append('<div ></div>');
       $('#loading').append('<div ></div>');
       $('#loading').append('<div ></div>');
       addClass('loading', 'lds-ellipsis');
       carregarImagensdoJogo();
       document.addEventListener("mousedown", click);
       document.addEventListener('keydown', keyAdapterPersonagem);
       myVar = setInterval(myTimer, 1000/10);
       movimentoVilao()
   });
  
}

function loopGame(){
    renderiza();
    desenha();
    window.requestAnimationFrame(loopGame);
}

function myTimer (){//metodo de personagem.
    personagem.podeMudarSprite  = true;
}

// ter uma classe main
function carregarImagensdoJogo(){

    perImg.src = "assets/trump.png";
    fase1c1Img.src = "mapas/fase1/camada1fase1.png";
    fase1c2Img.src = "mapas/fase1/camada2fase1.png";
    fase1c3Img.src = "mapas/fase1/camada3fase1.png";
    caixa.src = "assets/caixa2.png";
    circuloImg.src = "assets/circulo.png";
    bordaInventarioImg.src = "assets/fundo2.png";

    perImg.onload = function(){
        //inicio load
        fase1c1Img.onload = function(){
            fase1c2Img.onload = function(){
                fase1c3Img.onload = function(){
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
                                            $("#loading").remove();
                                            $('#contentCanvas').append('<canvas id="canvas" width="800px" height="500px"></canvas>')
                                            $('#contentCanvas').addClass("motionL");//transição
                                            // delClass("contentCanvas","motionL");
                                            // addClass("contentCanvas","motionL");
                                            initgame();                                                                            
                                        }, 2000);
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

function initgame(){

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
    document.getElementById("canvas").style.border = "1px solid gray";

    
    fase1colisao.init(10,30,32,32,camada,0, ctx);//inicia a distribuição das forma de colisao
  

    personagem.sprite.carregarSprite(4,6,perImg);
    personagem.forma.init(0,personagem.altura/2, personagem.largura/2 - 8,personagem.altura/2);
    
  
  
    cenario1.init([fase1c1Img,fase1c2Img,fase1c3Img],fase1c1Img.naturalHeight,fase1c1Img.naturalWidth,[fase1colisao]);
   
    cenario1.addCaixas(1,1,caixa,312,192 - (3*32),24,24,true);
    cenario1.addCaixas(1,1,caixa,0,40,24,24,true);
    cenario1.addCaixas(1,1,caixa,600,264,24,24,true);
    cenario1.addCaixas(1,1,caixaFalseImg,864,32,24,24,false);

    //vilao
    for(let i = 0;i<5;i++){ //faze andar no cenario. 
        let vilao = new Vader();
        vilao.sprite.carregarSprite(4,4,vilaoImg);
        vilao.posicionar(fase1colisao.formasTile,960,cenario1.altura)
        viloes.push(vilao);
    }

    //Encaixe das caixs
    cenario1.addCirculos(300,250,32,32);//304x 256y encaixe
    cenario1.addCirculos(900,204,32,32);//pos encaixe 904x 208y
    cenario1.addCirculos(700,34,32,32);//704x 40y encaixe
    cenario1.addCirculos(4,224,32,32);//8x 224y encaixe.
    
    //Encaixes Perfeitos
    cenario1.addEncaixes(304,256);
    cenario1.addEncaixes(904,208);
    cenario1.addEncaixes(704,40);
    cenario1.addEncaixes(8,224);
    
    
    //colocalos no vetor de cenario.V
    //um desses encaices ja tem a medida perfeita em x, o que esta logo no começo;
    //personagem.atualizaSprite(ctx,personagem.direcaoAtual);

    //Fazer a logica de quando todasa s caixas ja tiverem posicionadas
    
    loopGame();
    
}


function movimentoVilao(){

    
    for(let i = 0;i<viloes.length;i++){ //faze andar no cenario. 
        let vilao = viloes[i];
        vilao.andar()
        //vilao.deslocamento(800,960)//800 é a pate visivel e 960 a tla inteira
        vilao.checarColisaoCenario(fase1colisao.formasTile,0,960,cenario1.altura)//vilao nao precisa de deslocamento pois pode ser considerado a tela inteira para ele.
        vilao.checarColisaoPersonagem(personagem)?"aplicar dano":"nao aplicar dano";
    } 

    setTimeout(movimentoVilao,1000/10);
   
    
}
function click(evt){

}

function desenha(){
   
    
    //ctx.font = "30px Arial ";
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,926,500);

    //Camadas
    ctx.drawImage(cenario1.camadasImg[0],personagem.desl,0,cenario1.largura,cenario1.altura)
    ctx.drawImage(cenario1.camadasImg[1],personagem.desl,0,cenario1.largura,cenario1.altura);
    ctx.drawImage(cenario1.camadasImg[2],personagem.desl,0,cenario1.largura,cenario1.altura);
   
    //Gradiente
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif ";
   
    //Encaixes
    for(let i=0;i<cenario1.circulosCaixa.length;i++){
       
        let encaixe1 = cenario1.circulosCaixa[i];
        ctx.drawImage(circuloImg,encaixe1.x+personagem.desl,encaixe1.y,encaixe1.largura,encaixe1.altura);
        ctx.font = "28px sans-serif ";
        ctx.fillStyle = "red";
        ctx.fillText(""+(i+1),encaixe1.x+7+personagem.desl,encaixe1.y-1);//sombra
        ctx.font = "24px sans-serif ";
        ctx.fillStyle = "white";
        ctx.fillText(""+(i+1),encaixe1.x+8+personagem.desl,encaixe1.y-2);
        
    }
    
    //Caixas
    ctx.drawImage(caixaenergia,400 - 50 + personagem.desl,200 - (2*32) -10,64,64);//Central
    //ctx.drawImage(caixaC.sprite.folheto,caixaC.forma.x+deslocamento,caixaC.forma.y,32,32)
    for(let i=0;i<cenario1.caixas.length;i++){
        let caixaC = cenario1.caixas[i];
        ctx.drawImage(caixaC.sprite.folheto,caixaC.forma.x+personagem.desl,caixaC.forma.y,caixaC.forma.largura,caixaC.forma.altura);
        ctx.strokeRect(caixaC.forma.x+personagem.desl,caixaC.forma.y,caixaC.forma.largura,caixaC.forma.altura);
    }
   
    //Personagem
    personagem.atualizaSprite(ctx, personagem.direcaoAtual);

    for(let i=0;i<viloes.length;i++){
        let vilao = viloes[i];

       //checar se eele esta visivel na tela;
        ctx.strokeRect(vilao.forma.x+personagem.desl,  vilao.forma.y, vilao.forma.largura,  vilao.forma.altura);
        vilao.atualizaSprite(ctx,vilao.direcaoAtual,personagem.desl);
        
    }

    //formas Cenario.
    ctx.strokeRect(personagem.forma.x,  personagem.forma.y, personagem.forma.largura,  personagem.forma.altura);
    for(let i = 0;i<fase1colisao.formasTile.length;i++){
        let forma = fase1colisao.formasTile[i];
        ctx.strokeRect((forma.x + personagem.desl),  forma.y, forma.largura,  forma.altura);//deslocamento ja vem negativo.
        //console.log(i);
    }
    
    ctx.fillStyle = "black";
    ctx.fillRect(0,320,926,180);
    ctx.drawImage(bordaInventarioImg,-15,320,830,180);
    ctx.fillStyle = "white";
    ctx.font = '12px CENTURY GOTHIC';

    ctx.fillText('LIFE: '+personagem.life, 200, 352);
    
    ctx.fillText('ENCAIXE 1: V OU V = ?', 25, 352);
    ctx.fillText('ENCAIXE 2: V OU V = ?', 25, 364);
    ctx.fillText('ENCAIXE 3: V OU F = ?', 25, 376);
    ctx.fillText('ENCAIXE 4: V OU V = ?', 25, 388);

}

function renderiza(){
   personagem.checarColisaoCenario(fase1colisao.formasTile,personagem.desl,804,cenario1.altura);//pq o canvas eh maior que a altura jogavel do cenario
   colisaoCaixa();
   personagem.deslocamento(800,960);
}
function colisaoCaixa(){
  //caixaC.checarColisao([],deslocamento,804,cenario1.altura,personagem);
  for(let i = 0;i<cenario1.caixas.length;i++){
      let caixaC = cenario1.caixas[i];
    if(caixaC.checarColisaoPersonagem(personagem)){
        personagem.x+=-personagem.dx;
        personagem.y+=-personagem.dy;
        personagem.atualizarForma();
    }
    caixaC.checarColisaoLimites(960,cenario1.altura);
    caixaC.checarColisaoFormas(fase1colisao.formasTile,personagem.desl);
  }
}
function verificarRespostas(){//talvez possa ser um metodo de cenariq
    //olhar se todas as caixas estao instaladas
    //considerando tabela do OU!
    //OU
    // P Q POUQ 
    // V V V
    // V F V
    // F V V
    // F F F
   
    let encaixados = []
    let erradas = [];
    let msg = "Os encaixes ";
    let msgE = "As Caixas ";
    
    for(let i = 0;i<cenario1.caixas.length;i++){
        let caixaC = cenario1.caixas[i];
        for (let j=0;j<cenario1.circulosCaixa.length;j++){
            let c = cenario1.circulosCaixa[j];
            
            if(caixaC.forma.colisao(c.x,c.y,c.largura,c.altura)){//Se for vdd esse encaixe foi preenchido
           
                    
                    encaixados.push((j+1));
                    //corresponde a confição V OU V = ?
                if(j==0 && caixaC.tipo!=true){//confere se esta no encaixe certo. 
                    //encaixe 1
                    erradas.push(i+1);
                    if((i+1) in erradas == false)//a caixa i+1 esta posicionada errada!
                       msgE+=" ,"+(i+1);
                } //para tabela do ou  v v v f
                    //corresponde a confição V OU V = ?
                else if(j==1 && caixaC.tipo!=true){
                    erradas.push(i+1);
                    if((i+1) in erradas == false)
                        msgE+=" ,"+(i+1);
                } //para tabela do ou  v v v f
                 //corresponde a confição V OU V = ?
                else if(j==2 && caixaC.tipo!=true){
                    erradas.push(i+1);
                    if((i+1) in erradas == false)
                        msgE+=" ,"+(i+1);
                } //para tabela do ou  v v v f
                   //corresponde a confição V OU F = ?
                else if(j==3 && caixaC.tipo!=false){
                    erradas.push(i+1);
                    if((i+1) in erradas == false)
                        msgE+=" ,"+(i+1);
                } //para tabela do ou  v v v f
                    
                break;
            }

        }
    }

    if(encaixados.length<4){
        if(encaixados.length==0)
             alert("Nehum Encaixe  foi preenchido!");
        else
        alert("Apenas os Encaixes "+ encaixados.toString()+" Foram Preenchidos!");
    }
        
    else if(erradas.length>0)
        alert(msgE+" Estão Incorretas!");
    else
        alert("Parabéns!!!");
        
    
}
function keyAdapterPersonagem(event){
    //console.log("adp");
    if(event.keyCode == DIREITA){
        personagem.emMovimento =true;
        personagem.velocidade = 2;
        personagem.x+=personagem.velocidade;
        personagem.direcaoAtual = DIREITA;
        personagem.dx = personagem.velocidade; 
        personagem.dy = 0;
        personagem.atualizarForma();
    }else if(event.keyCode == ESQUERDA){
        personagem.emMovimento =true;
        personagem.velocidade = 2;
        personagem.x-=personagem.velocidade;
        personagem.direcaoAtual = ESQUERDA;
        personagem.dx = -personagem.velocidade; 
        personagem.dy = 0;
        personagem.atualizarForma();
    }else if(event.keyCode == CIMA){
        personagem.emMovimento =true;
        personagem.velocidade = 2;
        personagem.y-=personagem.velocidade;
        personagem.direcaoAtual = CIMA;
        personagem.dx = 0;
        personagem.dy = -personagem.velocidade; 
        personagem.atualizarForma();
    }else if(event.keyCode == BAIXO){
        personagem.emMovimento =true;
        personagem.velocidade = 2;
        personagem.y+=personagem.velocidade;
        personagem.direcaoAtual = BAIXO;
        personagem.dx = 0;
        personagem.dy = personagem.velocidade; 
        personagem.atualizarForma();
        // var elemento = document.getElementById('overlay');
        // elemento.style.display="none";
    }
    else if(event.keyCode == 32){
        verificarRespostas();
    //    var elemento = document.getElementById('overlay');
        
    //      elemento.style.display="block";
    //      delClass('overlay', 'motionL');
    //      addClass('overlay', 'motionL')
       
        
    }
    
    personagem.velocidade = 0;
    //console.log(personagem.velocidade);
}

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

