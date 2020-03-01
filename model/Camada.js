function Camada(){

    this.rows;//linhas na camada
    this.columns;//colunas do mapa
    this.widthTile;//largura do tile (normalmente 32px)
    this.heightTile;
    this.camada = new Array();//array com todos os valores da camada. Inteiro. Uqase a matriz
    
    this.tileNaoEntra = 0;

    this.formasTile = new Array();//array de rectngles.

    this.init = function(rows,columns,widthTile,heightTile,camada,tileNaoEntra,ctx){//monta as formas
        console.log("....");
        this.formasTile = new Array();//array de rectngles.
        this.rows = rows;//linhas na camada
        this.columns = columns;
        this.widthTile = widthTile;
        this.heightTile = heightTile;
        this.camada = camada;
        this.tileNaoEntra = tileNaoEntra;

        //let tam = rows*columns;
        let linha = 0, coluna = 0;

        //montar as forma de acordo posicao no mapa.
        for (let i = 0; i < this.camada.length; i++) {
            //let r = new ArrayList();//array de rectangles.
            if(this.camada[i] != this.tileNaoEntra){
                let forma = new Rectangle();
                forma.init(coluna * this.widthTile, linha * this.heightTile, this.widthTile, this.heightTile);
                this.formasTile.push(forma);

                // console.log("x:"+forma.x);
                // console.log("y:"+forma.y);
                // console.log("Altura:"+forma.altura);
                // console.log("Largura:"+forma.largura);
                // console.log("--------------");
            }

            if((i + 1) % this.columns == 0){//a cada x colunas andadas ele ganha uma linha.
                linha++;
                coluna = 0;
                //console.log(linha+"li");
                
            }
            else
                coluna++;
            //console.log(coluna);
		}
    
    }
}