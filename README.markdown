# jQuery Mouse Wheel Plugin

A jQuery v1.7+ plugin that adds cross-browser mouse wheel support.

**Pre v1.7 jQuery support:** Use [Brandon Aaron's](http://brandonaaron.net) original [jquery-mousewheel](https://github.com/brandonaaron/jquery-mousewheel) if you're using an older version of jQuery.

This plugin adds a "mousewheel" event into jQuery from which you can build custom mousewheel support into your application. Your event callback receives four arguments, `event`, `delta`, `deltaX` and `deltaY` - these are the normalized delta values. `delta` will always be the biggest value of `deltaX` and `deltaY` and you can use it if you don't care about scrolling direction.

### Notes on Firefox

At present, diagonal scrolling doesn't work in Firefox (i.e. different `deltaX` and `deltaY` values in the same event) - this is a limitation with Firefox and there is no work around :( Clone the repo and fire up test/index.html in Chrome and Firefox and you can see the difference in Firefox.

## Usage

Here is an example of using add a mousewheel event to an element.

    // binding an event
    $("#my_elem").on("mousewheel", function(event, delta, deltaX, deltaY) {
        console.log(delta, deltaX, deltaY);
    });

    // unbinding an event
    $("#my_elem").off("mousewheel");


## License

This plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2012 [Andrew Cobby](http://cobbweb.me), [Brandon Aaron](http://brandonaaron.net)

Also thanks to:
 * http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Mathias Bank (http://www.mathias-bank.de) for a scope bug fix.
 * Seamus Leahy for adding deltaX and deltaY