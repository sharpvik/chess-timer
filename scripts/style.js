$(document).ready(function() {

    function sizes() {
        var winHeight = $(window).height();
        var winWidth = $(window).width();
        $(".timers").css( "height", String(winHeight) + "px");

        if (winWidth <= winHeight) {
            $(".timers").css("flex-direction", "column");
            $(".timer").css({
                "width"  : "100%",
                "height" : String(winHeight / 2) + "px"
            });
        } else {
            $(".timers").css("flex-direction", "row");
            $(".timer").css({
                "width"  : "50%",
                "height" : String(winHeight) + "px"
            });
        }
    } sizes();

    $(window).resize(function() {
        sizes();
    });

});
