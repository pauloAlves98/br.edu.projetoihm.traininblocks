var ctx, p = new Personagem();
var myVar;

var fase1colisao = new Camada();
var cenario1 = new Cenario();
var deslocamento = 0;

function myTimer (){
    p.podeMudarSprite  = true;
}
function carregarImagensdoJogo(){

    perImg.src = "assets/trump.png";
    fase1c1Img.src = "mapas/fase1/camada1fase1.png";
    fase1c2Img.src = "mapas/fase1/camada2fase1.png";
    fase1c3Img.src = "mapas/fase1/camada3fase1.png";
    caixa.src = "assets/caixa2.png";
    circuloImg.src = "assets/circulo.png";
    bordaInventarioImg.src = "assets/fundo2.png";

    perImg.onload = function(){
        console.log("0");
        fase1c1Img.onload = function(){
            console.log("1");
            fase1c2Img.onload = function(){
                console.log("2");

                fase1c3Img.onload = function(){
                    
                    caixa.onload = function(){
                        console.log("3");
                        caixaenergia.src = "assets/caixaenergia.png";
                        caixaenergia.onload = function(){
                           circuloImg.src = "assets/circulo.png";
                           circuloImg.onload = function(){
                            caixaFalseImg.src = "assets/caixaFalse.png";
                                caixaFalseImg.onload = function(){
                                    initgame();
                                }  
                           }
                            
                        }
                        
                    }  
                }
            }
        }
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
    
        console.table(camada);
  
    ctx = document.getElementById("canvas").getContext("2d");
    document.getElementById("canvas").style.border = "1px solid gray";

    
    fase1colisao.init(10,30,32,32,camada,0, ctx);//inicia a distribuição das forma de colisao
  

    p.sprite.carregarSprite(4,6,perImg);
    p.forma.init(0,p.altura/2, p.largura/2 - 8,p.altura/2);
    
    
   
    cenario1.init([fase1c1Img,fase1c2Img,fase1c3Img],fase1c1Img.naturalHeight,fase1c1Img.naturalWidth,[fase1colisao]);
    cenario1.addCaixas(1,1,caixa,312,192 - (3*32),24,24);
    cenario1.addCaixas(1,1,caixaFalseImg,0,40,24,24);
    cenario1.addCaixas(1,1,caixa,600,264,24,24);
    cenario1.addCaixas(1,1,caixaFalseImg,864,32,24,24);

    //c1.init(1,1,caixa,312,192 - (3*32),24,24); //caixa 1
    //caixaC.init(1,1,caixa,0,40,32,30);//Caixa 2
    //caixaC.init(1,1,caixa,600,264,32,30);//Caixa 3
    //caixaC.init(1,1,caixa,864,32,24,24); //caixa 4

    //colocar as 4 caixas no vetor
    //usando add de cenario.

    
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
    //p.atualizaSprite(ctx,p.direcaoAtual);

    //Fazer a logica de quando todasa s caixas ja tiverem posicionadas
    
    loopGame();
   
}
function main(){
    carregarImagensdoJogo();
    document.addEventListener("mousedown", click);
    document.addEventListener('keydown', keyAdapterPersonagem);
    myVar = setInterval(myTimer, 1000/10);
}

function loopGame(){
    renderiza();
    desenha();
    window.requestAnimationFrame(loopGame);
}
function desenha(){
   
    
    //ctx.font = "30px Arial ";
    
    //ctx.shadowOffsetX = 0;
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,926,500);
   
    //console.log(deslocamento+" DECLA DESENHA");
    //Camadas
    ctx.drawImage(cenario1.camadasImg[0],deslocamento,0,cenario1.largura,cenario1.altura)
    ctx.drawImage(cenario1.camadasImg[1],deslocamento,0,cenario1.largura,cenario1.altura);
    ctx.drawImage(cenario1.camadasImg[2],deslocamento,0,cenario1.largura,cenario1.altura);
   // ctx.drawImage(caixa,400-(3*32) +20 +deslocamento,200 - (3*32),32,32);
    //ctx.drawImage(caixa,400-(3*32) +20 +deslocamento,(200 - (3*32)) + 32,32,32);

    //Gradiente
    ctx.fillStyle = "white";
    ctx.font = "24px sans-serif ";
   

    //ctx.shadowOffsetX = 0;
    
    
    //colisao encaixe e caixa


    //fazer img de caix F
    //fazer inventario
    //Encaixes
    for(let i=0;i<cenario1.circulosCaixa.length;i++){
       
        let encaixe1 = cenario1.circulosCaixa[i];
        ctx.drawImage(circuloImg,encaixe1.x+deslocamento,encaixe1.y,encaixe1.largura,encaixe1.altura);
        ctx.font = "28px sans-serif ";
        ctx.fillStyle = "red";
        ctx.fillText(""+(i+1),encaixe1.x+7+deslocamento,encaixe1.y-1);//sombra
        ctx.font = "24px sans-serif ";
        ctx.fillStyle = "white";
        ctx.fillText(""+(i+1),encaixe1.x+8+deslocamento,encaixe1.y-2);
        
    }
    
    //Caixas
    ctx.drawImage(caixaenergia,400 - 50 + deslocamento,200 - (2*32) -10,64,64);//Central
    //ctx.drawImage(caixaC.sprite.folheto,caixaC.forma.x+deslocamento,caixaC.forma.y,32,32)
    for(let i=0;i<cenario1.caixas.length;i++){
        let caixaC = cenario1.caixas[i];
        ctx.drawImage(caixaC.sprite.folheto,caixaC.forma.x+deslocamento,caixaC.forma.y,caixaC.forma.largura,caixaC.forma.altura);
        ctx.strokeRect(caixaC.forma.x+deslocamento,caixaC.forma.y,caixaC.forma.largura,caixaC.forma.altura);
    }
   
    //Personagem
    
    p.atualizaSprite(ctx, p.direcaoAtual);
    
   
    //formas Cenario.
    ctx.strokeRect(p.forma.x,  p.forma.y, p.forma.largura,  p.forma.altura);
    for(let i = 0;i<fase1colisao.formasTile.length;i++){
        let forma = fase1colisao.formasTile[i];
        ctx.strokeRect((forma.x + deslocamento),  forma.y, forma.largura,  forma.altura);//deslocamento ja vem negativo.
        //console.log(i);
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0,320,926,180);
    ctx.drawImage(bordaInventarioImg,-15,320,830,180);
}

function renderiza(){

   p.checarColisaoCenario(fase1colisao.formasTile,deslocamento,804,cenario1.altura);//pq o canvas eh maior que a altura jogavel do cenario
   colisaoCaixa();
   moverCamera(p,960,800,deslocamento);
   
}
function colisaoCaixa(){
  //caixaC.checarColisao([],deslocamento,804,cenario1.altura,p);
  for(let i = 0;i<cenario1.caixas.length;i++){
      let caixaC = cenario1.caixas[i];
    if(caixaC.checarColisaoPersonagem(p,deslocamento)){
        p.x+=-p.dx;
        p.y+=-p.dy;
        p.atualizarForma();
    }
    caixaC.checarColisaoLimites(960,cenario1.altura);
    caixaC.checarColisaoFormas(fase1colisao.formasTile,deslocamento);
  }
}

function click(evt){
    
}
function moverCamera(personagem,larguraMap, larguraVisivel, desl){
    
    //;
    if(personagem.x> larguraVisivel/2){
            if(personagem.x<(larguraMap - larguraVisivel/2))//pega a variação de movimento
                deslocamento = -(personagem.x-(larguraVisivel/2));
                //getFase1().setxCena(-(personagem.x-(larguraVisivel/2)));
        console.log(desl+" Desclocameno")
    }
                
   
}

function keyAdapterPersonagem(event){
    //console.log("adp");
    if(event.keyCode == DIREITA){
        p.emMovimento =true;
        p.velocidade = 2;
        p.x+=p.velocidade;
        p.direcaoAtual = DIREITA;
        p.dx = p.velocidade; 
        p.dy = 0;
        p.atualizarForma();
    }else if(event.keyCode == ESQUERDA){
        p.emMovimento =true;
        p.velocidade = 2;
        p.x-=p.velocidade;
        p.direcaoAtual = ESQUERDA;
        p.dx = -p.velocidade; 
        p.dy = 0;
        p.atualizarForma();
    }else if(event.keyCode == CIMA){
        p.emMovimento =true;
        p.velocidade = 2;
        p.y-=p.velocidade;
        p.direcaoAtual = CIMA;
        p.dx = 0;
        p.dy = -p.velocidade; 
        p.atualizarForma();
    }else if(event.keyCode == BAIXO){
        p.emMovimento =true;
        p.velocidade = 2;
        p.y+=p.velocidade;
        p.direcaoAtual = BAIXO;
        p.dx = 0;
        p.dy = p.velocidade; 
        p.atualizarForma();
    }
    
    p.velocidade = 0;
    //console.log(p.velocidade);
}

window.addEventListener("load", main);
//testar colisão;

