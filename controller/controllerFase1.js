function ControllerFase1() {

    this.contexto = null;
    this.fase1colisao = new Camada(); //controller1
    this.cenario1 = new Cenario();  //controller1

    this.loop_game = function () {
        this.renderiza();
        this.desenha();
    }

    this.initgame = function () {//FASE 1
        //camada de colisão!
        let camada_colisao_area_jogavel = [69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,
            69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,
            69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,
            69,69,69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,69,69,69,
            69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,
            69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,
            69,69,69,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,69,69,69,
            69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,
            69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,
            69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69,69];//camada de colisao fase1

        
        this.contexto = document.getElementById("canvas").getContext("2d");
        this.fase1colisao.init(10, 24, 32, 32, camada_colisao_area_jogavel, 0, this.contexto);//inicia a distribuição das formas de colisao

        personagem.sprite.carregarSprite(4, 6, perImg);
        personagem.forma.init(0, personagem.altura / 2, personagem.largura / 2 - 8, personagem.altura / 2);
       
        this.cenario1.init([fase1c1Img, fase1c2Img, fase1c3Img], TAM_HEGTH_TELA_CANVAS_JOGAVEL, TAM_WIDTH_TELA_CANVAS, [this.fase1colisao]);
        this.cenario1.addCaixas(1, 1, caixa, 312, 192 - (3 * 32), 24, 24, true);
        this.cenario1.addCaixas(1, 1, caixa, 0, 40, 24, 24, true);
        this.cenario1.addCaixas(1, 1, caixa, 600, 264, 24, 24, true);
        this.cenario1.addCaixas(1, 1, caixaFalseImg, 864, 32, 24, 24, false);
        //vilao
        for (let i = 0; i < QUANTIDADE_DE_VILOES; i++) { //Posiciona aleatoriamente os viloes no cenario
            let vilao = new Vader();
            vilao.sprite.carregarSprite(4, 4, vilaoImg);
            vilao.posicionar(this.fase1colisao.formasTile, TAM_WIDTH_TELA_CANVAS, TAM_HEGTH_TELA_CANVAS_JOGAVEL)
            viloes.push(vilao);
        }
        //Encaixe das caixas
        this.cenario1.addCirculos(300, 250, 32, 32, "V OU V", true);//304x 256y encaixe
        elementos.alterar_expressao_iventario(this.cenario1.circulosCaixa.length, this.cenario1.circulosCaixa[this.cenario1.circulosCaixa.length - 1].expressaoLogica);
        elementos.alterar_resultado_expressao_iventario(this.cenario1.circulosCaixa.length, "?");
        this.cenario1.addCirculos(900, 204, 32, 32, "V OU F", true);//pos encaixe 904x 208y
        elementos.alterar_expressao_iventario(this.cenario1.circulosCaixa.length, this.cenario1.circulosCaixa[this.cenario1.circulosCaixa.length - 1].expressaoLogica);
        elementos.alterar_resultado_expressao_iventario(this.cenario1.circulosCaixa.length, "?");
        this.cenario1.addCirculos(700, 34, 32, 32, "F OU V", true);//704x 40y encaixe
        elementos.alterar_expressao_iventario(this.cenario1.circulosCaixa.length, this.cenario1.circulosCaixa[this.cenario1.circulosCaixa.length - 1].expressaoLogica);
        elementos.alterar_resultado_expressao_iventario(this.cenario1.circulosCaixa.length, "?");
        this.cenario1.addCirculos(4, 224, 32, 32, "F OU F", false);//8x 224y encaixe.
        elementos.alterar_expressao_iventario(this.cenario1.circulosCaixa.length, this.cenario1.circulosCaixa[this.cenario1.circulosCaixa.length - 1].expressaoLogica);
        elementos.alterar_resultado_expressao_iventario(this.cenario1.circulosCaixa.length, "?");
        //Encaixes Perfeitos
        this.cenario1.addEncaixes(304, 256); //colisao
        this.cenario1.addEncaixes(904, 208);
        this.cenario1.addEncaixes(704, 40);
        this.cenario1.addEncaixes(8, 224);
        //CRONOMETRO
        cronometro.relogio = elementos.get_cronometro();
        intervalo_cronometro = setInterval(function () {
            cronometro.rodando();
        }, 1000);
        cronometro.intervalo = true;
        this.loop_game();
       
    }

    this.resetar_caixas = function () {
        this.cenario1.resetar_caixas()
    }
    this.movimento_vilao_fase1 = function () {//pode colocar como parametro!
        for (let i = 0; i < viloes.length; i++) { //fazer andar no cenario.
            let vilao = viloes[i];
            vilao.andar()
            vilao.checarColisaoCenario(this.fase1colisao.formasTile, 0, TAM_WIDTH_TELA_CANVAS, TAM_HEGTH_TELA_CANVAS_JOGAVEL)//vilao nao precisa de deslocamento pois pode ser considerado a tela inteira para ele.
            vilao.checarColisaoPersonagem(personagem) ? personagem.aplicarDano() : "nao aplicar dano";
        }
    }

    this.desenha = function () {
        this.contexto.fillStyle = "white";
        //Camadas
        this.contexto.drawImage(this.cenario1.camadasImg[0], 0, 0, this.cenario1.largura, this.cenario1.altura)
        this.contexto.drawImage(vilaoImg, 0, 0, this.cenario1.largura, this.cenario1.altura)
        //formas Cenario.
       // this.contexto.strokeRect(personagem.forma.x, personagem.forma.y, personagem.forma.largura, personagem.forma.altura);
 
        this.contexto.drawImage(this.cenario1.camadasImg[1], 0, 0, this.cenario1.largura, this.cenario1.altura);
        this.contexto.drawImage(this.cenario1.camadasImg[2], 0, 0, this.cenario1.largura, this.cenario1.altura);
        this.contexto.globalAlpha = 0.3;
        for (let i = 0; i < this.fase1colisao.formasTile.length; i++) {
            let forma = this.fase1colisao.formasTile[i];
            
            this.contexto.globalAlpha = 0.1;
            this.contexto.drawImage(circuloImg, (forma.x + 0), forma.y, forma.largura , forma.altura);//Central
            this.contexto.globalAlpha = 0.4;
            this.contexto.drawImage(caixaenergia, (forma.x + 0)+5, forma.y, forma.largura-6 , forma.altura-5);//Central
           // this.contexto.strokeRect((forma.x + 0), forma.y, forma.largura, forma.altura);//deslocamento ja vem negativo.
            //console.log(i);
        }
        //Gradiente
        
       this.contexto.globalAlpha = 1.0;
        this.contexto.fillStyle = "black";
        this.contexto.font = "24px sans-serif ";
  
     
        //Personagem
        personagem.atualizaSprite(this.contexto, personagem.direcaoAtual);//printa o personagem!
        this.draw_life(); //estudar se coloca um inventario para isso!
        this.draw_fase1_valor_caixas();
    }

    this.renderiza = function () {
        personagem.checarColisaoCenario(this.fase1colisao.formasTile, 0, TAM_WIDTH_TELA_CANVAS, this.cenario1.altura);//pq o canvas eh maior que a altura jogavel do cenario
        this.colisao_caixa();
        this.mover_cena_fase1()
    }
    this.mover_cena_fase1 = function () {
        personagem.deslocamento(TAM_WIDTH_CONTENT_CANVAS, TAM_WIDTH_TELA_CANVAS);
        elementos.mover_camera(personagem.desl)
    }

    this.colisao_caixa = function () {//transferir esse metodo para cenario!
       
        for (let i = 0; i < this.cenario1.caixas.length; i++) {
            let coli_person = false;
            let coli_cenario = false;
            let caixaC = this.cenario1.caixas[i];
            if (caixaC.checarColisaoPersonagem(personagem)) {
                personagem.x += -personagem.dx;
                personagem.y += -personagem.dy;
                coli_person = true;
                personagem.atualizarForma();
            }
            caixaC.checarColisaoLimites(960, this.cenario1.altura);
            if(caixaC.checarColisaoFormas(this.fase1colisao.formasTile, 0) == true)
               coli_cenario = true;
            
            if(coli_person && !coli_cenario) sounds.play ('colisao_caixa')
            coli_person = false;
            coli_cenario = false;
        }
    }

    this.draw_fase1_valor_caixas = function () {//Ficara dentro do controller inventario!
        for (let j = 0; j < this.cenario1.circulosCaixa.length; j++) {
            let c = this.cenario1.circulosCaixa[j];
            let colidiu = false;
            for (let i = 0; i < this.cenario1.caixas.length; i++) { //verifica se houve colisao com alguma caixa!
                let caixaC = this.cenario1.caixas[i];
                if (caixaC.forma.colisao(c.x, c.y, c.largura, c.altura)) {//Se for vdd esse encaixe foi preenchido
                    elementos.alterar_resultado_expressao_iventario(String(j + 1), caixaC.tipo === true ? "V" : "F");
                    colidiu = true;
                    break;
                }
            }
            if (!colidiu)
                elementos.alterar_resultado_expressao_iventario(String(j + 1), "?");
        }
    }

    this.draw_life = function () { //ficara dentro do controle inventario!
        elementos.alterar_valor_life_inventario(personagem.life);
    }
    this.verificar_respostas = function (circul) { //inventario!
        // P Q POUQ
        // V V V
        // V F V
        // F V V
        // F F F
        let circulo = this.cenario1.circulosCaixa[circul];
        let msg = 'VAZIO';
        console.info(this.cenario1.caixas)
        for(let i=0;i<this.cenario1.caixas.length;i++){
            let caixa = this.cenario1.caixas[i];
            if(caixa.forma.colisao(circulo.x, circulo.y, circulo.largura, circulo.altura)){
                if(circulo.verificar_respostas(caixa))
                    msg = 'CORRETO';
                else
                    msg = 'ERRADO';
                break;
            }
        }
        return msg; //NÃO A COLISÕES COM ESSA FORMA!
    }
}

