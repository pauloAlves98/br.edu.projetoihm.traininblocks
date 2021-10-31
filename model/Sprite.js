function Sprite(){
    
    this.folheto = new Image();   
    this.width;
    this.height;
    this.rows;
    this.columns;
	//this.sprites = new Array();
    this.aparencia = 0;
  


    this.carregar_sprite = function (rows,columns,img){
        this.rows = rows;
        this.columns = columns;
        this.folheto = img;

        this.width = this.folheto.naturalWidth/columns;
        this.height = this.folheto.naturalHeight/rows;

        //console.log(per.naturalWidth);
       // this.folheto.src = this.source;
        console.log(this.folheto.naturalWidth);
        // this.folheto.onload = function(width,height){
        //     console.log(this.naturalWidth);
        // }
    }
    
    
}

