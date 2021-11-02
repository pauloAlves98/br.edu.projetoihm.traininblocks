function Tunel() {
    Elemento.call(this);
    this.atualizar_sprite = function (context) {
        // i * width, j * height, width, height
        // ( imagem , sx(xdocorte) , sy(do cotre) , sWidth (do corte), sHeight(do corte) , dx (posicao na tela), dy , dWidth , dHeight )
        // if (this.emMovimento && this.podeMudarSprite) {
        //     // context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x+this.width/2, this.y, this.largura, this.altura);
        //     this.sprite.aparencia++;
        //     this.verificar_estouro_sprite();
        //     //this.direcaoAtual = 0;
        // }
        // let row = 0;//aqui Painel
        // if (direcao == DIREITA)
        //     row = 2;
        // else if (direcao == ESQUERDA)
        //     row = 3;
        // else if (direcao == CIMA)
        //     row = 1;
        // else if (direcao == BAIXO)
        //     row = 0;
        if (this.direcaoAtual==ESQUERDA)
            context.drawImage(this.sprite.folheto, 0 * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
       else {
        let posX = -this.x-TILE_AREA*2 //O SPRITE NAO É EXATO/6 É O DOBRO DO TAMANHO DA SPRITE VISIVEL.
        context.save(); // Save the current state
        context.scale(-1, 1); // TIVE QUE FAZER UM FLIP HORIZONTAL POR CAUSA DA SPRITE.
        context.drawImage(this.sprite.folheto, 0 * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, posX, this.y, this.largura, this.altura);
        context.restore(); // Restore the last saved state
          }
       // context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x + this.largura / 2, this.y, this.largura, this.altura);
    }
}