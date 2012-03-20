$('#userAgent').html(navigator.userAgent);

var logMouseWheelEvent = function(id, delta, deltaX, deltaY) {
    console.log(arguments);
    var output = [];

    if (delta > 0) {
        output.push("up (" + delta + ")");
    } else if (delta < 0) {
        output.push("down (" + delta + ")");
    }

    if (deltaX > 0) {
        output.push("east (" + deltaX + ")");
    } else if (deltaX < 0) {
        output.push("west (" + deltaX + ")");
    }

    if (deltaY > 0) {
        output.push("north (" + deltaY + ")");
    } else if (deltaY < 0) {
        output.push("south (" + deltaY + ")");
    }

    if (output.length) {
        log("#" + id + ": " + output.join(', '));
    } else {
        log("#" + id + ": Deltas all zero");
    }
};

var testRemoval = function(event, delta, deltaX, deltaY) {
    log('#test4: I should not have been logged');
};

var log = function(msg) {
    $('#logger').append('<p>'+msg+'</p>').scrollTop(999999);
};

$("#test1").on("mousewheel", function(event, delta, deltaX, deltaY) {
    logMouseWheelEvent("test1", delta, deltaX, deltaY);
    log("pageX: " + event.pageX + " pageY: " + event.pageY);
    return true;
});

$("#test2").on("mousewheel", function(event, delta, deltaX, deltaY) {
    logMouseWheelEvent("test2", delta, deltaX, deltaY);
    log("#test2");
    return false; // prevent default
});

$("#test3")
    .on({
        mouseenter: function() {
            log("#test3: mouseover");
        },
        mouseleave: function() {
            log("#test3: mouseout");
        },
        mousewheel: function() {
            log("#test3: I should not have been logged");
        }
    })
    .off("mousewheel");

$("#test4")
    .on("mousewheel", function(event, delta, deltaX, deltaY) {
        logMouseWheelEvent("test4", delta, deltaX, deltaY);
    })
    .on("mousewheel", testRemoval)
    .on("mousewheel", function(event, delta, deltaX, deltaY) {
        logMouseWheelEvent("test4 (2)", delta, deltaX, deltaY);
    })
    .off("mousewheel", testRemoval);

$("#test5").on("mousewheel", function(event, delta, deltaX, deltaY) {
    logMouseWheelEvent("test5", delta, deltaX, deltaY);

    event.stopPropagation();
    event.preventDefault();
});

$("#test6").on("mousewheel", function(event, delta, deltaX, deltaY) {
    logMouseWheelEvent("test6", delta, deltaX, deltaY);

    event.stopPropagation();
    event.preventDefault();
});

$("#test7").on("mousewheel", function(event, delta, deltaX, deltaY) {
    logMouseWheelEvent("test7", delta, deltaX, deltaY);

    event.preventDefault();
});