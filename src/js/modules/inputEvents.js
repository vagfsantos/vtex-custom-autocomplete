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
        it watchs input event, handles the API request and process the view
        ---------------------------
    */
    watchInputEvent(settings){
        SearchHelper.config(settings);

        this.on('keyup focus', () => {
            // user is typing
            SearchHelper.typing = true;

            // user is not typing anymore
            setTimeout(function(){
                SearchHelper.typing = false;
            }, SearchHelper.delay);


            // it will watch if the user is typing yet
            setTimeout( () => {

                if( !SearchHelper.typing ){
                    var typedText = this.val() || '';
                    typedText = typedText.trim();


                    // it check user's input
                    if( typedText ){
                        /*
                            it checks if the searched result was cached before,
                            then, no resquest is needed
                        */
                        if( SearchHelper.cache[typedText] ) {
                            return SearchHelper.appendResults(SearchHelper.cache[typedText]);
                        }

                        /*
                            it uses HTTP helper to get the results
                            it requires an object with:
                            
                            typedText: 'the term to be used for searching',
                            qtd: 'the max quantity of results to bring back',
                            shelfId: 'the shelf template id to use on the search'
                            
                            it returns an jQuery ajax promise object
                        */
                        var promise = SearchHTTP.get({
                            typedText: typedText,
                            qtd: settings.limit,
                            shelfId: settings.shelfId
                        });
                        
                        /*
                            it handles any possible error, and
                            call the callback error handler provided
                        */
                        promise.fail(function(err){
                            console.log(err);
                            SearchHelper.notFound();
                        });
                        
                        /*
                            it handles the success,
                            append all the results and
                            save the search in cache
                        */
                        promise.success(function(data){
                            if( !data ) return SearchHelper.notFound();

                            SearchHelper.appendResults(data);
                            SearchHelper.cache[typedText] = data;
                        });

                        lastSearch[typedText] = typedText;
                    } else{
                        SearchHelper.cleanResults();
                    }
                }

            }, SearchHelper.delay + 50);
        });
    },
    
    
    /*
        ---------------------------
        it watchs the input blur event and clean the results
        ---------------------------
    */
    watchOutputEvent(){
        this.on('blur', function(){
            setTimeout(function(){
                SearchHelper.cleanResults();
            }, 500);
        });
    }
}