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
        let caixa = new Caixa();
        caixa.tipo = tipo;
        caixa.init(rows, columns,img,x,y,altura,largura);
        //chamar posicionar
        let formas = [];
        for (let i = 0; i<this.camadasColisao;i++){//todas as formas de colisao;
             formas = [].concat(formas, this.camadasColisao[i]);
        }
        //posicionar
        this.posicionar(caixa,  formas,this.altura,this.largura);
        this.caixas.push(caixa);
    }

    this.posicionar = function(caixa, formas, alturaC,larguraC){//posicionar automaticamente
        //this.deslocamento(800, largura)
        let x = getRandomInt(32, larguraC-65);
        let y = getRandomInt(64, alturaC-65);
        
        caixa.forma.x = x;
        caixa.forma.y = y;
        
        if(caixa.checarColisaoFormas (formas,0)){
            this.posicionar(caixa, formas,alturaC,larguraC);
        }else{
            return;
        }
     }

    this.addCirculos = function(x,y,largura,altura){
         //o circulo nao pode colidir com o cenario
         //o circulo nao pode colidir com a caixa;
         //circulo nao pode colidir com outro circulo;
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