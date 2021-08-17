function Caixa(){

    this.sprite = new Sprite();
    this.forma = new Rectangle();
    this.direcaoAntiga = 39;
    this.velocidade = 16; //velocidade a que ela se locomove
    this.tipo = true;
    
    this.init = function(rows,columns,img,x,y,altura,largura){
        this.sprite.carregarSprite(rows,columns,img);
        this.forma.init(x,y,altura,largura);
    }
    this.checarColisaoLimites = function(larguraCenario,alturaCenario){
        if(this.forma.x <=  0 ){//colisao com o cenario
            this.forma.x=0;
            return true;
        }if(this.forma.x > larguraCenario - this.forma.largura){
            this.forma.x = larguraCenario - this.forma.largura;
            return true;
        }if(this.forma.y<=0){
            this.forma.y=0;
            return true;
        }if(this.forma.y >= alturaCenario - this.forma.altura){
            this.forma.y = alturaCenario - this.forma.altura;
            return true;
        }
        return false;
    }
    this.checarColisaoPersonagem = function(personagem){
        if(personagem.forma.colisao(this.forma.x+0,this.forma.y,this.forma.largura,this.forma.altura)){//colisao com personagem
            console.log("X encaixe:");
            if(personagem.direcaoAtual == DIREITA){
                this.direcaoAntiga =  DIREITA;
                this.forma.x+=this.velocidade;//multiplos de 2
                
            }else if(personagem.direcaoAtual ==ESQUERDA){
                this.direcaoAntiga =  ESQUERDA;
                this.forma.x-=this.velocidade;
                
            }else if(personagem.direcaoAtual == CIMA){
                this.direcaoAntiga =  CIMA;
                this.forma.y-=this.velocidade;
                
            }
            else if(personagem.direcaoAtual == BAIXO){
                this.direcaoAntiga = BAIXO;
                this.forma.y+=this.velocidade;
               
            }
            console.log("X encaixe:"+this.forma.x);
            console.log("Y encaixe:"+this.forma.y);
            return true;
        }
        return false;
    }
    this.checarColisaoFormas = function(formas, deslocamento){//deslocamento so atinge coisas staticas
         for (let i = 0;i<formas.length;i++){
             if(this.forma.colisao(formas[i].x,formas[i].y,formas[i].largura,formas[i].altura)){
                 console.log("Colisao Cixa"+formas[i].x);
                if(this.direcaoAntiga == DIREITA){
                    console.log("Colisao Direita"+formas[i].x);
                    this.forma.x -=  this.forma.x + this.forma.largura - formas[i].x;//colca de lado do bloco. Tira a diferença do que colidiu |[|]
                }else if(this.direcaoAntiga == ESQUERDA){
                    this.forma.x+= formas[i].x + formas[i].largura  - this.forma.x;
                }else if(this.direcaoAntiga == CIMA){
                    this.forma.y=formas[i].y + formas[i].altura + 1; 
                }
                else if(this.direcaoAntiga == BAIXO){
                    this.forma.y = formas[i].y - 1 - this.forma.altura; 
                }
                return true;
          }
        }
        return false;
    }
}