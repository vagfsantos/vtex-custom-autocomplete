import SearchHelper from '../helpers/SearchHelper';
import SearchHTTP from '../helpers/SearchHTTP';

export default {
    /*
        ---------------------------
        init module
        ---------------------------
    */
    init(context, settings){
        Reflect.apply(this.watchInputEvent, context, [settings]);
    },
    
    /*
        ---------------------------
        watchs input event, handles the API request and process the view
        ---------------------------
    */
    watchInputEvent(settings){
        SearchHelper.config(settings);
        
        this.on('keyup focus', () => {
            // user is typing
            SearchHelper.typing = true;

            setTimeout(function(){
                SearchHelper.typing = false;
            }, SearchHelper.delay);

            setTimeout( () => {
                
                if( !SearchHelper.typing ){
                    var typedText = this.val() || '';
                    typedText = typedText.trim();

                    if( typedText ){

                        if( SearchHelper.cache[typedText] ) {
                            return SearchHelper.appendResults(SearchHelper.cache[typedText]);
                        }

                        $.ajax('/buscapagina?&ft='+typedText+'&PS=50&sl=6afd66c3-3eba-4386-b11d-a756f47ea23a&cc=50&sm=0&PageNumber=1')
                            .fail(function(){
                            SearchHelper.noProductFound();
                        })
                            .success(function(data){
                            // NENHUM PRODUCTO ENCONTRADO
                            if( !data ) return SearchHelper.noProductFound();
                            SearchHelper.appendResults(data);
                            SearchHelper.cache[typedText] = data;
                        });

                        lastSearch[typedText] = typedText;
                    } else{
                        $searchResults.empty();
                    }
                }
                
            }, SearchHelper.delay + 50);
        });
    },
    
    watchOutputEvent(){
        this.on('blur', function(){
            setTimeout(function(){
                $('.js--search-results').empty();
            }, 500);
        });
    }
}