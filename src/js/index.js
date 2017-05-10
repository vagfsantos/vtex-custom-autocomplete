import defaultSettings from './helpers/defaultSettings';
import inputEvents from './modules/inputEvents';


(function ( $ ) {
 
    $.fn.vtexCustomAutoComplete = function( options ) {
        var settings = $.extend( defaultSettings, options );
        
        inputEvents.init(this, settings);
    };
 
}( jQuery ));