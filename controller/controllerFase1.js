function ControllerFase1() {

    this.contexto = null;
    this.fase1colisao = new Camada(); //controller1
    this.cenario1 = new Cenario();  //controller1
    this.movimentos_validos = []
    this.autorizar_movimento_personagem = false;
    this.camada_livre = new Camada()
    this.loop_game = function () {
        this.renderiza();
        this.desenha();
    }

    this.initgame = function () {//FASE 1
        //camada de colisão!
        let camada_colisao_area_jogavel = [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69,
            69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69];//camada de colisao fase1
        let camada_colisao_objetos = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,171,172,0,0,0,0,0,0,0,0,0,0,0,0,0,171,172,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,171,172,0,0,0,0,0,0,0,0,0,0,0,0,0,171,172,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];//camada de colisao fase1


        this.contexto = document.getElementById("canvas").getContext("2d");
        this.fase1colisao.init(10, 24, 32, 32, camada_colisao_objetos, 0, this.contexto);//inicia a distribuição das formas de colisao
        this.camada_livre.init(10, 24, 32, 32, camada_colisao_area_jogavel, 0, this.contexto);//inicia a distribuição das formas de colisao
        personagem.sprite.carregarSprite(4, 6, perImg);
        personagem.forma.init(personagem.x, personagem.altura / 2 -2, TILE_AREA-2, TILE_AREA-2);

        this.cenario1.init([fase1c1Img, fase1c2Img, fase1c3Img], TAM_HEGTH_TELA_CANVAS_JOGAVEL, TAM_WIDTH_TELA_CANVAS, [this.fase1colisao]);
        //CRONOMETRO
        cronometro.relogio = elementos.get_cronometro();
        intervalo_cronometro = setInterval(function () {
            cronometro.rodando();
        }, 1000);
        cronometro.intervalo = true;
        this.loop_game();

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

        if($('#play').attr('name')=='play')
        for (let i = 0; i <  this.camada_livre.formasTile.length; i++) {
            let forma = this.camada_livre.formasTile[i];

            this.contexto.globalAlpha = 0.1;
            this.contexto.drawImage(circuloImg, (forma.x + 0), forma.y, forma.largura, forma.altura);//Central
            this.contexto.globalAlpha = 0.4;
            this.contexto.drawImage(caixaenergia, (forma.x + 0) + 5, forma.y, forma.largura - 6, forma.altura - 5);//Central
            this.contexto.strokeRect((forma.x + 0), forma.y, forma.largura, forma.altura);//deslocamento ja vem negativo.
            //console.log(i);
        }
        //Gradiente

        this.contexto.globalAlpha = 1.0;
        this.contexto.fillStyle = "black";
        this.contexto.font = "24px sans-serif ";

        this.contexto.strokeRect(personagem.forma.x, personagem.forma.y, personagem.forma.largura, personagem.forma.altura);
        //Personagem
        personagem.atualizaSprite(this.contexto, personagem.direcaoAtual);//printa o personagem!
        this.draw_life(); //estudar se coloca um inventario para isso!;
    }

    this.renderiza = function () {
      
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
            if (caixaC.checarColisaoFormas(this.fase1colisao.formasTile, 0) == true)
                coli_cenario = true;

            if (coli_person && !coli_cenario) sounds.play('colisao_caixa')
            coli_person = false;
            coli_cenario = false;
        }
    }

    this.draw_life = function () { //ficara dentro do controle inventario!
        elementos.alterar_valor_life_inventario(personagem.life);
    }
    this.autorizar_movimento_personagem = function () {//validar movimentos personagem.
        for(var key in movimentos) {//variavel movimentos em controller geral
            var value = movimentos[key];
            //aqui na andada!
            if(movimentos[key]!='VAZIO')
                this.movimentos_validos.push([key,TILE_AREA])
          }
          personagem.set_movimento_antigo()
          this.autorizar_movimento = true;
       //pq o canvas eh maior que a altura jogavel do cenario
    }
    this.movimento_personagem = function(){
        if(this.autorizar_movimento){
            //remover movivemntos já executados
            if(this.movimentos_validos.length<=0){
                this.autorizar_movimento = false;
                personagem.emMovimento = false;
                $('#play').css('background-image',"url('assets/play.png')");
                $('#play').attr('name','play')
                return;
            }else{
                if(personagem.checarColisaoCenario(this.fase1colisao.formasTile, 0, TAM_WIDTH_TELA_CANVAS, this.cenario1.altura,movimentos[this.movimentos_validos[0][0]], personagem.velocidade)){
                    $('#play').css('background-image',"url('assets/play.png')");
                    $('#play').attr('name','play')
                    alert("Vai colidir!")
                    this.movimentos_validos = []
                    this.autorizar_movimento = false;
                    personagem.emMovimento = false;
                    return;
                }
                personagem.emMovimento = true;
                let direcao = movimentos[this.movimentos_validos[0][0]];
                personagem.direcaoAtual = direcao;
              
                if(direcao == 'DIREITA'){
                    personagem.x= personagem.x + personagem.velocidade;
                }
                else if(direcao == 'ESQUERDA'){
                    personagem.x= personagem.x - personagem.velocidade;
                }
                else if(direcao == 'CIMA'){
                    personagem.y = personagem.y - personagem.velocidade;
                }
                else if(direcao == 'BAIXO'){
                    personagem.y = personagem.y + personagem.velocidade;
                }
                personagem.atualizarForma();
                this.movimentos_validos[0][1] = this.movimentos_validos[0][1] - personagem.velocidade;
                console.log(this.movimentos_validos[0][1])
                if(this.movimentos_validos[0][1]<=0){
                    movimentos[this.movimentos_validos[0][0]] = 'VAZIO'
                    $(this.movimentos_validos[0][0]).text("")
                    this.movimentos_validos.shift()
                    personagem.set_movimento_antigo()
                }
                
                  
            }       
            
        }
    }
}

