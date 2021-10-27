function Veiculo (){
    Elemento.call(this);
    //criar pelo menos a forma!
    this.atualizarForma = function () {
        this.forma.x = this.x+this.dxForma + 1;
        this.forma.y = this.y + this.forma.altura/2 - 2;
    }
    this.atualizaSprite = function (context, direcao) {
        // i * width, j * height, width, height
        // ( imagem , sx(xdocorte) , sy(do cotre) , sWidth (do corte), sHeight(do corte) , dx (posicao na tela), dy , dWidth , dHeight );
        if (this.emMovimento && this.podeMudarSprite && direcao == DIREITA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 2 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == ESQUERDA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 1 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == CIMA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 3 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == BAIXO) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }
        
        else if (this.emMovimento || !this.emMovimento) { //REMOVER CONDICIONAL
            if (this.direcaoAtual == DIREITA)
                row = 2;
            else if (this.direcaoAtual == ESQUERDA)
                row = 1;
            else if (this.direcaoAtual == CIMA)
                row = 3;
            else if (this.direcaoAtual == BAIXO)
                row = 0;
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, row * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
        }
    }
    this.verificacaoEstouroSprite = function () {

        if (this.sprite.aparencia >= this.sprite.columns)
            this.sprite.aparencia = 0;
       // this.emMovimento = true; //false se quiser para de movimentar!
        this.podeMudarSprite = false;
    }

}