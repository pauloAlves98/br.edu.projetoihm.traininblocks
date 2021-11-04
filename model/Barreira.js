function Barreira() {
    Elemento.call(this);
    this.status = BARREIRA_CLOSE;
    this.lado = ESQUERDA;

    // this.init = function (x,y,){

    // }
    this.set_lado = function (lad) {
        this.lado = lad;
    }
    this.get_lado = function () {
        return this.lado;
    }
    this.set_status = function (sts) {
        this.status = sts;
    }
    this.alterar_estado = function () {
        if (this.status == BARREIRA_OPEN)
            this.status = BARREIRA_CLOSE;
        else
            this.status = BARREIRA_OPEN
    }
    this.atualizar_sprite = function (context, alterar_estado,vdx) {//TIRAR ATT ALTERAR ESTADO!
        if (alterar_estado)
            this.sprite.aparencia++;
        this.verificar_estouro_sprite();

        if (this.status == BARREIRA_CLOSE)
            context.drawImage(this.sprite.folheto, 0 * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
        else {
            let posX = -this.x-vdx; //O SPRITE NAO É EXATO/6 É O DOBRO DO TAMANHO DA SPRITE VISIVEL.
            context.save(); // Save the current state
            context.scale(-1, 1); // TIVE QUE FAZER UM FLIP HORIZONTAL POR CAUSA DA SPRITE.
            context.drawImage(this.sprite.folheto, 1 * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, posX, this.y, this.largura, this.altura);
            context.restore(); // Restore the last saved state
        }

    }
    this.verificar_estouro_sprite = function () {
        if (this.sprite.aparencia >= this.sprite.columns)
            this.sprite.aparencia = 0;
    }
}