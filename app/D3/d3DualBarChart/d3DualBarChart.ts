import { Selection } from 'd3';
import * as ng from 'angular';
import * as _ from 'lodash';
//import {TimeSpan} from '../../service/timeSpan';




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

    public toString(inputInSeconds , resolution):string {
            resolution = resolution || "seconds";
            if(inputInSeconds<=0)
                return "0";
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


interface ID3DualBarChartEntry {
    valueOne: number;
    valueTwo: number;
    label: string;
}

interface ID3DualBarChartScope extends ng.IScope {
    data: ID3DualBarChartEntry[];
    height?: string;
    width?: string;
    maxBarWidth?: string;
    colorOne?: string;
    colorTwo?: string;
    leftYAxisFormatter: any;
    rightYAxisFormatter: any;
}

class D3DualBarChart {
    public restrict = 'E';
    public scope: any = {
        data: '=',
        height: '=?',
        width: '=?',
        maxBarWidth: '@?',
        colorOne: '@?',
        colorTwo: '@?',
        leftYAxisFormatter: '=?',
        rightYAxisFormatter: '=?'
    };

    private static DEFAULT_HEIGHT: number = 500;
    private static DEFAULT_WIDTH: number = 500;
    private static DEFAULT_MAX_BAR_WIDTH: number = 50;
    private static DEFAULT_COLOR_ONE: string = "#fdb81e";
    private static DEFAULT_COLOR_TWO: string = "#486983";
    private static DEFAULT_AXIS_FORMATTER: (value: any) => string = (value) => value;
    
    private static FONT_SIZE: number = 15;
    private static Y_AXIS_MARGIN: number = 40;
    private static MARGIN: number = 15;
    private static LABEL_ROTATION_ANGLE: number = 40;
    private static MINIMUM_BAR_SPACING: number = 2;
    private static NUMBER_OF_STEPS_RIGHT_AXIS: number = 10;

    
    private data: ID3DualBarChartEntry[];
    private height: number;
    private width: number;
    private maxBarWidth: number;
    private colorOne: string;
    private colorTwo: string;
    private leftYAxisFormatter: (value: any) => string;
    private rightYAxisFormatter: (value: any) => string;
    private isValueOneTimeSpan=false;
    private isValueTwoTimeSpan=false;
    private svg: d3.Selection<any>;

    public link: (scope: ID3DualBarChartScope, elem: ng.IAugmentedJQuery, attrs) => void;

    constructor(private d3UtilitiesService: any) { 
        this.link = (scope: ID3DualBarChartScope, elem: ng.IAugmentedJQuery, attrs) => {
            this.svg = d3.select(elem[0]).append('svg');

            this.initializeParameters(scope);
            scope.$watchGroup(['height', 'width', 'data'], (newValue, oldValue, s) => {
                this.initializeParameters(scope);
                this.render();
            });

            elem.resize(() => {
             this.render();
            })

              this.render();
        };
    }

    private initializeParameters(scope: ID3DualBarChartScope) {
        this.data = scope.data;
        this.height = parseInt(scope.height) || D3DualBarChart.DEFAULT_HEIGHT;
        this.width = parseInt(scope.width) || D3DualBarChart.DEFAULT_HEIGHT;
        this.maxBarWidth = parseInt(scope.maxBarWidth) || D3DualBarChart.DEFAULT_MAX_BAR_WIDTH;
        this.colorOne = scope.colorOne || D3DualBarChart.DEFAULT_COLOR_ONE;
        this.colorTwo = scope.colorTwo || D3DualBarChart.DEFAULT_COLOR_TWO;
        if( typeof scope.leftYAxisFormatter != 'undefined' && scope.leftYAxisFormatter=="timespan") {
            this.isValueOneTimeSpan = true;
        } else {
             this.leftYAxisFormatter = scope.leftYAxisFormatter || D3DualBarChart.DEFAULT_AXIS_FORMATTER;
        }
        console.log("show my timespan stuff",scope.rightYAxisFormatter );
        if( typeof scope.rightYAxisFormatter != 'undefined' && scope.rightYAxisFormatter=="timespan") {
            this.isValueTwoTimeSpan = true;
        } else {
             this.rightYAxisFormatter = scope.rightYAxisFormatter || D3DualBarChart.DEFAULT_AXIS_FORMATTER;
        }
    }
    private GetBothYAxis(calculatedGraphHeight) {

        var maxValueOne = _.max(this.data, v => v.valueOne).valueOne;
        var maxValueTwo = _.max(this.data, v => v.valueTwo).valueTwo;
        
        var steps = Math.floor(calculatedGraphHeight / (2.3 * D3DualBarChart.FONT_SIZE));
    
    // LEFT AXIS
        var leftY = d3.scale.linear().range([calculatedGraphHeight, 0]).domain([0, maxValueOne]);
        var leftYAxis = d3.svg.axis()
            .scale(leftY)
            .orient("left");
        
        if(this.isValueOneTimeSpan) {
                let timeSpan = new TimeSpan(maxValueTwo);
                let timeInterval  = timeSpan.getFormater(steps);
                leftYAxis.tickFormat(timeInterval.formatHandler);
                leftYAxis.tickValues(d3.range(0, maxValueTwo, timeInterval.stepSize));
        } else{
            leftYAxis.ticks(steps)
            leftYAxis.tickFormat( this.leftYAxisFormatter);
        }
    // RIGHT AXIS
        var rightY = d3.scale.linear().range([calculatedGraphHeight, 0]).domain([0, maxValueTwo]);
        var rightYAxis = d3.svg.axis()
            .scale(rightY)
            .orient("right");
       if(this.isValueTwoTimeSpan) {
                let timeSpan = new TimeSpan(maxValueTwo);
                let timeInterval  = timeSpan.getFormater(steps);
                rightYAxis.tickFormat(timeInterval.formatHandler);
                rightYAxis.tickValues(d3.range(0, maxValueTwo, timeInterval.stepSize));
        } else{
            rightYAxis.ticks(steps)
            rightYAxis.tickFormat( this.rightYAxisFormatter);
        }


        return {
            left: {
                    axis : leftYAxis,
                    y: leftY
            },
              right: {
                    axis : rightYAxis,
                    y: rightY
            },
    
        }
    }

    // duplicate code of the render function
    // should be more reuseable
    private getRotationMeasurements(svg: Selection<any>) { 
        this.svg.selectAll('*').remove();
        this.svg.attr('width', this.width).attr('height', this.height);

        var marginLabelHeight = D3DualBarChart.FONT_SIZE + 10;
        var graphHeight = this.height - D3DualBarChart.MARGIN * 2 - marginLabelHeight;

        var YAxises = this.GetBothYAxis(graphHeight);

        var marginContainer = this.svg.append('g')
            .attr('transform', this.translate(D3DualBarChart.MARGIN, D3DualBarChart.MARGIN));

        var leftYAxisGroup = marginContainer.append('g').call(YAxises.left.axis);
        var rightYAxisGroup = marginContainer.append('g').call(YAxises.right.axis);
        
        var leftAxisWidth = (<SVGSVGElement>(<any>leftYAxisGroup.node())).getBBox().width;
        var rightAxisWidth = (<SVGSVGElement>(<any>rightYAxisGroup.node())).getBBox().width;       
                
        var graphWidth = this.width - D3DualBarChart.MARGIN * 2 - leftAxisWidth - rightAxisWidth;

        var dualBarWidth = graphWidth / this.data.length;
        var labelWidth = this.d3UtilitiesService.getMaxWidthOfTexts($.map(this.data, (d) => d.label), D3DualBarChart.FONT_SIZE);
        var rotateLabel: boolean = dualBarWidth < labelWidth;
        return {
            rotateLabel: rotateLabel,
            labelWidth: labelWidth,
            labelHeigth: D3DualBarChart.FONT_SIZE,
            dualBarWidth: dualBarWidth
        };        
    }

    public render() {
        if (!this.data) { throw new Error("No data given"); }

        var rotationMeasurements = this.getRotationMeasurements(this.svg);

        this.svg.selectAll('*').remove(); 
        this.svg.attr('width', this.width).attr('height', this.height);

        var marginLabelHeight = D3DualBarChart.FONT_SIZE + 10;

        var rotation = 0;
        if(rotationMeasurements.rotateLabel) {
            var a = rotationMeasurements.labelWidth;
            var b = rotationMeasurements.labelHeigth;
            var c = a*a+b*b;
            var z = rotationMeasurements.dualBarWidth;
            var x = (z*(a*a)+Math.sqrt(Math.abs(c-Math.pow(z, 2))))/c;
            var alpha = Math.acos(x/a);
            rotation = alpha*180/Math.PI;
            var angleRadians = rotation * Math.PI / 180;
            var height1 = Math.cos(angleRadians) * rotationMeasurements.labelWidth;
            var height2 = Math.sin(angleRadians) * D3DualBarChart.FONT_SIZE;
            marginLabelHeight = height1 + height2 + 10;
        }

        var graphHeight = this.height - D3DualBarChart.MARGIN * 2 - marginLabelHeight;

        var YAxises = this.GetBothYAxis(graphHeight);

        var marginContainer = this.svg.append('g')
            .attr('transform', this.translate(D3DualBarChart.MARGIN, D3DualBarChart.MARGIN));

        var leftYAxisGroup = marginContainer.append('g')
                    .attr('class','axis-dualbars')
                    .call(YAxises.left.axis);
           leftYAxisGroup.selectAll('text')
                     .style('fill', this.colorOne)
	                .style('font-size', D3DualBarChart.FONT_SIZE)  ;    

        var rightYAxisGroup = marginContainer.append('g')
                    .attr('class','axis-dualbars')
                    .call(YAxises.right.axis);
            rightYAxisGroup.selectAll('text')
                     .style('fill', this.colorTwo)
	                .style('font-size', D3DualBarChart.FONT_SIZE) ;    

        var leftAxisWidth = (<SVGSVGElement>(<any>leftYAxisGroup.node())).getBBox().width;
        var rightAxisWidth = (<SVGSVGElement>(<any>rightYAxisGroup.node())).getBBox().width;        
                
        var graphWidth = this.width - D3DualBarChart.MARGIN * 2 - leftAxisWidth - rightAxisWidth;

        var dualBarWidth = graphWidth / this.data.length;
        var labelWidth = this.d3UtilitiesService.getMaxWidthOfTexts($.map(this.data, (d) => d.label), D3DualBarChart.FONT_SIZE);

        var extraBottomMargin = rotationMeasurements.rotateLabel
            ? Math.cos(Math.PI * D3DualBarChart.LABEL_ROTATION_ANGLE / 180) * labelWidth
            : D3DualBarChart.FONT_SIZE * 1.2;
              
        var barsOffset: number = 1;
        var singleBarWidth: number = (dualBarWidth - D3DualBarChart.MINIMUM_BAR_SPACING) / 2;
        if( this.maxBarWidth * 2 < dualBarWidth ) {                        
            barsOffset = (dualBarWidth - this.maxBarWidth * 2 ) / 2;
            singleBarWidth = this.maxBarWidth;
        }

        leftYAxisGroup.attr('transform', this.translate(leftAxisWidth, 0));
        rightYAxisGroup.attr('transform', this.translate(graphWidth + leftAxisWidth, 0));
        var dataGroup = marginContainer.append("g").attr('transform', this.translate(leftAxisWidth, 0));
        var labelGroup = marginContainer.append("g").attr('transform', this.translate(leftAxisWidth, graphHeight + 10 + (marginLabelHeight/2)));
                        
        var dualBars = dataGroup.selectAll("g")
            .data(this.data)
            .enter().append("g")
            .attr("transform", (d, i) => this.translate(i * dualBarWidth, 0));

        // first bar
        dualBars.append("rect")
            .attr("y", (d) => YAxises.left.y(d.valueOne))
            .attr("height", (d) => graphHeight - YAxises.left.y(d.valueOne))
            .attr("x", barsOffset + 0)
            .attr("width", singleBarWidth)                         
            .style('fill', this.colorOne);
        // second bar
        dualBars.append("rect")
            .attr("y", (d) => YAxises.right.y(d.valueTwo))
            .attr("height", (d) => graphHeight - YAxises.right.y(d.valueTwo))
            .attr("x", barsOffset + singleBarWidth)
            .attr("width", singleBarWidth)                         
            .style('fill', this.colorTwo);      
        
        var barLabels = labelGroup.selectAll("g")
            .data(this.data)
            .enter().append('g')
            .attr('transform', (d, i) => this.translate((i + 0.5) * dualBarWidth, 0));
        barLabels
            .append("text")
            .attr('text-anchor', 'middle')
            .text(d => d.label)
            .style("fill", '#6f6e6d')
	        .style("font-size", D3DualBarChart.FONT_SIZE)
            .attr("transform", () => {
                return rotationMeasurements.rotateLabel ? 'rotate(' + rotation + ')' : '';
            });
        
    }

    private translate(width: number, height: number): string {
        return `translate(${width}, ${height})`;
    }
}

angular.module('d3').directive('d3DualBarChart', ['d3UtilitiesService', (d3UtilitiesService: any) => new D3DualBarChart(d3UtilitiesService)]);