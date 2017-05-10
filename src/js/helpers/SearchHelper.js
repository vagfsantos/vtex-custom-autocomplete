class SearchHelper{
    
    construct(){
        this.typing = false
        this.delay = 400
        this.lastSearch = {}
        this.cache = {}
        this.config = null
    }
    
    set config(config){
        this.config = config;
    }
    
    get typing(){
        return this.typing;
    }
    
    get delay(){
        return this.delay;
    }
    
    get lastSearch(){
        return this.lastSearch;
    }
    
    get cache(){
        return this.cache;
    }
    
    set typing(value){
        this.typing = value;
    }
    
    set delay(value){
        this.delay = value;
    }
    
    set lastSearch(value){
        this.lastSearch = value;
    }
    
    set cache(value){
        this.cache = value;
    }
    
    appendResults(data){
        if( this.config.appendTo instanceof jQuery ){
            this.config.appendTo.html(data);
        }else{
            throw new Error('appendTo: require a jquery object');
        }
    }
    
    notFound(){
        if( this.config.notFound ){
            var $warn = '<p><strong>Desculpe,</strong>Nenhum produto foi encontrado para esta busca.</p>';
            this.config.appendTo.html($warn);
        }else if( this.notFound.call ){
            this.config.appendTo( this.notFound() );
        }
    }
    
    cleanResults(){
        if( this.config.appendTo instanceof jQuery ){
            this.config.appendTo.empty();
        }else{
            throw new Error('appendTo: require a jquery object');
        }
    }
}

export default new SearchHelper();