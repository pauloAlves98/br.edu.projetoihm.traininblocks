function Trem (){
    Veiculo.call(this);
    this.velocidade  = TILE_AREA/2
    this.intervalo_trem_passar = 60;//s
    this.trem_deve_passar = false;

    this.set_trem_deve_passar = function(tremPassar){
        this.trem_deve_passar = tremPassar
    }
    this.set_intervalo_trem_passar = function (valor) {
        this.intervalo_trem_passar = valor;
    }
    this.get_trem_deve_passar = function(){
        return this.trem_deve_passar;
    }
    this.get_intervalo_trem_passar = function(){
        return this.intervalo_trem_passar;
    }
}