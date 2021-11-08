function ControllerFase1() {
    this.contexto = null;
    this.fase1colisao = new Camada(); //controller1
    this.cenario1 = new Cenario();  //controller1
    this.movimentos_validos = []//personagem!
    this.autorizar_movimento_personagem = false;//cenario!
    this.camada_livre = new Camada()
    this.barreiras = [];//cenario!
    this.paineis_barreiras = [];//cenario!
    this.veiculos = [];//cenario
    this.trem = new Trem();//cenario
    //cenario vetor de tuneis!
    this.tunels = []
    this.quantidade_veiculos_ultrapassar = 10;

    this.loop_game = function () {
        this.renderiza();
        this.desenha();
    }
    this.renderiza = function () {
        if (cronometro.comparar_tempo(cronometroTrem.hora, cronometroTrem.minuto, cronometroTrem.segundo)) {
            this.trem.status = ATIVO
            this.trem.set_trem_deve_passar(true);
            this.fechar_barreiras()
        }
        //remover classe de alerta
        if (cronometro.comparar_tempo_intervalo_decrementado(cronometroTrem.hora, cronometroTrem.minuto, cronometroTrem.segundo,15)) {
            $('#tempo-restante').removeClass('alerta-trem-vindo')
            elementos.add_alerta_comum(MSG_TREM_VINDO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
            setTimeout(function () {
                elementos.remove_add_alerta_comum()
            },14000)
           // alert("Vem")
        }
        //add classe alerta
        if (cronometro.comparar_tempo_intervalo_decrementado(cronometroTrem.hora, cronometroTrem.minuto, cronometroTrem.segundo,12)) {
            $('#tempo-restante').removeClass('alerta-trem-vindo')
            $('#tempo-restante').addClass('alerta-trem-vindo')
           // alert("Vem")
        }
        //se faltar 10 segundos pro trem vir

    }
    this.initgame = function () {//FASE 1
        //camada de colisão!
        let camada_colisao_area_jogavel = [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69];//camada de colisao fase1
        let camada_colisao_objetos = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            57, 57, 57, 57, 0, 0, 0, 0, 57, 57, 57, 57, 57, 57, 57, 57, 0, 0, 0, 0, 57, 57, 57, 57,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            57, 57, 57, 57, 0, 0, 0, 0, 57, 57, 57, 57, 57, 57, 57, 57, 0, 0, 0, 0, 57, 57, 57, 57,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//camada de colisao fase1

        this.contexto = document.getElementById("canvas").getContext("2d");
        this.fase1colisao.init(10, 24, 32, 32, camada_colisao_objetos, 0, this.contexto);//inicia a distribuição das formas de colisao
        this.camada_livre.init(10, 24, 32, 32, camada_colisao_area_jogavel, 0, this.contexto);//inicia a distribuição das formas de colisao
        personagem.sprite.carregar_sprite(4, 5, perImg);
        personagem.forma.init(personagem.x, personagem.altura / 2 - 2, TILE_AREA - 2, TILE_AREA - 2);
        //CENARIO
        this.cenario1.init([fase1c1Img, fase1c2Img, fase1c3Img], TAM_HEGTH_TELA_CANVAS_JOGAVEL, TAM_WIDTH_TELA_CANVAS, [this.fase1colisao]);
        //BARREIRAS
        this.add_barreiras(TILE_AREA * 5, TILE_AREA * 1, ESQUERDA, CIMA);//x e y;
        this.add_barreiras(TILE_AREA * 17, TILE_AREA * 1, DIREITA, CIMA);//x e y;
        this.add_barreiras(TILE_AREA * 5, TILE_AREA * 4, ESQUERDA, BAIXO);//x e y;
        this.add_barreiras(TILE_AREA * 17, TILE_AREA * 4, DIREITA, BAIXO);//x e y;
        this.barreiras[2].set_status(BARREIRA_OPEN)
        this.barreiras[2].atualizar_sprite(this.contexto, true, TILE_AREA * 3 - TILE_AREA / 2)
        //PAINEIS (alavanca)
        this.add_paineis_barreiras(TILE_AREA * 4, TILE_AREA * 3);//x e y;
        this.add_paineis_barreiras(TILE_AREA * 16, TILE_AREA * 3);//x e y;
        this.add_paineis_barreiras(TILE_AREA * 4, TILE_AREA * 6);//x e y;
        this.add_paineis_barreiras(TILE_AREA * 16, TILE_AREA * 6);//x e y;
        //VEICULOS
        this.add_veiculo(TILE_AREA * 6, TILE_AREA * 7, carro1Img, ESQUERDA, CIMA);
        this.add_veiculo(TILE_AREA * 18, TILE_AREA * 1, carro1Img, DIREITA, BAIXO);

        //TREM
        this.add_trem(TILE_AREA * -6, TILE_AREA * 2, caixa, DIREITA);
        //TUNEL
        this.add_tunel(TILE_AREA * 22, TILE_AREA * 1, tunelImg, ESQUERDA)
        this.add_tunel(TILE_AREA * 0, TILE_AREA * 8, tunelImg, DIREITA)
        //CRONOMETRO
        cronometro.relogio = elementos.get_cronometro();
        cronometroTrem.relogio = elementos.get_cronometro_trem()
        intervalo_cronometro = setInterval(function () {
            cronometro.rodando();
        }, 1000);
        cronometro.set_intervalo(false);
        cronometroTrem.incrementa_relogio_intervalo(10)

        this.loop_game();

    }
    this.checar_fim_fase = function () {
        if (this.quantidade_veiculos_ultrapassar <= 0)
            return true;
        return false;
    }
    this.fechar_barreiras = function () {
        for (let i = 0; i < this.barreiras.length; i++) {
            this.barreiras[i].set_status(BARREIRA_CLOSE)
            this.paineis_barreiras[i].set_status(BARREIRA_CLOSE)
            // this.barreiras[i].atualizar_sprite(this.contexto, true)
        }
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
        this.trem.set_intervalo_trem_passar(10 * 18)//3 MIN
        this.trem.forma.init(this.trem.x, this.trem.y, this.trem.largura - TILE_AREA * 3, this.trem.altura - TILE_AREA * 2)
        this.trem.set_trem_deve_passar(false)
        this.trem.set_movimento_antigo()
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
        barreira1.sprite.carregar_sprite(1, 2, caixaFalseImg);
        barreira1.forma.init(barreira1.x, barreira1.y, barreira1.largura, 32)
        this.paineis_barreiras.push(barreira1);
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
    this.desenha = function () {
        this.contexto.fillStyle = "white";
        //Camadas
        this.contexto.drawImage(this.cenario1.camadasImg[0], 0, 0, this.cenario1.largura, this.cenario1.altura)//CHAO
        //this.contexto.drawImage(vilaoImg, 0, 0, this.cenario1.largura, this.cenario1.altura)
        //formas Cenario.
        this.contexto.strokeRect(personagem.forma.x, personagem.forma.y, personagem.forma.largura, personagem.forma.altura);
        this.contexto.drawImage(this.cenario1.camadasImg[1], 0, 0, this.cenario1.largura, this.cenario1.altura);//TRILHOS
        this.contexto.drawImage(this.cenario1.camadasImg[2], 0, 0, this.cenario1.largura, this.cenario1.altura);//CAMADA CONE!
        this.contexto.globalAlpha = 0.3;


        if ($('#play').attr('name') == 'play')
            for (let i = 0; i < this.camada_livre.formasTile.length; i++) {
                let forma = this.camada_livre.formasTile[i];
                this.contexto.globalAlpha = 0.1;
                this.contexto.drawImage(circuloImg, (forma.x + 5), forma.y + 5, forma.largura - 10, forma.altura - 10);//Central
                this.contexto.globalAlpha = 0.2;
                this.contexto.drawImage(caixaenergia, (forma.x + 0) + 3, forma.y + 5, forma.largura - 6, forma.altura - 10);//Central
                this.contexto.strokeRect((forma.x + 0), forma.y, forma.largura, forma.altura);//deslocamento ja vem negativo.
                //console.log(i);
            }
        //Gradiente
        this.contexto.globalAlpha = 1.0;
        this.contexto.fillStyle = "black";
        this.contexto.font = "24px sans-serif ";


        this.contexto.strokeRect(personagem.forma.x, personagem.forma.y, personagem.forma.largura, personagem.forma.altura);



        //Veiculos
        for (let i = 0; i < this.veiculos.length; i++) {
            let veiculo = this.veiculos[i];
            veiculo.atualizar_sprite(this.contexto, veiculo.direcaoAtual)//posicionar no local certo
            this.contexto.strokeRect((veiculo.forma.x + 0), veiculo.forma.y, veiculo.forma.largura, veiculo.forma.altura);//deslocamento ja vem negativo.
            //console.log(i);
        }

        //console.log(i);
        //trem
        this.trem.atualizar_sprite(this.contexto, this.trem.direcaoAtual)
        this.contexto.strokeRect(this.trem.forma.x, this.trem.forma.y, this.trem.forma.largura, this.trem.forma.altura);
        //Personagem

        if (personagem.lado == CIMA)
            personagem.atualizar_sprite(this.contexto, personagem.direcaoAtual == PAINEL || personagem.direcaoAtual == VAZIO || personagem.direcaoAtual == TUNEL ? personagem.direcaoAntiga : personagem.direcaoAtual);//printa o personagem!
        //Barreiras e paineis
        for (let i = 0; i < this.barreiras.length; i++) {//enquanto for de mesmo tamnaho!
            let barreira = this.barreiras[i];
            let painel = this.paineis_barreiras[i]
            barreira.atualizar_sprite(this.contexto, false, TILE_AREA * 3 - TILE_AREA / 2)
            painel.atualizar_sprite(this.contexto, false, TILE_AREA)
            this.contexto.strokeRect((barreira.forma.x + 0), barreira.forma.y, barreira.forma.largura, barreira.forma.altura);//deslocamento ja vem negativo.
            this.contexto.strokeRect((painel.forma.x + 0), painel.forma.y, painel.forma.largura, painel.forma.altura);
            //console.log(i);
        }

        //Personagem
        if (personagem.lado != CIMA)
            personagem.atualizar_sprite(this.contexto, personagem.direcaoAtual == PAINEL || personagem.direcaoAtual == VAZIO || personagem.direcaoAtual == TUNEL ? personagem.direcaoAntiga : personagem.direcaoAtual);//printa o personagem!

        //Tunels
        for (let i = 0; i < this.tunels.length; i++) {//enquanto for de mesmo tamnaho!
            let tunel = this.tunels[i];
            tunel.atualizar_sprite(this.contexto)
            this.contexto.strokeRect((tunel.forma.x), tunel.forma.y, tunel.forma.largura, tunel.forma.altura);//deslocamento ja vem negativo.
            //this.contexto.strokeRect((painel.forma.x + 0), painel.forma.y, painel.forma.largura, painel.forma.altura);
            //console.log(i);
        }
        this.draw_life(); //estudar se coloca um inventario para isso!;
    }


    this.draw_life = function () { //ficara dentro do controle inventario!
        elementos.alterar_valor_life_inventario(personagem.dano);
    }
    this.autorizar_movimento_personagem = function () {//validar movimentos personagem.(coleta do painel)
        for (var key in movimentos) {//variavel movimentos em controller geral
            var value = movimentos[key];
            $(key).css('background-color', "white");
            // $(key).css('background-size', '95% 95%');
            // $(key+' div').css('background-image', 'url()');
            //aqui na andada!
            if (movimentos[key] != 'VAZIO')
                this.movimentos_validos.push([key, TILE_AREA])//metodo em personagem!
        }
        personagem.set_movimento_antigo()
        this.autorizar_movimento = true;

    }
    this.movimento_veiculos = function () {
        //TREM
        //verificar se eh hora de passar!
        if (this.trem.get_trem_deve_passar()) {
            if (this.trem.status == ATIVO && this.trem.direcaoAtual == DIREITA)
                this.trem.x = this.trem.x + this.trem.velocidade;
            else if (this.trem.status == ATIVO && this.trem.direcaoAtual == ESQUERDA)
                this.trem.x = this.trem.x - this.trem.velocidade;
            this.trem.atualizar_forma()
            this.trem.podeMudarSprite = true;
            //colisao com carros!
            //dano de 
            if (this.trem.checar_saida_cenario(TAM_WIDTH_TELA_CANVAS, TAM_HEGTH_TELA_CANVAS)) {
                //alert("TREM PASSOU!!")
                // elementos.add_alerta_comum(MSG_TREM_VIA)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                // setTimeout(function () {
                //     elementos.remove_add_alerta_comum()
                // },5000)
                this.trem.status = INATIVO
                this.trem.resetar_movimento();
                //atualizar hora de passar!
                //liberar movimentos
                this.trem_deve_passar = false;
                cronometroTrem.incrementa_relogio_intervalo(this.trem.get_intervalo_trem_passar())
            }
        }
        //CARROS
        let index = [];
        for (let i = 0; i < this.veiculos.length; i++) {
            let veiculo = this.veiculos[i]
            if (veiculo.checar_colisao_barreira(this.barreiras, veiculo.direcaoAtual))
                veiculo.resetar_movimento()
            else {
                if (veiculo.status == ATIVO && veiculo.direcaoAtual == CIMA)
                    veiculo.y = veiculo.y - veiculo.velocidade;
                else if (veiculo.status == ATIVO && veiculo.direcaoAtual == BAIXO)
                    veiculo.y = veiculo.y + veiculo.velocidade;
                veiculo.set_movimento_antigo()
                veiculo.podeMudarSprite = true;
            }

            if (veiculo.checar_saida_cenario(TAM_WIDTH_TELA_CANVAS, TAM_HEGTH_TELA_CANVAS)) {
                veiculo.status = INATIVO
                index.push(i);
                this.quantidade_veiculos_ultrapassar = this.quantidade_veiculos_ultrapassar - 1;
                elementos.add_alerta_comum("RESTA(M) " + this.quantidade_veiculos_ultrapassar + " VEICULOS!" )//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                setTimeout(function () {
                    elementos.remove_add_alerta_comum()
                },5000)
                //fechar
            }
            if (veiculo.checar_colisao_objetos([this.trem])) {
                veiculo.status = INATIVO
                index.push(i);
                personagem.dano = personagem.dano + DANO_COLISAO_VEICULO_TREM;
                // alert("Bateu! +" + DANO_COLISAO_VEICULO_TREM + "s")
                elementos.add_alerta_comum(MSG_DANO_COLISAO_TREM )//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                setTimeout(function () {
                    elementos.remove_add_alerta_comum()
                },4000)
            } //ver se colide com o trem!


        }

        if (index.length > 0) {
            for (let i = 0; i < index.length; i++) {
                let veiculo = this.veiculos[index[i]];
                this.veiculos.splice(index[i], 1);
                this.novo_veiculo(veiculo);
                // alert(index[i] + "Tam c")
                //outro tem que entrar!
            }
        }

    }
    this.novo_veiculo = function (veiculoAntigo) {//add novo veiculo no cenário!
        // alert('novo veiculo: '+this.barreiras.length)
        for (let i = 0; i < this.barreiras.length; i++) {
            let barreira = this.barreiras[i]
            if (barreira.get_lado() == veiculoAntigo.get_lado() && barreira.direcaoAtual != personagem.lado) {//invertida!
                //alert('novo veiculo: '+veiculoAntigo.get_lado())
                barreira.set_status(BARREIRA_CLOSE)
                if (barreira.direcaoAtual == CIMA)
                    this.add_veiculo(veiculoAntigo.x, 0, carro1Img, veiculoAntigo.get_lado(), BAIXO);//INVERTIDO!
                else
                    this.add_veiculo(veiculoAntigo.x, TAM_HEGTH_TELA_CANVAS - veiculoAntigo.altura, carro1Img, veiculoAntigo.get_lado(), CIMA);
                return;
            }
        }

    }
    this.movimentos_personagem = function () {
        if (this.autorizar_movimento) {//p
            //remover movivemntos já executados
            if (this.movimentos_validos.length <= 0) {
                this.autorizar_movimento = false;
                personagem.emMovimento = false;
                $('#play').css('background-image', "url('assets/play.png')");
                $('#play').attr('name', 'play')
                this.resetar_cor_barra_comandos()
                return;
            } else {
                let direcao = movimentos[this.movimentos_validos[0][0]];
                if (personagem.checar_colisao_cenario(this.fase1colisao.formasTile, this.barreiras, this.veiculos, this.paineis_barreiras, this.tunels, TAM_WIDTH_TELA_CANVAS, this.cenario1.altura, direcao, personagem.velocidade)) {
                    $('#play').css('background-image', "url('assets/play.png')");
                    $('#play').attr('name', 'play')
                    this.resetar_cor_barra_comandos()
                    $(this.movimentos_validos[0][0]).css('background-color', "red");
                    this.movimentos_validos = []
                    this.autorizar_movimento = false;
                    personagem.emMovimento = false;
                    personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO);
                    // alert("Colisão + " + DANO_MOVIMENTO_ERRADO + " s")
                    elementos.add_alerta_comum(MSG_DANO_MOV_COLISAO_CENARIO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                    setTimeout(function () {
                        elementos.remove_add_alerta_comum()
                    },5000)
                    return;
                }
                if (direcao == PAINEL) {
                    let nBarreira = null;
                    nBarreira = personagem.checar_colisao_paineis(this.paineis_barreiras, personagem.direcaoAntiga, personagem.velocidade)
                    if (nBarreira != null) {
                        this.barreiras[nBarreira].alterar_estado()
                        this.barreiras[nBarreira].atualizar_sprite(this.contexto, true, TILE_AREA * 3 - TILE_AREA / 2)
                        this.paineis_barreiras[nBarreira].alterar_estado()
                        this.paineis_barreiras[nBarreira].atualizar_sprite(this.contexto, true, TILE_AREA)
                        // $(this.movimentos_validos[0][0] +' div').css("visibility", "hidden");
                        $(this.movimentos_validos[0][0] + ' div').remove()
                        movimentos[this.movimentos_validos[0][0]] = 'VAZIO'
                        $(this.movimentos_validos[0][0]).text("")
                        // alert('BARREIRA ' + this.barreiras[nBarreira].status)

                    } else {
                        personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO);
                        elementos.add_alerta_comum(MSG_DANO_MOV_ERRADO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                        setTimeout(function () {
                            elementos.remove_add_alerta_comum()
                        },5000)
                        $(this.movimentos_validos[0][0]).css('background-color', "red");
                    }
                    $('#play').css('background-image', "url('assets/play.png')");
                    $('#play').attr('name', 'play')
                    this.resetar_cor_barra_comandos()
                    //movimentos[this.movimentos_validos[0][0]] = 'VAZIO'
                    //$(this.movimentos_validos[0][0]).text("")
                    this.movimentos_validos = []
                    this.autorizar_movimento = false;
                    personagem.emMovimento = false;
                    return;
                }
                //tunel
                if (direcao == TUNEL) {
                    //OLHAR SE TUNEL É DIREITA OU ESQURDA
                    nTunel = personagem.checar_colisao_tunel(this.tunels, personagem.direcaoAntiga, personagem.velocidade)
                    if (nTunel != null) {
                        //alert('Colisao Tunel com escada a ' + this.tunels[nTunel].direcaoAtual)
                        if (this.tunels[nTunel].direcaoAtual == ESQUERDA) {
                            personagem.x = personagem.x - TILE_AREA * 19
                            personagem.y = personagem.y + TILE_AREA * 7
                            personagem.atualizar_forma()
                            personagem.direcaoAtual = DIREITA
                            personagem.lado = BAIXO
                            personagem.set_direcao_antiga()
                            personagem.set_movimento_antigo()
                        }
                        else {
                            personagem.x = personagem.x + TILE_AREA * 19
                            personagem.y = personagem.y - TILE_AREA * 7
                            personagem.atualizar_forma()
                            personagem.direcaoAtual = ESQUERDA
                            personagem.lado = CIMA
                            personagem.set_direcao_antiga()
                            personagem.set_movimento_antigo()
                        }
                        $(this.movimentos_validos[0][0] + ' div').remove()
                        $(this.movimentos_validos[0][0]).text("")
                        movimentos[this.movimentos_validos[0][0]] = VAZIO
                    } else {
                        //mudar cor da barra!
                        personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO);
                        elementos.add_alerta_comum(MSG_DANO_MOV_ERRADO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                        setTimeout(function () {
                            elementos.remove_add_alerta_comum()
                        },5000)
                        $(this.movimentos_validos[0][0]).css('background-color', "red");

                    }
                    $('#play').css('background-image', "url('assets/play.png')");
                    $('#play').attr('name', 'play')
                    this.resetar_cor_barra_comandos()
                    // movimentos[this.movimentos_validos[0][0]] = VAZIO
                    // $(this.movimentos_validos[0][0]).text("")
                    this.movimentos_validos = []
                    this.autorizar_movimento = false;
                    personagem.emMovimento = false;
                    return;
                }

                if (direcao == DIREITA) {
                    personagem.x = personagem.x + personagem.velocidade;
                }
                else if (direcao == ESQUERDA) {
                    personagem.x = personagem.x - personagem.velocidade;
                }
                else if (direcao == CIMA) {
                    personagem.y = personagem.y - personagem.velocidade;
                }
                else if (direcao == BAIXO) {
                    personagem.y = personagem.y + personagem.velocidade;
                }
                //fazer cancela abrir e carro passar!sprite cancela, sprite carro!colisao carro/cancela e carro
                //movimento carro
                //movimento trem!
                //choque persom carro!
                personagem.emMovimento = true;
                personagem.set_direcao_antiga();
                personagem.direcaoAtual = direcao;
                personagem.atualizar_forma();
                this.movimentos_validos[0][1] = this.movimentos_validos[0][1] - personagem.velocidade;//subtrai do movimento ativo!Peccore o tile area tdo
                console.log(this.movimentos_validos[0][1])
                if (this.movimentos_validos[0][1] <= 0) {
                    //aqui visibility
                    movimentos[this.movimentos_validos[0][0]] = 'VAZIO'
                    $(this.movimentos_validos[0][0]).text("")
                    this.movimentos_validos.shift()
                    personagem.sprite.aparencia = 0;
                    personagem.emMovimento = false;
                    personagem.set_movimento_antigo()
                    //resetar opacity

                }

            }

        }
    }
    this.resetar_cor_barra_comandos = function () {
        for (let i = 0; i < 17; i++) {
            $('#b' + (i + 1)).css('opacity', 1.0)
        }
    }
    this.movimentos = function () {
        this.movimento_veiculos()
        this.movimentos_personagem()
        this.renderiza()//por segurança@!
    }
}

