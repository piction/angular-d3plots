

export class TimeSpan {
    constructor (public timeSpanInSeconds:number){}

    public getFormater(maxSteps):any {
        var res = this.findTimeStep(maxSteps);
        return {
            formatHandler : (timeSpan)=> {return this.toString(timeSpan , res.resolution) },
            stepSize :res.stepSize
        }
    }
    public findTimeStep(maxSteps):any {
        var validSteps = {};
         validSteps[60]="seconds";         	// minute
         validSteps[5*60]="minutes";       	// 5 minutes
         validSteps[10*60]="minutes";     	// 10 minutes
         validSteps[15*60]="minutes";      	// 15 minutes
         validSteps[30*60]="minutes";     	// half an hour
         validSteps[60*60]="hours";      	// hour
         validSteps[2*60*60]="hours";    	// 2 hours
         validSteps[8*60*60]="hours";    	// 8 hours
         validSteps[12*60*60]="hours";   	// 12 hours
         validSteps[24*60*60]="days";   	// 1 day
         validSteps[2*24*60*60]="days"; 	// 2 days
         validSteps[7*24*24*60]="days"; 	// 1 week

        var interval:any = this.timeSpanInSeconds / (maxSteps+1);
        var resolution = "days";
        var stepSize = interval;
        for (var s in validSteps) {
            if( interval <  s ) {
                resolution = validSteps[s];
                stepSize = s;
                break;
            }
        }
        return  {
            resolution : resolution,
            stepSize : stepSize
        }
    }

    public toString(inputInSeconds , resolution) {
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