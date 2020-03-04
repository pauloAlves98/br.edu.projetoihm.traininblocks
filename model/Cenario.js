function Cenario(){

    this.camadasImg = new Array();//imgs das camadas.
    this.altura;
    this.largura;//largura total e nao do canvas
    this.camadasColisao = new Array();//camadas que possuem colisoes.
    this.caixas = new Array();//Caixas completas
    this.circulosCaixa = new Array();//circulos de encaixe[apenas rectangles]
    this.encaixesPerfeitos = new Array();

    this.init = function (camadasImg, altura, largura,camadasColisao){
        this.camadasImg = camadasImg;
        this.altura = altura;
        this.largura = largura;
        this.camadasColisao  = camadasColisao;
    }

    this.addCaixas = function(rows,columns,img,x,y,altura,largura,tipo){
        //a caixa nao pode colidir com o cenario
        //a caixa nao pode ficar nas extremidades coladas nas bordas.
        //posicoes é tamnho 16;
        let caixa = new Caixa();
        caixa.tipo = tipo;
        caixa.init(rows, columns,img,x,y,altura,largura);
        this.caixas.push(caixa);
    }

    this.addCirculos = function(x,y,largura,altura){
         //o circulo nao pode colidir com o cenario
         //o circulo nao pode colidir com a caixa;
         let r = new Rectangle();
         r.init(x,y,largura,altura);
         this.circulosCaixa.push(r);
    }
    this.addEncaixes = function (x,y){
        this.encaixesPerfeitos.push(x);
        this.encaixesPerfeitos.push(y);
    }
    this.randomCenario = function getRandomIntInclusive(min, max) {//inclue o minino e maximo
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}