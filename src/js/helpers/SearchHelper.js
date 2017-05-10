/*
    ---------------------------
    SearchHelper
    
    It handles the interface and the state of the searching data
    ---------------------------
*/
class SearchHelper{
    
    constructor(){
        // states, data and cached items
        this.typing = false
        this.delay = 400
        this.cache = {}
        
        // user configurations
        this.config = null
    }
    
    setConfig(config){
        this.config = config;
    }
    
    getTyping(){
        return this.typing;
    }
    
    getDelay(){
        return this.delay;
    }
    
    getCache(key){
        return this.cache[key];
    }
    
    setTyping(value){
        this.typing = value;
    }
    
    setDelay(value){
        this.delay = value;
    }
    
    setCache(key, value){
        this.cache[key] = value;
    }
    
    /*
        it appends the results passed by argument,
        into the pre-defined container set by the user
    */
    appendResults(data){
        if( this.config.appendTo instanceof jQuery ){
            this.config.appendTo.html(data);
        }else{
            throw new Error('appendTo: require a jquery object');
        }
    }
    
    /*
        it appends the empty message,
        into the pre-defined container set by the user
    */
    notFound(){
        if( this.config.notFound ){
            var $warn = '<p><strong>Desculpe,</strong>Nenhum produto foi encontrado para esta busca.</p>';
            this.config.appendTo.html($warn);
        }else if( this.notFound.call ){
            this.config.appendTo( this.notFound() );
        }
    }
    
    /*
        it turns the results container empty
    */
    cleanResults(){
        if( this.config.appendTo instanceof jQuery ){
            this.config.appendTo.empty();
        }else{
            throw new Error('appendTo: require a jquery object');
        }
    }
}

export {SearchHelper};