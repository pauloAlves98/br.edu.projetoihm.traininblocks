function Rectangle(){
    this.x;
    this.y;
    this.largura;
    this.altura;

    this.init = function (x,y,largura,altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }

    this.colisao = function (xt,yt,largurat,alturat){//t de teste
        if (this.x < xt + largurat &&
            this.x + this.largura > xt &&
            this.y < yt + alturat &&
            this.y + this.altura > yt) {
             // collision detected!
             return true;
         }
         return false;
    }
}