function Elemento(){
    this.largura = 64;//32;
    this.altura = 45;
    this.x=-15;
    this.y=10;
    this.dx=0;
    this.dy=0;
    this.sx = 0; 
    this.sy = 0; 
    this.velocidade = 4;
    this.sprite = new Sprite();
    this.direcaoAtual = DIREITA;
    this.emMovimento = true;
    this.dxForma = 16;//variacao da forma em relacao ao x do personagem.//multipo de 32//32 pq eh o tamanho do tile
    this.podeMudarSprite = false;//para controlar a velocidade da troca da sprite.
    this.forma = new Rectangle();
}