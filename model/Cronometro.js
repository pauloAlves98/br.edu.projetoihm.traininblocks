function Cronometro() {
    this.hora = 0;
    this.minuto = 0;
    this.segundo = 0;
    this.intervalo = false;//pause!
    this.relogio = document.getElementById("cronometro");;

    this.set_tempo = function(h,m,s){
        this.hora = h;
        this.minuto = m;
        this.segundo = s;
        this.organiza_relogio(h,m,s)
    }
    this.get_tempo = function(){
        let horaT = h<=9?"0"+h.toString():h.toString();
        let minutoT = m<=9?"0"+m.toString():m.toString();
        let segundoT = s<=9?"0"+s.toString():s.toString();
        return horaT+":"+minutoT.toString()+":"+segundoT.toString();
    }
    this.comparar_tempo = function(h,m,s){
        return this.hora==h && this.minuto == m && this.segundo == s?true:false;    
    }
    this.set_intervalo = function(interval){
        this.intervalo = interval;
    }
    this.get_hora = function(){
        return this.hora;
    }
    this.get_minuto = function(){
        return this.minuto;
    }
    this.get_segundo = function(){
        return this.segundo;
    }
    this.rodando = function () {
        if (this.intervalo) //eh pq era pra pausar!
             this.incrementa_relogio();
        // }  else
        //    //nao incrementa!
        //  else//iniciou
        //     this.intervalo = setInterval(this.incrementa_relogio, 1000);

    }
    // this.reiniciando = function () {
    //     this.hora = 0;
    //     this.minuto = 0;
    //     this.segundo = 0;
    //     if (this.intervalo != null) {
    //         clearInterval(this.intervalo);
    //         this.intervalo = null;
    //     }
    //     this.organiza_relogio(this.hora,this.minuto,this.segundo);
    // }
   this.organiza_relogio = function (h,m,s){
        let horaT = h<=9?"0"+h.toString():h.toString();
        let minutoT = m<=9?"0"+m.toString():m.toString();
        let segundoT = s<=9?"0"+s.toString():s.toString();
        this.relogio.text(horaT+":"+minutoT.toString()+":"+segundoT.toString());
    }

    this.incrementa_relogio = function () {
        this.segundo += 1;
        if (this.segundo >= 60) {
            this.minuto += 1;
            this.segundo = 0;
        }
        if (this.minuto >= 60) {
            this.hora += 1;
            this.minuto = 0;
        }
       this.organiza_relogio(this.hora,this.minuto,this.segundo);
    }
    this.incrementa_relogio_intervalo = function(intervalo){//em segundos!
        for(let i = 0;i<intervalo;i++){
            this.incrementa_relogio()
        }
    }
}