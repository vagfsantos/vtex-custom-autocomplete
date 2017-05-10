var SearchHTTP = {
    get(settings){
        if( settings.typedText && settings.qtd && settings.shelfId){
            return $.ajax(
                '/buscapagina?&ft='+typedText+'&PS=50&sl=6afd66c3-3eba-4386-b11d-a756f47ea23a&cc=50&sm=0&PageNumber=1');
        }
        
        return {
            fail: function(){},
            done: function(){}
        }
    }
}

export default SearchHTTP;