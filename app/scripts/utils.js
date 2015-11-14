/* global QUIZUP */
'use strict';
var Utils = {

	// debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	debounce: function (func, threshold, execAsap) {
		var timeout;

		return function debounced () {
			var obj = this, args = arguments;

			function delayed () {
				if (!execAsap) {
					func.apply(obj, args);
				}
				timeout = null;
			}

			if (timeout) {
				clearTimeout(timeout);
			} else if (execAsap) {
				func.apply(obj, args);
			}

			timeout = setTimeout(delayed, threshold || 100);
		};
	},

  /**
   * Detects which animationEnd event to listen to
   * @return {String} animationend event string
   */
  whichAnimationEvent: function(){
    var t;
    var el = document.createElement('div');
    var animationNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'MozAnimation': 'animationend',
      'OAnimation': 'oAnimationEnd oanimationend',
      'animation': 'animationend'
    };

    for(t in animationNames){
        if( el.style[t] !== undefined ){
            return animationNames[t];
        }
    }
	}

};
