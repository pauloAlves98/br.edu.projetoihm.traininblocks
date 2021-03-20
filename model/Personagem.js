//tudo que se move com deslocamento faz parte do cenario formas, caixas.
function Personagem(){
    
    this.life = 100;
    this.dano = 10;
    this.largura = 64;//32;
    this.altura = 45;
    this.x=0;
    this.y=10;
    this.dx=0;
    this.dy=0;
    this.sx = 0; 
    this.sy = 0; 
    this.velocidade = 8;
    this.sprite = new Sprite();
    this.direcaoAtual = DIREITA;
    this.emMovimento = false;
    this.dxForma = 16;//variacao da forma em relacao ao x do personagem.//multipo de 32//32 pq eh o tamanho do tile
    this.podeMudarSprite = false;//para controlar a velocidade da troca da sprite.
    this.forma = new Rectangle();
    this.desl = 0;

   this.aplicarDano = function (){
        this.life-=this.dano;
   }
   this.atualizarForma =function(){
        this.forma.x = this.x+this.dxForma;
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
        context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,2*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
        this.sprite.aparencia++;
        this.verificacaoEstouroSprite();
        //this.direcaoAtual = 0;
        }
        else if(this.emMovimento && this.podeMudarSprite && direcao == BAIXO){
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,0*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
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
                row = 2;
            else if(this.direcaoAtual == BAIXO)
                row = 0;
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,row*this.sprite.height,this.sprite.width,this.sprite.height,this.x,this.y,this.largura,this.altura);
        }    
       
     }   

     this.checarColisaoCenario =  function (formas, deslocamento,larguraCenario,alturaCenario){
        //console.log("vai chechar "+formas.length);
        if(this.forma.x <= 0 ){
            this.x=0-this.dxForma;
            this.atualizarForma();
            
        }if(this.forma.x > larguraCenario - this.forma.largura){
            this.x = larguraCenario - this.forma.largura - this.dxForma;//cinco é do reposicionamento da forma!
            this.atualizarForma();
            
        }if(this.forma.y<=0){
            this.y=0-this.forma.altura;
            this.atualizarForma();
           
        }if(this.forma.y >= alturaCenario - this.forma.altura){
            this.y = alturaCenario - this.altura;
            this.atualizarForma();
        }

        for (let i = 0;i<formas.length;i++){
            if(this.forma.colisao(formas[i].x + deslocamento,formas[i].y,formas[i].largura,formas[i].altura)){
                console.log("Colisao "+formas[i].x);
                this.x+=-this.dx;//dx é o que foi andado.
                this.y+=-this.dy;
                this.atualizarForma();
                //this.y-=2;
                return true;
            }

        }
     }
    
     this.deslocamento = function(larguraVisivel,larguraMap ){
        if(this.x> larguraVisivel/2){
            if(this.x<(larguraMap - larguraVisivel/2))//pega a variação de movimento
                this.desl = -(this.x-(larguraVisivel/2));
                //getFase1().setxCena(-(personagem.x-(larguraVisivel/2)));
                
        }
     }
    
}
