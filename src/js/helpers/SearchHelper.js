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
        $searchResults.html(data);
    }
    
    noProductFound(){
            var $warn = '<p><strong>Desculpe,</strong>Nenhum produto foi encontrado para esta busca.</p>';
            $searchResults.html($warn);
        }
}

export default new SearchHelper();