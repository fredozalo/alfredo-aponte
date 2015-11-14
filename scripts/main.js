var SITE=SITE||{};SITE.CONSTANTS={LOADING_TIMEOUT_MS:3e3},SITE.Utils={debounce:function(t,i,e){var n;return function(){function s(){e||t.apply(o,a),n=null}var o=this,a=arguments;n?clearTimeout(n):e&&t.apply(o,a),n=setTimeout(s,i||100)}},whichAnimationEvent:function(){var t,i=document.createElement("div"),e={WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd oanimationend",animation:"animationend"};for(t in e)if(void 0!==i.style[t])return e[t]}},SITE.ElementScrollVisibility=function(t,i){function e(t){if(!t)throw new Error("ElementScrollVisibility: missing context.");return this.context=t,this.DOMloadedTimer=null,this.hasPartiallyPlayed=!1,this.hasFullyPlayed=!1,this.hasExited=!1,this.watcher=null,this.CSS_PARTIALLY_VISIBLE_CLASS="is-partially-visible",this.CSS_FULLY_VISIBLE_CLASS="is-fully-visible",this.CSS_ANIMATE_CLASS="animate",this.CSS_ANIMATED_CLASS="has-animated",this.CSS_EXIT_CLASS="has-exited",this.DATA_OFFSET="offset",this.init(),this}return e.prototype.init=function(){i.addEventListener("DOMContentLoaded",this.onDOMReady.bind(this),!1),this.DOMloadedTimer=t.setTimeout(this.onDOMReady,SITE.CONSTANTS.LOADING_TIMEOUT_MS)},e.prototype.onDOMReady=function(){t.clearTimeout(this.DOMloadedTimer),i.removeEventListener("DOMContentLoaded",this.onDOMReady,!1),this.addEventListeners()},e.prototype.addEventListeners=function(){var t=this.context.getAttribute("offset")||-100;void 0!==scrollMonitor&&(this.watcher=scrollMonitor.create(this.context,t),this.watcher.enterViewport(this.onEnterViewport.bind(this)),this.watcher.fullyEnterViewport(this.onFullyEnterViewport.bind(this)),this.watcher.exitViewport(this.onExitViewport.bind(this)),this.watcher.recalculateLocation())},e.prototype.removeEventListeners=function(){this.watcher&&(this.watcher.destroy(),this.watcher=null)},e.prototype.onEnterViewport=function(){this.hasPartiallyPlayed||(this.hasPartiallyPlayed=!0,this.context.classList.add(this.CSS_PARTIALLY_VISIBLE_CLASS))},e.prototype.onFullyEnterViewport=function(){var i=null,e=this;this.hasFullyPlayed||(this.context.classList.add(this.CSS_FULLY_VISIBLE_CLASS),this.context.classList.add(this.CSS_ANIMATE_CLASS),i=SITE.Utils.whichAnimationEvent(),i&&this.context.addEventListener(i,function(){e.context.classList.add(e.CSS_ANIMATED_CLASS),t.setTimeout(function(){e.context.classList.remove(e.CSS_ANIMATE_CLASS)},50)}),this.hasFullyPlayed=!0)},e.prototype.onExitViewport=function(){this.hasExited||(this.hasExited=!0,this.context.classList.add(this.CSS_EXIT_CLASS),this.hasPartiallyPlayed&&this.hasFullyPlayed&&this.removeEventListeners())},e}(window,document),function(){var t=document.querySelectorAll(".js-component-scroll-visibility"),i=[];[].slice.call(t).forEach(function(t){i.push(new SITE.ElementScrollVisibility(t))})}();