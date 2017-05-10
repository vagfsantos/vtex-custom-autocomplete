import {SearchHelper} from '../helpers/SearchHelper';
import {SearchHTTP} from '../helpers/SearchHTTP';


var inputEvents = {
    /*
        ---------------------------
        init module
        ---------------------------
    */
    init(context, settings){
        this.watchInputEvent.apply(context, [settings]);
    },

    /*
        ---------------------------
        it watchs input event, handles the API request and process the view
        ---------------------------
    */
    watchInputEvent(settings){
        var sHelp = new SearchHelper();
        var sHttp = new SearchHTTP();
        
        sHelp.setConfig(settings);

        this.on('keyup focus', () => {
            // user is typing
            sHelp.setTyping(true);

            // user is not typing anymore
            setTimeout(function(){
                sHelp.setTyping(false);
            }, sHelp.getDelay() );


            // it will watch if the user is typing yet
            setTimeout( () => {

                if( !sHelp.getTyping() ){
                    var typedText = this.val() || '';
                    typedText = typedText.trim();


                    // it check user's input
                    if( typedText ){
                        /*
                            it checks if the searched result was cached before,
                            then, no resquest is needed
                        */
                        if( sHelp.getCache(typedText) ) {
                            return sHelp.appendResults(sHelp.getCache(typedText));
                        }

                        /*
                            it uses HTTP helper to get the results
                            it requires an object with:
                            
                            typedText: 'the term to be used for searching',
                            qtd: 'the max quantity of results to bring back',
                            shelfId: 'the shelf template id to use on the search'
                            
                            it returns an jQuery ajax promise object
                        */
                        var promise = sHttp.get({
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
                            sHelp.notFound();
                        });
                        
                        /*
                            it handles the success,
                            append all the results and
                            save the search in cache
                        */
                        promise.success(function(data){
                            if( !data ) return sHelp.notFound();

                            sHelp.appendResults(data);
                            sHelp.setCache(typedText, data);
                        });

                    } else{
                        sHelp.cleanResults();
                    }
                }

            }, sHelp.getDelay() + 50);
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
                sHelp.cleanResults();
            }, 500);
        });
    }
}

export {inputEvents}