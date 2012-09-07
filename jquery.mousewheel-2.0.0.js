/* Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: Andrew Cobby (@andrewcobby http://github.com/cobbweb)
 *              - Refactored for jQuery 1.7+ only
 *              - Use MozMousePixelScroll for new Gecko browsers
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 2.0.0
 *
 * Recommended for jQuery 1.7+
 * Should work with older versions though
 */

(function($,undefined) {

    var types = ['DOMMouseScroll', 'mousewheel', 'MozMousePixelScroll'];

    if ($.event.fixHooks) {
        for (var i=types.length; i;) {
            $.event.fixHooks[types[--i]] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener) {
                for (var i=types.length; i;) {
                    this.addEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if (this.removeEventListener) {
                for (var i=types.length; i;) {
                    this.removeEventListener(types[--i], handler, false);
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    function handler(event) {
        var orgEvent = event || window.event, normData = { delta: null, deltaX: null, deltaY: null, type: "mousewheel" };
        event = $.event.fix(orgEvent);

        // Old school scrollwheel delta
        if (orgEvent.wheelDelta) {
            normData.delta = orgEvent.wheelDelta / 120;
        }

        if (orgEvent.detail) {
            if (orgEvent.type == types[2]) {
                // Firefox 4+, unbind old DOMMouseScroll event
                this.removeEventListener(types[0], handler, false);
                normData.delta = -orgEvent.detail / 42;
            } else {
                normData.delta = -orgEvent.detail / 3;
            }
        }

        // New school multidimensional scroll (touchpads) deltas
        normData.deltaY = normData.delta;

        // Gecko
        if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
            normData.deltaY = 0;
            normData.deltaX = -1 * normData.delta;
        }

        // Webkit
        if (orgEvent.wheelDeltaY !== undefined) {
            normData.deltaY = orgEvent.wheelDeltaY / 120;
        }

        if (orgEvent.wheelDeltaX !== undefined) {
            normData.deltaX = -1 * orgEvent.wheelDeltaX / 120;
        }

        // Merge normalized data
        $.extend(event, normData);

        return ($.event.dispatch || $.event.handle).apply(this, [event]);
    }

})(jQuery);
