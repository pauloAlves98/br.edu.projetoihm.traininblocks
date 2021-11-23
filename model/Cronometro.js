function Cronometro() {
    this.hora = 0;
    this.minuto = 0;
    this.segundo = 0;
    this.intervalo = false;//pause!
    this.relogio = document.createElement("div");

    this.construtor_cronometro = function (hora, min, s) {
        this.hora = hora;
        this.minuto = min;
        this.segundo = s;
    }
    this.set_tempo = function (h, m, s) {
        this.hora = h;
        this.minuto = m;
        this.segundo = s;
        this.organiza_relogio(h, m, s)
    }
    this.get_tempo = function () {//to string
        let horaT = this.hora <= 9 ? "0" + this.hora.toString() : this.hora.toString();
        let minutoT = this.minuto <= 9 ? "0" +this.minuto.toString() : this.minuto.toString();
        let segundoT =  this.segundo <= 9 ? "0" +  this.segundo.toString() :  this.segundo.toString();
        return horaT + ":" + minutoT.toString() + ":" + segundoT.toString();
    }
    this.comparar_tempo = function (h, m, s) {
        return this.hora == h && this.minuto == m && this.segundo == s ? true : false;
    }
    this.set_intervalo = function (interval) {
        this.intervalo = interval;
    }
    this.get_hora = function () {
        return this.hora;
    }
    this.get_minuto = function () {
        return this.minuto;
    }
    this.get_segundo = function () {
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
    this.organiza_relogio = function (h, m, s) {
        let horaT = h <= 9 ? "0" + h.toString() : h.toString();
        let minutoT = m <= 9 ? "0" + m.toString() : m.toString();
        let segundoT = s <= 9 ? "0" + s.toString() : s.toString();
        this.relogio.text(horaT + ":" + minutoT.toString() + ":" + segundoT.toString());
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
        this.organiza_relogio(this.hora, this.minuto, this.segundo);
    }
    this.incrementa_relogio_intervalo = function (intervalo) {//em segundos!
        for (let i = 0; i < intervalo; i++) {
            this.incrementa_relogio()
        }
    }
    this.incrementa_relogio_intervalo_sem_atualizar_view = function (intervalo) {//em segundos!
        for (let i = 0; i < intervalo; i++) {
            this.incrementa_relogio_sem_atualizar_view()
        }
    }
    this.incrementa_relogio_sem_atualizar_view = function () {
        this.segundo += 1;
        if (this.segundo >= 60) {
            this.minuto += 1;
            this.segundo = 0;
        }
        if (this.minuto >= 60) {
            this.hora += 1;
            this.minuto = 0;
        }
        // this.organiza_relogio(this.hora, this.minuto, this.segundo);
    }
    this.comparar_tempo_intervalo_decrementado = function (hora, minuto, segundo, intervalo) {//em segundos!
        let h = hora;
        let m = minuto;
        let s = segundo;

        for (let i = 0; i < intervalo; i++) {
            s -= 1;
            if (s < 0) {
                if (m > 0){
                    m -= 1;
                    s = 59;
                }
            }
            if (m <= 0) {
                if (h > 0){
                    h -= 1;
                    m = 59;
                }     
            }
        }
       
        return  this.comparar_tempo(h,m,s);
    }
    // this.comparar_tempo_intervalo_decrementado = function (extra) {

    // }
}