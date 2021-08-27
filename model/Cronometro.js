

function Cronometro() {
    this.hora = 0;
    this.minuto = 0;
    this.segundo = 0;
    this.intervalo = false;
    this.relogio = document.getElementById("cronometro");;

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
}