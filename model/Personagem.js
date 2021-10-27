//tudo que se move com deslocamento faz parte do cenario formas, caixas.
function Personagem() {
    Elemento.call(this);
    this.life = 100;
    this.dano = 5;
    this.largura = 64;//32;
    this.altura = 45;
    this.desl = 0;
    this.velocidade = 4;
    this.dxForma = 16;
    this.y = 20;
    this.yAntigo = 0;
    this.xAntigo = 0;
    this.direcaoAntiga = ''
    this.aplicarDano = function () {
        this.life -= this.dano;
        if (this.life <= 0)
            this.life = 0;
        this.atualizarForma();
    }
    this.checarGameOver = function () {
        if (this.life <= 0)
            return true;
        return false;
    }
    this.atualizarForma = function () {
        this.forma.x = this.x + this.dxForma + 1;
        this.forma.y = this.y + this.forma.altura / 2 - 2;
    }
    this.verificacaoEstouroSprite = function () {

        if (this.sprite.aparencia >= this.sprite.columns)
            this.sprite.aparencia = 0;
        // this.emMovimento = true; //false se quiser para de movimentar!
        this.podeMudarSprite = false;
    }

    this.atualizaSprite = function (context, direcao) {
        // i * width, j * height, width, height
        // ( imagem , sx(xdocorte) , sy(do cotre) , sWidth (do corte), sHeight(do corte) , dx (posicao na tela), dy , dWidth , dHeight );
        
        if (this.emMovimento && this.podeMudarSprite && direcao == DIREITA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 1 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == ESQUERDA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 3 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificacaoEstouroSprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == CIMA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 2 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
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

        let row = 0;//aqui Painel
        if (direcao == DIREITA)
            row = 1;
        else if (direcao == ESQUERDA)
            row = 3;
        else if (direcao == CIMA)
            row = 2;
        else if (direcao == BAIXO)
            row = 0;
        context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, row * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
    }
    
    this.set_movimento_antigo = function () {

        this.xAntigo = this.x;
        this.yAntigo = this.y;
        this.atualizarForma()

    }
    this.set_direcao_antiga = function () {
        if (this.direcaoAtual!=PAINEL)
            this.direcaoAntiga = this.direcaoAtual
        else
            this.emMovimento = false;
    }
    this.resetar_movimento = function () {
        this.x = this.xAntigo;
        this.y = this.yAntigo;
        this.atualizarForma()
    }
    this.checarColisaoCenario = function (formas, barreiras, veiculos, paineis, larguraCenario, alturaCenario, direcao, tilearea) {
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
        return false;
    }
    this.checarColisaoPaineis = function (barreiras, direcao, deslocamento) {//retorna o indicie da barreira ou null
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
    this.deslocamento = function (larguraVisivel, larguraMap) {//para câmera. Apagar
        if (this.x > larguraVisivel / 2) {
            if (this.x < (larguraMap - larguraVisivel / 2))//pega a variação de movimento
                this.desl = -(this.x - (larguraVisivel / 2));
            //getFase1().setxCena(-(personagem.x-(larguraVisivel/2)));

        }
    }


}
