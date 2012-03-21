## jQuery Mouse Wheel Plugin

A jQuery plugin that adds cross-browser mouse wheel support.

This plugin adds a "mousewheel" event into jQuery from which you can build custom mousewheel support into your application. Your event callback receives for arguments, `event`, `delta`, `deltaX` and `deltaY` - these are the normalized delta values. `delta` will always be the biggest value of `deltaX` and `deltaY` and you can use it if you don't care about scrolling direction.

### Notes on Firefox

At present, diagonal scrolling doesn't work in Firefox (i.e. different `deltaX` and `deltaY` values) - this is a limitation with Firefox and there is no work around :( Clone the repo and fire up test/index.html and see the difference between Chrome and Firefox.

### Usage

Here is an example of using add a mousewheel event to an element.

    // binding an event
    $("#my_elem").on("mousewheel", function(event, delta, deltaX, deltaY) {
        console.log(delta, deltaX, deltaY);
    });

    // unbinding an event
    $("#my_elem").off("mousewheel", function(event, delta, deltaX, deltaY) {
        console.log(delta, deltaX, deltaY);
    });


### License

This plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2012 [Andrew Cobby](http://cobbweb.me), [Brandon Aaron](http://brandonaaron.net)

Also thanks to:
 * http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Mathias Bank (http://www.mathias-bank.de) for a scope bug fix.
 * Seamus Leahy for adding deltaX and deltaY