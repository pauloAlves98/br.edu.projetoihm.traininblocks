function ControllerFase1() {

    this.contexto = null;
    this.fase1colisao = new Camada(); //controller1
    this.cenario1 = new Cenario();  //controller1
    this.movimentos_validos = []
    this.autorizar_movimento_personagem = false;
    this.camada_livre = new Camada()
    this.barreiras = [];
    this.paineis_barreiras = [];
    this.veiculos = [];
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
        let camada_colisao_objetos = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 171, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 171, 172, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 171, 172, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 171, 172, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];//camada de colisao fase1


        this.contexto = document.getElementById("canvas").getContext("2d");
        this.fase1colisao.init(10, 24, 32, 32, camada_colisao_objetos, 0, this.contexto);//inicia a distribuição das formas de colisao
        this.camada_livre.init(10, 24, 32, 32, camada_colisao_area_jogavel, 0, this.contexto);//inicia a distribuição das formas de colisao
        personagem.sprite.carregarSprite(4, 6, perImg);
        personagem.forma.init(personagem.x, personagem.altura / 2 - 2, TILE_AREA - 2, TILE_AREA - 2);

        this.cenario1.init([fase1c1Img, fase1c2Img, fase1c3Img], TAM_HEGTH_TELA_CANVAS_JOGAVEL, TAM_WIDTH_TELA_CANVAS, [this.fase1colisao]);
        //BARREIRAS
        this.add_barreiras(TILE_AREA*2,TILE_AREA*1);//x e y;
        this.add_barreiras(TILE_AREA*18,TILE_AREA*1);//x e y;
        this.add_barreiras(TILE_AREA*2,TILE_AREA*4);//x e y;
        this.add_barreiras(TILE_AREA*18,TILE_AREA*4);//x e y;
        //PAINEIS (alavanca)
        this.add_paineis_barreiras(TILE_AREA*5,TILE_AREA*3);//x e y;
        this.add_paineis_barreiras(TILE_AREA*17,TILE_AREA*3);//x e y;
        this.add_paineis_barreiras(TILE_AREA*5,TILE_AREA*6);//x e y;
        this.add_paineis_barreiras(TILE_AREA*17,TILE_AREA*6);//x e y;
        //VEICULOS
        this.add_veiculo(TILE_AREA*3, TILE_AREA*7, carro1Img,CIMA);
        this.add_veiculo(TILE_AREA*19, TILE_AREA*1, carro1Img,BAIXO); 
        //colisao com painel e lberação da porteira!/icone ativa alavanca!
        //colisao  person com carro!
        //CRONOMETRO
        cronometro.relogio = elementos.get_cronometro();
        intervalo_cronometro = setInterval(function () {
            cronometro.rodando();
        }, 1000);
        cronometro.intervalo = true;
        this.loop_game();

    }
    this.add_barreiras = function(x,y){
        let barreira1 = new Barreira()
        barreira1.x = x;
        barreira1.y = y;
        barreira1.altura = 32*3;
        barreira1.largura = 32*3;
        barreira1.sprite.carregarSprite(1, 2, barreiraImg);
        barreira1.forma.init(barreira1.x, barreira1.y+(32*2), barreira1.largura, 32)
        this.barreiras.push(barreira1);
    }
    this.add_paineis_barreiras = function(x,y){//paineil é uma barreira!
        let barreira1 = new Barreira()
        barreira1.x = x;
        barreira1.y = y;
        barreira1.altura = 32*1;
        barreira1.largura = 32*1;
        barreira1.sprite.carregarSprite(1, 1,  caixaFalseImg);
        barreira1.forma.init(barreira1.x, barreira1.y, barreira1.largura, 32)
        this.paineis_barreiras.push(barreira1);
    }
    this.add_veiculo = function(x,y,img,direcao){
        let veiculo = new Veiculo();
        veiculo.x = x;
        veiculo.y = y;
        veiculo.altura = 32*2;
        veiculo.largura = 32*2;
        veiculo.sprite.carregarSprite(4,3, img);
        veiculo.direcaoAtual = direcao;
        veiculo.forma.init(veiculo.x, veiculo.y, veiculo.largura, veiculo.altura)
        this.veiculos.push(veiculo);
    }
    this.desenha = function () {
        this.contexto.fillStyle = "white";
        //Camadas
        this.contexto.drawImage(this.cenario1.camadasImg[0], 0, 0, this.cenario1.largura, this.cenario1.altura)
        //this.contexto.drawImage(vilaoImg, 0, 0, this.cenario1.largura, this.cenario1.altura)
        //formas Cenario.
        this.contexto.strokeRect(personagem.forma.x, personagem.forma.y, personagem.forma.largura, personagem.forma.altura);

        this.contexto.drawImage(this.cenario1.camadasImg[1], 0, 0, this.cenario1.largura, this.cenario1.altura);
        this.contexto.drawImage(this.cenario1.camadasImg[2], 0, 0, this.cenario1.largura, this.cenario1.altura);
        this.contexto.globalAlpha = 0.3;


        if ($('#play').attr('name') == 'play')
            for (let i = 0; i < this.camada_livre.formasTile.length; i++) {
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
        personagem.atualizaSprite(this.contexto, personagem.direcaoAtual==PAINEL || personagem.direcaoAtual==VAZIO?personagem.direcaoAntiga:personagem.direcaoAtual);//printa o personagem!

        //Barreiras e paineis
        for (let i = 0; i < this.barreiras.length; i++) {//enquanto for de mesmo tamnaho!
            let barreira = this.barreiras[i];
            let painel = this.paineis_barreiras[i]
            barreira.atualizaSprite(this.contexto, false)
            painel.atualizaSprite(this.contexto, false)
            this.contexto.strokeRect((barreira.forma.x + 0), barreira.forma.y, barreira.forma.largura, barreira.forma.altura);//deslocamento ja vem negativo.
            this.contexto.strokeRect((painel.forma.x + 0),  painel.forma.y,  painel.forma.largura,  painel.forma.altura);
            //console.log(i);
        }
        //Veiculos
        for (let i = 0; i < this.veiculos.length; i++) {
            let veiculo = this.veiculos[i];
            veiculo.atualizaSprite(this.contexto, veiculo.direcaoAtual)//posicionar no local certo
            this.contexto.strokeRect((veiculo.forma.x + 0), veiculo.forma.y, veiculo.forma.largura, veiculo.forma.altura);//deslocamento ja vem negativo.
            //console.log(i);
        }
        //console.log(i);
        
        this.draw_life(); //estudar se coloca um inventario para isso!;
    }

    this.renderiza = function () {

    }
    this.draw_life = function () { //ficara dentro do controle inventario!
        elementos.alterar_valor_life_inventario(personagem.life);
    }
    this.autorizar_movimento_personagem = function () {//validar movimentos personagem.(coleta do painel)
        for (var key in movimentos) {//variavel movimentos em controller geral
            var value = movimentos[key];
            //aqui na andada!
            if (movimentos[key] != 'VAZIO')
                this.movimentos_validos.push([key, TILE_AREA])
        }
        personagem.set_movimento_antigo()
        this.autorizar_movimento = true;
       
    }
    this.movimento_personagem = function () {
        if (this.autorizar_movimento) {
            //remover movivemntos já executados
            if (this.movimentos_validos.length <= 0) {
                this.autorizar_movimento = false;
                personagem.emMovimento = false;
                $('#play').css('background-image', "url('assets/play.png')");
                $('#play').attr('name', 'play')
                return;
            } else {
                let direcao = movimentos[this.movimentos_validos[0][0]];
                if (personagem.checarColisaoCenario(this.fase1colisao.formasTile, this.barreiras, this.veiculos,this.paineis_barreiras, TAM_WIDTH_TELA_CANVAS, this.cenario1.altura, direcao, personagem.velocidade)) {
                    $('#play').css('background-image', "url('assets/play.png')");
                    $('#play').attr('name', 'play')
                    alert("Vai colidir!")
                    this.movimentos_validos = []
                    this.autorizar_movimento = false;
                    personagem.emMovimento = false;
                    return;
                }
                if(direcao == PAINEL){
                    let nBarreira = null;
                    nBarreira = personagem.checarColisaoPaineis(this.paineis_barreiras,personagem.direcaoAntiga,personagem.velocidade)
                    if(nBarreira!=null){
                        this.barreiras[nBarreira].alterarEstado()
                        this.barreiras[nBarreira].atualizaSprite(this.contexto,true)
                        alert('BARREIRA '+this.barreiras[nBarreira].status)
                        $('#play').css('background-image', "url('assets/play.png')");
                        $('#play').attr('name', 'play')
                        movimentos[this.movimentos_validos[0][0]] = 'VAZIO'
                        $(this.movimentos_validos[0][0]).text("")
                        this.movimentos_validos = []
                        this.autorizar_movimento = false;
                        personagem.emMovimento = false;
                        return;
                    }
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
                personagem.atualizarForma();
                this.movimentos_validos[0][1] = this.movimentos_validos[0][1] - personagem.velocidade;//subtrai do movimento ativo!Peccore o tile area tdo
                console.log(this.movimentos_validos[0][1])
                if (this.movimentos_validos[0][1] <= 0) {
                    movimentos[this.movimentos_validos[0][0]] = 'VAZIO'
                    $(this.movimentos_validos[0][0]).text("")
                    this.movimentos_validos.shift()
                  
                    personagem.set_movimento_antigo()
                }

            }

        }
    }
}

