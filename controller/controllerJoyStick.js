function key_adapter_personagem(event){
    let velocidade = personagem.velocidade;
 
    //console.log("adp");
    if(event.keyCode == DIREITA){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.x+=velocidade ;
        personagem.direcaoAtual = DIREITA;
        personagem.dx = velocidade ;
        personagem.dy = 0;
        personagem.atualizarForma();
    }else if(event.keyCode == ESQUERDA){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.x-=velocidade ;
        personagem.direcaoAtual = ESQUERDA;
        personagem.dx = -velocidade ;
        personagem.dy = 0;
        personagem.atualizarForma();
    }else if(event.keyCode == CIMA){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.y-=velocidade ;
        personagem.direcaoAtual = CIMA;
        personagem.dx = 0;
        personagem.dy = -velocidade ;
        personagem.atualizarForma();
    }else if(event.keyCode == BAIXO){
        personagem.emMovimento =true;
        // personagem.velocidade = 2;
        personagem.y+=velocidade;
        personagem.direcaoAtual = BAIXO;
        personagem.dx = 0;
        personagem.dy = velocidade ;
        personagem.atualizarForma();
        // var elemento = document.getElementById('overlay');
        // elemento.style.display="none";
    }
    else if(event.keyCode == 32){
        verificar_respostas();
        var elemento = document.getElementById('overlay');

         elemento.style.display="block";
        //  delClass('overlay', 'motionL');
        //  addClass('overlay', 'motionL')


    }

    velocidade  = 0;
    //console.log(personagem.velocidade);
}