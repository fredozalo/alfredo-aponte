'use strict';

(function(){

  var scrollVisibilityElements = document.querySelectorAll('.js-component-scroll-visibility');

  [].slice.call( scrollVisibilityElements ).forEach( function(el) {
    new ElementScrollVisibility( el );
  });

})();
