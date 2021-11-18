function Cenario(){

    this.camadasImg = new Array();//imgs das camadas.
    this.altura;
    this.largura;//largura total e nao do canvas
    this.camadasColisao = new Array();//camadas que possuem colisoes.
    this.camadaAreaJogavel = new Camada()
    this.caixas = new Array();//Caixas completas
    this.circulosCaixa = new Array();//circulos de encaixe[apenas rectangles]
    this.encaixesPerfeitos = new Array();
    this.tunels = []
    this.barreiras = [];
    this.paineis_barreiras = [];
    this.veiculos = [];
    this.trem = new Trem();//cenario

    this.init = function (camadasImg, altura, largura,camadasColisao, areajogavel){
        this.camadasImg = camadasImg;
        this.altura = altura;
        this.largura = largura;
        this.camadasColisao  = camadasColisao;
        this.camadaAreaJogavel = areajogavel;
    }
    this.add_barreiras = function (x, y, lado, direcao) {//CENARIO
        let barreira1 = new Barreira()
        barreira1.x = x;
        barreira1.y = y;
        barreira1.altura = 32 * 3;
        barreira1.largura = 32 * 3;
        barreira1.sprite.carregar_sprite(1, 2, barreiraImg);
        barreira1.forma.init(barreira1.x, barreira1.y + (32 * 2), barreira1.largura, 32)
        barreira1.set_lado(lado);
        barreira1.direcaoAtual = direcao;
        this.barreiras.push(barreira1);
    }
    this.add_paineis_barreiras = function (x, y) {//paineil é uma barreira!//CENARIO
        let barreira1 = new Barreira()
        barreira1.x = x;
        barreira1.y = y;
        barreira1.altura = 32 * 1;
        barreira1.largura = 32 * 1;
        barreira1.sprite.carregar_sprite(1, 2, painelImg);
        barreira1.forma.init(barreira1.x, barreira1.y, barreira1.largura, 32)
        this.paineis_barreiras.push(barreira1);
    }
    this.add_tunel = function (x, y, img, direcao) {
        let tunel = new Tunel()
        tunel.x = x;
        tunel.y = y;
        tunel.altura = TILE_AREA * 2;
        // this.tunel.dy = this.trem.altura / 2
        // this.tunel.dx = TILE_AREA
        tunel.largura = TILE_AREA * 2;
        tunel.sprite.carregar_sprite(1, 1, img);
        tunel.direcaoAtual = direcao;
        tunel.emMovimento = true;
        tunel.forma.init(tunel.x, tunel.y + tunel.altura / 2, tunel.largura, tunel.altura / 2)
        this.tunels.push(tunel);
    }
    this.add_veiculo = function (x, y, img, lado, direcao) {//CENARIO
        let veiculo = new Veiculo();
        veiculo.x = x;
        veiculo.y = y;
        veiculo.altura = 32 * 2;
        veiculo.largura = 32 * 2;
        veiculo.sprite.carregar_sprite(4, 3, img);
        veiculo.direcaoAtual = direcao;
        veiculo.set_lado(lado);
        veiculo.podeMudarSprite = true;
        veiculo.emMovimento = true;
        veiculo.set_movimento_antigo()
        veiculo.forma.init(veiculo.x, veiculo.y, veiculo.largura, veiculo.altura)
        this.veiculos.push(veiculo);
    }
    this.add_trem = function (x, y, img, direcao) {
        this.trem.x = x;
        this.trem.y = y;
        this.trem.altura = TILE_AREA * 4;
        this.trem.dy = this.trem.altura / 2
        this.trem.dx = TILE_AREA
        this.trem.largura = TILE_AREA * 7;
        this.trem.sprite.carregar_sprite(4, 3, img);
        this.trem.direcaoAtual = direcao;
        this.trem.podeMudarSprite = true;
        this.trem.emMovimento = true;
        this.trem.set_intervalo_trem_passar(10 * 36)//6 MIN
        this.trem.forma.init(this.trem.x, this.trem.y, this.trem.largura - TILE_AREA * 3, this.trem.altura - TILE_AREA * 2)
        this.trem.set_trem_deve_passar(false)
        this.trem.set_movimento_antigo()
    }

    this.fechar_barreiras = function () {
        for (let i = 0; i < this.cenario.barreiras .length; i++) {
            this.barreiras[i].set_status(BARREIRA_CLOSE)
            this.paineis_barreiras[i].set_status(BARREIRA_CLOSE)
            // this.cenario.barreiras [i].atualizar_sprite(this.contexto, true)
        }
    }
    this.novo_veiculo = function (personagem, veiculoAntigo) {//add novo veiculo no cenário!
        // alert('novo veiculo: '+this.cenario.barreiras .length)
        for (let i = 0; i < this.barreiras.length; i++) {
            let barreira = this.barreiras [i]
            if (barreira.get_lado() == veiculoAntigo.get_lado() && barreira.direcaoAtual != personagem.lado) {//invertida!
                //alert('novo veiculo: '+veiculoAntigo.get_lado())
                barreira.set_status(BARREIRA_CLOSE)
                if (barreira.direcaoAtual == CIMA)
                    this.add_veiculo(veiculoAntigo.x, 0, this.randomCenario(1,10)<=5?carro1Img:carro2Img, veiculoAntigo.get_lado(), BAIXO);//INVERTIDO!
                else
                    this.add_veiculo(veiculoAntigo.x, TAM_HEGTH_TELA_CANVAS - veiculoAntigo.altura, this.randomCenario(1,10)>=5?carro1Img:carro2Img, veiculoAntigo.get_lado(), CIMA);
                return;
            }
        }

    }
   this.randomCenario = function getRandomIntInclusive(min, max) {//inclue o minino e maximo
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}