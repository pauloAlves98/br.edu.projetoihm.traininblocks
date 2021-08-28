function Circulo (){
    Rectangle.call(this);
    this.valorAceito = true;
    this.expressaoLogica = "";
    this.init = function(x,y,largura,altura,expressao,valor){
       this.x = x;
       this.y = y;
       this.largura = largura;
       this.altura = altura;
       this.valorAceito = valor;
       this.expressaoLogica = expressao;
    }
    this.verificar_respostas= function (caixa){
        if(caixa.tipo==this.valorAceito){
            return true;
        }
        return false;
    }
}