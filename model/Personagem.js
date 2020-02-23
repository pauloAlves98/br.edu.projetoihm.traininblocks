function Personagem(){

    this.largura = 32;
    this.altura = 45;
    this.x=0;
    this.y=10;
    this.dx=0;
    this.dy=0;
    this.sx = 0; 
    this.sy = 0; 
    this.velocidade = 2;
    this.sprite = new Sprite();
    this.direcaoAtual = 39;
    this.emMovimento = false;
    this.podeMudarSprite = false;//para controlar a velocidade da troca da sprite.
    this.forma = new Rectangle();

    
    

    this.atualizarForma =function(){
        this.forma.x = this.x;
        this.forma.y = this.y+this.forma.altura;
    }
    this.verificacaoEstouroSprite = function (){

        if(this.sprite.aparencia>=this.sprite.columns)
            this.sprite.aparencia = 0;
        this.emMovimento = false;
        this.podeMudarSprite = false;
    }
    
    this.atualizaSprite = function (context,direcao){
        // i * width, j * height, width, height
        // ( imagem , sx(xdocorte) , sy(do cotre) , sWidth (do corte), sHeight(do corte) , dx (posicao na tela), dy , dWidth , dHeight );
        if(this.emMovimento && this.podeMudarSprite && direcao == DIREITA){
             context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,1*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
             this.sprite.aparencia++;
             this.verificacaoEstouroSprite();
             //this.direcaoAtual = 0;
        }
        else if(this.emMovimento && this.podeMudarSprite && direcao == ESQUERDA){
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,3*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
       }
       else if(this.emMovimento && this.podeMudarSprite && direcao == CIMA){
        context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,0*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
        this.sprite.aparencia++;
        this.verificacaoEstouroSprite();
        //this.direcaoAtual = 0;
        }
        else if(this.emMovimento && this.podeMudarSprite && direcao == BAIXO){
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,2*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }
        else if(this.emMovimento || !this.emMovimento){ //esta em movimento mas nao pode trocar a sprit 
            let row = 0;
            if(this.direcaoAtual == DIREITA)
              row = 1;
            else if(this.direcaoAtual == ESQUERDA)
                row = 3;
            else if(this.direcaoAtual == CIMA)
                row = 0;
            else if(this.direcaoAtual == BAIXO)
                row = 2;
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,row*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
        }    
       
     }   

     this.checarColisaoCenario =  function (formas, deslocamento,larguraCenario,alturaCenario){
        console.log("vai chechar "+formas.length);
        if(this.x <=  0 ){
            this.x=0;
            this.atualizarForma();
            
        }if(this.x > larguraCenario - this.largura){
            this.x =larguraCenario - this.largura;
            this.atualizarForma();
            
        }if(this.y<=0){
            this.y=0;
            this.atualizarForma();
           
        }if(this.y >= alturaCenario - this.altura){
            this.y = alturaCenario - this.altura;
            this.atualizarForma();
           
        }

        for (let i = 0;i<formas.length;i++){
            if(this.forma.colisao(formas[i].x + deslocamento,formas[i].y,formas[i].largura,formas[i].altura)){
                console.log("Colisao "+formas[i].x);
                this.x+=-this.dx;
                this.y+=-this.dy;
                this.atualizarForma();
                //this.y-=2;
                return true;
            }

        }
     }
    
}

var ctx, p = new Personagem(), per = new Image(), fase1c1 = new Image(),fase1c2 = new Image(), fase1c3 = new Image();
var myVar;

var fase1colisao = new Camada();
var cenario1 = new Cenario();
var deslocamento = 0;
var caixa = new Image();



const DIREITA = 39;
const ESQUERDA = 37;
const CIMA = 38;
const BAIXO = 40;

function myTimer (){
    p.podeMudarSprite  = true;
}
function carregarImagensdoJogo(){
    per.src = "Truncks.png";
    fase1c1.src = "camada1fase1.png";
    fase1c2.src = "camada2fase1.png";
    fase1c3.src = "camada3fase1.png";
    caixa.src = "caixa2.png";
    per.onload = function(){
        console.log("0");
        fase1c1.onload = function(){
            console.log("1");
            fase1c2.onload = function(){
                console.log("2");

                fase1c3.onload = function(){
                    console.log("3");
                    caixa.onload = function(){
                        initgame();
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
        97,98,99,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,88,0,0,0];
    
        console.log("Camada l"+camada.length);
  
    ctx = document.getElementById("canvas").getContext("2d");
    document.getElementById("canvas").style.border = "1px solid #000";
    
    
    fase1colisao.init(10,30,32,32,camada,0, ctx);
    cenario1.init([fase1c1,fase1c2,fase1c3],fase1c1.naturalHeight,fase1c1.naturalWidth,[fase1colisao]);

    p.sprite.carregarSprite(4,3,per);
    p.forma.init(0,p.altura/2, p.largura,p.altura/2);
    //p.atualizaSprite(ctx,p.direcaoAtual);
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
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,926,300);
    //console.log(deslocamento+" DECLA DESENHA");

    ctx.drawImage(cenario1.camadasImg[0],deslocamento,0,cenario1.largura,cenario1.altura);
    ctx.drawImage(cenario1.camadasImg[1],deslocamento,0,cenario1.largura,cenario1.altura);
    ctx.drawImage(cenario1.camadasImg[2],deslocamento,0,cenario1.largura,cenario1.altura);
    ctx.drawImage(caixa,400-(3*32) +20 +deslocamento,200 - (3*32),32,32);
    ctx.drawImage(caixa,400-(3*32) +20 +deslocamento,(200 - (3*32)) + 32,32,32);
    ctx.drawImage(caixa,400-(3*32) +20 +deslocamento,(200 - (3*32)) + 64,32,32);
    p.atualizaSprite(ctx, p.direcaoAtual);
    
    ctx.fillStyle = "blue";
    
    ctx.strokeRect(p.forma.x,  p.forma.y, p.forma.largura,  p.forma.altura);
    for(let i = 0;i<fase1colisao.formasTile.length;i++){
        let forma = fase1colisao.formasTile[i];
        ctx.strokeRect((forma.x + deslocamento),  forma.y, forma.largura,  forma.altura);//deslocamento ja vem negativo.
        //console.log(i);
    }
}

function renderiza(){
   p.checarColisaoCenario(fase1colisao.formasTile,deslocamento,804,cenario1.altura);//pq o canvas eh maior que a altura jogavel do cenario
   moverCamera(p,960,800,deslocamento);
}

function click(evt){
    
}
function moverCamera(personagem,larguraMap, larguraVisivel, desl){
    
    //ta retornado nulo; colocar metodo em alguma classe;
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
        
    }else if(event.keyCode == ESQUERDA){
        p.emMovimento =true;
        p.velocidade = 2;
        p.x-=p.velocidade;
        p.direcaoAtual = ESQUERDA;
        p.dx = -p.velocidade; 
        p.dy = 0;
    }else if(event.keyCode == CIMA){
        p.emMovimento =true;
        p.velocidade = 2;
        p.y-=p.velocidade;
        p.direcaoAtual = CIMA;
        p.dx = 0;
        p.dy = -p.velocidade; 
    }else if(event.keyCode == BAIXO){
        p.emMovimento =true;
        p.velocidade = 2;
        p.y+=p.velocidade;
        p.direcaoAtual = BAIXO;
        p.dx = 0;
        p.dy = p.velocidade; 
    }
    p.atualizarForma();
    p.velocidade = 0;
    console.log(p.velocidade);
}

window.addEventListener("load", main);
//testar colisão;

