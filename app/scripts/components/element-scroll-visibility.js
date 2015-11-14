/**
 *
 * ElementScrollVisibility component.
 *
 * This component will watch it's state within the viewport
 * and react with the following classes:
 *
 * - is-partially-visible
 * - is-fully-visible
 * - has-exited
 *
 * Example usage:
 *
 * <div class="js-component-scroll-visibility" data-offset="500"></div>
 *
 *
 * @author 14islands
 *
 */

/* global SITE, scrollMonitor */
'use strict';

SITE.ElementScrollVisibility = (function(window, document){

    /**
     * Constructor
     * @param {String} selector String with a class to select it's context.
     */
    function ElementScrollVisibility (context) {
        if (!context) {
            throw new Error('ElementScrollVisibility: missing context.');
        }
        this.context = context;
        this.DOMloadedTimer = null;
        this.hasPartiallyPlayed = false;
        this.hasFullyPlayed = false;
        this.hasExited = false;
        this.watcher = null;
        this.CSS_PARTIALLY_VISIBLE_CLASS = 'is-partially-visible';
        this.CSS_FULLY_VISIBLE_CLASS = 'is-fully-visible';
        this.CSS_ANIMATE_CLASS = 'animate';
        this.CSS_ANIMATED_CLASS = 'has-animated';
        this.CSS_EXIT_CLASS = 'has-exited';
        this.DATA_OFFSET = 'offset';
        this.init();
        return this;
    }

    /**
     * Initializes this component.
     *
     * Also listens to DOMContnetLoaded for further initializations
     * that might depend on the DOM being ready.
     */
    ElementScrollVisibility.prototype.init = function() {
        document.addEventListener('DOMContentLoaded', this.onDOMReady.bind(this), false);
        this.DOMloadedTimer = window.setTimeout(this.onDOMReady, SITE.CONSTANTS.LOADING_TIMEOUT_MS);
    };

    /**
     * Callback for DOM content loaded.
     *
     * Does additional initializations that depends on the
     * DOM being ready.
     */
    ElementScrollVisibility.prototype.onDOMReady = function() {
        window.clearTimeout( this.DOMloadedTimer );
        document.removeEventListener('DOMContentLoaded', this.onDOMReady, false);
        this.addEventListeners();
    };

    /**
     * Add the scrollMonitor watcher listeners.
     */
    ElementScrollVisibility.prototype.addEventListeners = function() {
        var offset = this.context.getAttribute('offset') || -100;
        if (scrollMonitor !== undefined) {
            this.watcher = scrollMonitor.create( this.context, offset );
            this.watcher.enterViewport( this.onEnterViewport.bind(this) );
            this.watcher.fullyEnterViewport( this.onFullyEnterViewport.bind(this) );
            this.watcher.exitViewport( this.onExitViewport.bind(this) );
            this.watcher.recalculateLocation();
        }
    };

    /**
     * Removes the watcher listeners and destroys it.
     */
    ElementScrollVisibility.prototype.removeEventListeners = function() {
        if (this.watcher) {
            this.watcher.destroy();
            this.watcher = null;
        }
    };

    /**
     * Callback for when the element enters the viewport.
     */
    ElementScrollVisibility.prototype.onEnterViewport = function() {
        if (this.hasPartiallyPlayed) {
            return;
        }

        this.hasPartiallyPlayed = true;

        this.context
            .classList
            .add( this.CSS_PARTIALLY_VISIBLE_CLASS );

    };

    /**
     * Callback for when the element fully enters the viewport.
     */
    ElementScrollVisibility.prototype.onFullyEnterViewport = function() {
        var animationEnd = null;
        var that = this;

        if (this.hasFullyPlayed) {
            return;
        }

        this.context
            .classList
            .add( this.CSS_FULLY_VISIBLE_CLASS );

        this.context
            .classList
            .add( this.CSS_ANIMATE_CLASS );

        animationEnd = SITE.Utils.whichAnimationEvent();

        if (animationEnd) {

            this.context.addEventListener(animationEnd, function() {

                that.context
                    .classList
                    .add( that.CSS_ANIMATED_CLASS );

                window.setTimeout(function() {
                    that.context
                        .classList
                        .remove( that.CSS_ANIMATE_CLASS );
                }, 50);

            });
        }

        this.hasFullyPlayed = true;

    };

    /**
     * Callback for when the element exits (even if partiallly) the viewport.
     * Destroys itself it has already played it's partial and full visibility states.
     */
    ElementScrollVisibility.prototype.onExitViewport = function() {
        if (this.hasExited) {
            return;
        }

        this.hasExited = true;

        this.context
            .classList
            .add( this.CSS_EXIT_CLASS );


        if ( this.hasPartiallyPlayed && this.hasFullyPlayed ) {
            this.removeEventListeners();
        }
    };

    return ElementScrollVisibility;

})(window, document);
