/* global SITE: false */
'use strict';

(function(){

  var scrollVisibilityElements = document.querySelectorAll('.js-component-scroll-visibility');
  var components = [];

  [].slice.call( scrollVisibilityElements ).forEach( function(el) {
    components.push( new SITE.ElementScrollVisibility( el ) );
  });

})();
