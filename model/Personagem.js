//tudo que se move com deslocamento faz parte do cenario formas, caixas.
function Personagem() {
    Elemento.call(this);
    // this.life = 0;
    this.dano = 0;
    this.largura = 64 - 32;//32;
    this.altura = 45 - 10;
    this.desl = 0;
    this.velocidade = 4;
    this.dxForma = 16;
    this.y = 20;
    this.direcaoAntiga = ''
    this.aplicar_dano = function () {
        this.life -= this.dano;
        if (this.life <= 0)
            this.life = 0;
        this.atualizar_forma();
    }
    this.checar_game_over = function () {
        if (this.life <= 0)
            return true;
        return false;
    }
    this.atualizar_forma = function () {
        this.forma.x = this.x + this.dxForma + 1;
        this.forma.y = this.y + this.forma.altura / 2 - 2;
    }
    this.verificar_estouro_sprite = function () {

        if (this.sprite.aparencia >= this.sprite.columns)
            this.sprite.aparencia = 0;
        // this.emMovimento = true; //false se quiser para de movimentar!
        this.podeMudarSprite = false;
    }

    this.atualizar_sprite = function (context, direcao) {
        // i * width, j * height, width, height
        // ( imagem , sx(xdocorte) , sy(do cotre) , sWidth (do corte), sHeight(do corte) , dx (posicao na tela), dy , dWidth , dHeight );

        if (this.emMovimento && this.podeMudarSprite) {
            // context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x+this.width/2, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificar_estouro_sprite();
            //this.direcaoAtual = 0;
        }
        let row = 0;//aqui Painel
        if (direcao == DIREITA)
            row = 2;
        else if (direcao == ESQUERDA)
            row = 3;
        else if (direcao == CIMA)
            row = 1;
        else if (direcao == BAIXO)
            row = 0;
        context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, row * this.sprite.height, this.sprite.width, this.sprite.height, this.x + this.largura / 2, this.y, this.largura, this.altura);
    }
    this.acrecentar_dano = function (dano) {
        this.dano = this.dano + dano;
    }
    this.set_movimento_antigo = function () {

        this.xAntigo = this.x;
        this.yAntigo = this.y;
        this.atualizar_forma()

    }
    this.set_direcao_antiga = function () {
        if (this.direcaoAtual != PAINEL || this.direcaoAtual != TUNEL)
            this.direcaoAntiga = this.direcaoAtual
        else
            this.emMovimento = false;
    }
    this.resetar_movimento = function () {
        this.x = this.xAntigo;
        this.y = this.yAntigo;
        this.atualizar_forma()
    }
    this.checar_colisao_cenario = function (formas, barreiras, veiculos, paineis, tuneis, larguraCenario, alturaCenario, direcao, tilearea) {
        if (direcao == DIREITA && (this.forma.x + tilearea - 2 > larguraCenario - this.forma.largura)) {
            return true;
        }
        else if (direcao == ESQUERDA && this.forma.x - tilearea + 2 <= 0) {
            return true;
        } else if (direcao == CIMA && this.forma.y - tilearea + 2 <= 0) {
            return true;
        }
        else if (direcao == BAIXO && this.forma.y + tilearea - 2 >= alturaCenario - this.forma.altura) {
            return true;
        }
        //deslocamento previsto
        let valor_previsto_cimabai = 0;
        let valor_previsto_diresq = 0;
        if (direcao == DIREITA) {
            valor_previsto_diresq = tilearea - 1;//tem q fazer uma previsão que vai bater
        }
        else if (direcao == ESQUERDA) {
            valor_previsto_diresq = - tilearea + 1;
        } else if (direcao == CIMA) {
            valor_previsto_cimabai = -tilearea + 1;
        }
        else if (direcao == BAIXO) {
            valor_previsto_cimabai = tilearea - 1;
        }
        //cenario
        let formaaux = new Rectangle();
        formaaux.init(this.forma.x + valor_previsto_diresq, this.forma.y + valor_previsto_cimabai, this.forma.largura, this.forma.altura)
        for (let i = 0; i < formas.length; i++) {
            if (formaaux.colisao(formas[i].x, formas[i].y, formas[i].largura, formas[i].altura)) {
                return true;
            }
        }
        //barreiras
        for (let i = 0; i < barreiras.length; i++) {
            let formaB = barreiras[i].forma;
            if (formaaux.colisao(formaB.x, formaB.y, formaB.largura, formaB.altura)) {
                return true;
            }
        }
        //paineis
        for (let i = 0; i < paineis.length; i++) {
            let formaB = paineis[i].forma;
            if (formaaux.colisao(formaB.x, formaB.y, formaB.largura, formaB.altura)) {
                return true;
            }
        }
        //veiculos
        for (let i = 0; i < veiculos.length; i++) {
            let formaV = veiculos[i].forma;
            if (formaaux.colisao(formaV.x, formaV.y, formaV.largura, formaV.altura)) {
                return true;
            }
        }
        //Tuneis
        for (let i = 0; i < tuneis.length; i++) {
            let formaV = tuneis[i].forma;
            if (formaaux.colisao(formaV.x, formaV.y, formaV.largura, formaV.altura)) {
                return true;
            }
        }
        return false;
    }
    this.checar_colisao_paineis = function (barreiras, direcao, deslocamento) {//retorna o indicie da barreira ou null
        let valor_previsto_cimabai = 0;
        let valor_previsto_diresq = 0;
        if (direcao == DIREITA) {
            valor_previsto_diresq = deslocamento - 1;//deslocamento futuro.
        }
        else if (direcao == ESQUERDA) {
            valor_previsto_diresq = - deslocamento + 1;
        }
        else if (direcao == CIMA) {
            valor_previsto_cimabai = -deslocamento + 1;
        }
        else if (direcao == BAIXO) {
            valor_previsto_cimabai = deslocamento - 1;
        }

        let formaaux = new Rectangle();//inicia a projeção de uma forma
        formaaux.init(this.forma.x + valor_previsto_diresq, this.forma.y + valor_previsto_cimabai, this.forma.largura, this.forma.altura)

        for (let i = 0; i < barreiras.length; i++) {
            let formaB = barreiras[i].forma;
            if (formaaux.colisao(formaB.x, formaB.y, formaB.largura, formaB.altura)) {
                return i;
            }
        }
        return null;
    }
    this.checar_colisao_tunel = function (tuneis, direcao, deslocamento) {//retorna o indicie da barreira ou null
        let valor_previsto_cimabai = 0;
        let valor_previsto_diresq = 0;
        if (direcao == DIREITA) {
            valor_previsto_diresq = deslocamento - 1;//deslocamento futuro.
        }
        else if (direcao == ESQUERDA) {
            valor_previsto_diresq = - deslocamento + 1;
        }
        else if (direcao == CIMA) {
            valor_previsto_cimabai = -deslocamento + 1;
        }
        else if (direcao == BAIXO) {
            valor_previsto_cimabai = deslocamento - 1;
        }

        let formaaux = new Rectangle();//inicia a projeção de uma forma
        formaaux.init(this.forma.x + valor_previsto_diresq, this.forma.y + valor_previsto_cimabai, this.forma.largura, this.forma.altura)

        for (let i = 0; i < tuneis.length; i++) {
            let formaB = tuneis[i].forma;
            if (formaaux.colisao(formaB.x, formaB.y, formaB.largura, formaB.altura)) {
                return i;
            }
        }
        return null;
    }
    this.deslocamento = function (larguraVisivel, larguraMap) {//para câmera. Apagar
        if (this.x > larguraVisivel / 2) {
            if (this.x < (larguraMap - larguraVisivel / 2))//pega a variação de movimento
                this.desl = -(this.x - (larguraVisivel / 2));
            //getFase1().setxCena(-(personagem.x-(larguraVisivel/2)));

        }
    }


}
