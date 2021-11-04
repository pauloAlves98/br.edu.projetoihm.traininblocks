function Veiculo (){
    Elemento.call(this);
    //criar pelo menos a forma!
    this.status = ATIVO;
    this.velocidade  = TILE_AREA/4
    this.atualizar_forma = function () {
        this.forma.x = this.x+this.dx;
        this.forma.y = this.y +this.dy;
    }
    this.lado = ESQUERDA;//esquerdo direito centro
    this.set_lado = function (lado) {
        this.lado = lado;
    }
    this.get_lado = function () {
        return this.lado;
    }
    this.atualizar_sprite = function (context, direcao) {
        // i * width, j * height, width, height
        // ( imagem , sx(xdocorte) , sy(do corte) , sWidth (do corte), sHeight(do corte) , dx (posicao na tela), dy , dWidth , dHeight );
        if (this.emMovimento && this.podeMudarSprite && direcao == DIREITA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 2 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificar_estouro_sprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == ESQUERDA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 1 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificar_estouro_sprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == CIMA) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 3 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificar_estouro_sprite();
            //this.direcaoAtual = 0;
        }
        else if (this.emMovimento && this.podeMudarSprite && direcao == BAIXO) {
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, 0 * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
            this.sprite.aparencia++;
            this.verificar_estouro_sprite();
            //this.direcaoAtual = 0;
        }
        
        else if (this.emMovimento || !this.emMovimento) { //REMOVER CONDICIONAL
            if (this.direcaoAtual == DIREITA)
                row = 2;
            else if (this.direcaoAtual == ESQUERDA)
                row = 1;
            else if (this.direcaoAtual == CIMA)
                row = 3;
            else if (this.direcaoAtual == BAIXO)
                row = 0;
            context.drawImage(this.sprite.folheto, this.sprite.aparencia * this.sprite.width, row * this.sprite.height, this.sprite.width, this.sprite.height, this.x, this.y, this.largura, this.altura);
        }
    }
    this.checar_colisao_barreira = function (barreiras,direcao) {
        //deslocamento previsto
        let valor_previsto_cimabai = 0;
        let valor_previsto_diresq = 0;
        if (direcao == DIREITA) {
            valor_previsto_diresq = this.velocidade - 1;//tem q fazer uma previsão que vai bater
        }
        else if (direcao == ESQUERDA) {
            valor_previsto_diresq = - this.velocidade + 1;
        } else if (direcao == CIMA) {
            valor_previsto_cimabai = -this.velocidade + 1;
        }
        else if (direcao == BAIXO) {
            valor_previsto_cimabai = this.velocidade - 1;
        }
        //barreiras
        let formaaux = new Rectangle();
        formaaux.init(this.forma.x + valor_previsto_diresq, this.forma.y + valor_previsto_cimabai, this.forma.largura, this.forma.altura)
        for (let i = 0; i < barreiras.length; i++) {
            if(barreiras[i].status == BARREIRA_OPEN)
                continue;
            let formaB = barreiras[i].forma;
            if (formaaux.colisao(formaB.x, formaB.y, formaB.largura, formaB.altura)) {
                this.resetar_movimento()
                return true;
            }
        }
        return false;
    }
    this.checar_colisao_objetos = function (objetos) {
        //objetos
        let formaaux = new Rectangle();
        formaaux.init(this.forma.x, this.forma.y, this.forma.largura, this.forma.altura)
        for (let i = 0; i < objetos.length; i++) {
            let formaB = objetos[i].forma;
            if (formaaux.colisao(formaB.x, formaB.y, formaB.largura, formaB.altura)) 
                return true;
        }
        return false;
    }
    this.checar_saida_cenario = function(larguraCenario, alturaCenario){
       
        if (this.direcaoAtual == DIREITA && (this.forma.x > larguraCenario))//passou
            return true;
        else if (this.direcaoAtual  == ESQUERDA && this.forma.x + this.largura <= 0) 
            return true;
        else if (this.direcaoAtual == CIMA && this.forma.y + this.altura <= 0) 
            return true;
        else if (this.direcaoAtual == BAIXO && this.forma.y >= alturaCenario) 
            return true;

        return false
    }

    this.verificar_estouro_sprite = function () {

        if (this.sprite.aparencia >= this.sprite.columns)
            this.sprite.aparencia = 0;
       // this.emMovimento = true; //false se quiser para de movimentar!
       this.podeMudarSprite = false;
    }
    this.set_movimento_antigo = function () {
        this.xAntigo = this.x;
        this.yAntigo = this.y;
        this.atualizar_forma()

    }
    this.resetar_movimento = function () {
        this.x = this.xAntigo;
        this.y = this.yAntigo;
        this.atualizar_forma()
    }
}