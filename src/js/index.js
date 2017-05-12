import {defaultSettings} from './helpers/defaultSettings';
import {inputEvents} from './modules/inputEvents';


(function ( $ ) {
    /**
     * This function listen the event of the input and handles the auto complete resquest at any vtex based e-commerce.
     *
     * @param {object} options - an object is required by parameter with the followings keys and content:
     *
     *@param {string} options.shelfId - the hash id of the shelf that should be rendered
     *
     *@param {jQuery} options.appendTo - a jQuery object of the container where the results will be placed
     *
     *@param {function} options.notFound - a callback function that returns a valid html text or an jQuery object, this result will be appended into the container when no results returns from the search
     *
     *@param {number} options.limit - the number of the itens that should be placed at once
    */

    $.fn.vtexCustomAutoComplete = function( options ) {
        var settings = $.extend( defaultSettings, options );
        
        if( !settings.shelfId ){
            throw new Error('options.shelfId is required');
        }
        
        if( !settings.appendTo ){
            throw new Error('options.appendTo is required');
        }
        
        if( !(settings.appendTo instanceof jQuery) ){
            throw new Error('options.appendTo should be an instance of jQuery. Example "$("#myContainer")"');
        }
        
        inputEvents.init(this, settings);
    };
    
    
    /**
    *## Getting started
    *- First find the `shelfId` at vtex `admin/a` -> `template de prateleiras`
    *![Image 01](src/img/path.png)
    *![Image 02](src/img/tab.png)
    *![Image 03](src/img/shelfId.png)
    *Than call the vtexCustomAutoComplete on your input by following the example bellow
    *
    *@example
    *$('#myInput').vtexCustomAutoComplete({
    *   shelfId: '37a38486-2baa-4df1-9b0e-02f96f08fa73',
    *   appendTo: $('#results'),
    *   notFound: function(){ return 'not found' },
    *   limit: 3
    *});
    */

}( jQuery ));