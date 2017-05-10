/*
    ---------------------------
    SearchHTTP
    
    It handles the requests for searching
    ---------------------------
*/

class SearchHTTP{
    get(settings){
        if( settings.typedText && settings.qtd && settings.shelfId){
            return $.ajax( this.getPreparedUrl(settings) );
        }
    }
    
    /*
        Encode all settings and return the final uri for the search API resquest
    */
    getPreparedUrl(settings){
        var typedText = window.encodeURI(settings.typedText);
        var qtd = window.encodeURI(settings.qtd);
        var shelfId = window.encodeURI(settings.shelfId);
        
        return `/buscapagina?&ft=${typedText}&PS=${qtd}&sl=${shelfId}&cc=50&sm=0&PageNumber=1'`;
    }
    
}

export default new SearchHTTP();