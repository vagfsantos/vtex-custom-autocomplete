import {defaultSettings} from './helpers/defaultSettings';
import {inputEvents} from './modules/inputEvents';


(function ( $ ) {
    /**
     * This function listen the event of the input and handles the auto complete resquest at any vtex based e-commerce.

     * @param {object} options - an object is required by parameter with the followings keys and content:

     *@param {string} options.shelfId - the hash id of the shelf that should be rendered

     *@param {jQuery} options.appendTo - a jQuery object of the container where the results will be placed

     *@param {function} options.notFound - a callback function that returns a valid html text or an jQuery object, this result will be appended into the container when no results returns from the search

     *@param {number} options.limit - the number of the itens that should be placed at once


     *@example
     
     $('#myInput').vtexCustomAutoComplete({<br>
        shelfId: '37a38486-2baa-4df1-9b0e-02f96f08fa73',<br>
        appendTo: $('#results'),<br>
        notFound: function(){ return 'not found' },<br>
        limit: 3<br>
     })

     */

    $.fn.vtexCustomAutoComplete = function( options ) {
        var settings = $.extend( defaultSettings, options );

        inputEvents.init(this, settings);
    };

}( jQuery ));