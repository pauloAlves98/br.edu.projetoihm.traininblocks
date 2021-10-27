function Barreira() {
    Elemento.call(this);
    this.status = BARREIRA_CLOSE;
    // this.init = function (x,y,){

    // }
    this.alterarEstado = function () {
        if (this.status == BARREIRA_OPEN)
            this.status = BARREIRA_CLOSE;
        else
            this.status = BARREIRA_OPEN
    }
    this.atualizaSprite = function (context, alterarestado) {
        if (alterarestado)
            this.sprite.aparencia++;
        this.verificacaoEstouroSprite();

        if (this.status == BARREIRA_CLOSE)
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
        else {
            let posX = -this.x-TILE_AREA*2-TILE_AREA/2 //O SPRITE NAO É EXATO/6 É O DOBRO DO TAMANHO DA SPRITE VISIVEL.
            context.save(); // Save the current state
            context.scale(-1, 1); // TIVE QUE FAZER UM FLIP HORIZONTAL POR CAUSA DA SPRITE.
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, posX, this.y, this.largura, this.altura);
            context.restore(); // Restore the last saved state
        }

    }
    this.verificacaoEstouroSprite = function () {
        if (this.sprite.aparencia >= this.sprite.columns)
            this.sprite.aparencia = 0;
    }
}