class SearchHTTP{
    
    get(settings){
        if( settings.typedText && settings.qtd && settings.shelfId){
            return $.ajax(
                `/buscapagina?&ft=${settings.typedText}&PS=${settings.qtd}&sl=${settings.shelfId}&cc=50&sm=0&PageNumber=1')`;
        }
        
        return {
            fail: function(){},
            done: function(){}
        }
    }
    
}

export default new SearchHTTP();