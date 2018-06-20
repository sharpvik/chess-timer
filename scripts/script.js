$(document).ready(function() {
    
    var timeSet;
    $("#setTime").on("click", function() {
        timeSet = $("#minutes").val(); 
        $(".darken").addClass("invisible");
        
        if (timeSet.length == 1) {
            $("#black_timer").html("0" + timeSet + ":" + "00");
            $("#white_timer").html("0" + timeSet + ":" + "00");

        } else {
            $("#black_timer").html(timeSet + ":" + "00");
            $("#white_timer").html(timeSet + ":" + "00");

        }
        timeSet = parseInt(timeSet) * 60000; // in milliseconds

        var turnSide = true; // true => white || false => black
        var whiteTimeLeft = timeSet, blackTimeLeft = timeSet;
        var startTime = Date.now();
        var leftTime;
        


        var intervalID = setInterval( function() {

            var nowTime = Date.now();
            if (turnSide) { // white's move
                leftTime = whiteTimeLeft;
            } else {        // black's move
                leftTime = blackTimeLeft;
            }

            var milliseconds = leftTime - (nowTime - startTime);

            var seconds = Math.round(milliseconds / 1000);
            var minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;

            minutes = String(minutes);
            seconds = String(seconds);

            // render the timer
            if (minutes.length == 1) {
                minutes = "0" + minutes;
            }
            if (seconds.length == 1) {
                seconds = "0" + seconds;
            }
            
            if (minutes == "00" && seconds == "00") {
                clearInterval(intervalID);                
                $("#popup_icon").html("notification_important");
                $(".popup_title").html("Time's up!");
                $(".popup_message").css("margin-bottom", "0");
                $("#minutes").remove();
                $("#setTime").remove();
                
                // alert someone lost by time
                if (turnSide) { // white lost
                    $("#white_progress").css("width", "0");
                    $(".popup_message").html("White lost.");
                } else { // black lost
                    $("#black_progress").css("width", "0");
                    $(".popup_message").html("Black lost.");
                }
                
                $(".darken").removeClass("invisible");
            }

            if (turnSide) { // white's move
                $("#white_timer").html(minutes + ":" + seconds);
                $("#white_progress").css("width", String(milliseconds / timeSet * 100) + "%");
            } else {
                $("#black_timer").html(minutes + ":" + seconds);
                $("#black_progress").css("width", String(milliseconds / timeSet * 100) + "%");
            }

        }, 1000 );



        $("#switch").on("click", function() {
            var nowTime = Date.now();
            
            if (turnSide) {
                var moveDuration = nowTime - startTime;
                whiteTimeLeft = leftTime - moveDuration;
                
                $("#switch").css("border", "5px solid black");
            } else {
                var moveDuration = nowTime - startTime;
                blackTimeLeft = leftTime - moveDuration;
                
                $("#switch").css("border", "5px solid white");
            }
            
            startTime = Date.now();

            turnSide = !turnSide;
        });
        
    });
    
});