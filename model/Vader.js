function Vader(){

    Personagem.call(this);
    this.altura = 45;
    this.largura = 32;
    this.dxForma = 0;
    this.atualizaSprite = function (context,direcao,deslP){
        // i * width, j * height, width, height
        // ( imagem , sx(xdocorte) , sy(do cotre) , sWidth (do corte), sHeight(do corte) , dx (posicao na tela), dy , dWidth , dHeight );
        if(this.emMovimento && this.podeMudarSprite && direcao == DIREITA){
             context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,2*this.sprite.height,this.sprite.width,this.sprite.height,this.x+deslP,this.y,this.largura,this.altura);
             this.sprite.aparencia++;
             this.verificacaoEstouroSprite();
             //this.direcaoAtual = 0;
        }
        else if(this.emMovimento && this.podeMudarSprite && direcao == ESQUERDA){
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,1*this.sprite.height,this.sprite.width,this.sprite.height,this.x+deslP,this.y,this.largura,this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
       }
       else if(this.emMovimento && this.podeMudarSprite && direcao == CIMA){
        context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,3*this.sprite.height,this.sprite.width,this.sprite.height,this.x+deslP,this.y,this.largura,this.altura);
        this.sprite.aparencia++;
        this.verificacaoEstouroSprite();
        //this.direcaoAtual = 0;
        }
        else if(this.emMovimento && this.podeMudarSprite && direcao == BAIXO){
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,0*this.sprite.height,this.sprite.width,this.sprite.height,this.x+deslP,this.y,this.largura,this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }

        else if(this.emMovimento || !this.emMovimento){ //esta em movimento mas nao pode trocar a sprit 
            let row = 0;
            if(this.direcaoAtual == DIREITA)
              row = 2;
            else if(this.direcaoAtual == ESQUERDA)
                row = 1;
            else if(this.direcaoAtual == CIMA)
                row = 3;
            else if(this.direcaoAtual == BAIXO)
                row = 0;
            context.drawImage(this.sprite.folheto,this.sprite.aparencia*this.sprite.width,row*this.sprite.height,this.sprite.width,this.sprite.height,this.x+deslP,this.y,this.largura,this.altura);
        }    
       
     }  
     this.checarColisaoCenario =  function (formas, deslocamento,larguraCenario,alturaCenario){
  
        if(this.forma.x <=  0 ){
            this.x=0-this.dxForma+2;//o 2 é apenas uma constante para ele não ficar grudado na tela.
            this.atualizarForma();
            this.novadirecao();
            
        }if(this.forma.x > larguraCenario - this.forma.largura){
            this.x = larguraCenario - this.forma.largura - this.velocidade;//cinco é do reposicionamento da forma!
            this.atualizarForma();
            this.novadirecao();
            
        }if(this.forma.y<=0){
            this.y=0-2-this.forma.altura;//o 2 é para não bater e ficar no mesmo local.
            this.atualizarForma();
            this.novadirecao();
           
        }if(this.forma.y >= alturaCenario - this.forma.altura){
            this.y = alturaCenario - this.altura-2;//o 2 é apenas uma constante para ele não ficar grudado na tela.
            this.atualizarForma();
            this.novadirecao();
        }

        for (let i = 0;i<formas.length;i++){
            if(this.forma.colisao(formas[i].x + deslocamento, formas[i].y,formas[i].largura,formas[i].altura)){
               
                this.x+=-this.dx;//dx é o que foii andado.
                this.y+=-this.dy;
                this.atualizarForma();
                this.novadirecao();
                //this.y-=2;
                return true;
            }
        }
     }
     this.checarColisaoPersonagem = function(personagem){
        if(personagem.forma.colisao(this.forma.x+personagem.desl,this.forma.y,this.forma.largura,this.forma.altura)){//colisao com personagem
            this.x+=-this.dx;//dx é o que foii andado.
            this.y+=-this.dy;

            // personagem.x+=-personagem.dx;
            // personagem.y+=-personagem.dy;
            personagem.aplicarDano();
            personagem.atualizarForma();
            this.atualizarForma();
            this.novadirecao();
            return true;
        }
        return false;
    }
     //fazer checar colisao com personagem.corrigir colisao caixa movimento do cenario.
     this.posicionar = function(formas, largura,altura){
        this.x = getRandomInt(0,largura);//organizar isso
        this.y = getRandomInt(20,altura-this.altura);
        this.forma.init(this.x,this.y+this.altura/2, this.largura,this.altura/2);
        
        //this.deslocamento(800, largura)

        if(this.checarColisaoCenario(formas,0, largura,altura)){
            this.posicionar(formas,largura,altura);
        }else{
            return;
        }
     }

     this.novadirecao = function(){
         let dir = [ESQUERDA,DIREITA,CIMA,BAIXO];
         let valor =  getRandomInt(0,4);
         this.direcaoAtual = dir[valor];
     }

     this.andar = function(){

        this.velocidade = 4;
        this.podeMudarSprite = true;
        this.emMovimento =true;

        if(this.direcaoAtual == DIREITA){
            this.x = this.x+this.velocidade;
            this.dx = this.velocidade;
            this.dy = 0;
        }
           
        else if(this.direcaoAtual == ESQUERDA){
            this.x = this.x-this.velocidade;
            this.dx = -this.velocidade;
            this.dy = 0;
        }
            
        else if(this.direcaoAtual == CIMA){
            this.y = this.y-this.velocidade;
            this.dy = -this.velocidade;
            this.dx = 0;
        }
            
        else if(this.direcaoAtual == BAIXO){
            this.y = this.y+this.velocidade;
            this.dy = this.velocidade;
            this.dx = 0;
        }
        this.atualizarForma()
     }
}