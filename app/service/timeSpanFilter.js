(function() {
    'use strict';

    function implementation() {
            return function(inputInSeconds , resolution) {
                resolution = resolution || "seconds";
                var resDepth = 0;
                // --- map resolution to number
                switch (resolution) {
                    case "weeks":           resDepth =2; break;
                    case "days":            resDepth =3; break;
                    case "hours":           resDepth =4; break;
                    case "minutes":         resDepth =5; break;
                    case "seconds":         resDepth =6; break;
                    case "milliseconds":    resDepth =7; break;
                    default:                resDepth =6; break;
                }
                // --- Calculate seconds/minutes/hours/days/weeks/...
                var msec = Math.floor(inputInSeconds*1000 - Math.floor(inputInSeconds) * 1000);
                var sec = Math.floor(inputInSeconds % 60);
                var min = (Math.floor(inputInSeconds / 60)) % 60;
                var hours = (Math.floor(inputInSeconds / 3600)) % 24;
                var days = Math.floor(inputInSeconds / (24 * 3600));
                var weeks = 0;
                if (days > 7 ) {
                    if (days === 7 || days === 14 || days === 28) {
                        weeks = (Math.floor(inputInSeconds / (7 * 24 * 3600))) % 7;
                        days = 0;
                    }
                }
                // --- Build return string
                var res = "";
                res += (weeks <= 1) ? "" : (weeks==1 ) ? "week " : "weeks "
                if( resDepth > 2) {
                    res += (days <= 1) ? "" : (days==1 ) ? "day " : "days "
                }
                if (hours || min || sec ) {
                    if (days > 0 && resDepth > 3)
                        res += ", ";
                    if (hours && !min && !sec) {
                        res += (resDepth > 3) ? hours + "h " :"";
                    } else if (!hours && min && !sec) {
                        res += (resDepth > 4) ? min + "min " : "";
                    } else if (!hours && !min && sec) {
                        res += (resDepth > 5) ? sec + "s "  : "";
                    } else {
                        res +=(resDepth > 3 && hours > 0) ?  hours + "h " :"";
                        res +=(resDepth > 4 && (min > 0 || hours > 0)) ? min + "m " : "";
                        res +=(resDepth > 5 && (sec > 0 || min > 0 || hours > 0)) ? sec + "s ": "";
                        res +=(resDepth > 6 && (msec > 0 || sec > 0 || min > 0 || hours > 0)) ? msec + "ms": "";
                    }
                }
                return res;
            }
    }
    var declaration = [ implementation];
    angular.module('app').filter('plotsTimeSpan', declaration);
}());