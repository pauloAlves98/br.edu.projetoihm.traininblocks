function ControllerFase2(personagem, movimentos, elementos_inventario, cronometro, cronometroTrem) {
    this.contexto = null;
    this.cenario = new Cenario();  //controller1
    this.quantidade_veiculos_ultrapassar = 25;
    this.objetivoAtual = 1;
    this.objetivos = []

    this.loop_game = function () {
        this.renderiza();
        this.desenha();
    }

    this.renderiza = function () {
        if (cronometro.comparar_tempo(cronometroTrem.hora, cronometroTrem.minuto, cronometroTrem.segundo) && !EM_PAUSE) {
            this.cenario.trem.status = ATIVO
            this.cenario.trem.set_trem_deve_passar(true);
            this.cenario.fechar_barreiras()
            // Howler.volume(0.15);
            sound_trem.play()
        }
        //remover classe de alerta
        if (cronometro.comparar_tempo_intervalo_decrementado(cronometroTrem.hora, cronometroTrem.minuto, cronometroTrem.segundo, 15) && !EM_PAUSE) {
            $('#tempo-restante').removeClass('alerta-trem-vindo')
            elementos_inventario.add_alerta_comum(MSG_TREM_VINDO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
            setTimeout(function () {
                elementos_inventario.remove_add_alerta_comum()
            }, 14000)
            // alert("Vem")
        }
        //add classe alerta
        if (cronometro.comparar_tempo_intervalo_decrementado(cronometroTrem.hora, cronometroTrem.minuto, cronometroTrem.segundo, 12) && !EM_PAUSE) {
            $('#tempo-restante').removeClass('alerta-trem-vindo')
            $('#tempo-restante').addClass('alerta-trem-vindo')
            // alert("Vem")
        }
        //se faltar 10 segundos pro trem vir

    }
    this.initgame = function () {//FASE 1
        //camada de colisão!
        let camada_colisao_area_jogavel = [360,360,360,360,360,360,0,360,360,360,360,360,360,360,360,360,360,360,360,360,360,360,0,0,
            360,360,360,360,360,360,360,360,360,360,360,360,360,360,0,0,360,360,360,360,360,360,0,0,
            360,360,360,360,360,360,360,360,344,360,360,360,360,360,360,360,360,360,360,360,360,360,360,360,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,360,360,360,360,360,360,360,344,360,360,360,360,360,360,344,360,360,360,360,360,0,0,
            0,0,360,360,360,360,360,0,360,360,360,360,360,360,360,360,360,360,360,360,360,360,0,0,
            360,360,360,360,360,360,360,360,360,360,360,360,360,360,360,360,0,360,360,360,360,360,0,0];//camada de colisao fases
        let camada_colisao_objetos = [
            0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 50,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 74, 75, 0, 0, 0, 0, 0, 0, 65, 66,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            863, 863, 0, 0, 0, 0, 863, 863, 863, 863, 0, 0, 0, 0, 863, 863, 863, 0, 0, 0, 0, 863, 863, 863,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            863, 863, 0, 0, 0, 0, 863, 863, 863, 863, 0, 0, 0, 0, 863, 863, 863, 0, 0, 0, 0, 863, 863, 863,
            51, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 201, 203,
            65, 66, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 217, 219,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 233, 235];//camada de colisao fase1

        this.contexto = document.getElementById("canvas").getContext("2d");
        // personagem.sprite.carregar_sprite(4, 5, perImg);
        // personagem.forma.init(personagem.x, personagem.altura / 2 - 2, TILE_AREA - 2, TILE_AREA - 2);
        //CENARIO
        let fase2colisao = new Camada(); //controller1
        fase2colisao.init(10, 24, 32, 32, camada_colisao_objetos, 0, this.contexto);//inicia a distribuição das formas de colisao
        let camada_livre = new Camada()
        camada_livre.init(10, 24, 32, 32, camada_colisao_area_jogavel, 0, this.contexto);//inicia a distribuição das formas de colisao
        this.cenario.init([fase2c1Img, fase2c2Img, fase2c3Img], TAM_HEGTH_TELA_CANVAS_JOGAVEL, TAM_WIDTH_TELA_CANVAS, [fase2colisao], camada_livre);
        //BARREIRAS
        this.cenario.add_barreiras(TILE_AREA * 3, TILE_AREA * 1, ESQUERDA, CIMA);//x e y;
        this.cenario.add_barreiras(TILE_AREA * 11, TILE_AREA * 1, CENTRO, CIMA);//x e y;
        this.cenario.add_barreiras(TILE_AREA * 18, TILE_AREA * 1, DIREITA, CIMA);//x e y;
        this.cenario.add_barreiras(TILE_AREA * 3, TILE_AREA * 4, ESQUERDA, BAIXO);//x e y;
        this.cenario.add_barreiras(TILE_AREA * 11, TILE_AREA * 4, CENTRO, BAIXO);//x e y;
        this.cenario.add_barreiras(TILE_AREA * 18, TILE_AREA * 4, DIREITA, BAIXO);//x e y;
        // this.cenario.barreiras [2].set_status(BARREIRA_OPEN)
        // this.cenario.barreiras [2].atualizar_sprite(this.contexto, true, TILE_AREA * 3 - TILE_AREA / 2)
        //PAINEIS (alavanca)
        this.cenario.add_paineis_barreiras(TILE_AREA * 2, TILE_AREA * 3);//x e y;
        this.cenario.add_paineis_barreiras(TILE_AREA * 10, TILE_AREA * 3);//x e y;
        this.cenario.add_paineis_barreiras(TILE_AREA * 17, TILE_AREA * 3);//x e y;
        this.cenario.add_paineis_barreiras(TILE_AREA * 2, TILE_AREA * 6);//x e y;
        this.cenario.add_paineis_barreiras(TILE_AREA * 10, TILE_AREA * 6);//x e y;
        this.cenario.add_paineis_barreiras(TILE_AREA * 17, TILE_AREA * 6);//x e y;
        //VEICULOS
        this.cenario.add_veiculo(TILE_AREA * 4, TILE_AREA * 7, carro1Img, ESQUERDA, CIMA);
        this.cenario.add_veiculo(TILE_AREA * 12, TILE_AREA * 1, carro2Img, CENTRO, BAIXO);
        this.cenario.add_veiculo(TILE_AREA * 19, TILE_AREA * 1, carro2Img, DIREITA, CIMA);
        //TREM
        this.cenario.add_trem(TILE_AREA * -6, TILE_AREA * 2, tremImg, DIREITA);
        //TUNEL
        this.cenario.add_tunel(TILE_AREA * 22, TILE_AREA * 1, tunelImg, ESQUERDA)
        this.cenario.add_tunel(TILE_AREA * 0, TILE_AREA * 8, tunelImg, DIREITA)
        //CRONOMETRO
        // cronometro.relogio = elementos_inventario.get_cronometro();
        // cronometroTrem.relogio = elementos_inventario.get_cronometro_trem()
        // cronometroTrem.incrementa_relogio_intervalo(this.cenario.trem.get_intervalo_trem_passar())
        // cronometro.set_intervalo(false);
        // intervalo_cronometro = setInterval(function () {
        //     if(!EM_PAUSE)
        //       cronometro.rodando();
        // }, 1000);
        personagem.y = 20;
        personagem.x = -15;
        personagem.atualizar_forma()
        personagem.lado = CIMA
        // this.loop_game();
        // elementos_inventario.alterar_quantidade_veiculos_inventario(this.quantidade_veiculos_ultrapassar)
        //objetivos
        this.objetivos = [['ABRA A BARREIRA 2', false], ['ABRA A BARREIRA 1', false], ['ABRA A BARREIRA 3', false], ['ABRA A BARREIRA 5', false], ['ABRA A BARREIRA 4', false], ['ABRA A BARREIRA 6', false]]
        elementos_inventario.alterar_objetivo('<div>VÁ EM DIREÇÃO  A ALAVANCA <img width="20px" height="25px" src = "../assets/comando_painel.png" alt="alavanca"> E ABRA A BARREIRA <img   width="50px" height="30px" src = "../assets/barreira_inventario.png" alt="barreiras"> DE Nº <span class="span-quantidade-veiculos" id="quantidade_veiculos">  ' + 2 + '</span></div>')
    }

    this.checar_fim_fase = function () {
        let aux = true;
        for (let i = 0; i < this.objetivos.length; i++) {
            if (this.objetivos[i][1] == false)//caso nao tenha mais objetivos!
                aux = false;
        }

        return aux;
    }

    this.desenha = function () {
        this.contexto.fillStyle = "white";

        //Camadas
        this.contexto.drawImage(this.cenario.camadasImg[0], 0, 0, this.cenario.largura, this.cenario.altura)//CHAO
        //this.contexto.drawImage(vilaoImg, 0, 0, this.cenario.largura, this.cenario.altura)
        //formas Cenario.

        //camadas 2 e 3
        this.contexto.drawImage(this.cenario.camadasImg[1], 0, 0, this.cenario.largura, this.cenario.altura);//TRILHOS
        this.contexto.drawImage(this.cenario.camadasImg[2], 0, 0, this.cenario.largura, this.cenario.altura);//CAMADA CONE!
        // this.contexto.strokeRect(personagem.forma.x, personagem.forma.y, personagem.forma.largura, personagem.forma.altura);
        //pegadas
        if ($('#play').attr('name') == 'play')
            for (let i = 0; i < this.cenario.camadaAreaJogavel.formasTile.length; i++) {
                let forma = this.cenario.camadaAreaJogavel.formasTile[i];
                this.contexto.globalAlpha = 0.8;
                this.contexto.drawImage(circuloImg, (forma.x + 0) + 3, forma.y + 5, forma.largura - 6, forma.altura - 10);//Central
                this.contexto.strokeRect((forma.x + 0), forma.y, forma.largura, forma.altura);//deslocamento ja vem negativo
                this.contexto.globalAlpha = 1.0;
                this.contexto.drawImage(pegadasImg, (forma.x + 5), forma.y + 5, forma.largura - 10, forma.altura - 10);//Central
                //console.log(i);
            }
        this.contexto.globalAlpha = 0.3;

        //Gradiente
        this.contexto.globalAlpha = 1.0;
        this.contexto.fillStyle = "black";
        this.contexto.font = "24px sans-serif ";
        // this.contexto.strokeRect(personagem.forma.x, personagem.forma.y, personagem.forma.largura, personagem.forma.altura);
        //Veiculos
        for (let i = 0; i < this.cenario.veiculos.length; i++) {
            let veiculo = this.cenario.veiculos[i];
            veiculo.atualizar_sprite(this.contexto, veiculo.direcaoAtual)//posicionar no local certo
            // this.contexto.strokeRect((veiculo.forma.x + 0), veiculo.forma.y, veiculo.forma.largura, veiculo.forma.altura);//deslocamento ja vem negativo.
            //console.log(i);
        }

        //console.log(i);
        if (personagem.lado == CIMA)
            personagem.atualizar_sprite(this.contexto, personagem.direcaoAtual == PAINEL || personagem.direcaoAtual == VAZIO || personagem.direcaoAtual == TUNEL ? personagem.direcaoAntiga : personagem.direcaoAtual);//printa o personagem!
        //Barreiras e paineis
        for (let i = 0; i < this.cenario.barreiras.length; i++) {//enquanto for de mesmo tamnaho!
            let barreira = this.cenario.barreiras[i];
            let painel = this.cenario.paineis_barreiras[i]
            //numeros
            this.contexto.globalAlpha = 0.5;
            this.contexto.fillStyle = "black";
            this.contexto.fillRect(barreira.forma.x + 32, barreira.forma.y, 32, 32)
            this.contexto.globalAlpha = 1;
            this.contexto.font = "28px sans-serif ";
            this.contexto.fillStyle = "white";
            this.contexto.fillText(" " + (i + 1), barreira.forma.x + 31, barreira.forma.y + 26);//sombra
            this.contexto.font = "24px sans-serif ";
            this.contexto.fillStyle = "rgb(2, 201, 220";
            this.contexto.fillText(" " + (i + 1), barreira.forma.x + 32, barreira.forma.y + 26);

            if (barreira.direcaoAtual == CIMA) {
                barreira.atualizar_sprite(this.contexto, false, TILE_AREA * 3 - TILE_AREA / 2)
                painel.atualizar_sprite(this.contexto, false, TILE_AREA)
                //  this.contexto.strokeRect((barreira.forma.x + 0), barreira.forma.y, barreira.forma.largura, barreira.forma.altura);//deslocamento ja vem negativo.
                // this.contexto.strokeRect((painel.forma.x + 0), painel.forma.y, painel.forma.largura, painel.forma.altura);
                //console.log(i);

            }

        }
        //trem
        this.cenario.trem.atualizar_sprite(this.contexto, this.cenario.trem.direcaoAtual)
        // this.contexto.strokeRect(this.cenario.trem.forma.x, this.cenario.trem.forma.y, this.cenario.trem.forma.largura, this.cenario.trem.forma.altura);
        //Barreiras e paineis
        for (let i = 0; i < this.cenario.barreiras.length; i++) {//enquanto for de mesmo tamnaho!
            let barreira = this.cenario.barreiras[i];
            let painel = this.cenario.paineis_barreiras[i]
            if (barreira.direcaoAtual == BAIXO) {
                barreira.atualizar_sprite(this.contexto, false, TILE_AREA * 3 - TILE_AREA / 2)
                painel.atualizar_sprite(this.contexto, false, TILE_AREA)
                // this.contexto.strokeRect((barreira.forma.x + 0), barreira.forma.y, barreira.forma.largura, barreira.forma.altura);//deslocamento ja vem negativo.
                // this.contexto.strokeRect((painel.forma.x + 0), painel.forma.y, painel.forma.largura, painel.forma.altura);
                //console.log(i);
            }

        }
        //Personagem
        if (personagem.lado != CIMA)
            personagem.atualizar_sprite(this.contexto, personagem.direcaoAtual == PAINEL || personagem.direcaoAtual == VAZIO || personagem.direcaoAtual == TUNEL ? personagem.direcaoAntiga : personagem.direcaoAtual);//printa o personagem!

        //Tunels
        for (let i = 0; i < this.cenario.tunels.length; i++) {//enquanto for de mesmo tamnaho!
            let tunel = this.cenario.tunels[i];
            tunel.atualizar_sprite(this.contexto)
            // this.contexto.strokeRect((tunel.forma.x), tunel.forma.y, tunel.forma.largura, tunel.forma.altura);//deslocamento ja vem negativo.
            // this.contexto.strokeRect((painel.forma.x + 0), painel.forma.y, painel.forma.largura, painel.forma.altura);
            //console.log(i);
        }
        this.draw_life(); //estudar se coloca um inventario para isso!;
    }

    this.draw_life = function () { //ficara dentro do controle inventario!
        elementos_inventario.alterar_valor_life_inventario(personagem.life);
        elementos_inventario.alterar_valor_dano_tempo_inventario(personagem.dano);
    }

    this.movimento_veiculos = function () { //cenario?
        //TREM
        //verificar se eh hora de passar!
        if (this.cenario.trem.get_trem_deve_passar()) {
            if (this.cenario.trem.status == ATIVO && this.cenario.trem.direcaoAtual == DIREITA)
                this.cenario.trem.x = this.cenario.trem.x + this.cenario.trem.velocidade;
            else if (this.cenario.trem.status == ATIVO && this.cenario.trem.direcaoAtual == ESQUERDA)
                this.cenario.trem.x = this.cenario.trem.x - this.cenario.trem.velocidade;
            this.cenario.trem.atualizar_forma()
            this.cenario.trem.podeMudarSprite = true;
            //colisao com carros!
            //dano de 
            if (this.cenario.trem.checar_saida_cenario(TAM_WIDTH_TELA_CANVAS, TAM_HEGTH_TELA_CANVAS)) {
                //alert("TREM PASSOU!!")
                // elementos.add_alerta_comum(MSG_TREM_VIA)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                // setTimeout(function () {
                //     elementos.remove_add_alerta_comum()
                // },5000)
                this.cenario.trem.status = INATIVO
                this.cenario.trem.resetar_movimento();
                //atualizar hora de passar!
                //liberar movimentos
                this.cenario.trem_deve_passar = false;
                cronometroTrem.incrementa_relogio_intervalo(this.cenario.trem.get_intervalo_trem_passar())
                // Howler.volume(0.0);
                sound_trem.stop()
            }
        }
        //CARROS
        let index = [];
        for (let i = 0; i < this.cenario.veiculos.length; i++) {
            let veiculo = this.cenario.veiculos[i]
            if (veiculo.checar_colisao_barreira(this.cenario.barreiras, veiculo.direcaoAtual))
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
                // this.quantidade_veiculos_ultrapassar = this.quantidade_veiculos_ultrapassar - 1;
                // elementos_inventario.alterar_quantidade_veiculos_inventario(this.quantidade_veiculos_ultrapassar)
                // elementos_inventario.add_alerta_comum("RESTA(M) " + this.quantidade_veiculos_ultrapassar + " VEICULOS!")//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                // setTimeout(function () {
                //     elementos_inventario.remove_add_alerta_comum()
                // }, 5000)
                //fechar
            }
            if (veiculo.checar_colisao_objetos([this.cenario.trem])) {
                veiculo.status = INATIVO
                index.push(i);
                personagem.dano = personagem.dano + DANO_COLISAO_VEICULO_TREM;
                personagem.dano = personagem.dano + DANO_COLISAO_VEICULO_TREM;
                // alert("Bateu! +" + DANO_COLISAO_VEICULO_TREM + "s")
                elementos_inventario.add_alerta_comum(MSG_DANO_COLISAO_TREM)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
                }, 4000)
            } //ver se colide com o trem!


        }

        if (index.length > 0) {
            for (let i = 0; i < index.length; i++) {
                let veiculo = this.cenario.veiculos[index[i]];
                this.cenario.veiculos.splice(index[i], 1);
                this.cenario.novo_veiculo(personagem, veiculo);
                // alert(index[i] + "Tam c")
                //outro tem que entrar!
            }
        }

    }

    //cheacar objetivos!
    this.checar_objetivos = function () {

        //FOR
        if (this.objetivoAtual == 1) {
            if (this.cenario.barreiras[1].status == BARREIRA_OPEN) {
                this.objetivos[0][1] = true;
                this.atribuir_novo_objetivo();
            } else {
                elementos_inventario.add_alerta_comum('OBJETIVO NÃO ALCANÇADO')
                personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO_LIFE)
                personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO_LIFE)
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
        }, 5000)
            }
            //atribuir novo objetivo! c

        } else if (this.objetivoAtual == 2) {
            if (this.cenario.barreiras[0].status == BARREIRA_OPEN) {
                this.objetivos[1][1] = true;
                this.atribuir_novo_objetivo();
            } else {
                elementos_inventario.add_alerta_comum('OBJETIVO NÃO ALCANÇADO')
                personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO_LIFE)
                personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO_LIFE)
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
        }, 5000)
            }
        } else if (this.objetivoAtual == 3) {
            if (this.cenario.barreiras[2].status == BARREIRA_OPEN) {
                this.objetivos[2][1] = true;
                this.atribuir_novo_objetivo();
            } else {
                elementos_inventario.add_alerta_comum('OBJETIVO NÃO ALCANÇADO')
                personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO_LIFE)
                personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO_LIFE)
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
        }, 5000)
            }
        }
        else if (this.objetivoAtual == 4) {
            if (this.cenario.barreiras[4].status == BARREIRA_OPEN) {
                this.objetivos[3][1] = true;
                this.atribuir_novo_objetivo();
            } else {
                elementos_inventario.add_alerta_comum('OBJETIVO NÃO ALCANÇADO')
                personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO_LIFE)
                personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO_LIFE)
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
        }, 5000)
            }

        }
        else if (this.objetivoAtual == 5) {
            if (this.cenario.barreiras[3].status == BARREIRA_OPEN) {
                this.objetivos[4][1] = true;
                this.atribuir_novo_objetivo();
            } else {
                elementos_inventario.add_alerta_comum('OBJETIVO NÃO ALCANÇADO')
                personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO_LIFE)
                personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO_LIFE)
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
        }, 5000)
            }

        }
        else if (this.objetivoAtual == 6) {
            if (this.cenario.barreiras[5].status == BARREIRA_OPEN) {
                this.objetivos[5][1] = true;
                this.atribuir_novo_objetivo();
            } else {
                elementos_inventario.add_alerta_comum('OBJETIVO NÃO ALCANÇADO')
                personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO_LIFE)
                personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO_LIFE)
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
        }, 5000)
            }

        }
    }

    this.atribuir_novo_objetivo = function (nbarreira) {
        //olhar o lado do personagem!
        //olhar se todos foram conluidos
        for (let i = 0; i < this.cenario.barreiras.length; i++) { //UMA BARREIRA PODE SER ABERTA SEM ELA SER O OBJETIVO. POR ISSO A VERIFICAÇÃO PARA IDENTIFICAR QUEM JA ABRIU
            if (this.cenario.barreiras[i].status == BARREIRA_OPEN) {
                // this.objetivos[0][1] = true;
                if (i == 0)
                    this.objetivos[1][1] = true;
                else if (i == 1)
                    this.objetivos[0][1] = true;
                else if (i == 2)
                    this.objetivos[2][1] = true;
                else if (i == 3)
                    this.objetivos[4][1] = true;
                else if (i == 4)
                    this.objetivos[3][1] = true;
                else if (i == 5)
                    this.objetivos[5][1] = true;
            }
        }
        //atribui um novo!
        for (let i = 0; i < this.objetivos.length; i++) {
            if (!this.objetivos[i][1]) {
                //novo
                this.objetivoAtual = i + 1;
                let auxBarreira = 0;
                if (i == 0) //IDENTIFICA AS BARREIRAS EQUIVALENTES AO OBJETIVO!
                    auxBarreira = 2;
                else if (i == 1)
                    auxBarreira = 1;
                else if (i == 2)
                    auxBarreira = 3;
                else if (i == 3)
                    auxBarreira = 5;
                else if (i == 4)
                    auxBarreira = 4;
                else if (i == 5)
                    auxBarreira = 6;

                //elemento novo objetivo
                elementos_inventario.add_alerta_comum(this.objetivos[i][0])
                setTimeout(function () {
                    elementos_inventario.remove_add_alerta_comum()
        }, 5000)
                // remove_add_alerta_comum
                elementos_inventario.alterar_objetivo('<div>VÁ EM DIREÇÃO  A ALAVANCA <img width="20px" height="25px" src = "../assets/comando_painel.png" alt="alavanca"> E ABRA A BARREIRA <img   width="50px" height="30px" src = "../assets/barreira_inventario.png" alt="barreiras"> DE Nº <span class="span-quantidade-veiculos" id="quantidade_veiculos">  ' + auxBarreira + '</span></div>')
                return true;
            }
        }
        return false;
        //ver se os objetivos foram conlcuidos!
    }

    this.movimentos_personagem = function () {//CONTROLLER MOV PERSON
        if (personagem.autorizar_movimento) {//p
            //remover movivemntos já executados
            if (personagem.movimentos_validos.length <= 0) {//FIM DE MOVIMENTOS
                personagem.autorizar_movimento = false;
                personagem.emMovimento = false;
                $('#play').css('background-image', "url('../assets/play.png')");
                $('#play').attr('name', 'play')
                this.resetar_cor_barra_comandos()
                this.checar_objetivos()
                // checar objetivos
                return;
            } else {
                let direcao = movimentos[personagem.movimentos_validos[0][0]];
                if (personagem.checar_colisao_cenario(this.cenario.camadasColisao[0].formasTile, this.cenario.barreiras, this.cenario.veiculos, this.cenario.paineis_barreiras, this.cenario.tunels, TAM_WIDTH_TELA_CANVAS, this.cenario.altura, direcao, personagem.velocidade)) {
                    $('#play').css('background-image', "url('../assets/play.png')");
                    $('#play').attr('name', 'play')
                    this.resetar_cor_barra_comandos()
                    $(personagem.movimentos_validos[0][0]).css('background-color', "red");
                    personagem.movimentos_validos = []
                    personagem.autorizar_movimento = false;
                    personagem.emMovimento = false;
                    // personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO);
                    // personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO)
                    // alert("Colisão + " + DANO_MOVIMENTO_ERRADO + " s")
                    // elementos_inventario.add_alerta_comum(MSG_DANO_MOV_COLISAO_CENARIO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                    // setTimeout(function () {
                    //     elementos_inventario.remove_add_alerta_comum()
                    // }, 5000)
                    this.checar_objetivos()
                    return;
                }

                if (direcao == PAINEL) {//barreira
                    let nBarreira = null;
                    nBarreira = personagem.checar_colisao_paineis(this.cenario.paineis_barreiras, personagem.direcaoAntiga, personagem.velocidade)
                    if (nBarreira != null) {
                        this.cenario.barreiras[nBarreira].alterar_estado()
                        this.cenario.barreiras[nBarreira].atualizar_sprite(this.contexto, true, TILE_AREA * 3 - TILE_AREA / 2)
                        this.cenario.paineis_barreiras[nBarreira].alterar_estado()
                        this.cenario.paineis_barreiras[nBarreira].atualizar_sprite(this.contexto, true, TILE_AREA)
                        // $(personagem.movimentos_validos[0][0] +' div').css("visibility", "hidden");
                        $(personagem.movimentos_validos[0][0] + ' div').remove()
                        movimentos[personagem.movimentos_validos[0][0]] = VAZIO
                        $(personagem.movimentos_validos[0][0]).text(personagem.movimentos_validos[0][0].replace("#b", ""))
                        // alert('BARREIRA ' + this.cenario.barreiras [nBarreira].status)
                    } else {

                        // personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO);
                        // personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO)
                        // elementos_inventario.add_alerta_comum(MSG_DANO_MOV_ERRADO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                        // setTimeout(function () {
                        //     elementos_inventario.remove_add_alerta_comum()
                        // }, 5000)
                        $(personagem.movimentos_validos[0][0]).css('background-color', "red");
                        // $(personagem.movimentos_validos[0][0]).text(personagem.movimentos_validos[0][0].replace("#b", ""))
                        // personagem.autorizar_movimento = false;
                        // personagem.emMovimento = false;
                        // personagem.movimentos_validos = []
                        // $('#play').css('background-image', "url('assets/play.png')");
                        // $('#play').attr('name', 'play')

                        // return;
                    }

                    $('#play').css('background-image', "url('../assets/play.png')");
                    $('#play').attr('name', 'play')
                    this.resetar_cor_barra_comandos()
                    //movimentos[personagem.movimentos_validos[0][0]] = VAZIO
                    //$(personagem.movimentos_validos[0][0]).text("")
                    //personagem.movimentos_validos[0][1] = 0;
                    personagem.autorizar_movimento = false;
                    personagem.emMovimento = false;
                    personagem.movimentos_validos = []
                    this.checar_objetivos()
                    return;
                }
                //tunel
                if (direcao == TUNEL) {
                    //OLHAR SE TUNEL É DIREITA OU ESQURDA
                    nTunel = personagem.checar_colisao_tunel(this.cenario.tunels, personagem.direcaoAntiga, personagem.velocidade)
                    if (nTunel != null) {
                        //alert('Colisao Tunel com escada a ' + this.cenario.tunels[nTunel].direcaoAtual)
                        if (this.cenario.tunels[nTunel].direcaoAtual == ESQUERDA) {
                            personagem.x = this.cenario.tunels[nTunel].forma.x - TILE_AREA * 20 - 15//personagem.x - TILE_AREA * 19
                            personagem.y = this.cenario.tunels[nTunel].forma.y + TILE_AREA * 7 - 12 //personagem.y + TILE_AREA * 7
                            personagem.atualizar_forma()
                            personagem.direcaoAtual = DIREITA
                            personagem.lado = BAIXO
                            personagem.set_direcao_antiga()
                            personagem.set_movimento_antigo()
                        }
                        else {
                            personagem.x = this.cenario.tunels[nTunel].forma.x + TILE_AREA * 21 - 15 //personagem.x + TILE_AREA * 19
                            personagem.y = this.cenario.tunels[nTunel].forma.y - TILE_AREA * 7 - 12//personagem.y - TILE_AREA * 7
                            personagem.atualizar_forma()
                            personagem.direcaoAtual = ESQUERDA
                            personagem.lado = CIMA
                            personagem.set_direcao_antiga()
                            personagem.set_movimento_antigo()
                        }
                        $(personagem.movimentos_validos[0][0] + ' div').remove()
                        $(personagem.movimentos_validos[0][0]).text(personagem.movimentos_validos[0][0].replace("#b", ""))
                        movimentos[personagem.movimentos_validos[0][0]] = VAZIO
                    } else {
                        //mudar cor da barra!
                        // personagem.acrecentar_dano(DANO_MOVIMENTO_ERRADO);
                        // personagem.aplicar_dano_life(DANO_MOVIMENTO_ERRADO)
                        // elementos_inventario.add_alerta_comum(MSG_DANO_MOV_ERRADO)//personalizar alerta//add cabeçãrio//alerta dano e tutorial
                        // setTimeout(function () {
                        //     elementos_inventario.remove_add_alerta_comum()
                        // }, 5000)
                        $(personagem.movimentos_validos[0][0]).css('background-color', "red");
                        // $(personagem.movimentos_validos[0][0]).text("")
                        personagem.autorizar_movimento = false;
                        personagem.emMovimento = false;
                        personagem.movimentos_validos = []
                        $('#play').css('background-image', "url('../assets/play.png')");
                        $('#play').attr('name', 'play')
                        this.resetar_cor_barra_comandos()
                        this.checar_objetivos()
                        return;
                    }
                    // movimentos[personagem.movimentos_validos[0][0]] = VAZIO
                    // $(personagem.movimentos_validos[0][0]).text("")
                    // personagem.movimentos_validos = []
                    // this.autorizar_movimento = false;
                    // personagem.emMovimento = false;
                    personagem.movimentos_validos[0][1] = 0;
                    //return;
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
                personagem.movimentos_validos[0][1] = personagem.movimentos_validos[0][1] - personagem.velocidade;//subtrai do movimento ativo!Peccore o tile area tdo
                // console.log(personagem.movimentos_validos[0][1])
                if (personagem.movimentos_validos[0][1] <= 0) {
                    //aqui visibility
                    movimentos[personagem.movimentos_validos[0][0]] = 'VAZIO'
                    $(personagem.movimentos_validos[0][0]).text(personagem.movimentos_validos[0][0].replace("#b", ""))
                    personagem.movimentos_validos.shift()
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

    this.movimentos = function () {//movimentos gerais par ao loop em controllerGame!
        this.movimento_veiculos()
        this.movimentos_personagem()
        this.renderiza()//por segurança@!
    }
}

