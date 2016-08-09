/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var TimeSpan = (function () {
	    function TimeSpan(timeSpanInSeconds) {
	        this.timeSpanInSeconds = timeSpanInSeconds;
	    }
	    TimeSpan.prototype.getFormater = function (maxSteps) {
	        var _this = this;
	        var res = this.findTimeStep(maxSteps);
	        return {
	            formatHandler: function (timeSpan) { return _this.toString(timeSpan, res.resolution); },
	            stepSize: res.stepSize
	        };
	    };
	    TimeSpan.prototype.findTimeStep = function (maxSteps) {
	        var validSteps = {};
	        validSteps[60] = "seconds"; // minute
	        validSteps[5 * 60] = "minutes"; // 5 minutes
	        validSteps[10 * 60] = "minutes"; // 10 minutes
	        validSteps[15 * 60] = "minutes"; // 15 minutes
	        validSteps[30 * 60] = "minutes"; // half an hour
	        validSteps[60 * 60] = "hours"; // hour
	        validSteps[2 * 60 * 60] = "hours"; // 2 hours
	        validSteps[8 * 60 * 60] = "hours"; // 8 hours
	        validSteps[12 * 60 * 60] = "hours"; // 12 hours
	        validSteps[24 * 60 * 60] = "days"; // 1 day
	        validSteps[2 * 24 * 60 * 60] = "days"; // 2 days
	        validSteps[7 * 24 * 24 * 60] = "days"; // 1 week
	        var interval = this.timeSpanInSeconds / (maxSteps + 1);
	        var resolution = "days";
	        var stepSize = interval;
	        for (var s in validSteps) {
	            if (interval < s) {
	                resolution = validSteps[s];
	                stepSize = s;
	                break;
	            }
	        }
	        return {
	            resolution: resolution,
	            stepSize: stepSize
	        };
	    };
	    TimeSpan.prototype.toString = function (inputInSeconds, resolution) {
	        resolution = resolution || "seconds";
	        var resDepth = 0;
	        // --- map resolution to number
	        switch (resolution) {
	            case "weeks":
	                resDepth = 2;
	                break;
	            case "days":
	                resDepth = 3;
	                break;
	            case "hours":
	                resDepth = 4;
	                break;
	            case "minutes":
	                resDepth = 5;
	                break;
	            case "seconds":
	                resDepth = 6;
	                break;
	            case "milliseconds":
	                resDepth = 7;
	                break;
	            default:
	                resDepth = 6;
	                break;
	        }
	        // --- Calculate seconds/minutes/hours/days/weeks/...
	        var msec = Math.floor(inputInSeconds * 1000 - Math.floor(inputInSeconds) * 1000);
	        var sec = Math.floor(inputInSeconds % 60);
	        var min = (Math.floor(inputInSeconds / 60)) % 60;
	        var hours = (Math.floor(inputInSeconds / 3600)) % 24;
	        var days = Math.floor(inputInSeconds / (24 * 3600));
	        var weeks = 0;
	        if (days > 7) {
	            if (days === 7 || days === 14 || days === 28) {
	                weeks = (Math.floor(inputInSeconds / (7 * 24 * 3600))) % 7;
	                days = 0;
	            }
	        }
	        // --- Build return string
	        var res = "";
	        res += (weeks <= 1) ? "" : (weeks == 1) ? "week " : "weeks ";
	        if (resDepth > 2) {
	            res += (days <= 1) ? "" : (days == 1) ? "day " : "days ";
	        }
	        if (hours || min || sec) {
	            if (days > 0 && resDepth > 3)
	                res += ", ";
	            if (hours && !min && !sec) {
	                res += (resDepth > 3) ? hours + "h " : "";
	            }
	            else if (!hours && min && !sec) {
	                res += (resDepth > 4) ? min + "min " : "";
	            }
	            else if (!hours && !min && sec) {
	                res += (resDepth > 5) ? sec + "s " : "";
	            }
	            else {
	                res += (resDepth > 3 && hours > 0) ? hours + "h " : "";
	                res += (resDepth > 4 && (min > 0 || hours > 0)) ? min + "m " : "";
	                res += (resDepth > 5 && (sec > 0 || min > 0 || hours > 0)) ? sec + "s " : "";
	                res += (resDepth > 6 && (msec > 0 || sec > 0 || min > 0 || hours > 0)) ? msec + "ms" : "";
	            }
	        }
	        return res;
	    };
	    return TimeSpan;
	}());
	exports.TimeSpan = TimeSpan;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var _ = __webpack_require__(3);
	//import {TimeSpan} from '../../service/timeSpan';
	var TimeSpan = (function () {
	    function TimeSpan(timeSpanInSeconds) {
	        this.timeSpanInSeconds = timeSpanInSeconds;
	    }
	    TimeSpan.prototype.getFormater = function (maxSteps) {
	        var _this = this;
	        var res = this.findTimeStep(maxSteps);
	        return {
	            formatHandler: function (timeSpan) { return _this.toString(timeSpan, res.resolution); },
	            stepSize: res.stepSize
	        };
	    };
	    TimeSpan.prototype.findTimeStep = function (maxSteps) {
	        var validSteps = {};
	        validSteps[60] = "seconds"; // minute
	        validSteps[5 * 60] = "minutes"; // 5 minutes
	        validSteps[10 * 60] = "minutes"; // 10 minutes
	        validSteps[15 * 60] = "minutes"; // 15 minutes
	        validSteps[30 * 60] = "minutes"; // half an hour
	        validSteps[60 * 60] = "hours"; // hour
	        validSteps[2 * 60 * 60] = "hours"; // 2 hours
	        validSteps[8 * 60 * 60] = "hours"; // 8 hours
	        validSteps[12 * 60 * 60] = "hours"; // 12 hours
	        validSteps[24 * 60 * 60] = "days"; // 1 day
	        validSteps[2 * 24 * 60 * 60] = "days"; // 2 days
	        validSteps[7 * 24 * 24 * 60] = "days"; // 1 week
	        var interval = this.timeSpanInSeconds / (maxSteps + 1);
	        var resolution = "days";
	        var stepSize = interval;
	        for (var s in validSteps) {
	            if (interval < s) {
	                resolution = validSteps[s];
	                stepSize = s;
	                break;
	            }
	        }
	        return {
	            resolution: resolution,
	            stepSize: stepSize
	        };
	    };
	    TimeSpan.prototype.toString = function (inputInSeconds, resolution) {
	        resolution = resolution || "seconds";
	        if (inputInSeconds <= 0)
	            return "0";
	        var resDepth = 0;
	        // --- map resolution to number
	        switch (resolution) {
	            case "weeks":
	                resDepth = 2;
	                break;
	            case "days":
	                resDepth = 3;
	                break;
	            case "hours":
	                resDepth = 4;
	                break;
	            case "minutes":
	                resDepth = 5;
	                break;
	            case "seconds":
	                resDepth = 6;
	                break;
	            case "milliseconds":
	                resDepth = 7;
	                break;
	            default:
	                resDepth = 6;
	                break;
	        }
	        // --- Calculate seconds/minutes/hours/days/weeks/...
	        var msec = Math.floor(inputInSeconds * 1000 - Math.floor(inputInSeconds) * 1000);
	        var sec = Math.floor(inputInSeconds % 60);
	        var min = (Math.floor(inputInSeconds / 60)) % 60;
	        var hours = (Math.floor(inputInSeconds / 3600)) % 24;
	        var days = Math.floor(inputInSeconds / (24 * 3600));
	        var weeks = 0;
	        if (days > 7) {
	            if (days === 7 || days === 14 || days === 28) {
	                weeks = (Math.floor(inputInSeconds / (7 * 24 * 3600))) % 7;
	                days = 0;
	            }
	        }
	        // --- Build return string
	        var res = "";
	        res += (weeks <= 1) ? "" : (weeks == 1) ? "week " : "weeks ";
	        if (resDepth > 2) {
	            res += (days <= 1) ? "" : (days == 1) ? "day " : "days ";
	        }
	        if (hours || min || sec) {
	            if (days > 0 && resDepth > 3)
	                res += ", ";
	            if (hours && !min && !sec) {
	                res += (resDepth > 3) ? hours + "h " : "";
	            }
	            else if (!hours && min && !sec) {
	                res += (resDepth > 4) ? min + "min " : "";
	            }
	            else if (!hours && !min && sec) {
	                res += (resDepth > 5) ? sec + "s " : "";
	            }
	            else {
	                res += (resDepth > 3 && hours > 0) ? hours + "h " : "";
	                res += (resDepth > 4 && (min > 0 || hours > 0)) ? min + "m " : "";
	                res += (resDepth > 5 && (sec > 0 || min > 0 || hours > 0)) ? sec + "s " : "";
	                res += (resDepth > 6 && (msec > 0 || sec > 0 || min > 0 || hours > 0)) ? msec + "ms" : "";
	            }
	        }
	        return res;
	    };
	    return TimeSpan;
	}());
	exports.TimeSpan = TimeSpan;
	var D3DualBarChart = (function () {
	    function D3DualBarChart(d3UtilitiesService) {
	        var _this = this;
	        this.d3UtilitiesService = d3UtilitiesService;
	        this.restrict = 'E';
	        this.scope = {
	            data: '=',
	            height: '=?',
	            width: '=?',
	            maxBarWidth: '@?',
	            colorOne: '@?',
	            colorTwo: '@?',
	            leftYAxisFormatter: '=?',
	            rightYAxisFormatter: '=?'
	        };
	        this.isValueOneTimeSpan = false;
	        this.isValueTwoTimeSpan = false;
	        this.link = function (scope, elem, attrs) {
	            _this.svg = d3.select(elem[0]).append('svg');
	            _this.initializeParameters(scope);
	            scope.$watchGroup(['height', 'width', 'data'], function (newValue, oldValue, s) {
	                _this.initializeParameters(scope);
	                _this.render();
	            });
	            elem.resize(function () {
	                _this.render();
	            });
	            _this.render();
	        };
	    }
	    D3DualBarChart.prototype.initializeParameters = function (scope) {
	        this.data = scope.data;
	        this.height = parseInt(scope.height) || D3DualBarChart.DEFAULT_HEIGHT;
	        this.width = parseInt(scope.width) || D3DualBarChart.DEFAULT_HEIGHT;
	        this.maxBarWidth = parseInt(scope.maxBarWidth) || D3DualBarChart.DEFAULT_MAX_BAR_WIDTH;
	        this.colorOne = scope.colorOne || D3DualBarChart.DEFAULT_COLOR_ONE;
	        this.colorTwo = scope.colorTwo || D3DualBarChart.DEFAULT_COLOR_TWO;
	        if (typeof scope.leftYAxisFormatter != 'undefined' && scope.leftYAxisFormatter == "timespan") {
	            this.isValueOneTimeSpan = true;
	        }
	        else {
	            this.leftYAxisFormatter = scope.leftYAxisFormatter || D3DualBarChart.DEFAULT_AXIS_FORMATTER;
	        }
	        console.log("show my timespan stuff", scope.rightYAxisFormatter);
	        if (typeof scope.rightYAxisFormatter != 'undefined' && scope.rightYAxisFormatter == "timespan") {
	            this.isValueTwoTimeSpan = true;
	        }
	        else {
	            this.rightYAxisFormatter = scope.rightYAxisFormatter || D3DualBarChart.DEFAULT_AXIS_FORMATTER;
	        }
	    };
	    D3DualBarChart.prototype.GetBothYAxis = function (calculatedGraphHeight) {
	        var maxValueOne = _.max(this.data, function (v) { return v.valueOne; }).valueOne;
	        var maxValueTwo = _.max(this.data, function (v) { return v.valueTwo; }).valueTwo;
	        var steps = Math.floor(calculatedGraphHeight / (2.3 * D3DualBarChart.FONT_SIZE));
	        // LEFT AXIS
	        var leftY = d3.scale.linear().range([calculatedGraphHeight, 0]).domain([0, maxValueOne]);
	        var leftYAxis = d3.svg.axis()
	            .scale(leftY)
	            .orient("left");
	        if (this.isValueOneTimeSpan) {
	            var timeSpan = new TimeSpan(maxValueTwo);
	            var timeInterval = timeSpan.getFormater(steps);
	            leftYAxis.tickFormat(timeInterval.formatHandler);
	            leftYAxis.tickValues(d3.range(0, maxValueTwo, timeInterval.stepSize));
	        }
	        else {
	            leftYAxis.ticks(steps);
	            leftYAxis.tickFormat(this.leftYAxisFormatter);
	        }
	        // RIGHT AXIS
	        var rightY = d3.scale.linear().range([calculatedGraphHeight, 0]).domain([0, maxValueTwo]);
	        var rightYAxis = d3.svg.axis()
	            .scale(rightY)
	            .orient("right");
	        if (this.isValueTwoTimeSpan) {
	            var timeSpan = new TimeSpan(maxValueTwo);
	            var timeInterval = timeSpan.getFormater(steps);
	            rightYAxis.tickFormat(timeInterval.formatHandler);
	            rightYAxis.tickValues(d3.range(0, maxValueTwo, timeInterval.stepSize));
	        }
	        else {
	            rightYAxis.ticks(steps);
	            rightYAxis.tickFormat(this.rightYAxisFormatter);
	        }
	        return {
	            left: {
	                axis: leftYAxis,
	                y: leftY
	            },
	            right: {
	                axis: rightYAxis,
	                y: rightY
	            }
	        };
	    };
	    // duplicate code of the render function
	    // should be more reuseable
	    D3DualBarChart.prototype.getRotationMeasurements = function (svg) {
	        this.svg.selectAll('*').remove();
	        this.svg.attr('width', this.width).attr('height', this.height);
	        var marginLabelHeight = D3DualBarChart.FONT_SIZE + 10;
	        var graphHeight = this.height - D3DualBarChart.MARGIN * 2 - marginLabelHeight;
	        var YAxises = this.GetBothYAxis(graphHeight);
	        var marginContainer = this.svg.append('g')
	            .attr('transform', this.translate(D3DualBarChart.MARGIN, D3DualBarChart.MARGIN));
	        var leftYAxisGroup = marginContainer.append('g').call(YAxises.left.axis);
	        var rightYAxisGroup = marginContainer.append('g').call(YAxises.right.axis);
	        var leftAxisWidth = leftYAxisGroup.node().getBBox().width;
	        var rightAxisWidth = rightYAxisGroup.node().getBBox().width;
	        var graphWidth = this.width - D3DualBarChart.MARGIN * 2 - leftAxisWidth - rightAxisWidth;
	        var dualBarWidth = graphWidth / this.data.length;
	        var labelWidth = this.d3UtilitiesService.getMaxWidthOfTexts($.map(this.data, function (d) { return d.label; }), D3DualBarChart.FONT_SIZE);
	        var rotateLabel = dualBarWidth < labelWidth;
	        return {
	            rotateLabel: rotateLabel,
	            labelWidth: labelWidth,
	            labelHeigth: D3DualBarChart.FONT_SIZE,
	            dualBarWidth: dualBarWidth
	        };
	    };
	    D3DualBarChart.prototype.render = function () {
	        var _this = this;
	        if (!this.data) {
	            throw new Error("No data given");
	        }
	        var rotationMeasurements = this.getRotationMeasurements(this.svg);
	        this.svg.selectAll('*').remove();
	        this.svg.attr('width', this.width).attr('height', this.height);
	        var marginLabelHeight = D3DualBarChart.FONT_SIZE + 10;
	        var rotation = 0;
	        if (rotationMeasurements.rotateLabel) {
	            var a = rotationMeasurements.labelWidth;
	            var b = rotationMeasurements.labelHeigth;
	            var c = a * a + b * b;
	            var z = rotationMeasurements.dualBarWidth;
	            var x = (z * (a * a) + Math.sqrt(Math.abs(c - Math.pow(z, 2)))) / c;
	            var alpha = Math.acos(x / a);
	            rotation = alpha * 180 / Math.PI;
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
	            .attr('class', 'axis-dualbars')
	            .call(YAxises.left.axis);
	        leftYAxisGroup.selectAll('text')
	            .style('fill', this.colorOne)
	            .style('font-size', D3DualBarChart.FONT_SIZE);
	        var rightYAxisGroup = marginContainer.append('g')
	            .attr('class', 'axis-dualbars')
	            .call(YAxises.right.axis);
	        rightYAxisGroup.selectAll('text')
	            .style('fill', this.colorTwo)
	            .style('font-size', D3DualBarChart.FONT_SIZE);
	        var leftAxisWidth = leftYAxisGroup.node().getBBox().width;
	        var rightAxisWidth = rightYAxisGroup.node().getBBox().width;
	        var graphWidth = this.width - D3DualBarChart.MARGIN * 2 - leftAxisWidth - rightAxisWidth;
	        var dualBarWidth = graphWidth / this.data.length;
	        var labelWidth = this.d3UtilitiesService.getMaxWidthOfTexts($.map(this.data, function (d) { return d.label; }), D3DualBarChart.FONT_SIZE);
	        var extraBottomMargin = rotationMeasurements.rotateLabel
	            ? Math.cos(Math.PI * D3DualBarChart.LABEL_ROTATION_ANGLE / 180) * labelWidth
	            : D3DualBarChart.FONT_SIZE * 1.2;
	        var barsOffset = 1;
	        var singleBarWidth = (dualBarWidth - D3DualBarChart.MINIMUM_BAR_SPACING) / 2;
	        if (this.maxBarWidth * 2 < dualBarWidth) {
	            barsOffset = (dualBarWidth - this.maxBarWidth * 2) / 2;
	            singleBarWidth = this.maxBarWidth;
	        }
	        leftYAxisGroup.attr('transform', this.translate(leftAxisWidth, 0));
	        rightYAxisGroup.attr('transform', this.translate(graphWidth + leftAxisWidth, 0));
	        var dataGroup = marginContainer.append("g").attr('transform', this.translate(leftAxisWidth, 0));
	        var labelGroup = marginContainer.append("g").attr('transform', this.translate(leftAxisWidth, graphHeight + 10 + (marginLabelHeight / 2)));
	        var dualBars = dataGroup.selectAll("g")
	            .data(this.data)
	            .enter().append("g")
	            .attr("transform", function (d, i) { return _this.translate(i * dualBarWidth, 0); });
	        // first bar
	        dualBars.append("rect")
	            .attr("y", function (d) { return YAxises.left.y(d.valueOne); })
	            .attr("height", function (d) { return graphHeight - YAxises.left.y(d.valueOne); })
	            .attr("x", barsOffset + 0)
	            .attr("width", singleBarWidth)
	            .style('fill', this.colorOne);
	        // second bar
	        dualBars.append("rect")
	            .attr("y", function (d) { return YAxises.right.y(d.valueTwo); })
	            .attr("height", function (d) { return graphHeight - YAxises.right.y(d.valueTwo); })
	            .attr("x", barsOffset + singleBarWidth)
	            .attr("width", singleBarWidth)
	            .style('fill', this.colorTwo);
	        var barLabels = labelGroup.selectAll("g")
	            .data(this.data)
	            .enter().append('g')
	            .attr('transform', function (d, i) { return _this.translate((i + 0.5) * dualBarWidth, 0); });
	        barLabels
	            .append("text")
	            .attr('text-anchor', 'middle')
	            .text(function (d) { return d.label; })
	            .style("fill", '#6f6e6d')
	            .style("font-size", D3DualBarChart.FONT_SIZE)
	            .attr("transform", function () {
	            return rotationMeasurements.rotateLabel ? 'rotate(' + rotation + ')' : '';
	        });
	    };
	    D3DualBarChart.prototype.translate = function (width, height) {
	        return "translate(" + width + ", " + height + ")";
	    };
	    D3DualBarChart.DEFAULT_HEIGHT = 500;
	    D3DualBarChart.DEFAULT_WIDTH = 500;
	    D3DualBarChart.DEFAULT_MAX_BAR_WIDTH = 50;
	    D3DualBarChart.DEFAULT_COLOR_ONE = "#fdb81e";
	    D3DualBarChart.DEFAULT_COLOR_TWO = "#486983";
	    D3DualBarChart.DEFAULT_AXIS_FORMATTER = function (value) { return value; };
	    D3DualBarChart.FONT_SIZE = 15;
	    D3DualBarChart.Y_AXIS_MARGIN = 40;
	    D3DualBarChart.MARGIN = 15;
	    D3DualBarChart.LABEL_ROTATION_ANGLE = 40;
	    D3DualBarChart.MINIMUM_BAR_SPACING = 2;
	    D3DualBarChart.NUMBER_OF_STEPS_RIGHT_AXIS = 10;
	    return D3DualBarChart;
	}());
	angular.module('d3').directive('d3DualBarChart', ['d3UtilitiesService', function (d3UtilitiesService) { return new D3DualBarChart(d3UtilitiesService); }]);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global, setImmediate) {/**
	 * @license
	 * Lo-Dash 1.0.2 (Custom Build) <http://lodash.com/>
	 * Build: `lodash -o ./dist/lodash.compat.js`
	 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.4.4 <http://underscorejs.org/>
	 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
	 * Available under MIT license <http://lodash.com/license>
	 */
	;(function(window, undefined) {
	
	  /** Detect free variable `exports` */
	  var freeExports = typeof exports == 'object' && exports;
	
	  /** Detect free variable `module` */
	  var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;
	
	  /** Detect free variable `global` and use it as `window` */
	  var freeGlobal = typeof global == 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    window = freeGlobal;
	  }
	
	  /** Used for array and object method references */
	  var arrayRef = [],
	      objectRef = {};
	
	  /** Used to generate unique IDs */
	  var idCounter = 0;
	
	  /** Used internally to indicate various things */
	  var indicatorObject = objectRef;
	
	  /** Used by `cachedContains` as the default size when optimizations are enabled for large arrays */
	  var largeArraySize = 30;
	
	  /** Used to restore the original `_` reference in `noConflict` */
	  var oldDash = window._;
	
	  /** Used to match HTML entities */
	  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
	
	  /** Used to match empty string literals in compiled template source */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
	
	  /** Used to match regexp flags from their coerced string values */
	  var reFlags = /\w*$/;
	
	  /** Used to detect if a method is native */
	  var reNative = RegExp('^' +
	    (objectRef.valueOf + '')
	      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	      .replace(/valueOf|for [^\]]+/g, '.+?') + '$'
	  );
	
	  /**
	   * Used to match ES6 template delimiters
	   * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-7.8.6
	   */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
	
	  /** Used to match "interpolate" template delimiters */
	  var reInterpolate = /<%=([\s\S]+?)%>/g;
	
	  /** Used to ensure capturing order of template delimiters */
	  var reNoMatch = /($^)/;
	
	  /** Used to match HTML characters */
	  var reUnescapedHtml = /[&<>"']/g;
	
	  /** Used to match unescaped characters in compiled string literals */
	  var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;
	
	  /** Used to fix the JScript [[DontEnum]] bug */
	  var shadowed = [
	    'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
	    'toLocaleString', 'toString', 'valueOf'
	  ];
	
	  /** Used to make template sourceURLs easier to identify */
	  var templateCounter = 0;
	
	  /** Native method shortcuts */
	  var ceil = Math.ceil,
	      concat = arrayRef.concat,
	      floor = Math.floor,
	      getPrototypeOf = reNative.test(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
	      hasOwnProperty = objectRef.hasOwnProperty,
	      push = arrayRef.push,
	      toString = objectRef.toString;
	
	  /* Native method shortcuts for methods with the same name as other `lodash` methods */
	  var nativeBind = reNative.test(nativeBind = slice.bind) && nativeBind,
	      nativeIsArray = reNative.test(nativeIsArray = Array.isArray) && nativeIsArray,
	      nativeIsFinite = window.isFinite,
	      nativeIsNaN = window.isNaN,
	      nativeKeys = reNative.test(nativeKeys = Object.keys) && nativeKeys,
	      nativeMax = Math.max,
	      nativeMin = Math.min,
	      nativeRandom = Math.random;
	
	  /** `Object#toString` result shortcuts */
	  var argsClass = '[object Arguments]',
	      arrayClass = '[object Array]',
	      boolClass = '[object Boolean]',
	      dateClass = '[object Date]',
	      funcClass = '[object Function]',
	      numberClass = '[object Number]',
	      objectClass = '[object Object]',
	      regexpClass = '[object RegExp]',
	      stringClass = '[object String]';
	
	  /** Detect various environments */
	  var isIeOpera = !!window.attachEvent,
	      isV8 = nativeBind && !/\n|true/.test(nativeBind + isIeOpera);
	
	  /* Detect if `Function#bind` exists and is inferred to be fast (all but V8) */
	  var isBindFast = nativeBind && !isV8;
	
	  /* Detect if `Object.keys` exists and is inferred to be fast (IE, Opera, V8) */
	  var isKeysFast = nativeKeys && (isIeOpera || isV8);
	
	  /**
	   * Detect the JScript [[DontEnum]] bug:
	   *
	   * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
	   * made non-enumerable as well.
	   */
	  var hasDontEnumBug;
	
	  /**
	   * Detect if a `prototype` properties are enumerable by default:
	   *
	   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
	   * (if the prototype or a property on the prototype has been set)
	   * incorrectly sets a function's `prototype` property [[Enumerable]]
	   * value to `true`.
	   */
	  var hasEnumPrototype;
	
	  /** Detect if own properties are iterated after inherited properties (IE < 9) */
	  var iteratesOwnLast;
	
	  /**
	   * Detect if `Array#shift` and `Array#splice` augment array-like objects
	   * incorrectly:
	   *
	   * Firefox < 10, IE compatibility mode, and IE < 9 have buggy Array `shift()`
	   * and `splice()` functions that fail to remove the last element, `value[0]`,
	   * of array-like objects even though the `length` property is set to `0`.
	   * The `shift()` method is buggy in IE 8 compatibility mode, while `splice()`
	   * is buggy regardless of mode in IE < 9 and buggy in compatibility mode in IE 9.
	   */
	  var hasObjectSpliceBug = (hasObjectSpliceBug = { '0': 1, 'length': 1 },
	    arrayRef.splice.call(hasObjectSpliceBug, 0, 1), hasObjectSpliceBug[0]);
	
	  /** Detect if `arguments` object indexes are non-enumerable (Firefox < 4, IE < 9, PhantomJS, Safari < 5.1) */
	  var nonEnumArgs = true;
	
	  (function() {
	    var props = [];
	    function ctor() { this.x = 1; }
	    ctor.prototype = { 'valueOf': 1, 'y': 1 };
	    for (var prop in new ctor) { props.push(prop); }
	    for (prop in arguments) { nonEnumArgs = !prop; }
	
	    hasDontEnumBug = !/valueOf/.test(props);
	    hasEnumPrototype = ctor.propertyIsEnumerable('prototype');
	    iteratesOwnLast = props[0] != 'x';
	  }(1));
	
	  /** Detect if `arguments` objects are `Object` objects (all but Opera < 10.5) */
	  var argsAreObjects = arguments.constructor == Object;
	
	  /** Detect if `arguments` objects [[Class]] is unresolvable (Firefox < 4, IE < 9) */
	  var noArgsClass = !isArguments(arguments);
	
	  /**
	   * Detect lack of support for accessing string characters by index:
	   *
	   * IE < 8 can't access characters by index and IE 8 can only access
	   * characters by index on string literals.
	   */
	  var noCharByIndex = ('x'[0] + Object('x')[0]) != 'xx';
	
	  /**
	   * Detect if a DOM node's [[Class]] is unresolvable (IE < 9)
	   * and that the JS engine won't error when attempting to coerce an object to
	   * a string without a `toString` function.
	   */
	  try {
	    var noNodeClass = toString.call(document) == objectClass && !({ 'toString': 0 } + '');
	  } catch(e) { }
	
	  /** Used to identify object classifications that `_.clone` supports */
	  var cloneableClasses = {};
	  cloneableClasses[funcClass] = false;
	  cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
	  cloneableClasses[boolClass] = cloneableClasses[dateClass] =
	  cloneableClasses[numberClass] = cloneableClasses[objectClass] =
	  cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;
	
	  /** Used to lookup a built-in constructor by [[Class]] */
	  var ctorByClass = {};
	  ctorByClass[arrayClass] = Array;
	  ctorByClass[boolClass] = Boolean;
	  ctorByClass[dateClass] = Date;
	  ctorByClass[objectClass] = Object;
	  ctorByClass[numberClass] = Number;
	  ctorByClass[regexpClass] = RegExp;
	  ctorByClass[stringClass] = String;
	
	  /** Used to determine if values are of the language type Object */
	  var objectTypes = {
	    'boolean': false,
	    'function': true,
	    'object': true,
	    'number': false,
	    'string': false,
	    'undefined': false
	  };
	
	  /** Used to escape characters for inclusion in compiled string literals */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\t': 't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates a `lodash` object, that wraps the given `value`, to enable method
	   * chaining.
	   *
	   * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
	   * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
	   * and `unshift`
	   *
	   * The chainable wrapper functions are:
	   * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`, `compose`,
	   * `concat`, `countBy`, `debounce`, `defaults`, `defer`, `delay`, `difference`,
	   * `filter`, `flatten`, `forEach`, `forIn`, `forOwn`, `functions`, `groupBy`,
	   * `initial`, `intersection`, `invert`, `invoke`, `keys`, `map`, `max`, `memoize`,
	   * `merge`, `min`, `object`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	   * `pick`, `pluck`, `push`, `range`, `reject`, `rest`, `reverse`, `shuffle`,
	   * `slice`, `sort`, `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`,
	   * `union`, `uniq`, `unshift`, `values`, `where`, `without`, `wrap`, and `zip`
	   *
	   * The non-chainable wrapper functions are:
	   * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `has`, `identity`,
	   * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`, `isEmpty`,
	   * `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`, `isObject`,
	   * `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`, `lastIndexOf`,
	   * `mixin`, `noConflict`, `pop`, `random`, `reduce`, `reduceRight`, `result`,
	   * `shift`, `size`, `some`, `sortedIndex`, `template`, `unescape`, and `uniqueId`
	   *
	   * The wrapper functions `first` and `last` return wrapped values when `n` is
	   * passed, otherwise they return unwrapped values.
	   *
	   * @name _
	   * @constructor
	   * @category Chaining
	   * @param {Mixed} value The value to wrap in a `lodash` instance.
	   * @returns {Object} Returns a `lodash` instance.
	   */
	  function lodash(value) {
	    // exit early if already wrapped, even if wrapped by a different `lodash` constructor
	    if (value && typeof value == 'object' && value.__wrapped__) {
	      return value;
	    }
	    // allow invoking `lodash` without the `new` operator
	    if (!(this instanceof lodash)) {
	      return new lodash(value);
	    }
	    this.__wrapped__ = value;
	  }
	
	  /**
	   * By default, the template delimiters used by Lo-Dash are similar to those in
	   * embedded Ruby (ERB). Change the following template settings to use alternative
	   * delimiters.
	   *
	   * @static
	   * @memberOf _
	   * @type Object
	   */
	  lodash.templateSettings = {
	
	    /**
	     * Used to detect `data` property values to be HTML-escaped.
	     *
	     * @memberOf _.templateSettings
	     * @type RegExp
	     */
	    'escape': /<%-([\s\S]+?)%>/g,
	
	    /**
	     * Used to detect code to be evaluated.
	     *
	     * @memberOf _.templateSettings
	     * @type RegExp
	     */
	    'evaluate': /<%([\s\S]+?)%>/g,
	
	    /**
	     * Used to detect `data` property values to inject.
	     *
	     * @memberOf _.templateSettings
	     * @type RegExp
	     */
	    'interpolate': reInterpolate,
	
	    /**
	     * Used to reference the data object in the template text.
	     *
	     * @memberOf _.templateSettings
	     * @type String
	     */
	    'variable': '',
	
	    /**
	     * Used to import variables into the compiled template.
	     *
	     * @memberOf _.templateSettings
	     * @type Object
	     */
	    'imports': {
	
	      /**
	       * A reference to the `lodash` function.
	       *
	       * @memberOf _.templateSettings.imports
	       * @type Function
	       */
	      '_': lodash
	    }
	  };
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * The template used to create iterator functions.
	   *
	   * @private
	   * @param {Obect} data The data object used to populate the text.
	   * @returns {String} Returns the interpolated text.
	   */
	  var iteratorTemplate = function(obj) {
	    
	    var __p = 'var index, iterable = ' +
	    (obj.firstArg ) +
	    ', result = iterable;\nif (!iterable) return result;\n' +
	    (obj.top ) +
	    ';\n';
	     if (obj.arrays) {
	    __p += 'var length = iterable.length; index = -1;\nif (' +
	    (obj.arrays ) +
	    ') {  ';
	     if (obj.noCharByIndex) {
	    __p += '\n  if (isString(iterable)) {\n    iterable = iterable.split(\'\')\n  }  ';
	     } ;
	    __p += '\n  while (++index < length) {\n    ' +
	    (obj.loop ) +
	    '\n  }\n}\nelse {  ';
	      } else if (obj.nonEnumArgs) {
	    __p += '\n  var length = iterable.length; index = -1;\n  if (length && isArguments(iterable)) {\n    while (++index < length) {\n      index += \'\';\n      ' +
	    (obj.loop ) +
	    '\n    }\n  } else {  ';
	     } ;
	    
	     if (obj.hasEnumPrototype) {
	    __p += '\n  var skipProto = typeof iterable == \'function\';\n  ';
	     } ;
	    
	     if (obj.isKeysFast && obj.useHas) {
	    __p += '\n  var ownIndex = -1,\n      ownProps = objectTypes[typeof iterable] ? nativeKeys(iterable) : [],\n      length = ownProps.length;\n\n  while (++ownIndex < length) {\n    index = ownProps[ownIndex];\n    ';
	     if (obj.hasEnumPrototype) {
	    __p += 'if (!(skipProto && index == \'prototype\')) {\n  ';
	     } ;
	    __p += 
	    (obj.loop ) +
	    '';
	     if (obj.hasEnumPrototype) {
	    __p += '}\n';
	     } ;
	    __p += '  }  ';
	     } else {
	    __p += '\n  for (index in iterable) {';
	        if (obj.hasEnumPrototype || obj.useHas) {
	    __p += '\n    if (';
	          if (obj.hasEnumPrototype) {
	    __p += '!(skipProto && index == \'prototype\')';
	     }      if (obj.hasEnumPrototype && obj.useHas) {
	    __p += ' && ';
	     }      if (obj.useHas) {
	    __p += 'hasOwnProperty.call(iterable, index)';
	     }    ;
	    __p += ') {    ';
	     } ;
	    __p += 
	    (obj.loop ) +
	    ';    ';
	     if (obj.hasEnumPrototype || obj.useHas) {
	    __p += '\n    }';
	     } ;
	    __p += '\n  }  ';
	     } ;
	    
	     if (obj.hasDontEnumBug) {
	    __p += '\n\n  var ctor = iterable.constructor;\n    ';
	     for (var k = 0; k < 7; k++) {
	    __p += '\n  index = \'' +
	    (obj.shadowed[k] ) +
	    '\';\n  if (';
	          if (obj.shadowed[k] == 'constructor') {
	    __p += '!(ctor && ctor.prototype === iterable) && ';
	          } ;
	    __p += 'hasOwnProperty.call(iterable, index)) {\n    ' +
	    (obj.loop ) +
	    '\n  }    ';
	     } ;
	    
	     } ;
	    
	     if (obj.arrays || obj.nonEnumArgs) {
	    __p += '\n}';
	     } ;
	    __p += 
	    (obj.bottom ) +
	    ';\nreturn result';
	    
	    
	    return __p
	  };
	
	  /** Reusable iterator options for `assign` and `defaults` */
	  var defaultsIteratorOptions = {
	    'args': 'object, source, guard',
	    'top':
	      'var args = arguments,\n' +
	      '    argsIndex = 0,\n' +
	      "    argsLength = typeof guard == 'number' ? 2 : args.length;\n" +
	      'while (++argsIndex < argsLength) {\n' +
	      '  iterable = args[argsIndex];\n' +
	      '  if (iterable && objectTypes[typeof iterable]) {',
	    'loop': "if (typeof result[index] == 'undefined') result[index] = iterable[index]",
	    'bottom': '  }\n}'
	  };
	
	  /** Reusable iterator options shared by `each`, `forIn`, and `forOwn` */
	  var eachIteratorOptions = {
	    'args': 'collection, callback, thisArg',
	    'top': "callback = callback && typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg)",
	    'arrays': "typeof length == 'number'",
	    'loop': 'if (callback(iterable[index], index, collection) === false) return result'
	  };
	
	  /** Reusable iterator options for `forIn` and `forOwn` */
	  var forOwnIteratorOptions = {
	    'top': 'if (!objectTypes[typeof iterable]) return result;\n' + eachIteratorOptions.top,
	    'arrays': false
	  };
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates a function optimized to search large arrays for a given `value`,
	   * starting at `fromIndex`, using strict equality for comparisons, i.e. `===`.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {Mixed} value The value to search for.
	   * @param {Number} [fromIndex=0] The index to search from.
	   * @param {Number} [largeSize=30] The length at which an array is considered large.
	   * @returns {Boolean} Returns `true`, if `value` is found, else `false`.
	   */
	  function cachedContains(array, fromIndex, largeSize) {
	    fromIndex || (fromIndex = 0);
	
	    var length = array.length,
	        isLarge = (length - fromIndex) >= (largeSize || largeArraySize);
	
	    if (isLarge) {
	      var cache = {},
	          index = fromIndex - 1;
	
	      while (++index < length) {
	        // manually coerce `value` to a string because `hasOwnProperty`, in some
	        // older versions of Firefox, coerces objects incorrectly
	        var key = array[index] + '';
	        (hasOwnProperty.call(cache, key) ? cache[key] : (cache[key] = [])).push(array[index]);
	      }
	    }
	    return function(value) {
	      if (isLarge) {
	        var key = value + '';
	        return hasOwnProperty.call(cache, key) && indexOf(cache[key], value) > -1;
	      }
	      return indexOf(array, value, fromIndex) > -1;
	    }
	  }
	
	  /**
	   * Used by `_.max` and `_.min` as the default `callback` when a given
	   * `collection` is a string value.
	   *
	   * @private
	   * @param {String} value The character to inspect.
	   * @returns {Number} Returns the code unit of given character.
	   */
	  function charAtCallback(value) {
	    return value.charCodeAt(0);
	  }
	
	  /**
	   * Used by `sortBy` to compare transformed `collection` values, stable sorting
	   * them in ascending order.
	   *
	   * @private
	   * @param {Object} a The object to compare to `b`.
	   * @param {Object} b The object to compare to `a`.
	   * @returns {Number} Returns the sort order indicator of `1` or `-1`.
	   */
	  function compareAscending(a, b) {
	    var ai = a.index,
	        bi = b.index;
	
	    a = a.criteria;
	    b = b.criteria;
	
	    // ensure a stable sort in V8 and other engines
	    // http://code.google.com/p/v8/issues/detail?id=90
	    if (a !== b) {
	      if (a > b || typeof a == 'undefined') {
	        return 1;
	      }
	      if (a < b || typeof b == 'undefined') {
	        return -1;
	      }
	    }
	    return ai < bi ? -1 : 1;
	  }
	
	  /**
	   * Creates a function that, when called, invokes `func` with the `this` binding
	   * of `thisArg` and prepends any `partialArgs` to the arguments passed to the
	   * bound function.
	   *
	   * @private
	   * @param {Function|String} func The function to bind or the method name.
	   * @param {Mixed} [thisArg] The `this` binding of `func`.
	   * @param {Array} partialArgs An array of arguments to be partially applied.
	   * @param {Object} [rightIndicator] Used to indicate partially applying arguments from the right.
	   * @returns {Function} Returns the new bound function.
	   */
	  function createBound(func, thisArg, partialArgs, rightIndicator) {
	    var isFunc = isFunction(func),
	        isPartial = !partialArgs,
	        key = thisArg;
	
	    // juggle arguments
	    if (isPartial) {
	      partialArgs = thisArg;
	    }
	    if (!isFunc) {
	      thisArg = func;
	    }
	
	    function bound() {
	      // `Function#bind` spec
	      // http://es5.github.com/#x15.3.4.5
	      var args = arguments,
	          thisBinding = isPartial ? this : thisArg;
	
	      if (!isFunc) {
	        func = thisArg[key];
	      }
	      if (partialArgs.length) {
	        args = args.length
	          ? (args = slice(args), rightIndicator ? args.concat(partialArgs) : partialArgs.concat(args))
	          : partialArgs;
	      }
	      if (this instanceof bound) {
	        // ensure `new bound` is an instance of `bound` and `func`
	        noop.prototype = func.prototype;
	        thisBinding = new noop;
	        noop.prototype = null;
	
	        // mimic the constructor's `return` behavior
	        // http://es5.github.com/#x13.2.2
	        var result = func.apply(thisBinding, args);
	        return isObject(result) ? result : thisBinding;
	      }
	      return func.apply(thisBinding, args);
	    }
	    return bound;
	  }
	
	  /**
	   * Produces a callback bound to an optional `thisArg`. If `func` is a property
	   * name, the created callback will return the property value for a given element.
	   * If `func` is an object, the created callback will return `true` for elements
	   * that contain the equivalent object properties, otherwise it will return `false`.
	   *
	   * @private
	   * @param {Mixed} [func=identity] The value to convert to a callback.
	   * @param {Mixed} [thisArg] The `this` binding of the created callback.
	   * @param {Number} [argCount=3] The number of arguments the callback accepts.
	   * @returns {Function} Returns a callback function.
	   */
	  function createCallback(func, thisArg, argCount) {
	    if (func == null) {
	      return identity;
	    }
	    var type = typeof func;
	    if (type != 'function') {
	      if (type != 'object') {
	        return function(object) {
	          return object[func];
	        };
	      }
	      var props = keys(func);
	      return function(object) {
	        var length = props.length,
	            result = false;
	        while (length--) {
	          if (!(result = isEqual(object[props[length]], func[props[length]], indicatorObject))) {
	            break;
	          }
	        }
	        return result;
	      };
	    }
	    if (typeof thisArg != 'undefined') {
	      if (argCount === 1) {
	        return function(value) {
	          return func.call(thisArg, value);
	        };
	      }
	      if (argCount === 2) {
	        return function(a, b) {
	          return func.call(thisArg, a, b);
	        };
	      }
	      if (argCount === 4) {
	        return function(accumulator, value, index, object) {
	          return func.call(thisArg, accumulator, value, index, object);
	        };
	      }
	      return function(value, index, object) {
	        return func.call(thisArg, value, index, object);
	      };
	    }
	    return func;
	  }
	
	  /**
	   * Creates compiled iteration functions.
	   *
	   * @private
	   * @param {Object} [options1, options2, ...] The compile options object(s).
	   *  arrays - A string of code to determine if the iterable is an array or array-like.
	   *  useHas - A boolean to specify using `hasOwnProperty` checks in the object loop.
	   *  args - A string of comma separated arguments the iteration function will accept.
	   *  top - A string of code to execute before the iteration branches.
	   *  loop - A string of code to execute in the object loop.
	   *  bottom - A string of code to execute after the iteration branches.
	   *
	   * @returns {Function} Returns the compiled function.
	   */
	  function createIterator() {
	    var data = {
	      // support properties
	      'hasDontEnumBug': hasDontEnumBug,
	      'hasEnumPrototype': hasEnumPrototype,
	      'isKeysFast': isKeysFast,
	      'nonEnumArgs': nonEnumArgs,
	      'noCharByIndex': noCharByIndex,
	      'shadowed': shadowed,
	
	      // iterator options
	      'arrays': 'isArray(iterable)',
	      'bottom': '',
	      'loop': '',
	      'top': '',
	      'useHas': true
	    };
	
	    // merge options into a template data object
	    for (var object, index = 0; object = arguments[index]; index++) {
	      for (var key in object) {
	        data[key] = object[key];
	      }
	    }
	    var args = data.args;
	    data.firstArg = /^[^,]+/.exec(args)[0];
	
	    // create the function factory
	    var factory = Function(
	        'createCallback, hasOwnProperty, isArguments, isArray, isString, ' +
	        'objectTypes, nativeKeys',
	      'return function(' + args + ') {\n' + iteratorTemplate(data) + '\n}'
	    );
	    // return the compiled function
	    return factory(
	      createCallback, hasOwnProperty, isArguments, isArray, isString,
	      objectTypes, nativeKeys
	    );
	  }
	
	  /**
	   * A function compiled to iterate `arguments` objects, arrays, objects, and
	   * strings consistenly across environments, executing the `callback` for each
	   * element in the `collection`. The `callback` is bound to `thisArg` and invoked
	   * with three arguments; (value, index|key, collection). Callbacks may exit
	   * iteration early by explicitly returning `false`.
	   *
	   * @private
	   * @type Function
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array|Object|String} Returns `collection`.
	   */
	  var each = createIterator(eachIteratorOptions);
	
	  /**
	   * Used by `template` to escape characters for inclusion in compiled
	   * string literals.
	   *
	   * @private
	   * @param {String} match The matched character to escape.
	   * @returns {String} Returns the escaped character.
	   */
	  function escapeStringChar(match) {
	    return '\\' + stringEscapes[match];
	  }
	
	  /**
	   * Used by `escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {String} match The matched character to escape.
	   * @returns {String} Returns the escaped character.
	   */
	  function escapeHtmlChar(match) {
	    return htmlEscapes[match];
	  }
	
	  /**
	   * Checks if `value` is a DOM node in IE < 9.
	   *
	   * @private
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true` if the `value` is a DOM node, else `false`.
	   */
	  function isNode(value) {
	    // IE < 9 presents DOM nodes as `Object` objects except they have `toString`
	    // methods that are `typeof` "string" and still can coerce nodes to strings
	    return typeof value.toString != 'function' && typeof (value + '') == 'string';
	  }
	
	  /**
	   * A no-operation function.
	   *
	   * @private
	   */
	  function noop() {
	    // no operation performed
	  }
	
	  /**
	   * Slices the `collection` from the `start` index up to, but not including,
	   * the `end` index.
	   *
	   * Note: This function is used, instead of `Array#slice`, to support node lists
	   * in IE < 9 and to ensure dense arrays are returned.
	   *
	   * @private
	   * @param {Array|Object|String} collection The collection to slice.
	   * @param {Number} start The start index.
	   * @param {Number} end The end index.
	   * @returns {Array} Returns the new array.
	   */
	  function slice(array, start, end) {
	    start || (start = 0);
	    if (typeof end == 'undefined') {
	      end = array ? array.length : 0;
	    }
	    var index = -1,
	        length = end - start || 0,
	        result = Array(length < 0 ? 0 : length);
	
	    while (++index < length) {
	      result[index] = array[start + index];
	    }
	    return result;
	  }
	
	  /**
	   * Used by `unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {String} match The matched character to unescape.
	   * @returns {String} Returns the unescaped character.
	   */
	  function unescapeHtmlChar(match) {
	    return htmlUnescapes[match];
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Checks if `value` is an `arguments` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is an `arguments` object, else `false`.
	   * @example
	   *
	   * (function() { return _.isArguments(arguments); })(1, 2, 3);
	   * // => true
	   *
	   * _.isArguments([1, 2, 3]);
	   * // => false
	   */
	  function isArguments(value) {
	    return toString.call(value) == argsClass;
	  }
	  // fallback for browsers that can't detect `arguments` objects by [[Class]]
	  if (noArgsClass) {
	    isArguments = function(value) {
	      return value ? hasOwnProperty.call(value, 'callee') : false;
	    };
	  }
	
	  /**
	   * Iterates over `object`'s own and inherited enumerable properties, executing
	   * the `callback` for each property. The `callback` is bound to `thisArg` and
	   * invoked with three arguments; (value, key, object). Callbacks may exit iteration
	   * early by explicitly returning `false`.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Objects
	   * @param {Object} object The object to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * function Dog(name) {
	   *   this.name = name;
	   * }
	   *
	   * Dog.prototype.bark = function() {
	   *   alert('Woof, woof!');
	   * };
	   *
	   * _.forIn(new Dog('Dagny'), function(value, key) {
	   *   alert(key);
	   * });
	   * // => alerts 'name' and 'bark' (order is not guaranteed)
	   */
	  var forIn = createIterator(eachIteratorOptions, forOwnIteratorOptions, {
	    'useHas': false
	  });
	
	  /**
	   * Iterates over an object's own enumerable properties, executing the `callback`
	   * for each property. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, key, object). Callbacks may exit iteration early by explicitly
	   * returning `false`.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Objects
	   * @param {Object} object The object to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
	   *   alert(key);
	   * });
	   * // => alerts '0', '1', and 'length' (order is not guaranteed)
	   */
	  var forOwn = createIterator(eachIteratorOptions, forOwnIteratorOptions);
	
	  /**
	   * Checks if `value` is an array.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is an array, else `false`.
	   * @example
	   *
	   * (function() { return _.isArray(arguments); })();
	   * // => false
	   *
	   * _.isArray([1, 2, 3]);
	   * // => true
	   */
	  var isArray = nativeIsArray || function(value) {
	    // `instanceof` may cause a memory leak in IE 7 if `value` is a host object
	    // http://ajaxian.com/archives/working-aroung-the-instanceof-memory-leak
	    return (argsAreObjects && value instanceof Array) || toString.call(value) == arrayClass;
	  };
	
	  /**
	   * Creates an array composed of the own enumerable property names of `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property names.
	   * @example
	   *
	   * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
	   * // => ['one', 'two', 'three'] (order is not guaranteed)
	   */
	  var keys = !nativeKeys ? shimKeys : function(object) {
	    if (!isObject(object)) {
	      return [];
	    }
	    if ((hasEnumPrototype && typeof object == 'function') ||
	        (nonEnumArgs && object.length && isArguments(object))) {
	      return shimKeys(object);
	    }
	    return nativeKeys(object);
	  };
	
	  /**
	   * A fallback implementation of `isPlainObject` that checks if a given `value`
	   * is an object created by the `Object` constructor, assuming objects created
	   * by the `Object` constructor have no inherited enumerable properties and that
	   * there are no `Object.prototype` extensions.
	   *
	   * @private
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if `value` is a plain object, else `false`.
	   */
	  function shimIsPlainObject(value) {
	    // avoid non-objects and false positives for `arguments` objects
	    var result = false;
	    if (!(value && typeof value == 'object') || isArguments(value)) {
	      return result;
	    }
	    // check that the constructor is `Object` (i.e. `Object instanceof Object`)
	    var ctor = value.constructor;
	    if ((!isFunction(ctor) && (!noNodeClass || !isNode(value))) || ctor instanceof ctor) {
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      if (iteratesOwnLast) {
	        forIn(value, function(value, key, object) {
	          result = !hasOwnProperty.call(object, key);
	          return false;
	        });
	        return result === false;
	      }
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      forIn(value, function(value, key) {
	        result = key;
	      });
	      return result === false || hasOwnProperty.call(value, result);
	    }
	    return result;
	  }
	
	  /**
	   * A fallback implementation of `Object.keys` that produces an array of the
	   * given object's own enumerable property names.
	   *
	   * @private
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property names.
	   */
	  function shimKeys(object) {
	    var result = [];
	    forOwn(object, function(value, key) {
	      result.push(key);
	    });
	    return result;
	  }
	
	  /**
	   * Used to convert characters to HTML entities:
	   *
	   * Though the `>` character is escaped for symmetry, characters like `>` and `/`
	   * don't require escaping in HTML and have no special meaning unless they're part
	   * of a tag or an unquoted attribute value.
	   * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
	   */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;'
	  };
	
	  /** Used to convert HTML entities to characters */
	  var htmlUnescapes = invert(htmlEscapes);
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object. Subsequent sources will overwrite propery assignments of previous
	   * sources. If a `callback` function is passed, it will be executed to produce
	   * the assigned values. The `callback` is bound to `thisArg` and invoked with
	   * two arguments; (objectValue, sourceValue).
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @alias extend
	   * @category Objects
	   * @param {Object} object The destination object.
	   * @param {Object} [source1, source2, ...] The source objects.
	   * @param {Function} [callback] The function to customize assigning values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns the destination object.
	   * @example
	   *
	   * _.assign({ 'name': 'moe' }, { 'age': 40 });
	   * // => { 'name': 'moe', 'age': 40 }
	   *
	   * var defaults = _.partialRight(_.assign, function(a, b) {
	   *   return typeof a == 'undefined' ? b : a;
	   * });
	   *
	   * var food = { 'name': 'apple' };
	   * defaults(food, { 'name': 'banana', 'type': 'fruit' });
	   * // => { 'name': 'apple', 'type': 'fruit' }
	   */
	  var assign = createIterator(defaultsIteratorOptions, {
	    'top':
	      defaultsIteratorOptions.top.replace(';',
	        ';\n' +
	        "if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {\n" +
	        '  var callback = createCallback(args[--argsLength - 1], args[argsLength--], 2);\n' +
	        "} else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {\n" +
	        '  callback = args[--argsLength];\n' +
	        '}'
	      ),
	    'loop': 'result[index] = callback ? callback(result[index], iterable[index]) : iterable[index]'
	  });
	
	  /**
	   * Creates a clone of `value`. If `deep` is `true`, nested objects will also
	   * be cloned, otherwise they will be assigned by reference. If a `callback`
	   * function is passed, it will be executed to produce the cloned values. If
	   * `callback` returns `undefined`, cloning will be handled by the method instead.
	   * The `callback` is bound to `thisArg` and invoked with one argument; (value).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to clone.
	   * @param {Boolean} [deep=false] A flag to indicate a deep clone.
	   * @param {Function} [callback] The function to customize cloning values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @param- {Array} [stackA=[]] Internally used to track traversed source objects.
	   * @param- {Array} [stackB=[]] Internally used to associate clones with source counterparts.
	   * @returns {Mixed} Returns the cloned `value`.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * var shallow = _.clone(stooges);
	   * shallow[0] === stooges[0];
	   * // => true
	   *
	   * var deep = _.clone(stooges, true);
	   * deep[0] === stooges[0];
	   * // => false
	   *
	   * _.mixin({
	   *   'clone': _.partialRight(_.clone, function(value) {
	   *     return _.isElement(value) ? value.cloneNode(false) : undefined;
	   *   })
	   * });
	   *
	   * var clone = _.clone(document.body);
	   * clone.childNodes.length;
	   * // => 0
	   */
	  function clone(value, deep, callback, thisArg, stackA, stackB) {
	    var result = value;
	
	    // allows working with "Collections" methods without using their `callback`
	    // argument, `index|key`, for this method's `callback`
	    if (typeof deep == 'function') {
	      thisArg = callback;
	      callback = deep;
	      deep = false;
	    }
	    if (typeof callback == 'function') {
	      callback = typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg, 1);
	      result = callback(result);
	
	      var done = typeof result != 'undefined';
	      if (!done) {
	        result = value;
	      }
	    }
	    // inspect [[Class]]
	    var isObj = isObject(result);
	    if (isObj) {
	      var className = toString.call(result);
	      if (!cloneableClasses[className] || (noNodeClass && isNode(result))) {
	        return result;
	      }
	      var isArr = isArray(result);
	    }
	    // shallow clone
	    if (!isObj || !deep) {
	      return isObj && !done
	        ? (isArr ? slice(result) : assign({}, result))
	        : result;
	    }
	    var ctor = ctorByClass[className];
	    switch (className) {
	      case boolClass:
	      case dateClass:
	        return done ? result : new ctor(+result);
	
	      case numberClass:
	      case stringClass:
	        return done ? result : new ctor(result);
	
	      case regexpClass:
	        return done ? result : ctor(result.source, reFlags.exec(result));
	    }
	    // check for circular references and return corresponding clone
	    stackA || (stackA = []);
	    stackB || (stackB = []);
	
	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == value) {
	        return stackB[length];
	      }
	    }
	    // init cloned object
	    if (!done) {
	      result = isArr ? ctor(result.length) : {};
	
	      // add array properties assigned by `RegExp#exec`
	      if (isArr) {
	        if (hasOwnProperty.call(value, 'index')) {
	          result.index = value.index;
	        }
	        if (hasOwnProperty.call(value, 'input')) {
	          result.input = value.input;
	        }
	      }
	    }
	    // add the source value to the stack of traversed objects
	    // and associate it with its clone
	    stackA.push(value);
	    stackB.push(result);
	
	    // recursively populate clone (susceptible to call stack limits)
	    (isArr ? forEach : forOwn)(done ? result : value, function(objValue, key) {
	      result[key] = clone(objValue, deep, callback, undefined, stackA, stackB);
	    });
	
	    return result;
	  }
	
	  /**
	   * Creates a deep clone of `value`. If a `callback` function is passed, it will
	   * be executed to produce the cloned values. If `callback` returns the value it
	   * was passed, cloning will be handled by the method instead. The `callback` is
	   * bound to `thisArg` and invoked with one argument; (value).
	   *
	   * Note: This function is loosely based on the structured clone algorithm. Functions
	   * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
	   * objects created by constructors other than `Object` are cloned to plain `Object` objects.
	   * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to deep clone.
	   * @param {Function} [callback] The function to customize cloning values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the deep cloned `value`.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * var deep = _.cloneDeep(stooges);
	   * deep[0] === stooges[0];
	   * // => false
	   *
	   * var view = {
	   *   'label': 'docs',
	   *   'node': element
	   * };
	   *
	   * var clone = _.cloneDeep(view, function(value) {
	   *   return _.isElement(value) ? value.cloneNode(true) : value;
	   * });
	   *
	   * clone.node == view.node;
	   * // => false
	   */
	  function cloneDeep(value, callback, thisArg) {
	    return clone(value, true, callback, thisArg);
	  }
	
	  /**
	   * Assigns own enumerable properties of source object(s) to the destination
	   * object for all destination properties that resolve to `undefined`. Once a
	   * property is set, additional defaults of the same property will be ignored.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Objects
	   * @param {Object} object The destination object.
	   * @param {Object} [source1, source2, ...] The source objects.
	   * @param- {Object} [guard] Internally used to allow working with `_.reduce`
	   *  without using its callback's `key` and `object` arguments as sources.
	   * @returns {Object} Returns the destination object.
	   * @example
	   *
	   * var food = { 'name': 'apple' };
	   * _.defaults(food, { 'name': 'banana', 'type': 'fruit' });
	   * // => { 'name': 'apple', 'type': 'fruit' }
	   */
	  var defaults = createIterator(defaultsIteratorOptions);
	
	  /**
	   * Creates a sorted array of all enumerable properties, own and inherited,
	   * of `object` that have function values.
	   *
	   * @static
	   * @memberOf _
	   * @alias methods
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property names that have function values.
	   * @example
	   *
	   * _.functions(_);
	   * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
	   */
	  function functions(object) {
	    var result = [];
	    forIn(object, function(value, key) {
	      if (isFunction(value)) {
	        result.push(key);
	      }
	    });
	    return result.sort();
	  }
	
	  /**
	   * Checks if the specified object `property` exists and is a direct property,
	   * instead of an inherited property.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to check.
	   * @param {String} property The property to check for.
	   * @returns {Boolean} Returns `true` if key is a direct property, else `false`.
	   * @example
	   *
	   * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
	   * // => true
	   */
	  function has(object, property) {
	    return object ? hasOwnProperty.call(object, property) : false;
	  }
	
	  /**
	   * Creates an object composed of the inverted keys and values of the given `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to invert.
	   * @returns {Object} Returns the created inverted object.
	   * @example
	   *
	   *  _.invert({ 'first': 'moe', 'second': 'larry' });
	   * // => { 'moe': 'first', 'larry': 'second' } (order is not guaranteed)
	   */
	  function invert(object) {
	    var index = -1,
	        props = keys(object),
	        length = props.length,
	        result = {};
	
	    while (++index < length) {
	      var key = props[index];
	      result[object[key]] = key;
	    }
	    return result;
	  }
	
	  /**
	   * Checks if `value` is a boolean value.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a boolean value, else `false`.
	   * @example
	   *
	   * _.isBoolean(null);
	   * // => false
	   */
	  function isBoolean(value) {
	    return value === true || value === false || toString.call(value) == boolClass;
	  }
	
	  /**
	   * Checks if `value` is a date.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a date, else `false`.
	   * @example
	   *
	   * _.isDate(new Date);
	   * // => true
	   */
	  function isDate(value) {
	    return value instanceof Date || toString.call(value) == dateClass;
	  }
	
	  /**
	   * Checks if `value` is a DOM element.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a DOM element, else `false`.
	   * @example
	   *
	   * _.isElement(document.body);
	   * // => true
	   */
	  function isElement(value) {
	    return value ? value.nodeType === 1 : false;
	  }
	
	  /**
	   * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
	   * length of `0` and objects with no own enumerable properties are considered
	   * "empty".
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Array|Object|String} value The value to inspect.
	   * @returns {Boolean} Returns `true`, if the `value` is empty, else `false`.
	   * @example
	   *
	   * _.isEmpty([1, 2, 3]);
	   * // => false
	   *
	   * _.isEmpty({});
	   * // => true
	   *
	   * _.isEmpty('');
	   * // => true
	   */
	  function isEmpty(value) {
	    var result = true;
	    if (!value) {
	      return result;
	    }
	    var className = toString.call(value),
	        length = value.length;
	
	    if ((className == arrayClass || className == stringClass ||
	        className == argsClass || (noArgsClass && isArguments(value))) ||
	        (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
	      return !length;
	    }
	    forOwn(value, function() {
	      return (result = false);
	    });
	    return result;
	  }
	
	  /**
	   * Performs a deep comparison between two values to determine if they are
	   * equivalent to each other. If `callback` is passed, it will be executed to
	   * compare values. If `callback` returns `undefined`, comparisons will be handled
	   * by the method instead. The `callback` is bound to `thisArg` and invoked with
	   * two arguments; (a, b).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} a The value to compare.
	   * @param {Mixed} b The other value to compare.
	   * @param {Function} [callback] The function to customize comparing values.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @param- {Object} [stackA=[]] Internally used track traversed `a` objects.
	   * @param- {Object} [stackB=[]] Internally used track traversed `b` objects.
	   * @returns {Boolean} Returns `true`, if the values are equvalent, else `false`.
	   * @example
	   *
	   * var moe = { 'name': 'moe', 'age': 40 };
	   * var copy = { 'name': 'moe', 'age': 40 };
	   *
	   * moe == copy;
	   * // => false
	   *
	   * _.isEqual(moe, copy);
	   * // => true
	   *
	   * var words = ['hello', 'goodbye'];
	   * var otherWords = ['hi', 'goodbye'];
	   *
	   * _.isEqual(words, otherWords, function(a, b) {
	   *   var reGreet = /^(?:hello|hi)$/i,
	   *       aGreet = _.isString(a) && reGreet.test(a),
	   *       bGreet = _.isString(b) && reGreet.test(b);
	   *
	   *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
	   * });
	   * // => true
	   */
	  function isEqual(a, b, callback, thisArg, stackA, stackB) {
	    // used to indicate that when comparing objects, `a` has at least the properties of `b`
	    var whereIndicator = callback === indicatorObject;
	    if (callback && !whereIndicator) {
	      callback = typeof thisArg == 'undefined' ? callback : createCallback(callback, thisArg, 2);
	      var result = callback(a, b);
	      if (typeof result != 'undefined') {
	        return !!result;
	      }
	    }
	    // exit early for identical values
	    if (a === b) {
	      // treat `+0` vs. `-0` as not equal
	      return a !== 0 || (1 / a == 1 / b);
	    }
	    var type = typeof a,
	        otherType = typeof b;
	
	    // exit early for unlike primitive values
	    if (a === a &&
	        (!a || (type != 'function' && type != 'object')) &&
	        (!b || (otherType != 'function' && otherType != 'object'))) {
	      return false;
	    }
	    // exit early for `null` and `undefined`, avoiding ES3's Function#call behavior
	    // http://es5.github.com/#x15.3.4.4
	    if (a == null || b == null) {
	      return a === b;
	    }
	    // compare [[Class]] names
	    var className = toString.call(a),
	        otherClass = toString.call(b);
	
	    if (className == argsClass) {
	      className = objectClass;
	    }
	    if (otherClass == argsClass) {
	      otherClass = objectClass;
	    }
	    if (className != otherClass) {
	      return false;
	    }
	    switch (className) {
	      case boolClass:
	      case dateClass:
	        // coerce dates and booleans to numbers, dates to milliseconds and booleans
	        // to `1` or `0`, treating invalid dates coerced to `NaN` as not equal
	        return +a == +b;
	
	      case numberClass:
	        // treat `NaN` vs. `NaN` as equal
	        return a != +a
	          ? b != +b
	          // but treat `+0` vs. `-0` as not equal
	          : (a == 0 ? (1 / a == 1 / b) : a == +b);
	
	      case regexpClass:
	      case stringClass:
	        // coerce regexes to strings (http://es5.github.com/#x15.10.6.4)
	        // treat string primitives and their corresponding object instances as equal
	        return a == b + '';
	    }
	    var isArr = className == arrayClass;
	    if (!isArr) {
	      // unwrap any `lodash` wrapped values
	      if (a.__wrapped__ || b.__wrapped__) {
	        return isEqual(a.__wrapped__ || a, b.__wrapped__ || b, callback, thisArg, stackA, stackB);
	      }
	      // exit for functions and DOM nodes
	      if (className != objectClass || (noNodeClass && (isNode(a) || isNode(b)))) {
	        return false;
	      }
	      // in older versions of Opera, `arguments` objects have `Array` constructors
	      var ctorA = !argsAreObjects && isArguments(a) ? Object : a.constructor,
	          ctorB = !argsAreObjects && isArguments(b) ? Object : b.constructor;
	
	      // non `Object` object instances with different constructors are not equal
	      if (ctorA != ctorB && !(
	            isFunction(ctorA) && ctorA instanceof ctorA &&
	            isFunction(ctorB) && ctorB instanceof ctorB
	          )) {
	        return false;
	      }
	    }
	    // assume cyclic structures are equal
	    // the algorithm for detecting cyclic structures is adapted from ES 5.1
	    // section 15.12.3, abstract operation `JO` (http://es5.github.com/#x15.12.3)
	    stackA || (stackA = []);
	    stackB || (stackB = []);
	
	    var length = stackA.length;
	    while (length--) {
	      if (stackA[length] == a) {
	        return stackB[length] == b;
	      }
	    }
	    var size = 0;
	    result = true;
	
	    // add `a` and `b` to the stack of traversed objects
	    stackA.push(a);
	    stackB.push(b);
	
	    // recursively compare objects and arrays (susceptible to call stack limits)
	    if (isArr) {
	      length = a.length;
	      size = b.length;
	
	      // compare lengths to determine if a deep comparison is necessary
	      result = size == a.length;
	      if (!result && !whereIndicator) {
	        return result;
	      }
	      // deep compare the contents, ignoring non-numeric properties
	      while (size--) {
	        var index = length,
	            value = b[size];
	
	        if (whereIndicator) {
	          while (index--) {
	            if ((result = isEqual(a[index], value, callback, thisArg, stackA, stackB))) {
	              break;
	            }
	          }
	        } else if (!(result = isEqual(a[size], value, callback, thisArg, stackA, stackB))) {
	          break;
	        }
	      }
	      return result;
	    }
	    // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
	    // which, in this case, is more costly
	    forIn(b, function(value, key, b) {
	      if (hasOwnProperty.call(b, key)) {
	        // count the number of properties.
	        size++;
	        // deep compare each property value.
	        return (result = hasOwnProperty.call(a, key) && isEqual(a[key], value, callback, thisArg, stackA, stackB));
	      }
	    });
	
	    if (result && !whereIndicator) {
	      // ensure both objects have the same number of properties
	      forIn(a, function(value, key, a) {
	        if (hasOwnProperty.call(a, key)) {
	          // `size` will be `-1` if `a` has more properties than `b`
	          return (result = --size > -1);
	        }
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Checks if `value` is, or can be coerced to, a finite number.
	   *
	   * Note: This is not the same as native `isFinite`, which will return true for
	   * booleans and empty strings. See http://es5.github.com/#x15.1.2.5.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is finite, else `false`.
	   * @example
	   *
	   * _.isFinite(-101);
	   * // => true
	   *
	   * _.isFinite('10');
	   * // => true
	   *
	   * _.isFinite(true);
	   * // => false
	   *
	   * _.isFinite('');
	   * // => false
	   *
	   * _.isFinite(Infinity);
	   * // => false
	   */
	  function isFinite(value) {
	    return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
	  }
	
	  /**
	   * Checks if `value` is a function.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a function, else `false`.
	   * @example
	   *
	   * _.isFunction(_);
	   * // => true
	   */
	  function isFunction(value) {
	    return typeof value == 'function';
	  }
	  // fallback for older versions of Chrome and Safari
	  if (isFunction(/x/)) {
	    isFunction = function(value) {
	      return value instanceof Function || toString.call(value) == funcClass;
	    };
	  }
	
	  /**
	   * Checks if `value` is the language type of Object.
	   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is an object, else `false`.
	   * @example
	   *
	   * _.isObject({});
	   * // => true
	   *
	   * _.isObject([1, 2, 3]);
	   * // => true
	   *
	   * _.isObject(1);
	   * // => false
	   */
	  function isObject(value) {
	    // check if the value is the ECMAScript language type of Object
	    // http://es5.github.com/#x8
	    // and avoid a V8 bug
	    // http://code.google.com/p/v8/issues/detail?id=2291
	    return value ? objectTypes[typeof value] : false;
	  }
	
	  /**
	   * Checks if `value` is `NaN`.
	   *
	   * Note: This is not the same as native `isNaN`, which will return `true` for
	   * `undefined` and other values. See http://es5.github.com/#x15.1.2.4.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is `NaN`, else `false`.
	   * @example
	   *
	   * _.isNaN(NaN);
	   * // => true
	   *
	   * _.isNaN(new Number(NaN));
	   * // => true
	   *
	   * isNaN(undefined);
	   * // => true
	   *
	   * _.isNaN(undefined);
	   * // => false
	   */
	  function isNaN(value) {
	    // `NaN` as a primitive is the only value that is not equal to itself
	    // (perform the [[Class]] check first to avoid errors with some host objects in IE)
	    return isNumber(value) && value != +value
	  }
	
	  /**
	   * Checks if `value` is `null`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is `null`, else `false`.
	   * @example
	   *
	   * _.isNull(null);
	   * // => true
	   *
	   * _.isNull(undefined);
	   * // => false
	   */
	  function isNull(value) {
	    return value === null;
	  }
	
	  /**
	   * Checks if `value` is a number.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a number, else `false`.
	   * @example
	   *
	   * _.isNumber(8.4 * 5);
	   * // => true
	   */
	  function isNumber(value) {
	    return typeof value == 'number' || toString.call(value) == numberClass;
	  }
	
	  /**
	   * Checks if a given `value` is an object created by the `Object` constructor.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if `value` is a plain object, else `false`.
	   * @example
	   *
	   * function Stooge(name, age) {
	   *   this.name = name;
	   *   this.age = age;
	   * }
	   *
	   * _.isPlainObject(new Stooge('moe', 40));
	   * // => false
	   *
	   * _.isPlainObject([1, 2, 3]);
	   * // => false
	   *
	   * _.isPlainObject({ 'name': 'moe', 'age': 40 });
	   * // => true
	   */
	  var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
	    if (!(value && typeof value == 'object')) {
	      return false;
	    }
	    var valueOf = value.valueOf,
	        objProto = typeof valueOf == 'function' && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);
	
	    return objProto
	      ? value == objProto || (getPrototypeOf(value) == objProto && !isArguments(value))
	      : shimIsPlainObject(value);
	  };
	
	  /**
	   * Checks if `value` is a regular expression.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a regular expression, else `false`.
	   * @example
	   *
	   * _.isRegExp(/moe/);
	   * // => true
	   */
	  function isRegExp(value) {
	    return value instanceof RegExp || toString.call(value) == regexpClass;
	  }
	
	  /**
	   * Checks if `value` is a string.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is a string, else `false`.
	   * @example
	   *
	   * _.isString('moe');
	   * // => true
	   */
	  function isString(value) {
	    return typeof value == 'string' || toString.call(value) == stringClass;
	  }
	
	  /**
	   * Checks if `value` is `undefined`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Mixed} value The value to check.
	   * @returns {Boolean} Returns `true`, if the `value` is `undefined`, else `false`.
	   * @example
	   *
	   * _.isUndefined(void 0);
	   * // => true
	   */
	  function isUndefined(value) {
	    return typeof value == 'undefined';
	  }
	
	  /**
	   * Recursively merges own enumerable properties of the source object(s), that
	   * don't resolve to `undefined`, into the destination object. Subsequent sources
	   * will overwrite propery assignments of previous sources. If a `callback` function
	   * is passed, it will be executed to produce the merged values of the destination
	   * and source properties. If `callback` returns `undefined`, merging will be
	   * handled by the method instead. The `callback` is bound to `thisArg` and
	   * invoked with two arguments; (objectValue, sourceValue).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The destination object.
	   * @param {Object} [source1, source2, ...] The source objects.
	   * @param {Function} [callback] The function to customize merging properties.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @param- {Object} [deepIndicator] Internally used to indicate that `stackA`
	   *  and `stackB` are arrays of traversed objects instead of source objects.
	   * @param- {Array} [stackA=[]] Internally used to track traversed source objects.
	   * @param- {Array} [stackB=[]] Internally used to associate values with their
	   *  source counterparts.
	   * @returns {Object} Returns the destination object.
	   * @example
	   *
	   * var names = {
	   *   'stooges': [
	   *     { 'name': 'moe' },
	   *     { 'name': 'larry' }
	   *   ]
	   * };
	   *
	   * var ages = {
	   *   'stooges': [
	   *     { 'age': 40 },
	   *     { 'age': 50 }
	   *   ]
	   * };
	   *
	   * _.merge(names, ages);
	   * // => { 'stooges': [{ 'name': 'moe', 'age': 40 }, { 'name': 'larry', 'age': 50 }] }
	   *
	   * var food = {
	   *   'fruits': ['apple'],
	   *   'vegetables': ['beet']
	   * };
	   *
	   * var otherFood = {
	   *   'fruits': ['banana'],
	   *   'vegetables': ['carrot']
	   * };
	   *
	   * _.merge(food, otherFood, function(a, b) {
	   *   return _.isArray(a) ? a.concat(b) : undefined;
	   * });
	   * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
	   */
	  function merge(object, source, deepIndicator) {
	    var args = arguments,
	        index = 0,
	        length = 2;
	
	    if (!isObject(object)) {
	      return object;
	    }
	    if (deepIndicator === indicatorObject) {
	      var callback = args[3],
	          stackA = args[4],
	          stackB = args[5];
	    } else {
	      stackA = [];
	      stackB = [];
	
	      // allows working with `_.reduce` and `_.reduceRight` without
	      // using their `callback` arguments, `index|key` and `collection`
	      if (typeof deepIndicator != 'number') {
	        length = args.length;
	      }
	      if (length > 3 && typeof args[length - 2] == 'function') {
	        callback = createCallback(args[--length - 1], args[length--], 2);
	      } else if (length > 2 && typeof args[length - 1] == 'function') {
	        callback = args[--length];
	      }
	    }
	    while (++index < length) {
	      (isArray(args[index]) ? forEach : forOwn)(args[index], function(source, key) {
	        var found,
	            isArr,
	            result = source,
	            value = object[key];
	
	        if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
	          // avoid merging previously merged cyclic sources
	          var stackLength = stackA.length;
	          while (stackLength--) {
	            if ((found = stackA[stackLength] == source)) {
	              value = stackB[stackLength];
	              break;
	            }
	          }
	          if (!found) {
	            value = isArr
	              ? (isArray(value) ? value : [])
	              : (isPlainObject(value) ? value : {});
	
	            if (callback) {
	              result = callback(value, source);
	              if (typeof result != 'undefined') {
	                value = result;
	              }
	            }
	            // add `source` and associated `value` to the stack of traversed objects
	            stackA.push(source);
	            stackB.push(value);
	
	            // recursively merge objects and arrays (susceptible to call stack limits)
	            if (!callback) {
	              value = merge(value, source, indicatorObject, callback, stackA, stackB);
	            }
	          }
	        }
	        else {
	          if (callback) {
	            result = callback(value, source);
	            if (typeof result == 'undefined') {
	              result = source;
	            }
	          }
	          if (typeof result != 'undefined') {
	            value = result;
	          }
	        }
	        object[key] = value;
	      });
	    }
	    return object;
	  }
	
	  /**
	   * Creates a shallow clone of `object` excluding the specified properties.
	   * Property names may be specified as individual arguments or as arrays of
	   * property names. If a `callback` function is passed, it will be executed
	   * for each property in the `object`, omitting the properties `callback`
	   * returns truthy for. The `callback` is bound to `thisArg` and invoked
	   * with three arguments; (value, key, object).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The source object.
	   * @param {Function|String} callback|[prop1, prop2, ...] The properties to omit
	   *  or the function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns an object without the omitted properties.
	   * @example
	   *
	   * _.omit({ 'name': 'moe', 'age': 40 }, 'age');
	   * // => { 'name': 'moe' }
	   *
	   * _.omit({ 'name': 'moe', 'age': 40 }, function(value) {
	   *   return typeof value == 'number';
	   * });
	   * // => { 'name': 'moe' }
	   */
	  function omit(object, callback, thisArg) {
	    var isFunc = typeof callback == 'function',
	        result = {};
	
	    if (isFunc) {
	      callback = createCallback(callback, thisArg);
	    } else {
	      var props = concat.apply(arrayRef, arguments);
	    }
	    forIn(object, function(value, key, object) {
	      if (isFunc
	            ? !callback(value, key, object)
	            : indexOf(props, key, 1) < 0
	          ) {
	        result[key] = value;
	      }
	    });
	    return result;
	  }
	
	  /**
	   * Creates a two dimensional array of the given object's key-value pairs,
	   * i.e. `[[key1, value1], [key2, value2]]`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns new array of key-value pairs.
	   * @example
	   *
	   * _.pairs({ 'moe': 30, 'larry': 40 });
	   * // => [['moe', 30], ['larry', 40]] (order is not guaranteed)
	   */
	  function pairs(object) {
	    var index = -1,
	        props = keys(object),
	        length = props.length,
	        result = Array(length);
	
	    while (++index < length) {
	      var key = props[index];
	      result[index] = [key, object[key]];
	    }
	    return result;
	  }
	
	  /**
	   * Creates a shallow clone of `object` composed of the specified properties.
	   * Property names may be specified as individual arguments or as arrays of property
	   * names. If `callback` is passed, it will be executed for each property in the
	   * `object`, picking the properties `callback` returns truthy for. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, key, object).
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The source object.
	   * @param {Array|Function|String} callback|[prop1, prop2, ...] The function called
	   *  per iteration or properties to pick, either as individual arguments or arrays.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns an object composed of the picked properties.
	   * @example
	   *
	   * _.pick({ 'name': 'moe', '_userid': 'moe1' }, 'name');
	   * // => { 'name': 'moe' }
	   *
	   * _.pick({ 'name': 'moe', '_userid': 'moe1' }, function(value, key) {
	   *   return key.charAt(0) != '_';
	   * });
	   * // => { 'name': 'moe' }
	   */
	  function pick(object, callback, thisArg) {
	    var result = {};
	    if (typeof callback != 'function') {
	      var index = 0,
	          props = concat.apply(arrayRef, arguments),
	          length = isObject(object) ? props.length : 0;
	
	      while (++index < length) {
	        var key = props[index];
	        if (key in object) {
	          result[key] = object[key];
	        }
	      }
	    } else {
	      callback = createCallback(callback, thisArg);
	      forIn(object, function(value, key, object) {
	        if (callback(value, key, object)) {
	          result[key] = value;
	        }
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Creates an array composed of the own enumerable property values of `object`.
	   *
	   * @static
	   * @memberOf _
	   * @category Objects
	   * @param {Object} object The object to inspect.
	   * @returns {Array} Returns a new array of property values.
	   * @example
	   *
	   * _.values({ 'one': 1, 'two': 2, 'three': 3 });
	   * // => [1, 2, 3]
	   */
	  function values(object) {
	    var index = -1,
	        props = keys(object),
	        length = props.length,
	        result = Array(length);
	
	    while (++index < length) {
	      result[index] = object[props[index]];
	    }
	    return result;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates an array of elements from the specified indexes, or keys, of the
	   * `collection`. Indexes may be specified as individual arguments or as arrays
	   * of indexes.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Array|Number|String} [index1, index2, ...] The indexes of
	   *  `collection` to retrieve, either as individual arguments or arrays.
	   * @returns {Array} Returns a new array of elements corresponding to the
	   *  provided indexes.
	   * @example
	   *
	   * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
	   * // => ['a', 'c', 'e']
	   *
	   * _.at(['moe', 'larry', 'curly'], 0, 2);
	   * // => ['moe', 'curly']
	   */
	  function at(collection) {
	    var index = -1,
	        props = concat.apply(arrayRef, slice(arguments, 1)),
	        length = props.length,
	        result = Array(length);
	
	    if (noCharByIndex && isString(collection)) {
	      collection = collection.split('');
	    }
	    while(++index < length) {
	      result[index] = collection[props[index]];
	    }
	    return result;
	  }
	
	  /**
	   * Checks if a given `target` element is present in a `collection` using strict
	   * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	   * as the offset from the end of the collection.
	   *
	   * @static
	   * @memberOf _
	   * @alias include
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Mixed} target The value to check for.
	   * @param {Number} [fromIndex=0] The index to search from.
	   * @returns {Boolean} Returns `true` if the `target` element is found, else `false`.
	   * @example
	   *
	   * _.contains([1, 2, 3], 1);
	   * // => true
	   *
	   * _.contains([1, 2, 3], 1, 2);
	   * // => false
	   *
	   * _.contains({ 'name': 'moe', 'age': 40 }, 'moe');
	   * // => true
	   *
	   * _.contains('curly', 'ur');
	   * // => true
	   */
	  function contains(collection, target, fromIndex) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = false;
	
	    fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
	    if (typeof length == 'number') {
	      result = (isString(collection)
	        ? collection.indexOf(target, fromIndex)
	        : indexOf(collection, target, fromIndex)
	      ) > -1;
	    } else {
	      each(collection, function(value) {
	        if (++index >= fromIndex) {
	          return !(result = value === target);
	        }
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Creates an object composed of keys returned from running each element of the
	   * `collection` through the given `callback`. The corresponding value of each key
	   * is the number of times the key was returned by the `callback`. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns the composed aggregate object.
	   * @example
	   *
	   * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
	   * // => { '4': 1, '6': 2 }
	   *
	   * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	   * // => { '4': 1, '6': 2 }
	   *
	   * _.countBy(['one', 'two', 'three'], 'length');
	   * // => { '3': 2, '5': 1 }
	   */
	  function countBy(collection, callback, thisArg) {
	    var result = {};
	    callback = createCallback(callback, thisArg);
	
	    forEach(collection, function(value, key, collection) {
	      key = callback(value, key, collection) + '';
	      (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
	    });
	    return result;
	  }
	
	  /**
	   * Checks if the `callback` returns a truthy value for **all** elements of a
	   * `collection`. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias all
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Boolean} Returns `true` if all elements pass the callback check,
	   *  else `false`.
	   * @example
	   *
	   * _.every([true, 1, null, 'yes'], Boolean);
	   * // => false
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.every(stooges, 'age');
	   * // => true
	   *
	   * // using "_.where" callback shorthand
	   * _.every(stooges, { 'age': 50 });
	   * // => false
	   */
	  function every(collection, callback, thisArg) {
	    var result = true;
	    callback = createCallback(callback, thisArg);
	
	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;
	
	      while (++index < length) {
	        if (!(result = !!callback(collection[index], index, collection))) {
	          break;
	        }
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        return (result = !!callback(value, index, collection));
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Examines each element in a `collection`, returning an array of all elements
	   * the `callback` returns truthy for. The `callback` is bound to `thisArg` and
	   * invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias select
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of elements that passed the callback check.
	   * @example
	   *
	   * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	   * // => [2, 4, 6]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.filter(food, 'organic');
	   * // => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]
	   *
	   * // using "_.where" callback shorthand
	   * _.filter(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]
	   */
	  function filter(collection, callback, thisArg) {
	    var result = [];
	    callback = createCallback(callback, thisArg);
	
	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;
	
	      while (++index < length) {
	        var value = collection[index];
	        if (callback(value, index, collection)) {
	          result.push(value);
	        }
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        if (callback(value, index, collection)) {
	          result.push(value);
	        }
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Examines each element in a `collection`, returning the first that the `callback`
	   * returns truthy for. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias detect
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the element that passed the callback check,
	   *  else `undefined`.
	   * @example
	   *
	   * var even = _.find([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	   * // => 2
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'banana', 'organic': true,  'type': 'fruit' },
	   *   { 'name': 'beet',   'organic': false, 'type': 'vegetable' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * var veggie = _.find(food, { 'type': 'vegetable' });
	   * // => { 'name': 'beet', 'organic': false, 'type': 'vegetable' }
	   *
	   * // using "_.pluck" callback shorthand
	   * var healthy = _.find(food, 'organic');
	   * // => { 'name': 'banana', 'organic': true, 'type': 'fruit' }
	   */
	  function find(collection, callback, thisArg) {
	    var result;
	    callback = createCallback(callback, thisArg);
	
	    forEach(collection, function(value, index, collection) {
	      if (callback(value, index, collection)) {
	        result = value;
	        return false;
	      }
	    });
	    return result;
	  }
	
	  /**
	   * Iterates over a `collection`, executing the `callback` for each element in
	   * the `collection`. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection). Callbacks may exit iteration early
	   * by explicitly returning `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias each
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array|Object|String} Returns `collection`.
	   * @example
	   *
	   * _([1, 2, 3]).forEach(alert).join(',');
	   * // => alerts each number and returns '1,2,3'
	   *
	   * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, alert);
	   * // => alerts each number value (order is not guaranteed)
	   */
	  function forEach(collection, callback, thisArg) {
	    if (callback && typeof thisArg == 'undefined' && isArray(collection)) {
	      var index = -1,
	          length = collection.length;
	
	      while (++index < length) {
	        if (callback(collection[index], index, collection) === false) {
	          break;
	        }
	      }
	    } else {
	      each(collection, callback, thisArg);
	    }
	    return collection;
	  }
	
	  /**
	   * Creates an object composed of keys returned from running each element of the
	   * `collection` through the `callback`. The corresponding value of each key is
	   * an array of elements passed to `callback` that returned the key. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Object} Returns the composed aggregate object.
	   * @example
	   *
	   * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
	   * // => { '4': [4.2], '6': [6.1, 6.4] }
	   *
	   * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
	   * // => { '4': [4.2], '6': [6.1, 6.4] }
	   *
	   * // using "_.pluck" callback shorthand
	   * _.groupBy(['one', 'two', 'three'], 'length');
	   * // => { '3': ['one', 'two'], '5': ['three'] }
	   */
	  function groupBy(collection, callback, thisArg) {
	    var result = {};
	    callback = createCallback(callback, thisArg);
	
	    forEach(collection, function(value, key, collection) {
	      key = callback(value, key, collection) + '';
	      (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
	    });
	    return result;
	  }
	
	  /**
	   * Invokes the method named by `methodName` on each element in the `collection`,
	   * returning an array of the results of each invoked method. Additional arguments
	   * will be passed to each invoked method. If `methodName` is a function, it will
	   * be invoked for, and `this` bound to, each element in the `collection`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|String} methodName The name of the method to invoke or
	   *  the function invoked per iteration.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the method with.
	   * @returns {Array} Returns a new array of the results of each invoked method.
	   * @example
	   *
	   * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	   * // => [[1, 5, 7], [1, 2, 3]]
	   *
	   * _.invoke([123, 456], String.prototype.split, '');
	   * // => [['1', '2', '3'], ['4', '5', '6']]
	   */
	  function invoke(collection, methodName) {
	    var args = slice(arguments, 2),
	        index = -1,
	        isFunc = typeof methodName == 'function',
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);
	
	    forEach(collection, function(value) {
	      result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
	    });
	    return result;
	  }
	
	  /**
	   * Creates an array of values by running each element in the `collection`
	   * through the `callback`. The `callback` is bound to `thisArg` and invoked with
	   * three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias collect
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of the results of each `callback` execution.
	   * @example
	   *
	   * _.map([1, 2, 3], function(num) { return num * 3; });
	   * // => [3, 6, 9]
	   *
	   * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
	   * // => [3, 6, 9] (order is not guaranteed)
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.map(stooges, 'name');
	   * // => ['moe', 'larry']
	   */
	  function map(collection, callback, thisArg) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);
	
	    callback = createCallback(callback, thisArg);
	    if (isArray(collection)) {
	      while (++index < length) {
	        result[index] = callback(collection[index], index, collection);
	      }
	    } else {
	      each(collection, function(value, key, collection) {
	        result[++index] = callback(value, key, collection);
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Retrieves the maximum value of an `array`. If `callback` is passed,
	   * it will be executed for each value in the `array` to generate the
	   * criterion by which the value is ranked. The `callback` is bound to
	   * `thisArg` and invoked with three arguments; (value, index, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the maximum value.
	   * @example
	   *
	   * _.max([4, 2, 8, 6]);
	   * // => 8
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.max(stooges, function(stooge) { return stooge.age; });
	   * // => { 'name': 'larry', 'age': 50 };
	   *
	   * // using "_.pluck" callback shorthand
	   * _.max(stooges, 'age');
	   * // => { 'name': 'larry', 'age': 50 };
	   */
	  function max(collection, callback, thisArg) {
	    var computed = -Infinity,
	        result = computed;
	
	    if (!callback && isArray(collection)) {
	      var index = -1,
	          length = collection.length;
	
	      while (++index < length) {
	        var value = collection[index];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      callback = !callback && isString(collection)
	        ? charAtCallback
	        : createCallback(callback, thisArg);
	
	      each(collection, function(value, index, collection) {
	        var current = callback(value, index, collection);
	        if (current > computed) {
	          computed = current;
	          result = value;
	        }
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Retrieves the minimum value of an `array`. If `callback` is passed,
	   * it will be executed for each value in the `array` to generate the
	   * criterion by which the value is ranked. The `callback` is bound to `thisArg`
	   * and invoked with three arguments; (value, index, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the minimum value.
	   * @example
	   *
	   * _.min([4, 2, 8, 6]);
	   * // => 2
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.min(stooges, function(stooge) { return stooge.age; });
	   * // => { 'name': 'moe', 'age': 40 };
	   *
	   * // using "_.pluck" callback shorthand
	   * _.min(stooges, 'age');
	   * // => { 'name': 'moe', 'age': 40 };
	   */
	  function min(collection, callback, thisArg) {
	    var computed = Infinity,
	        result = computed;
	
	    if (!callback && isArray(collection)) {
	      var index = -1,
	          length = collection.length;
	
	      while (++index < length) {
	        var value = collection[index];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      callback = !callback && isString(collection)
	        ? charAtCallback
	        : createCallback(callback, thisArg);
	
	      each(collection, function(value, index, collection) {
	        var current = callback(value, index, collection);
	        if (current < computed) {
	          computed = current;
	          result = value;
	        }
	      });
	    }
	    return result;
	  }
	
	  /**
	   * Retrieves the value of a specified property from all elements in the `collection`.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {String} property The property to pluck.
	   * @returns {Array} Returns a new array of property values.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.pluck(stooges, 'name');
	   * // => ['moe', 'larry']
	   */
	  var pluck = map;
	
	  /**
	   * Reduces a `collection` to a value that is the accumulated result of running
	   * each element in the `collection` through the `callback`, where each successive
	   * `callback` execution consumes the return value of the previous execution.
	   * If `accumulator` is not passed, the first element of the `collection` will be
	   * used as the initial `accumulator` value. The `callback` is bound to `thisArg`
	   * and invoked with four arguments; (accumulator, value, index|key, collection).
	   *
	   * @static
	   * @memberOf _
	   * @alias foldl, inject
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [accumulator] Initial value of the accumulator.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the accumulated value.
	   * @example
	   *
	   * var sum = _.reduce([1, 2, 3], function(sum, num) {
	   *   return sum + num;
	   * });
	   * // => 6
	   *
	   * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
	   *   result[key] = num * 3;
	   *   return result;
	   * }, {});
	   * // => { 'a': 3, 'b': 6, 'c': 9 }
	   */
	  function reduce(collection, callback, accumulator, thisArg) {
	    var noaccum = arguments.length < 3;
	    callback = createCallback(callback, thisArg, 4);
	
	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;
	
	      if (noaccum) {
	        accumulator = collection[++index];
	      }
	      while (++index < length) {
	        accumulator = callback(accumulator, collection[index], index, collection);
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        accumulator = noaccum
	          ? (noaccum = false, value)
	          : callback(accumulator, value, index, collection)
	      });
	    }
	    return accumulator;
	  }
	
	  /**
	   * This method is similar to `_.reduce`, except that it iterates over a
	   * `collection` from right to left.
	   *
	   * @static
	   * @memberOf _
	   * @alias foldr
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function} [callback=identity] The function called per iteration.
	   * @param {Mixed} [accumulator] Initial value of the accumulator.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the accumulated value.
	   * @example
	   *
	   * var list = [[0, 1], [2, 3], [4, 5]];
	   * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	   * // => [4, 5, 2, 3, 0, 1]
	   */
	  function reduceRight(collection, callback, accumulator, thisArg) {
	    var iterable = collection,
	        length = collection ? collection.length : 0,
	        noaccum = arguments.length < 3;
	
	    if (typeof length != 'number') {
	      var props = keys(collection);
	      length = props.length;
	    } else if (noCharByIndex && isString(collection)) {
	      iterable = collection.split('');
	    }
	    callback = createCallback(callback, thisArg, 4);
	    forEach(collection, function(value, index, collection) {
	      index = props ? props[--length] : --length;
	      accumulator = noaccum
	        ? (noaccum = false, iterable[index])
	        : callback(accumulator, iterable[index], index, collection);
	    });
	    return accumulator;
	  }
	
	  /**
	   * The opposite of `_.filter`, this method returns the elements of a
	   * `collection` that `callback` does **not** return truthy for.
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of elements that did **not** pass the
	   *  callback check.
	   * @example
	   *
	   * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
	   * // => [1, 3, 5]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.reject(food, 'organic');
	   * // => [{ 'name': 'apple', 'organic': false, 'type': 'fruit' }]
	   *
	   * // using "_.where" callback shorthand
	   * _.reject(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'carrot', 'organic': true, 'type': 'vegetable' }]
	   */
	  function reject(collection, callback, thisArg) {
	    callback = createCallback(callback, thisArg);
	    return filter(collection, function(value, index, collection) {
	      return !callback(value, index, collection);
	    });
	  }
	
	  /**
	   * Creates an array of shuffled `array` values, using a version of the
	   * Fisher-Yates shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to shuffle.
	   * @returns {Array} Returns a new shuffled collection.
	   * @example
	   *
	   * _.shuffle([1, 2, 3, 4, 5, 6]);
	   * // => [4, 1, 6, 3, 5, 2]
	   */
	  function shuffle(collection) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);
	
	    forEach(collection, function(value) {
	      var rand = floor(nativeRandom() * (++index + 1));
	      result[index] = result[rand];
	      result[rand] = value;
	    });
	    return result;
	  }
	
	  /**
	   * Gets the size of the `collection` by returning `collection.length` for arrays
	   * and array-like objects or the number of own enumerable properties for objects.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to inspect.
	   * @returns {Number} Returns `collection.length` or number of own enumerable properties.
	   * @example
	   *
	   * _.size([1, 2]);
	   * // => 2
	   *
	   * _.size({ 'one': 1, 'two': 2, 'three': 3 });
	   * // => 3
	   *
	   * _.size('curly');
	   * // => 5
	   */
	  function size(collection) {
	    var length = collection ? collection.length : 0;
	    return typeof length == 'number' ? length : keys(collection).length;
	  }
	
	  /**
	   * Checks if the `callback` returns a truthy value for **any** element of a
	   * `collection`. The function returns as soon as it finds passing value, and
	   * does not iterate over the entire `collection`. The `callback` is bound to
	   * `thisArg` and invoked with three arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias any
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Boolean} Returns `true` if any element passes the callback check,
	   *  else `false`.
	   * @example
	   *
	   * _.some([null, 0, 'yes', false], Boolean);
	   * // => true
	   *
	   * var food = [
	   *   { 'name': 'apple',  'organic': false, 'type': 'fruit' },
	   *   { 'name': 'carrot', 'organic': true,  'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.some(food, 'organic');
	   * // => true
	   *
	   * // using "_.where" callback shorthand
	   * _.some(food, { 'type': 'meat' });
	   * // => false
	   */
	  function some(collection, callback, thisArg) {
	    var result;
	    callback = createCallback(callback, thisArg);
	
	    if (isArray(collection)) {
	      var index = -1,
	          length = collection.length;
	
	      while (++index < length) {
	        if ((result = callback(collection[index], index, collection))) {
	          break;
	        }
	      }
	    } else {
	      each(collection, function(value, index, collection) {
	        return !(result = callback(value, index, collection));
	      });
	    }
	    return !!result;
	  }
	
	  /**
	   * Creates an array of elements, sorted in ascending order by the results of
	   * running each element in the `collection` through the `callback`. This method
	   * performs a stable sort, that is, it will preserve the original sort order of
	   * equal elements. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index|key, collection).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of sorted elements.
	   * @example
	   *
	   * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
	   * // => [3, 1, 2]
	   *
	   * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
	   * // => [3, 1, 2]
	   *
	   * // using "_.pluck" callback shorthand
	   * _.sortBy(['banana', 'strawberry', 'apple'], 'length');
	   * // => ['apple', 'banana', 'strawberry']
	   */
	  function sortBy(collection, callback, thisArg) {
	    var index = -1,
	        length = collection ? collection.length : 0,
	        result = Array(typeof length == 'number' ? length : 0);
	
	    callback = createCallback(callback, thisArg);
	    forEach(collection, function(value, key, collection) {
	      result[++index] = {
	        'criteria': callback(value, key, collection),
	        'index': index,
	        'value': value
	      };
	    });
	
	    length = result.length;
	    result.sort(compareAscending);
	    while (length--) {
	      result[length] = result[length].value;
	    }
	    return result;
	  }
	
	  /**
	   * Converts the `collection` to an array.
	   *
	   * @static
	   * @memberOf _
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to convert.
	   * @returns {Array} Returns the new converted array.
	   * @example
	   *
	   * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
	   * // => [2, 3, 4]
	   */
	  function toArray(collection) {
	    if (collection && typeof collection.length == 'number') {
	      return noCharByIndex && isString(collection)
	        ? collection.split('')
	        : slice(collection);
	    }
	    return values(collection);
	  }
	
	  /**
	   * Examines each element in a `collection`, returning an array of all elements
	   * that have the given `properties`. When checking `properties`, this method
	   * performs a deep comparison between values to determine if they are equivalent
	   * to each other.
	   *
	   * @static
	   * @memberOf _
	   * @type Function
	   * @category Collections
	   * @param {Array|Object|String} collection The collection to iterate over.
	   * @param {Object} properties The object of property values to filter by.
	   * @returns {Array} Returns a new array of elements that have the given `properties`.
	   * @example
	   *
	   * var stooges = [
	   *   { 'name': 'moe', 'age': 40 },
	   *   { 'name': 'larry', 'age': 50 }
	   * ];
	   *
	   * _.where(stooges, { 'age': 40 });
	   * // => [{ 'name': 'moe', 'age': 40 }]
	   */
	  var where = filter;
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates an array with all falsey values of `array` removed. The values
	   * `false`, `null`, `0`, `""`, `undefined` and `NaN` are all falsey.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to compact.
	   * @returns {Array} Returns a new filtered array.
	   * @example
	   *
	   * _.compact([0, 1, false, 2, '', 3]);
	   * // => [1, 2, 3]
	   */
	  function compact(array) {
	    var index = -1,
	        length = array ? array.length : 0,
	        result = [];
	
	    while (++index < length) {
	      var value = array[index];
	      if (value) {
	        result.push(value);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Creates an array of `array` elements not present in the other arrays
	   * using strict equality for comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to process.
	   * @param {Array} [array1, array2, ...] Arrays to check.
	   * @returns {Array} Returns a new array of `array` elements not present in the
	   *  other arrays.
	   * @example
	   *
	   * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
	   * // => [1, 3, 4]
	   */
	  function difference(array) {
	    var index = -1,
	        length = array ? array.length : 0,
	        flattened = concat.apply(arrayRef, arguments),
	        contains = cachedContains(flattened, length),
	        result = [];
	
	    while (++index < length) {
	      var value = array[index];
	      if (!contains(value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Gets the first element of the `array`. If a number `n` is passed, the first
	   * `n` elements of the `array` are returned. If a `callback` function is passed,
	   * the first elements the `callback` returns truthy for are returned. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias head, take
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n] The function called
	   *  per element or the number of elements to return. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the first element(s) of `array`.
	   * @example
	   *
	   * _.first([1, 2, 3]);
	   * // => 1
	   *
	   * _.first([1, 2, 3], 2);
	   * // => [1, 2]
	   *
	   * _.first([1, 2, 3], function(num) {
	   *   return num < 3;
	   * });
	   * // => [1, 2]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'organic': true },
	   *   { 'name': 'beet',   'organic': false },
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.first(food, 'organic');
	   * // => [{ 'name': 'banana', 'organic': true }]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'type': 'fruit' },
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.first(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'apple', 'type': 'fruit' }, { 'name': 'banana', 'type': 'fruit' }]
	   */
	  function first(array, callback, thisArg) {
	    if (array) {
	      var n = 0,
	          length = array.length;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = -1;
	        callback = createCallback(callback, thisArg);
	        while (++index < length && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array[0];
	        }
	      }
	      return slice(array, 0, nativeMin(nativeMax(0, n), length));
	    }
	  }
	
	  /**
	   * Flattens a nested array (the nesting can be to any depth). If `shallow` is
	   * truthy, `array` will only be flattened a single level.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to compact.
	   * @param {Boolean} shallow A flag to indicate only flattening a single level.
	   * @returns {Array} Returns a new flattened array.
	   * @example
	   *
	   * _.flatten([1, [2], [3, [[4]]]]);
	   * // => [1, 2, 3, 4];
	   *
	   * _.flatten([1, [2], [3, [[4]]]], true);
	   * // => [1, 2, 3, [[4]]];
	   */
	  function flatten(array, shallow) {
	    var index = -1,
	        length = array ? array.length : 0,
	        result = [];
	
	    while (++index < length) {
	      var value = array[index];
	
	      // recursively flatten arrays (susceptible to call stack limits)
	      if (isArray(value)) {
	        push.apply(result, shallow ? value : flatten(value));
	      } else {
	        result.push(value);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Gets the index at which the first occurrence of `value` is found using
	   * strict equality for comparisons, i.e. `===`. If the `array` is already
	   * sorted, passing `true` for `fromIndex` will run a faster binary search.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to search.
	   * @param {Mixed} value The value to search for.
	   * @param {Boolean|Number} [fromIndex=0] The index to search from or `true` to
	   *  perform a binary search on a sorted `array`.
	   * @returns {Number} Returns the index of the matched value or `-1`.
	   * @example
	   *
	   * _.indexOf([1, 2, 3, 1, 2, 3], 2);
	   * // => 1
	   *
	   * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
	   * // => 4
	   *
	   * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
	   * // => 2
	   */
	  function indexOf(array, value, fromIndex) {
	    var index = -1,
	        length = array ? array.length : 0;
	
	    if (typeof fromIndex == 'number') {
	      index = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0) - 1;
	    } else if (fromIndex) {
	      index = sortedIndex(array, value);
	      return array[index] === value ? index : -1;
	    }
	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * Gets all but the last element of `array`. If a number `n` is passed, the
	   * last `n` elements are excluded from the result. If a `callback` function
	   * is passed, the last elements the `callback` returns truthy for are excluded
	   * from the result. The `callback` is bound to `thisArg` and invoked with three
	   * arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n=1] The function called
	   *  per element or the number of elements to exclude. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a slice of `array`.
	   * @example
	   *
	   * _.initial([1, 2, 3]);
	   * // => [1, 2]
	   *
	   * _.initial([1, 2, 3], 2);
	   * // => [1]
	   *
	   * _.initial([1, 2, 3], function(num) {
	   *   return num > 1;
	   * });
	   * // => [1]
	   *
	   * var food = [
	   *   { 'name': 'beet',   'organic': false },
	   *   { 'name': 'carrot', 'organic': true }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.initial(food, 'organic');
	   * // => [{ 'name': 'beet',   'organic': false }]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' },
	   *   { 'name': 'carrot', 'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.initial(food, { 'type': 'vegetable' });
	   * // => [{ 'name': 'banana', 'type': 'fruit' }]
	   */
	  function initial(array, callback, thisArg) {
	    if (!array) {
	      return [];
	    }
	    var n = 0,
	        length = array.length;
	
	    if (typeof callback != 'number' && callback != null) {
	      var index = length;
	      callback = createCallback(callback, thisArg);
	      while (index-- && callback(array[index], index, array)) {
	        n++;
	      }
	    } else {
	      n = (callback == null || thisArg) ? 1 : callback || n;
	    }
	    return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
	  }
	
	  /**
	   * Computes the intersection of all the passed-in arrays using strict equality
	   * for comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} [array1, array2, ...] Arrays to process.
	   * @returns {Array} Returns a new array of unique elements that are present
	   *  in **all** of the arrays.
	   * @example
	   *
	   * _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
	   * // => [1, 2]
	   */
	  function intersection(array) {
	    var args = arguments,
	        argsLength = args.length,
	        cache = { '0': {} },
	        index = -1,
	        length = array ? array.length : 0,
	        isLarge = length >= 100,
	        result = [],
	        seen = result;
	
	    outer:
	    while (++index < length) {
	      var value = array[index];
	      if (isLarge) {
	        var key = value + '';
	        var inited = hasOwnProperty.call(cache[0], key)
	          ? !(seen = cache[0][key])
	          : (seen = cache[0][key] = []);
	      }
	      if (inited || indexOf(seen, value) < 0) {
	        if (isLarge) {
	          seen.push(value);
	        }
	        var argsIndex = argsLength;
	        while (--argsIndex) {
	          if (!(cache[argsIndex] || (cache[argsIndex] = cachedContains(args[argsIndex], 0, 100)))(value)) {
	            continue outer;
	          }
	        }
	        result.push(value);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Gets the last element of the `array`. If a number `n` is passed, the last
	   * `n` elements of the `array` are returned. If a `callback` function is passed,
	   * the last elements the `callback` returns truthy for are returned. The `callback`
	   * is bound to `thisArg` and invoked with three arguments; (value, index, array).
	   *
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n] The function called
	   *  per element or the number of elements to return. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Mixed} Returns the last element(s) of `array`.
	   * @example
	   *
	   * _.last([1, 2, 3]);
	   * // => 3
	   *
	   * _.last([1, 2, 3], 2);
	   * // => [2, 3]
	   *
	   * _.last([1, 2, 3], function(num) {
	   *   return num > 1;
	   * });
	   * // => [2, 3]
	   *
	   * var food = [
	   *   { 'name': 'beet',   'organic': false },
	   *   { 'name': 'carrot', 'organic': true }
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.last(food, 'organic');
	   * // => [{ 'name': 'carrot', 'organic': true }]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' },
	   *   { 'name': 'carrot', 'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.last(food, { 'type': 'vegetable' });
	   * // => [{ 'name': 'beet', 'type': 'vegetable' }, { 'name': 'carrot', 'type': 'vegetable' }]
	   */
	  function last(array, callback, thisArg) {
	    if (array) {
	      var n = 0,
	          length = array.length;
	
	      if (typeof callback != 'number' && callback != null) {
	        var index = length;
	        callback = createCallback(callback, thisArg);
	        while (index-- && callback(array[index], index, array)) {
	          n++;
	        }
	      } else {
	        n = callback;
	        if (n == null || thisArg) {
	          return array[length - 1];
	        }
	      }
	      return slice(array, nativeMax(0, length - n));
	    }
	  }
	
	  /**
	   * Gets the index at which the last occurrence of `value` is found using strict
	   * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
	   * as the offset from the end of the collection.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to search.
	   * @param {Mixed} value The value to search for.
	   * @param {Number} [fromIndex=array.length-1] The index to search from.
	   * @returns {Number} Returns the index of the matched value or `-1`.
	   * @example
	   *
	   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
	   * // => 4
	   *
	   * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
	   * // => 1
	   */
	  function lastIndexOf(array, value, fromIndex) {
	    var index = array ? array.length : 0;
	    if (typeof fromIndex == 'number') {
	      index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
	    }
	    while (index--) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }
	
	  /**
	   * Creates an object composed from arrays of `keys` and `values`. Pass either
	   * a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`, or
	   * two arrays, one of `keys` and one of corresponding `values`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} keys The array of keys.
	   * @param {Array} [values=[]] The array of values.
	   * @returns {Object} Returns an object composed of the given keys and
	   *  corresponding values.
	   * @example
	   *
	   * _.object(['moe', 'larry'], [30, 40]);
	   * // => { 'moe': 30, 'larry': 40 }
	   */
	  function object(keys, values) {
	    var index = -1,
	        length = keys ? keys.length : 0,
	        result = {};
	
	    while (++index < length) {
	      var key = keys[index];
	      if (values) {
	        result[key] = values[index];
	      } else {
	        result[key[0]] = key[1];
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Creates an array of numbers (positive and/or negative) progressing from
	   * `start` up to but not including `end`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Number} [start=0] The start of the range.
	   * @param {Number} end The end of the range.
	   * @param {Number} [step=1] The value to increment or descrement by.
	   * @returns {Array} Returns a new range array.
	   * @example
	   *
	   * _.range(10);
	   * // => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	   *
	   * _.range(1, 11);
	   * // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	   *
	   * _.range(0, 30, 5);
	   * // => [0, 5, 10, 15, 20, 25]
	   *
	   * _.range(0, -10, -1);
	   * // => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
	   *
	   * _.range(0);
	   * // => []
	   */
	  function range(start, end, step) {
	    start = +start || 0;
	    step = +step || 1;
	
	    if (end == null) {
	      end = start;
	      start = 0;
	    }
	    // use `Array(length)` so V8 will avoid the slower "dictionary" mode
	    // http://youtu.be/XAqIpGU8ZZk#t=17m25s
	    var index = -1,
	        length = nativeMax(0, ceil((end - start) / step)),
	        result = Array(length);
	
	    while (++index < length) {
	      result[index] = start;
	      start += step;
	    }
	    return result;
	  }
	
	  /**
	   * The opposite of `_.initial`, this method gets all but the first value of `array`.
	   * If a number `n` is passed, the first `n` values are excluded from the result.
	   * If a `callback` function is passed, the first elements the `callback` returns
	   * truthy for are excluded from the result. The `callback` is bound to `thisArg`
	   * and invoked with three arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias drop, tail
	   * @category Arrays
	   * @param {Array} array The array to query.
	   * @param {Function|Object|Number|String} [callback|n=1] The function called
	   *  per element or the number of elements to exclude. If a property name or
	   *  object is passed, it will be used to create a "_.pluck" or "_.where"
	   *  style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a slice of `array`.
	   * @example
	   *
	   * _.rest([1, 2, 3]);
	   * // => [2, 3]
	   *
	   * _.rest([1, 2, 3], 2);
	   * // => [3]
	   *
	   * _.rest([1, 2, 3], function(num) {
	   *   return num < 3;
	   * });
	   * // => [3]
	   *
	   * var food = [
	   *   { 'name': 'banana', 'organic': true },
	   *   { 'name': 'beet',   'organic': false },
	   * ];
	   *
	   * // using "_.pluck" callback shorthand
	   * _.rest(food, 'organic');
	   * // => [{ 'name': 'beet', 'organic': false }]
	   *
	   * var food = [
	   *   { 'name': 'apple',  'type': 'fruit' },
	   *   { 'name': 'banana', 'type': 'fruit' },
	   *   { 'name': 'beet',   'type': 'vegetable' }
	   * ];
	   *
	   * // using "_.where" callback shorthand
	   * _.rest(food, { 'type': 'fruit' });
	   * // => [{ 'name': 'beet', 'type': 'vegetable' }]
	   */
	  function rest(array, callback, thisArg) {
	    if (typeof callback != 'number' && callback != null) {
	      var n = 0,
	          index = -1,
	          length = array ? array.length : 0;
	
	      callback = createCallback(callback, thisArg);
	      while (++index < length && callback(array[index], index, array)) {
	        n++;
	      }
	    } else {
	      n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
	    }
	    return slice(array, n);
	  }
	
	  /**
	   * Uses a binary search to determine the smallest index at which the `value`
	   * should be inserted into `array` in order to maintain the sort order of the
	   * sorted `array`. If `callback` is passed, it will be executed for `value` and
	   * each element in `array` to compute their sort ranking. The `callback` is
	   * bound to `thisArg` and invoked with one argument; (value).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to iterate over.
	   * @param {Mixed} value The value to evaluate.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Number} Returns the index at which the value should be inserted
	   *  into `array`.
	   * @example
	   *
	   * _.sortedIndex([20, 30, 50], 40);
	   * // => 2
	   *
	   * // using "_.pluck" callback shorthand
	   * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	   * // => 2
	   *
	   * var dict = {
	   *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
	   * };
	   *
	   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	   *   return dict.wordToNumber[word];
	   * });
	   * // => 2
	   *
	   * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
	   *   return this.wordToNumber[word];
	   * }, dict);
	   * // => 2
	   */
	  function sortedIndex(array, value, callback, thisArg) {
	    var low = 0,
	        high = array ? array.length : low;
	
	    // explicitly reference `identity` for better inlining in Firefox
	    callback = callback ? createCallback(callback, thisArg, 1) : identity;
	    value = callback(value);
	
	    while (low < high) {
	      var mid = (low + high) >>> 1;
	      callback(array[mid]) < value
	        ? low = mid + 1
	        : high = mid;
	    }
	    return low;
	  }
	
	  /**
	   * Computes the union of the passed-in arrays using strict equality for
	   * comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} [array1, array2, ...] Arrays to process.
	   * @returns {Array} Returns a new array of unique values, in order, that are
	   *  present in one or more of the arrays.
	   * @example
	   *
	   * _.union([1, 2, 3], [101, 2, 1, 10], [2, 1]);
	   * // => [1, 2, 3, 101, 10]
	   */
	  function union() {
	    return uniq(concat.apply(arrayRef, arguments));
	  }
	
	  /**
	   * Creates a duplicate-value-free version of the `array` using strict equality
	   * for comparisons, i.e. `===`. If the `array` is already sorted, passing `true`
	   * for `isSorted` will run a faster algorithm. If `callback` is passed, each
	   * element of `array` is passed through a callback` before uniqueness is computed.
	   * The `callback` is bound to `thisArg` and invoked with three arguments; (value, index, array).
	   *
	   * If a property name is passed for `callback`, the created "_.pluck" style
	   * callback will return the property value of the given element.
	   *
	   * If an object is passed for `callback`, the created "_.where" style callback
	   * will return `true` for elements that have the propeties of the given object,
	   * else `false`.
	   *
	   * @static
	   * @memberOf _
	   * @alias unique
	   * @category Arrays
	   * @param {Array} array The array to process.
	   * @param {Boolean} [isSorted=false] A flag to indicate that the `array` is already sorted.
	   * @param {Function|Object|String} [callback=identity] The function called per
	   *  iteration. If a property name or object is passed, it will be used to create
	   *  a "_.pluck" or "_.where" style callback, respectively.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a duplicate-value-free array.
	   * @example
	   *
	   * _.uniq([1, 2, 1, 3, 1]);
	   * // => [1, 2, 3]
	   *
	   * _.uniq([1, 1, 2, 2, 3], true);
	   * // => [1, 2, 3]
	   *
	   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return Math.floor(num); });
	   * // => [1, 2, 3]
	   *
	   * _.uniq([1, 2, 1.5, 3, 2.5], function(num) { return this.floor(num); }, Math);
	   * // => [1, 2, 3]
	   *
	   * // using "_.pluck" callback shorthand
	   * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	   * // => [{ 'x': 1 }, { 'x': 2 }]
	   */
	  function uniq(array, isSorted, callback, thisArg) {
	    var index = -1,
	        length = array ? array.length : 0,
	        result = [],
	        seen = result;
	
	    // juggle arguments
	    if (typeof isSorted == 'function') {
	      thisArg = callback;
	      callback = isSorted;
	      isSorted = false;
	    }
	    // init value cache for large arrays
	    var isLarge = !isSorted && length >= 75;
	    if (isLarge) {
	      var cache = {};
	    }
	    if (callback) {
	      seen = [];
	      callback = createCallback(callback, thisArg);
	    }
	    while (++index < length) {
	      var value = array[index],
	          computed = callback ? callback(value, index, array) : value;
	
	      if (isLarge) {
	        var key = computed + '';
	        var inited = hasOwnProperty.call(cache, key)
	          ? !(seen = cache[key])
	          : (seen = cache[key] = []);
	      }
	      if (isSorted
	            ? !index || seen[seen.length - 1] !== computed
	            : inited || indexOf(seen, computed) < 0
	          ) {
	        if (callback || isLarge) {
	          seen.push(computed);
	        }
	        result.push(value);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Creates an array with all occurrences of the passed values removed using
	   * strict equality for comparisons, i.e. `===`.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} array The array to filter.
	   * @param {Mixed} [value1, value2, ...] Values to remove.
	   * @returns {Array} Returns a new filtered array.
	   * @example
	   *
	   * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
	   * // => [2, 3, 4]
	   */
	  function without(array) {
	    var index = -1,
	        length = array ? array.length : 0,
	        contains = cachedContains(arguments, 1),
	        result = [];
	
	    while (++index < length) {
	      var value = array[index];
	      if (!contains(value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  }
	
	  /**
	   * Groups the elements of each array at their corresponding indexes. Useful for
	   * separate data sources that are coordinated through matching array indexes.
	   * For a matrix of nested arrays, `_.zip.apply(...)` can transpose the matrix
	   * in a similar fashion.
	   *
	   * @static
	   * @memberOf _
	   * @category Arrays
	   * @param {Array} [array1, array2, ...] Arrays to process.
	   * @returns {Array} Returns a new array of grouped elements.
	   * @example
	   *
	   * _.zip(['moe', 'larry'], [30, 40], [true, false]);
	   * // => [['moe', 30, true], ['larry', 40, false]]
	   */
	  function zip(array) {
	    var index = -1,
	        length = array ? max(pluck(arguments, 'length')) : 0,
	        result = Array(length);
	
	    while (++index < length) {
	      result[index] = pluck(arguments, index);
	    }
	    return result;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Creates a function that is restricted to executing `func` only after it is
	   * called `n` times. The `func` is executed with the `this` binding of the
	   * created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Number} n The number of times the function must be called before
	   * it is executed.
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * var renderNotes = _.after(notes.length, render);
	   * _.forEach(notes, function(note) {
	   *   note.asyncSave({ 'success': renderNotes });
	   * });
	   * // `renderNotes` is run once, after all notes have saved
	   */
	  function after(n, func) {
	    if (n < 1) {
	      return func();
	    }
	    return function() {
	      if (--n < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  }
	
	  /**
	   * Creates a function that, when called, invokes `func` with the `this`
	   * binding of `thisArg` and prepends any additional `bind` arguments to those
	   * passed to the bound function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to bind.
	   * @param {Mixed} [thisArg] The `this` binding of `func`.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new bound function.
	   * @example
	   *
	   * var func = function(greeting) {
	   *   return greeting + ' ' + this.name;
	   * };
	   *
	   * func = _.bind(func, { 'name': 'moe' }, 'hi');
	   * func();
	   * // => 'hi moe'
	   */
	  function bind(func, thisArg) {
	    // use `Function#bind` if it exists and is fast
	    // (in V8 `Function#bind` is slower except when partially applied)
	    return isBindFast || (nativeBind && arguments.length > 2)
	      ? nativeBind.call.apply(nativeBind, arguments)
	      : createBound(func, thisArg, slice(arguments, 2));
	  }
	
	  /**
	   * Binds methods on `object` to `object`, overwriting the existing method.
	   * Method names may be specified as individual arguments or as arrays of method
	   * names. If no method names are provided, all the function properties of `object`
	   * will be bound.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Object} object The object to bind and assign the bound methods to.
	   * @param {String} [methodName1, methodName2, ...] Method names on the object to bind.
	   * @returns {Object} Returns `object`.
	   * @example
	   *
	   * var view = {
	   *  'label': 'docs',
	   *  'onClick': function() { alert('clicked ' + this.label); }
	   * };
	   *
	   * _.bindAll(view);
	   * jQuery('#docs').on('click', view.onClick);
	   * // => alerts 'clicked docs', when the button is clicked
	   */
	  function bindAll(object) {
	    var funcs = concat.apply(arrayRef, arguments),
	        index = funcs.length > 1 ? 0 : (funcs = functions(object), -1),
	        length = funcs.length;
	
	    while (++index < length) {
	      var key = funcs[index];
	      object[key] = bind(object[key], object);
	    }
	    return object;
	  }
	
	  /**
	   * Creates a function that, when called, invokes the method at `object[key]`
	   * and prepends any additional `bindKey` arguments to those passed to the bound
	   * function. This method differs from `_.bind` by allowing bound functions to
	   * reference methods that will be redefined or don't yet exist.
	   * See http://michaux.ca/articles/lazy-function-definition-pattern.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Object} object The object the method belongs to.
	   * @param {String} key The key of the method.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new bound function.
	   * @example
	   *
	   * var object = {
	   *   'name': 'moe',
	   *   'greet': function(greeting) {
	   *     return greeting + ' ' + this.name;
	   *   }
	   * };
	   *
	   * var func = _.bindKey(object, 'greet', 'hi');
	   * func();
	   * // => 'hi moe'
	   *
	   * object.greet = function(greeting) {
	   *   return greeting + ', ' + this.name + '!';
	   * };
	   *
	   * func();
	   * // => 'hi, moe!'
	   */
	  function bindKey(object, key) {
	    return createBound(object, key, slice(arguments, 2));
	  }
	
	  /**
	   * Creates a function that is the composition of the passed functions,
	   * where each function consumes the return value of the function that follows.
	   * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
	   * Each function is executed with the `this` binding of the composed function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} [func1, func2, ...] Functions to compose.
	   * @returns {Function} Returns the new composed function.
	   * @example
	   *
	   * var greet = function(name) { return 'hi ' + name; };
	   * var exclaim = function(statement) { return statement + '!'; };
	   * var welcome = _.compose(exclaim, greet);
	   * welcome('moe');
	   * // => 'hi moe!'
	   */
	  function compose() {
	    var funcs = arguments;
	    return function() {
	      var args = arguments,
	          length = funcs.length;
	
	      while (length--) {
	        args = [funcs[length].apply(this, args)];
	      }
	      return args[0];
	    };
	  }
	
	  /**
	   * Creates a function that will delay the execution of `func` until after
	   * `wait` milliseconds have elapsed since the last time it was invoked. Pass
	   * `true` for `immediate` to cause debounce to invoke `func` on the leading,
	   * instead of the trailing, edge of the `wait` timeout. Subsequent calls to
	   * the debounced function will return the result of the last `func` call.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to debounce.
	   * @param {Number} wait The number of milliseconds to delay.
	   * @param {Boolean} immediate A flag to indicate execution is on the leading
	   *  edge of the timeout.
	   * @returns {Function} Returns the new debounced function.
	   * @example
	   *
	   * var lazyLayout = _.debounce(calculateLayout, 300);
	   * jQuery(window).on('resize', lazyLayout);
	   */
	  function debounce(func, wait, immediate) {
	    var args,
	        result,
	        thisArg,
	        timeoutId;
	
	    function delayed() {
	      timeoutId = null;
	      if (!immediate) {
	        result = func.apply(thisArg, args);
	      }
	    }
	    return function() {
	      var isImmediate = immediate && !timeoutId;
	      args = arguments;
	      thisArg = this;
	
	      clearTimeout(timeoutId);
	      timeoutId = setTimeout(delayed, wait);
	
	      if (isImmediate) {
	        result = func.apply(thisArg, args);
	      }
	      return result;
	    };
	  }
	
	  /**
	   * Executes the `func` function after `wait` milliseconds. Additional arguments
	   * will be passed to `func` when it is invoked.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to delay.
	   * @param {Number} wait The number of milliseconds to delay execution.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
	   * @returns {Number} Returns the `setTimeout` timeout id.
	   * @example
	   *
	   * var log = _.bind(console.log, console);
	   * _.delay(log, 1000, 'logged later');
	   * // => 'logged later' (Appears after one second.)
	   */
	  function delay(func, wait) {
	    var args = slice(arguments, 2);
	    return setTimeout(function() { func.apply(undefined, args); }, wait);
	  }
	
	  /**
	   * Defers executing the `func` function until the current call stack has cleared.
	   * Additional arguments will be passed to `func` when it is invoked.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to defer.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to invoke the function with.
	   * @returns {Number} Returns the `setTimeout` timeout id.
	   * @example
	   *
	   * _.defer(function() { alert('deferred'); });
	   * // returns from the function before `alert` is called
	   */
	  function defer(func) {
	    var args = slice(arguments, 1);
	    return setTimeout(function() { func.apply(undefined, args); }, 1);
	  }
	  // use `setImmediate` if it's available in Node.js
	  if (isV8 && freeModule && typeof setImmediate == 'function') {
	    defer = bind(setImmediate, window);
	  }
	
	  /**
	   * Creates a function that memoizes the result of `func`. If `resolver` is
	   * passed, it will be used to determine the cache key for storing the result
	   * based on the arguments passed to the memoized function. By default, the first
	   * argument passed to the memoized function is used as the cache key. The `func`
	   * is executed with the `this` binding of the memoized function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to have its output memoized.
	   * @param {Function} [resolver] A function used to resolve the cache key.
	   * @returns {Function} Returns the new memoizing function.
	   * @example
	   *
	   * var fibonacci = _.memoize(function(n) {
	   *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
	   * });
	   */
	  function memoize(func, resolver) {
	    var cache = {};
	    return function() {
	      var key = (resolver ? resolver.apply(this, arguments) : arguments[0]) + '';
	      return hasOwnProperty.call(cache, key)
	        ? cache[key]
	        : (cache[key] = func.apply(this, arguments));
	    };
	  }
	
	  /**
	   * Creates a function that is restricted to execute `func` once. Repeat calls to
	   * the function will return the value of the first call. The `func` is executed
	   * with the `this` binding of the created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to restrict.
	   * @returns {Function} Returns the new restricted function.
	   * @example
	   *
	   * var initialize = _.once(createApplication);
	   * initialize();
	   * initialize();
	   * // `initialize` executes `createApplication` once
	   */
	  function once(func) {
	    var ran,
	        result;
	
	    return function() {
	      if (ran) {
	        return result;
	      }
	      ran = true;
	      result = func.apply(this, arguments);
	
	      // clear the `func` variable so the function may be garbage collected
	      func = null;
	      return result;
	    };
	  }
	
	  /**
	   * Creates a function that, when called, invokes `func` with any additional
	   * `partial` arguments prepended to those passed to the new function. This
	   * method is similar to `_.bind`, except it does **not** alter the `this` binding.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to partially apply arguments to.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new partially applied function.
	   * @example
	   *
	   * var greet = function(greeting, name) { return greeting + ' ' + name; };
	   * var hi = _.partial(greet, 'hi');
	   * hi('moe');
	   * // => 'hi moe'
	   */
	  function partial(func) {
	    return createBound(func, slice(arguments, 1));
	  }
	
	  /**
	   * This method is similar to `_.partial`, except that `partial` arguments are
	   * appended to those passed to the new function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to partially apply arguments to.
	   * @param {Mixed} [arg1, arg2, ...] Arguments to be partially applied.
	   * @returns {Function} Returns the new partially applied function.
	   * @example
	   *
	   * var defaultsDeep = _.partialRight(_.merge, _.defaults);
	   *
	   * var options = {
	   *   'variable': 'data',
	   *   'imports': { 'jq': $ }
	   * };
	   *
	   * defaultsDeep(options, _.templateSettings);
	   *
	   * options.variable
	   * // => 'data'
	   *
	   * options.imports
	   * // => { '_': _, 'jq': $ }
	   */
	  function partialRight(func) {
	    return createBound(func, slice(arguments, 1), null, indicatorObject);
	  }
	
	  /**
	   * Creates a function that, when executed, will only call the `func`
	   * function at most once per every `wait` milliseconds. If the throttled
	   * function is invoked more than once during the `wait` timeout, `func` will
	   * also be called on the trailing edge of the timeout. Subsequent calls to the
	   * throttled function will return the result of the last `func` call.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Function} func The function to throttle.
	   * @param {Number} wait The number of milliseconds to throttle executions to.
	   * @returns {Function} Returns the new throttled function.
	   * @example
	   *
	   * var throttled = _.throttle(updatePosition, 100);
	   * jQuery(window).on('scroll', throttled);
	   */
	  function throttle(func, wait) {
	    var args,
	        result,
	        thisArg,
	        timeoutId,
	        lastCalled = 0;
	
	    function trailingCall() {
	      lastCalled = new Date;
	      timeoutId = null;
	      result = func.apply(thisArg, args);
	    }
	    return function() {
	      var now = new Date,
	          remaining = wait - (now - lastCalled);
	
	      args = arguments;
	      thisArg = this;
	
	      if (remaining <= 0) {
	        clearTimeout(timeoutId);
	        timeoutId = null;
	        lastCalled = now;
	        result = func.apply(thisArg, args);
	      }
	      else if (!timeoutId) {
	        timeoutId = setTimeout(trailingCall, remaining);
	      }
	      return result;
	    };
	  }
	
	  /**
	   * Creates a function that passes `value` to the `wrapper` function as its
	   * first argument. Additional arguments passed to the function are appended
	   * to those passed to the `wrapper` function. The `wrapper` is executed with
	   * the `this` binding of the created function.
	   *
	   * @static
	   * @memberOf _
	   * @category Functions
	   * @param {Mixed} value The value to wrap.
	   * @param {Function} wrapper The wrapper function.
	   * @returns {Function} Returns the new function.
	   * @example
	   *
	   * var hello = function(name) { return 'hello ' + name; };
	   * hello = _.wrap(hello, function(func) {
	   *   return 'before, ' + func('moe') + ', after';
	   * });
	   * hello();
	   * // => 'before, hello moe, after'
	   */
	  function wrap(value, wrapper) {
	    return function() {
	      var args = [value];
	      push.apply(args, arguments);
	      return wrapper.apply(this, args);
	    };
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
	   * corresponding HTML entities.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} string The string to escape.
	   * @returns {String} Returns the escaped string.
	   * @example
	   *
	   * _.escape('Moe, Larry & Curly');
	   * // => 'Moe, Larry &amp; Curly'
	   */
	  function escape(string) {
	    return string == null ? '' : (string + '').replace(reUnescapedHtml, escapeHtmlChar);
	  }
	
	  /**
	   * This function returns the first argument passed to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Mixed} value Any value.
	   * @returns {Mixed} Returns `value`.
	   * @example
	   *
	   * var moe = { 'name': 'moe' };
	   * moe === _.identity(moe);
	   * // => true
	   */
	  function identity(value) {
	    return value;
	  }
	
	  /**
	   * Adds functions properties of `object` to the `lodash` function and chainable
	   * wrapper.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} object The object of function properties to add to `lodash`.
	   * @example
	   *
	   * _.mixin({
	   *   'capitalize': function(string) {
	   *     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	   *   }
	   * });
	   *
	   * _.capitalize('moe');
	   * // => 'Moe'
	   *
	   * _('moe').capitalize();
	   * // => 'Moe'
	   */
	  function mixin(object) {
	    forEach(functions(object), function(methodName) {
	      var func = lodash[methodName] = object[methodName];
	
	      lodash.prototype[methodName] = function() {
	        var args = [this.__wrapped__];
	        push.apply(args, arguments);
	        return new lodash(func.apply(lodash, args));
	      };
	    });
	  }
	
	  /**
	   * Reverts the '_' variable to its previous value and returns a reference to
	   * the `lodash` function.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @returns {Function} Returns the `lodash` function.
	   * @example
	   *
	   * var lodash = _.noConflict();
	   */
	  function noConflict() {
	    window._ = oldDash;
	    return this;
	  }
	
	  /**
	   * Produces a random number between `min` and `max` (inclusive). If only one
	   * argument is passed, a number between `0` and the given number will be returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Number} [min=0] The minimum possible value.
	   * @param {Number} [max=1] The maximum possible value.
	   * @returns {Number} Returns a random number.
	   * @example
	   *
	   * _.random(0, 5);
	   * // => a number between 0 and 5
	   *
	   * _.random(5);
	   * // => also a number between 0 and 5
	   */
	  function random(min, max) {
	    if (min == null && max == null) {
	      max = 1;
	    }
	    min = +min || 0;
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + floor(nativeRandom() * ((+max || 0) - min + 1));
	  }
	
	  /**
	   * Resolves the value of `property` on `object`. If `property` is a function,
	   * it will be invoked and its result returned, else the property value is
	   * returned. If `object` is falsey, then `null` is returned.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Object} object The object to inspect.
	   * @param {String} property The property to get the value of.
	   * @returns {Mixed} Returns the resolved value.
	   * @example
	   *
	   * var object = {
	   *   'cheese': 'crumpets',
	   *   'stuff': function() {
	   *     return 'nonsense';
	   *   }
	   * };
	   *
	   * _.result(object, 'cheese');
	   * // => 'crumpets'
	   *
	   * _.result(object, 'stuff');
	   * // => 'nonsense'
	   */
	  function result(object, property) {
	    var value = object ? object[property] : undefined;
	    return isFunction(value) ? object[property]() : value;
	  }
	
	  /**
	   * A micro-templating method that handles arbitrary delimiters, preserves
	   * whitespace, and correctly escapes quotes within interpolated code.
	   *
	   * Note: In the development build, `_.template` utilizes sourceURLs for easier
	   * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	   *
	   * Note: Lo-Dash may be used in Chrome extensions by either creating a `lodash csp`
	   * build and using precompiled templates, or loading Lo-Dash in a sandbox.
	   *
	   * For more information on precompiling templates see:
	   * http://lodash.com/#custom-builds
	   *
	   * For more information on Chrome extension sandboxes see:
	   * http://developer.chrome.com/stable/extensions/sandboxingEval.html
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} text The template text.
	   * @param {Obect} data The data object used to populate the text.
	   * @param {Object} options The options object.
	   *  escape - The "escape" delimiter regexp.
	   *  evaluate - The "evaluate" delimiter regexp.
	   *  interpolate - The "interpolate" delimiter regexp.
	   *  sourceURL - The sourceURL of the template's compiled source.
	   *  variable - The data object variable name.
	   *
	   * @returns {Function|String} Returns a compiled function when no `data` object
	   *  is given, else it returns the interpolated text.
	   * @example
	   *
	   * // using a compiled template
	   * var compiled = _.template('hello <%= name %>');
	   * compiled({ 'name': 'moe' });
	   * // => 'hello moe'
	   *
	   * var list = '<% _.forEach(people, function(name) { %><li><%= name %></li><% }); %>';
	   * _.template(list, { 'people': ['moe', 'larry'] });
	   * // => '<li>moe</li><li>larry</li>'
	   *
	   * // using the "escape" delimiter to escape HTML in data property values
	   * _.template('<b><%- value %></b>', { 'value': '<script>' });
	   * // => '<b>&lt;script&gt;</b>'
	   *
	   * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
	   * _.template('hello ${ name }', { 'name': 'curly' });
	   * // => 'hello curly'
	   *
	   * // using the internal `print` function in "evaluate" delimiters
	   * _.template('<% print("hello " + epithet); %>!', { 'epithet': 'stooge' });
	   * // => 'hello stooge!'
	   *
	   * // using custom template delimiters
	   * _.templateSettings = {
	   *   'interpolate': /{{([\s\S]+?)}}/g
	   * };
	   *
	   * _.template('hello {{ name }}!', { 'name': 'mustache' });
	   * // => 'hello mustache!'
	   *
	   * // using the `sourceURL` option to specify a custom sourceURL for the template
	   * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
	   * compiled(data);
	   * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	   *
	   * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	   * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
	   * compiled.source;
	   * // => function(data) {
	   *   var __t, __p = '', __e = _.escape;
	   *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
	   *   return __p;
	   * }
	   *
	   * // using the `source` property to inline compiled templates for meaningful
	   * // line numbers in error messages and a stack trace
	   * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	   *   var JST = {\
	   *     "main": ' + _.template(mainText).source + '\
	   *   };\
	   * ');
	   */
	  function template(text, data, options) {
	    // based on John Resig's `tmpl` implementation
	    // http://ejohn.org/blog/javascript-micro-templating/
	    // and Laura Doktorova's doT.js
	    // https://github.com/olado/doT
	    var settings = lodash.templateSettings;
	    text || (text = '');
	
	    // avoid missing dependencies when `iteratorTemplate` is not defined
	    options = defaults({}, options, settings);
	
	    var imports = defaults({}, options.imports, settings.imports),
	        importsKeys = keys(imports),
	        importsValues = values(imports);
	
	    var isEvaluating,
	        index = 0,
	        interpolate = options.interpolate || reNoMatch,
	        source = "__p += '";
	
	    // compile regexp to match each delimiter
	    var reDelimiters = RegExp(
	      (options.escape || reNoMatch).source + '|' +
	      interpolate.source + '|' +
	      (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	      (options.evaluate || reNoMatch).source + '|$'
	    , 'g');
	
	    text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	      interpolateValue || (interpolateValue = esTemplateValue);
	
	      // escape characters that cannot be included in string literals
	      source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);
	
	      // replace delimiters with snippets
	      if (escapeValue) {
	        source += "' +\n__e(" + escapeValue + ") +\n'";
	      }
	      if (evaluateValue) {
	        isEvaluating = true;
	        source += "';\n" + evaluateValue + ";\n__p += '";
	      }
	      if (interpolateValue) {
	        source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	      }
	      index = offset + match.length;
	
	      // the JS engine embedded in Adobe products requires returning the `match`
	      // string in order to produce the correct `offset` value
	      return match;
	    });
	
	    source += "';\n";
	
	    // if `variable` is not specified and the template contains "evaluate"
	    // delimiters, wrap a with-statement around the generated code to add the
	    // data object to the top of the scope chain
	    var variable = options.variable,
	        hasVariable = variable;
	
	    if (!hasVariable) {
	      variable = 'obj';
	      source = 'with (' + variable + ') {\n' + source + '\n}\n';
	    }
	    // cleanup code by stripping empty strings
	    source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	      .replace(reEmptyStringMiddle, '$1')
	      .replace(reEmptyStringTrailing, '$1;');
	
	    // frame code as the function body
	    source = 'function(' + variable + ') {\n' +
	      (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
	      "var __t, __p = '', __e = _.escape" +
	      (isEvaluating
	        ? ', __j = Array.prototype.join;\n' +
	          "function print() { __p += __j.call(arguments, '') }\n"
	        : ';\n'
	      ) +
	      source +
	      'return __p\n}';
	
	    // Use a sourceURL for easier debugging and wrap in a multi-line comment to
	    // avoid issues with Narwhal, IE conditional compilation, and the JS engine
	    // embedded in Adobe products.
	    // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
	    var sourceURL = '\n/*\n//@ sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';
	
	    try {
	      var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
	    } catch(e) {
	      e.source = source;
	      throw e;
	    }
	    if (data) {
	      return result(data);
	    }
	    // provide the compiled function's source via its `toString` method, in
	    // supported environments, or the `source` property as a convenience for
	    // inlining compiled templates during the build process
	    result.source = source;
	    return result;
	  }
	
	  /**
	   * Executes the `callback` function `n` times, returning an array of the results
	   * of each `callback` execution. The `callback` is bound to `thisArg` and invoked
	   * with one argument; (index).
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {Number} n The number of times to execute the callback.
	   * @param {Function} callback The function called per iteration.
	   * @param {Mixed} [thisArg] The `this` binding of `callback`.
	   * @returns {Array} Returns a new array of the results of each `callback` execution.
	   * @example
	   *
	   * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
	   * // => [3, 6, 4]
	   *
	   * _.times(3, function(n) { mage.castSpell(n); });
	   * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
	   *
	   * _.times(3, function(n) { this.cast(n); }, mage);
	   * // => also calls `mage.castSpell(n)` three times
	   */
	  function times(n, callback, thisArg) {
	    n = +n || 0;
	    var index = -1,
	        result = Array(n);
	
	    while (++index < n) {
	      result[index] = callback.call(thisArg, index);
	    }
	    return result;
	  }
	
	  /**
	   * The opposite of `_.escape`, this method converts the HTML entities
	   * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
	   * corresponding characters.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} string The string to unescape.
	   * @returns {String} Returns the unescaped string.
	   * @example
	   *
	   * _.unescape('Moe, Larry &amp; Curly');
	   * // => 'Moe, Larry & Curly'
	   */
	  function unescape(string) {
	    return string == null ? '' : (string + '').replace(reEscapedHtml, unescapeHtmlChar);
	  }
	
	  /**
	   * Generates a unique ID. If `prefix` is passed, the ID will be appended to it.
	   *
	   * @static
	   * @memberOf _
	   * @category Utilities
	   * @param {String} [prefix] The value to prefix the ID with.
	   * @returns {String} Returns the unique ID.
	   * @example
	   *
	   * _.uniqueId('contact_');
	   * // => 'contact_104'
	   *
	   * _.uniqueId();
	   * // => '105'
	   */
	  function uniqueId(prefix) {
	    var id = ++idCounter;
	    return (prefix == null ? '' : prefix + '') + id;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * Invokes `interceptor` with the `value` as the first argument, and then
	   * returns `value`. The purpose of this method is to "tap into" a method chain,
	   * in order to perform operations on intermediate results within the chain.
	   *
	   * @static
	   * @memberOf _
	   * @category Chaining
	   * @param {Mixed} value The value to pass to `interceptor`.
	   * @param {Function} interceptor The function to invoke.
	   * @returns {Mixed} Returns `value`.
	   * @example
	   *
	   * _([1, 2, 3, 4])
	   *  .filter(function(num) { return num % 2 == 0; })
	   *  .tap(alert)
	   *  .map(function(num) { return num * num; })
	   *  .value();
	   * // => // [2, 4] (alerted)
	   * // => [4, 16]
	   */
	  function tap(value, interceptor) {
	    interceptor(value);
	    return value;
	  }
	
	  /**
	   * Produces the `toString` result of the wrapped value.
	   *
	   * @name toString
	   * @memberOf _
	   * @category Chaining
	   * @returns {String} Returns the string result.
	   * @example
	   *
	   * _([1, 2, 3]).toString();
	   * // => '1,2,3'
	   */
	  function wrapperToString() {
	    return this.__wrapped__ + '';
	  }
	
	  /**
	   * Extracts the wrapped value.
	   *
	   * @name valueOf
	   * @memberOf _
	   * @alias value
	   * @category Chaining
	   * @returns {Mixed} Returns the wrapped value.
	   * @example
	   *
	   * _([1, 2, 3]).valueOf();
	   * // => [1, 2, 3]
	   */
	  function wrapperValueOf() {
	    return this.__wrapped__;
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  // add functions that return wrapped values when chaining
	  lodash.after = after;
	  lodash.assign = assign;
	  lodash.at = at;
	  lodash.bind = bind;
	  lodash.bindAll = bindAll;
	  lodash.bindKey = bindKey;
	  lodash.compact = compact;
	  lodash.compose = compose;
	  lodash.countBy = countBy;
	  lodash.debounce = debounce;
	  lodash.defaults = defaults;
	  lodash.defer = defer;
	  lodash.delay = delay;
	  lodash.difference = difference;
	  lodash.filter = filter;
	  lodash.flatten = flatten;
	  lodash.forEach = forEach;
	  lodash.forIn = forIn;
	  lodash.forOwn = forOwn;
	  lodash.functions = functions;
	  lodash.groupBy = groupBy;
	  lodash.initial = initial;
	  lodash.intersection = intersection;
	  lodash.invert = invert;
	  lodash.invoke = invoke;
	  lodash.keys = keys;
	  lodash.map = map;
	  lodash.max = max;
	  lodash.memoize = memoize;
	  lodash.merge = merge;
	  lodash.min = min;
	  lodash.object = object;
	  lodash.omit = omit;
	  lodash.once = once;
	  lodash.pairs = pairs;
	  lodash.partial = partial;
	  lodash.partialRight = partialRight;
	  lodash.pick = pick;
	  lodash.pluck = pluck;
	  lodash.range = range;
	  lodash.reject = reject;
	  lodash.rest = rest;
	  lodash.shuffle = shuffle;
	  lodash.sortBy = sortBy;
	  lodash.tap = tap;
	  lodash.throttle = throttle;
	  lodash.times = times;
	  lodash.toArray = toArray;
	  lodash.union = union;
	  lodash.uniq = uniq;
	  lodash.values = values;
	  lodash.where = where;
	  lodash.without = without;
	  lodash.wrap = wrap;
	  lodash.zip = zip;
	
	  // add aliases
	  lodash.collect = map;
	  lodash.drop = rest;
	  lodash.each = forEach;
	  lodash.extend = assign;
	  lodash.methods = functions;
	  lodash.select = filter;
	  lodash.tail = rest;
	  lodash.unique = uniq;
	
	  // add functions to `lodash.prototype`
	  mixin(lodash);
	
	  /*--------------------------------------------------------------------------*/
	
	  // add functions that return unwrapped values when chaining
	  lodash.clone = clone;
	  lodash.cloneDeep = cloneDeep;
	  lodash.contains = contains;
	  lodash.escape = escape;
	  lodash.every = every;
	  lodash.find = find;
	  lodash.has = has;
	  lodash.identity = identity;
	  lodash.indexOf = indexOf;
	  lodash.isArguments = isArguments;
	  lodash.isArray = isArray;
	  lodash.isBoolean = isBoolean;
	  lodash.isDate = isDate;
	  lodash.isElement = isElement;
	  lodash.isEmpty = isEmpty;
	  lodash.isEqual = isEqual;
	  lodash.isFinite = isFinite;
	  lodash.isFunction = isFunction;
	  lodash.isNaN = isNaN;
	  lodash.isNull = isNull;
	  lodash.isNumber = isNumber;
	  lodash.isObject = isObject;
	  lodash.isPlainObject = isPlainObject;
	  lodash.isRegExp = isRegExp;
	  lodash.isString = isString;
	  lodash.isUndefined = isUndefined;
	  lodash.lastIndexOf = lastIndexOf;
	  lodash.mixin = mixin;
	  lodash.noConflict = noConflict;
	  lodash.random = random;
	  lodash.reduce = reduce;
	  lodash.reduceRight = reduceRight;
	  lodash.result = result;
	  lodash.size = size;
	  lodash.some = some;
	  lodash.sortedIndex = sortedIndex;
	  lodash.template = template;
	  lodash.unescape = unescape;
	  lodash.uniqueId = uniqueId;
	
	  // add aliases
	  lodash.all = every;
	  lodash.any = some;
	  lodash.detect = find;
	  lodash.foldl = reduce;
	  lodash.foldr = reduceRight;
	  lodash.include = contains;
	  lodash.inject = reduce;
	
	  forOwn(lodash, function(func, methodName) {
	    if (!lodash.prototype[methodName]) {
	      lodash.prototype[methodName] = function() {
	        var args = [this.__wrapped__];
	        push.apply(args, arguments);
	        return func.apply(lodash, args);
	      };
	    }
	  });
	
	  /*--------------------------------------------------------------------------*/
	
	  // add functions capable of returning wrapped and unwrapped values when chaining
	  lodash.first = first;
	  lodash.last = last;
	
	  // add aliases
	  lodash.take = first;
	  lodash.head = first;
	
	  forOwn(lodash, function(func, methodName) {
	    if (!lodash.prototype[methodName]) {
	      lodash.prototype[methodName]= function(callback, thisArg) {
	        var result = func(this.__wrapped__, callback, thisArg);
	        return callback == null || (thisArg && typeof callback != 'function')
	          ? result
	          : new lodash(result);
	      };
	    }
	  });
	
	  /*--------------------------------------------------------------------------*/
	
	  /**
	   * The semantic version number.
	   *
	   * @static
	   * @memberOf _
	   * @type String
	   */
	  lodash.VERSION = '1.0.2';
	
	  // add "Chaining" functions to the wrapper
	  lodash.prototype.toString = wrapperToString;
	  lodash.prototype.value = wrapperValueOf;
	  lodash.prototype.valueOf = wrapperValueOf;
	
	  // add `Array` functions that return unwrapped values
	  each(['join', 'pop', 'shift'], function(methodName) {
	    var func = arrayRef[methodName];
	    lodash.prototype[methodName] = function() {
	      return func.apply(this.__wrapped__, arguments);
	    };
	  });
	
	  // add `Array` functions that return the wrapped value
	  each(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
	    var func = arrayRef[methodName];
	    lodash.prototype[methodName] = function() {
	      func.apply(this.__wrapped__, arguments);
	      return this;
	    };
	  });
	
	  // add `Array` functions that return new wrapped values
	  each(['concat', 'slice', 'splice'], function(methodName) {
	    var func = arrayRef[methodName];
	    lodash.prototype[methodName] = function() {
	      return new lodash(func.apply(this.__wrapped__, arguments));
	    };
	  });
	
	  // avoid array-like object bugs with `Array#shift` and `Array#splice`
	  // in Firefox < 10 and IE < 9
	  if (hasObjectSpliceBug) {
	    each(['pop', 'shift', 'splice'], function(methodName) {
	      var func = arrayRef[methodName],
	          isSplice = methodName == 'splice';
	
	      lodash.prototype[methodName] = function() {
	        var value = this.__wrapped__,
	            result = func.apply(value, arguments);
	
	        if (value.length === 0) {
	          delete value[0];
	        }
	        return isSplice ? new lodash(result) : result;
	      };
	    });
	  }
	
	  /*--------------------------------------------------------------------------*/
	
	  // expose Lo-Dash
	  // some AMD build optimizers, like r.js, check for specific condition patterns like the following:
	  if (true) {
	    // Expose Lo-Dash to the global object even when an AMD loader is present in
	    // case Lo-Dash was injected by a third-party script and not intended to be
	    // loaded as a module. The global assignment can be reverted in the Lo-Dash
	    // module via its `noConflict()` method.
	    window._ = lodash;
	
	    // define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return lodash;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // check for `exports` after `define` in case a build optimizer adds an `exports` object
	  else if (freeExports) {
	    // in Node.js or RingoJS v0.8.0+
	    if (freeModule) {
	      (freeModule.exports = lodash)._ = lodash;
	    }
	    // in Narwhal or RingoJS v0.7.0-
	    else {
	      freeExports._ = lodash;
	    }
	  }
	  else {
	    // in a browser or Rhino
	    window._ = lodash;
	  }
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module), (function() { return this; }()), __webpack_require__(5).setImmediate))

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(6).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5).setImmediate, __webpack_require__(5).clearImmediate))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        return setTimeout(fun, 0);
	    } else {
	        return cachedSetTimeout.call(null, fun, 0);
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        clearTimeout(marker);
	    } else {
	        cachedClearTimeout.call(null, marker);
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDNlOGQzOWM3ZWRiMjI3MTg3YjMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2UvdGltZVNwYW4udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0QzL2QzRHVhbEJhckNoYXJ0L2QzRHVhbEJhckNoYXJ0LnRzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2Rpc3QvbG9kYXNoLmNvbXBhdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3dlYnBhY2svYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL0M6L1dlYkRldi9hbmd1bGFyLWQzcGxvdHMvfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy9DOi9XZWJEZXYvYW5ndWxhci1kM3Bsb3RzL34vcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDcENBO0tBQ0ksa0JBQW9CLGlCQUF3QjtTQUF4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQU87S0FBRSxDQUFDO0tBRXhDLDhCQUFXLEdBQWxCLFVBQW1CLFFBQVE7U0FBM0IsaUJBTUM7U0FMRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDLE1BQU0sQ0FBQzthQUNILGFBQWEsRUFBRyxVQUFDLFFBQVEsSUFBSyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUM7YUFDL0UsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO1VBQ3pCO0tBQ0wsQ0FBQztLQUNNLCtCQUFZLEdBQW5CLFVBQW9CLFFBQVE7U0FDeEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ25CLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBVSxTQUFTO1NBQzVDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUMsU0FBUyxDQUFDLENBQVEsWUFBWTtTQUMvQyxVQUFVLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxDQUFNLGFBQWE7U0FDL0MsVUFBVSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBTyxhQUFhO1NBQ2hELFVBQVUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsU0FBUyxDQUFDLENBQU0sZUFBZTtTQUNqRCxVQUFVLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFPLE9BQU87U0FDeEMsVUFBVSxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsT0FBTyxDQUFDLENBQUssVUFBVTtTQUMzQyxVQUFVLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBSyxVQUFVO1NBQzNDLFVBQVUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFJLFdBQVc7U0FDNUMsVUFBVSxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUksUUFBUTtTQUN4QyxVQUFVLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUUsU0FBUztTQUN6QyxVQUFVLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUUsU0FBUztTQUUxQyxJQUFJLFFBQVEsR0FBTyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDO1NBQ3hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCLEVBQUUsRUFBRSxRQUFRLEdBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQztpQkFDakIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0IsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDYixLQUFLLENBQUM7YUFDVixDQUFDO1NBQ0wsQ0FBQztTQUNELE1BQU0sQ0FBRTthQUNKLFVBQVUsRUFBRyxVQUFVO2FBQ3ZCLFFBQVEsRUFBRyxRQUFRO1VBQ3RCO0tBQ0wsQ0FBQztLQUVNLDJCQUFRLEdBQWYsVUFBZ0IsY0FBYyxFQUFHLFVBQVU7U0FDbkMsVUFBVSxHQUFHLFVBQVUsSUFBSSxTQUFTLENBQUM7U0FDckMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCLCtCQUErQjtTQUMvQixNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ2pCLEtBQUssT0FBTztpQkFBWSxRQUFRLEdBQUUsQ0FBQyxDQUFDO2lCQUFDLEtBQUssQ0FBQzthQUMzQyxLQUFLLE1BQU07aUJBQWEsUUFBUSxHQUFFLENBQUMsQ0FBQztpQkFBQyxLQUFLLENBQUM7YUFDM0MsS0FBSyxPQUFPO2lCQUFZLFFBQVEsR0FBRSxDQUFDLENBQUM7aUJBQUMsS0FBSyxDQUFDO2FBQzNDLEtBQUssU0FBUztpQkFBVSxRQUFRLEdBQUUsQ0FBQyxDQUFDO2lCQUFDLEtBQUssQ0FBQzthQUMzQyxLQUFLLFNBQVM7aUJBQVUsUUFBUSxHQUFFLENBQUMsQ0FBQztpQkFBQyxLQUFLLENBQUM7YUFDM0MsS0FBSyxjQUFjO2lCQUFLLFFBQVEsR0FBRSxDQUFDLENBQUM7aUJBQUMsS0FBSyxDQUFDO2FBQzNDO2lCQUF3QixRQUFRLEdBQUUsQ0FBQyxDQUFDO2lCQUFDLEtBQUssQ0FBQztTQUMvQyxDQUFDO1NBQ0QscURBQXFEO1NBQ3JELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQy9FLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQzFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDakQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNyRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1osRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUMzQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDM0QsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUNiLENBQUM7U0FDTCxDQUFDO1NBQ0QsMEJBQTBCO1NBQzFCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztTQUNiLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLElBQUUsQ0FBQyxDQUFFLEdBQUcsT0FBTyxHQUFHLFFBQVE7U0FDM0QsRUFBRSxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2YsR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBRSxDQUFDLENBQUUsR0FBRyxNQUFNLEdBQUcsT0FBTztTQUMzRCxDQUFDO1NBQ0QsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDekIsR0FBRyxJQUFJLElBQUksQ0FBQzthQUNoQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUN4QixHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRSxFQUFFLENBQUM7YUFDN0MsQ0FBQzthQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUMvQixHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDOUMsQ0FBQzthQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUMvQixHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBSSxFQUFFLENBQUM7YUFDN0MsQ0FBQzthQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNKLEdBQUcsSUFBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFJLEtBQUssR0FBRyxJQUFJLEdBQUUsRUFBRSxDQUFDO2lCQUN0RCxHQUFHLElBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztpQkFDakUsR0FBRyxJQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFFLEVBQUUsQ0FBQztpQkFDM0UsR0FBRyxJQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUUsRUFBRSxDQUFDO2FBQzVGLENBQUM7U0FDTCxDQUFDO1NBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztLQUNmLENBQUM7S0FFVCxlQUFDO0FBQUQsRUFBQztBQTVGWSxpQkFBUSxXQTRGcEI7Ozs7Ozs7O0FDNUZELEtBQVksQ0FBQyx1QkFBTSxDQUFRLENBQUM7QUFDNUIsbURBQWtEO0FBS2xEO0tBQ0ksa0JBQW9CLGlCQUF3QjtTQUF4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQU87S0FBRSxDQUFDO0tBRXhDLDhCQUFXLEdBQWxCLFVBQW1CLFFBQVE7U0FBM0IsaUJBTUM7U0FMRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDLE1BQU0sQ0FBQzthQUNILGFBQWEsRUFBRyxVQUFDLFFBQVEsSUFBSyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUM7YUFDL0UsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO1VBQ3pCO0tBQ0wsQ0FBQztLQUNNLCtCQUFZLEdBQW5CLFVBQW9CLFFBQVE7U0FDeEIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1NBQ25CLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBVSxTQUFTO1NBQzVDLFVBQVUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUMsU0FBUyxDQUFDLENBQVEsWUFBWTtTQUMvQyxVQUFVLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxDQUFNLGFBQWE7U0FDL0MsVUFBVSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBTyxhQUFhO1NBQ2hELFVBQVUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsU0FBUyxDQUFDLENBQU0sZUFBZTtTQUNqRCxVQUFVLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFPLE9BQU87U0FDeEMsVUFBVSxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsT0FBTyxDQUFDLENBQUssVUFBVTtTQUMzQyxVQUFVLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBSyxVQUFVO1NBQzNDLFVBQVUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFJLFdBQVc7U0FDNUMsVUFBVSxDQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUksUUFBUTtTQUN4QyxVQUFVLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUUsU0FBUztTQUN6QyxVQUFVLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUUsU0FBUztTQUUxQyxJQUFJLFFBQVEsR0FBTyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekQsSUFBSSxVQUFVLEdBQUcsTUFBTSxDQUFDO1NBQ3hCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUN4QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3ZCLEVBQUUsRUFBRSxRQUFRLEdBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQztpQkFDakIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDM0IsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDYixLQUFLLENBQUM7YUFDVixDQUFDO1NBQ0wsQ0FBQztTQUNELE1BQU0sQ0FBRTthQUNKLFVBQVUsRUFBRyxVQUFVO2FBQ3ZCLFFBQVEsRUFBRyxRQUFRO1VBQ3RCO0tBQ0wsQ0FBQztLQUVNLDJCQUFRLEdBQWYsVUFBZ0IsY0FBYyxFQUFHLFVBQVU7U0FDbkMsVUFBVSxHQUFHLFVBQVUsSUFBSSxTQUFTLENBQUM7U0FDckMsRUFBRSxFQUFDLGNBQWMsSUFBRSxDQUFDLENBQUM7YUFDakIsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNmLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNqQiwrQkFBK0I7U0FDL0IsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUNqQixLQUFLLE9BQU87aUJBQVksUUFBUSxHQUFFLENBQUMsQ0FBQztpQkFBQyxLQUFLLENBQUM7YUFDM0MsS0FBSyxNQUFNO2lCQUFhLFFBQVEsR0FBRSxDQUFDLENBQUM7aUJBQUMsS0FBSyxDQUFDO2FBQzNDLEtBQUssT0FBTztpQkFBWSxRQUFRLEdBQUUsQ0FBQyxDQUFDO2lCQUFDLEtBQUssQ0FBQzthQUMzQyxLQUFLLFNBQVM7aUJBQVUsUUFBUSxHQUFFLENBQUMsQ0FBQztpQkFBQyxLQUFLLENBQUM7YUFDM0MsS0FBSyxTQUFTO2lCQUFVLFFBQVEsR0FBRSxDQUFDLENBQUM7aUJBQUMsS0FBSyxDQUFDO2FBQzNDLEtBQUssY0FBYztpQkFBSyxRQUFRLEdBQUUsQ0FBQyxDQUFDO2lCQUFDLEtBQUssQ0FBQzthQUMzQztpQkFBd0IsUUFBUSxHQUFFLENBQUMsQ0FBQztpQkFBQyxLQUFLLENBQUM7U0FDL0MsQ0FBQztTQUNELHFEQUFxRDtTQUNyRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUMvRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQztTQUMxQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ2pELElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDckQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQzthQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLEVBQUUsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDM0MsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQzNELElBQUksR0FBRyxDQUFDLENBQUM7YUFDYixDQUFDO1NBQ0wsQ0FBQztTQUNELDBCQUEwQjtTQUMxQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDYixHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxJQUFFLENBQUMsQ0FBRSxHQUFHLE9BQU8sR0FBRyxRQUFRO1NBQzNELEVBQUUsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNmLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUUsQ0FBQyxDQUFFLEdBQUcsTUFBTSxHQUFHLE9BQU87U0FDM0QsQ0FBQztTQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxHQUFHLElBQUksR0FBSSxDQUFDLENBQUMsQ0FBQzthQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7aUJBQ3pCLEdBQUcsSUFBSSxJQUFJLENBQUM7YUFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDeEIsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLEdBQUUsRUFBRSxDQUFDO2FBQzdDLENBQUM7YUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDL0IsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO2FBQzlDLENBQUM7YUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDL0IsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUksRUFBRSxDQUFDO2FBQzdDLENBQUM7YUFBQyxJQUFJLENBQUMsQ0FBQztpQkFDSixHQUFHLElBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBSSxLQUFLLEdBQUcsSUFBSSxHQUFFLEVBQUUsQ0FBQztpQkFDdEQsR0FBRyxJQUFHLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7aUJBQ2pFLEdBQUcsSUFBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRSxFQUFFLENBQUM7aUJBQzNFLEdBQUcsSUFBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFFLEVBQUUsQ0FBQzthQUM1RixDQUFDO1NBQ0wsQ0FBQztTQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7S0FDZixDQUFDO0tBRVQsZUFBQztBQUFELEVBQUM7QUE5RlksaUJBQVEsV0E4RnBCO0FBb0JEO0tBMENJLHdCQUFvQixrQkFBdUI7U0ExQy9DLGlCQWdSQztTQXRPdUIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFLO1NBekNwQyxhQUFRLEdBQUcsR0FBRyxDQUFDO1NBQ2YsVUFBSyxHQUFRO2FBQ2hCLElBQUksRUFBRSxHQUFHO2FBQ1QsTUFBTSxFQUFFLElBQUk7YUFDWixLQUFLLEVBQUUsSUFBSTthQUNYLFdBQVcsRUFBRSxJQUFJO2FBQ2pCLFFBQVEsRUFBRSxJQUFJO2FBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZCxrQkFBa0IsRUFBRSxJQUFJO2FBQ3hCLG1CQUFtQixFQUFFLElBQUk7VUFDNUIsQ0FBQztTQXlCTSx1QkFBa0IsR0FBQyxLQUFLLENBQUM7U0FDekIsdUJBQWtCLEdBQUMsS0FBSyxDQUFDO1NBTTdCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBQyxLQUEyQixFQUFFLElBQXlCLEVBQUUsS0FBSzthQUN0RSxLQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBRTVDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxVQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQztpQkFDakUsS0FBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDbEIsQ0FBQyxDQUFDLENBQUM7YUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDO2lCQUNYLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmLENBQUMsQ0FBQzthQUVBLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNwQixDQUFDLENBQUM7S0FDTixDQUFDO0tBRU8sNkNBQW9CLEdBQTVCLFVBQTZCLEtBQTJCO1NBQ3BELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztTQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQztTQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQztTQUNwRSxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksY0FBYyxDQUFDLHFCQUFxQixDQUFDO1NBQ3ZGLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxjQUFjLENBQUMsaUJBQWlCLENBQUM7U0FDbkUsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztTQUNuRSxFQUFFLEVBQUUsT0FBTyxLQUFLLENBQUMsa0JBQWtCLElBQUksV0FBVyxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsSUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO2FBQ3pGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7U0FDbkMsQ0FBQztTQUFDLElBQUksQ0FBQyxDQUFDO2FBQ0gsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxjQUFjLENBQUMsc0JBQXNCLENBQUM7U0FDakcsQ0FBQztTQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFFLENBQUM7U0FDakUsRUFBRSxFQUFFLE9BQU8sS0FBSyxDQUFDLG1CQUFtQixJQUFJLFdBQVcsSUFBSSxLQUFLLENBQUMsbUJBQW1CLElBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUMzRixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1NBQ25DLENBQUM7U0FBQyxJQUFJLENBQUMsQ0FBQzthQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsbUJBQW1CLElBQUksY0FBYyxDQUFDLHNCQUFzQixDQUFDO1NBQ25HLENBQUM7S0FDTCxDQUFDO0tBQ08scUNBQVksR0FBcEIsVUFBcUIscUJBQXFCO1NBRXRDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFDLElBQUksUUFBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxRQUFRLENBQUM7U0FDN0QsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQUMsSUFBSSxRQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztTQUU3RCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBRXJGLFlBQVk7U0FDUixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDekYsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Y0FDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQztjQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUVwQixFQUFFLEVBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzthQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUN6QyxJQUFJLFlBQVksR0FBSSxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hELFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2pELFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzlFLENBQUM7U0FBQyxJQUFJLEVBQUM7YUFDSCxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQzthQUN0QixTQUFTLENBQUMsVUFBVSxDQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ25ELENBQUM7U0FDTCxhQUFhO1NBQ1QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzFGLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO2NBQ3pCLEtBQUssQ0FBQyxNQUFNLENBQUM7Y0FDYixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEIsRUFBRSxFQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7YUFDcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDekMsSUFBSSxZQUFZLEdBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoRCxVQUFVLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNsRCxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUMvRSxDQUFDO1NBQUMsSUFBSSxFQUFDO2FBQ0gsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDdkIsVUFBVSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUNyRCxDQUFDO1NBR0QsTUFBTSxDQUFDO2FBQ0gsSUFBSSxFQUFFO2lCQUNFLElBQUksRUFBRyxTQUFTO2lCQUNoQixDQUFDLEVBQUUsS0FBSztjQUNmO2FBQ0MsS0FBSyxFQUFFO2lCQUNELElBQUksRUFBRyxVQUFVO2lCQUNqQixDQUFDLEVBQUUsTUFBTTtjQUNoQjtVQUVKO0tBQ0wsQ0FBQztLQUVELHdDQUF3QztLQUN4QywyQkFBMkI7S0FDbkIsZ0RBQXVCLEdBQS9CLFVBQWdDLEdBQW1CO1NBQy9DLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FFL0QsSUFBSSxpQkFBaUIsR0FBRyxjQUFjLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUN0RCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO1NBRTlFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FFN0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2NBQ3JDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBRXJGLElBQUksY0FBYyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekUsSUFBSSxlQUFlLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUUzRSxJQUFJLGFBQWEsR0FBeUIsY0FBYyxDQUFDLElBQUksRUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztTQUNsRixJQUFJLGNBQWMsR0FBeUIsZUFBZSxDQUFDLElBQUksRUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQztTQUVwRixJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGFBQWEsR0FBRyxjQUFjLENBQUM7U0FFekYsSUFBSSxZQUFZLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ2pELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBQyxDQUFDLElBQUssUUFBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUMsRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDeEgsSUFBSSxXQUFXLEdBQVksWUFBWSxHQUFHLFVBQVUsQ0FBQztTQUNyRCxNQUFNLENBQUM7YUFDSCxXQUFXLEVBQUUsV0FBVzthQUN4QixVQUFVLEVBQUUsVUFBVTthQUN0QixXQUFXLEVBQUUsY0FBYyxDQUFDLFNBQVM7YUFDckMsWUFBWSxFQUFFLFlBQVk7VUFDN0IsQ0FBQztLQUNOLENBQUM7S0FFTSwrQkFBTSxHQUFiO1NBQUEsaUJBd0dDO1NBdkdHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQUMsQ0FBQztTQUVyRCxJQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FFbEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUUvRCxJQUFJLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBRXRELElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztTQUNqQixFQUFFLEVBQUMsb0JBQW9CLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzthQUNsQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7YUFDeEMsSUFBSSxDQUFDLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxDQUFDO2FBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQzthQUNoQixJQUFJLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxZQUFZLENBQUM7YUFDMUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7YUFDMUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0IsUUFBUSxHQUFHLEtBQUssR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUM3QixJQUFJLFlBQVksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7YUFDNUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7YUFDdkUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDO2FBQ2hFLGlCQUFpQixHQUFHLE9BQU8sR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQy9DLENBQUM7U0FFRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLGlCQUFpQixDQUFDO1NBRTlFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7U0FFN0MsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2NBQ3JDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBRXJGLElBQUksY0FBYyxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2NBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUMsZUFBZSxDQUFDO2NBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO2NBQ3JCLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztjQUNoQyxLQUFLLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBRztTQUV6RCxJQUFJLGVBQWUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztjQUNwQyxJQUFJLENBQUMsT0FBTyxFQUFDLGVBQWUsQ0FBQztjQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQyxlQUFlLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztjQUN2QixLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUM7Y0FDaEMsS0FBSyxDQUFDLFdBQVcsRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUU7U0FFeEQsSUFBSSxhQUFhLEdBQXlCLGNBQWMsQ0FBQyxJQUFJLEVBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FDbEYsSUFBSSxjQUFjLEdBQXlCLGVBQWUsQ0FBQyxJQUFJLEVBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUM7U0FFcEYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxhQUFhLEdBQUcsY0FBYyxDQUFDO1NBRXpGLElBQUksWUFBWSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNqRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBQyxJQUFLLFFBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBRXhILElBQUksaUJBQWlCLEdBQUcsb0JBQW9CLENBQUMsV0FBVztlQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsY0FBYyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxHQUFHLFVBQVU7ZUFDMUUsY0FBYyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7U0FFckMsSUFBSSxVQUFVLEdBQVcsQ0FBQyxDQUFDO1NBQzNCLElBQUksY0FBYyxHQUFXLENBQUMsWUFBWSxHQUFHLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyRixFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUcsWUFBYSxDQUFDLENBQUMsQ0FBQzthQUN2QyxVQUFVLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUM7YUFDeEQsY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7U0FDdEMsQ0FBQztTQUVELGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkUsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakYsSUFBSSxTQUFTLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEcsSUFBSSxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLFdBQVcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FFeEksSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Y0FDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Y0FDZixLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2NBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLFlBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1NBRXRFLFlBQVk7U0FDWixRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztjQUNsQixJQUFJLENBQUMsR0FBRyxFQUFFLFVBQUMsQ0FBQyxJQUFLLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQztjQUM1QyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQyxJQUFLLGtCQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO2NBQy9ELElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQztjQUN6QixJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQztjQUM3QixLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNsQyxhQUFhO1NBQ2IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Y0FDbEIsSUFBSSxDQUFDLEdBQUcsRUFBRSxVQUFDLENBQUMsSUFBSyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQTNCLENBQTJCLENBQUM7Y0FDN0MsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLENBQUMsSUFBSyxrQkFBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBekMsQ0FBeUMsQ0FBQztjQUNoRSxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsR0FBRyxjQUFjLENBQUM7Y0FDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUM7Y0FDN0IsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FFbEMsSUFBSSxTQUFTLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Y0FDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Y0FDZixLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO2NBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLFlBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDLENBQUM7U0FDOUUsU0FBUztjQUNKLE1BQU0sQ0FBQyxNQUFNLENBQUM7Y0FDZCxJQUFJLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztjQUM3QixJQUFJLENBQUMsV0FBQyxJQUFJLFFBQUMsQ0FBQyxLQUFLLEVBQVAsQ0FBTyxDQUFDO2NBQ2xCLEtBQUssQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO2NBQzNCLEtBQUssQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLFNBQVMsQ0FBQztjQUN6QyxJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2YsTUFBTSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsUUFBUSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDOUUsQ0FBQyxDQUFDLENBQUM7S0FFWCxDQUFDO0tBRU8sa0NBQVMsR0FBakIsVUFBa0IsS0FBYSxFQUFFLE1BQWM7U0FDM0MsTUFBTSxDQUFDLGVBQWEsS0FBSyxVQUFLLE1BQU0sTUFBRyxDQUFDO0tBQzVDLENBQUM7S0FsUWMsNkJBQWMsR0FBVyxHQUFHLENBQUM7S0FDN0IsNEJBQWEsR0FBVyxHQUFHLENBQUM7S0FDNUIsb0NBQXFCLEdBQVcsRUFBRSxDQUFDO0tBQ25DLGdDQUFpQixHQUFXLFNBQVMsQ0FBQztLQUN0QyxnQ0FBaUIsR0FBVyxTQUFTLENBQUM7S0FDdEMscUNBQXNCLEdBQTJCLFVBQUMsS0FBSyxJQUFLLFlBQUssRUFBTCxDQUFLLENBQUM7S0FFbEUsd0JBQVMsR0FBVyxFQUFFLENBQUM7S0FDdkIsNEJBQWEsR0FBVyxFQUFFLENBQUM7S0FDM0IscUJBQU0sR0FBVyxFQUFFLENBQUM7S0FDcEIsbUNBQW9CLEdBQVcsRUFBRSxDQUFDO0tBQ2xDLGtDQUFtQixHQUFXLENBQUMsQ0FBQztLQUNoQyx5Q0FBMEIsR0FBVyxFQUFFLENBQUM7S0F1UDNELHFCQUFDO0FBQUQsRUFBQztBQUVELFFBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUMsb0JBQW9CLEVBQUUsVUFBQyxrQkFBdUIsSUFBSyxXQUFJLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OzttQ0M1WTlJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnREFBK0M7O0FBRS9DO0FBQ0EsNENBQTJDO0FBQzNDO0FBQ0EsNERBQTJEOztBQUUzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLE1BQU0sYUFBYSxPQUFPOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQWtELHNCQUFzQjtBQUN4RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBcUIsWUFBWTtBQUNqQyx1QkFBc0I7QUFDdEIsaUNBQWdDLGtCQUFrQjtBQUNsRCw4QkFBNkIscUJBQXFCOztBQUVsRDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBbUUsZ0JBQWdCO0FBQ25GLElBQUcsV0FBVzs7QUFFZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQXlCLCtCQUErQjtBQUN4RDtBQUNBLE9BQU07QUFDTjtBQUNBLDBDQUF5QyxZQUFZO0FBQ3JEO0FBQ0EsU0FBUTtBQUNSO0FBQ0EsMENBQXlDLDBDQUEwQztBQUNuRixPQUFNO0FBQ04sMkNBQTBDO0FBQzFDO0FBQ0EsV0FBVSxHQUFHLFFBQVE7QUFDckIsUUFBTztBQUNQLDhDQUE2QyxZQUFZLDBDQUEwQyxnQ0FBZ0Msc0JBQXNCO0FBQ3pKO0FBQ0EsYUFBWSxLQUFLLE9BQU87QUFDeEIsT0FBTTs7QUFFTjtBQUNBLGlFQUFnRTtBQUNoRSxPQUFNOztBQUVOO0FBQ0EsZ0pBQStJLG1DQUFtQyxpQ0FBaUM7QUFDbk47QUFDQSwwREFBeUQ7QUFDekQsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLE9BQU07QUFDTixnQkFBZTtBQUNmLE9BQU07QUFDTiwwQ0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQSxPQUFNO0FBQ047QUFDQSxPQUFNO0FBQ04sZ0JBQWU7QUFDZixPQUFNO0FBQ047QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBLG9CQUFtQjtBQUNuQixPQUFNO0FBQ04sa0JBQWlCO0FBQ2pCLE9BQU07O0FBRU47QUFDQSxtREFBa0Q7QUFDbEQscUJBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0EsWUFBVztBQUNYLG9EQUFtRDtBQUNuRDtBQUNBLFdBQVU7QUFDVixPQUFNOztBQUVOLE9BQU07O0FBRU47QUFDQSxnQkFBZTtBQUNmLE9BQU07QUFDTjtBQUNBO0FBQ0EsT0FBTTs7O0FBR047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBbUU7QUFDbkUsMENBQXlDO0FBQ3pDLHFDQUFvQztBQUNwQyx5REFBd0Q7QUFDeEQ7QUFDQSxtQkFBa0IsR0FBRztBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOERBQTZEO0FBQzdEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixjQUFhLE1BQU07QUFDbkIsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLGdCQUFnQjtBQUM3QixjQUFhLE1BQU07QUFDbkIsY0FBYSxNQUFNO0FBQ25CLGNBQWEsT0FBTztBQUNwQixnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsY0FBYSxNQUFNO0FBQ25CLGNBQWEsT0FBTztBQUNwQixnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUErQiwyQkFBMkI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLG1DQUFtQztBQUN6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsb0JBQW9CO0FBQ2pDLGNBQWEsU0FBUztBQUN0QixjQUFhLE1BQU07QUFDbkIsZ0JBQWUsb0JBQW9CO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxvQkFBb0I7QUFDakMsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsT0FBTztBQUNwQixnQkFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBLG1CQUFrQixpQ0FBaUMsRUFBRTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQSxnQkFBZSx1Q0FBdUM7QUFDdEQ7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBa0IsNkJBQTZCLEVBQUU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBLGNBQWEsaUNBQWlDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixnQkFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmLGVBQWM7QUFDZCxlQUFjO0FBQ2QsaUJBQWdCO0FBQ2hCLGdCQUFlO0FBQ2Y7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQSxnQkFBZSxnQkFBZ0IsR0FBRyxZQUFZO0FBQzlDLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQSxrQkFBaUI7QUFDakIsc0JBQXFCLG9DQUFvQztBQUN6RCxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDO0FBQzVDLFdBQVU7QUFDViw0RUFBMkU7QUFDM0UseUZBQXdGO0FBQ3hGLFdBQVUsd0VBQXdFO0FBQ2xGLDBDQUF5QztBQUN6QyxXQUFVO0FBQ1Y7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixjQUFhLFFBQVE7QUFDckIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsTUFBTTtBQUNuQixlQUFjLE1BQU07QUFDcEIsZUFBYyxNQUFNO0FBQ3BCLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0EsU0FBUSwyQkFBMkI7QUFDbkMsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixjQUFhLFNBQVM7QUFDdEIsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0EsU0FBUSwyQkFBMkI7QUFDbkMsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsZUFBYyxPQUFPO0FBQ3JCO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCLHdCQUF1QixvQ0FBb0M7QUFDM0QsYUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixnQkFBZSxNQUFNO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE9BQU87QUFDcEIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0EsYUFBWSx5QkFBeUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0EsaUJBQWdCLG9DQUFvQztBQUNwRCxhQUFZLG9DQUFvQztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLG9CQUFvQjtBQUNqQyxnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixjQUFhLE1BQU07QUFDbkIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsTUFBTTtBQUNuQixlQUFjLE9BQU87QUFDckIsZUFBYyxPQUFPO0FBQ3JCLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQixrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7O0FDL2hLRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBMkMsaUJBQWlCOztBQUU1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7Ozs7QUMzRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNEIsVUFBVSIsImZpbGUiOiIwM2U4ZDM5YzdlZGIyMjcxODdiMy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMDNlOGQzOWM3ZWRiMjI3MTg3YjNcbiAqKi8iLCJcclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lU3BhbiB7XHJcbiAgICBjb25zdHJ1Y3RvciAocHVibGljIHRpbWVTcGFuSW5TZWNvbmRzOm51bWJlcil7fVxyXG5cclxuICAgIHB1YmxpYyBnZXRGb3JtYXRlcihtYXhTdGVwcyk6YW55IHtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5maW5kVGltZVN0ZXAobWF4U3RlcHMpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZvcm1hdEhhbmRsZXIgOiAodGltZVNwYW4pPT4ge3JldHVybiB0aGlzLnRvU3RyaW5nKHRpbWVTcGFuICwgcmVzLnJlc29sdXRpb24pIH0sXHJcbiAgICAgICAgICAgIHN0ZXBTaXplIDpyZXMuc3RlcFNpemVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZmluZFRpbWVTdGVwKG1heFN0ZXBzKTphbnkge1xyXG4gICAgICAgIHZhciB2YWxpZFN0ZXBzID0ge307XHJcbiAgICAgICAgIHZhbGlkU3RlcHNbNjBdPVwic2Vjb25kc1wiOyAgICAgICAgIFx0Ly8gbWludXRlXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbNSo2MF09XCJtaW51dGVzXCI7ICAgICAgIFx0Ly8gNSBtaW51dGVzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMTAqNjBdPVwibWludXRlc1wiOyAgICAgXHQvLyAxMCBtaW51dGVzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMTUqNjBdPVwibWludXRlc1wiOyAgICAgIFx0Ly8gMTUgbWludXRlc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzMwKjYwXT1cIm1pbnV0ZXNcIjsgICAgIFx0Ly8gaGFsZiBhbiBob3VyXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbNjAqNjBdPVwiaG91cnNcIjsgICAgICBcdC8vIGhvdXJcclxuICAgICAgICAgdmFsaWRTdGVwc1syKjYwKjYwXT1cImhvdXJzXCI7ICAgIFx0Ly8gMiBob3Vyc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzgqNjAqNjBdPVwiaG91cnNcIjsgICAgXHQvLyA4IGhvdXJzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMTIqNjAqNjBdPVwiaG91cnNcIjsgICBcdC8vIDEyIGhvdXJzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMjQqNjAqNjBdPVwiZGF5c1wiOyAgIFx0Ly8gMSBkYXlcclxuICAgICAgICAgdmFsaWRTdGVwc1syKjI0KjYwKjYwXT1cImRheXNcIjsgXHQvLyAyIGRheXNcclxuICAgICAgICAgdmFsaWRTdGVwc1s3KjI0KjI0KjYwXT1cImRheXNcIjsgXHQvLyAxIHdlZWtcclxuXHJcbiAgICAgICAgdmFyIGludGVydmFsOmFueSA9IHRoaXMudGltZVNwYW5JblNlY29uZHMgLyAobWF4U3RlcHMrMSk7XHJcbiAgICAgICAgdmFyIHJlc29sdXRpb24gPSBcImRheXNcIjtcclxuICAgICAgICB2YXIgc3RlcFNpemUgPSBpbnRlcnZhbDtcclxuICAgICAgICBmb3IgKHZhciBzIGluIHZhbGlkU3RlcHMpIHtcclxuICAgICAgICAgICAgaWYoIGludGVydmFsIDwgIHMgKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uID0gdmFsaWRTdGVwc1tzXTtcclxuICAgICAgICAgICAgICAgIHN0ZXBTaXplID0gcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICByZXNvbHV0aW9uIDogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgc3RlcFNpemUgOiBzdGVwU2l6ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoaW5wdXRJblNlY29uZHMgLCByZXNvbHV0aW9uKSB7XHJcbiAgICAgICAgICAgIHJlc29sdXRpb24gPSByZXNvbHV0aW9uIHx8IFwic2Vjb25kc1wiO1xyXG4gICAgICAgICAgICB2YXIgcmVzRGVwdGggPSAwO1xyXG4gICAgICAgICAgICAvLyAtLS0gbWFwIHJlc29sdXRpb24gdG8gbnVtYmVyXHJcbiAgICAgICAgICAgIHN3aXRjaCAocmVzb2x1dGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIndlZWtzXCI6ICAgICAgICAgICByZXNEZXB0aCA9MjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGF5c1wiOiAgICAgICAgICAgIHJlc0RlcHRoID0zOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJob3Vyc1wiOiAgICAgICAgICAgcmVzRGVwdGggPTQ7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1pbnV0ZXNcIjogICAgICAgICByZXNEZXB0aCA9NTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2Vjb25kc1wiOiAgICAgICAgIHJlc0RlcHRoID02OyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtaWxsaXNlY29uZHNcIjogICAgcmVzRGVwdGggPTc7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmVzRGVwdGggPTY7IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIC0tLSBDYWxjdWxhdGUgc2Vjb25kcy9taW51dGVzL2hvdXJzL2RheXMvd2Vla3MvLi4uXHJcbiAgICAgICAgICAgIHZhciBtc2VjID0gTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyoxMDAwIC0gTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcykgKiAxMDAwKTtcclxuICAgICAgICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgJSA2MCk7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSAoTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAvIDYwKSkgJSA2MDtcclxuICAgICAgICAgICAgdmFyIGhvdXJzID0gKE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgLyAzNjAwKSkgJSAyNDtcclxuICAgICAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzIC8gKDI0ICogMzYwMCkpO1xyXG4gICAgICAgICAgICB2YXIgd2Vla3MgPSAwO1xyXG4gICAgICAgICAgICBpZiAoZGF5cyA+IDcgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF5cyA9PT0gNyB8fCBkYXlzID09PSAxNCB8fCBkYXlzID09PSAyOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlZWtzID0gKE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgLyAoNyAqIDI0ICogMzYwMCkpKSAlIDc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gLS0tIEJ1aWxkIHJldHVybiBzdHJpbmdcclxuICAgICAgICAgICAgdmFyIHJlcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlcyArPSAod2Vla3MgPD0gMSkgPyBcIlwiIDogKHdlZWtzPT0xICkgPyBcIndlZWsgXCIgOiBcIndlZWtzIFwiXHJcbiAgICAgICAgICAgIGlmKCByZXNEZXB0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHJlcyArPSAoZGF5cyA8PSAxKSA/IFwiXCIgOiAoZGF5cz09MSApID8gXCJkYXkgXCIgOiBcImRheXMgXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaG91cnMgfHwgbWluIHx8IHNlYyApIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXlzID4gMCAmJiByZXNEZXB0aCA+IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IFwiLCBcIjtcclxuICAgICAgICAgICAgICAgIGlmIChob3VycyAmJiAhbWluICYmICFzZWMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gKHJlc0RlcHRoID4gMykgPyBob3VycyArIFwiaCBcIiA6XCJcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWhvdXJzICYmIG1pbiAmJiAhc2VjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IChyZXNEZXB0aCA+IDQpID8gbWluICsgXCJtaW4gXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaG91cnMgJiYgIW1pbiAmJiBzZWMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gKHJlc0RlcHRoID4gNSkgPyBzZWMgKyBcInMgXCIgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9KHJlc0RlcHRoID4gMyAmJiBob3VycyA+IDApID8gIGhvdXJzICsgXCJoIFwiIDpcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPShyZXNEZXB0aCA+IDQgJiYgKG1pbiA+IDAgfHwgaG91cnMgPiAwKSkgPyBtaW4gKyBcIm0gXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPShyZXNEZXB0aCA+IDUgJiYgKHNlYyA+IDAgfHwgbWluID4gMCB8fCBob3VycyA+IDApKSA/IHNlYyArIFwicyBcIjogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0ocmVzRGVwdGggPiA2ICYmIChtc2VjID4gMCB8fCBzZWMgPiAwIHx8IG1pbiA+IDAgfHwgaG91cnMgPiAwKSkgPyBtc2VjICsgXCJtc1wiOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG5cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwL3NlcnZpY2UvdGltZVNwYW4udHNcbiAqKi8iLCJpbXBvcnQgeyBTZWxlY3Rpb24gfSBmcm9tICdkMyc7XHJcbmltcG9ydCAqIGFzIG5nIGZyb20gJ2FuZ3VsYXInO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbi8vaW1wb3J0IHtUaW1lU3Bhbn0gZnJvbSAnLi4vLi4vc2VydmljZS90aW1lU3Bhbic7XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVNwYW4ge1xyXG4gICAgY29uc3RydWN0b3IgKHB1YmxpYyB0aW1lU3BhbkluU2Vjb25kczpudW1iZXIpe31cclxuXHJcbiAgICBwdWJsaWMgZ2V0Rm9ybWF0ZXIobWF4U3RlcHMpOmFueSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHRoaXMuZmluZFRpbWVTdGVwKG1heFN0ZXBzKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmb3JtYXRIYW5kbGVyIDogKHRpbWVTcGFuKT0+IHtyZXR1cm4gdGhpcy50b1N0cmluZyh0aW1lU3BhbiAsIHJlcy5yZXNvbHV0aW9uKSB9LFxyXG4gICAgICAgICAgICBzdGVwU2l6ZSA6cmVzLnN0ZXBTaXplXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGZpbmRUaW1lU3RlcChtYXhTdGVwcyk6YW55IHtcclxuICAgICAgICB2YXIgdmFsaWRTdGVwcyA9IHt9O1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzYwXT1cInNlY29uZHNcIjsgICAgICAgICBcdC8vIG1pbnV0ZVxyXG4gICAgICAgICB2YWxpZFN0ZXBzWzUqNjBdPVwibWludXRlc1wiOyAgICAgICBcdC8vIDUgbWludXRlc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzEwKjYwXT1cIm1pbnV0ZXNcIjsgICAgIFx0Ly8gMTAgbWludXRlc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzE1KjYwXT1cIm1pbnV0ZXNcIjsgICAgICBcdC8vIDE1IG1pbnV0ZXNcclxuICAgICAgICAgdmFsaWRTdGVwc1szMCo2MF09XCJtaW51dGVzXCI7ICAgICBcdC8vIGhhbGYgYW4gaG91clxyXG4gICAgICAgICB2YWxpZFN0ZXBzWzYwKjYwXT1cImhvdXJzXCI7ICAgICAgXHQvLyBob3VyXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMio2MCo2MF09XCJob3Vyc1wiOyAgICBcdC8vIDIgaG91cnNcclxuICAgICAgICAgdmFsaWRTdGVwc1s4KjYwKjYwXT1cImhvdXJzXCI7ICAgIFx0Ly8gOCBob3Vyc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzEyKjYwKjYwXT1cImhvdXJzXCI7ICAgXHQvLyAxMiBob3Vyc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzI0KjYwKjYwXT1cImRheXNcIjsgICBcdC8vIDEgZGF5XHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMioyNCo2MCo2MF09XCJkYXlzXCI7IFx0Ly8gMiBkYXlzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbNyoyNCoyNCo2MF09XCJkYXlzXCI7IFx0Ly8gMSB3ZWVrXHJcblxyXG4gICAgICAgIHZhciBpbnRlcnZhbDphbnkgPSB0aGlzLnRpbWVTcGFuSW5TZWNvbmRzIC8gKG1heFN0ZXBzKzEpO1xyXG4gICAgICAgIHZhciByZXNvbHV0aW9uID0gXCJkYXlzXCI7XHJcbiAgICAgICAgdmFyIHN0ZXBTaXplID0gaW50ZXJ2YWw7XHJcbiAgICAgICAgZm9yICh2YXIgcyBpbiB2YWxpZFN0ZXBzKSB7XHJcbiAgICAgICAgICAgIGlmKCBpbnRlcnZhbCA8ICBzICkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x1dGlvbiA9IHZhbGlkU3RlcHNbc107XHJcbiAgICAgICAgICAgICAgICBzdGVwU2l6ZSA9IHM7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gIHtcclxuICAgICAgICAgICAgcmVzb2x1dGlvbiA6IHJlc29sdXRpb24sXHJcbiAgICAgICAgICAgIHN0ZXBTaXplIDogc3RlcFNpemVcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKGlucHV0SW5TZWNvbmRzICwgcmVzb2x1dGlvbik6c3RyaW5nIHtcclxuICAgICAgICAgICAgcmVzb2x1dGlvbiA9IHJlc29sdXRpb24gfHwgXCJzZWNvbmRzXCI7XHJcbiAgICAgICAgICAgIGlmKGlucHV0SW5TZWNvbmRzPD0wKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiMFwiO1xyXG4gICAgICAgICAgICB2YXIgcmVzRGVwdGggPSAwO1xyXG4gICAgICAgICAgICAvLyAtLS0gbWFwIHJlc29sdXRpb24gdG8gbnVtYmVyXHJcbiAgICAgICAgICAgIHN3aXRjaCAocmVzb2x1dGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIndlZWtzXCI6ICAgICAgICAgICByZXNEZXB0aCA9MjsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZGF5c1wiOiAgICAgICAgICAgIHJlc0RlcHRoID0zOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJob3Vyc1wiOiAgICAgICAgICAgcmVzRGVwdGggPTQ7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1pbnV0ZXNcIjogICAgICAgICByZXNEZXB0aCA9NTsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwic2Vjb25kc1wiOiAgICAgICAgIHJlc0RlcHRoID02OyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJtaWxsaXNlY29uZHNcIjogICAgcmVzRGVwdGggPTc7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogICAgICAgICAgICAgICAgcmVzRGVwdGggPTY7IGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIC0tLSBDYWxjdWxhdGUgc2Vjb25kcy9taW51dGVzL2hvdXJzL2RheXMvd2Vla3MvLi4uXHJcbiAgICAgICAgICAgIHZhciBtc2VjID0gTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyoxMDAwIC0gTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcykgKiAxMDAwKTtcclxuICAgICAgICAgICAgdmFyIHNlYyA9IE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgJSA2MCk7XHJcbiAgICAgICAgICAgIHZhciBtaW4gPSAoTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAvIDYwKSkgJSA2MDtcclxuICAgICAgICAgICAgdmFyIGhvdXJzID0gKE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgLyAzNjAwKSkgJSAyNDtcclxuICAgICAgICAgICAgdmFyIGRheXMgPSBNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzIC8gKDI0ICogMzYwMCkpO1xyXG4gICAgICAgICAgICB2YXIgd2Vla3MgPSAwO1xyXG4gICAgICAgICAgICBpZiAoZGF5cyA+IDcgKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF5cyA9PT0gNyB8fCBkYXlzID09PSAxNCB8fCBkYXlzID09PSAyOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdlZWtzID0gKE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgLyAoNyAqIDI0ICogMzYwMCkpKSAlIDc7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF5cyA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gLS0tIEJ1aWxkIHJldHVybiBzdHJpbmdcclxuICAgICAgICAgICAgdmFyIHJlcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlcyArPSAod2Vla3MgPD0gMSkgPyBcIlwiIDogKHdlZWtzPT0xICkgPyBcIndlZWsgXCIgOiBcIndlZWtzIFwiXHJcbiAgICAgICAgICAgIGlmKCByZXNEZXB0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHJlcyArPSAoZGF5cyA8PSAxKSA/IFwiXCIgOiAoZGF5cz09MSApID8gXCJkYXkgXCIgOiBcImRheXMgXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaG91cnMgfHwgbWluIHx8IHNlYyApIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXlzID4gMCAmJiByZXNEZXB0aCA+IDMpXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IFwiLCBcIjtcclxuICAgICAgICAgICAgICAgIGlmIChob3VycyAmJiAhbWluICYmICFzZWMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gKHJlc0RlcHRoID4gMykgPyBob3VycyArIFwiaCBcIiA6XCJcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWhvdXJzICYmIG1pbiAmJiAhc2VjKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9IChyZXNEZXB0aCA+IDQpID8gbWluICsgXCJtaW4gXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaG91cnMgJiYgIW1pbiAmJiBzZWMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gKHJlc0RlcHRoID4gNSkgPyBzZWMgKyBcInMgXCIgIDogXCJcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9KHJlc0RlcHRoID4gMyAmJiBob3VycyA+IDApID8gIGhvdXJzICsgXCJoIFwiIDpcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPShyZXNEZXB0aCA+IDQgJiYgKG1pbiA+IDAgfHwgaG91cnMgPiAwKSkgPyBtaW4gKyBcIm0gXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPShyZXNEZXB0aCA+IDUgJiYgKHNlYyA+IDAgfHwgbWluID4gMCB8fCBob3VycyA+IDApKSA/IHNlYyArIFwicyBcIjogXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0ocmVzRGVwdGggPiA2ICYmIChtc2VjID4gMCB8fCBzZWMgPiAwIHx8IG1pbiA+IDAgfHwgaG91cnMgPiAwKSkgPyBtc2VjICsgXCJtc1wiOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmludGVyZmFjZSBJRDNEdWFsQmFyQ2hhcnRFbnRyeSB7XHJcbiAgICB2YWx1ZU9uZTogbnVtYmVyO1xyXG4gICAgdmFsdWVUd286IG51bWJlcjtcclxuICAgIGxhYmVsOiBzdHJpbmc7XHJcbn1cclxuXHJcbmludGVyZmFjZSBJRDNEdWFsQmFyQ2hhcnRTY29wZSBleHRlbmRzIG5nLklTY29wZSB7XHJcbiAgICBkYXRhOiBJRDNEdWFsQmFyQ2hhcnRFbnRyeVtdO1xyXG4gICAgaGVpZ2h0Pzogc3RyaW5nO1xyXG4gICAgd2lkdGg/OiBzdHJpbmc7XHJcbiAgICBtYXhCYXJXaWR0aD86IHN0cmluZztcclxuICAgIGNvbG9yT25lPzogc3RyaW5nO1xyXG4gICAgY29sb3JUd28/OiBzdHJpbmc7XHJcbiAgICBsZWZ0WUF4aXNGb3JtYXR0ZXI6IGFueTtcclxuICAgIHJpZ2h0WUF4aXNGb3JtYXR0ZXI6IGFueTtcclxufVxyXG5cclxuY2xhc3MgRDNEdWFsQmFyQ2hhcnQge1xyXG4gICAgcHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgcHVibGljIHNjb3BlOiBhbnkgPSB7XHJcbiAgICAgICAgZGF0YTogJz0nLFxyXG4gICAgICAgIGhlaWdodDogJz0/JyxcclxuICAgICAgICB3aWR0aDogJz0/JyxcclxuICAgICAgICBtYXhCYXJXaWR0aDogJ0A/JyxcclxuICAgICAgICBjb2xvck9uZTogJ0A/JyxcclxuICAgICAgICBjb2xvclR3bzogJ0A/JyxcclxuICAgICAgICBsZWZ0WUF4aXNGb3JtYXR0ZXI6ICc9PycsXHJcbiAgICAgICAgcmlnaHRZQXhpc0Zvcm1hdHRlcjogJz0/J1xyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBERUZBVUxUX0hFSUdIVDogbnVtYmVyID0gNTAwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9XSURUSDogbnVtYmVyID0gNTAwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9NQVhfQkFSX1dJRFRIOiBudW1iZXIgPSA1MDtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfQ09MT1JfT05FOiBzdHJpbmcgPSBcIiNmZGI4MWVcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfQ09MT1JfVFdPOiBzdHJpbmcgPSBcIiM0ODY5ODNcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfQVhJU19GT1JNQVRURVI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmcgPSAodmFsdWUpID0+IHZhbHVlO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBGT05UX1NJWkU6IG51bWJlciA9IDE1O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgWV9BWElTX01BUkdJTjogbnVtYmVyID0gNDA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBNQVJHSU46IG51bWJlciA9IDE1O1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgTEFCRUxfUk9UQVRJT05fQU5HTEU6IG51bWJlciA9IDQwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgTUlOSU1VTV9CQVJfU1BBQ0lORzogbnVtYmVyID0gMjtcclxuICAgIHByaXZhdGUgc3RhdGljIE5VTUJFUl9PRl9TVEVQU19SSUdIVF9BWElTOiBudW1iZXIgPSAxMDtcclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgZGF0YTogSUQzRHVhbEJhckNoYXJ0RW50cnlbXTtcclxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1heEJhcldpZHRoOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbG9yT25lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGNvbG9yVHdvOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGxlZnRZQXhpc0Zvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcclxuICAgIHByaXZhdGUgcmlnaHRZQXhpc0Zvcm1hdHRlcjogKHZhbHVlOiBhbnkpID0+IHN0cmluZztcclxuICAgIHByaXZhdGUgaXNWYWx1ZU9uZVRpbWVTcGFuPWZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc1ZhbHVlVHdvVGltZVNwYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIHN2ZzogZDMuU2VsZWN0aW9uPGFueT47XHJcblxyXG4gICAgcHVibGljIGxpbms6IChzY29wZTogSUQzRHVhbEJhckNoYXJ0U2NvcGUsIGVsZW06IG5nLklBdWdtZW50ZWRKUXVlcnksIGF0dHJzKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZDNVdGlsaXRpZXNTZXJ2aWNlOiBhbnkpIHsgXHJcbiAgICAgICAgdGhpcy5saW5rID0gKHNjb3BlOiBJRDNEdWFsQmFyQ2hhcnRTY29wZSwgZWxlbTogbmcuSUF1Z21lbnRlZEpRdWVyeSwgYXR0cnMpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zdmcgPSBkMy5zZWxlY3QoZWxlbVswXSkuYXBwZW5kKCdzdmcnKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVBhcmFtZXRlcnMoc2NvcGUpO1xyXG4gICAgICAgICAgICBzY29wZS4kd2F0Y2hHcm91cChbJ2hlaWdodCcsICd3aWR0aCcsICdkYXRhJ10sIChuZXdWYWx1ZSwgb2xkVmFsdWUsIHMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVBhcmFtZXRlcnMoc2NvcGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBlbGVtLnJlc2l6ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplUGFyYW1ldGVycyhzY29wZTogSUQzRHVhbEJhckNoYXJ0U2NvcGUpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBzY29wZS5kYXRhO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcGFyc2VJbnQoc2NvcGUuaGVpZ2h0KSB8fCBEM0R1YWxCYXJDaGFydC5ERUZBVUxUX0hFSUdIVDtcclxuICAgICAgICB0aGlzLndpZHRoID0gcGFyc2VJbnQoc2NvcGUud2lkdGgpIHx8IEQzRHVhbEJhckNoYXJ0LkRFRkFVTFRfSEVJR0hUO1xyXG4gICAgICAgIHRoaXMubWF4QmFyV2lkdGggPSBwYXJzZUludChzY29wZS5tYXhCYXJXaWR0aCkgfHwgRDNEdWFsQmFyQ2hhcnQuREVGQVVMVF9NQVhfQkFSX1dJRFRIO1xyXG4gICAgICAgIHRoaXMuY29sb3JPbmUgPSBzY29wZS5jb2xvck9uZSB8fCBEM0R1YWxCYXJDaGFydC5ERUZBVUxUX0NPTE9SX09ORTtcclxuICAgICAgICB0aGlzLmNvbG9yVHdvID0gc2NvcGUuY29sb3JUd28gfHwgRDNEdWFsQmFyQ2hhcnQuREVGQVVMVF9DT0xPUl9UV087XHJcbiAgICAgICAgaWYoIHR5cGVvZiBzY29wZS5sZWZ0WUF4aXNGb3JtYXR0ZXIgIT0gJ3VuZGVmaW5lZCcgJiYgc2NvcGUubGVmdFlBeGlzRm9ybWF0dGVyPT1cInRpbWVzcGFuXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1ZhbHVlT25lVGltZVNwYW4gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICB0aGlzLmxlZnRZQXhpc0Zvcm1hdHRlciA9IHNjb3BlLmxlZnRZQXhpc0Zvcm1hdHRlciB8fCBEM0R1YWxCYXJDaGFydC5ERUZBVUxUX0FYSVNfRk9STUFUVEVSO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcInNob3cgbXkgdGltZXNwYW4gc3R1ZmZcIixzY29wZS5yaWdodFlBeGlzRm9ybWF0dGVyICk7XHJcbiAgICAgICAgaWYoIHR5cGVvZiBzY29wZS5yaWdodFlBeGlzRm9ybWF0dGVyICE9ICd1bmRlZmluZWQnICYmIHNjb3BlLnJpZ2h0WUF4aXNGb3JtYXR0ZXI9PVwidGltZXNwYW5cIikge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmFsdWVUd29UaW1lU3BhbiA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgIHRoaXMucmlnaHRZQXhpc0Zvcm1hdHRlciA9IHNjb3BlLnJpZ2h0WUF4aXNGb3JtYXR0ZXIgfHwgRDNEdWFsQmFyQ2hhcnQuREVGQVVMVF9BWElTX0ZPUk1BVFRFUjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIEdldEJvdGhZQXhpcyhjYWxjdWxhdGVkR3JhcGhIZWlnaHQpIHtcclxuXHJcbiAgICAgICAgdmFyIG1heFZhbHVlT25lID0gXy5tYXgodGhpcy5kYXRhLCB2ID0+IHYudmFsdWVPbmUpLnZhbHVlT25lO1xyXG4gICAgICAgIHZhciBtYXhWYWx1ZVR3byA9IF8ubWF4KHRoaXMuZGF0YSwgdiA9PiB2LnZhbHVlVHdvKS52YWx1ZVR3bztcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3RlcHMgPSBNYXRoLmZsb29yKGNhbGN1bGF0ZWRHcmFwaEhlaWdodCAvICgyLjMgKiBEM0R1YWxCYXJDaGFydC5GT05UX1NJWkUpKTtcclxuICAgIFxyXG4gICAgLy8gTEVGVCBBWElTXHJcbiAgICAgICAgdmFyIGxlZnRZID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoW2NhbGN1bGF0ZWRHcmFwaEhlaWdodCwgMF0pLmRvbWFpbihbMCwgbWF4VmFsdWVPbmVdKTtcclxuICAgICAgICB2YXIgbGVmdFlBeGlzID0gZDMuc3ZnLmF4aXMoKVxyXG4gICAgICAgICAgICAuc2NhbGUobGVmdFkpXHJcbiAgICAgICAgICAgIC5vcmllbnQoXCJsZWZ0XCIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuaXNWYWx1ZU9uZVRpbWVTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZVNwYW4gPSBuZXcgVGltZVNwYW4obWF4VmFsdWVUd28pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVJbnRlcnZhbCAgPSB0aW1lU3Bhbi5nZXRGb3JtYXRlcihzdGVwcyk7XHJcbiAgICAgICAgICAgICAgICBsZWZ0WUF4aXMudGlja0Zvcm1hdCh0aW1lSW50ZXJ2YWwuZm9ybWF0SGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICBsZWZ0WUF4aXMudGlja1ZhbHVlcyhkMy5yYW5nZSgwLCBtYXhWYWx1ZVR3bywgdGltZUludGVydmFsLnN0ZXBTaXplKSk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICBsZWZ0WUF4aXMudGlja3Moc3RlcHMpXHJcbiAgICAgICAgICAgIGxlZnRZQXhpcy50aWNrRm9ybWF0KCB0aGlzLmxlZnRZQXhpc0Zvcm1hdHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgLy8gUklHSFQgQVhJU1xyXG4gICAgICAgIHZhciByaWdodFkgPSBkMy5zY2FsZS5saW5lYXIoKS5yYW5nZShbY2FsY3VsYXRlZEdyYXBoSGVpZ2h0LCAwXSkuZG9tYWluKFswLCBtYXhWYWx1ZVR3b10pO1xyXG4gICAgICAgIHZhciByaWdodFlBeGlzID0gZDMuc3ZnLmF4aXMoKVxyXG4gICAgICAgICAgICAuc2NhbGUocmlnaHRZKVxyXG4gICAgICAgICAgICAub3JpZW50KFwicmlnaHRcIik7XHJcbiAgICAgICBpZih0aGlzLmlzVmFsdWVUd29UaW1lU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTcGFuID0gbmV3IFRpbWVTcGFuKG1heFZhbHVlVHdvKTtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lSW50ZXJ2YWwgID0gdGltZVNwYW4uZ2V0Rm9ybWF0ZXIoc3RlcHMpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRZQXhpcy50aWNrRm9ybWF0KHRpbWVJbnRlcnZhbC5mb3JtYXRIYW5kbGVyKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0WUF4aXMudGlja1ZhbHVlcyhkMy5yYW5nZSgwLCBtYXhWYWx1ZVR3bywgdGltZUludGVydmFsLnN0ZXBTaXplKSk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICByaWdodFlBeGlzLnRpY2tzKHN0ZXBzKVxyXG4gICAgICAgICAgICByaWdodFlBeGlzLnRpY2tGb3JtYXQoIHRoaXMucmlnaHRZQXhpc0Zvcm1hdHRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVmdDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXMgOiBsZWZ0WUF4aXMsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogbGVmdFlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICByaWdodDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGF4aXMgOiByaWdodFlBeGlzLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IHJpZ2h0WVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGR1cGxpY2F0ZSBjb2RlIG9mIHRoZSByZW5kZXIgZnVuY3Rpb25cclxuICAgIC8vIHNob3VsZCBiZSBtb3JlIHJldXNlYWJsZVxyXG4gICAgcHJpdmF0ZSBnZXRSb3RhdGlvbk1lYXN1cmVtZW50cyhzdmc6IFNlbGVjdGlvbjxhbnk+KSB7IFxyXG4gICAgICAgIHRoaXMuc3ZnLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luTGFiZWxIZWlnaHQgPSBEM0R1YWxCYXJDaGFydC5GT05UX1NJWkUgKyAxMDtcclxuICAgICAgICB2YXIgZ3JhcGhIZWlnaHQgPSB0aGlzLmhlaWdodCAtIEQzRHVhbEJhckNoYXJ0Lk1BUkdJTiAqIDIgLSBtYXJnaW5MYWJlbEhlaWdodDtcclxuXHJcbiAgICAgICAgdmFyIFlBeGlzZXMgPSB0aGlzLkdldEJvdGhZQXhpcyhncmFwaEhlaWdodCk7XHJcblxyXG4gICAgICAgIHZhciBtYXJnaW5Db250YWluZXIgPSB0aGlzLnN2Zy5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgdGhpcy50cmFuc2xhdGUoRDNEdWFsQmFyQ2hhcnQuTUFSR0lOLCBEM0R1YWxCYXJDaGFydC5NQVJHSU4pKTtcclxuXHJcbiAgICAgICAgdmFyIGxlZnRZQXhpc0dyb3VwID0gbWFyZ2luQ29udGFpbmVyLmFwcGVuZCgnZycpLmNhbGwoWUF4aXNlcy5sZWZ0LmF4aXMpO1xyXG4gICAgICAgIHZhciByaWdodFlBeGlzR3JvdXAgPSBtYXJnaW5Db250YWluZXIuYXBwZW5kKCdnJykuY2FsbChZQXhpc2VzLnJpZ2h0LmF4aXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBsZWZ0QXhpc1dpZHRoID0gKDxTVkdTVkdFbGVtZW50Pig8YW55PmxlZnRZQXhpc0dyb3VwLm5vZGUoKSkpLmdldEJCb3goKS53aWR0aDtcclxuICAgICAgICB2YXIgcmlnaHRBeGlzV2lkdGggPSAoPFNWR1NWR0VsZW1lbnQ+KDxhbnk+cmlnaHRZQXhpc0dyb3VwLm5vZGUoKSkpLmdldEJCb3goKS53aWR0aDsgICAgICAgXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB2YXIgZ3JhcGhXaWR0aCA9IHRoaXMud2lkdGggLSBEM0R1YWxCYXJDaGFydC5NQVJHSU4gKiAyIC0gbGVmdEF4aXNXaWR0aCAtIHJpZ2h0QXhpc1dpZHRoO1xyXG5cclxuICAgICAgICB2YXIgZHVhbEJhcldpZHRoID0gZ3JhcGhXaWR0aCAvIHRoaXMuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgdmFyIGxhYmVsV2lkdGggPSB0aGlzLmQzVXRpbGl0aWVzU2VydmljZS5nZXRNYXhXaWR0aE9mVGV4dHMoJC5tYXAodGhpcy5kYXRhLCAoZCkgPT4gZC5sYWJlbCksIEQzRHVhbEJhckNoYXJ0LkZPTlRfU0laRSk7XHJcbiAgICAgICAgdmFyIHJvdGF0ZUxhYmVsOiBib29sZWFuID0gZHVhbEJhcldpZHRoIDwgbGFiZWxXaWR0aDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb3RhdGVMYWJlbDogcm90YXRlTGFiZWwsXHJcbiAgICAgICAgICAgIGxhYmVsV2lkdGg6IGxhYmVsV2lkdGgsXHJcbiAgICAgICAgICAgIGxhYmVsSGVpZ3RoOiBEM0R1YWxCYXJDaGFydC5GT05UX1NJWkUsXHJcbiAgICAgICAgICAgIGR1YWxCYXJXaWR0aDogZHVhbEJhcldpZHRoXHJcbiAgICAgICAgfTsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEpIHsgdGhyb3cgbmV3IEVycm9yKFwiTm8gZGF0YSBnaXZlblwiKTsgfVxyXG5cclxuICAgICAgICB2YXIgcm90YXRpb25NZWFzdXJlbWVudHMgPSB0aGlzLmdldFJvdGF0aW9uTWVhc3VyZW1lbnRzKHRoaXMuc3ZnKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdmcuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7IFxyXG4gICAgICAgIHRoaXMuc3ZnLmF0dHIoJ3dpZHRoJywgdGhpcy53aWR0aCkuYXR0cignaGVpZ2h0JywgdGhpcy5oZWlnaHQpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luTGFiZWxIZWlnaHQgPSBEM0R1YWxCYXJDaGFydC5GT05UX1NJWkUgKyAxMDtcclxuXHJcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gMDtcclxuICAgICAgICBpZihyb3RhdGlvbk1lYXN1cmVtZW50cy5yb3RhdGVMYWJlbCkge1xyXG4gICAgICAgICAgICB2YXIgYSA9IHJvdGF0aW9uTWVhc3VyZW1lbnRzLmxhYmVsV2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBiID0gcm90YXRpb25NZWFzdXJlbWVudHMubGFiZWxIZWlndGg7XHJcbiAgICAgICAgICAgIHZhciBjID0gYSphK2IqYjtcclxuICAgICAgICAgICAgdmFyIHogPSByb3RhdGlvbk1lYXN1cmVtZW50cy5kdWFsQmFyV2lkdGg7XHJcbiAgICAgICAgICAgIHZhciB4ID0gKHoqKGEqYSkrTWF0aC5zcXJ0KE1hdGguYWJzKGMtTWF0aC5wb3coeiwgMikpKSkvYztcclxuICAgICAgICAgICAgdmFyIGFscGhhID0gTWF0aC5hY29zKHgvYSk7XHJcbiAgICAgICAgICAgIHJvdGF0aW9uID0gYWxwaGEqMTgwL01hdGguUEk7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZVJhZGlhbnMgPSByb3RhdGlvbiAqIE1hdGguUEkgLyAxODA7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQxID0gTWF0aC5jb3MoYW5nbGVSYWRpYW5zKSAqIHJvdGF0aW9uTWVhc3VyZW1lbnRzLmxhYmVsV2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQyID0gTWF0aC5zaW4oYW5nbGVSYWRpYW5zKSAqIEQzRHVhbEJhckNoYXJ0LkZPTlRfU0laRTtcclxuICAgICAgICAgICAgbWFyZ2luTGFiZWxIZWlnaHQgPSBoZWlnaHQxICsgaGVpZ2h0MiArIDEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGdyYXBoSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLSBEM0R1YWxCYXJDaGFydC5NQVJHSU4gKiAyIC0gbWFyZ2luTGFiZWxIZWlnaHQ7XHJcblxyXG4gICAgICAgIHZhciBZQXhpc2VzID0gdGhpcy5HZXRCb3RoWUF4aXMoZ3JhcGhIZWlnaHQpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luQ29udGFpbmVyID0gdGhpcy5zdmcuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIHRoaXMudHJhbnNsYXRlKEQzRHVhbEJhckNoYXJ0Lk1BUkdJTiwgRDNEdWFsQmFyQ2hhcnQuTUFSR0lOKSk7XHJcblxyXG4gICAgICAgIHZhciBsZWZ0WUF4aXNHcm91cCA9IG1hcmdpbkNvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsJ2F4aXMtZHVhbGJhcnMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKFlBeGlzZXMubGVmdC5heGlzKTtcclxuICAgICAgICAgICBsZWZ0WUF4aXNHcm91cC5zZWxlY3RBbGwoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLmNvbG9yT25lKVxyXG5cdCAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIEQzRHVhbEJhckNoYXJ0LkZPTlRfU0laRSkgIDsgICAgXHJcblxyXG4gICAgICAgIHZhciByaWdodFlBeGlzR3JvdXAgPSBtYXJnaW5Db250YWluZXIuYXBwZW5kKCdnJylcclxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCdheGlzLWR1YWxiYXJzJylcclxuICAgICAgICAgICAgICAgICAgICAuY2FsbChZQXhpc2VzLnJpZ2h0LmF4aXMpO1xyXG4gICAgICAgICAgICByaWdodFlBeGlzR3JvdXAuc2VsZWN0QWxsKCd0ZXh0JylcclxuICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgdGhpcy5jb2xvclR3bylcclxuXHQgICAgICAgICAgICAgICAgLnN0eWxlKCdmb250LXNpemUnLCBEM0R1YWxCYXJDaGFydC5GT05UX1NJWkUpIDsgICAgXHJcblxyXG4gICAgICAgIHZhciBsZWZ0QXhpc1dpZHRoID0gKDxTVkdTVkdFbGVtZW50Pig8YW55PmxlZnRZQXhpc0dyb3VwLm5vZGUoKSkpLmdldEJCb3goKS53aWR0aDtcclxuICAgICAgICB2YXIgcmlnaHRBeGlzV2lkdGggPSAoPFNWR1NWR0VsZW1lbnQ+KDxhbnk+cmlnaHRZQXhpc0dyb3VwLm5vZGUoKSkpLmdldEJCb3goKS53aWR0aDsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdmFyIGdyYXBoV2lkdGggPSB0aGlzLndpZHRoIC0gRDNEdWFsQmFyQ2hhcnQuTUFSR0lOICogMiAtIGxlZnRBeGlzV2lkdGggLSByaWdodEF4aXNXaWR0aDtcclxuXHJcbiAgICAgICAgdmFyIGR1YWxCYXJXaWR0aCA9IGdyYXBoV2lkdGggLyB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHZhciBsYWJlbFdpZHRoID0gdGhpcy5kM1V0aWxpdGllc1NlcnZpY2UuZ2V0TWF4V2lkdGhPZlRleHRzKCQubWFwKHRoaXMuZGF0YSwgKGQpID0+IGQubGFiZWwpLCBEM0R1YWxCYXJDaGFydC5GT05UX1NJWkUpO1xyXG5cclxuICAgICAgICB2YXIgZXh0cmFCb3R0b21NYXJnaW4gPSByb3RhdGlvbk1lYXN1cmVtZW50cy5yb3RhdGVMYWJlbFxyXG4gICAgICAgICAgICA/IE1hdGguY29zKE1hdGguUEkgKiBEM0R1YWxCYXJDaGFydC5MQUJFTF9ST1RBVElPTl9BTkdMRSAvIDE4MCkgKiBsYWJlbFdpZHRoXHJcbiAgICAgICAgICAgIDogRDNEdWFsQmFyQ2hhcnQuRk9OVF9TSVpFICogMS4yO1xyXG4gICAgICAgICAgICAgIFxyXG4gICAgICAgIHZhciBiYXJzT2Zmc2V0OiBudW1iZXIgPSAxO1xyXG4gICAgICAgIHZhciBzaW5nbGVCYXJXaWR0aDogbnVtYmVyID0gKGR1YWxCYXJXaWR0aCAtIEQzRHVhbEJhckNoYXJ0Lk1JTklNVU1fQkFSX1NQQUNJTkcpIC8gMjtcclxuICAgICAgICBpZiggdGhpcy5tYXhCYXJXaWR0aCAqIDIgPCBkdWFsQmFyV2lkdGggKSB7ICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJhcnNPZmZzZXQgPSAoZHVhbEJhcldpZHRoIC0gdGhpcy5tYXhCYXJXaWR0aCAqIDIgKSAvIDI7XHJcbiAgICAgICAgICAgIHNpbmdsZUJhcldpZHRoID0gdGhpcy5tYXhCYXJXaWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxlZnRZQXhpc0dyb3VwLmF0dHIoJ3RyYW5zZm9ybScsIHRoaXMudHJhbnNsYXRlKGxlZnRBeGlzV2lkdGgsIDApKTtcclxuICAgICAgICByaWdodFlBeGlzR3JvdXAuYXR0cigndHJhbnNmb3JtJywgdGhpcy50cmFuc2xhdGUoZ3JhcGhXaWR0aCArIGxlZnRBeGlzV2lkdGgsIDApKTtcclxuICAgICAgICB2YXIgZGF0YUdyb3VwID0gbWFyZ2luQ29udGFpbmVyLmFwcGVuZChcImdcIikuYXR0cigndHJhbnNmb3JtJywgdGhpcy50cmFuc2xhdGUobGVmdEF4aXNXaWR0aCwgMCkpO1xyXG4gICAgICAgIHZhciBsYWJlbEdyb3VwID0gbWFyZ2luQ29udGFpbmVyLmFwcGVuZChcImdcIikuYXR0cigndHJhbnNmb3JtJywgdGhpcy50cmFuc2xhdGUobGVmdEF4aXNXaWR0aCwgZ3JhcGhIZWlnaHQgKyAxMCArIChtYXJnaW5MYWJlbEhlaWdodC8yKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICB2YXIgZHVhbEJhcnMgPSBkYXRhR3JvdXAuc2VsZWN0QWxsKFwiZ1wiKVxyXG4gICAgICAgICAgICAuZGF0YSh0aGlzLmRhdGEpXHJcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZChcImdcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKGQsIGkpID0+IHRoaXMudHJhbnNsYXRlKGkgKiBkdWFsQmFyV2lkdGgsIDApKTtcclxuXHJcbiAgICAgICAgLy8gZmlyc3QgYmFyXHJcbiAgICAgICAgZHVhbEJhcnMuYXBwZW5kKFwicmVjdFwiKVxyXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgKGQpID0+IFlBeGlzZXMubGVmdC55KGQudmFsdWVPbmUpKVxyXG4gICAgICAgICAgICAuYXR0cihcImhlaWdodFwiLCAoZCkgPT4gZ3JhcGhIZWlnaHQgLSBZQXhpc2VzLmxlZnQueShkLnZhbHVlT25lKSlcclxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIGJhcnNPZmZzZXQgKyAwKVxyXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHNpbmdsZUJhcldpZHRoKSAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgdGhpcy5jb2xvck9uZSk7XHJcbiAgICAgICAgLy8gc2Vjb25kIGJhclxyXG4gICAgICAgIGR1YWxCYXJzLmFwcGVuZChcInJlY3RcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJ5XCIsIChkKSA9PiBZQXhpc2VzLnJpZ2h0LnkoZC52YWx1ZVR3bykpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIChkKSA9PiBncmFwaEhlaWdodCAtIFlBeGlzZXMucmlnaHQueShkLnZhbHVlVHdvKSlcclxuICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIGJhcnNPZmZzZXQgKyBzaW5nbGVCYXJXaWR0aClcclxuICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBzaW5nbGVCYXJXaWR0aCkgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuY29sb3JUd28pOyAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBiYXJMYWJlbHMgPSBsYWJlbEdyb3VwLnNlbGVjdEFsbChcImdcIilcclxuICAgICAgICAgICAgLmRhdGEodGhpcy5kYXRhKVxyXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgKGQsIGkpID0+IHRoaXMudHJhbnNsYXRlKChpICsgMC41KSAqIGR1YWxCYXJXaWR0aCwgMCkpO1xyXG4gICAgICAgIGJhckxhYmVsc1xyXG4gICAgICAgICAgICAuYXBwZW5kKFwidGV4dFwiKVxyXG4gICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcclxuICAgICAgICAgICAgLnRleHQoZCA9PiBkLmxhYmVsKVxyXG4gICAgICAgICAgICAuc3R5bGUoXCJmaWxsXCIsICcjNmY2ZTZkJylcclxuXHQgICAgICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBEM0R1YWxCYXJDaGFydC5GT05UX1NJWkUpXHJcbiAgICAgICAgICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb3RhdGlvbk1lYXN1cmVtZW50cy5yb3RhdGVMYWJlbCA/ICdyb3RhdGUoJyArIHJvdGF0aW9uICsgJyknIDogJyc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdHJhbnNsYXRlKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZSgke3dpZHRofSwgJHtoZWlnaHR9KWA7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdkMycpLmRpcmVjdGl2ZSgnZDNEdWFsQmFyQ2hhcnQnLCBbJ2QzVXRpbGl0aWVzU2VydmljZScsIChkM1V0aWxpdGllc1NlcnZpY2U6IGFueSkgPT4gbmV3IEQzRHVhbEJhckNoYXJ0KGQzVXRpbGl0aWVzU2VydmljZSldKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9EMy9kM0R1YWxCYXJDaGFydC9kM0R1YWxCYXJDaGFydC50c1xuICoqLyIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIExvLURhc2ggMS4wLjIgKEN1c3RvbSBCdWlsZCkgPGh0dHA6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIC1vIC4vZGlzdC9sb2Rhc2guY29tcGF0LmpzYFxuICogQ29weXJpZ2h0IDIwMTItMjAxMyBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS40LjQgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnLz5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTMgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIEluYy5cbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cDovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xuOyhmdW5jdGlvbih3aW5kb3csIHVuZGVmaW5lZCkge1xuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AgKi9cbiAgdmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAgKi9cbiAgdmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGFuZCB1c2UgaXQgYXMgYHdpbmRvd2AgKi9cbiAgdmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcbiAgaWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsKSB7XG4gICAgd2luZG93ID0gZnJlZUdsb2JhbDtcbiAgfVxuXG4gIC8qKiBVc2VkIGZvciBhcnJheSBhbmQgb2JqZWN0IG1ldGhvZCByZWZlcmVuY2VzICovXG4gIHZhciBhcnJheVJlZiA9IFtdLFxuICAgICAgb2JqZWN0UmVmID0ge307XG5cbiAgLyoqIFVzZWQgdG8gZ2VuZXJhdGUgdW5pcXVlIElEcyAqL1xuICB2YXIgaWRDb3VudGVyID0gMDtcblxuICAvKiogVXNlZCBpbnRlcm5hbGx5IHRvIGluZGljYXRlIHZhcmlvdXMgdGhpbmdzICovXG4gIHZhciBpbmRpY2F0b3JPYmplY3QgPSBvYmplY3RSZWY7XG5cbiAgLyoqIFVzZWQgYnkgYGNhY2hlZENvbnRhaW5zYCBhcyB0aGUgZGVmYXVsdCBzaXplIHdoZW4gb3B0aW1pemF0aW9ucyBhcmUgZW5hYmxlZCBmb3IgbGFyZ2UgYXJyYXlzICovXG4gIHZhciBsYXJnZUFycmF5U2l6ZSA9IDMwO1xuXG4gIC8qKiBVc2VkIHRvIHJlc3RvcmUgdGhlIG9yaWdpbmFsIGBfYCByZWZlcmVuY2UgaW4gYG5vQ29uZmxpY3RgICovXG4gIHZhciBvbGREYXNoID0gd2luZG93Ll87XG5cbiAgLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBlbnRpdGllcyAqL1xuICB2YXIgcmVFc2NhcGVkSHRtbCA9IC8mKD86YW1wfGx0fGd0fHF1b3R8IzM5KTsvZztcblxuICAvKiogVXNlZCB0byBtYXRjaCBlbXB0eSBzdHJpbmcgbGl0ZXJhbHMgaW4gY29tcGlsZWQgdGVtcGxhdGUgc291cmNlICovXG4gIHZhciByZUVtcHR5U3RyaW5nTGVhZGluZyA9IC9cXGJfX3AgXFwrPSAnJzsvZyxcbiAgICAgIHJlRW1wdHlTdHJpbmdNaWRkbGUgPSAvXFxiKF9fcCBcXCs9KSAnJyBcXCsvZyxcbiAgICAgIHJlRW1wdHlTdHJpbmdUcmFpbGluZyA9IC8oX19lXFwoLio/XFwpfFxcYl9fdFxcKSkgXFwrXFxuJyc7L2c7XG5cbiAgLyoqIFVzZWQgdG8gbWF0Y2ggcmVnZXhwIGZsYWdzIGZyb20gdGhlaXIgY29lcmNlZCBzdHJpbmcgdmFsdWVzICovXG4gIHZhciByZUZsYWdzID0gL1xcdyokLztcblxuICAvKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlICovXG4gIHZhciByZU5hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICAgIChvYmplY3RSZWYudmFsdWVPZiArICcnKVxuICAgICAgLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLCAnXFxcXCQmJylcbiAgICAgIC5yZXBsYWNlKC92YWx1ZU9mfGZvciBbXlxcXV0rL2csICcuKz8nKSArICckJ1xuICApO1xuXG4gIC8qKlxuICAgKiBVc2VkIHRvIG1hdGNoIEVTNiB0ZW1wbGF0ZSBkZWxpbWl0ZXJzXG4gICAqIGh0dHA6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLTcuOC42XG4gICAqL1xuICB2YXIgcmVFc1RlbXBsYXRlID0gL1xcJFxceyhbXlxcXFx9XSooPzpcXFxcLlteXFxcXH1dKikqKVxcfS9nO1xuXG4gIC8qKiBVc2VkIHRvIG1hdGNoIFwiaW50ZXJwb2xhdGVcIiB0ZW1wbGF0ZSBkZWxpbWl0ZXJzICovXG4gIHZhciByZUludGVycG9sYXRlID0gLzwlPShbXFxzXFxTXSs/KSU+L2c7XG5cbiAgLyoqIFVzZWQgdG8gZW5zdXJlIGNhcHR1cmluZyBvcmRlciBvZiB0ZW1wbGF0ZSBkZWxpbWl0ZXJzICovXG4gIHZhciByZU5vTWF0Y2ggPSAvKCReKS87XG5cbiAgLyoqIFVzZWQgdG8gbWF0Y2ggSFRNTCBjaGFyYWN0ZXJzICovXG4gIHZhciByZVVuZXNjYXBlZEh0bWwgPSAvWyY8PlwiJ10vZztcblxuICAvKiogVXNlZCB0byBtYXRjaCB1bmVzY2FwZWQgY2hhcmFjdGVycyBpbiBjb21waWxlZCBzdHJpbmcgbGl0ZXJhbHMgKi9cbiAgdmFyIHJlVW5lc2NhcGVkU3RyaW5nID0gL1snXFxuXFxyXFx0XFx1MjAyOFxcdTIwMjlcXFxcXS9nO1xuXG4gIC8qKiBVc2VkIHRvIGZpeCB0aGUgSlNjcmlwdCBbW0RvbnRFbnVtXV0gYnVnICovXG4gIHZhciBzaGFkb3dlZCA9IFtcbiAgICAnY29uc3RydWN0b3InLCAnaGFzT3duUHJvcGVydHknLCAnaXNQcm90b3R5cGVPZicsICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICAgJ3RvTG9jYWxlU3RyaW5nJywgJ3RvU3RyaW5nJywgJ3ZhbHVlT2YnXG4gIF07XG5cbiAgLyoqIFVzZWQgdG8gbWFrZSB0ZW1wbGF0ZSBzb3VyY2VVUkxzIGVhc2llciB0byBpZGVudGlmeSAqL1xuICB2YXIgdGVtcGxhdGVDb3VudGVyID0gMDtcblxuICAvKiogTmF0aXZlIG1ldGhvZCBzaG9ydGN1dHMgKi9cbiAgdmFyIGNlaWwgPSBNYXRoLmNlaWwsXG4gICAgICBjb25jYXQgPSBhcnJheVJlZi5jb25jYXQsXG4gICAgICBmbG9vciA9IE1hdGguZmxvb3IsXG4gICAgICBnZXRQcm90b3R5cGVPZiA9IHJlTmF0aXZlLnRlc3QoZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YpICYmIGdldFByb3RvdHlwZU9mLFxuICAgICAgaGFzT3duUHJvcGVydHkgPSBvYmplY3RSZWYuaGFzT3duUHJvcGVydHksXG4gICAgICBwdXNoID0gYXJyYXlSZWYucHVzaCxcbiAgICAgIHRvU3RyaW5nID0gb2JqZWN0UmVmLnRvU3RyaW5nO1xuXG4gIC8qIE5hdGl2ZSBtZXRob2Qgc2hvcnRjdXRzIGZvciBtZXRob2RzIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzICovXG4gIHZhciBuYXRpdmVCaW5kID0gcmVOYXRpdmUudGVzdChuYXRpdmVCaW5kID0gc2xpY2UuYmluZCkgJiYgbmF0aXZlQmluZCxcbiAgICAgIG5hdGl2ZUlzQXJyYXkgPSByZU5hdGl2ZS50ZXN0KG5hdGl2ZUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KSAmJiBuYXRpdmVJc0FycmF5LFxuICAgICAgbmF0aXZlSXNGaW5pdGUgPSB3aW5kb3cuaXNGaW5pdGUsXG4gICAgICBuYXRpdmVJc05hTiA9IHdpbmRvdy5pc05hTixcbiAgICAgIG5hdGl2ZUtleXMgPSByZU5hdGl2ZS50ZXN0KG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cykgJiYgbmF0aXZlS2V5cyxcbiAgICAgIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgICAgbmF0aXZlTWluID0gTWF0aC5taW4sXG4gICAgICBuYXRpdmVSYW5kb20gPSBNYXRoLnJhbmRvbTtcblxuICAvKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHNob3J0Y3V0cyAqL1xuICB2YXIgYXJnc0NsYXNzID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgICBhcnJheUNsYXNzID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICAgIGJvb2xDbGFzcyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICAgIGRhdGVDbGFzcyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICAgIGZ1bmNDbGFzcyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgICBudW1iZXJDbGFzcyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgICAgb2JqZWN0Q2xhc3MgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICAgIHJlZ2V4cENsYXNzID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgICBzdHJpbmdDbGFzcyA9ICdbb2JqZWN0IFN0cmluZ10nO1xuXG4gIC8qKiBEZXRlY3QgdmFyaW91cyBlbnZpcm9ubWVudHMgKi9cbiAgdmFyIGlzSWVPcGVyYSA9ICEhd2luZG93LmF0dGFjaEV2ZW50LFxuICAgICAgaXNWOCA9IG5hdGl2ZUJpbmQgJiYgIS9cXG58dHJ1ZS8udGVzdChuYXRpdmVCaW5kICsgaXNJZU9wZXJhKTtcblxuICAvKiBEZXRlY3QgaWYgYEZ1bmN0aW9uI2JpbmRgIGV4aXN0cyBhbmQgaXMgaW5mZXJyZWQgdG8gYmUgZmFzdCAoYWxsIGJ1dCBWOCkgKi9cbiAgdmFyIGlzQmluZEZhc3QgPSBuYXRpdmVCaW5kICYmICFpc1Y4O1xuXG4gIC8qIERldGVjdCBpZiBgT2JqZWN0LmtleXNgIGV4aXN0cyBhbmQgaXMgaW5mZXJyZWQgdG8gYmUgZmFzdCAoSUUsIE9wZXJhLCBWOCkgKi9cbiAgdmFyIGlzS2V5c0Zhc3QgPSBuYXRpdmVLZXlzICYmIChpc0llT3BlcmEgfHwgaXNWOCk7XG5cbiAgLyoqXG4gICAqIERldGVjdCB0aGUgSlNjcmlwdCBbW0RvbnRFbnVtXV0gYnVnOlxuICAgKlxuICAgKiBJbiBJRSA8IDkgYW4gb2JqZWN0cyBvd24gcHJvcGVydGllcywgc2hhZG93aW5nIG5vbi1lbnVtZXJhYmxlIG9uZXMsIGFyZVxuICAgKiBtYWRlIG5vbi1lbnVtZXJhYmxlIGFzIHdlbGwuXG4gICAqL1xuICB2YXIgaGFzRG9udEVudW1CdWc7XG5cbiAgLyoqXG4gICAqIERldGVjdCBpZiBhIGBwcm90b3R5cGVgIHByb3BlcnRpZXMgYXJlIGVudW1lcmFibGUgYnkgZGVmYXVsdDpcbiAgICpcbiAgICogRmlyZWZveCA8IDMuNiwgT3BlcmEgPiA5LjUwIC0gT3BlcmEgPCAxMS42MCwgYW5kIFNhZmFyaSA8IDUuMVxuICAgKiAoaWYgdGhlIHByb3RvdHlwZSBvciBhIHByb3BlcnR5IG9uIHRoZSBwcm90b3R5cGUgaGFzIGJlZW4gc2V0KVxuICAgKiBpbmNvcnJlY3RseSBzZXRzIGEgZnVuY3Rpb24ncyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBbW0VudW1lcmFibGVdXVxuICAgKiB2YWx1ZSB0byBgdHJ1ZWAuXG4gICAqL1xuICB2YXIgaGFzRW51bVByb3RvdHlwZTtcblxuICAvKiogRGV0ZWN0IGlmIG93biBwcm9wZXJ0aWVzIGFyZSBpdGVyYXRlZCBhZnRlciBpbmhlcml0ZWQgcHJvcGVydGllcyAoSUUgPCA5KSAqL1xuICB2YXIgaXRlcmF0ZXNPd25MYXN0O1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYEFycmF5I3NoaWZ0YCBhbmQgYEFycmF5I3NwbGljZWAgYXVnbWVudCBhcnJheS1saWtlIG9iamVjdHNcbiAgICogaW5jb3JyZWN0bHk6XG4gICAqXG4gICAqIEZpcmVmb3ggPCAxMCwgSUUgY29tcGF0aWJpbGl0eSBtb2RlLCBhbmQgSUUgPCA5IGhhdmUgYnVnZ3kgQXJyYXkgYHNoaWZ0KClgXG4gICAqIGFuZCBgc3BsaWNlKClgIGZ1bmN0aW9ucyB0aGF0IGZhaWwgdG8gcmVtb3ZlIHRoZSBsYXN0IGVsZW1lbnQsIGB2YWx1ZVswXWAsXG4gICAqIG9mIGFycmF5LWxpa2Ugb2JqZWN0cyBldmVuIHRob3VnaCB0aGUgYGxlbmd0aGAgcHJvcGVydHkgaXMgc2V0IHRvIGAwYC5cbiAgICogVGhlIGBzaGlmdCgpYCBtZXRob2QgaXMgYnVnZ3kgaW4gSUUgOCBjb21wYXRpYmlsaXR5IG1vZGUsIHdoaWxlIGBzcGxpY2UoKWBcbiAgICogaXMgYnVnZ3kgcmVnYXJkbGVzcyBvZiBtb2RlIGluIElFIDwgOSBhbmQgYnVnZ3kgaW4gY29tcGF0aWJpbGl0eSBtb2RlIGluIElFIDkuXG4gICAqL1xuICB2YXIgaGFzT2JqZWN0U3BsaWNlQnVnID0gKGhhc09iamVjdFNwbGljZUJ1ZyA9IHsgJzAnOiAxLCAnbGVuZ3RoJzogMSB9LFxuICAgIGFycmF5UmVmLnNwbGljZS5jYWxsKGhhc09iamVjdFNwbGljZUJ1ZywgMCwgMSksIGhhc09iamVjdFNwbGljZUJ1Z1swXSk7XG5cbiAgLyoqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3QgaW5kZXhlcyBhcmUgbm9uLWVudW1lcmFibGUgKEZpcmVmb3ggPCA0LCBJRSA8IDksIFBoYW50b21KUywgU2FmYXJpIDwgNS4xKSAqL1xuICB2YXIgbm9uRW51bUFyZ3MgPSB0cnVlO1xuXG4gIChmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvcHMgPSBbXTtcbiAgICBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLnggPSAxOyB9XG4gICAgY3Rvci5wcm90b3R5cGUgPSB7ICd2YWx1ZU9mJzogMSwgJ3knOiAxIH07XG4gICAgZm9yICh2YXIgcHJvcCBpbiBuZXcgY3RvcikgeyBwcm9wcy5wdXNoKHByb3ApOyB9XG4gICAgZm9yIChwcm9wIGluIGFyZ3VtZW50cykgeyBub25FbnVtQXJncyA9ICFwcm9wOyB9XG5cbiAgICBoYXNEb250RW51bUJ1ZyA9ICEvdmFsdWVPZi8udGVzdChwcm9wcyk7XG4gICAgaGFzRW51bVByb3RvdHlwZSA9IGN0b3IucHJvcGVydHlJc0VudW1lcmFibGUoJ3Byb3RvdHlwZScpO1xuICAgIGl0ZXJhdGVzT3duTGFzdCA9IHByb3BzWzBdICE9ICd4JztcbiAgfSgxKSk7XG5cbiAgLyoqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIChhbGwgYnV0IE9wZXJhIDwgMTAuNSkgKi9cbiAgdmFyIGFyZ3NBcmVPYmplY3RzID0gYXJndW1lbnRzLmNvbnN0cnVjdG9yID09IE9iamVjdDtcblxuICAvKiogRGV0ZWN0IGlmIGBhcmd1bWVudHNgIG9iamVjdHMgW1tDbGFzc11dIGlzIHVucmVzb2x2YWJsZSAoRmlyZWZveCA8IDQsIElFIDwgOSkgKi9cbiAgdmFyIG5vQXJnc0NsYXNzID0gIWlzQXJndW1lbnRzKGFyZ3VtZW50cyk7XG5cbiAgLyoqXG4gICAqIERldGVjdCBsYWNrIG9mIHN1cHBvcnQgZm9yIGFjY2Vzc2luZyBzdHJpbmcgY2hhcmFjdGVycyBieSBpbmRleDpcbiAgICpcbiAgICogSUUgPCA4IGNhbid0IGFjY2VzcyBjaGFyYWN0ZXJzIGJ5IGluZGV4IGFuZCBJRSA4IGNhbiBvbmx5IGFjY2Vzc1xuICAgKiBjaGFyYWN0ZXJzIGJ5IGluZGV4IG9uIHN0cmluZyBsaXRlcmFscy5cbiAgICovXG4gIHZhciBub0NoYXJCeUluZGV4ID0gKCd4J1swXSArIE9iamVjdCgneCcpWzBdKSAhPSAneHgnO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYSBET00gbm9kZSdzIFtbQ2xhc3NdXSBpcyB1bnJlc29sdmFibGUgKElFIDwgOSlcbiAgICogYW5kIHRoYXQgdGhlIEpTIGVuZ2luZSB3b24ndCBlcnJvciB3aGVuIGF0dGVtcHRpbmcgdG8gY29lcmNlIGFuIG9iamVjdCB0b1xuICAgKiBhIHN0cmluZyB3aXRob3V0IGEgYHRvU3RyaW5nYCBmdW5jdGlvbi5cbiAgICovXG4gIHRyeSB7XG4gICAgdmFyIG5vTm9kZUNsYXNzID0gdG9TdHJpbmcuY2FsbChkb2N1bWVudCkgPT0gb2JqZWN0Q2xhc3MgJiYgISh7ICd0b1N0cmluZyc6IDAgfSArICcnKTtcbiAgfSBjYXRjaChlKSB7IH1cblxuICAvKiogVXNlZCB0byBpZGVudGlmeSBvYmplY3QgY2xhc3NpZmljYXRpb25zIHRoYXQgYF8uY2xvbmVgIHN1cHBvcnRzICovXG4gIHZhciBjbG9uZWFibGVDbGFzc2VzID0ge307XG4gIGNsb25lYWJsZUNsYXNzZXNbZnVuY0NsYXNzXSA9IGZhbHNlO1xuICBjbG9uZWFibGVDbGFzc2VzW2FyZ3NDbGFzc10gPSBjbG9uZWFibGVDbGFzc2VzW2FycmF5Q2xhc3NdID1cbiAgY2xvbmVhYmxlQ2xhc3Nlc1tib29sQ2xhc3NdID0gY2xvbmVhYmxlQ2xhc3Nlc1tkYXRlQ2xhc3NdID1cbiAgY2xvbmVhYmxlQ2xhc3Nlc1tudW1iZXJDbGFzc10gPSBjbG9uZWFibGVDbGFzc2VzW29iamVjdENsYXNzXSA9XG4gIGNsb25lYWJsZUNsYXNzZXNbcmVnZXhwQ2xhc3NdID0gY2xvbmVhYmxlQ2xhc3Nlc1tzdHJpbmdDbGFzc10gPSB0cnVlO1xuXG4gIC8qKiBVc2VkIHRvIGxvb2t1cCBhIGJ1aWx0LWluIGNvbnN0cnVjdG9yIGJ5IFtbQ2xhc3NdXSAqL1xuICB2YXIgY3RvckJ5Q2xhc3MgPSB7fTtcbiAgY3RvckJ5Q2xhc3NbYXJyYXlDbGFzc10gPSBBcnJheTtcbiAgY3RvckJ5Q2xhc3NbYm9vbENsYXNzXSA9IEJvb2xlYW47XG4gIGN0b3JCeUNsYXNzW2RhdGVDbGFzc10gPSBEYXRlO1xuICBjdG9yQnlDbGFzc1tvYmplY3RDbGFzc10gPSBPYmplY3Q7XG4gIGN0b3JCeUNsYXNzW251bWJlckNsYXNzXSA9IE51bWJlcjtcbiAgY3RvckJ5Q2xhc3NbcmVnZXhwQ2xhc3NdID0gUmVnRXhwO1xuICBjdG9yQnlDbGFzc1tzdHJpbmdDbGFzc10gPSBTdHJpbmc7XG5cbiAgLyoqIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgT2JqZWN0ICovXG4gIHZhciBvYmplY3RUeXBlcyA9IHtcbiAgICAnYm9vbGVhbic6IGZhbHNlLFxuICAgICdmdW5jdGlvbic6IHRydWUsXG4gICAgJ29iamVjdCc6IHRydWUsXG4gICAgJ251bWJlcic6IGZhbHNlLFxuICAgICdzdHJpbmcnOiBmYWxzZSxcbiAgICAndW5kZWZpbmVkJzogZmFsc2VcbiAgfTtcblxuICAvKiogVXNlZCB0byBlc2NhcGUgY2hhcmFjdGVycyBmb3IgaW5jbHVzaW9uIGluIGNvbXBpbGVkIHN0cmluZyBsaXRlcmFscyAqL1xuICB2YXIgc3RyaW5nRXNjYXBlcyA9IHtcbiAgICAnXFxcXCc6ICdcXFxcJyxcbiAgICBcIidcIjogXCInXCIsXG4gICAgJ1xcbic6ICduJyxcbiAgICAnXFxyJzogJ3InLFxuICAgICdcXHQnOiAndCcsXG4gICAgJ1xcdTIwMjgnOiAndTIwMjgnLFxuICAgICdcXHUyMDI5JzogJ3UyMDI5J1xuICB9O1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgYGxvZGFzaGAgb2JqZWN0LCB0aGF0IHdyYXBzIHRoZSBnaXZlbiBgdmFsdWVgLCB0byBlbmFibGUgbWV0aG9kXG4gICAqIGNoYWluaW5nLlxuICAgKlxuICAgKiBJbiBhZGRpdGlvbiB0byBMby1EYXNoIG1ldGhvZHMsIHdyYXBwZXJzIGFsc28gaGF2ZSB0aGUgZm9sbG93aW5nIGBBcnJheWAgbWV0aG9kczpcbiAgICogYGNvbmNhdGAsIGBqb2luYCwgYHBvcGAsIGBwdXNoYCwgYHJldmVyc2VgLCBgc2hpZnRgLCBgc2xpY2VgLCBgc29ydGAsIGBzcGxpY2VgLFxuICAgKiBhbmQgYHVuc2hpZnRgXG4gICAqXG4gICAqIFRoZSBjaGFpbmFibGUgd3JhcHBlciBmdW5jdGlvbnMgYXJlOlxuICAgKiBgYWZ0ZXJgLCBgYXNzaWduYCwgYGJpbmRgLCBgYmluZEFsbGAsIGBiaW5kS2V5YCwgYGNoYWluYCwgYGNvbXBhY3RgLCBgY29tcG9zZWAsXG4gICAqIGBjb25jYXRgLCBgY291bnRCeWAsIGBkZWJvdW5jZWAsIGBkZWZhdWx0c2AsIGBkZWZlcmAsIGBkZWxheWAsIGBkaWZmZXJlbmNlYCxcbiAgICogYGZpbHRlcmAsIGBmbGF0dGVuYCwgYGZvckVhY2hgLCBgZm9ySW5gLCBgZm9yT3duYCwgYGZ1bmN0aW9uc2AsIGBncm91cEJ5YCxcbiAgICogYGluaXRpYWxgLCBgaW50ZXJzZWN0aW9uYCwgYGludmVydGAsIGBpbnZva2VgLCBga2V5c2AsIGBtYXBgLCBgbWF4YCwgYG1lbW9pemVgLFxuICAgKiBgbWVyZ2VgLCBgbWluYCwgYG9iamVjdGAsIGBvbWl0YCwgYG9uY2VgLCBgcGFpcnNgLCBgcGFydGlhbGAsIGBwYXJ0aWFsUmlnaHRgLFxuICAgKiBgcGlja2AsIGBwbHVja2AsIGBwdXNoYCwgYHJhbmdlYCwgYHJlamVjdGAsIGByZXN0YCwgYHJldmVyc2VgLCBgc2h1ZmZsZWAsXG4gICAqIGBzbGljZWAsIGBzb3J0YCwgYHNvcnRCeWAsIGBzcGxpY2VgLCBgdGFwYCwgYHRocm90dGxlYCwgYHRpbWVzYCwgYHRvQXJyYXlgLFxuICAgKiBgdW5pb25gLCBgdW5pcWAsIGB1bnNoaWZ0YCwgYHZhbHVlc2AsIGB3aGVyZWAsIGB3aXRob3V0YCwgYHdyYXBgLCBhbmQgYHppcGBcbiAgICpcbiAgICogVGhlIG5vbi1jaGFpbmFibGUgd3JhcHBlciBmdW5jdGlvbnMgYXJlOlxuICAgKiBgY2xvbmVgLCBgY2xvbmVEZWVwYCwgYGNvbnRhaW5zYCwgYGVzY2FwZWAsIGBldmVyeWAsIGBmaW5kYCwgYGhhc2AsIGBpZGVudGl0eWAsXG4gICAqIGBpbmRleE9mYCwgYGlzQXJndW1lbnRzYCwgYGlzQXJyYXlgLCBgaXNCb29sZWFuYCwgYGlzRGF0ZWAsIGBpc0VsZW1lbnRgLCBgaXNFbXB0eWAsXG4gICAqIGBpc0VxdWFsYCwgYGlzRmluaXRlYCwgYGlzRnVuY3Rpb25gLCBgaXNOYU5gLCBgaXNOdWxsYCwgYGlzTnVtYmVyYCwgYGlzT2JqZWN0YCxcbiAgICogYGlzUGxhaW5PYmplY3RgLCBgaXNSZWdFeHBgLCBgaXNTdHJpbmdgLCBgaXNVbmRlZmluZWRgLCBgam9pbmAsIGBsYXN0SW5kZXhPZmAsXG4gICAqIGBtaXhpbmAsIGBub0NvbmZsaWN0YCwgYHBvcGAsIGByYW5kb21gLCBgcmVkdWNlYCwgYHJlZHVjZVJpZ2h0YCwgYHJlc3VsdGAsXG4gICAqIGBzaGlmdGAsIGBzaXplYCwgYHNvbWVgLCBgc29ydGVkSW5kZXhgLCBgdGVtcGxhdGVgLCBgdW5lc2NhcGVgLCBhbmQgYHVuaXF1ZUlkYFxuICAgKlxuICAgKiBUaGUgd3JhcHBlciBmdW5jdGlvbnMgYGZpcnN0YCBhbmQgYGxhc3RgIHJldHVybiB3cmFwcGVkIHZhbHVlcyB3aGVuIGBuYCBpc1xuICAgKiBwYXNzZWQsIG90aGVyd2lzZSB0aGV5IHJldHVybiB1bndyYXBwZWQgdmFsdWVzLlxuICAgKlxuICAgKiBAbmFtZSBfXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAY2F0ZWdvcnkgQ2hhaW5pbmdcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIHdyYXAgaW4gYSBgbG9kYXNoYCBpbnN0YW5jZS5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhIGBsb2Rhc2hgIGluc3RhbmNlLlxuICAgKi9cbiAgZnVuY3Rpb24gbG9kYXNoKHZhbHVlKSB7XG4gICAgLy8gZXhpdCBlYXJseSBpZiBhbHJlYWR5IHdyYXBwZWQsIGV2ZW4gaWYgd3JhcHBlZCBieSBhIGRpZmZlcmVudCBgbG9kYXNoYCBjb25zdHJ1Y3RvclxuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcgJiYgdmFsdWUuX193cmFwcGVkX18pIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgLy8gYWxsb3cgaW52b2tpbmcgYGxvZGFzaGAgd2l0aG91dCB0aGUgYG5ld2Agb3BlcmF0b3JcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgbG9kYXNoKSkge1xuICAgICAgcmV0dXJuIG5ldyBsb2Rhc2godmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLl9fd3JhcHBlZF9fID0gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQnkgZGVmYXVsdCwgdGhlIHRlbXBsYXRlIGRlbGltaXRlcnMgdXNlZCBieSBMby1EYXNoIGFyZSBzaW1pbGFyIHRvIHRob3NlIGluXG4gICAqIGVtYmVkZGVkIFJ1YnkgKEVSQikuIENoYW5nZSB0aGUgZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZVxuICAgKiBkZWxpbWl0ZXJzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgbG9kYXNoLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRldGVjdCBgZGF0YWAgcHJvcGVydHkgdmFsdWVzIHRvIGJlIEhUTUwtZXNjYXBlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICAgKiBAdHlwZSBSZWdFeHBcbiAgICAgKi9cbiAgICAnZXNjYXBlJzogLzwlLShbXFxzXFxTXSs/KSU+L2csXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRldGVjdCBjb2RlIHRvIGJlIGV2YWx1YXRlZC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICAgKiBAdHlwZSBSZWdFeHBcbiAgICAgKi9cbiAgICAnZXZhbHVhdGUnOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZXRlY3QgYGRhdGFgIHByb3BlcnR5IHZhbHVlcyB0byBpbmplY3QuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAgICogQHR5cGUgUmVnRXhwXG4gICAgICovXG4gICAgJ2ludGVycG9sYXRlJzogcmVJbnRlcnBvbGF0ZSxcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gcmVmZXJlbmNlIHRoZSBkYXRhIG9iamVjdCBpbiB0aGUgdGVtcGxhdGUgdGV4dC5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICAgKiBAdHlwZSBTdHJpbmdcbiAgICAgKi9cbiAgICAndmFyaWFibGUnOiAnJyxcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gaW1wb3J0IHZhcmlhYmxlcyBpbnRvIHRoZSBjb21waWxlZCB0ZW1wbGF0ZS5cbiAgICAgKlxuICAgICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3NcbiAgICAgKiBAdHlwZSBPYmplY3RcbiAgICAgKi9cbiAgICAnaW1wb3J0cyc6IHtcblxuICAgICAgLyoqXG4gICAgICAgKiBBIHJlZmVyZW5jZSB0byB0aGUgYGxvZGFzaGAgZnVuY3Rpb24uXG4gICAgICAgKlxuICAgICAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5ncy5pbXBvcnRzXG4gICAgICAgKiBAdHlwZSBGdW5jdGlvblxuICAgICAgICovXG4gICAgICAnXyc6IGxvZGFzaFxuICAgIH1cbiAgfTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogVGhlIHRlbXBsYXRlIHVzZWQgdG8gY3JlYXRlIGl0ZXJhdG9yIGZ1bmN0aW9ucy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmVjdH0gZGF0YSBUaGUgZGF0YSBvYmplY3QgdXNlZCB0byBwb3B1bGF0ZSB0aGUgdGV4dC5cbiAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgaW50ZXJwb2xhdGVkIHRleHQuXG4gICAqL1xuICB2YXIgaXRlcmF0b3JUZW1wbGF0ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIFxuICAgIHZhciBfX3AgPSAndmFyIGluZGV4LCBpdGVyYWJsZSA9ICcgK1xuICAgIChvYmouZmlyc3RBcmcgKSArXG4gICAgJywgcmVzdWx0ID0gaXRlcmFibGU7XFxuaWYgKCFpdGVyYWJsZSkgcmV0dXJuIHJlc3VsdDtcXG4nICtcbiAgICAob2JqLnRvcCApICtcbiAgICAnO1xcbic7XG4gICAgIGlmIChvYmouYXJyYXlzKSB7XG4gICAgX19wICs9ICd2YXIgbGVuZ3RoID0gaXRlcmFibGUubGVuZ3RoOyBpbmRleCA9IC0xO1xcbmlmICgnICtcbiAgICAob2JqLmFycmF5cyApICtcbiAgICAnKSB7ICAnO1xuICAgICBpZiAob2JqLm5vQ2hhckJ5SW5kZXgpIHtcbiAgICBfX3AgKz0gJ1xcbiAgaWYgKGlzU3RyaW5nKGl0ZXJhYmxlKSkge1xcbiAgICBpdGVyYWJsZSA9IGl0ZXJhYmxlLnNwbGl0KFxcJ1xcJylcXG4gIH0gICc7XG4gICAgIH0gO1xuICAgIF9fcCArPSAnXFxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xcbiAgICAnICtcbiAgICAob2JqLmxvb3AgKSArXG4gICAgJ1xcbiAgfVxcbn1cXG5lbHNlIHsgICc7XG4gICAgICB9IGVsc2UgaWYgKG9iai5ub25FbnVtQXJncykge1xuICAgIF9fcCArPSAnXFxuICB2YXIgbGVuZ3RoID0gaXRlcmFibGUubGVuZ3RoOyBpbmRleCA9IC0xO1xcbiAgaWYgKGxlbmd0aCAmJiBpc0FyZ3VtZW50cyhpdGVyYWJsZSkpIHtcXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcXG4gICAgICBpbmRleCArPSBcXCdcXCc7XFxuICAgICAgJyArXG4gICAgKG9iai5sb29wICkgK1xuICAgICdcXG4gICAgfVxcbiAgfSBlbHNlIHsgICc7XG4gICAgIH0gO1xuICAgIFxuICAgICBpZiAob2JqLmhhc0VudW1Qcm90b3R5cGUpIHtcbiAgICBfX3AgKz0gJ1xcbiAgdmFyIHNraXBQcm90byA9IHR5cGVvZiBpdGVyYWJsZSA9PSBcXCdmdW5jdGlvblxcJztcXG4gICc7XG4gICAgIH0gO1xuICAgIFxuICAgICBpZiAob2JqLmlzS2V5c0Zhc3QgJiYgb2JqLnVzZUhhcykge1xuICAgIF9fcCArPSAnXFxuICB2YXIgb3duSW5kZXggPSAtMSxcXG4gICAgICBvd25Qcm9wcyA9IG9iamVjdFR5cGVzW3R5cGVvZiBpdGVyYWJsZV0gPyBuYXRpdmVLZXlzKGl0ZXJhYmxlKSA6IFtdLFxcbiAgICAgIGxlbmd0aCA9IG93blByb3BzLmxlbmd0aDtcXG5cXG4gIHdoaWxlICgrK293bkluZGV4IDwgbGVuZ3RoKSB7XFxuICAgIGluZGV4ID0gb3duUHJvcHNbb3duSW5kZXhdO1xcbiAgICAnO1xuICAgICBpZiAob2JqLmhhc0VudW1Qcm90b3R5cGUpIHtcbiAgICBfX3AgKz0gJ2lmICghKHNraXBQcm90byAmJiBpbmRleCA9PSBcXCdwcm90b3R5cGVcXCcpKSB7XFxuICAnO1xuICAgICB9IDtcbiAgICBfX3AgKz0gXG4gICAgKG9iai5sb29wICkgK1xuICAgICcnO1xuICAgICBpZiAob2JqLmhhc0VudW1Qcm90b3R5cGUpIHtcbiAgICBfX3AgKz0gJ31cXG4nO1xuICAgICB9IDtcbiAgICBfX3AgKz0gJyAgfSAgJztcbiAgICAgfSBlbHNlIHtcbiAgICBfX3AgKz0gJ1xcbiAgZm9yIChpbmRleCBpbiBpdGVyYWJsZSkgeyc7XG4gICAgICAgIGlmIChvYmouaGFzRW51bVByb3RvdHlwZSB8fCBvYmoudXNlSGFzKSB7XG4gICAgX19wICs9ICdcXG4gICAgaWYgKCc7XG4gICAgICAgICAgaWYgKG9iai5oYXNFbnVtUHJvdG90eXBlKSB7XG4gICAgX19wICs9ICchKHNraXBQcm90byAmJiBpbmRleCA9PSBcXCdwcm90b3R5cGVcXCcpJztcbiAgICAgfSAgICAgIGlmIChvYmouaGFzRW51bVByb3RvdHlwZSAmJiBvYmoudXNlSGFzKSB7XG4gICAgX19wICs9ICcgJiYgJztcbiAgICAgfSAgICAgIGlmIChvYmoudXNlSGFzKSB7XG4gICAgX19wICs9ICdoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0ZXJhYmxlLCBpbmRleCknO1xuICAgICB9ICAgIDtcbiAgICBfX3AgKz0gJykgeyAgICAnO1xuICAgICB9IDtcbiAgICBfX3AgKz0gXG4gICAgKG9iai5sb29wICkgK1xuICAgICc7ICAgICc7XG4gICAgIGlmIChvYmouaGFzRW51bVByb3RvdHlwZSB8fCBvYmoudXNlSGFzKSB7XG4gICAgX19wICs9ICdcXG4gICAgfSc7XG4gICAgIH0gO1xuICAgIF9fcCArPSAnXFxuICB9ICAnO1xuICAgICB9IDtcbiAgICBcbiAgICAgaWYgKG9iai5oYXNEb250RW51bUJ1Zykge1xuICAgIF9fcCArPSAnXFxuXFxuICB2YXIgY3RvciA9IGl0ZXJhYmxlLmNvbnN0cnVjdG9yO1xcbiAgICAnO1xuICAgICBmb3IgKHZhciBrID0gMDsgayA8IDc7IGsrKykge1xuICAgIF9fcCArPSAnXFxuICBpbmRleCA9IFxcJycgK1xuICAgIChvYmouc2hhZG93ZWRba10gKSArXG4gICAgJ1xcJztcXG4gIGlmICgnO1xuICAgICAgICAgIGlmIChvYmouc2hhZG93ZWRba10gPT0gJ2NvbnN0cnVjdG9yJykge1xuICAgIF9fcCArPSAnIShjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBpdGVyYWJsZSkgJiYgJztcbiAgICAgICAgICB9IDtcbiAgICBfX3AgKz0gJ2hhc093blByb3BlcnR5LmNhbGwoaXRlcmFibGUsIGluZGV4KSkge1xcbiAgICAnICtcbiAgICAob2JqLmxvb3AgKSArXG4gICAgJ1xcbiAgfSAgICAnO1xuICAgICB9IDtcbiAgICBcbiAgICAgfSA7XG4gICAgXG4gICAgIGlmIChvYmouYXJyYXlzIHx8IG9iai5ub25FbnVtQXJncykge1xuICAgIF9fcCArPSAnXFxufSc7XG4gICAgIH0gO1xuICAgIF9fcCArPSBcbiAgICAob2JqLmJvdHRvbSApICtcbiAgICAnO1xcbnJldHVybiByZXN1bHQnO1xuICAgIFxuICAgIFxuICAgIHJldHVybiBfX3BcbiAgfTtcblxuICAvKiogUmV1c2FibGUgaXRlcmF0b3Igb3B0aW9ucyBmb3IgYGFzc2lnbmAgYW5kIGBkZWZhdWx0c2AgKi9cbiAgdmFyIGRlZmF1bHRzSXRlcmF0b3JPcHRpb25zID0ge1xuICAgICdhcmdzJzogJ29iamVjdCwgc291cmNlLCBndWFyZCcsXG4gICAgJ3RvcCc6XG4gICAgICAndmFyIGFyZ3MgPSBhcmd1bWVudHMsXFxuJyArXG4gICAgICAnICAgIGFyZ3NJbmRleCA9IDAsXFxuJyArXG4gICAgICBcIiAgICBhcmdzTGVuZ3RoID0gdHlwZW9mIGd1YXJkID09ICdudW1iZXInID8gMiA6IGFyZ3MubGVuZ3RoO1xcblwiICtcbiAgICAgICd3aGlsZSAoKythcmdzSW5kZXggPCBhcmdzTGVuZ3RoKSB7XFxuJyArXG4gICAgICAnICBpdGVyYWJsZSA9IGFyZ3NbYXJnc0luZGV4XTtcXG4nICtcbiAgICAgICcgIGlmIChpdGVyYWJsZSAmJiBvYmplY3RUeXBlc1t0eXBlb2YgaXRlcmFibGVdKSB7JyxcbiAgICAnbG9vcCc6IFwiaWYgKHR5cGVvZiByZXN1bHRbaW5kZXhdID09ICd1bmRlZmluZWQnKSByZXN1bHRbaW5kZXhdID0gaXRlcmFibGVbaW5kZXhdXCIsXG4gICAgJ2JvdHRvbSc6ICcgIH1cXG59J1xuICB9O1xuXG4gIC8qKiBSZXVzYWJsZSBpdGVyYXRvciBvcHRpb25zIHNoYXJlZCBieSBgZWFjaGAsIGBmb3JJbmAsIGFuZCBgZm9yT3duYCAqL1xuICB2YXIgZWFjaEl0ZXJhdG9yT3B0aW9ucyA9IHtcbiAgICAnYXJncyc6ICdjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZycsXG4gICAgJ3RvcCc6IFwiY2FsbGJhY2sgPSBjYWxsYmFjayAmJiB0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJyA/IGNhbGxiYWNrIDogY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpXCIsXG4gICAgJ2FycmF5cyc6IFwidHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJ1wiLFxuICAgICdsb29wJzogJ2lmIChjYWxsYmFjayhpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBjb2xsZWN0aW9uKSA9PT0gZmFsc2UpIHJldHVybiByZXN1bHQnXG4gIH07XG5cbiAgLyoqIFJldXNhYmxlIGl0ZXJhdG9yIG9wdGlvbnMgZm9yIGBmb3JJbmAgYW5kIGBmb3JPd25gICovXG4gIHZhciBmb3JPd25JdGVyYXRvck9wdGlvbnMgPSB7XG4gICAgJ3RvcCc6ICdpZiAoIW9iamVjdFR5cGVzW3R5cGVvZiBpdGVyYWJsZV0pIHJldHVybiByZXN1bHQ7XFxuJyArIGVhY2hJdGVyYXRvck9wdGlvbnMudG9wLFxuICAgICdhcnJheXMnOiBmYWxzZVxuICB9O1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gb3B0aW1pemVkIHRvIHNlYXJjaCBsYXJnZSBhcnJheXMgZm9yIGEgZ2l2ZW4gYHZhbHVlYCxcbiAgICogc3RhcnRpbmcgYXQgYGZyb21JbmRleGAsIHVzaW5nIHN0cmljdCBlcXVhbGl0eSBmb3IgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzZWFyY2guXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbGFyZ2VTaXplPTMwXSBUaGUgbGVuZ3RoIGF0IHdoaWNoIGFuIGFycmF5IGlzIGNvbnNpZGVyZWQgbGFyZ2UuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICAgKi9cbiAgZnVuY3Rpb24gY2FjaGVkQ29udGFpbnMoYXJyYXksIGZyb21JbmRleCwgbGFyZ2VTaXplKSB7XG4gICAgZnJvbUluZGV4IHx8IChmcm9tSW5kZXggPSAwKTtcblxuICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIGlzTGFyZ2UgPSAobGVuZ3RoIC0gZnJvbUluZGV4KSA+PSAobGFyZ2VTaXplIHx8IGxhcmdlQXJyYXlTaXplKTtcblxuICAgIGlmIChpc0xhcmdlKSB7XG4gICAgICB2YXIgY2FjaGUgPSB7fSxcbiAgICAgICAgICBpbmRleCA9IGZyb21JbmRleCAtIDE7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIC8vIG1hbnVhbGx5IGNvZXJjZSBgdmFsdWVgIHRvIGEgc3RyaW5nIGJlY2F1c2UgYGhhc093blByb3BlcnR5YCwgaW4gc29tZVxuICAgICAgICAvLyBvbGRlciB2ZXJzaW9ucyBvZiBGaXJlZm94LCBjb2VyY2VzIG9iamVjdHMgaW5jb3JyZWN0bHlcbiAgICAgICAgdmFyIGtleSA9IGFycmF5W2luZGV4XSArICcnO1xuICAgICAgICAoaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwga2V5KSA/IGNhY2hlW2tleV0gOiAoY2FjaGVba2V5XSA9IFtdKSkucHVzaChhcnJheVtpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmIChpc0xhcmdlKSB7XG4gICAgICAgIHZhciBrZXkgPSB2YWx1ZSArICcnO1xuICAgICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwga2V5KSAmJiBpbmRleE9mKGNhY2hlW2tleV0sIHZhbHVlKSA+IC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpID4gLTE7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgYF8ubWF4YCBhbmQgYF8ubWluYCBhcyB0aGUgZGVmYXVsdCBgY2FsbGJhY2tgIHdoZW4gYSBnaXZlblxuICAgKiBgY29sbGVjdGlvbmAgaXMgYSBzdHJpbmcgdmFsdWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBUaGUgY2hhcmFjdGVyIHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIGNvZGUgdW5pdCBvZiBnaXZlbiBjaGFyYWN0ZXIuXG4gICAqL1xuICBmdW5jdGlvbiBjaGFyQXRDYWxsYmFjayh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5jaGFyQ29kZUF0KDApO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgYHNvcnRCeWAgdG8gY29tcGFyZSB0cmFuc2Zvcm1lZCBgY29sbGVjdGlvbmAgdmFsdWVzLCBzdGFibGUgc29ydGluZ1xuICAgKiB0aGVtIGluIGFzY2VuZGluZyBvcmRlci5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBjb21wYXJlIHRvIGBiYC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb21wYXJlIHRvIGBhYC5cbiAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgc29ydCBvcmRlciBpbmRpY2F0b3Igb2YgYDFgIG9yIGAtMWAuXG4gICAqL1xuICBmdW5jdGlvbiBjb21wYXJlQXNjZW5kaW5nKGEsIGIpIHtcbiAgICB2YXIgYWkgPSBhLmluZGV4LFxuICAgICAgICBiaSA9IGIuaW5kZXg7XG5cbiAgICBhID0gYS5jcml0ZXJpYTtcbiAgICBiID0gYi5jcml0ZXJpYTtcblxuICAgIC8vIGVuc3VyZSBhIHN0YWJsZSBzb3J0IGluIFY4IGFuZCBvdGhlciBlbmdpbmVzXG4gICAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9OTBcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgaWYgKGEgPiBiIHx8IHR5cGVvZiBhID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgICAgfVxuICAgICAgaWYgKGEgPCBiIHx8IHR5cGVvZiBiID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFpIDwgYmkgPyAtMSA6IDE7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZ1xuICAgKiBvZiBgdGhpc0FyZ2AgYW5kIHByZXBlbmRzIGFueSBgcGFydGlhbEFyZ3NgIHRvIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZVxuICAgKiBib3VuZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQgb3IgdGhlIG1ldGhvZCBuYW1lLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAgICogQHBhcmFtIHtBcnJheX0gcGFydGlhbEFyZ3MgQW4gYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIHBhcnRpYWxseSBhcHBsaWVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3JpZ2h0SW5kaWNhdG9yXSBVc2VkIHRvIGluZGljYXRlIHBhcnRpYWxseSBhcHBseWluZyBhcmd1bWVudHMgZnJvbSB0aGUgcmlnaHQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJvdW5kIGZ1bmN0aW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlQm91bmQoZnVuYywgdGhpc0FyZywgcGFydGlhbEFyZ3MsIHJpZ2h0SW5kaWNhdG9yKSB7XG4gICAgdmFyIGlzRnVuYyA9IGlzRnVuY3Rpb24oZnVuYyksXG4gICAgICAgIGlzUGFydGlhbCA9ICFwYXJ0aWFsQXJncyxcbiAgICAgICAga2V5ID0gdGhpc0FyZztcblxuICAgIC8vIGp1Z2dsZSBhcmd1bWVudHNcbiAgICBpZiAoaXNQYXJ0aWFsKSB7XG4gICAgICBwYXJ0aWFsQXJncyA9IHRoaXNBcmc7XG4gICAgfVxuICAgIGlmICghaXNGdW5jKSB7XG4gICAgICB0aGlzQXJnID0gZnVuYztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBib3VuZCgpIHtcbiAgICAgIC8vIGBGdW5jdGlvbiNiaW5kYCBzcGVjXG4gICAgICAvLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS4zLjQuNVxuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgdGhpc0JpbmRpbmcgPSBpc1BhcnRpYWwgPyB0aGlzIDogdGhpc0FyZztcblxuICAgICAgaWYgKCFpc0Z1bmMpIHtcbiAgICAgICAgZnVuYyA9IHRoaXNBcmdba2V5XTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJ0aWFsQXJncy5sZW5ndGgpIHtcbiAgICAgICAgYXJncyA9IGFyZ3MubGVuZ3RoXG4gICAgICAgICAgPyAoYXJncyA9IHNsaWNlKGFyZ3MpLCByaWdodEluZGljYXRvciA/IGFyZ3MuY29uY2F0KHBhcnRpYWxBcmdzKSA6IHBhcnRpYWxBcmdzLmNvbmNhdChhcmdzKSlcbiAgICAgICAgICA6IHBhcnRpYWxBcmdzO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAvLyBlbnN1cmUgYG5ldyBib3VuZGAgaXMgYW4gaW5zdGFuY2Ugb2YgYGJvdW5kYCBhbmQgYGZ1bmNgXG4gICAgICAgIG5vb3AucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICAgIHRoaXNCaW5kaW5nID0gbmV3IG5vb3A7XG4gICAgICAgIG5vb3AucHJvdG90eXBlID0gbnVsbDtcblxuICAgICAgICAvLyBtaW1pYyB0aGUgY29uc3RydWN0b3IncyBgcmV0dXJuYCBiZWhhdmlvclxuICAgICAgICAvLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxMy4yLjJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0JpbmRpbmcsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gaXNPYmplY3QocmVzdWx0KSA/IHJlc3VsdCA6IHRoaXNCaW5kaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0JpbmRpbmcsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gYm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogUHJvZHVjZXMgYSBjYWxsYmFjayBib3VuZCB0byBhbiBvcHRpb25hbCBgdGhpc0FyZ2AuIElmIGBmdW5jYCBpcyBhIHByb3BlcnR5XG4gICAqIG5hbWUsIHRoZSBjcmVhdGVkIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBmb3IgYSBnaXZlbiBlbGVtZW50LlxuICAgKiBJZiBgZnVuY2AgaXMgYW4gb2JqZWN0LCB0aGUgY3JlYXRlZCBjYWxsYmFjayB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzXG4gICAqIHRoYXQgY29udGFpbiB0aGUgZXF1aXZhbGVudCBvYmplY3QgcHJvcGVydGllcywgb3RoZXJ3aXNlIGl0IHdpbGwgcmV0dXJuIGBmYWxzZWAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFtmdW5jPWlkZW50aXR5XSBUaGUgdmFsdWUgdG8gY29udmVydCB0byBhIGNhbGxiYWNrLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjcmVhdGVkIGNhbGxiYWNrLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2FyZ0NvdW50PTNdIFRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHRoZSBjYWxsYmFjayBhY2NlcHRzLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUNhbGxiYWNrKGZ1bmMsIHRoaXNBcmcsIGFyZ0NvdW50KSB7XG4gICAgaWYgKGZ1bmMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGlkZW50aXR5O1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBmdW5jO1xuICAgIGlmICh0eXBlICE9ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICh0eXBlICE9ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICByZXR1cm4gb2JqZWN0W2Z1bmNdO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmFyIHByb3BzID0ga2V5cyhmdW5jKTtcbiAgICAgIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBpc0VxdWFsKG9iamVjdFtwcm9wc1tsZW5ndGhdXSwgZnVuY1twcm9wc1tsZW5ndGhdXSwgaW5kaWNhdG9yT2JqZWN0KSkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzQXJnICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoYXJnQ291bnQgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoYXJnQ291bnQgPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGEsIGIpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKGFyZ0NvdW50ID09PSA0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgICAgICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIG9iamVjdCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaW5kZXgsIG9iamVjdCk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gZnVuYztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGNvbXBpbGVkIGl0ZXJhdGlvbiBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uczEsIG9wdGlvbnMyLCAuLi5dIFRoZSBjb21waWxlIG9wdGlvbnMgb2JqZWN0KHMpLlxuICAgKiAgYXJyYXlzIC0gQSBzdHJpbmcgb2YgY29kZSB0byBkZXRlcm1pbmUgaWYgdGhlIGl0ZXJhYmxlIGlzIGFuIGFycmF5IG9yIGFycmF5LWxpa2UuXG4gICAqICB1c2VIYXMgLSBBIGJvb2xlYW4gdG8gc3BlY2lmeSB1c2luZyBgaGFzT3duUHJvcGVydHlgIGNoZWNrcyBpbiB0aGUgb2JqZWN0IGxvb3AuXG4gICAqICBhcmdzIC0gQSBzdHJpbmcgb2YgY29tbWEgc2VwYXJhdGVkIGFyZ3VtZW50cyB0aGUgaXRlcmF0aW9uIGZ1bmN0aW9uIHdpbGwgYWNjZXB0LlxuICAgKiAgdG9wIC0gQSBzdHJpbmcgb2YgY29kZSB0byBleGVjdXRlIGJlZm9yZSB0aGUgaXRlcmF0aW9uIGJyYW5jaGVzLlxuICAgKiAgbG9vcCAtIEEgc3RyaW5nIG9mIGNvZGUgdG8gZXhlY3V0ZSBpbiB0aGUgb2JqZWN0IGxvb3AuXG4gICAqICBib3R0b20gLSBBIHN0cmluZyBvZiBjb2RlIHRvIGV4ZWN1dGUgYWZ0ZXIgdGhlIGl0ZXJhdGlvbiBicmFuY2hlcy5cbiAgICpcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBjb21waWxlZCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUl0ZXJhdG9yKCkge1xuICAgIHZhciBkYXRhID0ge1xuICAgICAgLy8gc3VwcG9ydCBwcm9wZXJ0aWVzXG4gICAgICAnaGFzRG9udEVudW1CdWcnOiBoYXNEb250RW51bUJ1ZyxcbiAgICAgICdoYXNFbnVtUHJvdG90eXBlJzogaGFzRW51bVByb3RvdHlwZSxcbiAgICAgICdpc0tleXNGYXN0JzogaXNLZXlzRmFzdCxcbiAgICAgICdub25FbnVtQXJncyc6IG5vbkVudW1BcmdzLFxuICAgICAgJ25vQ2hhckJ5SW5kZXgnOiBub0NoYXJCeUluZGV4LFxuICAgICAgJ3NoYWRvd2VkJzogc2hhZG93ZWQsXG5cbiAgICAgIC8vIGl0ZXJhdG9yIG9wdGlvbnNcbiAgICAgICdhcnJheXMnOiAnaXNBcnJheShpdGVyYWJsZSknLFxuICAgICAgJ2JvdHRvbSc6ICcnLFxuICAgICAgJ2xvb3AnOiAnJyxcbiAgICAgICd0b3AnOiAnJyxcbiAgICAgICd1c2VIYXMnOiB0cnVlXG4gICAgfTtcblxuICAgIC8vIG1lcmdlIG9wdGlvbnMgaW50byBhIHRlbXBsYXRlIGRhdGEgb2JqZWN0XG4gICAgZm9yICh2YXIgb2JqZWN0LCBpbmRleCA9IDA7IG9iamVjdCA9IGFyZ3VtZW50c1tpbmRleF07IGluZGV4KyspIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgZGF0YVtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBhcmdzID0gZGF0YS5hcmdzO1xuICAgIGRhdGEuZmlyc3RBcmcgPSAvXlteLF0rLy5leGVjKGFyZ3MpWzBdO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBmdW5jdGlvbiBmYWN0b3J5XG4gICAgdmFyIGZhY3RvcnkgPSBGdW5jdGlvbihcbiAgICAgICAgJ2NyZWF0ZUNhbGxiYWNrLCBoYXNPd25Qcm9wZXJ0eSwgaXNBcmd1bWVudHMsIGlzQXJyYXksIGlzU3RyaW5nLCAnICtcbiAgICAgICAgJ29iamVjdFR5cGVzLCBuYXRpdmVLZXlzJyxcbiAgICAgICdyZXR1cm4gZnVuY3Rpb24oJyArIGFyZ3MgKyAnKSB7XFxuJyArIGl0ZXJhdG9yVGVtcGxhdGUoZGF0YSkgKyAnXFxufSdcbiAgICApO1xuICAgIC8vIHJldHVybiB0aGUgY29tcGlsZWQgZnVuY3Rpb25cbiAgICByZXR1cm4gZmFjdG9yeShcbiAgICAgIGNyZWF0ZUNhbGxiYWNrLCBoYXNPd25Qcm9wZXJ0eSwgaXNBcmd1bWVudHMsIGlzQXJyYXksIGlzU3RyaW5nLFxuICAgICAgb2JqZWN0VHlwZXMsIG5hdGl2ZUtleXNcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gY29tcGlsZWQgdG8gaXRlcmF0ZSBgYXJndW1lbnRzYCBvYmplY3RzLCBhcnJheXMsIG9iamVjdHMsIGFuZFxuICAgKiBzdHJpbmdzIGNvbnNpc3Rlbmx5IGFjcm9zcyBlbnZpcm9ubWVudHMsIGV4ZWN1dGluZyB0aGUgYGNhbGxiYWNrYCBmb3IgZWFjaFxuICAgKiBlbGVtZW50IGluIHRoZSBgY29sbGVjdGlvbmAuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICAgKiB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLiBDYWxsYmFja3MgbWF5IGV4aXRcbiAgICogaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R8U3RyaW5nfSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAgICovXG4gIHZhciBlYWNoID0gY3JlYXRlSXRlcmF0b3IoZWFjaEl0ZXJhdG9yT3B0aW9ucyk7XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgYHRlbXBsYXRlYCB0byBlc2NhcGUgY2hhcmFjdGVycyBmb3IgaW5jbHVzaW9uIGluIGNvbXBpbGVkXG4gICAqIHN0cmluZyBsaXRlcmFscy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1hdGNoIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICAgKi9cbiAgZnVuY3Rpb24gZXNjYXBlU3RyaW5nQ2hhcihtYXRjaCkge1xuICAgIHJldHVybiAnXFxcXCcgKyBzdHJpbmdFc2NhcGVzW21hdGNoXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IGBlc2NhcGVgIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWF0Y2ggVGhlIG1hdGNoZWQgY2hhcmFjdGVyIHRvIGVzY2FwZS5cbiAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gICAqL1xuICBmdW5jdGlvbiBlc2NhcGVIdG1sQ2hhcihtYXRjaCkge1xuICAgIHJldHVybiBodG1sRXNjYXBlc1ttYXRjaF07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBET00gbm9kZSBpbiBJRSA8IDkuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdmFsdWVgIGlzIGEgRE9NIG5vZGUsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGlzTm9kZSh2YWx1ZSkge1xuICAgIC8vIElFIDwgOSBwcmVzZW50cyBET00gbm9kZXMgYXMgYE9iamVjdGAgb2JqZWN0cyBleGNlcHQgdGhleSBoYXZlIGB0b1N0cmluZ2BcbiAgICAvLyBtZXRob2RzIHRoYXQgYXJlIGB0eXBlb2ZgIFwic3RyaW5nXCIgYW5kIHN0aWxsIGNhbiBjb2VyY2Ugbm9kZXMgdG8gc3RyaW5nc1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgKHZhbHVlICsgJycpID09ICdzdHJpbmcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbm8tb3BlcmF0aW9uIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gbm9vcCgpIHtcbiAgICAvLyBubyBvcGVyYXRpb24gcGVyZm9ybWVkXG4gIH1cblxuICAvKipcbiAgICogU2xpY2VzIHRoZSBgY29sbGVjdGlvbmAgZnJvbSB0aGUgYHN0YXJ0YCBpbmRleCB1cCB0bywgYnV0IG5vdCBpbmNsdWRpbmcsXG4gICAqIHRoZSBgZW5kYCBpbmRleC5cbiAgICpcbiAgICogTm90ZTogVGhpcyBmdW5jdGlvbiBpcyB1c2VkLCBpbnN0ZWFkIG9mIGBBcnJheSNzbGljZWAsIHRvIHN1cHBvcnQgbm9kZSBsaXN0c1xuICAgKiBpbiBJRSA8IDkgYW5kIHRvIGVuc3VyZSBkZW5zZSBhcnJheXMgYXJlIHJldHVybmVkLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2xpY2UuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdGFydCBUaGUgc3RhcnQgaW5kZXguXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbmQgVGhlIGVuZCBpbmRleC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkuXG4gICAqL1xuICBmdW5jdGlvbiBzbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICAgIHN0YXJ0IHx8IChzdGFydCA9IDApO1xuICAgIGlmICh0eXBlb2YgZW5kID09ICd1bmRlZmluZWQnKSB7XG4gICAgICBlbmQgPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gICAgfVxuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBlbmQgLSBzdGFydCB8fCAwLFxuICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGggPCAwID8gMCA6IGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IGFycmF5W3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgYnkgYHVuZXNjYXBlYCB0byBjb252ZXJ0IEhUTUwgZW50aXRpZXMgdG8gY2hhcmFjdGVycy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1hdGNoIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byB1bmVzY2FwZS5cbiAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgdW5lc2NhcGVkIGNoYXJhY3Rlci5cbiAgICovXG4gIGZ1bmN0aW9uIHVuZXNjYXBlSHRtbENoYXIobWF0Y2gpIHtcbiAgICByZXR1cm4gaHRtbFVuZXNjYXBlc1ttYXRjaF07XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy5pc0FyZ3VtZW50cyhhcmd1bWVudHMpOyB9KSgxLCAyLCAzKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzQ2xhc3M7XG4gIH1cbiAgLy8gZmFsbGJhY2sgZm9yIGJyb3dzZXJzIHRoYXQgY2FuJ3QgZGV0ZWN0IGBhcmd1bWVudHNgIG9iamVjdHMgYnkgW1tDbGFzc11dXG4gIGlmIChub0FyZ3NDbGFzcykge1xuICAgIGlzQXJndW1lbnRzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZSA/IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSA6IGZhbHNlO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBgb2JqZWN0YCdzIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcywgZXhlY3V0aW5nXG4gICAqIHRoZSBgY2FsbGJhY2tgIGZvciBlYWNoIHByb3BlcnR5LiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kXG4gICAqIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwga2V5LCBvYmplY3QpLiBDYWxsYmFja3MgbWF5IGV4aXQgaXRlcmF0aW9uXG4gICAqIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHR5cGUgRnVuY3Rpb25cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogZnVuY3Rpb24gRG9nKG5hbWUpIHtcbiAgICogICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgKiB9XG4gICAqXG4gICAqIERvZy5wcm90b3R5cGUuYmFyayA9IGZ1bmN0aW9uKCkge1xuICAgKiAgIGFsZXJ0KCdXb29mLCB3b29mIScpO1xuICAgKiB9O1xuICAgKlxuICAgKiBfLmZvckluKG5ldyBEb2coJ0RhZ255JyksIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICogICBhbGVydChrZXkpO1xuICAgKiB9KTtcbiAgICogLy8gPT4gYWxlcnRzICduYW1lJyBhbmQgJ2JhcmsnIChvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAgICovXG4gIHZhciBmb3JJbiA9IGNyZWF0ZUl0ZXJhdG9yKGVhY2hJdGVyYXRvck9wdGlvbnMsIGZvck93bkl0ZXJhdG9yT3B0aW9ucywge1xuICAgICd1c2VIYXMnOiBmYWxzZVxuICB9KTtcblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBhbiBvYmplY3QncyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLCBleGVjdXRpbmcgdGhlIGBjYWxsYmFja2BcbiAgICogZm9yIGVhY2ggcHJvcGVydHkuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gICAqIGFyZ3VtZW50czsgKHZhbHVlLCBrZXksIG9iamVjdCkuIENhbGxiYWNrcyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICAgKiByZXR1cm5pbmcgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAdHlwZSBGdW5jdGlvblxuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmZvck93bih7ICcwJzogJ3plcm8nLCAnMSc6ICdvbmUnLCAnbGVuZ3RoJzogMiB9LCBmdW5jdGlvbihudW0sIGtleSkge1xuICAgKiAgIGFsZXJ0KGtleSk7XG4gICAqIH0pO1xuICAgKiAvLyA9PiBhbGVydHMgJzAnLCAnMScsIGFuZCAnbGVuZ3RoJyAob3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gICAqL1xuICB2YXIgZm9yT3duID0gY3JlYXRlSXRlcmF0b3IoZWFjaEl0ZXJhdG9yT3B0aW9ucywgZm9yT3duSXRlcmF0b3JPcHRpb25zKTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIChmdW5jdGlvbigpIHsgcmV0dXJuIF8uaXNBcnJheShhcmd1bWVudHMpOyB9KSgpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgdmFyIGlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgLy8gYGluc3RhbmNlb2ZgIG1heSBjYXVzZSBhIG1lbW9yeSBsZWFrIGluIElFIDcgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0XG4gICAgLy8gaHR0cDovL2FqYXhpYW4uY29tL2FyY2hpdmVzL3dvcmtpbmctYXJvdW5nLXRoZS1pbnN0YW5jZW9mLW1lbW9yeS1sZWFrXG4gICAgcmV0dXJuIChhcmdzQXJlT2JqZWN0cyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB8fCB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcnJheUNsYXNzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IGNvbXBvc2VkIG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmtleXMoeyAnb25lJzogMSwgJ3R3byc6IDIsICd0aHJlZSc6IDMgfSk7XG4gICAqIC8vID0+IFsnb25lJywgJ3R3bycsICd0aHJlZSddIChvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAgICovXG4gIHZhciBrZXlzID0gIW5hdGl2ZUtleXMgPyBzaGltS2V5cyA6IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgICBpZiAoKGhhc0VudW1Qcm90b3R5cGUgJiYgdHlwZW9mIG9iamVjdCA9PSAnZnVuY3Rpb24nKSB8fFxuICAgICAgICAobm9uRW51bUFyZ3MgJiYgb2JqZWN0Lmxlbmd0aCAmJiBpc0FyZ3VtZW50cyhvYmplY3QpKSkge1xuICAgICAgcmV0dXJuIHNoaW1LZXlzKG9iamVjdCk7XG4gICAgfVxuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24gb2YgYGlzUGxhaW5PYmplY3RgIHRoYXQgY2hlY2tzIGlmIGEgZ2l2ZW4gYHZhbHVlYFxuICAgKiBpcyBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IsIGFzc3VtaW5nIG9iamVjdHMgY3JlYXRlZFxuICAgKiBieSB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IgaGF2ZSBubyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFuZCB0aGF0XG4gICAqIHRoZXJlIGFyZSBubyBgT2JqZWN0LnByb3RvdHlwZWAgZXh0ZW5zaW9ucy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIHNoaW1Jc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gICAgLy8gYXZvaWQgbm9uLW9iamVjdHMgYW5kIGZhbHNlIHBvc2l0aXZlcyBmb3IgYGFyZ3VtZW50c2Agb2JqZWN0c1xuICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICBpZiAoISh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gY2hlY2sgdGhhdCB0aGUgY29uc3RydWN0b3IgaXMgYE9iamVjdGAgKGkuZS4gYE9iamVjdCBpbnN0YW5jZW9mIE9iamVjdGApXG4gICAgdmFyIGN0b3IgPSB2YWx1ZS5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoKCFpc0Z1bmN0aW9uKGN0b3IpICYmICghbm9Ob2RlQ2xhc3MgfHwgIWlzTm9kZSh2YWx1ZSkpKSB8fCBjdG9yIGluc3RhbmNlb2YgY3Rvcikge1xuICAgICAgLy8gSUUgPCA5IGl0ZXJhdGVzIGluaGVyaXRlZCBwcm9wZXJ0aWVzIGJlZm9yZSBvd24gcHJvcGVydGllcy4gSWYgdGhlIGZpcnN0XG4gICAgICAvLyBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3QncyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkXG4gICAgICAvLyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gICAgICBpZiAoaXRlcmF0ZXNPd25MYXN0KSB7XG4gICAgICAgIGZvckluKHZhbHVlLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICAgICAgICByZXN1bHQgPSAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBJbiBtb3N0IGVudmlyb25tZW50cyBhbiBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYmVmb3JlXG4gICAgICAvLyBpdHMgaW5oZXJpdGVkIHByb3BlcnRpZXMuIElmIHRoZSBsYXN0IGl0ZXJhdGVkIHByb3BlcnR5IGlzIGFuIG9iamVjdCdzXG4gICAgICAvLyBvd24gcHJvcGVydHkgdGhlbiB0aGVyZSBhcmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgICAgIGZvckluKHZhbHVlLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHJlc3VsdCA9IGtleTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gZmFsc2UgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgcmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBPYmplY3Qua2V5c2AgdGhhdCBwcm9kdWNlcyBhbiBhcnJheSBvZiB0aGVcbiAgICogZ2l2ZW4gb2JqZWN0J3Mgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gICAqL1xuICBmdW5jdGlvbiBzaGltS2V5cyhvYmplY3QpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9yT3duKG9iamVjdCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gY29udmVydCBjaGFyYWN0ZXJzIHRvIEhUTUwgZW50aXRpZXM6XG4gICAqXG4gICAqIFRob3VnaCB0aGUgYD5gIGNoYXJhY3RlciBpcyBlc2NhcGVkIGZvciBzeW1tZXRyeSwgY2hhcmFjdGVycyBsaWtlIGA+YCBhbmQgYC9gXG4gICAqIGRvbid0IHJlcXVpcmUgZXNjYXBpbmcgaW4gSFRNTCBhbmQgaGF2ZSBubyBzcGVjaWFsIG1lYW5pbmcgdW5sZXNzIHRoZXkncmUgcGFydFxuICAgKiBvZiBhIHRhZyBvciBhbiB1bnF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuXG4gICAqIGh0dHA6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2FtYmlndW91cy1hbXBlcnNhbmRzICh1bmRlciBcInNlbWktcmVsYXRlZCBmdW4gZmFjdFwiKVxuICAgKi9cbiAgdmFyIGh0bWxFc2NhcGVzID0ge1xuICAgICcmJzogJyZhbXA7JyxcbiAgICAnPCc6ICcmbHQ7JyxcbiAgICAnPic6ICcmZ3Q7JyxcbiAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICBcIidcIjogJyYjMzk7J1xuICB9O1xuXG4gIC8qKiBVc2VkIHRvIGNvbnZlcnQgSFRNTCBlbnRpdGllcyB0byBjaGFyYWN0ZXJzICovXG4gIHZhciBodG1sVW5lc2NhcGVzID0gaW52ZXJ0KGh0bWxFc2NhcGVzKTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gICAqIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzIHdpbGwgb3ZlcndyaXRlIHByb3BlcnkgYXNzaWdubWVudHMgb2YgcHJldmlvdXNcbiAgICogc291cmNlcy4gSWYgYSBgY2FsbGJhY2tgIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSBleGVjdXRlZCB0byBwcm9kdWNlXG4gICAqIHRoZSBhc3NpZ25lZCB2YWx1ZXMuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoXG4gICAqIHR3byBhcmd1bWVudHM7IChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUpLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAqIEBhbGlhcyBleHRlbmRcbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3NvdXJjZTEsIHNvdXJjZTIsIC4uLl0gVGhlIHNvdXJjZSBvYmplY3RzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduaW5nIHZhbHVlcy5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uYXNzaWduKHsgJ25hbWUnOiAnbW9lJyB9LCB7ICdhZ2UnOiA0MCB9KTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfVxuICAgKlxuICAgKiB2YXIgZGVmYXVsdHMgPSBfLnBhcnRpYWxSaWdodChfLmFzc2lnbiwgZnVuY3Rpb24oYSwgYikge1xuICAgKiAgIHJldHVybiB0eXBlb2YgYSA9PSAndW5kZWZpbmVkJyA/IGIgOiBhO1xuICAgKiB9KTtcbiAgICpcbiAgICogdmFyIGZvb2QgPSB7ICduYW1lJzogJ2FwcGxlJyB9O1xuICAgKiBkZWZhdWx0cyhmb29kLCB7ICduYW1lJzogJ2JhbmFuYScsICd0eXBlJzogJ2ZydWl0JyB9KTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdhcHBsZScsICd0eXBlJzogJ2ZydWl0JyB9XG4gICAqL1xuICB2YXIgYXNzaWduID0gY3JlYXRlSXRlcmF0b3IoZGVmYXVsdHNJdGVyYXRvck9wdGlvbnMsIHtcbiAgICAndG9wJzpcbiAgICAgIGRlZmF1bHRzSXRlcmF0b3JPcHRpb25zLnRvcC5yZXBsYWNlKCc7JyxcbiAgICAgICAgJztcXG4nICtcbiAgICAgICAgXCJpZiAoYXJnc0xlbmd0aCA+IDMgJiYgdHlwZW9mIGFyZ3NbYXJnc0xlbmd0aCAtIDJdID09ICdmdW5jdGlvbicpIHtcXG5cIiArXG4gICAgICAgICcgIHZhciBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGFyZ3NbLS1hcmdzTGVuZ3RoIC0gMV0sIGFyZ3NbYXJnc0xlbmd0aC0tXSwgMik7XFxuJyArXG4gICAgICAgIFwifSBlbHNlIGlmIChhcmdzTGVuZ3RoID4gMiAmJiB0eXBlb2YgYXJnc1thcmdzTGVuZ3RoIC0gMV0gPT0gJ2Z1bmN0aW9uJykge1xcblwiICtcbiAgICAgICAgJyAgY2FsbGJhY2sgPSBhcmdzWy0tYXJnc0xlbmd0aF07XFxuJyArXG4gICAgICAgICd9J1xuICAgICAgKSxcbiAgICAnbG9vcCc6ICdyZXN1bHRbaW5kZXhdID0gY2FsbGJhY2sgPyBjYWxsYmFjayhyZXN1bHRbaW5kZXhdLCBpdGVyYWJsZVtpbmRleF0pIDogaXRlcmFibGVbaW5kZXhdJ1xuICB9KTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNsb25lIG9mIGB2YWx1ZWAuIElmIGBkZWVwYCBpcyBgdHJ1ZWAsIG5lc3RlZCBvYmplY3RzIHdpbGwgYWxzb1xuICAgKiBiZSBjbG9uZWQsIG90aGVyd2lzZSB0aGV5IHdpbGwgYmUgYXNzaWduZWQgYnkgcmVmZXJlbmNlLiBJZiBhIGBjYWxsYmFja2BcbiAgICogZnVuY3Rpb24gaXMgcGFzc2VkLCBpdCB3aWxsIGJlIGV4ZWN1dGVkIHRvIHByb2R1Y2UgdGhlIGNsb25lZCB2YWx1ZXMuIElmXG4gICAqIGBjYWxsYmFja2AgcmV0dXJucyBgdW5kZWZpbmVkYCwgY2xvbmluZyB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLlxuICAgKiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ7ICh2YWx1ZSkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtkZWVwPWZhbHNlXSBBIGZsYWcgdG8gaW5kaWNhdGUgYSBkZWVwIGNsb25lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZyB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHBhcmFtLSB7QXJyYXl9IFtzdGFja0E9W11dIEludGVybmFsbHkgdXNlZCB0byB0cmFjayB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gICAqIEBwYXJhbS0ge0FycmF5fSBbc3RhY2tCPVtdXSBJbnRlcm5hbGx5IHVzZWQgdG8gYXNzb2NpYXRlIGNsb25lcyB3aXRoIHNvdXJjZSBjb3VudGVycGFydHMuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgY2xvbmVkIGB2YWx1ZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBzdG9vZ2VzID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH0sXG4gICAqICAgeyAnbmFtZSc6ICdsYXJyeScsICdhZ2UnOiA1MCB9XG4gICAqIF07XG4gICAqXG4gICAqIHZhciBzaGFsbG93ID0gXy5jbG9uZShzdG9vZ2VzKTtcbiAgICogc2hhbGxvd1swXSA9PT0gc3Rvb2dlc1swXTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiB2YXIgZGVlcCA9IF8uY2xvbmUoc3Rvb2dlcywgdHJ1ZSk7XG4gICAqIGRlZXBbMF0gPT09IHN0b29nZXNbMF07XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8ubWl4aW4oe1xuICAgKiAgICdjbG9uZSc6IF8ucGFydGlhbFJpZ2h0KF8uY2xvbmUsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAqICAgICByZXR1cm4gXy5pc0VsZW1lbnQodmFsdWUpID8gdmFsdWUuY2xvbmVOb2RlKGZhbHNlKSA6IHVuZGVmaW5lZDtcbiAgICogICB9KVxuICAgKiB9KTtcbiAgICpcbiAgICogdmFyIGNsb25lID0gXy5jbG9uZShkb2N1bWVudC5ib2R5KTtcbiAgICogY2xvbmUuY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAqIC8vID0+IDBcbiAgICovXG4gIGZ1bmN0aW9uIGNsb25lKHZhbHVlLCBkZWVwLCBjYWxsYmFjaywgdGhpc0FyZywgc3RhY2tBLCBzdGFja0IpIHtcbiAgICB2YXIgcmVzdWx0ID0gdmFsdWU7XG5cbiAgICAvLyBhbGxvd3Mgd29ya2luZyB3aXRoIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzIHdpdGhvdXQgdXNpbmcgdGhlaXIgYGNhbGxiYWNrYFxuICAgIC8vIGFyZ3VtZW50LCBgaW5kZXh8a2V5YCwgZm9yIHRoaXMgbWV0aG9kJ3MgYGNhbGxiYWNrYFxuICAgIGlmICh0eXBlb2YgZGVlcCA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzQXJnID0gY2FsbGJhY2s7XG4gICAgICBjYWxsYmFjayA9IGRlZXA7XG4gICAgICBkZWVwID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2sgPSB0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJyA/IGNhbGxiYWNrIDogY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIDEpO1xuICAgICAgcmVzdWx0ID0gY2FsbGJhY2socmVzdWx0KTtcblxuICAgICAgdmFyIGRvbmUgPSB0eXBlb2YgcmVzdWx0ICE9ICd1bmRlZmluZWQnO1xuICAgICAgaWYgKCFkb25lKSB7XG4gICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpbnNwZWN0IFtbQ2xhc3NdXVxuICAgIHZhciBpc09iaiA9IGlzT2JqZWN0KHJlc3VsdCk7XG4gICAgaWYgKGlzT2JqKSB7XG4gICAgICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChyZXN1bHQpO1xuICAgICAgaWYgKCFjbG9uZWFibGVDbGFzc2VzW2NsYXNzTmFtZV0gfHwgKG5vTm9kZUNsYXNzICYmIGlzTm9kZShyZXN1bHQpKSkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdmFyIGlzQXJyID0gaXNBcnJheShyZXN1bHQpO1xuICAgIH1cbiAgICAvLyBzaGFsbG93IGNsb25lXG4gICAgaWYgKCFpc09iaiB8fCAhZGVlcCkge1xuICAgICAgcmV0dXJuIGlzT2JqICYmICFkb25lXG4gICAgICAgID8gKGlzQXJyID8gc2xpY2UocmVzdWx0KSA6IGFzc2lnbih7fSwgcmVzdWx0KSlcbiAgICAgICAgOiByZXN1bHQ7XG4gICAgfVxuICAgIHZhciBjdG9yID0gY3RvckJ5Q2xhc3NbY2xhc3NOYW1lXTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgY2FzZSBib29sQ2xhc3M6XG4gICAgICBjYXNlIGRhdGVDbGFzczpcbiAgICAgICAgcmV0dXJuIGRvbmUgPyByZXN1bHQgOiBuZXcgY3RvcigrcmVzdWx0KTtcblxuICAgICAgY2FzZSBudW1iZXJDbGFzczpcbiAgICAgIGNhc2Ugc3RyaW5nQ2xhc3M6XG4gICAgICAgIHJldHVybiBkb25lID8gcmVzdWx0IDogbmV3IGN0b3IocmVzdWx0KTtcblxuICAgICAgY2FzZSByZWdleHBDbGFzczpcbiAgICAgICAgcmV0dXJuIGRvbmUgPyByZXN1bHQgOiBjdG9yKHJlc3VsdC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhyZXN1bHQpKTtcbiAgICB9XG4gICAgLy8gY2hlY2sgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIHJldHVybiBjb3JyZXNwb25kaW5nIGNsb25lXG4gICAgc3RhY2tBIHx8IChzdGFja0EgPSBbXSk7XG4gICAgc3RhY2tCIHx8IChzdGFja0IgPSBbXSk7XG5cbiAgICB2YXIgbGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIGlmIChzdGFja0FbbGVuZ3RoXSA9PSB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGluaXQgY2xvbmVkIG9iamVjdFxuICAgIGlmICghZG9uZSkge1xuICAgICAgcmVzdWx0ID0gaXNBcnIgPyBjdG9yKHJlc3VsdC5sZW5ndGgpIDoge307XG5cbiAgICAgIC8vIGFkZCBhcnJheSBwcm9wZXJ0aWVzIGFzc2lnbmVkIGJ5IGBSZWdFeHAjZXhlY2BcbiAgICAgIGlmIChpc0Fycikge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2luZGV4JykpIHtcbiAgICAgICAgICByZXN1bHQuaW5kZXggPSB2YWx1ZS5pbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2lucHV0JykpIHtcbiAgICAgICAgICByZXN1bHQuaW5wdXQgPSB2YWx1ZS5pbnB1dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBhZGQgdGhlIHNvdXJjZSB2YWx1ZSB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHNcbiAgICAvLyBhbmQgYXNzb2NpYXRlIGl0IHdpdGggaXRzIGNsb25lXG4gICAgc3RhY2tBLnB1c2godmFsdWUpO1xuICAgIHN0YWNrQi5wdXNoKHJlc3VsdCk7XG5cbiAgICAvLyByZWN1cnNpdmVseSBwb3B1bGF0ZSBjbG9uZSAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpXG4gICAgKGlzQXJyID8gZm9yRWFjaCA6IGZvck93bikoZG9uZSA/IHJlc3VsdCA6IHZhbHVlLCBmdW5jdGlvbihvYmpWYWx1ZSwga2V5KSB7XG4gICAgICByZXN1bHRba2V5XSA9IGNsb25lKG9ialZhbHVlLCBkZWVwLCBjYWxsYmFjaywgdW5kZWZpbmVkLCBzdGFja0EsIHN0YWNrQik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkZWVwIGNsb25lIG9mIGB2YWx1ZWAuIElmIGEgYGNhbGxiYWNrYCBmdW5jdGlvbiBpcyBwYXNzZWQsIGl0IHdpbGxcbiAgICogYmUgZXhlY3V0ZWQgdG8gcHJvZHVjZSB0aGUgY2xvbmVkIHZhbHVlcy4gSWYgYGNhbGxiYWNrYCByZXR1cm5zIHRoZSB2YWx1ZSBpdFxuICAgKiB3YXMgcGFzc2VkLCBjbG9uaW5nIHdpbGwgYmUgaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY2FsbGJhY2tgIGlzXG4gICAqIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDsgKHZhbHVlKS5cbiAgICpcbiAgICogTm90ZTogVGhpcyBmdW5jdGlvbiBpcyBsb29zZWx5IGJhc2VkIG9uIHRoZSBzdHJ1Y3R1cmVkIGNsb25lIGFsZ29yaXRobS4gRnVuY3Rpb25zXG4gICAqIGFuZCBET00gbm9kZXMgYXJlICoqbm90KiogY2xvbmVkLiBUaGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGBhcmd1bWVudHNgIG9iamVjdHMgYW5kXG4gICAqIG9iamVjdHMgY3JlYXRlZCBieSBjb25zdHJ1Y3RvcnMgb3RoZXIgdGhhbiBgT2JqZWN0YCBhcmUgY2xvbmVkIHRvIHBsYWluIGBPYmplY3RgIG9iamVjdHMuXG4gICAqIFNlZSBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9pbmZyYXN0cnVjdHVyZS5odG1sI2ludGVybmFsLXN0cnVjdHVyZWQtY2xvbmluZy1hbGdvcml0aG0uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGRlZXAgY2xvbmUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjbG9uaW5nIHZhbHVlcy5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGRlZXAgY2xvbmVkIGB2YWx1ZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBzdG9vZ2VzID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH0sXG4gICAqICAgeyAnbmFtZSc6ICdsYXJyeScsICdhZ2UnOiA1MCB9XG4gICAqIF07XG4gICAqXG4gICAqIHZhciBkZWVwID0gXy5jbG9uZURlZXAoc3Rvb2dlcyk7XG4gICAqIGRlZXBbMF0gPT09IHN0b29nZXNbMF07XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIHZhciB2aWV3ID0ge1xuICAgKiAgICdsYWJlbCc6ICdkb2NzJyxcbiAgICogICAnbm9kZSc6IGVsZW1lbnRcbiAgICogfTtcbiAgICpcbiAgICogdmFyIGNsb25lID0gXy5jbG9uZURlZXAodmlldywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICogICByZXR1cm4gXy5pc0VsZW1lbnQodmFsdWUpID8gdmFsdWUuY2xvbmVOb2RlKHRydWUpIDogdmFsdWU7XG4gICAqIH0pO1xuICAgKlxuICAgKiBjbG9uZS5ub2RlID09IHZpZXcubm9kZTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIGNsb25lRGVlcCh2YWx1ZSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gY2xvbmUodmFsdWUsIHRydWUsIGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ25zIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdChzKSB0byB0aGUgZGVzdGluYXRpb25cbiAgICogb2JqZWN0IGZvciBhbGwgZGVzdGluYXRpb24gcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAuIE9uY2UgYVxuICAgKiBwcm9wZXJ0eSBpcyBzZXQsIGFkZGl0aW9uYWwgZGVmYXVsdHMgb2YgdGhlIHNhbWUgcHJvcGVydHkgd2lsbCBiZSBpZ25vcmVkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2UxLCBzb3VyY2UyLCAuLi5dIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAgICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEludGVybmFsbHkgdXNlZCB0byBhbGxvdyB3b3JraW5nIHdpdGggYF8ucmVkdWNlYFxuICAgKiAgd2l0aG91dCB1c2luZyBpdHMgY2FsbGJhY2sncyBga2V5YCBhbmQgYG9iamVjdGAgYXJndW1lbnRzIGFzIHNvdXJjZXMuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGZvb2QgPSB7ICduYW1lJzogJ2FwcGxlJyB9O1xuICAgKiBfLmRlZmF1bHRzKGZvb2QsIHsgJ25hbWUnOiAnYmFuYW5hJywgJ3R5cGUnOiAnZnJ1aXQnIH0pO1xuICAgKiAvLyA9PiB7ICduYW1lJzogJ2FwcGxlJywgJ3R5cGUnOiAnZnJ1aXQnIH1cbiAgICovXG4gIHZhciBkZWZhdWx0cyA9IGNyZWF0ZUl0ZXJhdG9yKGRlZmF1bHRzSXRlcmF0b3JPcHRpb25zKTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNvcnRlZCBhcnJheSBvZiBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLCBvd24gYW5kIGluaGVyaXRlZCxcbiAgICogb2YgYG9iamVjdGAgdGhhdCBoYXZlIGZ1bmN0aW9uIHZhbHVlcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAYWxpYXMgbWV0aG9kc1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIHRoYXQgaGF2ZSBmdW5jdGlvbiB2YWx1ZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZnVuY3Rpb25zKF8pO1xuICAgKiAvLyA9PiBbJ2FsbCcsICdhbnknLCAnYmluZCcsICdiaW5kQWxsJywgJ2Nsb25lJywgJ2NvbXBhY3QnLCAnY29tcG9zZScsIC4uLl1cbiAgICovXG4gIGZ1bmN0aW9uIGZ1bmN0aW9ucyhvYmplY3QpIHtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgZm9ySW4ob2JqZWN0LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0LnNvcnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgYHByb3BlcnR5YCBleGlzdHMgYW5kIGlzIGEgZGlyZWN0IHByb3BlcnR5LFxuICAgKiBpbnN0ZWFkIG9mIGFuIGluaGVyaXRlZCBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2hlY2suXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eSBUaGUgcHJvcGVydHkgdG8gY2hlY2sgZm9yLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYga2V5IGlzIGEgZGlyZWN0IHByb3BlcnR5LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaGFzKHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9LCAnYicpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBoYXMob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBvYmplY3QgPyBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpIDogZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIGludmVydGVkIGtleXMgYW5kIHZhbHVlcyBvZiB0aGUgZ2l2ZW4gYG9iamVjdGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGludmVydC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY3JlYXRlZCBpbnZlcnRlZCBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqICBfLmludmVydCh7ICdmaXJzdCc6ICdtb2UnLCAnc2Vjb25kJzogJ2xhcnJ5JyB9KTtcbiAgICogLy8gPT4geyAnbW9lJzogJ2ZpcnN0JywgJ2xhcnJ5JzogJ3NlY29uZCcgfSAob3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gICAqL1xuICBmdW5jdGlvbiBpbnZlcnQob2JqZWN0KSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIHByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgIHJlc3VsdCA9IHt9O1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICByZXN1bHRbb2JqZWN0W2tleV1dID0ga2V5O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYm9vbGVhbiB2YWx1ZS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYSBib29sZWFuIHZhbHVlLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNCb29sZWFuKG51bGwpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNCb29sZWFuKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB0cnVlIHx8IHZhbHVlID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSBib29sQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBkYXRlLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhIGRhdGUsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0RhdGUobmV3IERhdGUpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc0RhdGUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBEYXRlIHx8IHRvU3RyaW5nLmNhbGwodmFsdWUpID09IGRhdGVDbGFzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIERPTSBlbGVtZW50LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhIERPTSBlbGVtZW50LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNFbGVtZW50KGRvY3VtZW50LmJvZHkpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc0VsZW1lbnQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS5ub2RlVHlwZSA9PT0gMSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGVtcHR5LiBBcnJheXMsIHN0cmluZ3MsIG9yIGBhcmd1bWVudHNgIG9iamVjdHMgd2l0aCBhXG4gICAqIGxlbmd0aCBvZiBgMGAgYW5kIG9iamVjdHMgd2l0aCBubyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFyZSBjb25zaWRlcmVkXG4gICAqIFwiZW1wdHlcIi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGVtcHR5LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNFbXB0eShbMSwgMiwgM10pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzRW1wdHkoe30pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNFbXB0eSgnJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcblxuICAgIGlmICgoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MgfHwgY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzIHx8XG4gICAgICAgIGNsYXNzTmFtZSA9PSBhcmdzQ2xhc3MgfHwgKG5vQXJnc0NsYXNzICYmIGlzQXJndW1lbnRzKHZhbHVlKSkpIHx8XG4gICAgICAgIChjbGFzc05hbWUgPT0gb2JqZWN0Q2xhc3MgJiYgdHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJyAmJiBpc0Z1bmN0aW9uKHZhbHVlLnNwbGljZSkpKSB7XG4gICAgICByZXR1cm4gIWxlbmd0aDtcbiAgICB9XG4gICAgZm9yT3duKHZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiAocmVzdWx0ID0gZmFsc2UpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBkZWVwIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZVxuICAgKiBlcXVpdmFsZW50IHRvIGVhY2ggb3RoZXIuIElmIGBjYWxsYmFja2AgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIGV4ZWN1dGVkIHRvXG4gICAqIGNvbXBhcmUgdmFsdWVzLiBJZiBgY2FsbGJhY2tgIHJldHVybnMgYHVuZGVmaW5lZGAsIGNvbXBhcmlzb25zIHdpbGwgYmUgaGFuZGxlZFxuICAgKiBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoXG4gICAqIHR3byBhcmd1bWVudHM7IChhLCBiKS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSBhIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0ge01peGVkfSBiIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaW5nIHZhbHVlcy5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcGFyYW0tIHtPYmplY3R9IFtzdGFja0E9W11dIEludGVybmFsbHkgdXNlZCB0cmFjayB0cmF2ZXJzZWQgYGFgIG9iamVjdHMuXG4gICAqIEBwYXJhbS0ge09iamVjdH0gW3N0YWNrQj1bXV0gSW50ZXJuYWxseSB1c2VkIHRyYWNrIHRyYXZlcnNlZCBgYmAgb2JqZWN0cy5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgdmFsdWVzIGFyZSBlcXV2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIG1vZSA9IHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH07XG4gICAqIHZhciBjb3B5ID0geyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfTtcbiAgICpcbiAgICogbW9lID09IGNvcHk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNFcXVhbChtb2UsIGNvcHkpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIHZhciB3b3JkcyA9IFsnaGVsbG8nLCAnZ29vZGJ5ZSddO1xuICAgKiB2YXIgb3RoZXJXb3JkcyA9IFsnaGknLCAnZ29vZGJ5ZSddO1xuICAgKlxuICAgKiBfLmlzRXF1YWwod29yZHMsIG90aGVyV29yZHMsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICogICB2YXIgcmVHcmVldCA9IC9eKD86aGVsbG98aGkpJC9pLFxuICAgKiAgICAgICBhR3JlZXQgPSBfLmlzU3RyaW5nKGEpICYmIHJlR3JlZXQudGVzdChhKSxcbiAgICogICAgICAgYkdyZWV0ID0gXy5pc1N0cmluZyhiKSAmJiByZUdyZWV0LnRlc3QoYik7XG4gICAqXG4gICAqICAgcmV0dXJuIChhR3JlZXQgfHwgYkdyZWV0KSA/IChhR3JlZXQgPT0gYkdyZWV0KSA6IHVuZGVmaW5lZDtcbiAgICogfSk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIGZ1bmN0aW9uIGlzRXF1YWwoYSwgYiwgY2FsbGJhY2ssIHRoaXNBcmcsIHN0YWNrQSwgc3RhY2tCKSB7XG4gICAgLy8gdXNlZCB0byBpbmRpY2F0ZSB0aGF0IHdoZW4gY29tcGFyaW5nIG9iamVjdHMsIGBhYCBoYXMgYXQgbGVhc3QgdGhlIHByb3BlcnRpZXMgb2YgYGJgXG4gICAgdmFyIHdoZXJlSW5kaWNhdG9yID0gY2FsbGJhY2sgPT09IGluZGljYXRvck9iamVjdDtcbiAgICBpZiAoY2FsbGJhY2sgJiYgIXdoZXJlSW5kaWNhdG9yKSB7XG4gICAgICBjYWxsYmFjayA9IHR5cGVvZiB0aGlzQXJnID09ICd1bmRlZmluZWQnID8gY2FsbGJhY2sgOiBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZywgMik7XG4gICAgICB2YXIgcmVzdWx0ID0gY2FsbGJhY2soYSwgYik7XG4gICAgICBpZiAodHlwZW9mIHJlc3VsdCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gISFyZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGV4aXQgZWFybHkgZm9yIGlkZW50aWNhbCB2YWx1ZXNcbiAgICBpZiAoYSA9PT0gYikge1xuICAgICAgLy8gdHJlYXQgYCswYCB2cy4gYC0wYCBhcyBub3QgZXF1YWxcbiAgICAgIHJldHVybiBhICE9PSAwIHx8ICgxIC8gYSA9PSAxIC8gYik7XG4gICAgfVxuICAgIHZhciB0eXBlID0gdHlwZW9mIGEsXG4gICAgICAgIG90aGVyVHlwZSA9IHR5cGVvZiBiO1xuXG4gICAgLy8gZXhpdCBlYXJseSBmb3IgdW5saWtlIHByaW1pdGl2ZSB2YWx1ZXNcbiAgICBpZiAoYSA9PT0gYSAmJlxuICAgICAgICAoIWEgfHwgKHR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiB0eXBlICE9ICdvYmplY3QnKSkgJiZcbiAgICAgICAgKCFiIHx8IChvdGhlclR5cGUgIT0gJ2Z1bmN0aW9uJyAmJiBvdGhlclR5cGUgIT0gJ29iamVjdCcpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBleGl0IGVhcmx5IGZvciBgbnVsbGAgYW5kIGB1bmRlZmluZWRgLCBhdm9pZGluZyBFUzMncyBGdW5jdGlvbiNjYWxsIGJlaGF2aW9yXG4gICAgLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMy40LjRcbiAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgfVxuICAgIC8vIGNvbXBhcmUgW1tDbGFzc11dIG5hbWVzXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSksXG4gICAgICAgIG90aGVyQ2xhc3MgPSB0b1N0cmluZy5jYWxsKGIpO1xuXG4gICAgaWYgKGNsYXNzTmFtZSA9PSBhcmdzQ2xhc3MpIHtcbiAgICAgIGNsYXNzTmFtZSA9IG9iamVjdENsYXNzO1xuICAgIH1cbiAgICBpZiAob3RoZXJDbGFzcyA9PSBhcmdzQ2xhc3MpIHtcbiAgICAgIG90aGVyQ2xhc3MgPSBvYmplY3RDbGFzcztcbiAgICB9XG4gICAgaWYgKGNsYXNzTmFtZSAhPSBvdGhlckNsYXNzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICBjYXNlIGJvb2xDbGFzczpcbiAgICAgIGNhc2UgZGF0ZUNsYXNzOlxuICAgICAgICAvLyBjb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgICAgLy8gdG8gYDFgIG9yIGAwYCwgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbFxuICAgICAgICByZXR1cm4gK2EgPT0gK2I7XG5cbiAgICAgIGNhc2UgbnVtYmVyQ2xhc3M6XG4gICAgICAgIC8vIHRyZWF0IGBOYU5gIHZzLiBgTmFOYCBhcyBlcXVhbFxuICAgICAgICByZXR1cm4gYSAhPSArYVxuICAgICAgICAgID8gYiAhPSArYlxuICAgICAgICAgIC8vIGJ1dCB0cmVhdCBgKzBgIHZzLiBgLTBgIGFzIG5vdCBlcXVhbFxuICAgICAgICAgIDogKGEgPT0gMCA/ICgxIC8gYSA9PSAxIC8gYikgOiBhID09ICtiKTtcblxuICAgICAgY2FzZSByZWdleHBDbGFzczpcbiAgICAgIGNhc2Ugc3RyaW5nQ2xhc3M6XG4gICAgICAgIC8vIGNvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgKGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjEwLjYuNClcbiAgICAgICAgLy8gdHJlYXQgc3RyaW5nIHByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IGluc3RhbmNlcyBhcyBlcXVhbFxuICAgICAgICByZXR1cm4gYSA9PSBiICsgJyc7XG4gICAgfVxuICAgIHZhciBpc0FyciA9IGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzO1xuICAgIGlmICghaXNBcnIpIHtcbiAgICAgIC8vIHVud3JhcCBhbnkgYGxvZGFzaGAgd3JhcHBlZCB2YWx1ZXNcbiAgICAgIGlmIChhLl9fd3JhcHBlZF9fIHx8IGIuX193cmFwcGVkX18pIHtcbiAgICAgICAgcmV0dXJuIGlzRXF1YWwoYS5fX3dyYXBwZWRfXyB8fCBhLCBiLl9fd3JhcHBlZF9fIHx8IGIsIGNhbGxiYWNrLCB0aGlzQXJnLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICB9XG4gICAgICAvLyBleGl0IGZvciBmdW5jdGlvbnMgYW5kIERPTSBub2Rlc1xuICAgICAgaWYgKGNsYXNzTmFtZSAhPSBvYmplY3RDbGFzcyB8fCAobm9Ob2RlQ2xhc3MgJiYgKGlzTm9kZShhKSB8fCBpc05vZGUoYikpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBpbiBvbGRlciB2ZXJzaW9ucyBvZiBPcGVyYSwgYGFyZ3VtZW50c2Agb2JqZWN0cyBoYXZlIGBBcnJheWAgY29uc3RydWN0b3JzXG4gICAgICB2YXIgY3RvckEgPSAhYXJnc0FyZU9iamVjdHMgJiYgaXNBcmd1bWVudHMoYSkgPyBPYmplY3QgOiBhLmNvbnN0cnVjdG9yLFxuICAgICAgICAgIGN0b3JCID0gIWFyZ3NBcmVPYmplY3RzICYmIGlzQXJndW1lbnRzKGIpID8gT2JqZWN0IDogYi5jb25zdHJ1Y3RvcjtcblxuICAgICAgLy8gbm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWxcbiAgICAgIGlmIChjdG9yQSAhPSBjdG9yQiAmJiAhKFxuICAgICAgICAgICAgaXNGdW5jdGlvbihjdG9yQSkgJiYgY3RvckEgaW5zdGFuY2VvZiBjdG9yQSAmJlxuICAgICAgICAgICAgaXNGdW5jdGlvbihjdG9yQikgJiYgY3RvckIgaW5zdGFuY2VvZiBjdG9yQlxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBhc3N1bWUgY3ljbGljIHN0cnVjdHVyZXMgYXJlIGVxdWFsXG4gICAgLy8gdGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpYyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjFcbiAgICAvLyBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gIChodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS4xMi4zKVxuICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gICAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gYSkge1xuICAgICAgICByZXR1cm4gc3RhY2tCW2xlbmd0aF0gPT0gYjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHNpemUgPSAwO1xuICAgIHJlc3VsdCA9IHRydWU7XG5cbiAgICAvLyBhZGQgYGFgIGFuZCBgYmAgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzXG4gICAgc3RhY2tBLnB1c2goYSk7XG4gICAgc3RhY2tCLnB1c2goYik7XG5cbiAgICAvLyByZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpXG4gICAgaWYgKGlzQXJyKSB7XG4gICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgIHNpemUgPSBiLmxlbmd0aDtcblxuICAgICAgLy8gY29tcGFyZSBsZW5ndGhzIHRvIGRldGVybWluZSBpZiBhIGRlZXAgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnlcbiAgICAgIHJlc3VsdCA9IHNpemUgPT0gYS5sZW5ndGg7XG4gICAgICBpZiAoIXJlc3VsdCAmJiAhd2hlcmVJbmRpY2F0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIC8vIGRlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXNcbiAgICAgIHdoaWxlIChzaXplLS0pIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbGVuZ3RoLFxuICAgICAgICAgICAgdmFsdWUgPSBiW3NpemVdO1xuXG4gICAgICAgIGlmICh3aGVyZUluZGljYXRvcikge1xuICAgICAgICAgIHdoaWxlIChpbmRleC0tKSB7XG4gICAgICAgICAgICBpZiAoKHJlc3VsdCA9IGlzRXF1YWwoYVtpbmRleF0sIHZhbHVlLCBjYWxsYmFjaywgdGhpc0FyZywgc3RhY2tBLCBzdGFja0IpKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIShyZXN1bHQgPSBpc0VxdWFsKGFbc2l6ZV0sIHZhbHVlLCBjYWxsYmFjaywgdGhpc0FyZywgc3RhY2tBLCBzdGFja0IpKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyBkZWVwIGNvbXBhcmUgb2JqZWN0cyB1c2luZyBgZm9ySW5gLCBpbnN0ZWFkIG9mIGBmb3JPd25gLCB0byBhdm9pZCBgT2JqZWN0LmtleXNgXG4gICAgLy8gd2hpY2gsIGluIHRoaXMgY2FzZSwgaXMgbW9yZSBjb3N0bHlcbiAgICBmb3JJbihiLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBiKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChiLCBrZXkpKSB7XG4gICAgICAgIC8vIGNvdW50IHRoZSBudW1iZXIgb2YgcHJvcGVydGllcy5cbiAgICAgICAgc2l6ZSsrO1xuICAgICAgICAvLyBkZWVwIGNvbXBhcmUgZWFjaCBwcm9wZXJ0eSB2YWx1ZS5cbiAgICAgICAgcmV0dXJuIChyZXN1bHQgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGtleSkgJiYgaXNFcXVhbChhW2tleV0sIHZhbHVlLCBjYWxsYmFjaywgdGhpc0FyZywgc3RhY2tBLCBzdGFja0IpKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChyZXN1bHQgJiYgIXdoZXJlSW5kaWNhdG9yKSB7XG4gICAgICAvLyBlbnN1cmUgYm90aCBvYmplY3RzIGhhdmUgdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXNcbiAgICAgIGZvckluKGEsIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGEpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYSwga2V5KSkge1xuICAgICAgICAgIC8vIGBzaXplYCB3aWxsIGJlIGAtMWAgaWYgYGFgIGhhcyBtb3JlIHByb3BlcnRpZXMgdGhhbiBgYmBcbiAgICAgICAgICByZXR1cm4gKHJlc3VsdCA9IC0tc2l6ZSA+IC0xKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMsIG9yIGNhbiBiZSBjb2VyY2VkIHRvLCBhIGZpbml0ZSBudW1iZXIuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgaXMgbm90IHRoZSBzYW1lIGFzIG5hdGl2ZSBgaXNGaW5pdGVgLCB3aGljaCB3aWxsIHJldHVybiB0cnVlIGZvclxuICAgKiBib29sZWFucyBhbmQgZW1wdHkgc3RyaW5ncy4gU2VlIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjEuMi41LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBmaW5pdGUsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0Zpbml0ZSgtMTAxKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzRmluaXRlKCcxMCcpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNGaW5pdGUodHJ1ZSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNGaW5pdGUoJycpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzRmluaXRlKEluZmluaXR5KTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIGlzRmluaXRlKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUlzRmluaXRlKHZhbHVlKSAmJiAhbmF0aXZlSXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc0Z1bmN0aW9uKF8pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nO1xuICB9XG4gIC8vIGZhbGxiYWNrIGZvciBvbGRlciB2ZXJzaW9ucyBvZiBDaHJvbWUgYW5kIFNhZmFyaVxuICBpZiAoaXNGdW5jdGlvbigveC8pKSB7XG4gICAgaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBGdW5jdGlvbiB8fCB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSBmdW5jQ2xhc3M7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGUgbGFuZ3VhZ2UgdHlwZSBvZiBPYmplY3QuXG4gICAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc09iamVjdCh7fSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNPYmplY3QoMSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIC8vIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyB0aGUgRUNNQVNjcmlwdCBsYW5ndWFnZSB0eXBlIG9mIE9iamVjdFxuICAgIC8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDhcbiAgICAvLyBhbmQgYXZvaWQgYSBWOCBidWdcbiAgICAvLyBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0yMjkxXG4gICAgcmV0dXJuIHZhbHVlID8gb2JqZWN0VHlwZXNbdHlwZW9mIHZhbHVlXSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGBOYU5gLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGlzIG5vdCB0aGUgc2FtZSBhcyBuYXRpdmUgYGlzTmFOYCwgd2hpY2ggd2lsbCByZXR1cm4gYHRydWVgIGZvclxuICAgKiBgdW5kZWZpbmVkYCBhbmQgb3RoZXIgdmFsdWVzLiBTZWUgaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMS4yLjQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGBOYU5gLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNOYU4oTmFOKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzTmFOKG5ldyBOdW1iZXIoTmFOKSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogaXNOYU4odW5kZWZpbmVkKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzTmFOKHVuZGVmaW5lZCk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc05hTih2YWx1ZSkge1xuICAgIC8vIGBOYU5gIGFzIGEgcHJpbWl0aXZlIGlzIHRoZSBvbmx5IHZhbHVlIHRoYXQgaXMgbm90IGVxdWFsIHRvIGl0c2VsZlxuICAgIC8vIChwZXJmb3JtIHRoZSBbW0NsYXNzXV0gY2hlY2sgZmlyc3QgdG8gYXZvaWQgZXJyb3JzIHdpdGggc29tZSBob3N0IG9iamVjdHMgaW4gSUUpXG4gICAgcmV0dXJuIGlzTnVtYmVyKHZhbHVlKSAmJiB2YWx1ZSAhPSArdmFsdWVcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBgbnVsbGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGBudWxsYCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzTnVsbChudWxsKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzTnVsbCh1bmRlZmluZWQpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNOdWxsKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhIG51bWJlciwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzTnVtYmVyKDguNCAqIDUpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc051bWJlcih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gbnVtYmVyQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgZ2l2ZW4gYHZhbHVlYCBpcyBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogZnVuY3Rpb24gU3Rvb2dlKG5hbWUsIGFnZSkge1xuICAgKiAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAqICAgdGhpcy5hZ2UgPSBhZ2U7XG4gICAqIH1cbiAgICpcbiAgICogXy5pc1BsYWluT2JqZWN0KG5ldyBTdG9vZ2UoJ21vZScsIDQwKSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzUGxhaW5PYmplY3QoeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIHZhciBpc1BsYWluT2JqZWN0ID0gIWdldFByb3RvdHlwZU9mID8gc2hpbUlzUGxhaW5PYmplY3QgOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mLFxuICAgICAgICBvYmpQcm90byA9IHR5cGVvZiB2YWx1ZU9mID09ICdmdW5jdGlvbicgJiYgKG9ialByb3RvID0gZ2V0UHJvdG90eXBlT2YodmFsdWVPZikpICYmIGdldFByb3RvdHlwZU9mKG9ialByb3RvKTtcblxuICAgIHJldHVybiBvYmpQcm90b1xuICAgICAgPyB2YWx1ZSA9PSBvYmpQcm90byB8fCAoZ2V0UHJvdG90eXBlT2YodmFsdWUpID09IG9ialByb3RvICYmICFpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgICA6IHNoaW1Jc1BsYWluT2JqZWN0KHZhbHVlKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGEgcmVndWxhciBleHByZXNzaW9uLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNSZWdFeHAoL21vZS8pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc1JlZ0V4cCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCB8fCB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSByZWdleHBDbGFzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHN0cmluZy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYSBzdHJpbmcsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc1N0cmluZygnbW9lJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIGZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzdHJpbmdDbGFzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBgdW5kZWZpbmVkYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc1VuZGVmaW5lZCh2b2lkIDApO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3VuZGVmaW5lZCc7XG4gIH1cblxuICAvKipcbiAgICogUmVjdXJzaXZlbHkgbWVyZ2VzIG93biBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgdGhlIHNvdXJjZSBvYmplY3QocyksIHRoYXRcbiAgICogZG9uJ3QgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCwgaW50byB0aGUgZGVzdGluYXRpb24gb2JqZWN0LiBTdWJzZXF1ZW50IHNvdXJjZXNcbiAgICogd2lsbCBvdmVyd3JpdGUgcHJvcGVyeSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLiBJZiBhIGBjYWxsYmFja2AgZnVuY3Rpb25cbiAgICogaXMgcGFzc2VkLCBpdCB3aWxsIGJlIGV4ZWN1dGVkIHRvIHByb2R1Y2UgdGhlIG1lcmdlZCB2YWx1ZXMgb2YgdGhlIGRlc3RpbmF0aW9uXG4gICAqIGFuZCBzb3VyY2UgcHJvcGVydGllcy4gSWYgYGNhbGxiYWNrYCByZXR1cm5zIGB1bmRlZmluZWRgLCBtZXJnaW5nIHdpbGwgYmVcbiAgICogaGFuZGxlZCBieSB0aGUgbWV0aG9kIGluc3RlYWQuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmRcbiAgICogaW52b2tlZCB3aXRoIHR3byBhcmd1bWVudHM7IChvYmplY3RWYWx1ZSwgc291cmNlVmFsdWUpLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2UxLCBzb3VyY2UyLCAuLi5dIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdpbmcgcHJvcGVydGllcy5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcGFyYW0tIHtPYmplY3R9IFtkZWVwSW5kaWNhdG9yXSBJbnRlcm5hbGx5IHVzZWQgdG8gaW5kaWNhdGUgdGhhdCBgc3RhY2tBYFxuICAgKiAgYW5kIGBzdGFja0JgIGFyZSBhcnJheXMgb2YgdHJhdmVyc2VkIG9iamVjdHMgaW5zdGVhZCBvZiBzb3VyY2Ugb2JqZWN0cy5cbiAgICogQHBhcmFtLSB7QXJyYXl9IFtzdGFja0E9W11dIEludGVybmFsbHkgdXNlZCB0byB0cmFjayB0cmF2ZXJzZWQgc291cmNlIG9iamVjdHMuXG4gICAqIEBwYXJhbS0ge0FycmF5fSBbc3RhY2tCPVtdXSBJbnRlcm5hbGx5IHVzZWQgdG8gYXNzb2NpYXRlIHZhbHVlcyB3aXRoIHRoZWlyXG4gICAqICBzb3VyY2UgY291bnRlcnBhcnRzLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBuYW1lcyA9IHtcbiAgICogICAnc3Rvb2dlcyc6IFtcbiAgICogICAgIHsgJ25hbWUnOiAnbW9lJyB9LFxuICAgKiAgICAgeyAnbmFtZSc6ICdsYXJyeScgfVxuICAgKiAgIF1cbiAgICogfTtcbiAgICpcbiAgICogdmFyIGFnZXMgPSB7XG4gICAqICAgJ3N0b29nZXMnOiBbXG4gICAqICAgICB7ICdhZ2UnOiA0MCB9LFxuICAgKiAgICAgeyAnYWdlJzogNTAgfVxuICAgKiAgIF1cbiAgICogfTtcbiAgICpcbiAgICogXy5tZXJnZShuYW1lcywgYWdlcyk7XG4gICAqIC8vID0+IHsgJ3N0b29nZXMnOiBbeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSwgeyAnbmFtZSc6ICdsYXJyeScsICdhZ2UnOiA1MCB9XSB9XG4gICAqXG4gICAqIHZhciBmb29kID0ge1xuICAgKiAgICdmcnVpdHMnOiBbJ2FwcGxlJ10sXG4gICAqICAgJ3ZlZ2V0YWJsZXMnOiBbJ2JlZXQnXVxuICAgKiB9O1xuICAgKlxuICAgKiB2YXIgb3RoZXJGb29kID0ge1xuICAgKiAgICdmcnVpdHMnOiBbJ2JhbmFuYSddLFxuICAgKiAgICd2ZWdldGFibGVzJzogWydjYXJyb3QnXVxuICAgKiB9O1xuICAgKlxuICAgKiBfLm1lcmdlKGZvb2QsIG90aGVyRm9vZCwgZnVuY3Rpb24oYSwgYikge1xuICAgKiAgIHJldHVybiBfLmlzQXJyYXkoYSkgPyBhLmNvbmNhdChiKSA6IHVuZGVmaW5lZDtcbiAgICogfSk7XG4gICAqIC8vID0+IHsgJ2ZydWl0cyc6IFsnYXBwbGUnLCAnYmFuYW5hJ10sICd2ZWdldGFibGVzJzogWydiZWV0JywgJ2NhcnJvdF0gfVxuICAgKi9cbiAgZnVuY3Rpb24gbWVyZ2Uob2JqZWN0LCBzb3VyY2UsIGRlZXBJbmRpY2F0b3IpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAwLFxuICAgICAgICBsZW5ndGggPSAyO1xuXG4gICAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICBpZiAoZGVlcEluZGljYXRvciA9PT0gaW5kaWNhdG9yT2JqZWN0KSB7XG4gICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzWzNdLFxuICAgICAgICAgIHN0YWNrQSA9IGFyZ3NbNF0sXG4gICAgICAgICAgc3RhY2tCID0gYXJnc1s1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhY2tBID0gW107XG4gICAgICBzdGFja0IgPSBbXTtcblxuICAgICAgLy8gYWxsb3dzIHdvcmtpbmcgd2l0aCBgXy5yZWR1Y2VgIGFuZCBgXy5yZWR1Y2VSaWdodGAgd2l0aG91dFxuICAgICAgLy8gdXNpbmcgdGhlaXIgYGNhbGxiYWNrYCBhcmd1bWVudHMsIGBpbmRleHxrZXlgIGFuZCBgY29sbGVjdGlvbmBcbiAgICAgIGlmICh0eXBlb2YgZGVlcEluZGljYXRvciAhPSAnbnVtYmVyJykge1xuICAgICAgICBsZW5ndGggPSBhcmdzLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGlmIChsZW5ndGggPiAzICYmIHR5cGVvZiBhcmdzW2xlbmd0aCAtIDJdID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhhcmdzWy0tbGVuZ3RoIC0gMV0sIGFyZ3NbbGVuZ3RoLS1dLCAyKTtcbiAgICAgIH0gZWxzZSBpZiAobGVuZ3RoID4gMiAmJiB0eXBlb2YgYXJnc1tsZW5ndGggLSAxXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gYXJnc1stLWxlbmd0aF07XG4gICAgICB9XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAoaXNBcnJheShhcmdzW2luZGV4XSkgPyBmb3JFYWNoIDogZm9yT3duKShhcmdzW2luZGV4XSwgZnVuY3Rpb24oc291cmNlLCBrZXkpIHtcbiAgICAgICAgdmFyIGZvdW5kLFxuICAgICAgICAgICAgaXNBcnIsXG4gICAgICAgICAgICByZXN1bHQgPSBzb3VyY2UsXG4gICAgICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgICAgIGlmIChzb3VyY2UgJiYgKChpc0FyciA9IGlzQXJyYXkoc291cmNlKSkgfHwgaXNQbGFpbk9iamVjdChzb3VyY2UpKSkge1xuICAgICAgICAgIC8vIGF2b2lkIG1lcmdpbmcgcHJldmlvdXNseSBtZXJnZWQgY3ljbGljIHNvdXJjZXNcbiAgICAgICAgICB2YXIgc3RhY2tMZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlIChzdGFja0xlbmd0aC0tKSB7XG4gICAgICAgICAgICBpZiAoKGZvdW5kID0gc3RhY2tBW3N0YWNrTGVuZ3RoXSA9PSBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gc3RhY2tCW3N0YWNrTGVuZ3RoXTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIHZhbHVlID0gaXNBcnJcbiAgICAgICAgICAgICAgPyAoaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFtdKVxuICAgICAgICAgICAgICA6IChpc1BsYWluT2JqZWN0KHZhbHVlKSA/IHZhbHVlIDoge30pO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2sodmFsdWUsIHNvdXJjZSk7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSByZXN1bHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCBgc291cmNlYCBhbmQgYXNzb2NpYXRlZCBgdmFsdWVgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0c1xuICAgICAgICAgICAgc3RhY2tBLnB1c2goc291cmNlKTtcbiAgICAgICAgICAgIHN0YWNrQi5wdXNoKHZhbHVlKTtcblxuICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cylcbiAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSBtZXJnZSh2YWx1ZSwgc291cmNlLCBpbmRpY2F0b3JPYmplY3QsIGNhbGxiYWNrLCBzdGFja0EsIHN0YWNrQik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2sodmFsdWUsIHNvdXJjZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICByZXN1bHQgPSBzb3VyY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzaGFsbG93IGNsb25lIG9mIGBvYmplY3RgIGV4Y2x1ZGluZyB0aGUgc3BlY2lmaWVkIHByb3BlcnRpZXMuXG4gICAqIFByb3BlcnR5IG5hbWVzIG1heSBiZSBzcGVjaWZpZWQgYXMgaW5kaXZpZHVhbCBhcmd1bWVudHMgb3IgYXMgYXJyYXlzIG9mXG4gICAqIHByb3BlcnR5IG5hbWVzLiBJZiBhIGBjYWxsYmFja2AgZnVuY3Rpb24gaXMgcGFzc2VkLCBpdCB3aWxsIGJlIGV4ZWN1dGVkXG4gICAqIGZvciBlYWNoIHByb3BlcnR5IGluIHRoZSBgb2JqZWN0YCwgb21pdHRpbmcgdGhlIHByb3BlcnRpZXMgYGNhbGxiYWNrYFxuICAgKiByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZFxuICAgKiB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBrZXksIG9iamVjdCkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrfFtwcm9wMSwgcHJvcDIsIC4uLl0gVGhlIHByb3BlcnRpZXMgdG8gb21pdFxuICAgKiAgb3IgdGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGhvdXQgdGhlIG9taXR0ZWQgcHJvcGVydGllcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5vbWl0KHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH0sICdhZ2UnKTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdtb2UnIH1cbiAgICpcbiAgICogXy5vbWl0KHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAqICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJztcbiAgICogfSk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnbW9lJyB9XG4gICAqL1xuICBmdW5jdGlvbiBvbWl0KG9iamVjdCwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgaXNGdW5jID0gdHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicsXG4gICAgICAgIHJlc3VsdCA9IHt9O1xuXG4gICAgaWYgKGlzRnVuYykge1xuICAgICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBwcm9wcyA9IGNvbmNhdC5hcHBseShhcnJheVJlZiwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgZm9ySW4ob2JqZWN0LCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICAgIGlmIChpc0Z1bmNcbiAgICAgICAgICAgID8gIWNhbGxiYWNrKHZhbHVlLCBrZXksIG9iamVjdClcbiAgICAgICAgICAgIDogaW5kZXhPZihwcm9wcywga2V5LCAxKSA8IDBcbiAgICAgICAgICApIHtcbiAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSB0d28gZGltZW5zaW9uYWwgYXJyYXkgb2YgdGhlIGdpdmVuIG9iamVjdCdzIGtleS12YWx1ZSBwYWlycyxcbiAgICogaS5lLiBgW1trZXkxLCB2YWx1ZTFdLCBba2V5MiwgdmFsdWUyXV1gLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgbmV3IGFycmF5IG9mIGtleS12YWx1ZSBwYWlycy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5wYWlycyh7ICdtb2UnOiAzMCwgJ2xhcnJ5JzogNDAgfSk7XG4gICAqIC8vID0+IFtbJ21vZScsIDMwXSwgWydsYXJyeScsIDQwXV0gKG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKi9cbiAgZnVuY3Rpb24gcGFpcnMob2JqZWN0KSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIHByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBba2V5LCBvYmplY3Rba2V5XV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNoYWxsb3cgY2xvbmUgb2YgYG9iamVjdGAgY29tcG9zZWQgb2YgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgKiBQcm9wZXJ0eSBuYW1lcyBtYXkgYmUgc3BlY2lmaWVkIGFzIGluZGl2aWR1YWwgYXJndW1lbnRzIG9yIGFzIGFycmF5cyBvZiBwcm9wZXJ0eVxuICAgKiBuYW1lcy4gSWYgYGNhbGxiYWNrYCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgZXhlY3V0ZWQgZm9yIGVhY2ggcHJvcGVydHkgaW4gdGhlXG4gICAqIGBvYmplY3RgLCBwaWNraW5nIHRoZSBwcm9wZXJ0aWVzIGBjYWxsYmFja2AgcmV0dXJucyB0cnV0aHkgZm9yLiBUaGUgYGNhbGxiYWNrYFxuICAgKiBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwga2V5LCBvYmplY3QpLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gICAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb258U3RyaW5nfSBjYWxsYmFja3xbcHJvcDEsIHByb3AyLCAuLi5dIFRoZSBmdW5jdGlvbiBjYWxsZWRcbiAgICogIHBlciBpdGVyYXRpb24gb3IgcHJvcGVydGllcyB0byBwaWNrLCBlaXRoZXIgYXMgaW5kaXZpZHVhbCBhcmd1bWVudHMgb3IgYXJyYXlzLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBwaWNrZWQgcHJvcGVydGllcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5waWNrKHsgJ25hbWUnOiAnbW9lJywgJ191c2VyaWQnOiAnbW9lMScgfSwgJ25hbWUnKTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdtb2UnIH1cbiAgICpcbiAgICogXy5waWNrKHsgJ25hbWUnOiAnbW9lJywgJ191c2VyaWQnOiAnbW9lMScgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgKiAgIHJldHVybiBrZXkuY2hhckF0KDApICE9ICdfJztcbiAgICogfSk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnbW9lJyB9XG4gICAqL1xuICBmdW5jdGlvbiBwaWNrKG9iamVjdCwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgaW5kZXggPSAwLFxuICAgICAgICAgIHByb3BzID0gY29uY2F0LmFwcGx5KGFycmF5UmVmLCBhcmd1bWVudHMpLFxuICAgICAgICAgIGxlbmd0aCA9IGlzT2JqZWN0KG9iamVjdCkgPyBwcm9wcy5sZW5ndGggOiAwO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICBmb3JJbihvYmplY3QsIGZ1bmN0aW9uKHZhbHVlLCBrZXksIG9iamVjdCkge1xuICAgICAgICBpZiAoY2FsbGJhY2sodmFsdWUsIGtleSwgb2JqZWN0KSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgY29tcG9zZWQgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IHZhbHVlcyBvZiBgb2JqZWN0YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy52YWx1ZXMoeyAnb25lJzogMSwgJ3R3byc6IDIsICd0aHJlZSc6IDMgfSk7XG4gICAqIC8vID0+IFsxLCAyLCAzXVxuICAgKi9cbiAgZnVuY3Rpb24gdmFsdWVzKG9iamVjdCkge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBwcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBvYmplY3RbcHJvcHNbaW5kZXhdXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIGVsZW1lbnRzIGZyb20gdGhlIHNwZWNpZmllZCBpbmRleGVzLCBvciBrZXlzLCBvZiB0aGVcbiAgICogYGNvbGxlY3Rpb25gLiBJbmRleGVzIG1heSBiZSBzcGVjaWZpZWQgYXMgaW5kaXZpZHVhbCBhcmd1bWVudHMgb3IgYXMgYXJyYXlzXG4gICAqIG9mIGluZGV4ZXMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7QXJyYXl8TnVtYmVyfFN0cmluZ30gW2luZGV4MSwgaW5kZXgyLCAuLi5dIFRoZSBpbmRleGVzIG9mXG4gICAqICBgY29sbGVjdGlvbmAgdG8gcmV0cmlldmUsIGVpdGhlciBhcyBpbmRpdmlkdWFsIGFyZ3VtZW50cyBvciBhcnJheXMuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBlbGVtZW50cyBjb3JyZXNwb25kaW5nIHRvIHRoZVxuICAgKiAgcHJvdmlkZWQgaW5kZXhlcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5hdChbJ2EnLCAnYicsICdjJywgJ2QnLCAnZSddLCBbMCwgMiwgNF0pO1xuICAgKiAvLyA9PiBbJ2EnLCAnYycsICdlJ11cbiAgICpcbiAgICogXy5hdChbJ21vZScsICdsYXJyeScsICdjdXJseSddLCAwLCAyKTtcbiAgICogLy8gPT4gWydtb2UnLCAnY3VybHknXVxuICAgKi9cbiAgZnVuY3Rpb24gYXQoY29sbGVjdGlvbikge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBwcm9wcyA9IGNvbmNhdC5hcHBseShhcnJheVJlZiwgc2xpY2UoYXJndW1lbnRzLCAxKSksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIGlmIChub0NoYXJCeUluZGV4ICYmIGlzU3RyaW5nKGNvbGxlY3Rpb24pKSB7XG4gICAgICBjb2xsZWN0aW9uID0gY29sbGVjdGlvbi5zcGxpdCgnJyk7XG4gICAgfVxuICAgIHdoaWxlKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBjb2xsZWN0aW9uW3Byb3BzW2luZGV4XV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgZ2l2ZW4gYHRhcmdldGAgZWxlbWVudCBpcyBwcmVzZW50IGluIGEgYGNvbGxlY3Rpb25gIHVzaW5nIHN0cmljdFxuICAgKiBlcXVhbGl0eSBmb3IgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuIElmIGBmcm9tSW5kZXhgIGlzIG5lZ2F0aXZlLCBpdCBpcyB1c2VkXG4gICAqIGFzIHRoZSBvZmZzZXQgZnJvbSB0aGUgZW5kIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyBpbmNsdWRlXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge01peGVkfSB0YXJnZXQgVGhlIHZhbHVlIHRvIGNoZWNrIGZvci5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGB0YXJnZXRgIGVsZW1lbnQgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5jb250YWlucyhbMSwgMiwgM10sIDEpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uY29udGFpbnMoWzEsIDIsIDNdLCAxLCAyKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5jb250YWlucyh7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LCAnbW9lJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5jb250YWlucygnY3VybHknLCAndXInKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gY29udGFpbnMoY29sbGVjdGlvbiwgdGFyZ2V0LCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24ubGVuZ3RoIDogMCxcbiAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICBmcm9tSW5kZXggPSAoZnJvbUluZGV4IDwgMCA/IG5hdGl2ZU1heCgwLCBsZW5ndGggKyBmcm9tSW5kZXgpIDogZnJvbUluZGV4KSB8fCAwO1xuICAgIGlmICh0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInKSB7XG4gICAgICByZXN1bHQgPSAoaXNTdHJpbmcoY29sbGVjdGlvbilcbiAgICAgICAgPyBjb2xsZWN0aW9uLmluZGV4T2YodGFyZ2V0LCBmcm9tSW5kZXgpXG4gICAgICAgIDogaW5kZXhPZihjb2xsZWN0aW9uLCB0YXJnZXQsIGZyb21JbmRleClcbiAgICAgICkgPiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBpZiAoKytpbmRleCA+PSBmcm9tSW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gIShyZXN1bHQgPSB2YWx1ZSA9PT0gdGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2Yga2V5cyByZXR1cm5lZCBmcm9tIHJ1bm5pbmcgZWFjaCBlbGVtZW50IG9mIHRoZVxuICAgKiBgY29sbGVjdGlvbmAgdGhyb3VnaCB0aGUgZ2l2ZW4gYGNhbGxiYWNrYC4gVGhlIGNvcnJlc3BvbmRpbmcgdmFsdWUgb2YgZWFjaCBrZXlcbiAgICogaXMgdGhlIG51bWJlciBvZiB0aW1lcyB0aGUga2V5IHdhcyByZXR1cm5lZCBieSB0aGUgYGNhbGxiYWNrYC4gVGhlIGBjYWxsYmFja2BcbiAgICogaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbXBvc2VkIGFnZ3JlZ2F0ZSBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uY291bnRCeShbNC4zLCA2LjEsIDYuNF0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gTWF0aC5mbG9vcihudW0pOyB9KTtcbiAgICogLy8gPT4geyAnNCc6IDEsICc2JzogMiB9XG4gICAqXG4gICAqIF8uY291bnRCeShbNC4zLCA2LjEsIDYuNF0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gdGhpcy5mbG9vcihudW0pOyB9LCBNYXRoKTtcbiAgICogLy8gPT4geyAnNCc6IDEsICc2JzogMiB9XG4gICAqXG4gICAqIF8uY291bnRCeShbJ29uZScsICd0d28nLCAndGhyZWUnXSwgJ2xlbmd0aCcpO1xuICAgKiAvLyA9PiB7ICczJzogMiwgJzUnOiAxIH1cbiAgICovXG4gIGZ1bmN0aW9uIGNvdW50QnkoY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG5cbiAgICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICAgIGtleSA9IGNhbGxiYWNrKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pICsgJyc7XG4gICAgICAoaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsIGtleSkgPyByZXN1bHRba2V5XSsrIDogcmVzdWx0W2tleV0gPSAxKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgYGNhbGxiYWNrYCByZXR1cm5zIGEgdHJ1dGh5IHZhbHVlIGZvciAqKmFsbCoqIGVsZW1lbnRzIG9mIGFcbiAgICogYGNvbGxlY3Rpb25gLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZVxuICAgKiBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAYWxpYXMgYWxsXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxTdHJpbmd9IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXJcbiAgICogIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGVcbiAgICogIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIHBhc3MgdGhlIGNhbGxiYWNrIGNoZWNrLFxuICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmV2ZXJ5KFt0cnVlLCAxLCBudWxsLCAneWVzJ10sIEJvb2xlYW4pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5ldmVyeShzdG9vZ2VzLCAnYWdlJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLndoZXJlXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uZXZlcnkoc3Rvb2dlcywgeyAnYWdlJzogNTAgfSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBldmVyeShjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuXG4gICAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBpZiAoIShyZXN1bHQgPSAhIWNhbGxiYWNrKGNvbGxlY3Rpb25baW5kZXhdLCBpbmRleCwgY29sbGVjdGlvbikpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIChyZXN1bHQgPSAhIWNhbGxiYWNrKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRXhhbWluZXMgZWFjaCBlbGVtZW50IGluIGEgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgYWxsIGVsZW1lbnRzXG4gICAqIHRoZSBgY2FsbGJhY2tgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZFxuICAgKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIHNlbGVjdFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIGVsZW1lbnRzIHRoYXQgcGFzc2VkIHRoZSBjYWxsYmFjayBjaGVjay5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGV2ZW5zID0gXy5maWx0ZXIoWzEsIDIsIDMsIDQsIDUsIDZdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIG51bSAlIDIgPT0gMDsgfSk7XG4gICAqIC8vID0+IFsyLCA0LCA2XVxuICAgKlxuICAgKiB2YXIgZm9vZCA9IFtcbiAgICogICB7ICduYW1lJzogJ2FwcGxlJywgICdvcmdhbmljJzogZmFsc2UsICd0eXBlJzogJ2ZydWl0JyB9LFxuICAgKiAgIHsgJ25hbWUnOiAnY2Fycm90JywgJ29yZ2FuaWMnOiB0cnVlLCAgJ3R5cGUnOiAndmVnZXRhYmxlJyB9XG4gICAqIF07XG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy5wbHVja1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLmZpbHRlcihmb29kLCAnb3JnYW5pYycpO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfV1cbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLndoZXJlXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uZmlsdGVyKGZvb2QsIHsgJ3R5cGUnOiAnZnJ1aXQnIH0pO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdhcHBsZScsICdvcmdhbmljJzogZmFsc2UsICd0eXBlJzogJ2ZydWl0JyB9XVxuICAgKi9cbiAgZnVuY3Rpb24gZmlsdGVyKGNvbGxlY3Rpb24sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuXG4gICAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBjb2xsZWN0aW9uW2luZGV4XTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikpIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikpIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4YW1pbmVzIGVhY2ggZWxlbWVudCBpbiBhIGBjb2xsZWN0aW9uYCwgcmV0dXJuaW5nIHRoZSBmaXJzdCB0aGF0IHRoZSBgY2FsbGJhY2tgXG4gICAqIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWVcbiAgICogYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGRldGVjdFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBlbGVtZW50IHRoYXQgcGFzc2VkIHRoZSBjYWxsYmFjayBjaGVjayxcbiAgICogIGVsc2UgYHVuZGVmaW5lZGAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBldmVuID0gXy5maW5kKFsxLCAyLCAzLCA0LCA1LCA2XSwgZnVuY3Rpb24obnVtKSB7IHJldHVybiBudW0gJSAyID09IDA7IH0pO1xuICAgKiAvLyA9PiAyXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYXBwbGUnLCAgJ29yZ2FuaWMnOiBmYWxzZSwgJ3R5cGUnOiAnZnJ1aXQnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdiYW5hbmEnLCAnb3JnYW5pYyc6IHRydWUsICAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2JlZXQnLCAgICdvcmdhbmljJzogZmFsc2UsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfSxcbiAgICogICB7ICduYW1lJzogJ2NhcnJvdCcsICdvcmdhbmljJzogdHJ1ZSwgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ud2hlcmVcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogdmFyIHZlZ2dpZSA9IF8uZmluZChmb29kLCB7ICd0eXBlJzogJ3ZlZ2V0YWJsZScgfSk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnYmVldCcsICdvcmdhbmljJzogZmFsc2UsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogdmFyIGhlYWx0aHkgPSBfLmZpbmQoZm9vZCwgJ29yZ2FuaWMnKTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdiYW5hbmEnLCAnb3JnYW5pYyc6IHRydWUsICd0eXBlJzogJ2ZydWl0JyB9XG4gICAqL1xuICBmdW5jdGlvbiBmaW5kKGNvbGxlY3Rpb24sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcblxuICAgIGZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICBpZiAoY2FsbGJhY2sodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSkge1xuICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgb3ZlciBhIGBjb2xsZWN0aW9uYCwgZXhlY3V0aW5nIHRoZSBgY2FsbGJhY2tgIGZvciBlYWNoIGVsZW1lbnQgaW5cbiAgICogdGhlIGBjb2xsZWN0aW9uYC4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWVcbiAgICogYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuIENhbGxiYWNrcyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHlcbiAgICogYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAYWxpYXMgZWFjaFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fE9iamVjdHxTdHJpbmd9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfKFsxLCAyLCAzXSkuZm9yRWFjaChhbGVydCkuam9pbignLCcpO1xuICAgKiAvLyA9PiBhbGVydHMgZWFjaCBudW1iZXIgYW5kIHJldHVybnMgJzEsMiwzJ1xuICAgKlxuICAgKiBfLmZvckVhY2goeyAnb25lJzogMSwgJ3R3byc6IDIsICd0aHJlZSc6IDMgfSwgYWxlcnQpO1xuICAgKiAvLyA9PiBhbGVydHMgZWFjaCBudW1iZXIgdmFsdWUgKG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKi9cbiAgZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGlmIChjYWxsYmFjayAmJiB0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJyAmJiBpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKGNvbGxlY3Rpb25baW5kZXhdLCBpbmRleCwgY29sbGVjdGlvbikgPT09IGZhbHNlKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIGtleXMgcmV0dXJuZWQgZnJvbSBydW5uaW5nIGVhY2ggZWxlbWVudCBvZiB0aGVcbiAgICogYGNvbGxlY3Rpb25gIHRocm91Z2ggdGhlIGBjYWxsYmFja2AuIFRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIG9mIGVhY2gga2V5IGlzXG4gICAqIGFuIGFycmF5IG9mIGVsZW1lbnRzIHBhc3NlZCB0byBgY2FsbGJhY2tgIHRoYXQgcmV0dXJuZWQgdGhlIGtleS4gVGhlIGBjYWxsYmFja2BcbiAgICogaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWBcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29tcG9zZWQgYWdncmVnYXRlIG9iamVjdC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5ncm91cEJ5KFs0LjIsIDYuMSwgNi40XSwgZnVuY3Rpb24obnVtKSB7IHJldHVybiBNYXRoLmZsb29yKG51bSk7IH0pO1xuICAgKiAvLyA9PiB7ICc0JzogWzQuMl0sICc2JzogWzYuMSwgNi40XSB9XG4gICAqXG4gICAqIF8uZ3JvdXBCeShbNC4yLCA2LjEsIDYuNF0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gdGhpcy5mbG9vcihudW0pOyB9LCBNYXRoKTtcbiAgICogLy8gPT4geyAnNCc6IFs0LjJdLCAnNic6IFs2LjEsIDYuNF0gfVxuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5ncm91cEJ5KFsnb25lJywgJ3R3bycsICd0aHJlZSddLCAnbGVuZ3RoJyk7XG4gICAqIC8vID0+IHsgJzMnOiBbJ29uZScsICd0d28nXSwgJzUnOiBbJ3RocmVlJ10gfVxuICAgKi9cbiAgZnVuY3Rpb24gZ3JvdXBCeShjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcblxuICAgIGZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgICAga2V5ID0gY2FsbGJhY2sodmFsdWUsIGtleSwgY29sbGVjdGlvbikgKyAnJztcbiAgICAgIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHJlc3VsdCwga2V5KSA/IHJlc3VsdFtrZXldIDogcmVzdWx0W2tleV0gPSBbXSkucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnZva2VzIHRoZSBtZXRob2QgbmFtZWQgYnkgYG1ldGhvZE5hbWVgIG9uIGVhY2ggZWxlbWVudCBpbiB0aGUgYGNvbGxlY3Rpb25gLFxuICAgKiByZXR1cm5pbmcgYW4gYXJyYXkgb2YgdGhlIHJlc3VsdHMgb2YgZWFjaCBpbnZva2VkIG1ldGhvZC4gQWRkaXRpb25hbCBhcmd1bWVudHNcbiAgICogd2lsbCBiZSBwYXNzZWQgdG8gZWFjaCBpbnZva2VkIG1ldGhvZC4gSWYgYG1ldGhvZE5hbWVgIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGxcbiAgICogYmUgaW52b2tlZCBmb3IsIGFuZCBgdGhpc2AgYm91bmQgdG8sIGVhY2ggZWxlbWVudCBpbiB0aGUgYGNvbGxlY3Rpb25gLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgbWV0aG9kIHRvIGludm9rZSBvclxuICAgKiAgdGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtIHtNaXhlZH0gW2FyZzEsIGFyZzIsIC4uLl0gQXJndW1lbnRzIHRvIGludm9rZSB0aGUgbWV0aG9kIHdpdGguXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiB0aGUgcmVzdWx0cyBvZiBlYWNoIGludm9rZWQgbWV0aG9kLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmludm9rZShbWzUsIDEsIDddLCBbMywgMiwgMV1dLCAnc29ydCcpO1xuICAgKiAvLyA9PiBbWzEsIDUsIDddLCBbMSwgMiwgM11dXG4gICAqXG4gICAqIF8uaW52b2tlKFsxMjMsIDQ1Nl0sIFN0cmluZy5wcm90b3R5cGUuc3BsaXQsICcnKTtcbiAgICogLy8gPT4gW1snMScsICcyJywgJzMnXSwgWyc0JywgJzUnLCAnNiddXVxuICAgKi9cbiAgZnVuY3Rpb24gaW52b2tlKGNvbGxlY3Rpb24sIG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgYXJncyA9IHNsaWNlKGFyZ3VtZW50cywgMiksXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGlzRnVuYyA9IHR5cGVvZiBtZXRob2ROYW1lID09ICdmdW5jdGlvbicsXG4gICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc3VsdCA9IEFycmF5KHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgPyBsZW5ndGggOiAwKTtcblxuICAgIGZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJlc3VsdFsrK2luZGV4XSA9IChpc0Z1bmMgPyBtZXRob2ROYW1lIDogdmFsdWVbbWV0aG9kTmFtZV0pLmFwcGx5KHZhbHVlLCBhcmdzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdmFsdWVzIGJ5IHJ1bm5pbmcgZWFjaCBlbGVtZW50IGluIHRoZSBgY29sbGVjdGlvbmBcbiAgICogdGhyb3VnaCB0aGUgYGNhbGxiYWNrYC4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGhcbiAgICogdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGNvbGxlY3RcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiB0aGUgcmVzdWx0cyBvZiBlYWNoIGBjYWxsYmFja2AgZXhlY3V0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLm1hcChbMSwgMiwgM10sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gbnVtICogMzsgfSk7XG4gICAqIC8vID0+IFszLCA2LCA5XVxuICAgKlxuICAgKiBfLm1hcCh7ICdvbmUnOiAxLCAndHdvJzogMiwgJ3RocmVlJzogMyB9LCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIG51bSAqIDM7IH0pO1xuICAgKiAvLyA9PiBbMywgNiwgOV0gKG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5tYXAoc3Rvb2dlcywgJ25hbWUnKTtcbiAgICogLy8gPT4gWydtb2UnLCAnbGFycnknXVxuICAgKi9cbiAgZnVuY3Rpb24gbWFwKGNvbGxlY3Rpb24sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc3VsdCA9IEFycmF5KHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgPyBsZW5ndGggOiAwKTtcblxuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICByZXN1bHRbaW5kZXhdID0gY2FsbGJhY2soY29sbGVjdGlvbltpbmRleF0sIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJlc3VsdFsrK2luZGV4XSA9IGNhbGxiYWNrKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSBtYXhpbXVtIHZhbHVlIG9mIGFuIGBhcnJheWAuIElmIGBjYWxsYmFja2AgaXMgcGFzc2VkLFxuICAgKiBpdCB3aWxsIGJlIGV4ZWN1dGVkIGZvciBlYWNoIHZhbHVlIGluIHRoZSBgYXJyYXlgIHRvIGdlbmVyYXRlIHRoZVxuICAgKiBjcml0ZXJpb24gYnkgd2hpY2ggdGhlIHZhbHVlIGlzIHJhbmtlZC4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG9cbiAgICogYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKS5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBtYXhpbXVtIHZhbHVlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLm1heChbNCwgMiwgOCwgNl0pO1xuICAgKiAvLyA9PiA4XG4gICAqXG4gICAqIHZhciBzdG9vZ2VzID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH0sXG4gICAqICAgeyAnbmFtZSc6ICdsYXJyeScsICdhZ2UnOiA1MCB9XG4gICAqIF07XG4gICAqXG4gICAqIF8ubWF4KHN0b29nZXMsIGZ1bmN0aW9uKHN0b29nZSkgeyByZXR1cm4gc3Rvb2dlLmFnZTsgfSk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8ubWF4KHN0b29nZXMsICdhZ2UnKTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdsYXJyeScsICdhZ2UnOiA1MCB9O1xuICAgKi9cbiAgZnVuY3Rpb24gbWF4KGNvbGxlY3Rpb24sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gLUluZmluaXR5LFxuICAgICAgICByZXN1bHQgPSBjb21wdXRlZDtcblxuICAgIGlmICghY2FsbGJhY2sgJiYgaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGNvbGxlY3Rpb25baW5kZXhdO1xuICAgICAgICBpZiAodmFsdWUgPiByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayA9ICFjYWxsYmFjayAmJiBpc1N0cmluZyhjb2xsZWN0aW9uKVxuICAgICAgICA/IGNoYXJBdENhbGxiYWNrXG4gICAgICAgIDogY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuXG4gICAgICBlYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICB2YXIgY3VycmVudCA9IGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICAgIGlmIChjdXJyZW50ID4gY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb21wdXRlZCA9IGN1cnJlbnQ7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgbWluaW11bSB2YWx1ZSBvZiBhbiBgYXJyYXlgLiBJZiBgY2FsbGJhY2tgIGlzIHBhc3NlZCxcbiAgICogaXQgd2lsbCBiZSBleGVjdXRlZCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgYGFycmF5YCB0byBnZW5lcmF0ZSB0aGVcbiAgICogY3JpdGVyaW9uIGJ5IHdoaWNoIHRoZSB2YWx1ZSBpcyByYW5rZWQuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYFxuICAgKiBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgbWluaW11bSB2YWx1ZS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5taW4oWzQsIDIsIDgsIDZdKTtcbiAgICogLy8gPT4gMlxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiBfLm1pbihzdG9vZ2VzLCBmdW5jdGlvbihzdG9vZ2UpIHsgcmV0dXJuIHN0b29nZS5hZ2U7IH0pO1xuICAgKiAvLyA9PiB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9O1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5taW4oc3Rvb2dlcywgJ2FnZScpO1xuICAgKiAvLyA9PiB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9O1xuICAgKi9cbiAgZnVuY3Rpb24gbWluKGNvbGxlY3Rpb24sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIGNvbXB1dGVkID0gSW5maW5pdHksXG4gICAgICAgIHJlc3VsdCA9IGNvbXB1dGVkO1xuXG4gICAgaWYgKCFjYWxsYmFjayAmJiBpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gY29sbGVjdGlvbltpbmRleF07XG4gICAgICAgIGlmICh2YWx1ZSA8IHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrID0gIWNhbGxiYWNrICYmIGlzU3RyaW5nKGNvbGxlY3Rpb24pXG4gICAgICAgID8gY2hhckF0Q2FsbGJhY2tcbiAgICAgICAgOiBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG5cbiAgICAgIGVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gY2FsbGJhY2sodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPCBjb21wdXRlZCkge1xuICAgICAgICAgIGNvbXB1dGVkID0gY3VycmVudDtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUmV0cmlldmVzIHRoZSB2YWx1ZSBvZiBhIHNwZWNpZmllZCBwcm9wZXJ0eSBmcm9tIGFsbCBlbGVtZW50cyBpbiB0aGUgYGNvbGxlY3Rpb25gLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgVGhlIHByb3BlcnR5IHRvIHBsdWNrLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgcHJvcGVydHkgdmFsdWVzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiBfLnBsdWNrKHN0b29nZXMsICduYW1lJyk7XG4gICAqIC8vID0+IFsnbW9lJywgJ2xhcnJ5J11cbiAgICovXG4gIHZhciBwbHVjayA9IG1hcDtcblxuICAvKipcbiAgICogUmVkdWNlcyBhIGBjb2xsZWN0aW9uYCB0byBhIHZhbHVlIHRoYXQgaXMgdGhlIGFjY3VtdWxhdGVkIHJlc3VsdCBvZiBydW5uaW5nXG4gICAqIGVhY2ggZWxlbWVudCBpbiB0aGUgYGNvbGxlY3Rpb25gIHRocm91Z2ggdGhlIGBjYWxsYmFja2AsIHdoZXJlIGVhY2ggc3VjY2Vzc2l2ZVxuICAgKiBgY2FsbGJhY2tgIGV4ZWN1dGlvbiBjb25zdW1lcyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBwcmV2aW91cyBleGVjdXRpb24uXG4gICAqIElmIGBhY2N1bXVsYXRvcmAgaXMgbm90IHBhc3NlZCwgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGBjb2xsZWN0aW9uYCB3aWxsIGJlXG4gICAqIHVzZWQgYXMgdGhlIGluaXRpYWwgYGFjY3VtdWxhdG9yYCB2YWx1ZS4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgXG4gICAqIGFuZCBpbnZva2VkIHdpdGggZm91ciBhcmd1bWVudHM7IChhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGZvbGRsLCBpbmplY3RcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYWNjdW11bGF0b3JdIEluaXRpYWwgdmFsdWUgb2YgdGhlIGFjY3VtdWxhdG9yLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBzdW0gPSBfLnJlZHVjZShbMSwgMiwgM10sIGZ1bmN0aW9uKHN1bSwgbnVtKSB7XG4gICAqICAgcmV0dXJuIHN1bSArIG51bTtcbiAgICogfSk7XG4gICAqIC8vID0+IDZcbiAgICpcbiAgICogdmFyIG1hcHBlZCA9IF8ucmVkdWNlKHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9LCBmdW5jdGlvbihyZXN1bHQsIG51bSwga2V5KSB7XG4gICAqICAgcmVzdWx0W2tleV0gPSBudW0gKiAzO1xuICAgKiAgIHJldHVybiByZXN1bHQ7XG4gICAqIH0sIHt9KTtcbiAgICogLy8gPT4geyAnYSc6IDMsICdiJzogNiwgJ2MnOiA5IH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlZHVjZShjb2xsZWN0aW9uLCBjYWxsYmFjaywgYWNjdW11bGF0b3IsIHRoaXNBcmcpIHtcbiAgICB2YXIgbm9hY2N1bSA9IGFyZ3VtZW50cy5sZW5ndGggPCAzO1xuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIDQpO1xuXG4gICAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICBpZiAobm9hY2N1bSkge1xuICAgICAgICBhY2N1bXVsYXRvciA9IGNvbGxlY3Rpb25bKytpbmRleF07XG4gICAgICB9XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBhY2N1bXVsYXRvciA9IGNhbGxiYWNrKGFjY3VtdWxhdG9yLCBjb2xsZWN0aW9uW2luZGV4XSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICBhY2N1bXVsYXRvciA9IG5vYWNjdW1cbiAgICAgICAgICA/IChub2FjY3VtID0gZmFsc2UsIHZhbHVlKVxuICAgICAgICAgIDogY2FsbGJhY2soYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbilcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byBgXy5yZWR1Y2VgLCBleGNlcHQgdGhhdCBpdCBpdGVyYXRlcyBvdmVyIGFcbiAgICogYGNvbGxlY3Rpb25gIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAYWxpYXMgZm9sZHJcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYWNjdW11bGF0b3JdIEluaXRpYWwgdmFsdWUgb2YgdGhlIGFjY3VtdWxhdG9yLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBsaXN0ID0gW1swLCAxXSwgWzIsIDNdLCBbNCwgNV1dO1xuICAgKiB2YXIgZmxhdCA9IF8ucmVkdWNlUmlnaHQobGlzdCwgZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5jb25jYXQoYik7IH0sIFtdKTtcbiAgICogLy8gPT4gWzQsIDUsIDIsIDMsIDAsIDFdXG4gICAqL1xuICBmdW5jdGlvbiByZWR1Y2VSaWdodChjb2xsZWN0aW9uLCBjYWxsYmFjaywgYWNjdW11bGF0b3IsIHRoaXNBcmcpIHtcbiAgICB2YXIgaXRlcmFibGUgPSBjb2xsZWN0aW9uLFxuICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwLFxuICAgICAgICBub2FjY3VtID0gYXJndW1lbnRzLmxlbmd0aCA8IDM7XG5cbiAgICBpZiAodHlwZW9mIGxlbmd0aCAhPSAnbnVtYmVyJykge1xuICAgICAgdmFyIHByb3BzID0ga2V5cyhjb2xsZWN0aW9uKTtcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKG5vQ2hhckJ5SW5kZXggJiYgaXNTdHJpbmcoY29sbGVjdGlvbikpIHtcbiAgICAgIGl0ZXJhYmxlID0gY29sbGVjdGlvbi5zcGxpdCgnJyk7XG4gICAgfVxuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIDQpO1xuICAgIGZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICBpbmRleCA9IHByb3BzID8gcHJvcHNbLS1sZW5ndGhdIDogLS1sZW5ndGg7XG4gICAgICBhY2N1bXVsYXRvciA9IG5vYWNjdW1cbiAgICAgICAgPyAobm9hY2N1bSA9IGZhbHNlLCBpdGVyYWJsZVtpbmRleF0pXG4gICAgICAgIDogY2FsbGJhY2soYWNjdW11bGF0b3IsIGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgb3Bwb3NpdGUgb2YgYF8uZmlsdGVyYCwgdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZWxlbWVudHMgb2YgYVxuICAgKiBgY29sbGVjdGlvbmAgdGhhdCBgY2FsbGJhY2tgIGRvZXMgKipub3QqKiByZXR1cm4gdHJ1dGh5IGZvci5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIGVsZW1lbnRzIHRoYXQgZGlkICoqbm90KiogcGFzcyB0aGVcbiAgICogIGNhbGxiYWNrIGNoZWNrLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgb2RkcyA9IF8ucmVqZWN0KFsxLCAyLCAzLCA0LCA1LCA2XSwgZnVuY3Rpb24obnVtKSB7IHJldHVybiBudW0gJSAyID09IDA7IH0pO1xuICAgKiAvLyA9PiBbMSwgMywgNV1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdhcHBsZScsICAnb3JnYW5pYyc6IGZhbHNlLCAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2NhcnJvdCcsICdvcmdhbmljJzogdHJ1ZSwgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5yZWplY3QoZm9vZCwgJ29yZ2FuaWMnKTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnYXBwbGUnLCAnb3JnYW5pYyc6IGZhbHNlLCAndHlwZSc6ICdmcnVpdCcgfV1cbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLndoZXJlXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8ucmVqZWN0KGZvb2QsIHsgJ3R5cGUnOiAnZnJ1aXQnIH0pO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfV1cbiAgICovXG4gIGZ1bmN0aW9uIHJlamVjdChjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIHJldHVybiBmaWx0ZXIoY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICByZXR1cm4gIWNhbGxiYWNrKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBzaHVmZmxlZCBgYXJyYXlgIHZhbHVlcywgdXNpbmcgYSB2ZXJzaW9uIG9mIHRoZVxuICAgKiBGaXNoZXItWWF0ZXMgc2h1ZmZsZS4gU2VlIGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmlzaGVyLVlhdGVzX3NodWZmbGUuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBzaHVmZmxlLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgc2h1ZmZsZWQgY29sbGVjdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5zaHVmZmxlKFsxLCAyLCAzLCA0LCA1LCA2XSk7XG4gICAqIC8vID0+IFs0LCAxLCA2LCAzLCA1LCAyXVxuICAgKi9cbiAgZnVuY3Rpb24gc2h1ZmZsZShjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc3VsdCA9IEFycmF5KHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgPyBsZW5ndGggOiAwKTtcblxuICAgIGZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciByYW5kID0gZmxvb3IobmF0aXZlUmFuZG9tKCkgKiAoKytpbmRleCArIDEpKTtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSByZXN1bHRbcmFuZF07XG4gICAgICByZXN1bHRbcmFuZF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHNpemUgb2YgdGhlIGBjb2xsZWN0aW9uYCBieSByZXR1cm5pbmcgYGNvbGxlY3Rpb24ubGVuZ3RoYCBmb3IgYXJyYXlzXG4gICAqIGFuZCBhcnJheS1saWtlIG9iamVjdHMgb3IgdGhlIG51bWJlciBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGZvciBvYmplY3RzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyBgY29sbGVjdGlvbi5sZW5ndGhgIG9yIG51bWJlciBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnNpemUoWzEsIDJdKTtcbiAgICogLy8gPT4gMlxuICAgKlxuICAgKiBfLnNpemUoeyAnb25lJzogMSwgJ3R3byc6IDIsICd0aHJlZSc6IDMgfSk7XG4gICAqIC8vID0+IDNcbiAgICpcbiAgICogXy5zaXplKCdjdXJseScpO1xuICAgKiAvLyA9PiA1XG4gICAqL1xuICBmdW5jdGlvbiBzaXplKGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24ubGVuZ3RoIDogMDtcbiAgICByZXR1cm4gdHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJyA/IGxlbmd0aCA6IGtleXMoY29sbGVjdGlvbikubGVuZ3RoO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgYGNhbGxiYWNrYCByZXR1cm5zIGEgdHJ1dGh5IHZhbHVlIGZvciAqKmFueSoqIGVsZW1lbnQgb2YgYVxuICAgKiBgY29sbGVjdGlvbmAuIFRoZSBmdW5jdGlvbiByZXR1cm5zIGFzIHNvb24gYXMgaXQgZmluZHMgcGFzc2luZyB2YWx1ZSwgYW5kXG4gICAqIGRvZXMgbm90IGl0ZXJhdGUgb3ZlciB0aGUgZW50aXJlIGBjb2xsZWN0aW9uYC4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG9cbiAgICogYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGFueVxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgY2FsbGJhY2sgY2hlY2ssXG4gICAqICBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uc29tZShbbnVsbCwgMCwgJ3llcycsIGZhbHNlXSwgQm9vbGVhbik7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdhcHBsZScsICAnb3JnYW5pYyc6IGZhbHNlLCAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2NhcnJvdCcsICdvcmdhbmljJzogdHJ1ZSwgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5zb21lKGZvb2QsICdvcmdhbmljJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLndoZXJlXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uc29tZShmb29kLCB7ICd0eXBlJzogJ21lYXQnIH0pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gc29tZShjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciByZXN1bHQ7XG4gICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG5cbiAgICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmICgocmVzdWx0ID0gY2FsbGJhY2soY29sbGVjdGlvbltpbmRleF0sIGluZGV4LCBjb2xsZWN0aW9uKSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gIShyZXN1bHQgPSBjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gISFyZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBlbGVtZW50cywgc29ydGVkIGluIGFzY2VuZGluZyBvcmRlciBieSB0aGUgcmVzdWx0cyBvZlxuICAgKiBydW5uaW5nIGVhY2ggZWxlbWVudCBpbiB0aGUgYGNvbGxlY3Rpb25gIHRocm91Z2ggdGhlIGBjYWxsYmFja2AuIFRoaXMgbWV0aG9kXG4gICAqIHBlcmZvcm1zIGEgc3RhYmxlIHNvcnQsIHRoYXQgaXMsIGl0IHdpbGwgcHJlc2VydmUgdGhlIG9yaWdpbmFsIHNvcnQgb3JkZXIgb2ZcbiAgICogZXF1YWwgZWxlbWVudHMuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gICAqIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxTdHJpbmd9IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXJcbiAgICogIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGVcbiAgICogIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgb2Ygc29ydGVkIGVsZW1lbnRzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnNvcnRCeShbMSwgMiwgM10sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gTWF0aC5zaW4obnVtKTsgfSk7XG4gICAqIC8vID0+IFszLCAxLCAyXVxuICAgKlxuICAgKiBfLnNvcnRCeShbMSwgMiwgM10sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gdGhpcy5zaW4obnVtKTsgfSwgTWF0aCk7XG4gICAqIC8vID0+IFszLCAxLCAyXVxuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5zb3J0QnkoWydiYW5hbmEnLCAnc3RyYXdiZXJyeScsICdhcHBsZSddLCAnbGVuZ3RoJyk7XG4gICAqIC8vID0+IFsnYXBwbGUnLCAnYmFuYW5hJywgJ3N0cmF3YmVycnknXVxuICAgKi9cbiAgZnVuY3Rpb24gc29ydEJ5KGNvbGxlY3Rpb24sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc3VsdCA9IEFycmF5KHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgPyBsZW5ndGggOiAwKTtcblxuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIGZvckVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgICAgcmVzdWx0WysraW5kZXhdID0ge1xuICAgICAgICAnY3JpdGVyaWEnOiBjYWxsYmFjayh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSxcbiAgICAgICAgJ2luZGV4JzogaW5kZXgsXG4gICAgICAgICd2YWx1ZSc6IHZhbHVlXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcbiAgICByZXN1bHQuc29ydChjb21wYXJlQXNjZW5kaW5nKTtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHJlc3VsdFtsZW5ndGhdID0gcmVzdWx0W2xlbmd0aF0udmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIGBjb2xsZWN0aW9uYCB0byBhbiBhcnJheS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGNvbnZlcnQuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGNvbnZlcnRlZCBhcnJheS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogKGZ1bmN0aW9uKCkgeyByZXR1cm4gXy50b0FycmF5KGFyZ3VtZW50cykuc2xpY2UoMSk7IH0pKDEsIDIsIDMsIDQpO1xuICAgKiAvLyA9PiBbMiwgMywgNF1cbiAgICovXG4gIGZ1bmN0aW9uIHRvQXJyYXkoY29sbGVjdGlvbikge1xuICAgIGlmIChjb2xsZWN0aW9uICYmIHR5cGVvZiBjb2xsZWN0aW9uLmxlbmd0aCA9PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIG5vQ2hhckJ5SW5kZXggJiYgaXNTdHJpbmcoY29sbGVjdGlvbilcbiAgICAgICAgPyBjb2xsZWN0aW9uLnNwbGl0KCcnKVxuICAgICAgICA6IHNsaWNlKGNvbGxlY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzKGNvbGxlY3Rpb24pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4YW1pbmVzIGVhY2ggZWxlbWVudCBpbiBhIGBjb2xsZWN0aW9uYCwgcmV0dXJuaW5nIGFuIGFycmF5IG9mIGFsbCBlbGVtZW50c1xuICAgKiB0aGF0IGhhdmUgdGhlIGdpdmVuIGBwcm9wZXJ0aWVzYC4gV2hlbiBjaGVja2luZyBgcHJvcGVydGllc2AsIHRoaXMgbWV0aG9kXG4gICAqIHBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50XG4gICAqIHRvIGVhY2ggb3RoZXIuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHR5cGUgRnVuY3Rpb25cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wZXJ0aWVzIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIGZpbHRlciBieS5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgZ2l2ZW4gYHByb3BlcnRpZXNgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiBfLndoZXJlKHN0b29nZXMsIHsgJ2FnZSc6IDQwIH0pO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfV1cbiAgICovXG4gIHZhciB3aGVyZSA9IGZpbHRlcjtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSB3aXRoIGFsbCBmYWxzZXkgdmFsdWVzIG9mIGBhcnJheWAgcmVtb3ZlZC4gVGhlIHZhbHVlc1xuICAgKiBgZmFsc2VgLCBgbnVsbGAsIGAwYCwgYFwiXCJgLCBgdW5kZWZpbmVkYCBhbmQgYE5hTmAgYXJlIGFsbCBmYWxzZXkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFjdC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGZpbHRlcmVkIGFycmF5LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmNvbXBhY3QoWzAsIDEsIGZhbHNlLCAyLCAnJywgM10pO1xuICAgKiAvLyA9PiBbMSwgMiwgM11cbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBhY3QoYXJyYXkpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgYGFycmF5YCBlbGVtZW50cyBub3QgcHJlc2VudCBpbiB0aGUgb3RoZXIgYXJyYXlzXG4gICAqIHVzaW5nIHN0cmljdCBlcXVhbGl0eSBmb3IgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcHJvY2Vzcy5cbiAgICogQHBhcmFtIHtBcnJheX0gW2FycmF5MSwgYXJyYXkyLCAuLi5dIEFycmF5cyB0byBjaGVjay5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIGBhcnJheWAgZWxlbWVudHMgbm90IHByZXNlbnQgaW4gdGhlXG4gICAqICBvdGhlciBhcnJheXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZGlmZmVyZW5jZShbMSwgMiwgMywgNCwgNV0sIFs1LCAyLCAxMF0pO1xuICAgKiAvLyA9PiBbMSwgMywgNF1cbiAgICovXG4gIGZ1bmN0aW9uIGRpZmZlcmVuY2UoYXJyYXkpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICBmbGF0dGVuZWQgPSBjb25jYXQuYXBwbHkoYXJyYXlSZWYsIGFyZ3VtZW50cyksXG4gICAgICAgIGNvbnRhaW5zID0gY2FjaGVkQ29udGFpbnMoZmxhdHRlbmVkLCBsZW5ndGgpLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICBpZiAoIWNvbnRhaW5zKHZhbHVlKSkge1xuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgYGFycmF5YC4gSWYgYSBudW1iZXIgYG5gIGlzIHBhc3NlZCwgdGhlIGZpcnN0XG4gICAqIGBuYCBlbGVtZW50cyBvZiB0aGUgYGFycmF5YCBhcmUgcmV0dXJuZWQuIElmIGEgYGNhbGxiYWNrYCBmdW5jdGlvbiBpcyBwYXNzZWQsXG4gICAqIHRoZSBmaXJzdCBlbGVtZW50cyB0aGUgYGNhbGxiYWNrYCByZXR1cm5zIHRydXRoeSBmb3IgYXJlIHJldHVybmVkLiBUaGUgYGNhbGxiYWNrYFxuICAgKiBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAYWxpYXMgaGVhZCwgdGFrZVxuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8TnVtYmVyfFN0cmluZ30gW2NhbGxiYWNrfG5dIFRoZSBmdW5jdGlvbiBjYWxsZWRcbiAgICogIHBlciBlbGVtZW50IG9yIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gcmV0dXJuLiBJZiBhIHByb3BlcnR5IG5hbWUgb3JcbiAgICogIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGUgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIlxuICAgKiAgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGZpcnN0IGVsZW1lbnQocykgb2YgYGFycmF5YC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5maXJzdChbMSwgMiwgM10pO1xuICAgKiAvLyA9PiAxXG4gICAqXG4gICAqIF8uZmlyc3QoWzEsIDIsIDNdLCAyKTtcbiAgICogLy8gPT4gWzEsIDJdXG4gICAqXG4gICAqIF8uZmlyc3QoWzEsIDIsIDNdLCBmdW5jdGlvbihudW0pIHtcbiAgICogICByZXR1cm4gbnVtIDwgMztcbiAgICogfSk7XG4gICAqIC8vID0+IFsxLCAyXVxuICAgKlxuICAgKiB2YXIgZm9vZCA9IFtcbiAgICogICB7ICduYW1lJzogJ2JhbmFuYScsICdvcmdhbmljJzogdHJ1ZSB9LFxuICAgKiAgIHsgJ25hbWUnOiAnYmVldCcsICAgJ29yZ2FuaWMnOiBmYWxzZSB9LFxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5maXJzdChmb29kLCAnb3JnYW5pYycpO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdiYW5hbmEnLCAnb3JnYW5pYyc6IHRydWUgfV1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdhcHBsZScsICAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2JhbmFuYScsICd0eXBlJzogJ2ZydWl0JyB9LFxuICAgKiAgIHsgJ25hbWUnOiAnYmVldCcsICAgJ3R5cGUnOiAndmVnZXRhYmxlJyB9XG4gICAqIF07XG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy53aGVyZVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLmZpcnN0KGZvb2QsIHsgJ3R5cGUnOiAnZnJ1aXQnIH0pO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdhcHBsZScsICd0eXBlJzogJ2ZydWl0JyB9LCB7ICduYW1lJzogJ2JhbmFuYScsICd0eXBlJzogJ2ZydWl0JyB9XVxuICAgKi9cbiAgZnVuY3Rpb24gZmlyc3QoYXJyYXksIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgaWYgKGFycmF5KSB7XG4gICAgICB2YXIgbiA9IDAsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9ICdudW1iZXInICYmIGNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCAmJiBjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgICAgICBuKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG4gPSBjYWxsYmFjaztcbiAgICAgICAgaWYgKG4gPT0gbnVsbCB8fCB0aGlzQXJnKSB7XG4gICAgICAgICAgcmV0dXJuIGFycmF5WzBdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2xpY2UoYXJyYXksIDAsIG5hdGl2ZU1pbihuYXRpdmVNYXgoMCwgbiksIGxlbmd0aCkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGbGF0dGVucyBhIG5lc3RlZCBhcnJheSAodGhlIG5lc3RpbmcgY2FuIGJlIHRvIGFueSBkZXB0aCkuIElmIGBzaGFsbG93YCBpc1xuICAgKiB0cnV0aHksIGBhcnJheWAgd2lsbCBvbmx5IGJlIGZsYXR0ZW5lZCBhIHNpbmdsZSBsZXZlbC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYWN0LlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHNoYWxsb3cgQSBmbGFnIHRvIGluZGljYXRlIG9ubHkgZmxhdHRlbmluZyBhIHNpbmdsZSBsZXZlbC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5mbGF0dGVuKFsxLCBbMl0sIFszLCBbWzRdXV1dKTtcbiAgICogLy8gPT4gWzEsIDIsIDMsIDRdO1xuICAgKlxuICAgKiBfLmZsYXR0ZW4oWzEsIFsyXSwgWzMsIFtbNF1dXV0sIHRydWUpO1xuICAgKiAvLyA9PiBbMSwgMiwgMywgW1s0XV1dO1xuICAgKi9cbiAgZnVuY3Rpb24gZmxhdHRlbihhcnJheSwgc2hhbGxvdykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc3VsdCA9IFtdO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcblxuICAgICAgLy8gcmVjdXJzaXZlbHkgZmxhdHRlbiBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKVxuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHB1c2guYXBwbHkocmVzdWx0LCBzaGFsbG93ID8gdmFsdWUgOiBmbGF0dGVuKHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYHZhbHVlYCBpcyBmb3VuZCB1c2luZ1xuICAgKiBzdHJpY3QgZXF1YWxpdHkgZm9yIGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLiBJZiB0aGUgYGFycmF5YCBpcyBhbHJlYWR5XG4gICAqIHNvcnRlZCwgcGFzc2luZyBgdHJ1ZWAgZm9yIGBmcm9tSW5kZXhgIHdpbGwgcnVuIGEgZmFzdGVyIGJpbmFyeSBzZWFyY2guXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICogQHBhcmFtIHtCb29sZWFufE51bWJlcn0gW2Zyb21JbmRleD0wXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20gb3IgYHRydWVgIHRvXG4gICAqICBwZXJmb3JtIGEgYmluYXJ5IHNlYXJjaCBvbiBhIHNvcnRlZCBgYXJyYXlgLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSBvciBgLTFgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmluZGV4T2YoWzEsIDIsIDMsIDEsIDIsIDNdLCAyKTtcbiAgICogLy8gPT4gMVxuICAgKlxuICAgKiBfLmluZGV4T2YoWzEsIDIsIDMsIDEsIDIsIDNdLCAyLCAzKTtcbiAgICogLy8gPT4gNFxuICAgKlxuICAgKiBfLmluZGV4T2YoWzEsIDEsIDIsIDIsIDMsIDNdLCAyLCB0cnVlKTtcbiAgICogLy8gPT4gMlxuICAgKi9cbiAgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUsIGZyb21JbmRleCkge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgICBpZiAodHlwZW9mIGZyb21JbmRleCA9PSAnbnVtYmVyJykge1xuICAgICAgaW5kZXggPSAoZnJvbUluZGV4IDwgMCA/IG5hdGl2ZU1heCgwLCBsZW5ndGggKyBmcm9tSW5kZXgpIDogZnJvbUluZGV4IHx8IDApIC0gMTtcbiAgICB9IGVsc2UgaWYgKGZyb21JbmRleCkge1xuICAgICAgaW5kZXggPSBzb3J0ZWRJbmRleChhcnJheSwgdmFsdWUpO1xuICAgICAgcmV0dXJuIGFycmF5W2luZGV4XSA9PT0gdmFsdWUgPyBpbmRleCA6IC0xO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhbGwgYnV0IHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC4gSWYgYSBudW1iZXIgYG5gIGlzIHBhc3NlZCwgdGhlXG4gICAqIGxhc3QgYG5gIGVsZW1lbnRzIGFyZSBleGNsdWRlZCBmcm9tIHRoZSByZXN1bHQuIElmIGEgYGNhbGxiYWNrYCBmdW5jdGlvblxuICAgKiBpcyBwYXNzZWQsIHRoZSBsYXN0IGVsZW1lbnRzIHRoZSBgY2FsbGJhY2tgIHJldHVybnMgdHJ1dGh5IGZvciBhcmUgZXhjbHVkZWRcbiAgICogZnJvbSB0aGUgcmVzdWx0LiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZVxuICAgKiBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8TnVtYmVyfFN0cmluZ30gW2NhbGxiYWNrfG49MV0gVGhlIGZ1bmN0aW9uIGNhbGxlZFxuICAgKiAgcGVyIGVsZW1lbnQgb3IgdGhlIG51bWJlciBvZiBlbGVtZW50cyB0byBleGNsdWRlLiBJZiBhIHByb3BlcnR5IG5hbWUgb3JcbiAgICogIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGUgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIlxuICAgKiAgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBzbGljZSBvZiBgYXJyYXlgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmluaXRpYWwoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gWzEsIDJdXG4gICAqXG4gICAqIF8uaW5pdGlhbChbMSwgMiwgM10sIDIpO1xuICAgKiAvLyA9PiBbMV1cbiAgICpcbiAgICogXy5pbml0aWFsKFsxLCAyLCAzXSwgZnVuY3Rpb24obnVtKSB7XG4gICAqICAgcmV0dXJuIG51bSA+IDE7XG4gICAqIH0pO1xuICAgKiAvLyA9PiBbMV1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdiZWV0JywgICAnb3JnYW5pYyc6IGZhbHNlIH0sXG4gICAqICAgeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5pbml0aWFsKGZvb2QsICdvcmdhbmljJyk7XG4gICAqIC8vID0+IFt7ICduYW1lJzogJ2JlZXQnLCAgICdvcmdhbmljJzogZmFsc2UgfV1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdiYW5hbmEnLCAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2JlZXQnLCAgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfSxcbiAgICogICB7ICduYW1lJzogJ2NhcnJvdCcsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ud2hlcmVcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5pbml0aWFsKGZvb2QsIHsgJ3R5cGUnOiAndmVnZXRhYmxlJyB9KTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnYmFuYW5hJywgJ3R5cGUnOiAnZnJ1aXQnIH1dXG4gICAqL1xuICBmdW5jdGlvbiBpbml0aWFsKGFycmF5LCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGlmICghYXJyYXkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgdmFyIG4gPSAwLFxuICAgICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9ICdudW1iZXInICYmIGNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgIHZhciBpbmRleCA9IGxlbmd0aDtcbiAgICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgd2hpbGUgKGluZGV4LS0gJiYgY2FsbGJhY2soYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICAgIG4rKztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbiA9IChjYWxsYmFjayA9PSBudWxsIHx8IHRoaXNBcmcpID8gMSA6IGNhbGxiYWNrIHx8IG47XG4gICAgfVxuICAgIHJldHVybiBzbGljZShhcnJheSwgMCwgbmF0aXZlTWluKG5hdGl2ZU1heCgwLCBsZW5ndGggLSBuKSwgbGVuZ3RoKSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGludGVyc2VjdGlvbiBvZiBhbGwgdGhlIHBhc3NlZC1pbiBhcnJheXMgdXNpbmcgc3RyaWN0IGVxdWFsaXR5XG4gICAqIGZvciBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheTEsIGFycmF5MiwgLi4uXSBBcnJheXMgdG8gcHJvY2Vzcy5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHVuaXF1ZSBlbGVtZW50cyB0aGF0IGFyZSBwcmVzZW50XG4gICAqICBpbiAqKmFsbCoqIG9mIHRoZSBhcnJheXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaW50ZXJzZWN0aW9uKFsxLCAyLCAzXSwgWzEwMSwgMiwgMSwgMTBdLCBbMiwgMV0pO1xuICAgKiAvLyA9PiBbMSwgMl1cbiAgICovXG4gIGZ1bmN0aW9uIGludGVyc2VjdGlvbihhcnJheSkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBhcmdzTGVuZ3RoID0gYXJncy5sZW5ndGgsXG4gICAgICAgIGNhY2hlID0geyAnMCc6IHt9IH0sXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgaXNMYXJnZSA9IGxlbmd0aCA+PSAxMDAsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBzZWVuID0gcmVzdWx0O1xuXG4gICAgb3V0ZXI6XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICAgIGlmIChpc0xhcmdlKSB7XG4gICAgICAgIHZhciBrZXkgPSB2YWx1ZSArICcnO1xuICAgICAgICB2YXIgaW5pdGVkID0gaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZVswXSwga2V5KVxuICAgICAgICAgID8gIShzZWVuID0gY2FjaGVbMF1ba2V5XSlcbiAgICAgICAgICA6IChzZWVuID0gY2FjaGVbMF1ba2V5XSA9IFtdKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbml0ZWQgfHwgaW5kZXhPZihzZWVuLCB2YWx1ZSkgPCAwKSB7XG4gICAgICAgIGlmIChpc0xhcmdlKSB7XG4gICAgICAgICAgc2Vlbi5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJnc0luZGV4ID0gYXJnc0xlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0tYXJnc0luZGV4KSB7XG4gICAgICAgICAgaWYgKCEoY2FjaGVbYXJnc0luZGV4XSB8fCAoY2FjaGVbYXJnc0luZGV4XSA9IGNhY2hlZENvbnRhaW5zKGFyZ3NbYXJnc0luZGV4XSwgMCwgMTAwKSkpKHZhbHVlKSkge1xuICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgdGhlIGBhcnJheWAuIElmIGEgbnVtYmVyIGBuYCBpcyBwYXNzZWQsIHRoZSBsYXN0XG4gICAqIGBuYCBlbGVtZW50cyBvZiB0aGUgYGFycmF5YCBhcmUgcmV0dXJuZWQuIElmIGEgYGNhbGxiYWNrYCBmdW5jdGlvbiBpcyBwYXNzZWQsXG4gICAqIHRoZSBsYXN0IGVsZW1lbnRzIHRoZSBgY2FsbGJhY2tgIHJldHVybnMgdHJ1dGh5IGZvciBhcmUgcmV0dXJuZWQuIFRoZSBgY2FsbGJhY2tgXG4gICAqIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICAgKlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxOdW1iZXJ8U3RyaW5nfSBbY2FsbGJhY2t8bl0gVGhlIGZ1bmN0aW9uIGNhbGxlZFxuICAgKiAgcGVyIGVsZW1lbnQgb3IgdGhlIG51bWJlciBvZiBlbGVtZW50cyB0byByZXR1cm4uIElmIGEgcHJvcGVydHkgbmFtZSBvclxuICAgKiAgb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiXG4gICAqICBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50KHMpIG9mIGBhcnJheWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ubGFzdChbMSwgMiwgM10pO1xuICAgKiAvLyA9PiAzXG4gICAqXG4gICAqIF8ubGFzdChbMSwgMiwgM10sIDIpO1xuICAgKiAvLyA9PiBbMiwgM11cbiAgICpcbiAgICogXy5sYXN0KFsxLCAyLCAzXSwgZnVuY3Rpb24obnVtKSB7XG4gICAqICAgcmV0dXJuIG51bSA+IDE7XG4gICAqIH0pO1xuICAgKiAvLyA9PiBbMiwgM11cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdiZWV0JywgICAnb3JnYW5pYyc6IGZhbHNlIH0sXG4gICAqICAgeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5sYXN0KGZvb2QsICdvcmdhbmljJyk7XG4gICAqIC8vID0+IFt7ICduYW1lJzogJ2NhcnJvdCcsICdvcmdhbmljJzogdHJ1ZSB9XVxuICAgKlxuICAgKiB2YXIgZm9vZCA9IFtcbiAgICogICB7ICduYW1lJzogJ2JhbmFuYScsICd0eXBlJzogJ2ZydWl0JyB9LFxuICAgKiAgIHsgJ25hbWUnOiAnYmVldCcsICAgJ3R5cGUnOiAndmVnZXRhYmxlJyB9LFxuICAgKiAgIHsgJ25hbWUnOiAnY2Fycm90JywgJ3R5cGUnOiAndmVnZXRhYmxlJyB9XG4gICAqIF07XG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy53aGVyZVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLmxhc3QoZm9vZCwgeyAndHlwZSc6ICd2ZWdldGFibGUnIH0pO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdiZWV0JywgJ3R5cGUnOiAndmVnZXRhYmxlJyB9LCB7ICduYW1lJzogJ2NhcnJvdCcsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfV1cbiAgICovXG4gIGZ1bmN0aW9uIGxhc3QoYXJyYXksIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgaWYgKGFycmF5KSB7XG4gICAgICB2YXIgbiA9IDAsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9ICdudW1iZXInICYmIGNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbGVuZ3RoO1xuICAgICAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgd2hpbGUgKGluZGV4LS0gJiYgY2FsbGJhY2soYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICAgICAgbisrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuID0gY2FsbGJhY2s7XG4gICAgICAgIGlmIChuID09IG51bGwgfHwgdGhpc0FyZykge1xuICAgICAgICAgIHJldHVybiBhcnJheVtsZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNsaWNlKGFycmF5LCBuYXRpdmVNYXgoMCwgbGVuZ3RoIC0gbikpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgbGFzdCBvY2N1cnJlbmNlIG9mIGB2YWx1ZWAgaXMgZm91bmQgdXNpbmcgc3RyaWN0XG4gICAqIGVxdWFsaXR5IGZvciBjb21wYXJpc29ucywgaS5lLiBgPT09YC4gSWYgYGZyb21JbmRleGAgaXMgbmVnYXRpdmUsIGl0IGlzIHVzZWRcbiAgICogYXMgdGhlIG9mZnNldCBmcm9tIHRoZSBlbmQgb2YgdGhlIGNvbGxlY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmcm9tSW5kZXg9YXJyYXkubGVuZ3RoLTFdIFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUgb3IgYC0xYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5sYXN0SW5kZXhPZihbMSwgMiwgMywgMSwgMiwgM10sIDIpO1xuICAgKiAvLyA9PiA0XG4gICAqXG4gICAqIF8ubGFzdEluZGV4T2YoWzEsIDIsIDMsIDEsIDIsIDNdLCAyLCAzKTtcbiAgICogLy8gPT4gMVxuICAgKi9cbiAgZnVuY3Rpb24gbGFzdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgaW5kZXggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gICAgaWYgKHR5cGVvZiBmcm9tSW5kZXggPT0gJ251bWJlcicpIHtcbiAgICAgIGluZGV4ID0gKGZyb21JbmRleCA8IDAgPyBuYXRpdmVNYXgoMCwgaW5kZXggKyBmcm9tSW5kZXgpIDogbmF0aXZlTWluKGZyb21JbmRleCwgaW5kZXggLSAxKSkgKyAxO1xuICAgIH1cbiAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgaWYgKGFycmF5W2luZGV4XSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgZnJvbSBhcnJheXMgb2YgYGtleXNgIGFuZCBgdmFsdWVzYC4gUGFzcyBlaXRoZXJcbiAgICogYSBzaW5nbGUgdHdvIGRpbWVuc2lvbmFsIGFycmF5LCBpLmUuIGBbW2tleTEsIHZhbHVlMV0sIFtrZXkyLCB2YWx1ZTJdXWAsIG9yXG4gICAqIHR3byBhcnJheXMsIG9uZSBvZiBga2V5c2AgYW5kIG9uZSBvZiBjb3JyZXNwb25kaW5nIGB2YWx1ZXNgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0ga2V5cyBUaGUgYXJyYXkgb2Yga2V5cy5cbiAgICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlcz1bXV0gVGhlIGFycmF5IG9mIHZhbHVlcy5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIGdpdmVuIGtleXMgYW5kXG4gICAqICBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5vYmplY3QoWydtb2UnLCAnbGFycnknXSwgWzMwLCA0MF0pO1xuICAgKiAvLyA9PiB7ICdtb2UnOiAzMCwgJ2xhcnJ5JzogNDAgfVxuICAgKi9cbiAgZnVuY3Rpb24gb2JqZWN0KGtleXMsIHZhbHVlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBrZXlzID8ga2V5cy5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSB7fTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgICBpZiAodmFsdWVzKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWVzW2luZGV4XTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdFtrZXlbMF1dID0ga2V5WzFdO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgbnVtYmVycyAocG9zaXRpdmUgYW5kL29yIG5lZ2F0aXZlKSBwcm9ncmVzc2luZyBmcm9tXG4gICAqIGBzdGFydGAgdXAgdG8gYnV0IG5vdCBpbmNsdWRpbmcgYGVuZGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBvZiB0aGUgcmFuZ2UuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBlbmQgVGhlIGVuZCBvZiB0aGUgcmFuZ2UuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbc3RlcD0xXSBUaGUgdmFsdWUgdG8gaW5jcmVtZW50IG9yIGRlc2NyZW1lbnQgYnkuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyByYW5nZSBhcnJheS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5yYW5nZSgxMCk7XG4gICAqIC8vID0+IFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5XVxuICAgKlxuICAgKiBfLnJhbmdlKDEsIDExKTtcbiAgICogLy8gPT4gWzEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwXVxuICAgKlxuICAgKiBfLnJhbmdlKDAsIDMwLCA1KTtcbiAgICogLy8gPT4gWzAsIDUsIDEwLCAxNSwgMjAsIDI1XVxuICAgKlxuICAgKiBfLnJhbmdlKDAsIC0xMCwgLTEpO1xuICAgKiAvLyA9PiBbMCwgLTEsIC0yLCAtMywgLTQsIC01LCAtNiwgLTcsIC04LCAtOV1cbiAgICpcbiAgICogXy5yYW5nZSgwKTtcbiAgICogLy8gPT4gW11cbiAgICovXG4gIGZ1bmN0aW9uIHJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXApIHtcbiAgICBzdGFydCA9ICtzdGFydCB8fCAwO1xuICAgIHN0ZXAgPSArc3RlcCB8fCAxO1xuXG4gICAgaWYgKGVuZCA9PSBudWxsKSB7XG4gICAgICBlbmQgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9XG4gICAgLy8gdXNlIGBBcnJheShsZW5ndGgpYCBzbyBWOCB3aWxsIGF2b2lkIHRoZSBzbG93ZXIgXCJkaWN0aW9uYXJ5XCIgbW9kZVxuICAgIC8vIGh0dHA6Ly95b3V0dS5iZS9YQXFJcEdVOFpaayN0PTE3bTI1c1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoMCwgY2VpbCgoZW5kIC0gc3RhcnQpIC8gc3RlcCkpLFxuICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBzdGFydDtcbiAgICAgIHN0YXJ0ICs9IHN0ZXA7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9wcG9zaXRlIG9mIGBfLmluaXRpYWxgLCB0aGlzIG1ldGhvZCBnZXRzIGFsbCBidXQgdGhlIGZpcnN0IHZhbHVlIG9mIGBhcnJheWAuXG4gICAqIElmIGEgbnVtYmVyIGBuYCBpcyBwYXNzZWQsIHRoZSBmaXJzdCBgbmAgdmFsdWVzIGFyZSBleGNsdWRlZCBmcm9tIHRoZSByZXN1bHQuXG4gICAqIElmIGEgYGNhbGxiYWNrYCBmdW5jdGlvbiBpcyBwYXNzZWQsIHRoZSBmaXJzdCBlbGVtZW50cyB0aGUgYGNhbGxiYWNrYCByZXR1cm5zXG4gICAqIHRydXRoeSBmb3IgYXJlIGV4Y2x1ZGVkIGZyb20gdGhlIHJlc3VsdC4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgXG4gICAqIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGRyb3AsIHRhaWxcbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fE51bWJlcnxTdHJpbmd9IFtjYWxsYmFja3xuPTFdIFRoZSBmdW5jdGlvbiBjYWxsZWRcbiAgICogIHBlciBlbGVtZW50IG9yIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gZXhjbHVkZS4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yXG4gICAqICBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCJcbiAgICogIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgc2xpY2Ugb2YgYGFycmF5YC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5yZXN0KFsxLCAyLCAzXSk7XG4gICAqIC8vID0+IFsyLCAzXVxuICAgKlxuICAgKiBfLnJlc3QoWzEsIDIsIDNdLCAyKTtcbiAgICogLy8gPT4gWzNdXG4gICAqXG4gICAqIF8ucmVzdChbMSwgMiwgM10sIGZ1bmN0aW9uKG51bSkge1xuICAgKiAgIHJldHVybiBudW0gPCAzO1xuICAgKiB9KTtcbiAgICogLy8gPT4gWzNdXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYmFuYW5hJywgJ29yZ2FuaWMnOiB0cnVlIH0sXG4gICAqICAgeyAnbmFtZSc6ICdiZWV0JywgICAnb3JnYW5pYyc6IGZhbHNlIH0sXG4gICAqIF07XG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy5wbHVja1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLnJlc3QoZm9vZCwgJ29yZ2FuaWMnKTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnYmVldCcsICdvcmdhbmljJzogZmFsc2UgfV1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdhcHBsZScsICAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2JhbmFuYScsICd0eXBlJzogJ2ZydWl0JyB9LFxuICAgKiAgIHsgJ25hbWUnOiAnYmVldCcsICAgJ3R5cGUnOiAndmVnZXRhYmxlJyB9XG4gICAqIF07XG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy53aGVyZVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLnJlc3QoZm9vZCwgeyAndHlwZSc6ICdmcnVpdCcgfSk7XG4gICAqIC8vID0+IFt7ICduYW1lJzogJ2JlZXQnLCAndHlwZSc6ICd2ZWdldGFibGUnIH1dXG4gICAqL1xuICBmdW5jdGlvbiByZXN0KGFycmF5LCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gJ251bWJlcicgJiYgY2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgdmFyIG4gPSAwLFxuICAgICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gICAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoICYmIGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgICBuKys7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG4gPSAoY2FsbGJhY2sgPT0gbnVsbCB8fCB0aGlzQXJnKSA/IDEgOiBuYXRpdmVNYXgoMCwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm4gc2xpY2UoYXJyYXksIG4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFVzZXMgYSBiaW5hcnkgc2VhcmNoIHRvIGRldGVybWluZSB0aGUgc21hbGxlc3QgaW5kZXggYXQgd2hpY2ggdGhlIGB2YWx1ZWBcbiAgICogc2hvdWxkIGJlIGluc2VydGVkIGludG8gYGFycmF5YCBpbiBvcmRlciB0byBtYWludGFpbiB0aGUgc29ydCBvcmRlciBvZiB0aGVcbiAgICogc29ydGVkIGBhcnJheWAuIElmIGBjYWxsYmFja2AgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIGV4ZWN1dGVkIGZvciBgdmFsdWVgIGFuZFxuICAgKiBlYWNoIGVsZW1lbnQgaW4gYGFycmF5YCB0byBjb21wdXRlIHRoZWlyIHNvcnQgcmFua2luZy4gVGhlIGBjYWxsYmFja2AgaXNcbiAgICogYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OyAodmFsdWUpLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGV2YWx1YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxTdHJpbmd9IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXJcbiAgICogIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGVcbiAgICogIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgdmFsdWUgc2hvdWxkIGJlIGluc2VydGVkXG4gICAqICBpbnRvIGBhcnJheWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uc29ydGVkSW5kZXgoWzIwLCAzMCwgNTBdLCA0MCk7XG4gICAqIC8vID0+IDJcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uc29ydGVkSW5kZXgoW3sgJ3gnOiAyMCB9LCB7ICd4JzogMzAgfSwgeyAneCc6IDUwIH1dLCB7ICd4JzogNDAgfSwgJ3gnKTtcbiAgICogLy8gPT4gMlxuICAgKlxuICAgKiB2YXIgZGljdCA9IHtcbiAgICogICAnd29yZFRvTnVtYmVyJzogeyAndHdlbnR5JzogMjAsICd0aGlydHknOiAzMCwgJ2ZvdXJ0eSc6IDQwLCAnZmlmdHknOiA1MCB9XG4gICAqIH07XG4gICAqXG4gICAqIF8uc29ydGVkSW5kZXgoWyd0d2VudHknLCAndGhpcnR5JywgJ2ZpZnR5J10sICdmb3VydHknLCBmdW5jdGlvbih3b3JkKSB7XG4gICAqICAgcmV0dXJuIGRpY3Qud29yZFRvTnVtYmVyW3dvcmRdO1xuICAgKiB9KTtcbiAgICogLy8gPT4gMlxuICAgKlxuICAgKiBfLnNvcnRlZEluZGV4KFsndHdlbnR5JywgJ3RoaXJ0eScsICdmaWZ0eSddLCAnZm91cnR5JywgZnVuY3Rpb24od29yZCkge1xuICAgKiAgIHJldHVybiB0aGlzLndvcmRUb051bWJlclt3b3JkXTtcbiAgICogfSwgZGljdCk7XG4gICAqIC8vID0+IDJcbiAgICovXG4gIGZ1bmN0aW9uIHNvcnRlZEluZGV4KGFycmF5LCB2YWx1ZSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgbG93ID0gMCxcbiAgICAgICAgaGlnaCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogbG93O1xuXG4gICAgLy8gZXhwbGljaXRseSByZWZlcmVuY2UgYGlkZW50aXR5YCBmb3IgYmV0dGVyIGlubGluaW5nIGluIEZpcmVmb3hcbiAgICBjYWxsYmFjayA9IGNhbGxiYWNrID8gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIDEpIDogaWRlbnRpdHk7XG4gICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSk7XG5cbiAgICB3aGlsZSAobG93IDwgaGlnaCkge1xuICAgICAgdmFyIG1pZCA9IChsb3cgKyBoaWdoKSA+Pj4gMTtcbiAgICAgIGNhbGxiYWNrKGFycmF5W21pZF0pIDwgdmFsdWVcbiAgICAgICAgPyBsb3cgPSBtaWQgKyAxXG4gICAgICAgIDogaGlnaCA9IG1pZDtcbiAgICB9XG4gICAgcmV0dXJuIGxvdztcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgdW5pb24gb2YgdGhlIHBhc3NlZC1pbiBhcnJheXMgdXNpbmcgc3RyaWN0IGVxdWFsaXR5IGZvclxuICAgKiBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheTEsIGFycmF5MiwgLi4uXSBBcnJheXMgdG8gcHJvY2Vzcy5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHVuaXF1ZSB2YWx1ZXMsIGluIG9yZGVyLCB0aGF0IGFyZVxuICAgKiAgcHJlc2VudCBpbiBvbmUgb3IgbW9yZSBvZiB0aGUgYXJyYXlzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnVuaW9uKFsxLCAyLCAzXSwgWzEwMSwgMiwgMSwgMTBdLCBbMiwgMV0pO1xuICAgKiAvLyA9PiBbMSwgMiwgMywgMTAxLCAxMF1cbiAgICovXG4gIGZ1bmN0aW9uIHVuaW9uKCkge1xuICAgIHJldHVybiB1bmlxKGNvbmNhdC5hcHBseShhcnJheVJlZiwgYXJndW1lbnRzKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGR1cGxpY2F0ZS12YWx1ZS1mcmVlIHZlcnNpb24gb2YgdGhlIGBhcnJheWAgdXNpbmcgc3RyaWN0IGVxdWFsaXR5XG4gICAqIGZvciBjb21wYXJpc29ucywgaS5lLiBgPT09YC4gSWYgdGhlIGBhcnJheWAgaXMgYWxyZWFkeSBzb3J0ZWQsIHBhc3NpbmcgYHRydWVgXG4gICAqIGZvciBgaXNTb3J0ZWRgIHdpbGwgcnVuIGEgZmFzdGVyIGFsZ29yaXRobS4gSWYgYGNhbGxiYWNrYCBpcyBwYXNzZWQsIGVhY2hcbiAgICogZWxlbWVudCBvZiBgYXJyYXlgIGlzIHBhc3NlZCB0aHJvdWdoIGEgY2FsbGJhY2tgIGJlZm9yZSB1bmlxdWVuZXNzIGlzIGNvbXB1dGVkLlxuICAgKiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAYWxpYXMgdW5pcXVlXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHByb2Nlc3MuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzU29ydGVkPWZhbHNlXSBBIGZsYWcgdG8gaW5kaWNhdGUgdGhhdCB0aGUgYGFycmF5YCBpcyBhbHJlYWR5IHNvcnRlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgZHVwbGljYXRlLXZhbHVlLWZyZWUgYXJyYXkuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8udW5pcShbMSwgMiwgMSwgMywgMV0pO1xuICAgKiAvLyA9PiBbMSwgMiwgM11cbiAgICpcbiAgICogXy51bmlxKFsxLCAxLCAyLCAyLCAzXSwgdHJ1ZSk7XG4gICAqIC8vID0+IFsxLCAyLCAzXVxuICAgKlxuICAgKiBfLnVuaXEoWzEsIDIsIDEuNSwgMywgMi41XSwgZnVuY3Rpb24obnVtKSB7IHJldHVybiBNYXRoLmZsb29yKG51bSk7IH0pO1xuICAgKiAvLyA9PiBbMSwgMiwgM11cbiAgICpcbiAgICogXy51bmlxKFsxLCAyLCAxLjUsIDMsIDIuNV0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gdGhpcy5mbG9vcihudW0pOyB9LCBNYXRoKTtcbiAgICogLy8gPT4gWzEsIDIsIDNdXG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy5wbHVja1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLnVuaXEoW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH0sIHsgJ3gnOiAxIH1dLCAneCcpO1xuICAgKiAvLyA9PiBbeyAneCc6IDEgfSwgeyAneCc6IDIgfV1cbiAgICovXG4gIGZ1bmN0aW9uIHVuaXEoYXJyYXksIGlzU29ydGVkLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc3VsdCA9IFtdLFxuICAgICAgICBzZWVuID0gcmVzdWx0O1xuXG4gICAgLy8ganVnZ2xlIGFyZ3VtZW50c1xuICAgIGlmICh0eXBlb2YgaXNTb3J0ZWQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc0FyZyA9IGNhbGxiYWNrO1xuICAgICAgY2FsbGJhY2sgPSBpc1NvcnRlZDtcbiAgICAgIGlzU29ydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGluaXQgdmFsdWUgY2FjaGUgZm9yIGxhcmdlIGFycmF5c1xuICAgIHZhciBpc0xhcmdlID0gIWlzU29ydGVkICYmIGxlbmd0aCA+PSA3NTtcbiAgICBpZiAoaXNMYXJnZSkge1xuICAgICAgdmFyIGNhY2hlID0ge307XG4gICAgfVxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgc2VlbiA9IFtdO1xuICAgICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgfVxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgY29tcHV0ZWQgPSBjYWxsYmFjayA/IGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgYXJyYXkpIDogdmFsdWU7XG5cbiAgICAgIGlmIChpc0xhcmdlKSB7XG4gICAgICAgIHZhciBrZXkgPSBjb21wdXRlZCArICcnO1xuICAgICAgICB2YXIgaW5pdGVkID0gaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwga2V5KVxuICAgICAgICAgID8gIShzZWVuID0gY2FjaGVba2V5XSlcbiAgICAgICAgICA6IChzZWVuID0gY2FjaGVba2V5XSA9IFtdKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1NvcnRlZFxuICAgICAgICAgICAgPyAhaW5kZXggfHwgc2VlbltzZWVuLmxlbmd0aCAtIDFdICE9PSBjb21wdXRlZFxuICAgICAgICAgICAgOiBpbml0ZWQgfHwgaW5kZXhPZihzZWVuLCBjb21wdXRlZCkgPCAwXG4gICAgICAgICAgKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayB8fCBpc0xhcmdlKSB7XG4gICAgICAgICAgc2Vlbi5wdXNoKGNvbXB1dGVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSB3aXRoIGFsbCBvY2N1cnJlbmNlcyBvZiB0aGUgcGFzc2VkIHZhbHVlcyByZW1vdmVkIHVzaW5nXG4gICAqIHN0cmljdCBlcXVhbGl0eSBmb3IgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmlsdGVyLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdmFsdWUxLCB2YWx1ZTIsIC4uLl0gVmFsdWVzIHRvIHJlbW92ZS5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGZpbHRlcmVkIGFycmF5LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLndpdGhvdXQoWzEsIDIsIDEsIDAsIDMsIDEsIDRdLCAwLCAxKTtcbiAgICogLy8gPT4gWzIsIDMsIDRdXG4gICAqL1xuICBmdW5jdGlvbiB3aXRob3V0KGFycmF5KSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgY29udGFpbnMgPSBjYWNoZWRDb250YWlucyhhcmd1bWVudHMsIDEpLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICBpZiAoIWNvbnRhaW5zKHZhbHVlKSkge1xuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR3JvdXBzIHRoZSBlbGVtZW50cyBvZiBlYWNoIGFycmF5IGF0IHRoZWlyIGNvcnJlc3BvbmRpbmcgaW5kZXhlcy4gVXNlZnVsIGZvclxuICAgKiBzZXBhcmF0ZSBkYXRhIHNvdXJjZXMgdGhhdCBhcmUgY29vcmRpbmF0ZWQgdGhyb3VnaCBtYXRjaGluZyBhcnJheSBpbmRleGVzLlxuICAgKiBGb3IgYSBtYXRyaXggb2YgbmVzdGVkIGFycmF5cywgYF8uemlwLmFwcGx5KC4uLilgIGNhbiB0cmFuc3Bvc2UgdGhlIG1hdHJpeFxuICAgKiBpbiBhIHNpbWlsYXIgZmFzaGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheTEsIGFycmF5MiwgLi4uXSBBcnJheXMgdG8gcHJvY2Vzcy5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIGdyb3VwZWQgZWxlbWVudHMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uemlwKFsnbW9lJywgJ2xhcnJ5J10sIFszMCwgNDBdLCBbdHJ1ZSwgZmFsc2VdKTtcbiAgICogLy8gPT4gW1snbW9lJywgMzAsIHRydWVdLCBbJ2xhcnJ5JywgNDAsIGZhbHNlXV1cbiAgICovXG4gIGZ1bmN0aW9uIHppcChhcnJheSkge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheSA/IG1heChwbHVjayhhcmd1bWVudHMsICdsZW5ndGgnKSkgOiAwLFxuICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBwbHVjayhhcmd1bWVudHMsIGluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyByZXN0cmljdGVkIHRvIGV4ZWN1dGluZyBgZnVuY2Agb25seSBhZnRlciBpdCBpc1xuICAgKiBjYWxsZWQgYG5gIHRpbWVzLiBUaGUgYGZ1bmNgIGlzIGV4ZWN1dGVkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZVxuICAgKiBjcmVhdGVkIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0aGUgZnVuY3Rpb24gbXVzdCBiZSBjYWxsZWQgYmVmb3JlXG4gICAqIGl0IGlzIGV4ZWN1dGVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byByZXN0cmljdC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmVzdHJpY3RlZCBmdW5jdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIHJlbmRlck5vdGVzID0gXy5hZnRlcihub3Rlcy5sZW5ndGgsIHJlbmRlcik7XG4gICAqIF8uZm9yRWFjaChub3RlcywgZnVuY3Rpb24obm90ZSkge1xuICAgKiAgIG5vdGUuYXN5bmNTYXZlKHsgJ3N1Y2Nlc3MnOiByZW5kZXJOb3RlcyB9KTtcbiAgICogfSk7XG4gICAqIC8vIGByZW5kZXJOb3Rlc2AgaXMgcnVuIG9uY2UsIGFmdGVyIGFsbCBub3RlcyBoYXZlIHNhdmVkXG4gICAqL1xuICBmdW5jdGlvbiBhZnRlcihuLCBmdW5jKSB7XG4gICAgaWYgKG4gPCAxKSB7XG4gICAgICByZXR1cm4gZnVuYygpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoLS1uIDwgMSkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLCBpbnZva2VzIGBmdW5jYCB3aXRoIHRoZSBgdGhpc2BcbiAgICogYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHByZXBlbmRzIGFueSBhZGRpdGlvbmFsIGBiaW5kYCBhcmd1bWVudHMgdG8gdGhvc2VcbiAgICogcGFzc2VkIHRvIHRoZSBib3VuZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGJpbmQuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYXJnMSwgYXJnMiwgLi4uXSBBcmd1bWVudHMgdG8gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJvdW5kIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgZnVuYyA9IGZ1bmN0aW9uKGdyZWV0aW5nKSB7XG4gICAqICAgcmV0dXJuIGdyZWV0aW5nICsgJyAnICsgdGhpcy5uYW1lO1xuICAgKiB9O1xuICAgKlxuICAgKiBmdW5jID0gXy5iaW5kKGZ1bmMsIHsgJ25hbWUnOiAnbW9lJyB9LCAnaGknKTtcbiAgICogZnVuYygpO1xuICAgKiAvLyA9PiAnaGkgbW9lJ1xuICAgKi9cbiAgZnVuY3Rpb24gYmluZChmdW5jLCB0aGlzQXJnKSB7XG4gICAgLy8gdXNlIGBGdW5jdGlvbiNiaW5kYCBpZiBpdCBleGlzdHMgYW5kIGlzIGZhc3RcbiAgICAvLyAoaW4gVjggYEZ1bmN0aW9uI2JpbmRgIGlzIHNsb3dlciBleGNlcHQgd2hlbiBwYXJ0aWFsbHkgYXBwbGllZClcbiAgICByZXR1cm4gaXNCaW5kRmFzdCB8fCAobmF0aXZlQmluZCAmJiBhcmd1bWVudHMubGVuZ3RoID4gMilcbiAgICAgID8gbmF0aXZlQmluZC5jYWxsLmFwcGx5KG5hdGl2ZUJpbmQsIGFyZ3VtZW50cylcbiAgICAgIDogY3JlYXRlQm91bmQoZnVuYywgdGhpc0FyZywgc2xpY2UoYXJndW1lbnRzLCAyKSk7XG4gIH1cblxuICAvKipcbiAgICogQmluZHMgbWV0aG9kcyBvbiBgb2JqZWN0YCB0byBgb2JqZWN0YCwgb3ZlcndyaXRpbmcgdGhlIGV4aXN0aW5nIG1ldGhvZC5cbiAgICogTWV0aG9kIG5hbWVzIG1heSBiZSBzcGVjaWZpZWQgYXMgaW5kaXZpZHVhbCBhcmd1bWVudHMgb3IgYXMgYXJyYXlzIG9mIG1ldGhvZFxuICAgKiBuYW1lcy4gSWYgbm8gbWV0aG9kIG5hbWVzIGFyZSBwcm92aWRlZCwgYWxsIHRoZSBmdW5jdGlvbiBwcm9wZXJ0aWVzIG9mIGBvYmplY3RgXG4gICAqIHdpbGwgYmUgYm91bmQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gYmluZCBhbmQgYXNzaWduIHRoZSBib3VuZCBtZXRob2RzIHRvLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW21ldGhvZE5hbWUxLCBtZXRob2ROYW1lMiwgLi4uXSBNZXRob2QgbmFtZXMgb24gdGhlIG9iamVjdCB0byBiaW5kLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgdmlldyA9IHtcbiAgICogICdsYWJlbCc6ICdkb2NzJyxcbiAgICogICdvbkNsaWNrJzogZnVuY3Rpb24oKSB7IGFsZXJ0KCdjbGlja2VkICcgKyB0aGlzLmxhYmVsKTsgfVxuICAgKiB9O1xuICAgKlxuICAgKiBfLmJpbmRBbGwodmlldyk7XG4gICAqIGpRdWVyeSgnI2RvY3MnKS5vbignY2xpY2snLCB2aWV3Lm9uQ2xpY2spO1xuICAgKiAvLyA9PiBhbGVydHMgJ2NsaWNrZWQgZG9jcycsIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAqL1xuICBmdW5jdGlvbiBiaW5kQWxsKG9iamVjdCkge1xuICAgIHZhciBmdW5jcyA9IGNvbmNhdC5hcHBseShhcnJheVJlZiwgYXJndW1lbnRzKSxcbiAgICAgICAgaW5kZXggPSBmdW5jcy5sZW5ndGggPiAxID8gMCA6IChmdW5jcyA9IGZ1bmN0aW9ucyhvYmplY3QpLCAtMSksXG4gICAgICAgIGxlbmd0aCA9IGZ1bmNzLmxlbmd0aDtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5ID0gZnVuY3NbaW5kZXhdO1xuICAgICAgb2JqZWN0W2tleV0gPSBiaW5kKG9iamVjdFtrZXldLCBvYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCwgaW52b2tlcyB0aGUgbWV0aG9kIGF0IGBvYmplY3Rba2V5XWBcbiAgICogYW5kIHByZXBlbmRzIGFueSBhZGRpdGlvbmFsIGBiaW5kS2V5YCBhcmd1bWVudHMgdG8gdGhvc2UgcGFzc2VkIHRvIHRoZSBib3VuZFxuICAgKiBmdW5jdGlvbi4gVGhpcyBtZXRob2QgZGlmZmVycyBmcm9tIGBfLmJpbmRgIGJ5IGFsbG93aW5nIGJvdW5kIGZ1bmN0aW9ucyB0b1xuICAgKiByZWZlcmVuY2UgbWV0aG9kcyB0aGF0IHdpbGwgYmUgcmVkZWZpbmVkIG9yIGRvbid0IHlldCBleGlzdC5cbiAgICogU2VlIGh0dHA6Ly9taWNoYXV4LmNhL2FydGljbGVzL2xhenktZnVuY3Rpb24tZGVmaW5pdGlvbi1wYXR0ZXJuLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRoZSBtZXRob2QgYmVsb25ncyB0by5cbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFthcmcxLCBhcmcyLCAuLi5dIEFyZ3VtZW50cyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYm91bmQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBvYmplY3QgPSB7XG4gICAqICAgJ25hbWUnOiAnbW9lJyxcbiAgICogICAnZ3JlZXQnOiBmdW5jdGlvbihncmVldGluZykge1xuICAgKiAgICAgcmV0dXJuIGdyZWV0aW5nICsgJyAnICsgdGhpcy5uYW1lO1xuICAgKiAgIH1cbiAgICogfTtcbiAgICpcbiAgICogdmFyIGZ1bmMgPSBfLmJpbmRLZXkob2JqZWN0LCAnZ3JlZXQnLCAnaGknKTtcbiAgICogZnVuYygpO1xuICAgKiAvLyA9PiAnaGkgbW9lJ1xuICAgKlxuICAgKiBvYmplY3QuZ3JlZXQgPSBmdW5jdGlvbihncmVldGluZykge1xuICAgKiAgIHJldHVybiBncmVldGluZyArICcsICcgKyB0aGlzLm5hbWUgKyAnISc7XG4gICAqIH07XG4gICAqXG4gICAqIGZ1bmMoKTtcbiAgICogLy8gPT4gJ2hpLCBtb2UhJ1xuICAgKi9cbiAgZnVuY3Rpb24gYmluZEtleShvYmplY3QsIGtleSkge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZChvYmplY3QsIGtleSwgc2xpY2UoYXJndW1lbnRzLCAyKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgdGhlIGNvbXBvc2l0aW9uIG9mIHRoZSBwYXNzZWQgZnVuY3Rpb25zLFxuICAgKiB3aGVyZSBlYWNoIGZ1bmN0aW9uIGNvbnN1bWVzIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXQgZm9sbG93cy5cbiAgICogRm9yIGV4YW1wbGUsIGNvbXBvc2luZyB0aGUgZnVuY3Rpb25zIGBmKClgLCBgZygpYCwgYW5kIGBoKClgIHByb2R1Y2VzIGBmKGcoaCgpKSlgLlxuICAgKiBFYWNoIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjb21wb3NlZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtmdW5jMSwgZnVuYzIsIC4uLl0gRnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbXBvc2VkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgZ3JlZXQgPSBmdW5jdGlvbihuYW1lKSB7IHJldHVybiAnaGkgJyArIG5hbWU7IH07XG4gICAqIHZhciBleGNsYWltID0gZnVuY3Rpb24oc3RhdGVtZW50KSB7IHJldHVybiBzdGF0ZW1lbnQgKyAnISc7IH07XG4gICAqIHZhciB3ZWxjb21lID0gXy5jb21wb3NlKGV4Y2xhaW0sIGdyZWV0KTtcbiAgICogd2VsY29tZSgnbW9lJyk7XG4gICAqIC8vID0+ICdoaSBtb2UhJ1xuICAgKi9cbiAgZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgICB2YXIgZnVuY3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgbGVuZ3RoID0gZnVuY3MubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgYXJncyA9IFtmdW5jc1tsZW5ndGhdLmFwcGx5KHRoaXMsIGFyZ3MpXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcmdzWzBdO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBkZWxheSB0aGUgZXhlY3V0aW9uIG9mIGBmdW5jYCB1bnRpbCBhZnRlclxuICAgKiBgd2FpdGAgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIGl0IHdhcyBpbnZva2VkLiBQYXNzXG4gICAqIGB0cnVlYCBmb3IgYGltbWVkaWF0ZWAgdG8gY2F1c2UgZGVib3VuY2UgdG8gaW52b2tlIGBmdW5jYCBvbiB0aGUgbGVhZGluZyxcbiAgICogaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcsIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBTdWJzZXF1ZW50IGNhbGxzIHRvXG4gICAqIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgY2FsbC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBpbW1lZGlhdGUgQSBmbGFnIHRvIGluZGljYXRlIGV4ZWN1dGlvbiBpcyBvbiB0aGUgbGVhZGluZ1xuICAgKiAgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgbGF6eUxheW91dCA9IF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAzMDApO1xuICAgKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgbGF6eUxheW91dCk7XG4gICAqL1xuICBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgYXJncyxcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICB0aGlzQXJnLFxuICAgICAgICB0aW1lb3V0SWQ7XG5cbiAgICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgICAgdGltZW91dElkID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpc0ltbWVkaWF0ZSA9IGltbWVkaWF0ZSAmJiAhdGltZW91dElkO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHRoaXNBcmcgPSB0aGlzO1xuXG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZGVsYXllZCwgd2FpdCk7XG5cbiAgICAgIGlmIChpc0ltbWVkaWF0ZSkge1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBgZnVuY2AgZnVuY3Rpb24gYWZ0ZXIgYHdhaXRgIG1pbGxpc2Vjb25kcy4gQWRkaXRpb25hbCBhcmd1bWVudHNcbiAgICogd2lsbCBiZSBwYXNzZWQgdG8gYGZ1bmNgIHdoZW4gaXQgaXMgaW52b2tlZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlbGF5LlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheSBleGVjdXRpb24uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFthcmcxLCBhcmcyLCAuLi5dIEFyZ3VtZW50cyB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGguXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIGBzZXRUaW1lb3V0YCB0aW1lb3V0IGlkLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgbG9nID0gXy5iaW5kKGNvbnNvbGUubG9nLCBjb25zb2xlKTtcbiAgICogXy5kZWxheShsb2csIDEwMDAsICdsb2dnZWQgbGF0ZXInKTtcbiAgICogLy8gPT4gJ2xvZ2dlZCBsYXRlcicgKEFwcGVhcnMgYWZ0ZXIgb25lIHNlY29uZC4pXG4gICAqL1xuICBmdW5jdGlvbiBkZWxheShmdW5jLCB3YWl0KSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMsIDIpO1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7IH0sIHdhaXQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmVycyBleGVjdXRpbmcgdGhlIGBmdW5jYCBmdW5jdGlvbiB1bnRpbCB0aGUgY3VycmVudCBjYWxsIHN0YWNrIGhhcyBjbGVhcmVkLlxuICAgKiBBZGRpdGlvbmFsIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCB0byBgZnVuY2Agd2hlbiBpdCBpcyBpbnZva2VkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVmZXIuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFthcmcxLCBhcmcyLCAuLi5dIEFyZ3VtZW50cyB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGguXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIGBzZXRUaW1lb3V0YCB0aW1lb3V0IGlkLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmRlZmVyKGZ1bmN0aW9uKCkgeyBhbGVydCgnZGVmZXJyZWQnKTsgfSk7XG4gICAqIC8vIHJldHVybnMgZnJvbSB0aGUgZnVuY3Rpb24gYmVmb3JlIGBhbGVydGAgaXMgY2FsbGVkXG4gICAqL1xuICBmdW5jdGlvbiBkZWZlcihmdW5jKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7IH0sIDEpO1xuICB9XG4gIC8vIHVzZSBgc2V0SW1tZWRpYXRlYCBpZiBpdCdzIGF2YWlsYWJsZSBpbiBOb2RlLmpzXG4gIGlmIChpc1Y4ICYmIGZyZWVNb2R1bGUgJiYgdHlwZW9mIHNldEltbWVkaWF0ZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgZGVmZXIgPSBiaW5kKHNldEltbWVkaWF0ZSwgd2luZG93KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBtZW1vaXplcyB0aGUgcmVzdWx0IG9mIGBmdW5jYC4gSWYgYHJlc29sdmVyYCBpc1xuICAgKiBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBkZXRlcm1pbmUgdGhlIGNhY2hlIGtleSBmb3Igc3RvcmluZyB0aGUgcmVzdWx0XG4gICAqIGJhc2VkIG9uIHRoZSBhcmd1bWVudHMgcGFzc2VkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbi4gQnkgZGVmYXVsdCwgdGhlIGZpcnN0XG4gICAqIGFyZ3VtZW50IHBhc3NlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gICAqIGlzIGV4ZWN1dGVkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3Jlc29sdmVyXSBBIGZ1bmN0aW9uIHVzZWQgdG8gcmVzb2x2ZSB0aGUgY2FjaGUga2V5LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXppbmcgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBmaWJvbmFjY2kgPSBfLm1lbW9pemUoZnVuY3Rpb24obikge1xuICAgKiAgIHJldHVybiBuIDwgMiA/IG4gOiBmaWJvbmFjY2kobiAtIDEpICsgZmlib25hY2NpKG4gLSAyKTtcbiAgICogfSk7XG4gICAqL1xuICBmdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gICAgdmFyIGNhY2hlID0ge307XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleSA9IChyZXNvbHZlciA/IHJlc29sdmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBhcmd1bWVudHNbMF0pICsgJyc7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChjYWNoZSwga2V5KVxuICAgICAgICA/IGNhY2hlW2tleV1cbiAgICAgICAgOiAoY2FjaGVba2V5XSA9IGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpcyByZXN0cmljdGVkIHRvIGV4ZWN1dGUgYGZ1bmNgIG9uY2UuIFJlcGVhdCBjYWxscyB0b1xuICAgKiB0aGUgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHZhbHVlIG9mIHRoZSBmaXJzdCBjYWxsLiBUaGUgYGZ1bmNgIGlzIGV4ZWN1dGVkXG4gICAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHJlc3RyaWN0ZWQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBpbml0aWFsaXplID0gXy5vbmNlKGNyZWF0ZUFwcGxpY2F0aW9uKTtcbiAgICogaW5pdGlhbGl6ZSgpO1xuICAgKiBpbml0aWFsaXplKCk7XG4gICAqIC8vIGBpbml0aWFsaXplYCBleGVjdXRlcyBgY3JlYXRlQXBwbGljYXRpb25gIG9uY2VcbiAgICovXG4gIGZ1bmN0aW9uIG9uY2UoZnVuYykge1xuICAgIHZhciByYW4sXG4gICAgICAgIHJlc3VsdDtcblxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChyYW4pIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHJhbiA9IHRydWU7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgIC8vIGNsZWFyIHRoZSBgZnVuY2AgdmFyaWFibGUgc28gdGhlIGZ1bmN0aW9uIG1heSBiZSBnYXJiYWdlIGNvbGxlY3RlZFxuICAgICAgZnVuYyA9IG51bGw7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLCBpbnZva2VzIGBmdW5jYCB3aXRoIGFueSBhZGRpdGlvbmFsXG4gICAqIGBwYXJ0aWFsYCBhcmd1bWVudHMgcHJlcGVuZGVkIHRvIHRob3NlIHBhc3NlZCB0byB0aGUgbmV3IGZ1bmN0aW9uLiBUaGlzXG4gICAqIG1ldGhvZCBpcyBzaW1pbGFyIHRvIGBfLmJpbmRgLCBleGNlcHQgaXQgZG9lcyAqKm5vdCoqIGFsdGVyIHRoZSBgdGhpc2AgYmluZGluZy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHBhcnRpYWxseSBhcHBseSBhcmd1bWVudHMgdG8uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFthcmcxLCBhcmcyLCAuLi5dIEFyZ3VtZW50cyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcGFydGlhbGx5IGFwcGxpZWQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBncmVldCA9IGZ1bmN0aW9uKGdyZWV0aW5nLCBuYW1lKSB7IHJldHVybiBncmVldGluZyArICcgJyArIG5hbWU7IH07XG4gICAqIHZhciBoaSA9IF8ucGFydGlhbChncmVldCwgJ2hpJyk7XG4gICAqIGhpKCdtb2UnKTtcbiAgICogLy8gPT4gJ2hpIG1vZSdcbiAgICovXG4gIGZ1bmN0aW9uIHBhcnRpYWwoZnVuYykge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZChmdW5jLCBzbGljZShhcmd1bWVudHMsIDEpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBzaW1pbGFyIHRvIGBfLnBhcnRpYWxgLCBleGNlcHQgdGhhdCBgcGFydGlhbGAgYXJndW1lbnRzIGFyZVxuICAgKiBhcHBlbmRlZCB0byB0aG9zZSBwYXNzZWQgdG8gdGhlIG5ldyBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHBhcnRpYWxseSBhcHBseSBhcmd1bWVudHMgdG8uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFthcmcxLCBhcmcyLCAuLi5dIEFyZ3VtZW50cyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcGFydGlhbGx5IGFwcGxpZWQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBkZWZhdWx0c0RlZXAgPSBfLnBhcnRpYWxSaWdodChfLm1lcmdlLCBfLmRlZmF1bHRzKTtcbiAgICpcbiAgICogdmFyIG9wdGlvbnMgPSB7XG4gICAqICAgJ3ZhcmlhYmxlJzogJ2RhdGEnLFxuICAgKiAgICdpbXBvcnRzJzogeyAnanEnOiAkIH1cbiAgICogfTtcbiAgICpcbiAgICogZGVmYXVsdHNEZWVwKG9wdGlvbnMsIF8udGVtcGxhdGVTZXR0aW5ncyk7XG4gICAqXG4gICAqIG9wdGlvbnMudmFyaWFibGVcbiAgICogLy8gPT4gJ2RhdGEnXG4gICAqXG4gICAqIG9wdGlvbnMuaW1wb3J0c1xuICAgKiAvLyA9PiB7ICdfJzogXywgJ2pxJzogJCB9XG4gICAqL1xuICBmdW5jdGlvbiBwYXJ0aWFsUmlnaHQoZnVuYykge1xuICAgIHJldHVybiBjcmVhdGVCb3VuZChmdW5jLCBzbGljZShhcmd1bWVudHMsIDEpLCBudWxsLCBpbmRpY2F0b3JPYmplY3QpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGV4ZWN1dGVkLCB3aWxsIG9ubHkgY2FsbCB0aGUgYGZ1bmNgXG4gICAqIGZ1bmN0aW9uIGF0IG1vc3Qgb25jZSBwZXIgZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gSWYgdGhlIHRocm90dGxlZFxuICAgKiBmdW5jdGlvbiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQsIGBmdW5jYCB3aWxsXG4gICAqIGFsc28gYmUgY2FsbGVkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZVxuICAgKiB0aHJvdHRsZWQgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgY2FsbC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gd2FpdCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBleGVjdXRpb25zIHRvLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciB0aHJvdHRsZWQgPSBfLnRocm90dGxlKHVwZGF0ZVBvc2l0aW9uLCAxMDApO1xuICAgKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgdGhyb3R0bGVkKTtcbiAgICovXG4gIGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcbiAgICB2YXIgYXJncyxcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICB0aGlzQXJnLFxuICAgICAgICB0aW1lb3V0SWQsXG4gICAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gICAgZnVuY3Rpb24gdHJhaWxpbmdDYWxsKCkge1xuICAgICAgbGFzdENhbGxlZCA9IG5ldyBEYXRlO1xuICAgICAgdGltZW91dElkID0gbnVsbDtcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSxcbiAgICAgICAgICByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIGxhc3RDYWxsZWQpO1xuXG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdGhpc0FyZyA9IHRoaXM7XG5cbiAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElkKTtcbiAgICAgICAgdGltZW91dElkID0gbnVsbDtcbiAgICAgICAgbGFzdENhbGxlZCA9IG5vdztcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCF0aW1lb3V0SWQpIHtcbiAgICAgICAgdGltZW91dElkID0gc2V0VGltZW91dCh0cmFpbGluZ0NhbGwsIHJlbWFpbmluZyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgcGFzc2VzIGB2YWx1ZWAgdG8gdGhlIGB3cmFwcGVyYCBmdW5jdGlvbiBhcyBpdHNcbiAgICogZmlyc3QgYXJndW1lbnQuIEFkZGl0aW9uYWwgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZnVuY3Rpb24gYXJlIGFwcGVuZGVkXG4gICAqIHRvIHRob3NlIHBhc3NlZCB0byB0aGUgYHdyYXBwZXJgIGZ1bmN0aW9uLiBUaGUgYHdyYXBwZXJgIGlzIGV4ZWN1dGVkIHdpdGhcbiAgICogdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBjcmVhdGVkIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIHdyYXAuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHdyYXBwZXIgVGhlIHdyYXBwZXIgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgaGVsbG8gPSBmdW5jdGlvbihuYW1lKSB7IHJldHVybiAnaGVsbG8gJyArIG5hbWU7IH07XG4gICAqIGhlbGxvID0gXy53cmFwKGhlbGxvLCBmdW5jdGlvbihmdW5jKSB7XG4gICAqICAgcmV0dXJuICdiZWZvcmUsICcgKyBmdW5jKCdtb2UnKSArICcsIGFmdGVyJztcbiAgICogfSk7XG4gICAqIGhlbGxvKCk7XG4gICAqIC8vID0+ICdiZWZvcmUsIGhlbGxvIG1vZSwgYWZ0ZXInXG4gICAqL1xuICBmdW5jdGlvbiB3cmFwKHZhbHVlLCB3cmFwcGVyKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbdmFsdWVdO1xuICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHdyYXBwZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyB0aGUgY2hhcmFjdGVycyBgJmAsIGA8YCwgYD5gLCBgXCJgLCBhbmQgYCdgIGluIGBzdHJpbmdgIHRvIHRoZWlyXG4gICAqIGNvcnJlc3BvbmRpbmcgSFRNTCBlbnRpdGllcy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBlc2NhcGUuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgc3RyaW5nLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmVzY2FwZSgnTW9lLCBMYXJyeSAmIEN1cmx5Jyk7XG4gICAqIC8vID0+ICdNb2UsIExhcnJ5ICZhbXA7IEN1cmx5J1xuICAgKi9cbiAgZnVuY3Rpb24gZXNjYXBlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcgPT0gbnVsbCA/ICcnIDogKHN0cmluZyArICcnKS5yZXBsYWNlKHJlVW5lc2NhcGVkSHRtbCwgZXNjYXBlSHRtbENoYXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgcGFzc2VkIHRvIGl0LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgQW55IHZhbHVlLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgYHZhbHVlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIG1vZSA9IHsgJ25hbWUnOiAnbW9lJyB9O1xuICAgKiBtb2UgPT09IF8uaWRlbnRpdHkobW9lKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBmdW5jdGlvbnMgcHJvcGVydGllcyBvZiBgb2JqZWN0YCB0byB0aGUgYGxvZGFzaGAgZnVuY3Rpb24gYW5kIGNoYWluYWJsZVxuICAgKiB3cmFwcGVyLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IG9mIGZ1bmN0aW9uIHByb3BlcnRpZXMgdG8gYWRkIHRvIGBsb2Rhc2hgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLm1peGluKHtcbiAgICogICAnY2FwaXRhbGl6ZSc6IGZ1bmN0aW9uKHN0cmluZykge1xuICAgKiAgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgKiAgIH1cbiAgICogfSk7XG4gICAqXG4gICAqIF8uY2FwaXRhbGl6ZSgnbW9lJyk7XG4gICAqIC8vID0+ICdNb2UnXG4gICAqXG4gICAqIF8oJ21vZScpLmNhcGl0YWxpemUoKTtcbiAgICogLy8gPT4gJ01vZSdcbiAgICovXG4gIGZ1bmN0aW9uIG1peGluKG9iamVjdCkge1xuICAgIGZvckVhY2goZnVuY3Rpb25zKG9iamVjdCksIGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICAgIHZhciBmdW5jID0gbG9kYXNoW21ldGhvZE5hbWVdID0gb2JqZWN0W21ldGhvZE5hbWVdO1xuXG4gICAgICBsb2Rhc2gucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gW3RoaXMuX193cmFwcGVkX19dO1xuICAgICAgICBwdXNoLmFwcGx5KGFyZ3MsIGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiBuZXcgbG9kYXNoKGZ1bmMuYXBwbHkobG9kYXNoLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldmVydHMgdGhlICdfJyB2YXJpYWJsZSB0byBpdHMgcHJldmlvdXMgdmFsdWUgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG9cbiAgICogdGhlIGBsb2Rhc2hgIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBgbG9kYXNoYCBmdW5jdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGxvZGFzaCA9IF8ubm9Db25mbGljdCgpO1xuICAgKi9cbiAgZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICB3aW5kb3cuXyA9IG9sZERhc2g7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUHJvZHVjZXMgYSByYW5kb20gbnVtYmVyIGJldHdlZW4gYG1pbmAgYW5kIGBtYXhgIChpbmNsdXNpdmUpLiBJZiBvbmx5IG9uZVxuICAgKiBhcmd1bWVudCBpcyBwYXNzZWQsIGEgbnVtYmVyIGJldHdlZW4gYDBgIGFuZCB0aGUgZ2l2ZW4gbnVtYmVyIHdpbGwgYmUgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IFV0aWxpdGllc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW21pbj0wXSBUaGUgbWluaW11bSBwb3NzaWJsZSB2YWx1ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFttYXg9MV0gVGhlIG1heGltdW0gcG9zc2libGUgdmFsdWUuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgYSByYW5kb20gbnVtYmVyLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnJhbmRvbSgwLCA1KTtcbiAgICogLy8gPT4gYSBudW1iZXIgYmV0d2VlbiAwIGFuZCA1XG4gICAqXG4gICAqIF8ucmFuZG9tKDUpO1xuICAgKiAvLyA9PiBhbHNvIGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgNVxuICAgKi9cbiAgZnVuY3Rpb24gcmFuZG9tKG1pbiwgbWF4KSB7XG4gICAgaWYgKG1pbiA9PSBudWxsICYmIG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSAxO1xuICAgIH1cbiAgICBtaW4gPSArbWluIHx8IDA7XG4gICAgaWYgKG1heCA9PSBudWxsKSB7XG4gICAgICBtYXggPSBtaW47XG4gICAgICBtaW4gPSAwO1xuICAgIH1cbiAgICByZXR1cm4gbWluICsgZmxvb3IobmF0aXZlUmFuZG9tKCkgKiAoKCttYXggfHwgMCkgLSBtaW4gKyAxKSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIHZhbHVlIG9mIGBwcm9wZXJ0eWAgb24gYG9iamVjdGAuIElmIGBwcm9wZXJ0eWAgaXMgYSBmdW5jdGlvbixcbiAgICogaXQgd2lsbCBiZSBpbnZva2VkIGFuZCBpdHMgcmVzdWx0IHJldHVybmVkLCBlbHNlIHRoZSBwcm9wZXJ0eSB2YWx1ZSBpc1xuICAgKiByZXR1cm5lZC4gSWYgYG9iamVjdGAgaXMgZmFsc2V5LCB0aGVuIGBudWxsYCBpcyByZXR1cm5lZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgVGhlIHByb3BlcnR5IHRvIGdldCB0aGUgdmFsdWUgb2YuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBvYmplY3QgPSB7XG4gICAqICAgJ2NoZWVzZSc6ICdjcnVtcGV0cycsXG4gICAqICAgJ3N0dWZmJzogZnVuY3Rpb24oKSB7XG4gICAqICAgICByZXR1cm4gJ25vbnNlbnNlJztcbiAgICogICB9XG4gICAqIH07XG4gICAqXG4gICAqIF8ucmVzdWx0KG9iamVjdCwgJ2NoZWVzZScpO1xuICAgKiAvLyA9PiAnY3J1bXBldHMnXG4gICAqXG4gICAqIF8ucmVzdWx0KG9iamVjdCwgJ3N0dWZmJyk7XG4gICAqIC8vID0+ICdub25zZW5zZSdcbiAgICovXG4gIGZ1bmN0aW9uIHJlc3VsdChvYmplY3QsIHByb3BlcnR5KSB7XG4gICAgdmFyIHZhbHVlID0gb2JqZWN0ID8gb2JqZWN0W3Byb3BlcnR5XSA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gaXNGdW5jdGlvbih2YWx1ZSkgPyBvYmplY3RbcHJvcGVydHldKCkgOiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG1pY3JvLXRlbXBsYXRpbmcgbWV0aG9kIHRoYXQgaGFuZGxlcyBhcmJpdHJhcnkgZGVsaW1pdGVycywgcHJlc2VydmVzXG4gICAqIHdoaXRlc3BhY2UsIGFuZCBjb3JyZWN0bHkgZXNjYXBlcyBxdW90ZXMgd2l0aGluIGludGVycG9sYXRlZCBjb2RlLlxuICAgKlxuICAgKiBOb3RlOiBJbiB0aGUgZGV2ZWxvcG1lbnQgYnVpbGQsIGBfLnRlbXBsYXRlYCB1dGlsaXplcyBzb3VyY2VVUkxzIGZvciBlYXNpZXJcbiAgICogZGVidWdnaW5nLiBTZWUgaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvZGV2ZWxvcGVydG9vbHMvc291cmNlbWFwcy8jdG9jLXNvdXJjZXVybFxuICAgKlxuICAgKiBOb3RlOiBMby1EYXNoIG1heSBiZSB1c2VkIGluIENocm9tZSBleHRlbnNpb25zIGJ5IGVpdGhlciBjcmVhdGluZyBhIGBsb2Rhc2ggY3NwYFxuICAgKiBidWlsZCBhbmQgdXNpbmcgcHJlY29tcGlsZWQgdGVtcGxhdGVzLCBvciBsb2FkaW5nIExvLURhc2ggaW4gYSBzYW5kYm94LlxuICAgKlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBwcmVjb21waWxpbmcgdGVtcGxhdGVzIHNlZTpcbiAgICogaHR0cDovL2xvZGFzaC5jb20vI2N1c3RvbS1idWlsZHNcbiAgICpcbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gQ2hyb21lIGV4dGVuc2lvbiBzYW5kYm94ZXMgc2VlOlxuICAgKiBodHRwOi8vZGV2ZWxvcGVyLmNocm9tZS5jb20vc3RhYmxlL2V4dGVuc2lvbnMvc2FuZGJveGluZ0V2YWwuaHRtbFxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IHRleHQgVGhlIHRlbXBsYXRlIHRleHQuXG4gICAqIEBwYXJhbSB7T2JlY3R9IGRhdGEgVGhlIGRhdGEgb2JqZWN0IHVzZWQgdG8gcG9wdWxhdGUgdGhlIHRleHQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogIGVzY2FwZSAtIFRoZSBcImVzY2FwZVwiIGRlbGltaXRlciByZWdleHAuXG4gICAqICBldmFsdWF0ZSAtIFRoZSBcImV2YWx1YXRlXCIgZGVsaW1pdGVyIHJlZ2V4cC5cbiAgICogIGludGVycG9sYXRlIC0gVGhlIFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXIgcmVnZXhwLlxuICAgKiAgc291cmNlVVJMIC0gVGhlIHNvdXJjZVVSTCBvZiB0aGUgdGVtcGxhdGUncyBjb21waWxlZCBzb3VyY2UuXG4gICAqICB2YXJpYWJsZSAtIFRoZSBkYXRhIG9iamVjdCB2YXJpYWJsZSBuYW1lLlxuICAgKlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb258U3RyaW5nfSBSZXR1cm5zIGEgY29tcGlsZWQgZnVuY3Rpb24gd2hlbiBubyBgZGF0YWAgb2JqZWN0XG4gICAqICBpcyBnaXZlbiwgZWxzZSBpdCByZXR1cm5zIHRoZSBpbnRlcnBvbGF0ZWQgdGV4dC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogLy8gdXNpbmcgYSBjb21waWxlZCB0ZW1wbGF0ZVxuICAgKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyA8JT0gbmFtZSAlPicpO1xuICAgKiBjb21waWxlZCh7ICduYW1lJzogJ21vZScgfSk7XG4gICAqIC8vID0+ICdoZWxsbyBtb2UnXG4gICAqXG4gICAqIHZhciBsaXN0ID0gJzwlIF8uZm9yRWFjaChwZW9wbGUsIGZ1bmN0aW9uKG5hbWUpIHsgJT48bGk+PCU9IG5hbWUgJT48L2xpPjwlIH0pOyAlPic7XG4gICAqIF8udGVtcGxhdGUobGlzdCwgeyAncGVvcGxlJzogWydtb2UnLCAnbGFycnknXSB9KTtcbiAgICogLy8gPT4gJzxsaT5tb2U8L2xpPjxsaT5sYXJyeTwvbGk+J1xuICAgKlxuICAgKiAvLyB1c2luZyB0aGUgXCJlc2NhcGVcIiBkZWxpbWl0ZXIgdG8gZXNjYXBlIEhUTUwgaW4gZGF0YSBwcm9wZXJ0eSB2YWx1ZXNcbiAgICogXy50ZW1wbGF0ZSgnPGI+PCUtIHZhbHVlICU+PC9iPicsIHsgJ3ZhbHVlJzogJzxzY3JpcHQ+JyB9KTtcbiAgICogLy8gPT4gJzxiPiZsdDtzY3JpcHQmZ3Q7PC9iPidcbiAgICpcbiAgICogLy8gdXNpbmcgdGhlIEVTNiBkZWxpbWl0ZXIgYXMgYW4gYWx0ZXJuYXRpdmUgdG8gdGhlIGRlZmF1bHQgXCJpbnRlcnBvbGF0ZVwiIGRlbGltaXRlclxuICAgKiBfLnRlbXBsYXRlKCdoZWxsbyAkeyBuYW1lIH0nLCB7ICduYW1lJzogJ2N1cmx5JyB9KTtcbiAgICogLy8gPT4gJ2hlbGxvIGN1cmx5J1xuICAgKlxuICAgKiAvLyB1c2luZyB0aGUgaW50ZXJuYWwgYHByaW50YCBmdW5jdGlvbiBpbiBcImV2YWx1YXRlXCIgZGVsaW1pdGVyc1xuICAgKiBfLnRlbXBsYXRlKCc8JSBwcmludChcImhlbGxvIFwiICsgZXBpdGhldCk7ICU+IScsIHsgJ2VwaXRoZXQnOiAnc3Rvb2dlJyB9KTtcbiAgICogLy8gPT4gJ2hlbGxvIHN0b29nZSEnXG4gICAqXG4gICAqIC8vIHVzaW5nIGN1c3RvbSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzXG4gICAqIF8udGVtcGxhdGVTZXR0aW5ncyA9IHtcbiAgICogICAnaW50ZXJwb2xhdGUnOiAve3soW1xcc1xcU10rPyl9fS9nXG4gICAqIH07XG4gICAqXG4gICAqIF8udGVtcGxhdGUoJ2hlbGxvIHt7IG5hbWUgfX0hJywgeyAnbmFtZSc6ICdtdXN0YWNoZScgfSk7XG4gICAqIC8vID0+ICdoZWxsbyBtdXN0YWNoZSEnXG4gICAqXG4gICAqIC8vIHVzaW5nIHRoZSBgc291cmNlVVJMYCBvcHRpb24gdG8gc3BlY2lmeSBhIGN1c3RvbSBzb3VyY2VVUkwgZm9yIHRoZSB0ZW1wbGF0ZVxuICAgKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoZWxsbyA8JT0gbmFtZSAlPicsIG51bGwsIHsgJ3NvdXJjZVVSTCc6ICcvYmFzaWMvZ3JlZXRpbmcuanN0JyB9KTtcbiAgICogY29tcGlsZWQoZGF0YSk7XG4gICAqIC8vID0+IGZpbmQgdGhlIHNvdXJjZSBvZiBcImdyZWV0aW5nLmpzdFwiIHVuZGVyIHRoZSBTb3VyY2VzIHRhYiBvciBSZXNvdXJjZXMgcGFuZWwgb2YgdGhlIHdlYiBpbnNwZWN0b3JcbiAgICpcbiAgICogLy8gdXNpbmcgdGhlIGB2YXJpYWJsZWAgb3B0aW9uIHRvIGVuc3VyZSBhIHdpdGgtc3RhdGVtZW50IGlzbid0IHVzZWQgaW4gdGhlIGNvbXBpbGVkIHRlbXBsYXRlXG4gICAqIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUoJ2hpIDwlPSBkYXRhLm5hbWUgJT4hJywgbnVsbCwgeyAndmFyaWFibGUnOiAnZGF0YScgfSk7XG4gICAqIGNvbXBpbGVkLnNvdXJjZTtcbiAgICogLy8gPT4gZnVuY3Rpb24oZGF0YSkge1xuICAgKiAgIHZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZTtcbiAgICogICBfX3AgKz0gJ2hpICcgKyAoKF9fdCA9ICggZGF0YS5uYW1lICkpID09IG51bGwgPyAnJyA6IF9fdCkgKyAnISc7XG4gICAqICAgcmV0dXJuIF9fcDtcbiAgICogfVxuICAgKlxuICAgKiAvLyB1c2luZyB0aGUgYHNvdXJjZWAgcHJvcGVydHkgdG8gaW5saW5lIGNvbXBpbGVkIHRlbXBsYXRlcyBmb3IgbWVhbmluZ2Z1bFxuICAgKiAvLyBsaW5lIG51bWJlcnMgaW4gZXJyb3IgbWVzc2FnZXMgYW5kIGEgc3RhY2sgdHJhY2VcbiAgICogZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4oY3dkLCAnanN0LmpzJyksICdcXFxuICAgKiAgIHZhciBKU1QgPSB7XFxcbiAgICogICAgIFwibWFpblwiOiAnICsgXy50ZW1wbGF0ZShtYWluVGV4dCkuc291cmNlICsgJ1xcXG4gICAqICAgfTtcXFxuICAgKiAnKTtcbiAgICovXG4gIGZ1bmN0aW9uIHRlbXBsYXRlKHRleHQsIGRhdGEsIG9wdGlvbnMpIHtcbiAgICAvLyBiYXNlZCBvbiBKb2huIFJlc2lnJ3MgYHRtcGxgIGltcGxlbWVudGF0aW9uXG4gICAgLy8gaHR0cDovL2Vqb2huLm9yZy9ibG9nL2phdmFzY3JpcHQtbWljcm8tdGVtcGxhdGluZy9cbiAgICAvLyBhbmQgTGF1cmEgRG9rdG9yb3ZhJ3MgZG9ULmpzXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL29sYWRvL2RvVFxuICAgIHZhciBzZXR0aW5ncyA9IGxvZGFzaC50ZW1wbGF0ZVNldHRpbmdzO1xuICAgIHRleHQgfHwgKHRleHQgPSAnJyk7XG5cbiAgICAvLyBhdm9pZCBtaXNzaW5nIGRlcGVuZGVuY2llcyB3aGVuIGBpdGVyYXRvclRlbXBsYXRlYCBpcyBub3QgZGVmaW5lZFxuICAgIG9wdGlvbnMgPSBkZWZhdWx0cyh7fSwgb3B0aW9ucywgc2V0dGluZ3MpO1xuXG4gICAgdmFyIGltcG9ydHMgPSBkZWZhdWx0cyh7fSwgb3B0aW9ucy5pbXBvcnRzLCBzZXR0aW5ncy5pbXBvcnRzKSxcbiAgICAgICAgaW1wb3J0c0tleXMgPSBrZXlzKGltcG9ydHMpLFxuICAgICAgICBpbXBvcnRzVmFsdWVzID0gdmFsdWVzKGltcG9ydHMpO1xuXG4gICAgdmFyIGlzRXZhbHVhdGluZyxcbiAgICAgICAgaW5kZXggPSAwLFxuICAgICAgICBpbnRlcnBvbGF0ZSA9IG9wdGlvbnMuaW50ZXJwb2xhdGUgfHwgcmVOb01hdGNoLFxuICAgICAgICBzb3VyY2UgPSBcIl9fcCArPSAnXCI7XG5cbiAgICAvLyBjb21waWxlIHJlZ2V4cCB0byBtYXRjaCBlYWNoIGRlbGltaXRlclxuICAgIHZhciByZURlbGltaXRlcnMgPSBSZWdFeHAoXG4gICAgICAob3B0aW9ucy5lc2NhcGUgfHwgcmVOb01hdGNoKS5zb3VyY2UgKyAnfCcgK1xuICAgICAgaW50ZXJwb2xhdGUuc291cmNlICsgJ3wnICtcbiAgICAgIChpbnRlcnBvbGF0ZSA9PT0gcmVJbnRlcnBvbGF0ZSA/IHJlRXNUZW1wbGF0ZSA6IHJlTm9NYXRjaCkuc291cmNlICsgJ3wnICtcbiAgICAgIChvcHRpb25zLmV2YWx1YXRlIHx8IHJlTm9NYXRjaCkuc291cmNlICsgJ3wkJ1xuICAgICwgJ2cnKTtcblxuICAgIHRleHQucmVwbGFjZShyZURlbGltaXRlcnMsIGZ1bmN0aW9uKG1hdGNoLCBlc2NhcGVWYWx1ZSwgaW50ZXJwb2xhdGVWYWx1ZSwgZXNUZW1wbGF0ZVZhbHVlLCBldmFsdWF0ZVZhbHVlLCBvZmZzZXQpIHtcbiAgICAgIGludGVycG9sYXRlVmFsdWUgfHwgKGludGVycG9sYXRlVmFsdWUgPSBlc1RlbXBsYXRlVmFsdWUpO1xuXG4gICAgICAvLyBlc2NhcGUgY2hhcmFjdGVycyB0aGF0IGNhbm5vdCBiZSBpbmNsdWRlZCBpbiBzdHJpbmcgbGl0ZXJhbHNcbiAgICAgIHNvdXJjZSArPSB0ZXh0LnNsaWNlKGluZGV4LCBvZmZzZXQpLnJlcGxhY2UocmVVbmVzY2FwZWRTdHJpbmcsIGVzY2FwZVN0cmluZ0NoYXIpO1xuXG4gICAgICAvLyByZXBsYWNlIGRlbGltaXRlcnMgd2l0aCBzbmlwcGV0c1xuICAgICAgaWYgKGVzY2FwZVZhbHVlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicgK1xcbl9fZShcIiArIGVzY2FwZVZhbHVlICsgXCIpICtcXG4nXCI7XG4gICAgICB9XG4gICAgICBpZiAoZXZhbHVhdGVWYWx1ZSkge1xuICAgICAgICBpc0V2YWx1YXRpbmcgPSB0cnVlO1xuICAgICAgICBzb3VyY2UgKz0gXCInO1xcblwiICsgZXZhbHVhdGVWYWx1ZSArIFwiO1xcbl9fcCArPSAnXCI7XG4gICAgICB9XG4gICAgICBpZiAoaW50ZXJwb2xhdGVWYWx1ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInICtcXG4oKF9fdCA9IChcIiArIGludGVycG9sYXRlVmFsdWUgKyBcIikpID09IG51bGwgPyAnJyA6IF9fdCkgK1xcbidcIjtcbiAgICAgIH1cbiAgICAgIGluZGV4ID0gb2Zmc2V0ICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICAvLyB0aGUgSlMgZW5naW5lIGVtYmVkZGVkIGluIEFkb2JlIHByb2R1Y3RzIHJlcXVpcmVzIHJldHVybmluZyB0aGUgYG1hdGNoYFxuICAgICAgLy8gc3RyaW5nIGluIG9yZGVyIHRvIHByb2R1Y2UgdGhlIGNvcnJlY3QgYG9mZnNldGAgdmFsdWVcbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIHNvdXJjZSArPSBcIic7XFxuXCI7XG5cbiAgICAvLyBpZiBgdmFyaWFibGVgIGlzIG5vdCBzcGVjaWZpZWQgYW5kIHRoZSB0ZW1wbGF0ZSBjb250YWlucyBcImV2YWx1YXRlXCJcbiAgICAvLyBkZWxpbWl0ZXJzLCB3cmFwIGEgd2l0aC1zdGF0ZW1lbnQgYXJvdW5kIHRoZSBnZW5lcmF0ZWQgY29kZSB0byBhZGQgdGhlXG4gICAgLy8gZGF0YSBvYmplY3QgdG8gdGhlIHRvcCBvZiB0aGUgc2NvcGUgY2hhaW5cbiAgICB2YXIgdmFyaWFibGUgPSBvcHRpb25zLnZhcmlhYmxlLFxuICAgICAgICBoYXNWYXJpYWJsZSA9IHZhcmlhYmxlO1xuXG4gICAgaWYgKCFoYXNWYXJpYWJsZSkge1xuICAgICAgdmFyaWFibGUgPSAnb2JqJztcbiAgICAgIHNvdXJjZSA9ICd3aXRoICgnICsgdmFyaWFibGUgKyAnKSB7XFxuJyArIHNvdXJjZSArICdcXG59XFxuJztcbiAgICB9XG4gICAgLy8gY2xlYW51cCBjb2RlIGJ5IHN0cmlwcGluZyBlbXB0eSBzdHJpbmdzXG4gICAgc291cmNlID0gKGlzRXZhbHVhdGluZyA/IHNvdXJjZS5yZXBsYWNlKHJlRW1wdHlTdHJpbmdMZWFkaW5nLCAnJykgOiBzb3VyY2UpXG4gICAgICAucmVwbGFjZShyZUVtcHR5U3RyaW5nTWlkZGxlLCAnJDEnKVxuICAgICAgLnJlcGxhY2UocmVFbXB0eVN0cmluZ1RyYWlsaW5nLCAnJDE7Jyk7XG5cbiAgICAvLyBmcmFtZSBjb2RlIGFzIHRoZSBmdW5jdGlvbiBib2R5XG4gICAgc291cmNlID0gJ2Z1bmN0aW9uKCcgKyB2YXJpYWJsZSArICcpIHtcXG4nICtcbiAgICAgIChoYXNWYXJpYWJsZSA/ICcnIDogdmFyaWFibGUgKyAnIHx8ICgnICsgdmFyaWFibGUgKyAnID0ge30pO1xcbicpICtcbiAgICAgIFwidmFyIF9fdCwgX19wID0gJycsIF9fZSA9IF8uZXNjYXBlXCIgK1xuICAgICAgKGlzRXZhbHVhdGluZ1xuICAgICAgICA/ICcsIF9faiA9IEFycmF5LnByb3RvdHlwZS5qb2luO1xcbicgK1xuICAgICAgICAgIFwiZnVuY3Rpb24gcHJpbnQoKSB7IF9fcCArPSBfX2ouY2FsbChhcmd1bWVudHMsICcnKSB9XFxuXCJcbiAgICAgICAgOiAnO1xcbidcbiAgICAgICkgK1xuICAgICAgc291cmNlICtcbiAgICAgICdyZXR1cm4gX19wXFxufSc7XG5cbiAgICAvLyBVc2UgYSBzb3VyY2VVUkwgZm9yIGVhc2llciBkZWJ1Z2dpbmcgYW5kIHdyYXAgaW4gYSBtdWx0aS1saW5lIGNvbW1lbnQgdG9cbiAgICAvLyBhdm9pZCBpc3N1ZXMgd2l0aCBOYXJ3aGFsLCBJRSBjb25kaXRpb25hbCBjb21waWxhdGlvbiwgYW5kIHRoZSBKUyBlbmdpbmVcbiAgICAvLyBlbWJlZGRlZCBpbiBBZG9iZSBwcm9kdWN0cy5cbiAgICAvLyBodHRwOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9kZXZlbG9wZXJ0b29scy9zb3VyY2VtYXBzLyN0b2Mtc291cmNldXJsXG4gICAgdmFyIHNvdXJjZVVSTCA9ICdcXG4vKlxcbi8vQCBzb3VyY2VVUkw9JyArIChvcHRpb25zLnNvdXJjZVVSTCB8fCAnL2xvZGFzaC90ZW1wbGF0ZS9zb3VyY2VbJyArICh0ZW1wbGF0ZUNvdW50ZXIrKykgKyAnXScpICsgJ1xcbiovJztcblxuICAgIHRyeSB7XG4gICAgICB2YXIgcmVzdWx0ID0gRnVuY3Rpb24oaW1wb3J0c0tleXMsICdyZXR1cm4gJyArIHNvdXJjZSArIHNvdXJjZVVSTCkuYXBwbHkodW5kZWZpbmVkLCBpbXBvcnRzVmFsdWVzKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGUuc291cmNlID0gc291cmNlO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gICAgaWYgKGRhdGEpIHtcbiAgICAgIHJldHVybiByZXN1bHQoZGF0YSk7XG4gICAgfVxuICAgIC8vIHByb3ZpZGUgdGhlIGNvbXBpbGVkIGZ1bmN0aW9uJ3Mgc291cmNlIHZpYSBpdHMgYHRvU3RyaW5nYCBtZXRob2QsIGluXG4gICAgLy8gc3VwcG9ydGVkIGVudmlyb25tZW50cywgb3IgdGhlIGBzb3VyY2VgIHByb3BlcnR5IGFzIGEgY29udmVuaWVuY2UgZm9yXG4gICAgLy8gaW5saW5pbmcgY29tcGlsZWQgdGVtcGxhdGVzIGR1cmluZyB0aGUgYnVpbGQgcHJvY2Vzc1xuICAgIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2U7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgYGNhbGxiYWNrYCBmdW5jdGlvbiBgbmAgdGltZXMsIHJldHVybmluZyBhbiBhcnJheSBvZiB0aGUgcmVzdWx0c1xuICAgKiBvZiBlYWNoIGBjYWxsYmFja2AgZXhlY3V0aW9uLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAgICogd2l0aCBvbmUgYXJndW1lbnQ7IChpbmRleCkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IFV0aWxpdGllc1xuICAgKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGV4ZWN1dGUgdGhlIGNhbGxiYWNrLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHRoZSByZXN1bHRzIG9mIGVhY2ggYGNhbGxiYWNrYCBleGVjdXRpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBkaWNlUm9sbHMgPSBfLnRpbWVzKDMsIF8ucGFydGlhbChfLnJhbmRvbSwgMSwgNikpO1xuICAgKiAvLyA9PiBbMywgNiwgNF1cbiAgICpcbiAgICogXy50aW1lcygzLCBmdW5jdGlvbihuKSB7IG1hZ2UuY2FzdFNwZWxsKG4pOyB9KTtcbiAgICogLy8gPT4gY2FsbHMgYG1hZ2UuY2FzdFNwZWxsKG4pYCB0aHJlZSB0aW1lcywgcGFzc2luZyBgbmAgb2YgYDBgLCBgMWAsIGFuZCBgMmAgcmVzcGVjdGl2ZWx5XG4gICAqXG4gICAqIF8udGltZXMoMywgZnVuY3Rpb24obikgeyB0aGlzLmNhc3Qobik7IH0sIG1hZ2UpO1xuICAgKiAvLyA9PiBhbHNvIGNhbGxzIGBtYWdlLmNhc3RTcGVsbChuKWAgdGhyZWUgdGltZXNcbiAgICovXG4gIGZ1bmN0aW9uIHRpbWVzKG4sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgbiA9ICtuIHx8IDA7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9wcG9zaXRlIG9mIGBfLmVzY2FwZWAsIHRoaXMgbWV0aG9kIGNvbnZlcnRzIHRoZSBIVE1MIGVudGl0aWVzXG4gICAqIGAmYW1wO2AsIGAmbHQ7YCwgYCZndDtgLCBgJnF1b3Q7YCwgYW5kIGAmIzM5O2AgaW4gYHN0cmluZ2AgdG8gdGhlaXJcbiAgICogY29ycmVzcG9uZGluZyBjaGFyYWN0ZXJzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIHVuZXNjYXBlLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSB1bmVzY2FwZWQgc3RyaW5nLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnVuZXNjYXBlKCdNb2UsIExhcnJ5ICZhbXA7IEN1cmx5Jyk7XG4gICAqIC8vID0+ICdNb2UsIExhcnJ5ICYgQ3VybHknXG4gICAqL1xuICBmdW5jdGlvbiB1bmVzY2FwZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nID09IG51bGwgPyAnJyA6IChzdHJpbmcgKyAnJykucmVwbGFjZShyZUVzY2FwZWRIdG1sLCB1bmVzY2FwZUh0bWxDaGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSB1bmlxdWUgSUQuIElmIGBwcmVmaXhgIGlzIHBhc3NlZCwgdGhlIElEIHdpbGwgYmUgYXBwZW5kZWQgdG8gaXQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IFV0aWxpdGllc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW3ByZWZpeF0gVGhlIHZhbHVlIHRvIHByZWZpeCB0aGUgSUQgd2l0aC5cbiAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgdW5pcXVlIElELlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnVuaXF1ZUlkKCdjb250YWN0XycpO1xuICAgKiAvLyA9PiAnY29udGFjdF8xMDQnXG4gICAqXG4gICAqIF8udW5pcXVlSWQoKTtcbiAgICogLy8gPT4gJzEwNSdcbiAgICovXG4gIGZ1bmN0aW9uIHVuaXF1ZUlkKHByZWZpeCkge1xuICAgIHZhciBpZCA9ICsraWRDb3VudGVyO1xuICAgIHJldHVybiAocHJlZml4ID09IG51bGwgPyAnJyA6IHByZWZpeCArICcnKSArIGlkO1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIEludm9rZXMgYGludGVyY2VwdG9yYCB3aXRoIHRoZSBgdmFsdWVgIGFzIHRoZSBmaXJzdCBhcmd1bWVudCwgYW5kIHRoZW5cbiAgICogcmV0dXJucyBgdmFsdWVgLiBUaGUgcHVycG9zZSBvZiB0aGlzIG1ldGhvZCBpcyB0byBcInRhcCBpbnRvXCIgYSBtZXRob2QgY2hhaW4sXG4gICAqIGluIG9yZGVyIHRvIHBlcmZvcm0gb3BlcmF0aW9ucyBvbiBpbnRlcm1lZGlhdGUgcmVzdWx0cyB3aXRoaW4gdGhlIGNoYWluLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDaGFpbmluZ1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcGFzcyB0byBgaW50ZXJjZXB0b3JgLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBpbnRlcmNlcHRvciBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgYHZhbHVlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXyhbMSwgMiwgMywgNF0pXG4gICAqICAuZmlsdGVyKGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gbnVtICUgMiA9PSAwOyB9KVxuICAgKiAgLnRhcChhbGVydClcbiAgICogIC5tYXAoZnVuY3Rpb24obnVtKSB7IHJldHVybiBudW0gKiBudW07IH0pXG4gICAqICAudmFsdWUoKTtcbiAgICogLy8gPT4gLy8gWzIsIDRdIChhbGVydGVkKVxuICAgKiAvLyA9PiBbNCwgMTZdXG4gICAqL1xuICBmdW5jdGlvbiB0YXAodmFsdWUsIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3IodmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9kdWNlcyB0aGUgYHRvU3RyaW5nYCByZXN1bHQgb2YgdGhlIHdyYXBwZWQgdmFsdWUuXG4gICAqXG4gICAqIEBuYW1lIHRvU3RyaW5nXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDaGFpbmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcgcmVzdWx0LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfKFsxLCAyLCAzXSkudG9TdHJpbmcoKTtcbiAgICogLy8gPT4gJzEsMiwzJ1xuICAgKi9cbiAgZnVuY3Rpb24gd3JhcHBlclRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9fd3JhcHBlZF9fICsgJyc7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdHMgdGhlIHdyYXBwZWQgdmFsdWUuXG4gICAqXG4gICAqIEBuYW1lIHZhbHVlT2ZcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIHZhbHVlXG4gICAqIEBjYXRlZ29yeSBDaGFpbmluZ1xuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIHdyYXBwZWQgdmFsdWUuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8oWzEsIDIsIDNdKS52YWx1ZU9mKCk7XG4gICAqIC8vID0+IFsxLCAyLCAzXVxuICAgKi9cbiAgZnVuY3Rpb24gd3JhcHBlclZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRoaXMuX193cmFwcGVkX187XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvLyBhZGQgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIHdyYXBwZWQgdmFsdWVzIHdoZW4gY2hhaW5pbmdcbiAgbG9kYXNoLmFmdGVyID0gYWZ0ZXI7XG4gIGxvZGFzaC5hc3NpZ24gPSBhc3NpZ247XG4gIGxvZGFzaC5hdCA9IGF0O1xuICBsb2Rhc2guYmluZCA9IGJpbmQ7XG4gIGxvZGFzaC5iaW5kQWxsID0gYmluZEFsbDtcbiAgbG9kYXNoLmJpbmRLZXkgPSBiaW5kS2V5O1xuICBsb2Rhc2guY29tcGFjdCA9IGNvbXBhY3Q7XG4gIGxvZGFzaC5jb21wb3NlID0gY29tcG9zZTtcbiAgbG9kYXNoLmNvdW50QnkgPSBjb3VudEJ5O1xuICBsb2Rhc2guZGVib3VuY2UgPSBkZWJvdW5jZTtcbiAgbG9kYXNoLmRlZmF1bHRzID0gZGVmYXVsdHM7XG4gIGxvZGFzaC5kZWZlciA9IGRlZmVyO1xuICBsb2Rhc2guZGVsYXkgPSBkZWxheTtcbiAgbG9kYXNoLmRpZmZlcmVuY2UgPSBkaWZmZXJlbmNlO1xuICBsb2Rhc2guZmlsdGVyID0gZmlsdGVyO1xuICBsb2Rhc2guZmxhdHRlbiA9IGZsYXR0ZW47XG4gIGxvZGFzaC5mb3JFYWNoID0gZm9yRWFjaDtcbiAgbG9kYXNoLmZvckluID0gZm9ySW47XG4gIGxvZGFzaC5mb3JPd24gPSBmb3JPd247XG4gIGxvZGFzaC5mdW5jdGlvbnMgPSBmdW5jdGlvbnM7XG4gIGxvZGFzaC5ncm91cEJ5ID0gZ3JvdXBCeTtcbiAgbG9kYXNoLmluaXRpYWwgPSBpbml0aWFsO1xuICBsb2Rhc2guaW50ZXJzZWN0aW9uID0gaW50ZXJzZWN0aW9uO1xuICBsb2Rhc2guaW52ZXJ0ID0gaW52ZXJ0O1xuICBsb2Rhc2guaW52b2tlID0gaW52b2tlO1xuICBsb2Rhc2gua2V5cyA9IGtleXM7XG4gIGxvZGFzaC5tYXAgPSBtYXA7XG4gIGxvZGFzaC5tYXggPSBtYXg7XG4gIGxvZGFzaC5tZW1vaXplID0gbWVtb2l6ZTtcbiAgbG9kYXNoLm1lcmdlID0gbWVyZ2U7XG4gIGxvZGFzaC5taW4gPSBtaW47XG4gIGxvZGFzaC5vYmplY3QgPSBvYmplY3Q7XG4gIGxvZGFzaC5vbWl0ID0gb21pdDtcbiAgbG9kYXNoLm9uY2UgPSBvbmNlO1xuICBsb2Rhc2gucGFpcnMgPSBwYWlycztcbiAgbG9kYXNoLnBhcnRpYWwgPSBwYXJ0aWFsO1xuICBsb2Rhc2gucGFydGlhbFJpZ2h0ID0gcGFydGlhbFJpZ2h0O1xuICBsb2Rhc2gucGljayA9IHBpY2s7XG4gIGxvZGFzaC5wbHVjayA9IHBsdWNrO1xuICBsb2Rhc2gucmFuZ2UgPSByYW5nZTtcbiAgbG9kYXNoLnJlamVjdCA9IHJlamVjdDtcbiAgbG9kYXNoLnJlc3QgPSByZXN0O1xuICBsb2Rhc2guc2h1ZmZsZSA9IHNodWZmbGU7XG4gIGxvZGFzaC5zb3J0QnkgPSBzb3J0Qnk7XG4gIGxvZGFzaC50YXAgPSB0YXA7XG4gIGxvZGFzaC50aHJvdHRsZSA9IHRocm90dGxlO1xuICBsb2Rhc2gudGltZXMgPSB0aW1lcztcbiAgbG9kYXNoLnRvQXJyYXkgPSB0b0FycmF5O1xuICBsb2Rhc2gudW5pb24gPSB1bmlvbjtcbiAgbG9kYXNoLnVuaXEgPSB1bmlxO1xuICBsb2Rhc2gudmFsdWVzID0gdmFsdWVzO1xuICBsb2Rhc2gud2hlcmUgPSB3aGVyZTtcbiAgbG9kYXNoLndpdGhvdXQgPSB3aXRob3V0O1xuICBsb2Rhc2gud3JhcCA9IHdyYXA7XG4gIGxvZGFzaC56aXAgPSB6aXA7XG5cbiAgLy8gYWRkIGFsaWFzZXNcbiAgbG9kYXNoLmNvbGxlY3QgPSBtYXA7XG4gIGxvZGFzaC5kcm9wID0gcmVzdDtcbiAgbG9kYXNoLmVhY2ggPSBmb3JFYWNoO1xuICBsb2Rhc2guZXh0ZW5kID0gYXNzaWduO1xuICBsb2Rhc2gubWV0aG9kcyA9IGZ1bmN0aW9ucztcbiAgbG9kYXNoLnNlbGVjdCA9IGZpbHRlcjtcbiAgbG9kYXNoLnRhaWwgPSByZXN0O1xuICBsb2Rhc2gudW5pcXVlID0gdW5pcTtcblxuICAvLyBhZGQgZnVuY3Rpb25zIHRvIGBsb2Rhc2gucHJvdG90eXBlYFxuICBtaXhpbihsb2Rhc2gpO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8vIGFkZCBmdW5jdGlvbnMgdGhhdCByZXR1cm4gdW53cmFwcGVkIHZhbHVlcyB3aGVuIGNoYWluaW5nXG4gIGxvZGFzaC5jbG9uZSA9IGNsb25lO1xuICBsb2Rhc2guY2xvbmVEZWVwID0gY2xvbmVEZWVwO1xuICBsb2Rhc2guY29udGFpbnMgPSBjb250YWlucztcbiAgbG9kYXNoLmVzY2FwZSA9IGVzY2FwZTtcbiAgbG9kYXNoLmV2ZXJ5ID0gZXZlcnk7XG4gIGxvZGFzaC5maW5kID0gZmluZDtcbiAgbG9kYXNoLmhhcyA9IGhhcztcbiAgbG9kYXNoLmlkZW50aXR5ID0gaWRlbnRpdHk7XG4gIGxvZGFzaC5pbmRleE9mID0gaW5kZXhPZjtcbiAgbG9kYXNoLmlzQXJndW1lbnRzID0gaXNBcmd1bWVudHM7XG4gIGxvZGFzaC5pc0FycmF5ID0gaXNBcnJheTtcbiAgbG9kYXNoLmlzQm9vbGVhbiA9IGlzQm9vbGVhbjtcbiAgbG9kYXNoLmlzRGF0ZSA9IGlzRGF0ZTtcbiAgbG9kYXNoLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbiAgbG9kYXNoLmlzRW1wdHkgPSBpc0VtcHR5O1xuICBsb2Rhc2guaXNFcXVhbCA9IGlzRXF1YWw7XG4gIGxvZGFzaC5pc0Zpbml0ZSA9IGlzRmluaXRlO1xuICBsb2Rhc2guaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG4gIGxvZGFzaC5pc05hTiA9IGlzTmFOO1xuICBsb2Rhc2guaXNOdWxsID0gaXNOdWxsO1xuICBsb2Rhc2guaXNOdW1iZXIgPSBpc051bWJlcjtcbiAgbG9kYXNoLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG4gIGxvZGFzaC5pc1BsYWluT2JqZWN0ID0gaXNQbGFpbk9iamVjdDtcbiAgbG9kYXNoLmlzUmVnRXhwID0gaXNSZWdFeHA7XG4gIGxvZGFzaC5pc1N0cmluZyA9IGlzU3RyaW5nO1xuICBsb2Rhc2guaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcbiAgbG9kYXNoLmxhc3RJbmRleE9mID0gbGFzdEluZGV4T2Y7XG4gIGxvZGFzaC5taXhpbiA9IG1peGluO1xuICBsb2Rhc2gubm9Db25mbGljdCA9IG5vQ29uZmxpY3Q7XG4gIGxvZGFzaC5yYW5kb20gPSByYW5kb207XG4gIGxvZGFzaC5yZWR1Y2UgPSByZWR1Y2U7XG4gIGxvZGFzaC5yZWR1Y2VSaWdodCA9IHJlZHVjZVJpZ2h0O1xuICBsb2Rhc2gucmVzdWx0ID0gcmVzdWx0O1xuICBsb2Rhc2guc2l6ZSA9IHNpemU7XG4gIGxvZGFzaC5zb21lID0gc29tZTtcbiAgbG9kYXNoLnNvcnRlZEluZGV4ID0gc29ydGVkSW5kZXg7XG4gIGxvZGFzaC50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICBsb2Rhc2gudW5lc2NhcGUgPSB1bmVzY2FwZTtcbiAgbG9kYXNoLnVuaXF1ZUlkID0gdW5pcXVlSWQ7XG5cbiAgLy8gYWRkIGFsaWFzZXNcbiAgbG9kYXNoLmFsbCA9IGV2ZXJ5O1xuICBsb2Rhc2guYW55ID0gc29tZTtcbiAgbG9kYXNoLmRldGVjdCA9IGZpbmQ7XG4gIGxvZGFzaC5mb2xkbCA9IHJlZHVjZTtcbiAgbG9kYXNoLmZvbGRyID0gcmVkdWNlUmlnaHQ7XG4gIGxvZGFzaC5pbmNsdWRlID0gY29udGFpbnM7XG4gIGxvZGFzaC5pbmplY3QgPSByZWR1Y2U7XG5cbiAgZm9yT3duKGxvZGFzaCwgZnVuY3Rpb24oZnVuYywgbWV0aG9kTmFtZSkge1xuICAgIGlmICghbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgICAgbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IFt0aGlzLl9fd3JhcHBlZF9fXTtcbiAgICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseShsb2Rhc2gsIGFyZ3MpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8vIGFkZCBmdW5jdGlvbnMgY2FwYWJsZSBvZiByZXR1cm5pbmcgd3JhcHBlZCBhbmQgdW53cmFwcGVkIHZhbHVlcyB3aGVuIGNoYWluaW5nXG4gIGxvZGFzaC5maXJzdCA9IGZpcnN0O1xuICBsb2Rhc2gubGFzdCA9IGxhc3Q7XG5cbiAgLy8gYWRkIGFsaWFzZXNcbiAgbG9kYXNoLnRha2UgPSBmaXJzdDtcbiAgbG9kYXNoLmhlYWQgPSBmaXJzdDtcblxuICBmb3JPd24obG9kYXNoLCBmdW5jdGlvbihmdW5jLCBtZXRob2ROYW1lKSB7XG4gICAgaWYgKCFsb2Rhc2gucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICBsb2Rhc2gucHJvdG90eXBlW21ldGhvZE5hbWVdPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZnVuYyh0aGlzLl9fd3JhcHBlZF9fLCBjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayA9PSBudWxsIHx8ICh0aGlzQXJnICYmIHR5cGVvZiBjYWxsYmFjayAhPSAnZnVuY3Rpb24nKVxuICAgICAgICAgID8gcmVzdWx0XG4gICAgICAgICAgOiBuZXcgbG9kYXNoKHJlc3VsdCk7XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIFRoZSBzZW1hbnRpYyB2ZXJzaW9uIG51bWJlci5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAdHlwZSBTdHJpbmdcbiAgICovXG4gIGxvZGFzaC5WRVJTSU9OID0gJzEuMC4yJztcblxuICAvLyBhZGQgXCJDaGFpbmluZ1wiIGZ1bmN0aW9ucyB0byB0aGUgd3JhcHBlclxuICBsb2Rhc2gucHJvdG90eXBlLnRvU3RyaW5nID0gd3JhcHBlclRvU3RyaW5nO1xuICBsb2Rhc2gucHJvdG90eXBlLnZhbHVlID0gd3JhcHBlclZhbHVlT2Y7XG4gIGxvZGFzaC5wcm90b3R5cGUudmFsdWVPZiA9IHdyYXBwZXJWYWx1ZU9mO1xuXG4gIC8vIGFkZCBgQXJyYXlgIGZ1bmN0aW9ucyB0aGF0IHJldHVybiB1bndyYXBwZWQgdmFsdWVzXG4gIGVhY2goWydqb2luJywgJ3BvcCcsICdzaGlmdCddLCBmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgdmFyIGZ1bmMgPSBhcnJheVJlZlttZXRob2ROYW1lXTtcbiAgICBsb2Rhc2gucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLl9fd3JhcHBlZF9fLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIGFkZCBgQXJyYXlgIGZ1bmN0aW9ucyB0aGF0IHJldHVybiB0aGUgd3JhcHBlZCB2YWx1ZVxuICBlYWNoKFsncHVzaCcsICdyZXZlcnNlJywgJ3NvcnQnLCAndW5zaGlmdCddLCBmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgdmFyIGZ1bmMgPSBhcnJheVJlZlttZXRob2ROYW1lXTtcbiAgICBsb2Rhc2gucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICBmdW5jLmFwcGx5KHRoaXMuX193cmFwcGVkX18sIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICB9KTtcblxuICAvLyBhZGQgYEFycmF5YCBmdW5jdGlvbnMgdGhhdCByZXR1cm4gbmV3IHdyYXBwZWQgdmFsdWVzXG4gIGVhY2goWydjb25jYXQnLCAnc2xpY2UnLCAnc3BsaWNlJ10sIGZ1bmN0aW9uKG1ldGhvZE5hbWUpIHtcbiAgICB2YXIgZnVuYyA9IGFycmF5UmVmW21ldGhvZE5hbWVdO1xuICAgIGxvZGFzaC5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgbG9kYXNoKGZ1bmMuYXBwbHkodGhpcy5fX3dyYXBwZWRfXywgYXJndW1lbnRzKSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gYXZvaWQgYXJyYXktbGlrZSBvYmplY3QgYnVncyB3aXRoIGBBcnJheSNzaGlmdGAgYW5kIGBBcnJheSNzcGxpY2VgXG4gIC8vIGluIEZpcmVmb3ggPCAxMCBhbmQgSUUgPCA5XG4gIGlmIChoYXNPYmplY3RTcGxpY2VCdWcpIHtcbiAgICBlYWNoKFsncG9wJywgJ3NoaWZ0JywgJ3NwbGljZSddLCBmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICB2YXIgZnVuYyA9IGFycmF5UmVmW21ldGhvZE5hbWVdLFxuICAgICAgICAgIGlzU3BsaWNlID0gbWV0aG9kTmFtZSA9PSAnc3BsaWNlJztcblxuICAgICAgbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl9fd3JhcHBlZF9fLFxuICAgICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh2YWx1ZSwgYXJndW1lbnRzKTtcblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGVsZXRlIHZhbHVlWzBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1NwbGljZSA/IG5ldyBsb2Rhc2gocmVzdWx0KSA6IHJlc3VsdDtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvLyBleHBvc2UgTG8tRGFzaFxuICAvLyBzb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnMgbGlrZSB0aGUgZm9sbG93aW5nOlxuICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBFeHBvc2UgTG8tRGFzaCB0byB0aGUgZ2xvYmFsIG9iamVjdCBldmVuIHdoZW4gYW4gQU1EIGxvYWRlciBpcyBwcmVzZW50IGluXG4gICAgLy8gY2FzZSBMby1EYXNoIHdhcyBpbmplY3RlZCBieSBhIHRoaXJkLXBhcnR5IHNjcmlwdCBhbmQgbm90IGludGVuZGVkIHRvIGJlXG4gICAgLy8gbG9hZGVkIGFzIGEgbW9kdWxlLiBUaGUgZ2xvYmFsIGFzc2lnbm1lbnQgY2FuIGJlIHJldmVydGVkIGluIHRoZSBMby1EYXNoXG4gICAgLy8gbW9kdWxlIHZpYSBpdHMgYG5vQ29uZmxpY3QoKWAgbWV0aG9kLlxuICAgIHdpbmRvdy5fID0gbG9kYXNoO1xuXG4gICAgLy8gZGVmaW5lIGFzIGFuIGFub255bW91cyBtb2R1bGUgc28sIHRocm91Z2ggcGF0aCBtYXBwaW5nLCBpdCBjYW4gYmVcbiAgICAvLyByZWZlcmVuY2VkIGFzIHRoZSBcInVuZGVyc2NvcmVcIiBtb2R1bGVcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbG9kYXNoO1xuICAgIH0pO1xuICB9XG4gIC8vIGNoZWNrIGZvciBgZXhwb3J0c2AgYWZ0ZXIgYGRlZmluZWAgaW4gY2FzZSBhIGJ1aWxkIG9wdGltaXplciBhZGRzIGFuIGBleHBvcnRzYCBvYmplY3RcbiAgZWxzZSBpZiAoZnJlZUV4cG9ydHMpIHtcbiAgICAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuICAgIGlmIChmcmVlTW9kdWxlKSB7XG4gICAgICAoZnJlZU1vZHVsZS5leHBvcnRzID0gbG9kYXNoKS5fID0gbG9kYXNoO1xuICAgIH1cbiAgICAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuICAgIGVsc2Uge1xuICAgICAgZnJlZUV4cG9ydHMuXyA9IGxvZGFzaDtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgLy8gaW4gYSBicm93c2VyIG9yIFJoaW5vXG4gICAgd2luZG93Ll8gPSBsb2Rhc2g7XG4gIH1cbn0odGhpcykpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vbG9kYXNoL2Rpc3QvbG9kYXNoLmNvbXBhdC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vd2VicGFjay9idWlsZGluL21vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBuZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MvYnJvd3Nlci5qcycpLm5leHRUaWNrO1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGltbWVkaWF0ZUlkcyA9IHt9O1xudmFyIG5leHRJbW1lZGlhdGVJZCA9IDA7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7IHRpbWVvdXQuY2xvc2UoKTsgfTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBUaGF0J3Mgbm90IGhvdyBub2RlLmpzIGltcGxlbWVudHMgaXQgYnV0IHRoZSBleHBvc2VkIGFwaSBpcyB0aGUgc2FtZS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogZnVuY3Rpb24oZm4pIHtcbiAgdmFyIGlkID0gbmV4dEltbWVkaWF0ZUlkKys7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBmYWxzZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICBpbW1lZGlhdGVJZHNbaWRdID0gdHJ1ZTtcblxuICBuZXh0VGljayhmdW5jdGlvbiBvbk5leHRUaWNrKCkge1xuICAgIGlmIChpbW1lZGlhdGVJZHNbaWRdKSB7XG4gICAgICAvLyBmbi5jYWxsKCkgaXMgZmFzdGVyIHNvIHdlIG9wdGltaXplIGZvciB0aGUgY29tbW9uIHVzZS1jYXNlXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2NhbGwtYXBwbHktc2VndVxuICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbi5jYWxsKG51bGwpO1xuICAgICAgfVxuICAgICAgLy8gUHJldmVudCBpZHMgZnJvbSBsZWFraW5nXG4gICAgICBleHBvcnRzLmNsZWFySW1tZWRpYXRlKGlkKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpZDtcbn07XG5cbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSB0eXBlb2YgY2xlYXJJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IGNsZWFySW1tZWRpYXRlIDogZnVuY3Rpb24oaWQpIHtcbiAgZGVsZXRlIGltbWVkaWF0ZUlkc1tpZF07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogQzovV2ViRGV2L2FuZ3VsYXItZDNwbG90cy9+L3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgIH1cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIEM6L1dlYkRldi9hbmd1bGFyLWQzcGxvdHMvfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9