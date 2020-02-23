function Cenario(){

    this.camadasImg = new Array();
    this.altura;
    this.largura;
    this.camadasColisao = new Array();

    this.init = function (camada, altura, largura,camadasColisao){
        this.camadasImg = camada;
        this.altura = altura;
        this.largura = largura;
        this.camadasColisao  = camadasColisao;

    }

}