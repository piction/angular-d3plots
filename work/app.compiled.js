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
	            rightYAxisFormatter: '=?',
	            fontSize: '=?'
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
	            elem.resize(function () { _this.render(); });
	            _this.render();
	        };
	    }
	    D3DualBarChart.prototype.initializeParameters = function (scope) {
	        var heightFontSizeRatio = parseFloat($('span').css('line-height')) / parseFloat($('span').css('font-size'));
	        this.data = scope.data;
	        this.height = parseInt(scope.height) || D3DualBarChart.DEFAULT_SIZE;
	        this.width = parseInt(scope.width) || D3DualBarChart.DEFAULT_SIZE;
	        this.maxBarWidth = parseInt(scope.maxBarWidth) || D3DualBarChart.DEFAULT_MAX_BAR_WIDTH;
	        this.colorOne = scope.colorOne || D3DualBarChart.DEFAULT_COLOR_ONE;
	        this.colorTwo = scope.colorTwo || D3DualBarChart.DEFAULT_COLOR_TWO;
	        this.fontSize = scope.fontSize || 11;
	        heightFontSizeRatio = heightFontSizeRatio || 1.4;
	        this.fontHeight = this.fontSize / heightFontSizeRatio;
	        if (typeof scope.leftYAxisFormatter != 'undefined' && scope.leftYAxisFormatter == "timespan") {
	            this.isValueOneTimeSpan = true;
	        }
	        else {
	            this.leftYAxisFormatter = scope.leftYAxisFormatter || D3DualBarChart.DEFAULT_AXIS_FORMATTER;
	        }
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
	        var steps = Math.floor(calculatedGraphHeight / (2.5 * this.fontHeight));
	        // LEFT AXIS
	        var leftY = d3.scale.linear().range([calculatedGraphHeight, 0]).domain([0, maxValueOne]);
	        var leftYAxis = d3.svg.axis().scale(leftY).orient("left");
	        if (this.isValueOneTimeSpan) {
	            var timeSpan = new TimeSpan(maxValueOne);
	            var timeInterval = timeSpan.getFormater(steps);
	            leftYAxis.tickFormat(timeInterval.formatHandler);
	            leftYAxis.tickValues(d3.range(0, maxValueOne, timeInterval.stepSize));
	        }
	        else {
	            leftYAxis.ticks(steps);
	            leftYAxis.tickFormat(this.leftYAxisFormatter);
	        }
	        // RIGHT AXIS
	        var rightY = d3.scale.linear().range([calculatedGraphHeight, 0]).domain([0, maxValueTwo]);
	        var rightYAxis = d3.svg.axis().scale(rightY).orient("right");
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
	            left: { axis: leftYAxis, y: leftY },
	            right: { axis: rightYAxis, y: rightY }
	        };
	    };
	    // duplicate code of the render function
	    // should be more reuseable
	    D3DualBarChart.prototype.getRotationMeasurements = function (svg) {
	        this.svg.selectAll('*').remove();
	        this.svg.attr('width', this.width).attr('height', this.height);
	        var marginLabelHeight = this.fontHeight + 10;
	        var graphHeight = this.height - D3DualBarChart.MARGIN * 2 - marginLabelHeight;
	        var YAxises = this.GetBothYAxis(graphHeight);
	        var marginContainer = this.svg.append('g').attr('transform', this.translate(D3DualBarChart.MARGIN, D3DualBarChart.MARGIN));
	        var leftYAxisGroup = marginContainer.append('g').call(YAxises.left.axis);
	        var rightYAxisGroup = marginContainer.append('g').call(YAxises.right.axis);
	        var leftAxisWidth = leftYAxisGroup.node().getBBox().width;
	        var rightAxisWidth = rightYAxisGroup.node().getBBox().width;
	        var graphWidth = this.width - D3DualBarChart.MARGIN * 2 - leftAxisWidth - rightAxisWidth;
	        var dualBarWidth = graphWidth / this.data.length;
	        var labelWidth = this.d3UtilitiesService.getMaxWidthOfTexts($.map(this.data, function (d) { return d.label; }), this.fontSize);
	        var rotateLabel = dualBarWidth < labelWidth;
	        return {
	            rotateLabel: rotateLabel,
	            labelWidth: labelWidth,
	            labelHeigth: this.fontHeight,
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
	        var marginLabelHeight = this.fontHeight + 10;
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
	            var height2 = Math.sin(angleRadians) * this.fontHeight;
	            marginLabelHeight = height1 + height2 + 10;
	        }
	        var graphHeight = this.height - D3DualBarChart.MARGIN * 2 - marginLabelHeight;
	        var YAxises = this.GetBothYAxis(graphHeight);
	        var marginContainer = this.svg.append('g').attr('transform', this.translate(D3DualBarChart.MARGIN, D3DualBarChart.MARGIN));
	        var leftYAxisGroup = marginContainer.append('g')
	            .attr('class', 'axis-dualbars')
	            .call(YAxises.left.axis);
	        leftYAxisGroup.selectAll('text')
	            .style('fill', this.colorOne)
	            .style('font-size', this.fontSize);
	        var rightYAxisGroup = marginContainer.append('g')
	            .attr('class', 'axis-dualbars')
	            .call(YAxises.right.axis);
	        rightYAxisGroup.selectAll('text')
	            .style('fill', this.colorTwo)
	            .style('font-size', this.fontSize);
	        var leftAxisWidth = leftYAxisGroup.node().getBBox().width;
	        var rightAxisWidth = rightYAxisGroup.node().getBBox().width;
	        var graphWidth = this.width - D3DualBarChart.MARGIN * 2 - leftAxisWidth - rightAxisWidth;
	        var dualBarWidth = graphWidth / this.data.length;
	        var labelWidth = this.d3UtilitiesService.getMaxWidthOfTexts($.map(this.data, function (d) { return d.label; }), this.fontSize);
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
	            .style("font-size", this.fontSize)
	            .attr("transform", function () {
	            return rotationMeasurements.rotateLabel ? 'rotate(' + rotation + ')' : '';
	        });
	    };
	    D3DualBarChart.prototype.translate = function (horizontal, vertical) {
	        return "translate(" + horizontal + ", " + vertical + ")";
	    };
	    D3DualBarChart.DEFAULT_SIZE = 500;
	    D3DualBarChart.DEFAULT_MAX_BAR_WIDTH = 50;
	    D3DualBarChart.DEFAULT_COLOR_ONE = "#fdb81e";
	    D3DualBarChart.DEFAULT_COLOR_TWO = "#486983";
	    D3DualBarChart.DEFAULT_AXIS_FORMATTER = function (value) { return value; };
	    D3DualBarChart.Y_AXIS_MARGIN = 40;
	    D3DualBarChart.MARGIN = 15;
	    D3DualBarChart.LABEL_ROTATION_ANGLE = 40;
	    D3DualBarChart.MINIMUM_BAR_SPACING = 2;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzk3MTQ0NjczMWQ3YmI0NjVlYzEiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2UvdGltZVNwYW4udHMiLCJ3ZWJwYWNrOi8vLy4vYXBwL0QzL2QzRHVhbEJhckNoYXJ0L2QzRHVhbEJhckNoYXJ0LnRzIiwid2VicGFjazovLy8uL34vbG9kYXNoL2Rpc3QvbG9kYXNoLmNvbXBhdC5qcyIsIndlYnBhY2s6Ly8vLi9+L3dlYnBhY2svYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vL0M6L1dlYkRldi9hbmd1bGFyLWQzcGxvdHMvfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy9DOi9XZWJEZXYvYW5ndWxhci1kM3Bsb3RzL34vcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDcENBO0tBQ0ksa0JBQW9CLGlCQUF3QjtTQUF4QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQU87S0FBRSxDQUFDO0tBRXhDLDhCQUFXLEdBQWxCLFVBQW1CLFFBQVE7U0FBM0IsaUJBTUM7U0FMRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDLE1BQU0sQ0FBQzthQUNILGFBQWEsRUFBRyxVQUFDLFFBQVEsSUFBSyxNQUFNLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUM7YUFDL0UsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO1VBQ3pCO0tB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7Ozs7QUMvaEtEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxpQkFBaUI7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7OztBQzNFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNEJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixVQUFVIiwiZmlsZSI6IjM5NzE0NDY3MzFkN2JiNDY1ZWMxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzOTcxNDQ2NzMxZDdiYjQ2NWVjMVxuICoqLyIsIlxyXG5cclxuZXhwb3J0IGNsYXNzIFRpbWVTcGFuIHtcclxuICAgIGNvbnN0cnVjdG9yIChwdWJsaWMgdGltZVNwYW5JblNlY29uZHM6bnVtYmVyKXt9XHJcblxyXG4gICAgcHVibGljIGdldEZvcm1hdGVyKG1heFN0ZXBzKTphbnkge1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLmZpbmRUaW1lU3RlcChtYXhTdGVwcyk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZm9ybWF0SGFuZGxlciA6ICh0aW1lU3Bhbik9PiB7cmV0dXJuIHRoaXMudG9TdHJpbmcodGltZVNwYW4gLCByZXMucmVzb2x1dGlvbikgfSxcclxuICAgICAgICAgICAgc3RlcFNpemUgOnJlcy5zdGVwU2l6ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBmaW5kVGltZVN0ZXAobWF4U3RlcHMpOmFueSB7XHJcbiAgICAgICAgdmFyIHZhbGlkU3RlcHMgPSB7fTtcclxuICAgICAgICAgdmFsaWRTdGVwc1s2MF09XCJzZWNvbmRzXCI7ICAgICAgICAgXHQvLyBtaW51dGVcclxuICAgICAgICAgdmFsaWRTdGVwc1s1KjYwXT1cIm1pbnV0ZXNcIjsgICAgICAgXHQvLyA1IG1pbnV0ZXNcclxuICAgICAgICAgdmFsaWRTdGVwc1sxMCo2MF09XCJtaW51dGVzXCI7ICAgICBcdC8vIDEwIG1pbnV0ZXNcclxuICAgICAgICAgdmFsaWRTdGVwc1sxNSo2MF09XCJtaW51dGVzXCI7ICAgICAgXHQvLyAxNSBtaW51dGVzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMzAqNjBdPVwibWludXRlc1wiOyAgICAgXHQvLyBoYWxmIGFuIGhvdXJcclxuICAgICAgICAgdmFsaWRTdGVwc1s2MCo2MF09XCJob3Vyc1wiOyAgICAgIFx0Ly8gaG91clxyXG4gICAgICAgICB2YWxpZFN0ZXBzWzIqNjAqNjBdPVwiaG91cnNcIjsgICAgXHQvLyAyIGhvdXJzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbOCo2MCo2MF09XCJob3Vyc1wiOyAgICBcdC8vIDggaG91cnNcclxuICAgICAgICAgdmFsaWRTdGVwc1sxMio2MCo2MF09XCJob3Vyc1wiOyAgIFx0Ly8gMTIgaG91cnNcclxuICAgICAgICAgdmFsaWRTdGVwc1syNCo2MCo2MF09XCJkYXlzXCI7ICAgXHQvLyAxIGRheVxyXG4gICAgICAgICB2YWxpZFN0ZXBzWzIqMjQqNjAqNjBdPVwiZGF5c1wiOyBcdC8vIDIgZGF5c1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzcqMjQqMjQqNjBdPVwiZGF5c1wiOyBcdC8vIDEgd2Vla1xyXG5cclxuICAgICAgICB2YXIgaW50ZXJ2YWw6YW55ID0gdGhpcy50aW1lU3BhbkluU2Vjb25kcyAvIChtYXhTdGVwcysxKTtcclxuICAgICAgICB2YXIgcmVzb2x1dGlvbiA9IFwiZGF5c1wiO1xyXG4gICAgICAgIHZhciBzdGVwU2l6ZSA9IGludGVydmFsO1xyXG4gICAgICAgIGZvciAodmFyIHMgaW4gdmFsaWRTdGVwcykge1xyXG4gICAgICAgICAgICBpZiggaW50ZXJ2YWwgPCAgcyApIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdXRpb24gPSB2YWxpZFN0ZXBzW3NdO1xyXG4gICAgICAgICAgICAgICAgc3RlcFNpemUgPSBzO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICB7XHJcbiAgICAgICAgICAgIHJlc29sdXRpb24gOiByZXNvbHV0aW9uLFxyXG4gICAgICAgICAgICBzdGVwU2l6ZSA6IHN0ZXBTaXplXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b1N0cmluZyhpbnB1dEluU2Vjb25kcyAsIHJlc29sdXRpb24pIHtcclxuICAgICAgICAgICAgcmVzb2x1dGlvbiA9IHJlc29sdXRpb24gfHwgXCJzZWNvbmRzXCI7XHJcbiAgICAgICAgICAgIHZhciByZXNEZXB0aCA9IDA7XHJcbiAgICAgICAgICAgIC8vIC0tLSBtYXAgcmVzb2x1dGlvbiB0byBudW1iZXJcclxuICAgICAgICAgICAgc3dpdGNoIChyZXNvbHV0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwid2Vla3NcIjogICAgICAgICAgIHJlc0RlcHRoID0yOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJkYXlzXCI6ICAgICAgICAgICAgcmVzRGVwdGggPTM7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImhvdXJzXCI6ICAgICAgICAgICByZXNEZXB0aCA9NDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibWludXRlc1wiOiAgICAgICAgIHJlc0RlcHRoID01OyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzZWNvbmRzXCI6ICAgICAgICAgcmVzRGVwdGggPTY7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1pbGxpc2Vjb25kc1wiOiAgICByZXNEZXB0aCA9NzsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICByZXNEZXB0aCA9NjsgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gLS0tIENhbGN1bGF0ZSBzZWNvbmRzL21pbnV0ZXMvaG91cnMvZGF5cy93ZWVrcy8uLi5cclxuICAgICAgICAgICAgdmFyIG1zZWMgPSBNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzKjEwMDAgLSBNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzKSAqIDEwMDApO1xyXG4gICAgICAgICAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAlIDYwKTtcclxuICAgICAgICAgICAgdmFyIG1pbiA9IChNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzIC8gNjApKSAlIDYwO1xyXG4gICAgICAgICAgICB2YXIgaG91cnMgPSAoTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAvIDM2MDApKSAlIDI0O1xyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgLyAoMjQgKiAzNjAwKSk7XHJcbiAgICAgICAgICAgIHZhciB3ZWVrcyA9IDA7XHJcbiAgICAgICAgICAgIGlmIChkYXlzID4gNyApIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXlzID09PSA3IHx8IGRheXMgPT09IDE0IHx8IGRheXMgPT09IDI4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Vla3MgPSAoTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAvICg3ICogMjQgKiAzNjAwKSkpICUgNztcclxuICAgICAgICAgICAgICAgICAgICBkYXlzID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAtLS0gQnVpbGQgcmV0dXJuIHN0cmluZ1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gXCJcIjtcclxuICAgICAgICAgICAgcmVzICs9ICh3ZWVrcyA8PSAxKSA/IFwiXCIgOiAod2Vla3M9PTEgKSA/IFwid2VlayBcIiA6IFwid2Vla3MgXCJcclxuICAgICAgICAgICAgaWYoIHJlc0RlcHRoID4gMikge1xyXG4gICAgICAgICAgICAgICAgcmVzICs9IChkYXlzIDw9IDEpID8gXCJcIiA6IChkYXlzPT0xICkgPyBcImRheSBcIiA6IFwiZGF5cyBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChob3VycyB8fCBtaW4gfHwgc2VjICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRheXMgPiAwICYmIHJlc0RlcHRoID4gMylcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gXCIsIFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhvdXJzICYmICFtaW4gJiYgIXNlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSAocmVzRGVwdGggPiAzKSA/IGhvdXJzICsgXCJoIFwiIDpcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaG91cnMgJiYgbWluICYmICFzZWMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gKHJlc0RlcHRoID4gNCkgPyBtaW4gKyBcIm1pbiBcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFob3VycyAmJiAhbWluICYmIHNlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSAocmVzRGVwdGggPiA1KSA/IHNlYyArIFwicyBcIiAgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0ocmVzRGVwdGggPiAzICYmIGhvdXJzID4gMCkgPyAgaG91cnMgKyBcImggXCIgOlwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9KHJlc0RlcHRoID4gNCAmJiAobWluID4gMCB8fCBob3VycyA+IDApKSA/IG1pbiArIFwibSBcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9KHJlc0RlcHRoID4gNSAmJiAoc2VjID4gMCB8fCBtaW4gPiAwIHx8IGhvdXJzID4gMCkpID8gc2VjICsgXCJzIFwiOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPShyZXNEZXB0aCA+IDYgJiYgKG1zZWMgPiAwIHx8IHNlYyA+IDAgfHwgbWluID4gMCB8fCBob3VycyA+IDApKSA/IG1zZWMgKyBcIm1zXCI6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcblxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvc2VydmljZS90aW1lU3Bhbi50c1xuICoqLyIsImltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gJ2QzJztcclxuaW1wb3J0ICogYXMgbmcgZnJvbSAnYW5ndWxhcic7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuLy9pbXBvcnQge1RpbWVTcGFufSBmcm9tICcuLi8uLi9zZXJ2aWNlL3RpbWVTcGFuJztcclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lU3BhbiB7XHJcbiAgICBjb25zdHJ1Y3RvciAocHVibGljIHRpbWVTcGFuSW5TZWNvbmRzOm51bWJlcil7fVxyXG5cclxuICAgIHB1YmxpYyBnZXRGb3JtYXRlcihtYXhTdGVwcyk6YW55IHtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5maW5kVGltZVN0ZXAobWF4U3RlcHMpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZvcm1hdEhhbmRsZXIgOiAodGltZVNwYW4pPT4ge3JldHVybiB0aGlzLnRvU3RyaW5nKHRpbWVTcGFuICwgcmVzLnJlc29sdXRpb24pIH0sXHJcbiAgICAgICAgICAgIHN0ZXBTaXplIDpyZXMuc3RlcFNpemVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZmluZFRpbWVTdGVwKG1heFN0ZXBzKTphbnkge1xyXG4gICAgICAgIHZhciB2YWxpZFN0ZXBzID0ge307XHJcbiAgICAgICAgIHZhbGlkU3RlcHNbNjBdPVwic2Vjb25kc1wiOyAgICAgICAgIFx0Ly8gbWludXRlXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbNSo2MF09XCJtaW51dGVzXCI7ICAgICAgIFx0Ly8gNSBtaW51dGVzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMTAqNjBdPVwibWludXRlc1wiOyAgICAgXHQvLyAxMCBtaW51dGVzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMTUqNjBdPVwibWludXRlc1wiOyAgICAgIFx0Ly8gMTUgbWludXRlc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzMwKjYwXT1cIm1pbnV0ZXNcIjsgICAgIFx0Ly8gaGFsZiBhbiBob3VyXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbNjAqNjBdPVwiaG91cnNcIjsgICAgICBcdC8vIGhvdXJcclxuICAgICAgICAgdmFsaWRTdGVwc1syKjYwKjYwXT1cImhvdXJzXCI7ICAgIFx0Ly8gMiBob3Vyc1xyXG4gICAgICAgICB2YWxpZFN0ZXBzWzgqNjAqNjBdPVwiaG91cnNcIjsgICAgXHQvLyA4IGhvdXJzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMTIqNjAqNjBdPVwiaG91cnNcIjsgICBcdC8vIDEyIGhvdXJzXHJcbiAgICAgICAgIHZhbGlkU3RlcHNbMjQqNjAqNjBdPVwiZGF5c1wiOyAgIFx0Ly8gMSBkYXlcclxuICAgICAgICAgdmFsaWRTdGVwc1syKjI0KjYwKjYwXT1cImRheXNcIjsgXHQvLyAyIGRheXNcclxuICAgICAgICAgdmFsaWRTdGVwc1s3KjI0KjI0KjYwXT1cImRheXNcIjsgXHQvLyAxIHdlZWtcclxuXHJcbiAgICAgICAgdmFyIGludGVydmFsOmFueSA9IHRoaXMudGltZVNwYW5JblNlY29uZHMgLyAobWF4U3RlcHMrMSk7XHJcbiAgICAgICAgdmFyIHJlc29sdXRpb24gPSBcImRheXNcIjtcclxuICAgICAgICB2YXIgc3RlcFNpemUgPSBpbnRlcnZhbDtcclxuICAgICAgICBmb3IgKHZhciBzIGluIHZhbGlkU3RlcHMpIHtcclxuICAgICAgICAgICAgaWYoIGludGVydmFsIDwgIHMgKSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHV0aW9uID0gdmFsaWRTdGVwc1tzXTtcclxuICAgICAgICAgICAgICAgIHN0ZXBTaXplID0gcztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAge1xyXG4gICAgICAgICAgICByZXNvbHV0aW9uIDogcmVzb2x1dGlvbixcclxuICAgICAgICAgICAgc3RlcFNpemUgOiBzdGVwU2l6ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoaW5wdXRJblNlY29uZHMgLCByZXNvbHV0aW9uKTpzdHJpbmcge1xyXG4gICAgICAgICAgICByZXNvbHV0aW9uID0gcmVzb2x1dGlvbiB8fCBcInNlY29uZHNcIjtcclxuICAgICAgICAgICAgaWYoaW5wdXRJblNlY29uZHM8PTApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIwXCI7XHJcbiAgICAgICAgICAgIHZhciByZXNEZXB0aCA9IDA7XHJcbiAgICAgICAgICAgIC8vIC0tLSBtYXAgcmVzb2x1dGlvbiB0byBudW1iZXJcclxuICAgICAgICAgICAgc3dpdGNoIChyZXNvbHV0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwid2Vla3NcIjogICAgICAgICAgIHJlc0RlcHRoID0yOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJkYXlzXCI6ICAgICAgICAgICAgcmVzRGVwdGggPTM7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImhvdXJzXCI6ICAgICAgICAgICByZXNEZXB0aCA9NDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibWludXRlc1wiOiAgICAgICAgIHJlc0RlcHRoID01OyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzZWNvbmRzXCI6ICAgICAgICAgcmVzRGVwdGggPTY7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm1pbGxpc2Vjb25kc1wiOiAgICByZXNEZXB0aCA9NzsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAgICAgICAgICAgICAgICByZXNEZXB0aCA9NjsgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gLS0tIENhbGN1bGF0ZSBzZWNvbmRzL21pbnV0ZXMvaG91cnMvZGF5cy93ZWVrcy8uLi5cclxuICAgICAgICAgICAgdmFyIG1zZWMgPSBNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzKjEwMDAgLSBNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzKSAqIDEwMDApO1xyXG4gICAgICAgICAgICB2YXIgc2VjID0gTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAlIDYwKTtcclxuICAgICAgICAgICAgdmFyIG1pbiA9IChNYXRoLmZsb29yKGlucHV0SW5TZWNvbmRzIC8gNjApKSAlIDYwO1xyXG4gICAgICAgICAgICB2YXIgaG91cnMgPSAoTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAvIDM2MDApKSAlIDI0O1xyXG4gICAgICAgICAgICB2YXIgZGF5cyA9IE1hdGguZmxvb3IoaW5wdXRJblNlY29uZHMgLyAoMjQgKiAzNjAwKSk7XHJcbiAgICAgICAgICAgIHZhciB3ZWVrcyA9IDA7XHJcbiAgICAgICAgICAgIGlmIChkYXlzID4gNyApIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXlzID09PSA3IHx8IGRheXMgPT09IDE0IHx8IGRheXMgPT09IDI4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Vla3MgPSAoTWF0aC5mbG9vcihpbnB1dEluU2Vjb25kcyAvICg3ICogMjQgKiAzNjAwKSkpICUgNztcclxuICAgICAgICAgICAgICAgICAgICBkYXlzID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyAtLS0gQnVpbGQgcmV0dXJuIHN0cmluZ1xyXG4gICAgICAgICAgICB2YXIgcmVzID0gXCJcIjtcclxuICAgICAgICAgICAgcmVzICs9ICh3ZWVrcyA8PSAxKSA/IFwiXCIgOiAod2Vla3M9PTEgKSA/IFwid2VlayBcIiA6IFwid2Vla3MgXCJcclxuICAgICAgICAgICAgaWYoIHJlc0RlcHRoID4gMikge1xyXG4gICAgICAgICAgICAgICAgcmVzICs9IChkYXlzIDw9IDEpID8gXCJcIiA6IChkYXlzPT0xICkgPyBcImRheSBcIiA6IFwiZGF5cyBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChob3VycyB8fCBtaW4gfHwgc2VjICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRheXMgPiAwICYmIHJlc0RlcHRoID4gMylcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gXCIsIFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhvdXJzICYmICFtaW4gJiYgIXNlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSAocmVzRGVwdGggPiAzKSA/IGhvdXJzICsgXCJoIFwiIDpcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghaG91cnMgJiYgbWluICYmICFzZWMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0gKHJlc0RlcHRoID4gNCkgPyBtaW4gKyBcIm1pbiBcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFob3VycyAmJiAhbWluICYmIHNlYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSAocmVzRGVwdGggPiA1KSA/IHNlYyArIFwicyBcIiAgOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXMgKz0ocmVzRGVwdGggPiAzICYmIGhvdXJzID4gMCkgPyAgaG91cnMgKyBcImggXCIgOlwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9KHJlc0RlcHRoID4gNCAmJiAobWluID4gMCB8fCBob3VycyA+IDApKSA/IG1pbiArIFwibSBcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzICs9KHJlc0RlcHRoID4gNSAmJiAoc2VjID4gMCB8fCBtaW4gPiAwIHx8IGhvdXJzID4gMCkpID8gc2VjICsgXCJzIFwiOiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyArPShyZXNEZXB0aCA+IDYgJiYgKG1zZWMgPiAwIHx8IHNlYyA+IDAgfHwgbWluID4gMCB8fCBob3VycyA+IDApKSA/IG1zZWMgKyBcIm1zXCI6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9XHJcblxyXG59XHJcblxyXG5cclxuaW50ZXJmYWNlIElEM0R1YWxCYXJDaGFydEVudHJ5IHtcclxuICAgIHZhbHVlT25lOiBudW1iZXI7XHJcbiAgICB2YWx1ZVR3bzogbnVtYmVyO1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIElEM0R1YWxCYXJDaGFydFNjb3BlIGV4dGVuZHMgbmcuSVNjb3BlIHtcclxuICAgIGRhdGE6IElEM0R1YWxCYXJDaGFydEVudHJ5W107XHJcbiAgICBoZWlnaHQ/OiBzdHJpbmc7XHJcbiAgICB3aWR0aD86IHN0cmluZztcclxuICAgIG1heEJhcldpZHRoPzogc3RyaW5nO1xyXG4gICAgY29sb3JPbmU/OiBzdHJpbmc7XHJcbiAgICBjb2xvclR3bz86IHN0cmluZztcclxuICAgIGxlZnRZQXhpc0Zvcm1hdHRlcjogYW55O1xyXG4gICAgcmlnaHRZQXhpc0Zvcm1hdHRlcjogYW55O1xyXG4gICAgZm9udFNpemU/Om51bWJlcjtcclxufVxyXG5cclxuY2xhc3MgRDNEdWFsQmFyQ2hhcnQge1xyXG4gICAgcHVibGljIHJlc3RyaWN0ID0gJ0UnO1xyXG4gICAgcHVibGljIHNjb3BlOiBhbnkgPSB7XHJcbiAgICAgICAgZGF0YTogJz0nLFxyXG4gICAgICAgIGhlaWdodDogJz0/JyxcclxuICAgICAgICB3aWR0aDogJz0/JyxcclxuICAgICAgICBtYXhCYXJXaWR0aDogJ0A/JyxcclxuICAgICAgICBjb2xvck9uZTogJ0A/JyxcclxuICAgICAgICBjb2xvclR3bzogJ0A/JyxcclxuICAgICAgICBsZWZ0WUF4aXNGb3JtYXR0ZXI6ICc9PycsXHJcbiAgICAgICAgcmlnaHRZQXhpc0Zvcm1hdHRlcjogJz0/JyxcclxuICAgICAgICBmb250U2l6ZTonPT8nXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfU0laRTogbnVtYmVyID0gNTAwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgREVGQVVMVF9NQVhfQkFSX1dJRFRIOiBudW1iZXIgPSA1MDtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfQ09MT1JfT05FOiBzdHJpbmcgPSBcIiNmZGI4MWVcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfQ09MT1JfVFdPOiBzdHJpbmcgPSBcIiM0ODY5ODNcIjtcclxuICAgIHByaXZhdGUgc3RhdGljIERFRkFVTFRfQVhJU19GT1JNQVRURVI6ICh2YWx1ZTogYW55KSA9PiBzdHJpbmcgPSAodmFsdWUpID0+IHZhbHVlO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIHN0YXRpYyBZX0FYSVNfTUFSR0lOOiBudW1iZXIgPSA0MDtcclxuICAgIHByaXZhdGUgc3RhdGljIE1BUkdJTjogbnVtYmVyID0gMTU7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBMQUJFTF9ST1RBVElPTl9BTkdMRTogbnVtYmVyID0gNDA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBNSU5JTVVNX0JBUl9TUEFDSU5HOiBudW1iZXIgPSAyO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGRhdGE6IElEM0R1YWxCYXJDaGFydEVudHJ5W107XHJcbiAgICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmb250U2l6ZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBmb250SGVpZ2h0Om51bWJlcjtcclxuICAgIHByaXZhdGUgbWF4QmFyV2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgY29sb3JPbmU6IHN0cmluZztcclxuICAgIHByaXZhdGUgY29sb3JUd286IHN0cmluZztcclxuICAgIHByaXZhdGUgbGVmdFlBeGlzRm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByaWdodFlBeGlzRm9ybWF0dGVyOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBpc1ZhbHVlT25lVGltZVNwYW49ZmFsc2U7XHJcbiAgICBwcml2YXRlIGlzVmFsdWVUd29UaW1lU3Bhbj1mYWxzZTtcclxuICAgIHByaXZhdGUgc3ZnOiBkMy5TZWxlY3Rpb248YW55PjtcclxuXHJcbiAgICBwdWJsaWMgbGluazogKHNjb3BlOiBJRDNEdWFsQmFyQ2hhcnRTY29wZSwgZWxlbTogbmcuSUF1Z21lbnRlZEpRdWVyeSwgYXR0cnMpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkM1V0aWxpdGllc1NlcnZpY2U6IGFueSkgeyBcclxuICAgICAgICB0aGlzLmxpbmsgPSAoc2NvcGU6IElEM0R1YWxCYXJDaGFydFNjb3BlLCBlbGVtOiBuZy5JQXVnbWVudGVkSlF1ZXJ5LCBhdHRycykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN2ZyA9IGQzLnNlbGVjdChlbGVtWzBdKS5hcHBlbmQoJ3N2ZycpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUGFyYW1ldGVycyhzY29wZSk7XHJcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaEdyb3VwKFsnaGVpZ2h0JywgJ3dpZHRoJywgJ2RhdGEnXSwgKG5ld1ZhbHVlLCBvbGRWYWx1ZSwgcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplUGFyYW1ldGVycyhzY29wZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZWxlbS5yZXNpemUoKCkgPT4ge3RoaXMucmVuZGVyKCk7fSlcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdGlhbGl6ZVBhcmFtZXRlcnMoc2NvcGU6IElEM0R1YWxCYXJDaGFydFNjb3BlKSB7XHJcblxyXG4gICAgICAgIHZhciBoZWlnaHRGb250U2l6ZVJhdGlvID0gcGFyc2VGbG9hdCgkKCdzcGFuJykuY3NzKCdsaW5lLWhlaWdodCcpKSAvIHBhcnNlRmxvYXQoJCgnc3BhbicpLmNzcygnZm9udC1zaXplJykpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IHNjb3BlLmRhdGE7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBwYXJzZUludChzY29wZS5oZWlnaHQpIHx8IEQzRHVhbEJhckNoYXJ0LkRFRkFVTFRfU0laRTtcclxuICAgICAgICB0aGlzLndpZHRoID0gcGFyc2VJbnQoc2NvcGUud2lkdGgpIHx8IEQzRHVhbEJhckNoYXJ0LkRFRkFVTFRfU0laRTtcclxuICAgICAgICB0aGlzLm1heEJhcldpZHRoID0gcGFyc2VJbnQoc2NvcGUubWF4QmFyV2lkdGgpIHx8IEQzRHVhbEJhckNoYXJ0LkRFRkFVTFRfTUFYX0JBUl9XSURUSDtcclxuICAgICAgICB0aGlzLmNvbG9yT25lID0gc2NvcGUuY29sb3JPbmUgfHwgRDNEdWFsQmFyQ2hhcnQuREVGQVVMVF9DT0xPUl9PTkU7XHJcbiAgICAgICAgdGhpcy5jb2xvclR3byA9IHNjb3BlLmNvbG9yVHdvIHx8IEQzRHVhbEJhckNoYXJ0LkRFRkFVTFRfQ09MT1JfVFdPO1xyXG4gICAgICAgIHRoaXMuZm9udFNpemUgPSAgc2NvcGUuZm9udFNpemUgfHwgMTE7XHJcbiAgICAgICAgaGVpZ2h0Rm9udFNpemVSYXRpbyA9IGhlaWdodEZvbnRTaXplUmF0aW8gfHwgMS40O1xyXG4gICAgICAgIHRoaXMuZm9udEhlaWdodCA9IHRoaXMuZm9udFNpemUgLyBoZWlnaHRGb250U2l6ZVJhdGlvO1xyXG4gICAgICAgIGlmKCB0eXBlb2Ygc2NvcGUubGVmdFlBeGlzRm9ybWF0dGVyICE9ICd1bmRlZmluZWQnICYmIHNjb3BlLmxlZnRZQXhpc0Zvcm1hdHRlcj09XCJ0aW1lc3BhblwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNWYWx1ZU9uZVRpbWVTcGFuID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgdGhpcy5sZWZ0WUF4aXNGb3JtYXR0ZXIgPSBzY29wZS5sZWZ0WUF4aXNGb3JtYXR0ZXIgfHwgRDNEdWFsQmFyQ2hhcnQuREVGQVVMVF9BWElTX0ZPUk1BVFRFUjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIHR5cGVvZiBzY29wZS5yaWdodFlBeGlzRm9ybWF0dGVyICE9ICd1bmRlZmluZWQnICYmIHNjb3BlLnJpZ2h0WUF4aXNGb3JtYXR0ZXI9PVwidGltZXNwYW5cIikge1xyXG4gICAgICAgICAgICB0aGlzLmlzVmFsdWVUd29UaW1lU3BhbiA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgIHRoaXMucmlnaHRZQXhpc0Zvcm1hdHRlciA9IHNjb3BlLnJpZ2h0WUF4aXNGb3JtYXR0ZXIgfHwgRDNEdWFsQmFyQ2hhcnQuREVGQVVMVF9BWElTX0ZPUk1BVFRFUjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIEdldEJvdGhZQXhpcyhjYWxjdWxhdGVkR3JhcGhIZWlnaHQpIHtcclxuXHJcbiAgICAgICAgdmFyIG1heFZhbHVlT25lID0gXy5tYXgodGhpcy5kYXRhLCB2ID0+IHYudmFsdWVPbmUpLnZhbHVlT25lO1xyXG4gICAgICAgIHZhciBtYXhWYWx1ZVR3byA9IF8ubWF4KHRoaXMuZGF0YSwgdiA9PiB2LnZhbHVlVHdvKS52YWx1ZVR3bztcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3RlcHMgPSBNYXRoLmZsb29yKGNhbGN1bGF0ZWRHcmFwaEhlaWdodCAvICgyLjUgKiB0aGlzLmZvbnRIZWlnaHQpKTtcclxuICAgIFxyXG4gICAgLy8gTEVGVCBBWElTXHJcbiAgICAgICAgdmFyIGxlZnRZID0gZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoW2NhbGN1bGF0ZWRHcmFwaEhlaWdodCwgMF0pLmRvbWFpbihbMCwgbWF4VmFsdWVPbmVdKTtcclxuICAgICAgICB2YXIgbGVmdFlBeGlzID0gZDMuc3ZnLmF4aXMoKS5zY2FsZShsZWZ0WSkub3JpZW50KFwibGVmdFwiKTtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLmlzVmFsdWVPbmVUaW1lU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVTcGFuID0gbmV3IFRpbWVTcGFuKG1heFZhbHVlT25lKTtcclxuICAgICAgICAgICAgICAgIGxldCB0aW1lSW50ZXJ2YWwgID0gdGltZVNwYW4uZ2V0Rm9ybWF0ZXIoc3RlcHMpO1xyXG4gICAgICAgICAgICAgICAgbGVmdFlBeGlzLnRpY2tGb3JtYXQodGltZUludGVydmFsLmZvcm1hdEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgbGVmdFlBeGlzLnRpY2tWYWx1ZXMoZDMucmFuZ2UoMCxtYXhWYWx1ZU9uZSwgdGltZUludGVydmFsLnN0ZXBTaXplKSk7XHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgICAgICBsZWZ0WUF4aXMudGlja3Moc3RlcHMpXHJcbiAgICAgICAgICAgIGxlZnRZQXhpcy50aWNrRm9ybWF0KCB0aGlzLmxlZnRZQXhpc0Zvcm1hdHRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgLy8gUklHSFQgQVhJU1xyXG4gICAgICAgdmFyIHJpZ2h0WSA9IGQzLnNjYWxlLmxpbmVhcigpLnJhbmdlKFtjYWxjdWxhdGVkR3JhcGhIZWlnaHQsIDBdKS5kb21haW4oWzAsIG1heFZhbHVlVHdvXSk7XHJcbiAgICAgICB2YXIgcmlnaHRZQXhpcyA9IGQzLnN2Zy5heGlzKCkuc2NhbGUocmlnaHRZKS5vcmllbnQoXCJyaWdodFwiKTtcclxuICAgICAgIGlmKHRoaXMuaXNWYWx1ZVR3b1RpbWVTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltZVNwYW4gPSBuZXcgVGltZVNwYW4obWF4VmFsdWVUd28pO1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpbWVJbnRlcnZhbCAgPSB0aW1lU3Bhbi5nZXRGb3JtYXRlcihzdGVwcyk7XHJcbiAgICAgICAgICAgICAgICByaWdodFlBeGlzLnRpY2tGb3JtYXQodGltZUludGVydmFsLmZvcm1hdEhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRZQXhpcy50aWNrVmFsdWVzKGQzLnJhbmdlKDAsIG1heFZhbHVlVHdvLCB0aW1lSW50ZXJ2YWwuc3RlcFNpemUpKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIHJpZ2h0WUF4aXMudGlja3Moc3RlcHMpXHJcbiAgICAgICAgICAgIHJpZ2h0WUF4aXMudGlja0Zvcm1hdCggdGhpcy5yaWdodFlBeGlzRm9ybWF0dGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbGVmdDogeyBheGlzOiBsZWZ0WUF4aXMsIHk6IGxlZnRZIH0sXHJcbiAgICAgICAgICAgIHJpZ2h0OiB7ICBheGlzOiByaWdodFlBeGlzLCB5OiByaWdodFkgfSAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZHVwbGljYXRlIGNvZGUgb2YgdGhlIHJlbmRlciBmdW5jdGlvblxyXG4gICAgLy8gc2hvdWxkIGJlIG1vcmUgcmV1c2VhYmxlXHJcbiAgICBwcml2YXRlIGdldFJvdGF0aW9uTWVhc3VyZW1lbnRzKHN2ZzogU2VsZWN0aW9uPGFueT4pIHsgXHJcbiAgICAgICAgdGhpcy5zdmcuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKS5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIHZhciBtYXJnaW5MYWJlbEhlaWdodCA9IHRoaXMuZm9udEhlaWdodCArIDEwO1xyXG4gICAgICAgIHZhciBncmFwaEhlaWdodCA9IHRoaXMuaGVpZ2h0IC0gRDNEdWFsQmFyQ2hhcnQuTUFSR0lOICogMiAtIG1hcmdpbkxhYmVsSGVpZ2h0O1xyXG5cclxuICAgICAgICB2YXIgWUF4aXNlcyA9IHRoaXMuR2V0Qm90aFlBeGlzKGdyYXBoSGVpZ2h0KTtcclxuXHJcbiAgICAgICAgdmFyIG1hcmdpbkNvbnRhaW5lciA9IHRoaXMuc3ZnLmFwcGVuZCgnZycpLmF0dHIoJ3RyYW5zZm9ybScsIHRoaXMudHJhbnNsYXRlKEQzRHVhbEJhckNoYXJ0Lk1BUkdJTiwgRDNEdWFsQmFyQ2hhcnQuTUFSR0lOKSk7XHJcblxyXG4gICAgICAgIHZhciBsZWZ0WUF4aXNHcm91cCA9IG1hcmdpbkNvbnRhaW5lci5hcHBlbmQoJ2cnKS5jYWxsKFlBeGlzZXMubGVmdC5heGlzKTtcclxuICAgICAgICB2YXIgcmlnaHRZQXhpc0dyb3VwID0gbWFyZ2luQ29udGFpbmVyLmFwcGVuZCgnZycpLmNhbGwoWUF4aXNlcy5yaWdodC5heGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgbGVmdEF4aXNXaWR0aCA9ICg8U1ZHU1ZHRWxlbWVudD4oPGFueT5sZWZ0WUF4aXNHcm91cC5ub2RlKCkpKS5nZXRCQm94KCkud2lkdGg7XHJcbiAgICAgICAgdmFyIHJpZ2h0QXhpc1dpZHRoID0gKDxTVkdTVkdFbGVtZW50Pig8YW55PnJpZ2h0WUF4aXNHcm91cC5ub2RlKCkpKS5nZXRCQm94KCkud2lkdGg7ICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdmFyIGdyYXBoV2lkdGggPSB0aGlzLndpZHRoIC0gRDNEdWFsQmFyQ2hhcnQuTUFSR0lOICogMiAtIGxlZnRBeGlzV2lkdGggLSByaWdodEF4aXNXaWR0aDtcclxuXHJcbiAgICAgICAgdmFyIGR1YWxCYXJXaWR0aCA9IGdyYXBoV2lkdGggLyB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHZhciBsYWJlbFdpZHRoID0gdGhpcy5kM1V0aWxpdGllc1NlcnZpY2UuZ2V0TWF4V2lkdGhPZlRleHRzKCQubWFwKHRoaXMuZGF0YSwgKGQpID0+IGQubGFiZWwpLCB0aGlzLmZvbnRTaXplKTtcclxuICAgICAgICB2YXIgcm90YXRlTGFiZWw6IGJvb2xlYW4gPSBkdWFsQmFyV2lkdGggPCBsYWJlbFdpZHRoO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJvdGF0ZUxhYmVsOiByb3RhdGVMYWJlbCxcclxuICAgICAgICAgICAgbGFiZWxXaWR0aDogbGFiZWxXaWR0aCxcclxuICAgICAgICAgICAgbGFiZWxIZWlndGg6IHRoaXMuZm9udEhlaWdodCxcclxuICAgICAgICAgICAgZHVhbEJhcldpZHRoOiBkdWFsQmFyV2lkdGhcclxuICAgICAgICB9OyAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YSkgeyB0aHJvdyBuZXcgRXJyb3IoXCJObyBkYXRhIGdpdmVuXCIpOyB9XHJcblxyXG4gICAgICAgIHZhciByb3RhdGlvbk1lYXN1cmVtZW50cyA9IHRoaXMuZ2V0Um90YXRpb25NZWFzdXJlbWVudHModGhpcy5zdmcpO1xyXG5cclxuICAgICAgICB0aGlzLnN2Zy5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTsgXHJcbiAgICAgICAgdGhpcy5zdmcuYXR0cignd2lkdGgnLCB0aGlzLndpZHRoKS5hdHRyKCdoZWlnaHQnLCB0aGlzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIHZhciBtYXJnaW5MYWJlbEhlaWdodCA9dGhpcy5mb250SGVpZ2h0ICsgMTA7XHJcblxyXG4gICAgICAgIHZhciByb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgaWYocm90YXRpb25NZWFzdXJlbWVudHMucm90YXRlTGFiZWwpIHtcclxuICAgICAgICAgICAgdmFyIGEgPSByb3RhdGlvbk1lYXN1cmVtZW50cy5sYWJlbFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgYiA9IHJvdGF0aW9uTWVhc3VyZW1lbnRzLmxhYmVsSGVpZ3RoO1xyXG4gICAgICAgICAgICB2YXIgYyA9IGEqYStiKmI7XHJcbiAgICAgICAgICAgIHZhciB6ID0gcm90YXRpb25NZWFzdXJlbWVudHMuZHVhbEJhcldpZHRoO1xyXG4gICAgICAgICAgICB2YXIgeCA9ICh6KihhKmEpK01hdGguc3FydChNYXRoLmFicyhjLU1hdGgucG93KHosIDIpKSkpL2M7XHJcbiAgICAgICAgICAgIHZhciBhbHBoYSA9IE1hdGguYWNvcyh4L2EpO1xyXG4gICAgICAgICAgICByb3RhdGlvbiA9IGFscGhhKjE4MC9NYXRoLlBJO1xyXG4gICAgICAgICAgICB2YXIgYW5nbGVSYWRpYW5zID0gcm90YXRpb24gKiBNYXRoLlBJIC8gMTgwO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0MSA9IE1hdGguY29zKGFuZ2xlUmFkaWFucykgKiByb3RhdGlvbk1lYXN1cmVtZW50cy5sYWJlbFdpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0MiA9IE1hdGguc2luKGFuZ2xlUmFkaWFucykgKiB0aGlzLmZvbnRIZWlnaHQ7XHJcbiAgICAgICAgICAgIG1hcmdpbkxhYmVsSGVpZ2h0ID0gaGVpZ2h0MSArIGhlaWdodDIgKyAxMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBncmFwaEhlaWdodCA9IHRoaXMuaGVpZ2h0IC0gRDNEdWFsQmFyQ2hhcnQuTUFSR0lOICogMiAtIG1hcmdpbkxhYmVsSGVpZ2h0O1xyXG4gICAgICAgIHZhciBZQXhpc2VzID0gdGhpcy5HZXRCb3RoWUF4aXMoZ3JhcGhIZWlnaHQpO1xyXG5cclxuICAgICAgICB2YXIgbWFyZ2luQ29udGFpbmVyID0gdGhpcy5zdmcuYXBwZW5kKCdnJykuYXR0cigndHJhbnNmb3JtJywgdGhpcy50cmFuc2xhdGUoRDNEdWFsQmFyQ2hhcnQuTUFSR0lOLCBEM0R1YWxCYXJDaGFydC5NQVJHSU4pKTtcclxuXHJcbiAgICAgICAgdmFyIGxlZnRZQXhpc0dyb3VwID0gbWFyZ2luQ29udGFpbmVyLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywnYXhpcy1kdWFsYmFycycpXHJcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwoWUF4aXNlcy5sZWZ0LmF4aXMpO1xyXG4gICAgICAgICAgIGxlZnRZQXhpc0dyb3VwLnNlbGVjdEFsbCgndGV4dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIHRoaXMuY29sb3JPbmUpXHJcblx0ICAgICAgICAgICAgICAgIC5zdHlsZSgnZm9udC1zaXplJyx0aGlzLmZvbnRTaXplKSAgOyAgICBcclxuXHJcbiAgICAgICAgdmFyIHJpZ2h0WUF4aXNHcm91cCA9IG1hcmdpbkNvbnRhaW5lci5hcHBlbmQoJ2cnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsJ2F4aXMtZHVhbGJhcnMnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5jYWxsKFlBeGlzZXMucmlnaHQuYXhpcyk7XHJcbiAgICAgICAgICAgIHJpZ2h0WUF4aXNHcm91cC5zZWxlY3RBbGwoJ3RleHQnKVxyXG4gICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLmNvbG9yVHdvKVxyXG5cdCAgICAgICAgICAgICAgICAuc3R5bGUoJ2ZvbnQtc2l6ZScsIHRoaXMuZm9udFNpemUpIDsgICAgXHJcblxyXG4gICAgICAgIHZhciBsZWZ0QXhpc1dpZHRoID0gKDxTVkdTVkdFbGVtZW50Pig8YW55PmxlZnRZQXhpc0dyb3VwLm5vZGUoKSkpLmdldEJCb3goKS53aWR0aDtcclxuICAgICAgICB2YXIgcmlnaHRBeGlzV2lkdGggPSAoPFNWR1NWR0VsZW1lbnQ+KDxhbnk+cmlnaHRZQXhpc0dyb3VwLm5vZGUoKSkpLmdldEJCb3goKS53aWR0aDsgICAgICAgIFxyXG4gICAgICAgIHZhciBncmFwaFdpZHRoID0gdGhpcy53aWR0aCAtIEQzRHVhbEJhckNoYXJ0Lk1BUkdJTiAqIDIgLSBsZWZ0QXhpc1dpZHRoIC0gcmlnaHRBeGlzV2lkdGg7XHJcbiAgICAgICAgdmFyIGR1YWxCYXJXaWR0aCA9IGdyYXBoV2lkdGggLyB0aGlzLmRhdGEubGVuZ3RoO1xyXG4gICAgICAgIHZhciBsYWJlbFdpZHRoID0gdGhpcy5kM1V0aWxpdGllc1NlcnZpY2UuZ2V0TWF4V2lkdGhPZlRleHRzKCQubWFwKHRoaXMuZGF0YSwgKGQpID0+IGQubGFiZWwpLCB0aGlzLmZvbnRTaXplKTtcclxuXHJcbiAgICAgICAgICAgICBcclxuICAgICAgICB2YXIgYmFyc09mZnNldDogbnVtYmVyID0gMTtcclxuICAgICAgICB2YXIgc2luZ2xlQmFyV2lkdGg6IG51bWJlciA9IChkdWFsQmFyV2lkdGggLSBEM0R1YWxCYXJDaGFydC5NSU5JTVVNX0JBUl9TUEFDSU5HKSAvIDI7XHJcbiAgICAgICAgaWYoIHRoaXMubWF4QmFyV2lkdGggKiAyIDwgZHVhbEJhcldpZHRoICkgeyAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBiYXJzT2Zmc2V0ID0gKGR1YWxCYXJXaWR0aCAtIHRoaXMubWF4QmFyV2lkdGggKiAyICkgLyAyO1xyXG4gICAgICAgICAgICBzaW5nbGVCYXJXaWR0aCA9IHRoaXMubWF4QmFyV2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZWZ0WUF4aXNHcm91cC5hdHRyKCd0cmFuc2Zvcm0nLCB0aGlzLnRyYW5zbGF0ZShsZWZ0QXhpc1dpZHRoLCAwKSk7XHJcbiAgICAgICAgcmlnaHRZQXhpc0dyb3VwLmF0dHIoJ3RyYW5zZm9ybScsIHRoaXMudHJhbnNsYXRlKGdyYXBoV2lkdGggKyBsZWZ0QXhpc1dpZHRoLCAwKSk7XHJcblxyXG4gICAgICAgIHZhciBkYXRhR3JvdXAgPSBtYXJnaW5Db250YWluZXIuYXBwZW5kKFwiZ1wiKS5hdHRyKCd0cmFuc2Zvcm0nLCB0aGlzLnRyYW5zbGF0ZShsZWZ0QXhpc1dpZHRoLCAwKSk7XHJcbiAgICAgICAgdmFyIGxhYmVsR3JvdXAgPSBtYXJnaW5Db250YWluZXIuYXBwZW5kKFwiZ1wiKS5hdHRyKCd0cmFuc2Zvcm0nLCB0aGlzLnRyYW5zbGF0ZShsZWZ0QXhpc1dpZHRoLCBncmFwaEhlaWdodCArIDEwICsgKG1hcmdpbkxhYmVsSGVpZ2h0LzIpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHZhciBkdWFsQmFycyA9IGRhdGFHcm91cC5zZWxlY3RBbGwoXCJnXCIpXHJcbiAgICAgICAgICAgIC5kYXRhKHRoaXMuZGF0YSlcclxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKFwiZ1wiKVxyXG4gICAgICAgICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCAoZCwgaSkgPT4gdGhpcy50cmFuc2xhdGUoaSAqIGR1YWxCYXJXaWR0aCwgMCkpO1xyXG5cclxuICAgICAgICAvLyBmaXJzdCBiYXJcclxuICAgICAgICBkdWFsQmFycy5hcHBlbmQoXCJyZWN0XCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwieVwiLCAoZCkgPT4gWUF4aXNlcy5sZWZ0LnkoZC52YWx1ZU9uZSkpXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIChkKSA9PiBncmFwaEhlaWdodCAtIFlBeGlzZXMubGVmdC55KGQudmFsdWVPbmUpKVxyXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgYmFyc09mZnNldCArIDApXHJcbiAgICAgICAgICAgIC5hdHRyKFwid2lkdGhcIiwgc2luZ2xlQmFyV2lkdGgpICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCB0aGlzLmNvbG9yT25lKTtcclxuICAgICAgICAvLyBzZWNvbmQgYmFyXHJcbiAgICAgICAgZHVhbEJhcnMuYXBwZW5kKFwicmVjdFwiKVxyXG4gICAgICAgICAgICAuYXR0cihcInlcIiwgKGQpID0+IFlBeGlzZXMucmlnaHQueShkLnZhbHVlVHdvKSlcclxuICAgICAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgKGQpID0+IGdyYXBoSGVpZ2h0IC0gWUF4aXNlcy5yaWdodC55KGQudmFsdWVUd28pKVxyXG4gICAgICAgICAgICAuYXR0cihcInhcIiwgYmFyc09mZnNldCArIHNpbmdsZUJhcldpZHRoKVxyXG4gICAgICAgICAgICAuYXR0cihcIndpZHRoXCIsIHNpbmdsZUJhcldpZHRoKSAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgdGhpcy5jb2xvclR3byk7ICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGJhckxhYmVscyA9IGxhYmVsR3JvdXAuc2VsZWN0QWxsKFwiZ1wiKVxyXG4gICAgICAgICAgICAuZGF0YSh0aGlzLmRhdGEpXHJcbiAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAoZCwgaSkgPT4gdGhpcy50cmFuc2xhdGUoKGkgKyAwLjUpICogZHVhbEJhcldpZHRoLCAwKSk7XHJcbiAgICAgICAgYmFyTGFiZWxzXHJcbiAgICAgICAgICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXHJcbiAgICAgICAgICAgIC5hdHRyKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxyXG4gICAgICAgICAgICAudGV4dChkID0+IGQubGFiZWwpXHJcbiAgICAgICAgICAgIC5zdHlsZShcImZpbGxcIiwgJyM2ZjZlNmQnKVxyXG5cdCAgICAgICAgLnN0eWxlKFwiZm9udC1zaXplXCIsdGhpcy5mb250U2l6ZSlcclxuICAgICAgICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvdGF0aW9uTWVhc3VyZW1lbnRzLnJvdGF0ZUxhYmVsID8gJ3JvdGF0ZSgnICsgcm90YXRpb24gKyAnKScgOiAnJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGUoaG9yaXpvbnRhbDogbnVtYmVyLCB2ZXJ0aWNhbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gYHRyYW5zbGF0ZSgke2hvcml6b250YWx9LCAke3ZlcnRpY2FsfSlgO1xyXG4gICAgfVxyXG59XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnZDMnKS5kaXJlY3RpdmUoJ2QzRHVhbEJhckNoYXJ0JywgWydkM1V0aWxpdGllc1NlcnZpY2UnLCAoZDNVdGlsaXRpZXNTZXJ2aWNlOiBhbnkpID0+IG5ldyBEM0R1YWxCYXJDaGFydChkM1V0aWxpdGllc1NlcnZpY2UpXSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvRDMvZDNEdWFsQmFyQ2hhcnQvZDNEdWFsQmFyQ2hhcnQudHNcbiAqKi8iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBMby1EYXNoIDEuMC4yIChDdXN0b20gQnVpbGQpIDxodHRwOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCAtbyAuL2Rpc3QvbG9kYXNoLmNvbXBhdC5qc2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTMgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuNC40IDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy8+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDEzIEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBJbmMuXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHA6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbjsoZnVuY3Rpb24od2luZG93LCB1bmRlZmluZWQpIHtcblxuICAvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgICovXG4gIHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHM7XG5cbiAgLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgICovXG4gIHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG4gIC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBhbmQgdXNlIGl0IGFzIGB3aW5kb3dgICovXG4gIHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG4gIGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCkge1xuICAgIHdpbmRvdyA9IGZyZWVHbG9iYWw7XG4gIH1cblxuICAvKiogVXNlZCBmb3IgYXJyYXkgYW5kIG9iamVjdCBtZXRob2QgcmVmZXJlbmNlcyAqL1xuICB2YXIgYXJyYXlSZWYgPSBbXSxcbiAgICAgIG9iamVjdFJlZiA9IHt9O1xuXG4gIC8qKiBVc2VkIHRvIGdlbmVyYXRlIHVuaXF1ZSBJRHMgKi9cbiAgdmFyIGlkQ291bnRlciA9IDA7XG5cbiAgLyoqIFVzZWQgaW50ZXJuYWxseSB0byBpbmRpY2F0ZSB2YXJpb3VzIHRoaW5ncyAqL1xuICB2YXIgaW5kaWNhdG9yT2JqZWN0ID0gb2JqZWN0UmVmO1xuXG4gIC8qKiBVc2VkIGJ5IGBjYWNoZWRDb250YWluc2AgYXMgdGhlIGRlZmF1bHQgc2l6ZSB3aGVuIG9wdGltaXphdGlvbnMgYXJlIGVuYWJsZWQgZm9yIGxhcmdlIGFycmF5cyAqL1xuICB2YXIgbGFyZ2VBcnJheVNpemUgPSAzMDtcblxuICAvKiogVXNlZCB0byByZXN0b3JlIHRoZSBvcmlnaW5hbCBgX2AgcmVmZXJlbmNlIGluIGBub0NvbmZsaWN0YCAqL1xuICB2YXIgb2xkRGFzaCA9IHdpbmRvdy5fO1xuXG4gIC8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgZW50aXRpZXMgKi9cbiAgdmFyIHJlRXNjYXBlZEh0bWwgPSAvJig/OmFtcHxsdHxndHxxdW90fCMzOSk7L2c7XG5cbiAgLyoqIFVzZWQgdG8gbWF0Y2ggZW1wdHkgc3RyaW5nIGxpdGVyYWxzIGluIGNvbXBpbGVkIHRlbXBsYXRlIHNvdXJjZSAqL1xuICB2YXIgcmVFbXB0eVN0cmluZ0xlYWRpbmcgPSAvXFxiX19wIFxcKz0gJyc7L2csXG4gICAgICByZUVtcHR5U3RyaW5nTWlkZGxlID0gL1xcYihfX3AgXFwrPSkgJycgXFwrL2csXG4gICAgICByZUVtcHR5U3RyaW5nVHJhaWxpbmcgPSAvKF9fZVxcKC4qP1xcKXxcXGJfX3RcXCkpIFxcK1xcbicnOy9nO1xuXG4gIC8qKiBVc2VkIHRvIG1hdGNoIHJlZ2V4cCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcyAqL1xuICB2YXIgcmVGbGFncyA9IC9cXHcqJC87XG5cbiAgLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZSAqL1xuICB2YXIgcmVOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgICAob2JqZWN0UmVmLnZhbHVlT2YgKyAnJylcbiAgICAgIC5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZywgJ1xcXFwkJicpXG4gICAgICAucmVwbGFjZSgvdmFsdWVPZnxmb3IgW15cXF1dKy9nLCAnLis/JykgKyAnJCdcbiAgKTtcblxuICAvKipcbiAgICogVXNlZCB0byBtYXRjaCBFUzYgdGVtcGxhdGUgZGVsaW1pdGVyc1xuICAgKiBodHRwOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy03LjguNlxuICAgKi9cbiAgdmFyIHJlRXNUZW1wbGF0ZSA9IC9cXCRcXHsoW15cXFxcfV0qKD86XFxcXC5bXlxcXFx9XSopKilcXH0vZztcblxuICAvKiogVXNlZCB0byBtYXRjaCBcImludGVycG9sYXRlXCIgdGVtcGxhdGUgZGVsaW1pdGVycyAqL1xuICB2YXIgcmVJbnRlcnBvbGF0ZSA9IC88JT0oW1xcc1xcU10rPyklPi9nO1xuXG4gIC8qKiBVc2VkIHRvIGVuc3VyZSBjYXB0dXJpbmcgb3JkZXIgb2YgdGVtcGxhdGUgZGVsaW1pdGVycyAqL1xuICB2YXIgcmVOb01hdGNoID0gLygkXikvO1xuXG4gIC8qKiBVc2VkIHRvIG1hdGNoIEhUTUwgY2hhcmFjdGVycyAqL1xuICB2YXIgcmVVbmVzY2FwZWRIdG1sID0gL1smPD5cIiddL2c7XG5cbiAgLyoqIFVzZWQgdG8gbWF0Y2ggdW5lc2NhcGVkIGNoYXJhY3RlcnMgaW4gY29tcGlsZWQgc3RyaW5nIGxpdGVyYWxzICovXG4gIHZhciByZVVuZXNjYXBlZFN0cmluZyA9IC9bJ1xcblxcclxcdFxcdTIwMjhcXHUyMDI5XFxcXF0vZztcblxuICAvKiogVXNlZCB0byBmaXggdGhlIEpTY3JpcHQgW1tEb250RW51bV1dIGJ1ZyAqL1xuICB2YXIgc2hhZG93ZWQgPSBbXG4gICAgJ2NvbnN0cnVjdG9yJywgJ2hhc093blByb3BlcnR5JywgJ2lzUHJvdG90eXBlT2YnLCAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAgICd0b0xvY2FsZVN0cmluZycsICd0b1N0cmluZycsICd2YWx1ZU9mJ1xuICBdO1xuXG4gIC8qKiBVc2VkIHRvIG1ha2UgdGVtcGxhdGUgc291cmNlVVJMcyBlYXNpZXIgdG8gaWRlbnRpZnkgKi9cbiAgdmFyIHRlbXBsYXRlQ291bnRlciA9IDA7XG5cbiAgLyoqIE5hdGl2ZSBtZXRob2Qgc2hvcnRjdXRzICovXG4gIHZhciBjZWlsID0gTWF0aC5jZWlsLFxuICAgICAgY29uY2F0ID0gYXJyYXlSZWYuY29uY2F0LFxuICAgICAgZmxvb3IgPSBNYXRoLmZsb29yLFxuICAgICAgZ2V0UHJvdG90eXBlT2YgPSByZU5hdGl2ZS50ZXN0KGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKSAmJiBnZXRQcm90b3R5cGVPZixcbiAgICAgIGhhc093blByb3BlcnR5ID0gb2JqZWN0UmVmLmhhc093blByb3BlcnR5LFxuICAgICAgcHVzaCA9IGFycmF5UmVmLnB1c2gsXG4gICAgICB0b1N0cmluZyA9IG9iamVjdFJlZi50b1N0cmluZztcblxuICAvKiBOYXRpdmUgbWV0aG9kIHNob3J0Y3V0cyBmb3IgbWV0aG9kcyB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcyAqL1xuICB2YXIgbmF0aXZlQmluZCA9IHJlTmF0aXZlLnRlc3QobmF0aXZlQmluZCA9IHNsaWNlLmJpbmQpICYmIG5hdGl2ZUJpbmQsXG4gICAgICBuYXRpdmVJc0FycmF5ID0gcmVOYXRpdmUudGVzdChuYXRpdmVJc0FycmF5ID0gQXJyYXkuaXNBcnJheSkgJiYgbmF0aXZlSXNBcnJheSxcbiAgICAgIG5hdGl2ZUlzRmluaXRlID0gd2luZG93LmlzRmluaXRlLFxuICAgICAgbmF0aXZlSXNOYU4gPSB3aW5kb3cuaXNOYU4sXG4gICAgICBuYXRpdmVLZXlzID0gcmVOYXRpdmUudGVzdChuYXRpdmVLZXlzID0gT2JqZWN0LmtleXMpICYmIG5hdGl2ZUtleXMsXG4gICAgICBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluLFxuICAgICAgbmF0aXZlUmFuZG9tID0gTWF0aC5yYW5kb207XG5cbiAgLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCBzaG9ydGN1dHMgKi9cbiAgdmFyIGFyZ3NDbGFzcyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgICAgYXJyYXlDbGFzcyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgICBib29sQ2xhc3MgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgICBkYXRlQ2xhc3MgPSAnW29iamVjdCBEYXRlXScsXG4gICAgICBmdW5jQ2xhc3MgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgICAgbnVtYmVyQ2xhc3MgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICAgIG9iamVjdENsYXNzID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgICByZWdleHBDbGFzcyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgICAgc3RyaW5nQ2xhc3MgPSAnW29iamVjdCBTdHJpbmddJztcblxuICAvKiogRGV0ZWN0IHZhcmlvdXMgZW52aXJvbm1lbnRzICovXG4gIHZhciBpc0llT3BlcmEgPSAhIXdpbmRvdy5hdHRhY2hFdmVudCxcbiAgICAgIGlzVjggPSBuYXRpdmVCaW5kICYmICEvXFxufHRydWUvLnRlc3QobmF0aXZlQmluZCArIGlzSWVPcGVyYSk7XG5cbiAgLyogRGV0ZWN0IGlmIGBGdW5jdGlvbiNiaW5kYCBleGlzdHMgYW5kIGlzIGluZmVycmVkIHRvIGJlIGZhc3QgKGFsbCBidXQgVjgpICovXG4gIHZhciBpc0JpbmRGYXN0ID0gbmF0aXZlQmluZCAmJiAhaXNWODtcblxuICAvKiBEZXRlY3QgaWYgYE9iamVjdC5rZXlzYCBleGlzdHMgYW5kIGlzIGluZmVycmVkIHRvIGJlIGZhc3QgKElFLCBPcGVyYSwgVjgpICovXG4gIHZhciBpc0tleXNGYXN0ID0gbmF0aXZlS2V5cyAmJiAoaXNJZU9wZXJhIHx8IGlzVjgpO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgdGhlIEpTY3JpcHQgW1tEb250RW51bV1dIGJ1ZzpcbiAgICpcbiAgICogSW4gSUUgPCA5IGFuIG9iamVjdHMgb3duIHByb3BlcnRpZXMsIHNoYWRvd2luZyBub24tZW51bWVyYWJsZSBvbmVzLCBhcmVcbiAgICogbWFkZSBub24tZW51bWVyYWJsZSBhcyB3ZWxsLlxuICAgKi9cbiAgdmFyIGhhc0RvbnRFbnVtQnVnO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgYSBgcHJvdG90eXBlYCBwcm9wZXJ0aWVzIGFyZSBlbnVtZXJhYmxlIGJ5IGRlZmF1bHQ6XG4gICAqXG4gICAqIEZpcmVmb3ggPCAzLjYsIE9wZXJhID4gOS41MCAtIE9wZXJhIDwgMTEuNjAsIGFuZCBTYWZhcmkgPCA1LjFcbiAgICogKGlmIHRoZSBwcm90b3R5cGUgb3IgYSBwcm9wZXJ0eSBvbiB0aGUgcHJvdG90eXBlIGhhcyBiZWVuIHNldClcbiAgICogaW5jb3JyZWN0bHkgc2V0cyBhIGZ1bmN0aW9uJ3MgYHByb3RvdHlwZWAgcHJvcGVydHkgW1tFbnVtZXJhYmxlXV1cbiAgICogdmFsdWUgdG8gYHRydWVgLlxuICAgKi9cbiAgdmFyIGhhc0VudW1Qcm90b3R5cGU7XG5cbiAgLyoqIERldGVjdCBpZiBvd24gcHJvcGVydGllcyBhcmUgaXRlcmF0ZWQgYWZ0ZXIgaW5oZXJpdGVkIHByb3BlcnRpZXMgKElFIDwgOSkgKi9cbiAgdmFyIGl0ZXJhdGVzT3duTGFzdDtcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGBBcnJheSNzaGlmdGAgYW5kIGBBcnJheSNzcGxpY2VgIGF1Z21lbnQgYXJyYXktbGlrZSBvYmplY3RzXG4gICAqIGluY29ycmVjdGx5OlxuICAgKlxuICAgKiBGaXJlZm94IDwgMTAsIElFIGNvbXBhdGliaWxpdHkgbW9kZSwgYW5kIElFIDwgOSBoYXZlIGJ1Z2d5IEFycmF5IGBzaGlmdCgpYFxuICAgKiBhbmQgYHNwbGljZSgpYCBmdW5jdGlvbnMgdGhhdCBmYWlsIHRvIHJlbW92ZSB0aGUgbGFzdCBlbGVtZW50LCBgdmFsdWVbMF1gLFxuICAgKiBvZiBhcnJheS1saWtlIG9iamVjdHMgZXZlbiB0aG91Z2ggdGhlIGBsZW5ndGhgIHByb3BlcnR5IGlzIHNldCB0byBgMGAuXG4gICAqIFRoZSBgc2hpZnQoKWAgbWV0aG9kIGlzIGJ1Z2d5IGluIElFIDggY29tcGF0aWJpbGl0eSBtb2RlLCB3aGlsZSBgc3BsaWNlKClgXG4gICAqIGlzIGJ1Z2d5IHJlZ2FyZGxlc3Mgb2YgbW9kZSBpbiBJRSA8IDkgYW5kIGJ1Z2d5IGluIGNvbXBhdGliaWxpdHkgbW9kZSBpbiBJRSA5LlxuICAgKi9cbiAgdmFyIGhhc09iamVjdFNwbGljZUJ1ZyA9IChoYXNPYmplY3RTcGxpY2VCdWcgPSB7ICcwJzogMSwgJ2xlbmd0aCc6IDEgfSxcbiAgICBhcnJheVJlZi5zcGxpY2UuY2FsbChoYXNPYmplY3RTcGxpY2VCdWcsIDAsIDEpLCBoYXNPYmplY3RTcGxpY2VCdWdbMF0pO1xuXG4gIC8qKiBEZXRlY3QgaWYgYGFyZ3VtZW50c2Agb2JqZWN0IGluZGV4ZXMgYXJlIG5vbi1lbnVtZXJhYmxlIChGaXJlZm94IDwgNCwgSUUgPCA5LCBQaGFudG9tSlMsIFNhZmFyaSA8IDUuMSkgKi9cbiAgdmFyIG5vbkVudW1BcmdzID0gdHJ1ZTtcblxuICAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIHByb3BzID0gW107XG4gICAgZnVuY3Rpb24gY3RvcigpIHsgdGhpcy54ID0gMTsgfVxuICAgIGN0b3IucHJvdG90eXBlID0geyAndmFsdWVPZic6IDEsICd5JzogMSB9O1xuICAgIGZvciAodmFyIHByb3AgaW4gbmV3IGN0b3IpIHsgcHJvcHMucHVzaChwcm9wKTsgfVxuICAgIGZvciAocHJvcCBpbiBhcmd1bWVudHMpIHsgbm9uRW51bUFyZ3MgPSAhcHJvcDsgfVxuXG4gICAgaGFzRG9udEVudW1CdWcgPSAhL3ZhbHVlT2YvLnRlc3QocHJvcHMpO1xuICAgIGhhc0VudW1Qcm90b3R5cGUgPSBjdG9yLnByb3BlcnR5SXNFbnVtZXJhYmxlKCdwcm90b3R5cGUnKTtcbiAgICBpdGVyYXRlc093bkxhc3QgPSBwcm9wc1swXSAhPSAneCc7XG4gIH0oMSkpO1xuXG4gIC8qKiBEZXRlY3QgaWYgYGFyZ3VtZW50c2Agb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyAoYWxsIGJ1dCBPcGVyYSA8IDEwLjUpICovXG4gIHZhciBhcmdzQXJlT2JqZWN0cyA9IGFyZ3VtZW50cy5jb25zdHJ1Y3RvciA9PSBPYmplY3Q7XG5cbiAgLyoqIERldGVjdCBpZiBgYXJndW1lbnRzYCBvYmplY3RzIFtbQ2xhc3NdXSBpcyB1bnJlc29sdmFibGUgKEZpcmVmb3ggPCA0LCBJRSA8IDkpICovXG4gIHZhciBub0FyZ3NDbGFzcyA9ICFpc0FyZ3VtZW50cyhhcmd1bWVudHMpO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgbGFjayBvZiBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXg6XG4gICAqXG4gICAqIElFIDwgOCBjYW4ndCBhY2Nlc3MgY2hhcmFjdGVycyBieSBpbmRleCBhbmQgSUUgOCBjYW4gb25seSBhY2Nlc3NcbiAgICogY2hhcmFjdGVycyBieSBpbmRleCBvbiBzdHJpbmcgbGl0ZXJhbHMuXG4gICAqL1xuICB2YXIgbm9DaGFyQnlJbmRleCA9ICgneCdbMF0gKyBPYmplY3QoJ3gnKVswXSkgIT0gJ3h4JztcblxuICAvKipcbiAgICogRGV0ZWN0IGlmIGEgRE9NIG5vZGUncyBbW0NsYXNzXV0gaXMgdW5yZXNvbHZhYmxlIChJRSA8IDkpXG4gICAqIGFuZCB0aGF0IHRoZSBKUyBlbmdpbmUgd29uJ3QgZXJyb3Igd2hlbiBhdHRlbXB0aW5nIHRvIGNvZXJjZSBhbiBvYmplY3QgdG9cbiAgICogYSBzdHJpbmcgd2l0aG91dCBhIGB0b1N0cmluZ2AgZnVuY3Rpb24uXG4gICAqL1xuICB0cnkge1xuICAgIHZhciBub05vZGVDbGFzcyA9IHRvU3RyaW5nLmNhbGwoZG9jdW1lbnQpID09IG9iamVjdENsYXNzICYmICEoeyAndG9TdHJpbmcnOiAwIH0gKyAnJyk7XG4gIH0gY2F0Y2goZSkgeyB9XG5cbiAgLyoqIFVzZWQgdG8gaWRlbnRpZnkgb2JqZWN0IGNsYXNzaWZpY2F0aW9ucyB0aGF0IGBfLmNsb25lYCBzdXBwb3J0cyAqL1xuICB2YXIgY2xvbmVhYmxlQ2xhc3NlcyA9IHt9O1xuICBjbG9uZWFibGVDbGFzc2VzW2Z1bmNDbGFzc10gPSBmYWxzZTtcbiAgY2xvbmVhYmxlQ2xhc3Nlc1thcmdzQ2xhc3NdID0gY2xvbmVhYmxlQ2xhc3Nlc1thcnJheUNsYXNzXSA9XG4gIGNsb25lYWJsZUNsYXNzZXNbYm9vbENsYXNzXSA9IGNsb25lYWJsZUNsYXNzZXNbZGF0ZUNsYXNzXSA9XG4gIGNsb25lYWJsZUNsYXNzZXNbbnVtYmVyQ2xhc3NdID0gY2xvbmVhYmxlQ2xhc3Nlc1tvYmplY3RDbGFzc10gPVxuICBjbG9uZWFibGVDbGFzc2VzW3JlZ2V4cENsYXNzXSA9IGNsb25lYWJsZUNsYXNzZXNbc3RyaW5nQ2xhc3NdID0gdHJ1ZTtcblxuICAvKiogVXNlZCB0byBsb29rdXAgYSBidWlsdC1pbiBjb25zdHJ1Y3RvciBieSBbW0NsYXNzXV0gKi9cbiAgdmFyIGN0b3JCeUNsYXNzID0ge307XG4gIGN0b3JCeUNsYXNzW2FycmF5Q2xhc3NdID0gQXJyYXk7XG4gIGN0b3JCeUNsYXNzW2Jvb2xDbGFzc10gPSBCb29sZWFuO1xuICBjdG9yQnlDbGFzc1tkYXRlQ2xhc3NdID0gRGF0ZTtcbiAgY3RvckJ5Q2xhc3Nbb2JqZWN0Q2xhc3NdID0gT2JqZWN0O1xuICBjdG9yQnlDbGFzc1tudW1iZXJDbGFzc10gPSBOdW1iZXI7XG4gIGN0b3JCeUNsYXNzW3JlZ2V4cENsYXNzXSA9IFJlZ0V4cDtcbiAgY3RvckJ5Q2xhc3Nbc3RyaW5nQ2xhc3NdID0gU3RyaW5nO1xuXG4gIC8qKiBVc2VkIHRvIGRldGVybWluZSBpZiB2YWx1ZXMgYXJlIG9mIHRoZSBsYW5ndWFnZSB0eXBlIE9iamVjdCAqL1xuICB2YXIgb2JqZWN0VHlwZXMgPSB7XG4gICAgJ2Jvb2xlYW4nOiBmYWxzZSxcbiAgICAnZnVuY3Rpb24nOiB0cnVlLFxuICAgICdvYmplY3QnOiB0cnVlLFxuICAgICdudW1iZXInOiBmYWxzZSxcbiAgICAnc3RyaW5nJzogZmFsc2UsXG4gICAgJ3VuZGVmaW5lZCc6IGZhbHNlXG4gIH07XG5cbiAgLyoqIFVzZWQgdG8gZXNjYXBlIGNoYXJhY3RlcnMgZm9yIGluY2x1c2lvbiBpbiBjb21waWxlZCBzdHJpbmcgbGl0ZXJhbHMgKi9cbiAgdmFyIHN0cmluZ0VzY2FwZXMgPSB7XG4gICAgJ1xcXFwnOiAnXFxcXCcsXG4gICAgXCInXCI6IFwiJ1wiLFxuICAgICdcXG4nOiAnbicsXG4gICAgJ1xccic6ICdyJyxcbiAgICAnXFx0JzogJ3QnLFxuICAgICdcXHUyMDI4JzogJ3UyMDI4JyxcbiAgICAnXFx1MjAyOSc6ICd1MjAyOSdcbiAgfTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGBsb2Rhc2hgIG9iamVjdCwgdGhhdCB3cmFwcyB0aGUgZ2l2ZW4gYHZhbHVlYCwgdG8gZW5hYmxlIG1ldGhvZFxuICAgKiBjaGFpbmluZy5cbiAgICpcbiAgICogSW4gYWRkaXRpb24gdG8gTG8tRGFzaCBtZXRob2RzLCB3cmFwcGVycyBhbHNvIGhhdmUgdGhlIGZvbGxvd2luZyBgQXJyYXlgIG1ldGhvZHM6XG4gICAqIGBjb25jYXRgLCBgam9pbmAsIGBwb3BgLCBgcHVzaGAsIGByZXZlcnNlYCwgYHNoaWZ0YCwgYHNsaWNlYCwgYHNvcnRgLCBgc3BsaWNlYCxcbiAgICogYW5kIGB1bnNoaWZ0YFxuICAgKlxuICAgKiBUaGUgY2hhaW5hYmxlIHdyYXBwZXIgZnVuY3Rpb25zIGFyZTpcbiAgICogYGFmdGVyYCwgYGFzc2lnbmAsIGBiaW5kYCwgYGJpbmRBbGxgLCBgYmluZEtleWAsIGBjaGFpbmAsIGBjb21wYWN0YCwgYGNvbXBvc2VgLFxuICAgKiBgY29uY2F0YCwgYGNvdW50QnlgLCBgZGVib3VuY2VgLCBgZGVmYXVsdHNgLCBgZGVmZXJgLCBgZGVsYXlgLCBgZGlmZmVyZW5jZWAsXG4gICAqIGBmaWx0ZXJgLCBgZmxhdHRlbmAsIGBmb3JFYWNoYCwgYGZvckluYCwgYGZvck93bmAsIGBmdW5jdGlvbnNgLCBgZ3JvdXBCeWAsXG4gICAqIGBpbml0aWFsYCwgYGludGVyc2VjdGlvbmAsIGBpbnZlcnRgLCBgaW52b2tlYCwgYGtleXNgLCBgbWFwYCwgYG1heGAsIGBtZW1vaXplYCxcbiAgICogYG1lcmdlYCwgYG1pbmAsIGBvYmplY3RgLCBgb21pdGAsIGBvbmNlYCwgYHBhaXJzYCwgYHBhcnRpYWxgLCBgcGFydGlhbFJpZ2h0YCxcbiAgICogYHBpY2tgLCBgcGx1Y2tgLCBgcHVzaGAsIGByYW5nZWAsIGByZWplY3RgLCBgcmVzdGAsIGByZXZlcnNlYCwgYHNodWZmbGVgLFxuICAgKiBgc2xpY2VgLCBgc29ydGAsIGBzb3J0QnlgLCBgc3BsaWNlYCwgYHRhcGAsIGB0aHJvdHRsZWAsIGB0aW1lc2AsIGB0b0FycmF5YCxcbiAgICogYHVuaW9uYCwgYHVuaXFgLCBgdW5zaGlmdGAsIGB2YWx1ZXNgLCBgd2hlcmVgLCBgd2l0aG91dGAsIGB3cmFwYCwgYW5kIGB6aXBgXG4gICAqXG4gICAqIFRoZSBub24tY2hhaW5hYmxlIHdyYXBwZXIgZnVuY3Rpb25zIGFyZTpcbiAgICogYGNsb25lYCwgYGNsb25lRGVlcGAsIGBjb250YWluc2AsIGBlc2NhcGVgLCBgZXZlcnlgLCBgZmluZGAsIGBoYXNgLCBgaWRlbnRpdHlgLFxuICAgKiBgaW5kZXhPZmAsIGBpc0FyZ3VtZW50c2AsIGBpc0FycmF5YCwgYGlzQm9vbGVhbmAsIGBpc0RhdGVgLCBgaXNFbGVtZW50YCwgYGlzRW1wdHlgLFxuICAgKiBgaXNFcXVhbGAsIGBpc0Zpbml0ZWAsIGBpc0Z1bmN0aW9uYCwgYGlzTmFOYCwgYGlzTnVsbGAsIGBpc051bWJlcmAsIGBpc09iamVjdGAsXG4gICAqIGBpc1BsYWluT2JqZWN0YCwgYGlzUmVnRXhwYCwgYGlzU3RyaW5nYCwgYGlzVW5kZWZpbmVkYCwgYGpvaW5gLCBgbGFzdEluZGV4T2ZgLFxuICAgKiBgbWl4aW5gLCBgbm9Db25mbGljdGAsIGBwb3BgLCBgcmFuZG9tYCwgYHJlZHVjZWAsIGByZWR1Y2VSaWdodGAsIGByZXN1bHRgLFxuICAgKiBgc2hpZnRgLCBgc2l6ZWAsIGBzb21lYCwgYHNvcnRlZEluZGV4YCwgYHRlbXBsYXRlYCwgYHVuZXNjYXBlYCwgYW5kIGB1bmlxdWVJZGBcbiAgICpcbiAgICogVGhlIHdyYXBwZXIgZnVuY3Rpb25zIGBmaXJzdGAgYW5kIGBsYXN0YCByZXR1cm4gd3JhcHBlZCB2YWx1ZXMgd2hlbiBgbmAgaXNcbiAgICogcGFzc2VkLCBvdGhlcndpc2UgdGhleSByZXR1cm4gdW53cmFwcGVkIHZhbHVlcy5cbiAgICpcbiAgICogQG5hbWUgX1xuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGNhdGVnb3J5IENoYWluaW5nXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byB3cmFwIGluIGEgYGxvZGFzaGAgaW5zdGFuY2UuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYSBgbG9kYXNoYCBpbnN0YW5jZS5cbiAgICovXG4gIGZ1bmN0aW9uIGxvZGFzaCh2YWx1ZSkge1xuICAgIC8vIGV4aXQgZWFybHkgaWYgYWxyZWFkeSB3cmFwcGVkLCBldmVuIGlmIHdyYXBwZWQgYnkgYSBkaWZmZXJlbnQgYGxvZGFzaGAgY29uc3RydWN0b3JcbiAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnICYmIHZhbHVlLl9fd3JhcHBlZF9fKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIC8vIGFsbG93IGludm9raW5nIGBsb2Rhc2hgIHdpdGhvdXQgdGhlIGBuZXdgIG9wZXJhdG9yXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIGxvZGFzaCkpIHtcbiAgICAgIHJldHVybiBuZXcgbG9kYXNoKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5fX3dyYXBwZWRfXyA9IHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSB0ZW1wbGF0ZSBkZWxpbWl0ZXJzIHVzZWQgYnkgTG8tRGFzaCBhcmUgc2ltaWxhciB0byB0aG9zZSBpblxuICAgKiBlbWJlZGRlZCBSdWJ5IChFUkIpLiBDaGFuZ2UgdGhlIGZvbGxvd2luZyB0ZW1wbGF0ZSBzZXR0aW5ncyB0byB1c2UgYWx0ZXJuYXRpdmVcbiAgICogZGVsaW1pdGVycy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIGxvZGFzaC50ZW1wbGF0ZVNldHRpbmdzID0ge1xuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZXRlY3QgYGRhdGFgIHByb3BlcnR5IHZhbHVlcyB0byBiZSBIVE1MLWVzY2FwZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAgICogQHR5cGUgUmVnRXhwXG4gICAgICovXG4gICAgJ2VzY2FwZSc6IC88JS0oW1xcc1xcU10rPyklPi9nLFxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZXRlY3QgY29kZSB0byBiZSBldmFsdWF0ZWQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAgICogQHR5cGUgUmVnRXhwXG4gICAgICovXG4gICAgJ2V2YWx1YXRlJzogLzwlKFtcXHNcXFNdKz8pJT4vZyxcblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gZGV0ZWN0IGBkYXRhYCBwcm9wZXJ0eSB2YWx1ZXMgdG8gaW5qZWN0LlxuICAgICAqXG4gICAgICogQG1lbWJlck9mIF8udGVtcGxhdGVTZXR0aW5nc1xuICAgICAqIEB0eXBlIFJlZ0V4cFxuICAgICAqL1xuICAgICdpbnRlcnBvbGF0ZSc6IHJlSW50ZXJwb2xhdGUsXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIHJlZmVyZW5jZSB0aGUgZGF0YSBvYmplY3QgaW4gdGhlIHRlbXBsYXRlIHRleHQuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAgICogQHR5cGUgU3RyaW5nXG4gICAgICovXG4gICAgJ3ZhcmlhYmxlJzogJycsXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGltcG9ydCB2YXJpYWJsZXMgaW50byB0aGUgY29tcGlsZWQgdGVtcGxhdGUuXG4gICAgICpcbiAgICAgKiBAbWVtYmVyT2YgXy50ZW1wbGF0ZVNldHRpbmdzXG4gICAgICogQHR5cGUgT2JqZWN0XG4gICAgICovXG4gICAgJ2ltcG9ydHMnOiB7XG5cbiAgICAgIC8qKlxuICAgICAgICogQSByZWZlcmVuY2UgdG8gdGhlIGBsb2Rhc2hgIGZ1bmN0aW9uLlxuICAgICAgICpcbiAgICAgICAqIEBtZW1iZXJPZiBfLnRlbXBsYXRlU2V0dGluZ3MuaW1wb3J0c1xuICAgICAgICogQHR5cGUgRnVuY3Rpb25cbiAgICAgICAqL1xuICAgICAgJ18nOiBsb2Rhc2hcbiAgICB9XG4gIH07XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIFRoZSB0ZW1wbGF0ZSB1c2VkIHRvIGNyZWF0ZSBpdGVyYXRvciBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JlY3R9IGRhdGEgVGhlIGRhdGEgb2JqZWN0IHVzZWQgdG8gcG9wdWxhdGUgdGhlIHRleHQuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGludGVycG9sYXRlZCB0ZXh0LlxuICAgKi9cbiAgdmFyIGl0ZXJhdG9yVGVtcGxhdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICBcbiAgICB2YXIgX19wID0gJ3ZhciBpbmRleCwgaXRlcmFibGUgPSAnICtcbiAgICAob2JqLmZpcnN0QXJnICkgK1xuICAgICcsIHJlc3VsdCA9IGl0ZXJhYmxlO1xcbmlmICghaXRlcmFibGUpIHJldHVybiByZXN1bHQ7XFxuJyArXG4gICAgKG9iai50b3AgKSArXG4gICAgJztcXG4nO1xuICAgICBpZiAob2JqLmFycmF5cykge1xuICAgIF9fcCArPSAndmFyIGxlbmd0aCA9IGl0ZXJhYmxlLmxlbmd0aDsgaW5kZXggPSAtMTtcXG5pZiAoJyArXG4gICAgKG9iai5hcnJheXMgKSArXG4gICAgJykgeyAgJztcbiAgICAgaWYgKG9iai5ub0NoYXJCeUluZGV4KSB7XG4gICAgX19wICs9ICdcXG4gIGlmIChpc1N0cmluZyhpdGVyYWJsZSkpIHtcXG4gICAgaXRlcmFibGUgPSBpdGVyYWJsZS5zcGxpdChcXCdcXCcpXFxuICB9ICAnO1xuICAgICB9IDtcbiAgICBfX3AgKz0gJ1xcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcXG4gICAgJyArXG4gICAgKG9iai5sb29wICkgK1xuICAgICdcXG4gIH1cXG59XFxuZWxzZSB7ICAnO1xuICAgICAgfSBlbHNlIGlmIChvYmoubm9uRW51bUFyZ3MpIHtcbiAgICBfX3AgKz0gJ1xcbiAgdmFyIGxlbmd0aCA9IGl0ZXJhYmxlLmxlbmd0aDsgaW5kZXggPSAtMTtcXG4gIGlmIChsZW5ndGggJiYgaXNBcmd1bWVudHMoaXRlcmFibGUpKSB7XFxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XFxuICAgICAgaW5kZXggKz0gXFwnXFwnO1xcbiAgICAgICcgK1xuICAgIChvYmoubG9vcCApICtcbiAgICAnXFxuICAgIH1cXG4gIH0gZWxzZSB7ICAnO1xuICAgICB9IDtcbiAgICBcbiAgICAgaWYgKG9iai5oYXNFbnVtUHJvdG90eXBlKSB7XG4gICAgX19wICs9ICdcXG4gIHZhciBza2lwUHJvdG8gPSB0eXBlb2YgaXRlcmFibGUgPT0gXFwnZnVuY3Rpb25cXCc7XFxuICAnO1xuICAgICB9IDtcbiAgICBcbiAgICAgaWYgKG9iai5pc0tleXNGYXN0ICYmIG9iai51c2VIYXMpIHtcbiAgICBfX3AgKz0gJ1xcbiAgdmFyIG93bkluZGV4ID0gLTEsXFxuICAgICAgb3duUHJvcHMgPSBvYmplY3RUeXBlc1t0eXBlb2YgaXRlcmFibGVdID8gbmF0aXZlS2V5cyhpdGVyYWJsZSkgOiBbXSxcXG4gICAgICBsZW5ndGggPSBvd25Qcm9wcy5sZW5ndGg7XFxuXFxuICB3aGlsZSAoKytvd25JbmRleCA8IGxlbmd0aCkge1xcbiAgICBpbmRleCA9IG93blByb3BzW293bkluZGV4XTtcXG4gICAgJztcbiAgICAgaWYgKG9iai5oYXNFbnVtUHJvdG90eXBlKSB7XG4gICAgX19wICs9ICdpZiAoIShza2lwUHJvdG8gJiYgaW5kZXggPT0gXFwncHJvdG90eXBlXFwnKSkge1xcbiAgJztcbiAgICAgfSA7XG4gICAgX19wICs9IFxuICAgIChvYmoubG9vcCApICtcbiAgICAnJztcbiAgICAgaWYgKG9iai5oYXNFbnVtUHJvdG90eXBlKSB7XG4gICAgX19wICs9ICd9XFxuJztcbiAgICAgfSA7XG4gICAgX19wICs9ICcgIH0gICc7XG4gICAgIH0gZWxzZSB7XG4gICAgX19wICs9ICdcXG4gIGZvciAoaW5kZXggaW4gaXRlcmFibGUpIHsnO1xuICAgICAgICBpZiAob2JqLmhhc0VudW1Qcm90b3R5cGUgfHwgb2JqLnVzZUhhcykge1xuICAgIF9fcCArPSAnXFxuICAgIGlmICgnO1xuICAgICAgICAgIGlmIChvYmouaGFzRW51bVByb3RvdHlwZSkge1xuICAgIF9fcCArPSAnIShza2lwUHJvdG8gJiYgaW5kZXggPT0gXFwncHJvdG90eXBlXFwnKSc7XG4gICAgIH0gICAgICBpZiAob2JqLmhhc0VudW1Qcm90b3R5cGUgJiYgb2JqLnVzZUhhcykge1xuICAgIF9fcCArPSAnICYmICc7XG4gICAgIH0gICAgICBpZiAob2JqLnVzZUhhcykge1xuICAgIF9fcCArPSAnaGFzT3duUHJvcGVydHkuY2FsbChpdGVyYWJsZSwgaW5kZXgpJztcbiAgICAgfSAgICA7XG4gICAgX19wICs9ICcpIHsgICAgJztcbiAgICAgfSA7XG4gICAgX19wICs9IFxuICAgIChvYmoubG9vcCApICtcbiAgICAnOyAgICAnO1xuICAgICBpZiAob2JqLmhhc0VudW1Qcm90b3R5cGUgfHwgb2JqLnVzZUhhcykge1xuICAgIF9fcCArPSAnXFxuICAgIH0nO1xuICAgICB9IDtcbiAgICBfX3AgKz0gJ1xcbiAgfSAgJztcbiAgICAgfSA7XG4gICAgXG4gICAgIGlmIChvYmouaGFzRG9udEVudW1CdWcpIHtcbiAgICBfX3AgKz0gJ1xcblxcbiAgdmFyIGN0b3IgPSBpdGVyYWJsZS5jb25zdHJ1Y3RvcjtcXG4gICAgJztcbiAgICAgZm9yICh2YXIgayA9IDA7IGsgPCA3OyBrKyspIHtcbiAgICBfX3AgKz0gJ1xcbiAgaW5kZXggPSBcXCcnICtcbiAgICAob2JqLnNoYWRvd2VkW2tdICkgK1xuICAgICdcXCc7XFxuICBpZiAoJztcbiAgICAgICAgICBpZiAob2JqLnNoYWRvd2VkW2tdID09ICdjb25zdHJ1Y3RvcicpIHtcbiAgICBfX3AgKz0gJyEoY3RvciAmJiBjdG9yLnByb3RvdHlwZSA9PT0gaXRlcmFibGUpICYmICc7XG4gICAgICAgICAgfSA7XG4gICAgX19wICs9ICdoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0ZXJhYmxlLCBpbmRleCkpIHtcXG4gICAgJyArXG4gICAgKG9iai5sb29wICkgK1xuICAgICdcXG4gIH0gICAgJztcbiAgICAgfSA7XG4gICAgXG4gICAgIH0gO1xuICAgIFxuICAgICBpZiAob2JqLmFycmF5cyB8fCBvYmoubm9uRW51bUFyZ3MpIHtcbiAgICBfX3AgKz0gJ1xcbn0nO1xuICAgICB9IDtcbiAgICBfX3AgKz0gXG4gICAgKG9iai5ib3R0b20gKSArXG4gICAgJztcXG5yZXR1cm4gcmVzdWx0JztcbiAgICBcbiAgICBcbiAgICByZXR1cm4gX19wXG4gIH07XG5cbiAgLyoqIFJldXNhYmxlIGl0ZXJhdG9yIG9wdGlvbnMgZm9yIGBhc3NpZ25gIGFuZCBgZGVmYXVsdHNgICovXG4gIHZhciBkZWZhdWx0c0l0ZXJhdG9yT3B0aW9ucyA9IHtcbiAgICAnYXJncyc6ICdvYmplY3QsIHNvdXJjZSwgZ3VhcmQnLFxuICAgICd0b3AnOlxuICAgICAgJ3ZhciBhcmdzID0gYXJndW1lbnRzLFxcbicgK1xuICAgICAgJyAgICBhcmdzSW5kZXggPSAwLFxcbicgK1xuICAgICAgXCIgICAgYXJnc0xlbmd0aCA9IHR5cGVvZiBndWFyZCA9PSAnbnVtYmVyJyA/IDIgOiBhcmdzLmxlbmd0aDtcXG5cIiArXG4gICAgICAnd2hpbGUgKCsrYXJnc0luZGV4IDwgYXJnc0xlbmd0aCkge1xcbicgK1xuICAgICAgJyAgaXRlcmFibGUgPSBhcmdzW2FyZ3NJbmRleF07XFxuJyArXG4gICAgICAnICBpZiAoaXRlcmFibGUgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIGl0ZXJhYmxlXSkgeycsXG4gICAgJ2xvb3AnOiBcImlmICh0eXBlb2YgcmVzdWx0W2luZGV4XSA9PSAndW5kZWZpbmVkJykgcmVzdWx0W2luZGV4XSA9IGl0ZXJhYmxlW2luZGV4XVwiLFxuICAgICdib3R0b20nOiAnICB9XFxufSdcbiAgfTtcblxuICAvKiogUmV1c2FibGUgaXRlcmF0b3Igb3B0aW9ucyBzaGFyZWQgYnkgYGVhY2hgLCBgZm9ySW5gLCBhbmQgYGZvck93bmAgKi9cbiAgdmFyIGVhY2hJdGVyYXRvck9wdGlvbnMgPSB7XG4gICAgJ2FyZ3MnOiAnY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcnLFxuICAgICd0b3AnOiBcImNhbGxiYWNrID0gY2FsbGJhY2sgJiYgdHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCcgPyBjYWxsYmFjayA6IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKVwiLFxuICAgICdhcnJheXMnOiBcInR5cGVvZiBsZW5ndGggPT0gJ251bWJlcidcIixcbiAgICAnbG9vcCc6ICdpZiAoY2FsbGJhY2soaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgY29sbGVjdGlvbikgPT09IGZhbHNlKSByZXR1cm4gcmVzdWx0J1xuICB9O1xuXG4gIC8qKiBSZXVzYWJsZSBpdGVyYXRvciBvcHRpb25zIGZvciBgZm9ySW5gIGFuZCBgZm9yT3duYCAqL1xuICB2YXIgZm9yT3duSXRlcmF0b3JPcHRpb25zID0ge1xuICAgICd0b3AnOiAnaWYgKCFvYmplY3RUeXBlc1t0eXBlb2YgaXRlcmFibGVdKSByZXR1cm4gcmVzdWx0O1xcbicgKyBlYWNoSXRlcmF0b3JPcHRpb25zLnRvcCxcbiAgICAnYXJyYXlzJzogZmFsc2VcbiAgfTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIG9wdGltaXplZCB0byBzZWFyY2ggbGFyZ2UgYXJyYXlzIGZvciBhIGdpdmVuIGB2YWx1ZWAsXG4gICAqIHN0YXJ0aW5nIGF0IGBmcm9tSW5kZXhgLCB1c2luZyBzdHJpY3QgZXF1YWxpdHkgZm9yIGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2xhcmdlU2l6ZT0zMF0gVGhlIGxlbmd0aCBhdCB3aGljaCBhbiBhcnJheSBpcyBjb25zaWRlcmVkIGxhcmdlLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAgICovXG4gIGZ1bmN0aW9uIGNhY2hlZENvbnRhaW5zKGFycmF5LCBmcm9tSW5kZXgsIGxhcmdlU2l6ZSkge1xuICAgIGZyb21JbmRleCB8fCAoZnJvbUluZGV4ID0gMCk7XG5cbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgICBpc0xhcmdlID0gKGxlbmd0aCAtIGZyb21JbmRleCkgPj0gKGxhcmdlU2l6ZSB8fCBsYXJnZUFycmF5U2l6ZSk7XG5cbiAgICBpZiAoaXNMYXJnZSkge1xuICAgICAgdmFyIGNhY2hlID0ge30sXG4gICAgICAgICAgaW5kZXggPSBmcm9tSW5kZXggLSAxO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAvLyBtYW51YWxseSBjb2VyY2UgYHZhbHVlYCB0byBhIHN0cmluZyBiZWNhdXNlIGBoYXNPd25Qcm9wZXJ0eWAsIGluIHNvbWVcbiAgICAgICAgLy8gb2xkZXIgdmVyc2lvbnMgb2YgRmlyZWZveCwgY29lcmNlcyBvYmplY3RzIGluY29ycmVjdGx5XG4gICAgICAgIHZhciBrZXkgPSBhcnJheVtpbmRleF0gKyAnJztcbiAgICAgICAgKGhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGtleSkgPyBjYWNoZVtrZXldIDogKGNhY2hlW2tleV0gPSBbXSkpLnB1c2goYXJyYXlbaW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAoaXNMYXJnZSkge1xuICAgICAgICB2YXIga2V5ID0gdmFsdWUgKyAnJztcbiAgICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGtleSkgJiYgaW5kZXhPZihjYWNoZVtrZXldLCB2YWx1ZSkgPiAtMTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSA+IC0xO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IGBfLm1heGAgYW5kIGBfLm1pbmAgYXMgdGhlIGRlZmF1bHQgYGNhbGxiYWNrYCB3aGVuIGEgZ2l2ZW5cbiAgICogYGNvbGxlY3Rpb25gIGlzIGEgc3RyaW5nIHZhbHVlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdmFsdWUgVGhlIGNoYXJhY3RlciB0byBpbnNwZWN0LlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBjb2RlIHVuaXQgb2YgZ2l2ZW4gY2hhcmFjdGVyLlxuICAgKi9cbiAgZnVuY3Rpb24gY2hhckF0Q2FsbGJhY2sodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuY2hhckNvZGVBdCgwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IGBzb3J0QnlgIHRvIGNvbXBhcmUgdHJhbnNmb3JtZWQgYGNvbGxlY3Rpb25gIHZhbHVlcywgc3RhYmxlIHNvcnRpbmdcbiAgICogdGhlbSBpbiBhc2NlbmRpbmcgb3JkZXIuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gY29tcGFyZSB0byBgYmAuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29tcGFyZSB0byBgYWAuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIHNvcnQgb3JkZXIgaW5kaWNhdG9yIG9mIGAxYCBvciBgLTFgLlxuICAgKi9cbiAgZnVuY3Rpb24gY29tcGFyZUFzY2VuZGluZyhhLCBiKSB7XG4gICAgdmFyIGFpID0gYS5pbmRleCxcbiAgICAgICAgYmkgPSBiLmluZGV4O1xuXG4gICAgYSA9IGEuY3JpdGVyaWE7XG4gICAgYiA9IGIuY3JpdGVyaWE7XG5cbiAgICAvLyBlbnN1cmUgYSBzdGFibGUgc29ydCBpbiBWOCBhbmQgb3RoZXIgZW5naW5lc1xuICAgIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTkwXG4gICAgaWYgKGEgIT09IGIpIHtcbiAgICAgIGlmIChhID4gYiB8fCB0eXBlb2YgYSA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gMTtcbiAgICAgIH1cbiAgICAgIGlmIChhIDwgYiB8fCB0eXBlb2YgYiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhaSA8IGJpID8gLTEgOiAxO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCwgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmdcbiAgICogb2YgYHRoaXNBcmdgIGFuZCBwcmVwZW5kcyBhbnkgYHBhcnRpYWxBcmdzYCB0byB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGVcbiAgICogYm91bmQgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kIG9yIHRoZSBtZXRob2QgbmFtZS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcnRpYWxBcmdzIEFuIGFycmF5IG9mIGFyZ3VtZW50cyB0byBiZSBwYXJ0aWFsbHkgYXBwbGllZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtyaWdodEluZGljYXRvcl0gVXNlZCB0byBpbmRpY2F0ZSBwYXJ0aWFsbHkgYXBwbHlpbmcgYXJndW1lbnRzIGZyb20gdGhlIHJpZ2h0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBib3VuZCBmdW5jdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZUJvdW5kKGZ1bmMsIHRoaXNBcmcsIHBhcnRpYWxBcmdzLCByaWdodEluZGljYXRvcikge1xuICAgIHZhciBpc0Z1bmMgPSBpc0Z1bmN0aW9uKGZ1bmMpLFxuICAgICAgICBpc1BhcnRpYWwgPSAhcGFydGlhbEFyZ3MsXG4gICAgICAgIGtleSA9IHRoaXNBcmc7XG5cbiAgICAvLyBqdWdnbGUgYXJndW1lbnRzXG4gICAgaWYgKGlzUGFydGlhbCkge1xuICAgICAgcGFydGlhbEFyZ3MgPSB0aGlzQXJnO1xuICAgIH1cbiAgICBpZiAoIWlzRnVuYykge1xuICAgICAgdGhpc0FyZyA9IGZ1bmM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYm91bmQoKSB7XG4gICAgICAvLyBgRnVuY3Rpb24jYmluZGAgc3BlY1xuICAgICAgLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMy40LjVcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgIHRoaXNCaW5kaW5nID0gaXNQYXJ0aWFsID8gdGhpcyA6IHRoaXNBcmc7XG5cbiAgICAgIGlmICghaXNGdW5jKSB7XG4gICAgICAgIGZ1bmMgPSB0aGlzQXJnW2tleV07XG4gICAgICB9XG4gICAgICBpZiAocGFydGlhbEFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGFyZ3MgPSBhcmdzLmxlbmd0aFxuICAgICAgICAgID8gKGFyZ3MgPSBzbGljZShhcmdzKSwgcmlnaHRJbmRpY2F0b3IgPyBhcmdzLmNvbmNhdChwYXJ0aWFsQXJncykgOiBwYXJ0aWFsQXJncy5jb25jYXQoYXJncykpXG4gICAgICAgICAgOiBwYXJ0aWFsQXJncztcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgLy8gZW5zdXJlIGBuZXcgYm91bmRgIGlzIGFuIGluc3RhbmNlIG9mIGBib3VuZGAgYW5kIGBmdW5jYFxuICAgICAgICBub29wLnByb3RvdHlwZSA9IGZ1bmMucHJvdG90eXBlO1xuICAgICAgICB0aGlzQmluZGluZyA9IG5ldyBub29wO1xuICAgICAgICBub29wLnByb3RvdHlwZSA9IG51bGw7XG5cbiAgICAgICAgLy8gbWltaWMgdGhlIGNvbnN0cnVjdG9yJ3MgYHJldHVybmAgYmVoYXZpb3JcbiAgICAgICAgLy8gaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTMuMi4yXG4gICAgICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNCaW5kaW5nLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0KHJlc3VsdCkgPyByZXN1bHQgOiB0aGlzQmluZGluZztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXNCaW5kaW5nLCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIGJvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2R1Y2VzIGEgY2FsbGJhY2sgYm91bmQgdG8gYW4gb3B0aW9uYWwgYHRoaXNBcmdgLiBJZiBgZnVuY2AgaXMgYSBwcm9wZXJ0eVxuICAgKiBuYW1lLCB0aGUgY3JlYXRlZCBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgZm9yIGEgZ2l2ZW4gZWxlbWVudC5cbiAgICogSWYgYGZ1bmNgIGlzIGFuIG9iamVjdCwgdGhlIGNyZWF0ZWQgY2FsbGJhY2sgd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50c1xuICAgKiB0aGF0IGNvbnRhaW4gdGhlIGVxdWl2YWxlbnQgb2JqZWN0IHByb3BlcnRpZXMsIG90aGVyd2lzZSBpdCB3aWxsIHJldHVybiBgZmFsc2VgLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge01peGVkfSBbZnVuYz1pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYSBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY3JlYXRlZCBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IFthcmdDb3VudD0zXSBUaGUgbnVtYmVyIG9mIGFyZ3VtZW50cyB0aGUgY2FsbGJhY2sgYWNjZXB0cy5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGEgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVDYWxsYmFjayhmdW5jLCB0aGlzQXJnLCBhcmdDb3VudCkge1xuICAgIGlmIChmdW5jID09IG51bGwpIHtcbiAgICAgIHJldHVybiBpZGVudGl0eTtcbiAgICB9XG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgZnVuYztcbiAgICBpZiAodHlwZSAhPSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAodHlwZSAhPSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIG9iamVjdFtmdW5jXTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wcyA9IGtleXMoZnVuYyk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICAgIHZhciBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgICAgaWYgKCEocmVzdWx0ID0gaXNFcXVhbChvYmplY3RbcHJvcHNbbGVuZ3RoXV0sIGZ1bmNbcHJvcHNbbGVuZ3RoXV0sIGluZGljYXRvck9iamVjdCkpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpc0FyZyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGFyZ0NvdW50ID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKGFyZ0NvdW50ID09PSAyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhLCBiKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChhcmdDb3VudCA9PT0gNCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhY2N1bXVsYXRvciwgdmFsdWUsIGluZGV4LCBvYmplY3QpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgdmFsdWUsIGluZGV4LCBvYmplY3QpO1xuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmM7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBjb21waWxlZCBpdGVyYXRpb24gZnVuY3Rpb25zLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMxLCBvcHRpb25zMiwgLi4uXSBUaGUgY29tcGlsZSBvcHRpb25zIG9iamVjdChzKS5cbiAgICogIGFycmF5cyAtIEEgc3RyaW5nIG9mIGNvZGUgdG8gZGV0ZXJtaW5lIGlmIHRoZSBpdGVyYWJsZSBpcyBhbiBhcnJheSBvciBhcnJheS1saWtlLlxuICAgKiAgdXNlSGFzIC0gQSBib29sZWFuIHRvIHNwZWNpZnkgdXNpbmcgYGhhc093blByb3BlcnR5YCBjaGVja3MgaW4gdGhlIG9iamVjdCBsb29wLlxuICAgKiAgYXJncyAtIEEgc3RyaW5nIG9mIGNvbW1hIHNlcGFyYXRlZCBhcmd1bWVudHMgdGhlIGl0ZXJhdGlvbiBmdW5jdGlvbiB3aWxsIGFjY2VwdC5cbiAgICogIHRvcCAtIEEgc3RyaW5nIG9mIGNvZGUgdG8gZXhlY3V0ZSBiZWZvcmUgdGhlIGl0ZXJhdGlvbiBicmFuY2hlcy5cbiAgICogIGxvb3AgLSBBIHN0cmluZyBvZiBjb2RlIHRvIGV4ZWN1dGUgaW4gdGhlIG9iamVjdCBsb29wLlxuICAgKiAgYm90dG9tIC0gQSBzdHJpbmcgb2YgY29kZSB0byBleGVjdXRlIGFmdGVyIHRoZSBpdGVyYXRpb24gYnJhbmNoZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgY29tcGlsZWQgZnVuY3Rpb24uXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVJdGVyYXRvcigpIHtcbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgIC8vIHN1cHBvcnQgcHJvcGVydGllc1xuICAgICAgJ2hhc0RvbnRFbnVtQnVnJzogaGFzRG9udEVudW1CdWcsXG4gICAgICAnaGFzRW51bVByb3RvdHlwZSc6IGhhc0VudW1Qcm90b3R5cGUsXG4gICAgICAnaXNLZXlzRmFzdCc6IGlzS2V5c0Zhc3QsXG4gICAgICAnbm9uRW51bUFyZ3MnOiBub25FbnVtQXJncyxcbiAgICAgICdub0NoYXJCeUluZGV4Jzogbm9DaGFyQnlJbmRleCxcbiAgICAgICdzaGFkb3dlZCc6IHNoYWRvd2VkLFxuXG4gICAgICAvLyBpdGVyYXRvciBvcHRpb25zXG4gICAgICAnYXJyYXlzJzogJ2lzQXJyYXkoaXRlcmFibGUpJyxcbiAgICAgICdib3R0b20nOiAnJyxcbiAgICAgICdsb29wJzogJycsXG4gICAgICAndG9wJzogJycsXG4gICAgICAndXNlSGFzJzogdHJ1ZVxuICAgIH07XG5cbiAgICAvLyBtZXJnZSBvcHRpb25zIGludG8gYSB0ZW1wbGF0ZSBkYXRhIG9iamVjdFxuICAgIGZvciAodmFyIG9iamVjdCwgaW5kZXggPSAwOyBvYmplY3QgPSBhcmd1bWVudHNbaW5kZXhdOyBpbmRleCsrKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGRhdGFba2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgYXJncyA9IGRhdGEuYXJncztcbiAgICBkYXRhLmZpcnN0QXJnID0gL15bXixdKy8uZXhlYyhhcmdzKVswXTtcblxuICAgIC8vIGNyZWF0ZSB0aGUgZnVuY3Rpb24gZmFjdG9yeVxuICAgIHZhciBmYWN0b3J5ID0gRnVuY3Rpb24oXG4gICAgICAgICdjcmVhdGVDYWxsYmFjaywgaGFzT3duUHJvcGVydHksIGlzQXJndW1lbnRzLCBpc0FycmF5LCBpc1N0cmluZywgJyArXG4gICAgICAgICdvYmplY3RUeXBlcywgbmF0aXZlS2V5cycsXG4gICAgICAncmV0dXJuIGZ1bmN0aW9uKCcgKyBhcmdzICsgJykge1xcbicgKyBpdGVyYXRvclRlbXBsYXRlKGRhdGEpICsgJ1xcbn0nXG4gICAgKTtcbiAgICAvLyByZXR1cm4gdGhlIGNvbXBpbGVkIGZ1bmN0aW9uXG4gICAgcmV0dXJuIGZhY3RvcnkoXG4gICAgICBjcmVhdGVDYWxsYmFjaywgaGFzT3duUHJvcGVydHksIGlzQXJndW1lbnRzLCBpc0FycmF5LCBpc1N0cmluZyxcbiAgICAgIG9iamVjdFR5cGVzLCBuYXRpdmVLZXlzXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIGNvbXBpbGVkIHRvIGl0ZXJhdGUgYGFyZ3VtZW50c2Agb2JqZWN0cywgYXJyYXlzLCBvYmplY3RzLCBhbmRcbiAgICogc3RyaW5ncyBjb25zaXN0ZW5seSBhY3Jvc3MgZW52aXJvbm1lbnRzLCBleGVjdXRpbmcgdGhlIGBjYWxsYmFja2AgZm9yIGVhY2hcbiAgICogZWxlbWVudCBpbiB0aGUgYGNvbGxlY3Rpb25gLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAgICogd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS4gQ2FsbGJhY2tzIG1heSBleGl0XG4gICAqIGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAdHlwZSBGdW5jdGlvblxuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fFN0cmluZ30gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gICAqL1xuICB2YXIgZWFjaCA9IGNyZWF0ZUl0ZXJhdG9yKGVhY2hJdGVyYXRvck9wdGlvbnMpO1xuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IGB0ZW1wbGF0ZWAgdG8gZXNjYXBlIGNoYXJhY3RlcnMgZm9yIGluY2x1c2lvbiBpbiBjb21waWxlZFxuICAgKiBzdHJpbmcgbGl0ZXJhbHMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXRjaCBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gZXNjYXBlLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIGNoYXJhY3Rlci5cbiAgICovXG4gIGZ1bmN0aW9uIGVzY2FwZVN0cmluZ0NoYXIobWF0Y2gpIHtcbiAgICByZXR1cm4gJ1xcXFwnICsgc3RyaW5nRXNjYXBlc1ttYXRjaF07XG4gIH1cblxuICAvKipcbiAgICogVXNlZCBieSBgZXNjYXBlYCB0byBjb252ZXJ0IGNoYXJhY3RlcnMgdG8gSFRNTCBlbnRpdGllcy5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1hdGNoIFRoZSBtYXRjaGVkIGNoYXJhY3RlciB0byBlc2NhcGUuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICAgKi9cbiAgZnVuY3Rpb24gZXNjYXBlSHRtbENoYXIobWF0Y2gpIHtcbiAgICByZXR1cm4gaHRtbEVzY2FwZXNbbWF0Y2hdO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgRE9NIG5vZGUgaW4gSUUgPCA5LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYHZhbHVlYCBpcyBhIERPTSBub2RlLCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBpc05vZGUodmFsdWUpIHtcbiAgICAvLyBJRSA8IDkgcHJlc2VudHMgRE9NIG5vZGVzIGFzIGBPYmplY3RgIG9iamVjdHMgZXhjZXB0IHRoZXkgaGF2ZSBgdG9TdHJpbmdgXG4gICAgLy8gbWV0aG9kcyB0aGF0IGFyZSBgdHlwZW9mYCBcInN0cmluZ1wiIGFuZCBzdGlsbCBjYW4gY29lcmNlIG5vZGVzIHRvIHN0cmluZ3NcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicgJiYgdHlwZW9mICh2YWx1ZSArICcnKSA9PSAnc3RyaW5nJztcbiAgfVxuXG4gIC8qKlxuICAgKiBBIG5vLW9wZXJhdGlvbiBmdW5jdGlvbi5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIG5vb3AoKSB7XG4gICAgLy8gbm8gb3BlcmF0aW9uIHBlcmZvcm1lZFxuICB9XG5cbiAgLyoqXG4gICAqIFNsaWNlcyB0aGUgYGNvbGxlY3Rpb25gIGZyb20gdGhlIGBzdGFydGAgaW5kZXggdXAgdG8sIGJ1dCBub3QgaW5jbHVkaW5nLFxuICAgKiB0aGUgYGVuZGAgaW5kZXguXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgZnVuY3Rpb24gaXMgdXNlZCwgaW5zdGVhZCBvZiBgQXJyYXkjc2xpY2VgLCB0byBzdXBwb3J0IG5vZGUgbGlzdHNcbiAgICogaW4gSUUgPCA5IGFuZCB0byBlbnN1cmUgZGVuc2UgYXJyYXlzIGFyZSByZXR1cm5lZC5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIHNsaWNlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IGluZGV4LlxuICAgKiBAcGFyYW0ge051bWJlcn0gZW5kIFRoZSBlbmQgaW5kZXguXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gc2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgICBzdGFydCB8fCAoc3RhcnQgPSAwKTtcbiAgICBpZiAodHlwZW9mIGVuZCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgZW5kID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gZW5kIC0gc3RhcnQgfHwgMCxcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIGJ5IGB1bmVzY2FwZWAgdG8gY29udmVydCBIVE1MIGVudGl0aWVzIHRvIGNoYXJhY3RlcnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXRjaCBUaGUgbWF0Y2hlZCBjaGFyYWN0ZXIgdG8gdW5lc2NhcGUuXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHVuZXNjYXBlZCBjaGFyYWN0ZXIuXG4gICAqL1xuICBmdW5jdGlvbiB1bmVzY2FwZUh0bWxDaGFyKG1hdGNoKSB7XG4gICAgcmV0dXJuIGh0bWxVbmVzY2FwZXNbbWF0Y2hdO1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIChmdW5jdGlvbigpIHsgcmV0dXJuIF8uaXNBcmd1bWVudHMoYXJndW1lbnRzKTsgfSkoMSwgMiwgMyk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc0NsYXNzO1xuICB9XG4gIC8vIGZhbGxiYWNrIGZvciBicm93c2VycyB0aGF0IGNhbid0IGRldGVjdCBgYXJndW1lbnRzYCBvYmplY3RzIGJ5IFtbQ2xhc3NdXVxuICBpZiAobm9BcmdzQ2xhc3MpIHtcbiAgICBpc0FyZ3VtZW50cyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPyBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgOiBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIG92ZXIgYG9iamVjdGAncyBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMsIGV4ZWN1dGluZ1xuICAgKiB0aGUgYGNhbGxiYWNrYCBmb3IgZWFjaCBwcm9wZXJ0eS4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZFxuICAgKiBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGtleSwgb2JqZWN0KS4gQ2FsbGJhY2tzIG1heSBleGl0IGl0ZXJhdGlvblxuICAgKiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIERvZyhuYW1lKSB7XG4gICAqICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICogfVxuICAgKlxuICAgKiBEb2cucHJvdG90eXBlLmJhcmsgPSBmdW5jdGlvbigpIHtcbiAgICogICBhbGVydCgnV29vZiwgd29vZiEnKTtcbiAgICogfTtcbiAgICpcbiAgICogXy5mb3JJbihuZXcgRG9nKCdEYWdueScpLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAqICAgYWxlcnQoa2V5KTtcbiAgICogfSk7XG4gICAqIC8vID0+IGFsZXJ0cyAnbmFtZScgYW5kICdiYXJrJyAob3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gICAqL1xuICB2YXIgZm9ySW4gPSBjcmVhdGVJdGVyYXRvcihlYWNoSXRlcmF0b3JPcHRpb25zLCBmb3JPd25JdGVyYXRvck9wdGlvbnMsIHtcbiAgICAndXNlSGFzJzogZmFsc2VcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIG92ZXIgYW4gb2JqZWN0J3Mgb3duIGVudW1lcmFibGUgcHJvcGVydGllcywgZXhlY3V0aW5nIHRoZSBgY2FsbGJhY2tgXG4gICAqIGZvciBlYWNoIHByb3BlcnR5LiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZVxuICAgKiBhcmd1bWVudHM7ICh2YWx1ZSwga2V5LCBvYmplY3QpLiBDYWxsYmFja3MgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHlcbiAgICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHR5cGUgRnVuY3Rpb25cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5mb3JPd24oeyAnMCc6ICd6ZXJvJywgJzEnOiAnb25lJywgJ2xlbmd0aCc6IDIgfSwgZnVuY3Rpb24obnVtLCBrZXkpIHtcbiAgICogICBhbGVydChrZXkpO1xuICAgKiB9KTtcbiAgICogLy8gPT4gYWxlcnRzICcwJywgJzEnLCBhbmQgJ2xlbmd0aCcgKG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKi9cbiAgdmFyIGZvck93biA9IGNyZWF0ZUl0ZXJhdG9yKGVhY2hJdGVyYXRvck9wdGlvbnMsIGZvck93bkl0ZXJhdG9yT3B0aW9ucyk7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAoZnVuY3Rpb24oKSB7IHJldHVybiBfLmlzQXJyYXkoYXJndW1lbnRzKTsgfSkoKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIHZhciBpc0FycmF5ID0gbmF0aXZlSXNBcnJheSB8fCBmdW5jdGlvbih2YWx1ZSkge1xuICAgIC8vIGBpbnN0YW5jZW9mYCBtYXkgY2F1c2UgYSBtZW1vcnkgbGVhayBpbiBJRSA3IGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdFxuICAgIC8vIGh0dHA6Ly9hamF4aWFuLmNvbS9hcmNoaXZlcy93b3JraW5nLWFyb3VuZy10aGUtaW5zdGFuY2VvZi1tZW1vcnktbGVha1xuICAgIHJldHVybiAoYXJnc0FyZU9iamVjdHMgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheSkgfHwgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJyYXlDbGFzcztcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBjb21wb3NlZCBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5rZXlzKHsgJ29uZSc6IDEsICd0d28nOiAyLCAndGhyZWUnOiAzIH0pO1xuICAgKiAvLyA9PiBbJ29uZScsICd0d28nLCAndGhyZWUnXSAob3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gICAqL1xuICB2YXIga2V5cyA9ICFuYXRpdmVLZXlzID8gc2hpbUtleXMgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKChoYXNFbnVtUHJvdG90eXBlICYmIHR5cGVvZiBvYmplY3QgPT0gJ2Z1bmN0aW9uJykgfHxcbiAgICAgICAgKG5vbkVudW1BcmdzICYmIG9iamVjdC5sZW5ndGggJiYgaXNBcmd1bWVudHMob2JqZWN0KSkpIHtcbiAgICAgIHJldHVybiBzaGltS2V5cyhvYmplY3QpO1xuICAgIH1cbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uIG9mIGBpc1BsYWluT2JqZWN0YCB0aGF0IGNoZWNrcyBpZiBhIGdpdmVuIGB2YWx1ZWBcbiAgICogaXMgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLCBhc3N1bWluZyBvYmplY3RzIGNyZWF0ZWRcbiAgICogYnkgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yIGhhdmUgbm8gaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcyBhbmQgdGhhdFxuICAgKiB0aGVyZSBhcmUgbm8gYE9iamVjdC5wcm90b3R5cGVgIGV4dGVuc2lvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gICAqL1xuICBmdW5jdGlvbiBzaGltSXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICAgIC8vIGF2b2lkIG5vbi1vYmplY3RzIGFuZCBmYWxzZSBwb3NpdGl2ZXMgZm9yIGBhcmd1bWVudHNgIG9iamVjdHNcbiAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgaWYgKCEodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8vIGNoZWNrIHRoYXQgdGhlIGNvbnN0cnVjdG9yIGlzIGBPYmplY3RgIChpLmUuIGBPYmplY3QgaW5zdGFuY2VvZiBPYmplY3RgKVxuICAgIHZhciBjdG9yID0gdmFsdWUuY29uc3RydWN0b3I7XG4gICAgaWYgKCghaXNGdW5jdGlvbihjdG9yKSAmJiAoIW5vTm9kZUNsYXNzIHx8ICFpc05vZGUodmFsdWUpKSkgfHwgY3RvciBpbnN0YW5jZW9mIGN0b3IpIHtcbiAgICAgIC8vIElFIDwgOSBpdGVyYXRlcyBpbmhlcml0ZWQgcHJvcGVydGllcyBiZWZvcmUgb3duIHByb3BlcnRpZXMuIElmIHRoZSBmaXJzdFxuICAgICAgLy8gaXRlcmF0ZWQgcHJvcGVydHkgaXMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZFxuICAgICAgLy8gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICAgICAgaWYgKGl0ZXJhdGVzT3duTGFzdCkge1xuICAgICAgICBmb3JJbih2YWx1ZSwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXN1bHQgPT09IGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gSW4gbW9zdCBlbnZpcm9ubWVudHMgYW4gb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMgYXJlIGl0ZXJhdGVkIGJlZm9yZVxuICAgICAgLy8gaXRzIGluaGVyaXRlZCBwcm9wZXJ0aWVzLiBJZiB0aGUgbGFzdCBpdGVyYXRlZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3Qnc1xuICAgICAgLy8gb3duIHByb3BlcnR5IHRoZW4gdGhlcmUgYXJlIG5vIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gICAgICBmb3JJbih2YWx1ZSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICByZXN1bHQgPSBrZXk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQgPT09IGZhbHNlIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiBvZiBgT2JqZWN0LmtleXNgIHRoYXQgcHJvZHVjZXMgYW4gYXJyYXkgb2YgdGhlXG4gICAqIGdpdmVuIG9iamVjdCdzIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICAgKi9cbiAgZnVuY3Rpb24gc2hpbUtleXMob2JqZWN0KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvck93bihvYmplY3QsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIGNvbnZlcnQgY2hhcmFjdGVycyB0byBIVE1MIGVudGl0aWVzOlxuICAgKlxuICAgKiBUaG91Z2ggdGhlIGA+YCBjaGFyYWN0ZXIgaXMgZXNjYXBlZCBmb3Igc3ltbWV0cnksIGNoYXJhY3RlcnMgbGlrZSBgPmAgYW5kIGAvYFxuICAgKiBkb24ndCByZXF1aXJlIGVzY2FwaW5nIGluIEhUTUwgYW5kIGhhdmUgbm8gc3BlY2lhbCBtZWFuaW5nIHVubGVzcyB0aGV5J3JlIHBhcnRcbiAgICogb2YgYSB0YWcgb3IgYW4gdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlLlxuICAgKiBodHRwOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9hbWJpZ3VvdXMtYW1wZXJzYW5kcyAodW5kZXIgXCJzZW1pLXJlbGF0ZWQgZnVuIGZhY3RcIilcbiAgICovXG4gIHZhciBodG1sRXNjYXBlcyA9IHtcbiAgICAnJic6ICcmYW1wOycsXG4gICAgJzwnOiAnJmx0OycsXG4gICAgJz4nOiAnJmd0OycsXG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OydcbiAgfTtcblxuICAvKiogVXNlZCB0byBjb252ZXJ0IEhUTUwgZW50aXRpZXMgdG8gY2hhcmFjdGVycyAqL1xuICB2YXIgaHRtbFVuZXNjYXBlcyA9IGludmVydChodG1sRXNjYXBlcyk7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIEFzc2lnbnMgb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0KHMpIHRvIHRoZSBkZXN0aW5hdGlvblxuICAgKiBvYmplY3QuIFN1YnNlcXVlbnQgc291cmNlcyB3aWxsIG92ZXJ3cml0ZSBwcm9wZXJ5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzXG4gICAqIHNvdXJjZXMuIElmIGEgYGNhbGxiYWNrYCBmdW5jdGlvbiBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgZXhlY3V0ZWQgdG8gcHJvZHVjZVxuICAgKiB0aGUgYXNzaWduZWQgdmFsdWVzLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aFxuICAgKiB0d28gYXJndW1lbnRzOyAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlKS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAdHlwZSBGdW5jdGlvblxuICAgKiBAYWxpYXMgZXh0ZW5kXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtzb3VyY2UxLCBzb3VyY2UyLCAuLi5dIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmluZyB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmFzc2lnbih7ICduYW1lJzogJ21vZScgfSwgeyAnYWdlJzogNDAgfSk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH1cbiAgICpcbiAgICogdmFyIGRlZmF1bHRzID0gXy5wYXJ0aWFsUmlnaHQoXy5hc3NpZ24sIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICogICByZXR1cm4gdHlwZW9mIGEgPT0gJ3VuZGVmaW5lZCcgPyBiIDogYTtcbiAgICogfSk7XG4gICAqXG4gICAqIHZhciBmb29kID0geyAnbmFtZSc6ICdhcHBsZScgfTtcbiAgICogZGVmYXVsdHMoZm9vZCwgeyAnbmFtZSc6ICdiYW5hbmEnLCAndHlwZSc6ICdmcnVpdCcgfSk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnYXBwbGUnLCAndHlwZSc6ICdmcnVpdCcgfVxuICAgKi9cbiAgdmFyIGFzc2lnbiA9IGNyZWF0ZUl0ZXJhdG9yKGRlZmF1bHRzSXRlcmF0b3JPcHRpb25zLCB7XG4gICAgJ3RvcCc6XG4gICAgICBkZWZhdWx0c0l0ZXJhdG9yT3B0aW9ucy50b3AucmVwbGFjZSgnOycsXG4gICAgICAgICc7XFxuJyArXG4gICAgICAgIFwiaWYgKGFyZ3NMZW5ndGggPiAzICYmIHR5cGVvZiBhcmdzW2FyZ3NMZW5ndGggLSAyXSA9PSAnZnVuY3Rpb24nKSB7XFxuXCIgK1xuICAgICAgICAnICB2YXIgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhhcmdzWy0tYXJnc0xlbmd0aCAtIDFdLCBhcmdzW2FyZ3NMZW5ndGgtLV0sIDIpO1xcbicgK1xuICAgICAgICBcIn0gZWxzZSBpZiAoYXJnc0xlbmd0aCA+IDIgJiYgdHlwZW9mIGFyZ3NbYXJnc0xlbmd0aCAtIDFdID09ICdmdW5jdGlvbicpIHtcXG5cIiArXG4gICAgICAgICcgIGNhbGxiYWNrID0gYXJnc1stLWFyZ3NMZW5ndGhdO1xcbicgK1xuICAgICAgICAnfSdcbiAgICAgICksXG4gICAgJ2xvb3AnOiAncmVzdWx0W2luZGV4XSA9IGNhbGxiYWNrID8gY2FsbGJhY2socmVzdWx0W2luZGV4XSwgaXRlcmFibGVbaW5kZXhdKSA6IGl0ZXJhYmxlW2luZGV4XSdcbiAgfSk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdmFsdWVgLiBJZiBgZGVlcGAgaXMgYHRydWVgLCBuZXN0ZWQgb2JqZWN0cyB3aWxsIGFsc29cbiAgICogYmUgY2xvbmVkLCBvdGhlcndpc2UgdGhleSB3aWxsIGJlIGFzc2lnbmVkIGJ5IHJlZmVyZW5jZS4gSWYgYSBgY2FsbGJhY2tgXG4gICAqIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSBleGVjdXRlZCB0byBwcm9kdWNlIHRoZSBjbG9uZWQgdmFsdWVzLiBJZlxuICAgKiBgY2FsbGJhY2tgIHJldHVybnMgYHVuZGVmaW5lZGAsIGNsb25pbmcgd2lsbCBiZSBoYW5kbGVkIGJ5IHRoZSBtZXRob2QgaW5zdGVhZC5cbiAgICogVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggb25lIGFyZ3VtZW50OyAodmFsdWUpLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBbZGVlcD1mYWxzZV0gQSBmbGFnIHRvIGluZGljYXRlIGEgZGVlcCBjbG9uZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcgdmFsdWVzLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEBwYXJhbS0ge0FycmF5fSBbc3RhY2tBPVtdXSBJbnRlcm5hbGx5IHVzZWQgdG8gdHJhY2sgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICAgKiBAcGFyYW0tIHtBcnJheX0gW3N0YWNrQj1bXV0gSW50ZXJuYWxseSB1c2VkIHRvIGFzc29jaWF0ZSBjbG9uZXMgd2l0aCBzb3VyY2UgY291bnRlcnBhcnRzLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGNsb25lZCBgdmFsdWVgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiB2YXIgc2hhbGxvdyA9IF8uY2xvbmUoc3Rvb2dlcyk7XG4gICAqIHNoYWxsb3dbMF0gPT09IHN0b29nZXNbMF07XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogdmFyIGRlZXAgPSBfLmNsb25lKHN0b29nZXMsIHRydWUpO1xuICAgKiBkZWVwWzBdID09PSBzdG9vZ2VzWzBdO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLm1peGluKHtcbiAgICogICAnY2xvbmUnOiBfLnBhcnRpYWxSaWdodChfLmNsb25lLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgKiAgICAgcmV0dXJuIF8uaXNFbGVtZW50KHZhbHVlKSA/IHZhbHVlLmNsb25lTm9kZShmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAqICAgfSlcbiAgICogfSk7XG4gICAqXG4gICAqIHZhciBjbG9uZSA9IF8uY2xvbmUoZG9jdW1lbnQuYm9keSk7XG4gICAqIGNsb25lLmNoaWxkTm9kZXMubGVuZ3RoO1xuICAgKiAvLyA9PiAwXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZSh2YWx1ZSwgZGVlcCwgY2FsbGJhY2ssIHRoaXNBcmcsIHN0YWNrQSwgc3RhY2tCKSB7XG4gICAgdmFyIHJlc3VsdCA9IHZhbHVlO1xuXG4gICAgLy8gYWxsb3dzIHdvcmtpbmcgd2l0aCBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcyB3aXRob3V0IHVzaW5nIHRoZWlyIGBjYWxsYmFja2BcbiAgICAvLyBhcmd1bWVudCwgYGluZGV4fGtleWAsIGZvciB0aGlzIG1ldGhvZCdzIGBjYWxsYmFja2BcbiAgICBpZiAodHlwZW9mIGRlZXAgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpc0FyZyA9IGNhbGxiYWNrO1xuICAgICAgY2FsbGJhY2sgPSBkZWVwO1xuICAgICAgZGVlcCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gdHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCcgPyBjYWxsYmFjayA6IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnLCAxKTtcbiAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKHJlc3VsdCk7XG5cbiAgICAgIHZhciBkb25lID0gdHlwZW9mIHJlc3VsdCAhPSAndW5kZWZpbmVkJztcbiAgICAgIGlmICghZG9uZSkge1xuICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaW5zcGVjdCBbW0NsYXNzXV1cbiAgICB2YXIgaXNPYmogPSBpc09iamVjdChyZXN1bHQpO1xuICAgIGlmIChpc09iaikge1xuICAgICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwocmVzdWx0KTtcbiAgICAgIGlmICghY2xvbmVhYmxlQ2xhc3Nlc1tjbGFzc05hbWVdIHx8IChub05vZGVDbGFzcyAmJiBpc05vZGUocmVzdWx0KSkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHZhciBpc0FyciA9IGlzQXJyYXkocmVzdWx0KTtcbiAgICB9XG4gICAgLy8gc2hhbGxvdyBjbG9uZVxuICAgIGlmICghaXNPYmogfHwgIWRlZXApIHtcbiAgICAgIHJldHVybiBpc09iaiAmJiAhZG9uZVxuICAgICAgICA/IChpc0FyciA/IHNsaWNlKHJlc3VsdCkgOiBhc3NpZ24oe30sIHJlc3VsdCkpXG4gICAgICAgIDogcmVzdWx0O1xuICAgIH1cbiAgICB2YXIgY3RvciA9IGN0b3JCeUNsYXNzW2NsYXNzTmFtZV07XG4gICAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAgIGNhc2UgYm9vbENsYXNzOlxuICAgICAgY2FzZSBkYXRlQ2xhc3M6XG4gICAgICAgIHJldHVybiBkb25lID8gcmVzdWx0IDogbmV3IGN0b3IoK3Jlc3VsdCk7XG5cbiAgICAgIGNhc2UgbnVtYmVyQ2xhc3M6XG4gICAgICBjYXNlIHN0cmluZ0NsYXNzOlxuICAgICAgICByZXR1cm4gZG9uZSA/IHJlc3VsdCA6IG5ldyBjdG9yKHJlc3VsdCk7XG5cbiAgICAgIGNhc2UgcmVnZXhwQ2xhc3M6XG4gICAgICAgIHJldHVybiBkb25lID8gcmVzdWx0IDogY3RvcihyZXN1bHQuc291cmNlLCByZUZsYWdzLmV4ZWMocmVzdWx0KSk7XG4gICAgfVxuICAgIC8vIGNoZWNrIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCByZXR1cm4gY29ycmVzcG9uZGluZyBjbG9uZVxuICAgIHN0YWNrQSB8fCAoc3RhY2tBID0gW10pO1xuICAgIHN0YWNrQiB8fCAoc3RhY2tCID0gW10pO1xuXG4gICAgdmFyIGxlbmd0aCA9IHN0YWNrQS5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBpZiAoc3RhY2tBW2xlbmd0aF0gPT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBpbml0IGNsb25lZCBvYmplY3RcbiAgICBpZiAoIWRvbmUpIHtcbiAgICAgIHJlc3VsdCA9IGlzQXJyID8gY3RvcihyZXN1bHQubGVuZ3RoKSA6IHt9O1xuXG4gICAgICAvLyBhZGQgYXJyYXkgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgXG4gICAgICBpZiAoaXNBcnIpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdpbmRleCcpKSB7XG4gICAgICAgICAgcmVzdWx0LmluZGV4ID0gdmFsdWUuaW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdpbnB1dCcpKSB7XG4gICAgICAgICAgcmVzdWx0LmlucHV0ID0gdmFsdWUuaW5wdXQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYWRkIHRoZSBzb3VyY2UgdmFsdWUgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzXG4gICAgLy8gYW5kIGFzc29jaWF0ZSBpdCB3aXRoIGl0cyBjbG9uZVxuICAgIHN0YWNrQS5wdXNoKHZhbHVlKTtcbiAgICBzdGFja0IucHVzaChyZXN1bHQpO1xuXG4gICAgLy8gcmVjdXJzaXZlbHkgcG9wdWxhdGUgY2xvbmUgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKVxuICAgIChpc0FyciA/IGZvckVhY2ggOiBmb3JPd24pKGRvbmUgPyByZXN1bHQgOiB2YWx1ZSwgZnVuY3Rpb24ob2JqVmFsdWUsIGtleSkge1xuICAgICAgcmVzdWx0W2tleV0gPSBjbG9uZShvYmpWYWx1ZSwgZGVlcCwgY2FsbGJhY2ssIHVuZGVmaW5lZCwgc3RhY2tBLCBzdGFja0IpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVlcCBjbG9uZSBvZiBgdmFsdWVgLiBJZiBhIGBjYWxsYmFja2AgZnVuY3Rpb24gaXMgcGFzc2VkLCBpdCB3aWxsXG4gICAqIGJlIGV4ZWN1dGVkIHRvIHByb2R1Y2UgdGhlIGNsb25lZCB2YWx1ZXMuIElmIGBjYWxsYmFja2AgcmV0dXJucyB0aGUgdmFsdWUgaXRcbiAgICogd2FzIHBhc3NlZCwgY2xvbmluZyB3aWxsIGJlIGhhbmRsZWQgYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGNhbGxiYWNrYCBpc1xuICAgKiBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCBvbmUgYXJndW1lbnQ7ICh2YWx1ZSkuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvbiB0aGUgc3RydWN0dXJlZCBjbG9uZSBhbGdvcml0aG0uIEZ1bmN0aW9uc1xuICAgKiBhbmQgRE9NIG5vZGVzIGFyZSAqKm5vdCoqIGNsb25lZC4gVGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBgYXJndW1lbnRzYCBvYmplY3RzIGFuZFxuICAgKiBvYmplY3RzIGNyZWF0ZWQgYnkgY29uc3RydWN0b3JzIG90aGVyIHRoYW4gYE9iamVjdGAgYXJlIGNsb25lZCB0byBwbGFpbiBgT2JqZWN0YCBvYmplY3RzLlxuICAgKiBTZWUgaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvaW5mcmFzdHJ1Y3R1cmUuaHRtbCNpbnRlcm5hbC1zdHJ1Y3R1cmVkLWNsb25pbmctYWxnb3JpdGhtLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBkZWVwIGNsb25lLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZyB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBkZWVwIGNsb25lZCBgdmFsdWVgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiB2YXIgZGVlcCA9IF8uY2xvbmVEZWVwKHN0b29nZXMpO1xuICAgKiBkZWVwWzBdID09PSBzdG9vZ2VzWzBdO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiB2YXIgdmlldyA9IHtcbiAgICogICAnbGFiZWwnOiAnZG9jcycsXG4gICAqICAgJ25vZGUnOiBlbGVtZW50XG4gICAqIH07XG4gICAqXG4gICAqIHZhciBjbG9uZSA9IF8uY2xvbmVEZWVwKHZpZXcsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAqICAgcmV0dXJuIF8uaXNFbGVtZW50KHZhbHVlKSA/IHZhbHVlLmNsb25lTm9kZSh0cnVlKSA6IHZhbHVlO1xuICAgKiB9KTtcbiAgICpcbiAgICogY2xvbmUubm9kZSA9PSB2aWV3Lm5vZGU7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBjbG9uZURlZXAodmFsdWUsIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgcmV0dXJuIGNsb25lKHZhbHVlLCB0cnVlLCBjYWxsYmFjaywgdGhpc0FyZyk7XG4gIH1cblxuICAvKipcbiAgICogQXNzaWducyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3QocykgdG8gdGhlIGRlc3RpbmF0aW9uXG4gICAqIG9iamVjdCBmb3IgYWxsIGRlc3RpbmF0aW9uIHByb3BlcnRpZXMgdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgLiBPbmNlIGFcbiAgICogcHJvcGVydHkgaXMgc2V0LCBhZGRpdGlvbmFsIGRlZmF1bHRzIG9mIHRoZSBzYW1lIHByb3BlcnR5IHdpbGwgYmUgaWdub3JlZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAdHlwZSBGdW5jdGlvblxuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc291cmNlMSwgc291cmNlMiwgLi4uXSBUaGUgc291cmNlIG9iamVjdHMuXG4gICAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBJbnRlcm5hbGx5IHVzZWQgdG8gYWxsb3cgd29ya2luZyB3aXRoIGBfLnJlZHVjZWBcbiAgICogIHdpdGhvdXQgdXNpbmcgaXRzIGNhbGxiYWNrJ3MgYGtleWAgYW5kIGBvYmplY3RgIGFyZ3VtZW50cyBhcyBzb3VyY2VzLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBmb29kID0geyAnbmFtZSc6ICdhcHBsZScgfTtcbiAgICogXy5kZWZhdWx0cyhmb29kLCB7ICduYW1lJzogJ2JhbmFuYScsICd0eXBlJzogJ2ZydWl0JyB9KTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdhcHBsZScsICd0eXBlJzogJ2ZydWl0JyB9XG4gICAqL1xuICB2YXIgZGVmYXVsdHMgPSBjcmVhdGVJdGVyYXRvcihkZWZhdWx0c0l0ZXJhdG9yT3B0aW9ucyk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzb3J0ZWQgYXJyYXkgb2YgYWxsIGVudW1lcmFibGUgcHJvcGVydGllcywgb3duIGFuZCBpbmhlcml0ZWQsXG4gICAqIG9mIGBvYmplY3RgIHRoYXQgaGF2ZSBmdW5jdGlvbiB2YWx1ZXMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIG1ldGhvZHNcbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyB0aGF0IGhhdmUgZnVuY3Rpb24gdmFsdWVzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmZ1bmN0aW9ucyhfKTtcbiAgICogLy8gPT4gWydhbGwnLCAnYW55JywgJ2JpbmQnLCAnYmluZEFsbCcsICdjbG9uZScsICdjb21wYWN0JywgJ2NvbXBvc2UnLCAuLi5dXG4gICAqL1xuICBmdW5jdGlvbiBmdW5jdGlvbnMob2JqZWN0KSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvckluKG9iamVjdCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdC5zb3J0KCk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IGBwcm9wZXJ0eWAgZXhpc3RzIGFuZCBpcyBhIGRpcmVjdCBwcm9wZXJ0eSxcbiAgICogaW5zdGVhZCBvZiBhbiBpbmhlcml0ZWQgcHJvcGVydHkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHkgVGhlIHByb3BlcnR5IHRvIGNoZWNrIGZvci5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGtleSBpcyBhIGRpcmVjdCBwcm9wZXJ0eSwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmhhcyh7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfSwgJ2InKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaGFzKG9iamVjdCwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gb2JqZWN0ID8gaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSA6IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBpbnZlcnRlZCBrZXlzIGFuZCB2YWx1ZXMgb2YgdGhlIGdpdmVuIGBvYmplY3RgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnZlcnQuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNyZWF0ZWQgaW52ZXJ0ZWQgb2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiAgXy5pbnZlcnQoeyAnZmlyc3QnOiAnbW9lJywgJ3NlY29uZCc6ICdsYXJyeScgfSk7XG4gICAqIC8vID0+IHsgJ21vZSc6ICdmaXJzdCcsICdsYXJyeSc6ICdzZWNvbmQnIH0gKG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICAgKi9cbiAgZnVuY3Rpb24gaW52ZXJ0KG9iamVjdCkge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBwcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICByZXN1bHQgPSB7fTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuICAgICAgcmVzdWx0W29iamVjdFtrZXldXSA9IGtleTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJvb2xlYW4gdmFsdWUuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGEgYm9vbGVhbiB2YWx1ZSwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzQm9vbGVhbihudWxsKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gZmFsc2UgfHwgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYm9vbENsYXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZGF0ZS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYSBkYXRlLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNEYXRlKG5ldyBEYXRlKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNEYXRlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSB8fCB0b1N0cmluZy5jYWxsKHZhbHVlKSA9PSBkYXRlQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBET00gZWxlbWVudC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYSBET00gZWxlbWVudCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzRWxlbWVudChkb2N1bWVudC5ib2R5KTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNFbGVtZW50KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUubm9kZVR5cGUgPT09IDEgOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBlbXB0eS4gQXJyYXlzLCBzdHJpbmdzLCBvciBgYXJndW1lbnRzYCBvYmplY3RzIHdpdGggYVxuICAgKiBsZW5ndGggb2YgYDBgIGFuZCBvYmplY3RzIHdpdGggbm8gb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBhcmUgY29uc2lkZXJlZFxuICAgKiBcImVtcHR5XCIuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBlbXB0eSwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzRW1wdHkoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5pc0VtcHR5KHt9KTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzRW1wdHkoJycpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRydWU7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7XG5cbiAgICBpZiAoKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzIHx8IGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcyB8fFxuICAgICAgICBjbGFzc05hbWUgPT0gYXJnc0NsYXNzIHx8IChub0FyZ3NDbGFzcyAmJiBpc0FyZ3VtZW50cyh2YWx1ZSkpKSB8fFxuICAgICAgICAoY2xhc3NOYW1lID09IG9iamVjdENsYXNzICYmIHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgJiYgaXNGdW5jdGlvbih2YWx1ZS5zcGxpY2UpKSkge1xuICAgICAgcmV0dXJuICFsZW5ndGg7XG4gICAgfVxuICAgIGZvck93bih2YWx1ZSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gKHJlc3VsdCA9IGZhbHNlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgZGVlcCBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmVcbiAgICogZXF1aXZhbGVudCB0byBlYWNoIG90aGVyLiBJZiBgY2FsbGJhY2tgIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSBleGVjdXRlZCB0b1xuICAgKiBjb21wYXJlIHZhbHVlcy4gSWYgYGNhbGxiYWNrYCByZXR1cm5zIGB1bmRlZmluZWRgLCBjb21wYXJpc29ucyB3aWxsIGJlIGhhbmRsZWRcbiAgICogYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aFxuICAgKiB0d28gYXJndW1lbnRzOyAoYSwgYikuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gYSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHtNaXhlZH0gYiBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmluZyB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHBhcmFtLSB7T2JqZWN0fSBbc3RhY2tBPVtdXSBJbnRlcm5hbGx5IHVzZWQgdHJhY2sgdHJhdmVyc2VkIGBhYCBvYmplY3RzLlxuICAgKiBAcGFyYW0tIHtPYmplY3R9IFtzdGFja0I9W11dIEludGVybmFsbHkgdXNlZCB0cmFjayB0cmF2ZXJzZWQgYGJgIG9iamVjdHMuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIHZhbHVlcyBhcmUgZXF1dmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBtb2UgPSB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9O1xuICAgKiB2YXIgY29weSA9IHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH07XG4gICAqXG4gICAqIG1vZSA9PSBjb3B5O1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzRXF1YWwobW9lLCBjb3B5KTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiB2YXIgd29yZHMgPSBbJ2hlbGxvJywgJ2dvb2RieWUnXTtcbiAgICogdmFyIG90aGVyV29yZHMgPSBbJ2hpJywgJ2dvb2RieWUnXTtcbiAgICpcbiAgICogXy5pc0VxdWFsKHdvcmRzLCBvdGhlcldvcmRzLCBmdW5jdGlvbihhLCBiKSB7XG4gICAqICAgdmFyIHJlR3JlZXQgPSAvXig/OmhlbGxvfGhpKSQvaSxcbiAgICogICAgICAgYUdyZWV0ID0gXy5pc1N0cmluZyhhKSAmJiByZUdyZWV0LnRlc3QoYSksXG4gICAqICAgICAgIGJHcmVldCA9IF8uaXNTdHJpbmcoYikgJiYgcmVHcmVldC50ZXN0KGIpO1xuICAgKlxuICAgKiAgIHJldHVybiAoYUdyZWV0IHx8IGJHcmVldCkgPyAoYUdyZWV0ID09IGJHcmVldCkgOiB1bmRlZmluZWQ7XG4gICAqIH0pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc0VxdWFsKGEsIGIsIGNhbGxiYWNrLCB0aGlzQXJnLCBzdGFja0EsIHN0YWNrQikge1xuICAgIC8vIHVzZWQgdG8gaW5kaWNhdGUgdGhhdCB3aGVuIGNvbXBhcmluZyBvYmplY3RzLCBgYWAgaGFzIGF0IGxlYXN0IHRoZSBwcm9wZXJ0aWVzIG9mIGBiYFxuICAgIHZhciB3aGVyZUluZGljYXRvciA9IGNhbGxiYWNrID09PSBpbmRpY2F0b3JPYmplY3Q7XG4gICAgaWYgKGNhbGxiYWNrICYmICF3aGVyZUluZGljYXRvcikge1xuICAgICAgY2FsbGJhY2sgPSB0eXBlb2YgdGhpc0FyZyA9PSAndW5kZWZpbmVkJyA/IGNhbGxiYWNrIDogY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcsIDIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGNhbGxiYWNrKGEsIGIpO1xuICAgICAgaWYgKHR5cGVvZiByZXN1bHQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuICEhcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBleGl0IGVhcmx5IGZvciBpZGVudGljYWwgdmFsdWVzXG4gICAgaWYgKGEgPT09IGIpIHtcbiAgICAgIC8vIHRyZWF0IGArMGAgdnMuIGAtMGAgYXMgbm90IGVxdWFsXG4gICAgICByZXR1cm4gYSAhPT0gMCB8fCAoMSAvIGEgPT0gMSAvIGIpO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBhLFxuICAgICAgICBvdGhlclR5cGUgPSB0eXBlb2YgYjtcblxuICAgIC8vIGV4aXQgZWFybHkgZm9yIHVubGlrZSBwcmltaXRpdmUgdmFsdWVzXG4gICAgaWYgKGEgPT09IGEgJiZcbiAgICAgICAgKCFhIHx8ICh0eXBlICE9ICdmdW5jdGlvbicgJiYgdHlwZSAhPSAnb2JqZWN0JykpICYmXG4gICAgICAgICghYiB8fCAob3RoZXJUeXBlICE9ICdmdW5jdGlvbicgJiYgb3RoZXJUeXBlICE9ICdvYmplY3QnKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gZXhpdCBlYXJseSBmb3IgYG51bGxgIGFuZCBgdW5kZWZpbmVkYCwgYXZvaWRpbmcgRVMzJ3MgRnVuY3Rpb24jY2FsbCBiZWhhdmlvclxuICAgIC8vIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjMuNC40XG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHtcbiAgICAgIHJldHVybiBhID09PSBiO1xuICAgIH1cbiAgICAvLyBjb21wYXJlIFtbQ2xhc3NdXSBuYW1lc1xuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpLFxuICAgICAgICBvdGhlckNsYXNzID0gdG9TdHJpbmcuY2FsbChiKTtcblxuICAgIGlmIChjbGFzc05hbWUgPT0gYXJnc0NsYXNzKSB7XG4gICAgICBjbGFzc05hbWUgPSBvYmplY3RDbGFzcztcbiAgICB9XG4gICAgaWYgKG90aGVyQ2xhc3MgPT0gYXJnc0NsYXNzKSB7XG4gICAgICBvdGhlckNsYXNzID0gb2JqZWN0Q2xhc3M7XG4gICAgfVxuICAgIGlmIChjbGFzc05hbWUgIT0gb3RoZXJDbGFzcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgY2FzZSBib29sQ2xhc3M6XG4gICAgICBjYXNlIGRhdGVDbGFzczpcbiAgICAgICAgLy8gY29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1iZXJzLCBkYXRlcyB0byBtaWxsaXNlY29uZHMgYW5kIGJvb2xlYW5zXG4gICAgICAgIC8vIHRvIGAxYCBvciBgMGAsIHRyZWF0aW5nIGludmFsaWQgZGF0ZXMgY29lcmNlZCB0byBgTmFOYCBhcyBub3QgZXF1YWxcbiAgICAgICAgcmV0dXJuICthID09ICtiO1xuXG4gICAgICBjYXNlIG51bWJlckNsYXNzOlxuICAgICAgICAvLyB0cmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWxcbiAgICAgICAgcmV0dXJuIGEgIT0gK2FcbiAgICAgICAgICA/IGIgIT0gK2JcbiAgICAgICAgICAvLyBidXQgdHJlYXQgYCswYCB2cy4gYC0wYCBhcyBub3QgZXF1YWxcbiAgICAgICAgICA6IChhID09IDAgPyAoMSAvIGEgPT0gMSAvIGIpIDogYSA9PSArYik7XG5cbiAgICAgIGNhc2UgcmVnZXhwQ2xhc3M6XG4gICAgICBjYXNlIHN0cmluZ0NsYXNzOlxuICAgICAgICAvLyBjb2VyY2UgcmVnZXhlcyB0byBzdHJpbmdzIChodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS4xMC42LjQpXG4gICAgICAgIC8vIHRyZWF0IHN0cmluZyBwcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCBpbnN0YW5jZXMgYXMgZXF1YWxcbiAgICAgICAgcmV0dXJuIGEgPT0gYiArICcnO1xuICAgIH1cbiAgICB2YXIgaXNBcnIgPSBjbGFzc05hbWUgPT0gYXJyYXlDbGFzcztcbiAgICBpZiAoIWlzQXJyKSB7XG4gICAgICAvLyB1bndyYXAgYW55IGBsb2Rhc2hgIHdyYXBwZWQgdmFsdWVzXG4gICAgICBpZiAoYS5fX3dyYXBwZWRfXyB8fCBiLl9fd3JhcHBlZF9fKSB7XG4gICAgICAgIHJldHVybiBpc0VxdWFsKGEuX193cmFwcGVkX18gfHwgYSwgYi5fX3dyYXBwZWRfXyB8fCBiLCBjYWxsYmFjaywgdGhpc0FyZywgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgfVxuICAgICAgLy8gZXhpdCBmb3IgZnVuY3Rpb25zIGFuZCBET00gbm9kZXNcbiAgICAgIGlmIChjbGFzc05hbWUgIT0gb2JqZWN0Q2xhc3MgfHwgKG5vTm9kZUNsYXNzICYmIChpc05vZGUoYSkgfHwgaXNOb2RlKGIpKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gaW4gb2xkZXIgdmVyc2lvbnMgb2YgT3BlcmEsIGBhcmd1bWVudHNgIG9iamVjdHMgaGF2ZSBgQXJyYXlgIGNvbnN0cnVjdG9yc1xuICAgICAgdmFyIGN0b3JBID0gIWFyZ3NBcmVPYmplY3RzICYmIGlzQXJndW1lbnRzKGEpID8gT2JqZWN0IDogYS5jb25zdHJ1Y3RvcixcbiAgICAgICAgICBjdG9yQiA9ICFhcmdzQXJlT2JqZWN0cyAmJiBpc0FyZ3VtZW50cyhiKSA/IE9iamVjdCA6IGIuY29uc3RydWN0b3I7XG5cbiAgICAgIC8vIG5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsXG4gICAgICBpZiAoY3RvckEgIT0gY3RvckIgJiYgIShcbiAgICAgICAgICAgIGlzRnVuY3Rpb24oY3RvckEpICYmIGN0b3JBIGluc3RhbmNlb2YgY3RvckEgJiZcbiAgICAgICAgICAgIGlzRnVuY3Rpb24oY3RvckIpICYmIGN0b3JCIGluc3RhbmNlb2YgY3RvckJcbiAgICAgICAgICApKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gYXNzdW1lIGN5Y2xpYyBzdHJ1Y3R1cmVzIGFyZSBlcXVhbFxuICAgIC8vIHRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWMgc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xXG4gICAgLy8gc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYCAoaHR0cDovL2VzNS5naXRodWIuY29tLyN4MTUuMTIuMylcbiAgICBzdGFja0EgfHwgKHN0YWNrQSA9IFtdKTtcbiAgICBzdGFja0IgfHwgKHN0YWNrQiA9IFtdKTtcblxuICAgIHZhciBsZW5ndGggPSBzdGFja0EubGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgaWYgKHN0YWNrQVtsZW5ndGhdID09IGEpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrQltsZW5ndGhdID09IGI7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBzaXplID0gMDtcbiAgICByZXN1bHQgPSB0cnVlO1xuXG4gICAgLy8gYWRkIGBhYCBhbmQgYGJgIHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0c1xuICAgIHN0YWNrQS5wdXNoKGEpO1xuICAgIHN0YWNrQi5wdXNoKGIpO1xuXG4gICAgLy8gcmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKVxuICAgIGlmIChpc0Fycikge1xuICAgICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgICBzaXplID0gYi5sZW5ndGg7XG5cbiAgICAgIC8vIGNvbXBhcmUgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5XG4gICAgICByZXN1bHQgPSBzaXplID09IGEubGVuZ3RoO1xuICAgICAgaWYgKCFyZXN1bHQgJiYgIXdoZXJlSW5kaWNhdG9yKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICAvLyBkZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzXG4gICAgICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGxlbmd0aCxcbiAgICAgICAgICAgIHZhbHVlID0gYltzaXplXTtcblxuICAgICAgICBpZiAod2hlcmVJbmRpY2F0b3IpIHtcbiAgICAgICAgICB3aGlsZSAoaW5kZXgtLSkge1xuICAgICAgICAgICAgaWYgKChyZXN1bHQgPSBpc0VxdWFsKGFbaW5kZXhdLCB2YWx1ZSwgY2FsbGJhY2ssIHRoaXNBcmcsIHN0YWNrQSwgc3RhY2tCKSkpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCEocmVzdWx0ID0gaXNFcXVhbChhW3NpemVdLCB2YWx1ZSwgY2FsbGJhY2ssIHRoaXNBcmcsIHN0YWNrQSwgc3RhY2tCKSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLy8gZGVlcCBjb21wYXJlIG9iamVjdHMgdXNpbmcgYGZvckluYCwgaW5zdGVhZCBvZiBgZm9yT3duYCwgdG8gYXZvaWQgYE9iamVjdC5rZXlzYFxuICAgIC8vIHdoaWNoLCBpbiB0aGlzIGNhc2UsIGlzIG1vcmUgY29zdGx5XG4gICAgZm9ySW4oYiwgZnVuY3Rpb24odmFsdWUsIGtleSwgYikge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYiwga2V5KSkge1xuICAgICAgICAvLyBjb3VudCB0aGUgbnVtYmVyIG9mIHByb3BlcnRpZXMuXG4gICAgICAgIHNpemUrKztcbiAgICAgICAgLy8gZGVlcCBjb21wYXJlIGVhY2ggcHJvcGVydHkgdmFsdWUuXG4gICAgICAgIHJldHVybiAocmVzdWx0ID0gaGFzT3duUHJvcGVydHkuY2FsbChhLCBrZXkpICYmIGlzRXF1YWwoYVtrZXldLCB2YWx1ZSwgY2FsbGJhY2ssIHRoaXNBcmcsIHN0YWNrQSwgc3RhY2tCKSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocmVzdWx0ICYmICF3aGVyZUluZGljYXRvcikge1xuICAgICAgLy8gZW5zdXJlIGJvdGggb2JqZWN0cyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzXG4gICAgICBmb3JJbihhLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBhKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGtleSkpIHtcbiAgICAgICAgICAvLyBgc2l6ZWAgd2lsbCBiZSBgLTFgIGlmIGBhYCBoYXMgbW9yZSBwcm9wZXJ0aWVzIHRoYW4gYGJgXG4gICAgICAgICAgcmV0dXJuIChyZXN1bHQgPSAtLXNpemUgPiAtMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzLCBvciBjYW4gYmUgY29lcmNlZCB0bywgYSBmaW5pdGUgbnVtYmVyLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGlzIG5vdCB0aGUgc2FtZSBhcyBuYXRpdmUgYGlzRmluaXRlYCwgd2hpY2ggd2lsbCByZXR1cm4gdHJ1ZSBmb3JcbiAgICogYm9vbGVhbnMgYW5kIGVtcHR5IHN0cmluZ3MuIFNlZSBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3gxNS4xLjIuNS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgZmluaXRlLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNGaW5pdGUoLTEwMSk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc0Zpbml0ZSgnMTAnKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzRmluaXRlKHRydWUpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzRmluaXRlKCcnKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5pc0Zpbml0ZShJbmZpbml0eSk7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqL1xuICBmdW5jdGlvbiBpc0Zpbml0ZSh2YWx1ZSkge1xuICAgIHJldHVybiBuYXRpdmVJc0Zpbml0ZSh2YWx1ZSkgJiYgIW5hdGl2ZUlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNGdW5jdGlvbihfKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJztcbiAgfVxuICAvLyBmYWxsYmFjayBmb3Igb2xkZXIgdmVyc2lvbnMgb2YgQ2hyb21lIGFuZCBTYWZhcmlcbiAgaWYgKGlzRnVuY3Rpb24oL3gvKSkge1xuICAgIGlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24gfHwgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gZnVuY0NsYXNzO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIGxhbmd1YWdlIHR5cGUgb2YgT2JqZWN0LlxuICAgKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNPYmplY3Qoe30pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmlzT2JqZWN0KDEpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgICAvLyBjaGVjayBpZiB0aGUgdmFsdWUgaXMgdGhlIEVDTUFTY3JpcHQgbGFuZ3VhZ2UgdHlwZSBvZiBPYmplY3RcbiAgICAvLyBodHRwOi8vZXM1LmdpdGh1Yi5jb20vI3g4XG4gICAgLy8gYW5kIGF2b2lkIGEgVjggYnVnXG4gICAgLy8gaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MjI5MVxuICAgIHJldHVybiB2YWx1ZSA/IG9iamVjdFR5cGVzW3R5cGVvZiB2YWx1ZV0gOiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBgTmFOYC5cbiAgICpcbiAgICogTm90ZTogVGhpcyBpcyBub3QgdGhlIHNhbWUgYXMgbmF0aXZlIGBpc05hTmAsIHdoaWNoIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3JcbiAgICogYHVuZGVmaW5lZGAgYW5kIG90aGVyIHZhbHVlcy4gU2VlIGh0dHA6Ly9lczUuZ2l0aHViLmNvbS8jeDE1LjEuMi40LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBgTmFOYCwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzTmFOKE5hTik7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc05hTihuZXcgTnVtYmVyKE5hTikpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIGlzTmFOKHVuZGVmaW5lZCk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc05hTih1bmRlZmluZWQpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNOYU4odmFsdWUpIHtcbiAgICAvLyBgTmFOYCBhcyBhIHByaW1pdGl2ZSBpcyB0aGUgb25seSB2YWx1ZSB0aGF0IGlzIG5vdCBlcXVhbCB0byBpdHNlbGZcbiAgICAvLyAocGVyZm9ybSB0aGUgW1tDbGFzc11dIGNoZWNrIGZpcnN0IHRvIGF2b2lkIGVycm9ycyB3aXRoIHNvbWUgaG9zdCBvYmplY3RzIGluIElFKVxuICAgIHJldHVybiBpc051bWJlcih2YWx1ZSkgJiYgdmFsdWUgIT0gK3ZhbHVlXG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYG51bGxgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBgbnVsbGAsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc051bGwobnVsbCk7XG4gICAqIC8vID0+IHRydWVcbiAgICpcbiAgICogXy5pc051bGwodW5kZWZpbmVkKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIGlzTnVsbCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIG51bWJlci5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCwgaWYgdGhlIGB2YWx1ZWAgaXMgYSBudW1iZXIsIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pc051bWJlcig4LjQgKiA1KTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHRvU3RyaW5nLmNhbGwodmFsdWUpID09IG51bWJlckNsYXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIGdpdmVuIGB2YWx1ZWAgaXMgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIGZ1bmN0aW9uIFN0b29nZShuYW1lLCBhZ2UpIHtcbiAgICogICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgKiAgIHRoaXMuYWdlID0gYWdlO1xuICAgKiB9XG4gICAqXG4gICAqIF8uaXNQbGFpbk9iamVjdChuZXcgU3Rvb2dlKCdtb2UnLCA0MCkpO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKlxuICAgKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogXy5pc1BsYWluT2JqZWN0KHsgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH0pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICB2YXIgaXNQbGFpbk9iamVjdCA9ICFnZXRQcm90b3R5cGVPZiA/IHNoaW1Jc1BsYWluT2JqZWN0IDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoISh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciB2YWx1ZU9mID0gdmFsdWUudmFsdWVPZixcbiAgICAgICAgb2JqUHJvdG8gPSB0eXBlb2YgdmFsdWVPZiA9PSAnZnVuY3Rpb24nICYmIChvYmpQcm90byA9IGdldFByb3RvdHlwZU9mKHZhbHVlT2YpKSAmJiBnZXRQcm90b3R5cGVPZihvYmpQcm90byk7XG5cbiAgICByZXR1cm4gb2JqUHJvdG9cbiAgICAgID8gdmFsdWUgPT0gb2JqUHJvdG8gfHwgKGdldFByb3RvdHlwZU9mKHZhbHVlKSA9PSBvYmpQcm90byAmJiAhaXNBcmd1bWVudHModmFsdWUpKVxuICAgICAgOiBzaGltSXNQbGFpbk9iamVjdCh2YWx1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcmVndWxhciBleHByZXNzaW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgLCBpZiB0aGUgYHZhbHVlYCBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiwgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmlzUmVnRXhwKC9tb2UvKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNSZWdFeHAodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBSZWdFeHAgfHwgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gcmVnZXhwQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBzdHJpbmcuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGEgc3RyaW5nLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNTdHJpbmcoJ21vZScpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqL1xuICBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgdG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3RyaW5nQ2xhc3M7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYHVuZGVmaW5lZGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAsIGlmIHRoZSBgdmFsdWVgIGlzIGB1bmRlZmluZWRgLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uaXNVbmRlZmluZWQodm9pZCAwKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKi9cbiAgZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICd1bmRlZmluZWQnO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0KHMpLCB0aGF0XG4gICAqIGRvbid0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAsIGludG8gdGhlIGRlc3RpbmF0aW9uIG9iamVjdC4gU3Vic2VxdWVudCBzb3VyY2VzXG4gICAqIHdpbGwgb3ZlcndyaXRlIHByb3BlcnkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy4gSWYgYSBgY2FsbGJhY2tgIGZ1bmN0aW9uXG4gICAqIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSBleGVjdXRlZCB0byBwcm9kdWNlIHRoZSBtZXJnZWQgdmFsdWVzIG9mIHRoZSBkZXN0aW5hdGlvblxuICAgKiBhbmQgc291cmNlIHByb3BlcnRpZXMuIElmIGBjYWxsYmFja2AgcmV0dXJucyBgdW5kZWZpbmVkYCwgbWVyZ2luZyB3aWxsIGJlXG4gICAqIGhhbmRsZWQgYnkgdGhlIG1ldGhvZCBpbnN0ZWFkLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kXG4gICAqIGludm9rZWQgd2l0aCB0d28gYXJndW1lbnRzOyAob2JqZWN0VmFsdWUsIHNvdXJjZVZhbHVlKS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbc291cmNlMSwgc291cmNlMiwgLi4uXSBUaGUgc291cmNlIG9iamVjdHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnaW5nIHByb3BlcnRpZXMuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHBhcmFtLSB7T2JqZWN0fSBbZGVlcEluZGljYXRvcl0gSW50ZXJuYWxseSB1c2VkIHRvIGluZGljYXRlIHRoYXQgYHN0YWNrQWBcbiAgICogIGFuZCBgc3RhY2tCYCBhcmUgYXJyYXlzIG9mIHRyYXZlcnNlZCBvYmplY3RzIGluc3RlYWQgb2Ygc291cmNlIG9iamVjdHMuXG4gICAqIEBwYXJhbS0ge0FycmF5fSBbc3RhY2tBPVtdXSBJbnRlcm5hbGx5IHVzZWQgdG8gdHJhY2sgdHJhdmVyc2VkIHNvdXJjZSBvYmplY3RzLlxuICAgKiBAcGFyYW0tIHtBcnJheX0gW3N0YWNrQj1bXV0gSW50ZXJuYWxseSB1c2VkIHRvIGFzc29jaWF0ZSB2YWx1ZXMgd2l0aCB0aGVpclxuICAgKiAgc291cmNlIGNvdW50ZXJwYXJ0cy5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgbmFtZXMgPSB7XG4gICAqICAgJ3N0b29nZXMnOiBbXG4gICAqICAgICB7ICduYW1lJzogJ21vZScgfSxcbiAgICogICAgIHsgJ25hbWUnOiAnbGFycnknIH1cbiAgICogICBdXG4gICAqIH07XG4gICAqXG4gICAqIHZhciBhZ2VzID0ge1xuICAgKiAgICdzdG9vZ2VzJzogW1xuICAgKiAgICAgeyAnYWdlJzogNDAgfSxcbiAgICogICAgIHsgJ2FnZSc6IDUwIH1cbiAgICogICBdXG4gICAqIH07XG4gICAqXG4gICAqIF8ubWVyZ2UobmFtZXMsIGFnZXMpO1xuICAgKiAvLyA9PiB7ICdzdG9vZ2VzJzogW3sgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH0sIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfV0gfVxuICAgKlxuICAgKiB2YXIgZm9vZCA9IHtcbiAgICogICAnZnJ1aXRzJzogWydhcHBsZSddLFxuICAgKiAgICd2ZWdldGFibGVzJzogWydiZWV0J11cbiAgICogfTtcbiAgICpcbiAgICogdmFyIG90aGVyRm9vZCA9IHtcbiAgICogICAnZnJ1aXRzJzogWydiYW5hbmEnXSxcbiAgICogICAndmVnZXRhYmxlcyc6IFsnY2Fycm90J11cbiAgICogfTtcbiAgICpcbiAgICogXy5tZXJnZShmb29kLCBvdGhlckZvb2QsIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICogICByZXR1cm4gXy5pc0FycmF5KGEpID8gYS5jb25jYXQoYikgOiB1bmRlZmluZWQ7XG4gICAqIH0pO1xuICAgKiAvLyA9PiB7ICdmcnVpdHMnOiBbJ2FwcGxlJywgJ2JhbmFuYSddLCAndmVnZXRhYmxlcyc6IFsnYmVldCcsICdjYXJyb3RdIH1cbiAgICovXG4gIGZ1bmN0aW9uIG1lcmdlKG9iamVjdCwgc291cmNlLCBkZWVwSW5kaWNhdG9yKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgbGVuZ3RoID0gMjtcblxuICAgIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gICAgaWYgKGRlZXBJbmRpY2F0b3IgPT09IGluZGljYXRvck9iamVjdCkge1xuICAgICAgdmFyIGNhbGxiYWNrID0gYXJnc1szXSxcbiAgICAgICAgICBzdGFja0EgPSBhcmdzWzRdLFxuICAgICAgICAgIHN0YWNrQiA9IGFyZ3NbNV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YWNrQSA9IFtdO1xuICAgICAgc3RhY2tCID0gW107XG5cbiAgICAgIC8vIGFsbG93cyB3b3JraW5nIHdpdGggYF8ucmVkdWNlYCBhbmQgYF8ucmVkdWNlUmlnaHRgIHdpdGhvdXRcbiAgICAgIC8vIHVzaW5nIHRoZWlyIGBjYWxsYmFja2AgYXJndW1lbnRzLCBgaW5kZXh8a2V5YCBhbmQgYGNvbGxlY3Rpb25gXG4gICAgICBpZiAodHlwZW9mIGRlZXBJbmRpY2F0b3IgIT0gJ251bWJlcicpIHtcbiAgICAgICAgbGVuZ3RoID0gYXJncy5sZW5ndGg7XG4gICAgICB9XG4gICAgICBpZiAobGVuZ3RoID4gMyAmJiB0eXBlb2YgYXJnc1tsZW5ndGggLSAyXSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soYXJnc1stLWxlbmd0aCAtIDFdLCBhcmdzW2xlbmd0aC0tXSwgMik7XG4gICAgICB9IGVsc2UgaWYgKGxlbmd0aCA+IDIgJiYgdHlwZW9mIGFyZ3NbbGVuZ3RoIC0gMV0gPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYWxsYmFjayA9IGFyZ3NbLS1sZW5ndGhdO1xuICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgKGlzQXJyYXkoYXJnc1tpbmRleF0pID8gZm9yRWFjaCA6IGZvck93bikoYXJnc1tpbmRleF0sIGZ1bmN0aW9uKHNvdXJjZSwga2V5KSB7XG4gICAgICAgIHZhciBmb3VuZCxcbiAgICAgICAgICAgIGlzQXJyLFxuICAgICAgICAgICAgcmVzdWx0ID0gc291cmNlLFxuICAgICAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgICAgICBpZiAoc291cmNlICYmICgoaXNBcnIgPSBpc0FycmF5KHNvdXJjZSkpIHx8IGlzUGxhaW5PYmplY3Qoc291cmNlKSkpIHtcbiAgICAgICAgICAvLyBhdm9pZCBtZXJnaW5nIHByZXZpb3VzbHkgbWVyZ2VkIGN5Y2xpYyBzb3VyY2VzXG4gICAgICAgICAgdmFyIHN0YWNrTGVuZ3RoID0gc3RhY2tBLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoc3RhY2tMZW5ndGgtLSkge1xuICAgICAgICAgICAgaWYgKChmb3VuZCA9IHN0YWNrQVtzdGFja0xlbmd0aF0gPT0gc291cmNlKSkge1xuICAgICAgICAgICAgICB2YWx1ZSA9IHN0YWNrQltzdGFja0xlbmd0aF07XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGlzQXJyXG4gICAgICAgICAgICAgID8gKGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbXSlcbiAgICAgICAgICAgICAgOiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IHt9KTtcblxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKHZhbHVlLCBzb3VyY2UpO1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gcmVzdWx0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhZGQgYHNvdXJjZWAgYW5kIGFzc29jaWF0ZWQgYHZhbHVlYCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHNcbiAgICAgICAgICAgIHN0YWNrQS5wdXNoKHNvdXJjZSk7XG4gICAgICAgICAgICBzdGFja0IucHVzaCh2YWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpXG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHZhbHVlID0gbWVyZ2UodmFsdWUsIHNvdXJjZSwgaW5kaWNhdG9yT2JqZWN0LCBjYWxsYmFjaywgc3RhY2tBLCBzdGFja0IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKHZhbHVlLCBzb3VyY2UpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gc291cmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFsdWUgPSByZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgc2hhbGxvdyBjbG9uZSBvZiBgb2JqZWN0YCBleGNsdWRpbmcgdGhlIHNwZWNpZmllZCBwcm9wZXJ0aWVzLlxuICAgKiBQcm9wZXJ0eSBuYW1lcyBtYXkgYmUgc3BlY2lmaWVkIGFzIGluZGl2aWR1YWwgYXJndW1lbnRzIG9yIGFzIGFycmF5cyBvZlxuICAgKiBwcm9wZXJ0eSBuYW1lcy4gSWYgYSBgY2FsbGJhY2tgIGZ1bmN0aW9uIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSBleGVjdXRlZFxuICAgKiBmb3IgZWFjaCBwcm9wZXJ0eSBpbiB0aGUgYG9iamVjdGAsIG9taXR0aW5nIHRoZSBwcm9wZXJ0aWVzIGBjYWxsYmFja2BcbiAgICogcmV0dXJucyB0cnV0aHkgZm9yLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWRcbiAgICogd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwga2V5LCBvYmplY3QpLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBPYmplY3RzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBjYWxsYmFja3xbcHJvcDEsIHByb3AyLCAuLi5dIFRoZSBwcm9wZXJ0aWVzIHRvIG9taXRcbiAgICogIG9yIHRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRob3V0IHRoZSBvbWl0dGVkIHByb3BlcnRpZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ub21pdCh7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LCAnYWdlJyk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnbW9lJyB9XG4gICAqXG4gICAqIF8ub21pdCh7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LCBmdW5jdGlvbih2YWx1ZSkge1xuICAgKiAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcic7XG4gICAqIH0pO1xuICAgKiAvLyA9PiB7ICduYW1lJzogJ21vZScgfVxuICAgKi9cbiAgZnVuY3Rpb24gb21pdChvYmplY3QsIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIGlzRnVuYyA9IHR5cGVvZiBjYWxsYmFjayA9PSAnZnVuY3Rpb24nLFxuICAgICAgICByZXN1bHQgPSB7fTtcblxuICAgIGlmIChpc0Z1bmMpIHtcbiAgICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJvcHMgPSBjb25jYXQuYXBwbHkoYXJyYXlSZWYsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGZvckluKG9iamVjdCwgZnVuY3Rpb24odmFsdWUsIGtleSwgb2JqZWN0KSB7XG4gICAgICBpZiAoaXNGdW5jXG4gICAgICAgICAgICA/ICFjYWxsYmFjayh2YWx1ZSwga2V5LCBvYmplY3QpXG4gICAgICAgICAgICA6IGluZGV4T2YocHJvcHMsIGtleSwgMSkgPCAwXG4gICAgICAgICAgKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgdHdvIGRpbWVuc2lvbmFsIGFycmF5IG9mIHRoZSBnaXZlbiBvYmplY3QncyBrZXktdmFsdWUgcGFpcnMsXG4gICAqIGkuZS4gYFtba2V5MSwgdmFsdWUxXSwgW2tleTIsIHZhbHVlMl1dYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIG5ldyBhcnJheSBvZiBrZXktdmFsdWUgcGFpcnMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ucGFpcnMoeyAnbW9lJzogMzAsICdsYXJyeSc6IDQwIH0pO1xuICAgKiAvLyA9PiBbWydtb2UnLCAzMF0sIFsnbGFycnknLCA0MF1dIChvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAgICovXG4gIGZ1bmN0aW9uIHBhaXJzKG9iamVjdCkge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBwcm9wcyA9IGtleXMob2JqZWN0KSxcbiAgICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoLFxuICAgICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG4gICAgICByZXN1bHRbaW5kZXhdID0gW2tleSwgb2JqZWN0W2tleV1dO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBzaGFsbG93IGNsb25lIG9mIGBvYmplY3RgIGNvbXBvc2VkIG9mIHRoZSBzcGVjaWZpZWQgcHJvcGVydGllcy5cbiAgICogUHJvcGVydHkgbmFtZXMgbWF5IGJlIHNwZWNpZmllZCBhcyBpbmRpdmlkdWFsIGFyZ3VtZW50cyBvciBhcyBhcnJheXMgb2YgcHJvcGVydHlcbiAgICogbmFtZXMuIElmIGBjYWxsYmFja2AgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIGV4ZWN1dGVkIGZvciBlYWNoIHByb3BlcnR5IGluIHRoZVxuICAgKiBgb2JqZWN0YCwgcGlja2luZyB0aGUgcHJvcGVydGllcyBgY2FsbGJhY2tgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIGBjYWxsYmFja2BcbiAgICogaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGtleSwgb2JqZWN0KS5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgT2JqZWN0c1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICAgKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2t8W3Byb3AxLCBwcm9wMiwgLi4uXSBUaGUgZnVuY3Rpb24gY2FsbGVkXG4gICAqICBwZXIgaXRlcmF0aW9uIG9yIHByb3BlcnRpZXMgdG8gcGljaywgZWl0aGVyIGFzIGluZGl2aWR1YWwgYXJndW1lbnRzIG9yIGFycmF5cy5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCBjb21wb3NlZCBvZiB0aGUgcGlja2VkIHByb3BlcnRpZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ucGljayh7ICduYW1lJzogJ21vZScsICdfdXNlcmlkJzogJ21vZTEnIH0sICduYW1lJyk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnbW9lJyB9XG4gICAqXG4gICAqIF8ucGljayh7ICduYW1lJzogJ21vZScsICdfdXNlcmlkJzogJ21vZTEnIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICogICByZXR1cm4ga2V5LmNoYXJBdCgwKSAhPSAnXyc7XG4gICAqIH0pO1xuICAgKiAvLyA9PiB7ICduYW1lJzogJ21vZScgfVxuICAgKi9cbiAgZnVuY3Rpb24gcGljayhvYmplY3QsIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGluZGV4ID0gMCxcbiAgICAgICAgICBwcm9wcyA9IGNvbmNhdC5hcHBseShhcnJheVJlZiwgYXJndW1lbnRzKSxcbiAgICAgICAgICBsZW5ndGggPSBpc09iamVjdChvYmplY3QpID8gcHJvcHMubGVuZ3RoIDogMDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgZm9ySW4ob2JqZWN0LCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrKHZhbHVlLCBrZXksIG9iamVjdCkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IGNvbXBvc2VkIG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSB2YWx1ZXMgb2YgYG9iamVjdGAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IE9iamVjdHNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBwcm9wZXJ0eSB2YWx1ZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8udmFsdWVzKHsgJ29uZSc6IDEsICd0d28nOiAyLCAndGhyZWUnOiAzIH0pO1xuICAgKiAvLyA9PiBbMSwgMiwgM11cbiAgICovXG4gIGZ1bmN0aW9uIHZhbHVlcyhvYmplY3QpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgcHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aCxcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gb2JqZWN0W3Byb3BzW2luZGV4XV07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhcnJheSBvZiBlbGVtZW50cyBmcm9tIHRoZSBzcGVjaWZpZWQgaW5kZXhlcywgb3Iga2V5cywgb2YgdGhlXG4gICAqIGBjb2xsZWN0aW9uYC4gSW5kZXhlcyBtYXkgYmUgc3BlY2lmaWVkIGFzIGluZGl2aWR1YWwgYXJndW1lbnRzIG9yIGFzIGFycmF5c1xuICAgKiBvZiBpbmRleGVzLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0FycmF5fE51bWJlcnxTdHJpbmd9IFtpbmRleDEsIGluZGV4MiwgLi4uXSBUaGUgaW5kZXhlcyBvZlxuICAgKiAgYGNvbGxlY3Rpb25gIHRvIHJldHJpZXZlLCBlaXRoZXIgYXMgaW5kaXZpZHVhbCBhcmd1bWVudHMgb3IgYXJyYXlzLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgZWxlbWVudHMgY29ycmVzcG9uZGluZyB0byB0aGVcbiAgICogIHByb3ZpZGVkIGluZGV4ZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uYXQoWydhJywgJ2InLCAnYycsICdkJywgJ2UnXSwgWzAsIDIsIDRdKTtcbiAgICogLy8gPT4gWydhJywgJ2MnLCAnZSddXG4gICAqXG4gICAqIF8uYXQoWydtb2UnLCAnbGFycnknLCAnY3VybHknXSwgMCwgMik7XG4gICAqIC8vID0+IFsnbW9lJywgJ2N1cmx5J11cbiAgICovXG4gIGZ1bmN0aW9uIGF0KGNvbGxlY3Rpb24pIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgcHJvcHMgPSBjb25jYXQuYXBwbHkoYXJyYXlSZWYsIHNsaWNlKGFyZ3VtZW50cywgMSkpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGgsXG4gICAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICBpZiAobm9DaGFyQnlJbmRleCAmJiBpc1N0cmluZyhjb2xsZWN0aW9uKSkge1xuICAgICAgY29sbGVjdGlvbiA9IGNvbGxlY3Rpb24uc3BsaXQoJycpO1xuICAgIH1cbiAgICB3aGlsZSgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gY29sbGVjdGlvbltwcm9wc1tpbmRleF1dO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIGdpdmVuIGB0YXJnZXRgIGVsZW1lbnQgaXMgcHJlc2VudCBpbiBhIGBjb2xsZWN0aW9uYCB1c2luZyBzdHJpY3RcbiAgICogZXF1YWxpdHkgZm9yIGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLiBJZiBgZnJvbUluZGV4YCBpcyBuZWdhdGl2ZSwgaXQgaXMgdXNlZFxuICAgKiBhcyB0aGUgb2Zmc2V0IGZyb20gdGhlIGVuZCBvZiB0aGUgY29sbGVjdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAYWxpYXMgaW5jbHVkZVxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtNaXhlZH0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBjaGVjayBmb3IuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZnJvbUluZGV4PTBdIFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBgdGFyZ2V0YCBlbGVtZW50IGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uY29udGFpbnMoWzEsIDIsIDNdLCAxKTtcbiAgICogLy8gPT4gdHJ1ZVxuICAgKlxuICAgKiBfLmNvbnRhaW5zKFsxLCAyLCAzXSwgMSwgMik7XG4gICAqIC8vID0+IGZhbHNlXG4gICAqXG4gICAqIF8uY29udGFpbnMoeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSwgJ21vZScpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIF8uY29udGFpbnMoJ2N1cmx5JywgJ3VyJyk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIGZ1bmN0aW9uIGNvbnRhaW5zKGNvbGxlY3Rpb24sIHRhcmdldCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDAsXG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgZnJvbUluZGV4ID0gKGZyb21JbmRleCA8IDAgPyBuYXRpdmVNYXgoMCwgbGVuZ3RoICsgZnJvbUluZGV4KSA6IGZyb21JbmRleCkgfHwgMDtcbiAgICBpZiAodHlwZW9mIGxlbmd0aCA9PSAnbnVtYmVyJykge1xuICAgICAgcmVzdWx0ID0gKGlzU3RyaW5nKGNvbGxlY3Rpb24pXG4gICAgICAgID8gY29sbGVjdGlvbi5pbmRleE9mKHRhcmdldCwgZnJvbUluZGV4KVxuICAgICAgICA6IGluZGV4T2YoY29sbGVjdGlvbiwgdGFyZ2V0LCBmcm9tSW5kZXgpXG4gICAgICApID4gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKCsraW5kZXggPj0gZnJvbUluZGV4KSB7XG4gICAgICAgICAgcmV0dXJuICEocmVzdWx0ID0gdmFsdWUgPT09IHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIGtleXMgcmV0dXJuZWQgZnJvbSBydW5uaW5nIGVhY2ggZWxlbWVudCBvZiB0aGVcbiAgICogYGNvbGxlY3Rpb25gIHRocm91Z2ggdGhlIGdpdmVuIGBjYWxsYmFja2AuIFRoZSBjb3JyZXNwb25kaW5nIHZhbHVlIG9mIGVhY2gga2V5XG4gICAqIGlzIHRoZSBudW1iZXIgb2YgdGltZXMgdGhlIGtleSB3YXMgcmV0dXJuZWQgYnkgdGhlIGBjYWxsYmFja2AuIFRoZSBgY2FsbGJhY2tgXG4gICAqIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxTdHJpbmd9IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXJcbiAgICogIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGVcbiAgICogIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb21wb3NlZCBhZ2dyZWdhdGUgb2JqZWN0LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmNvdW50QnkoWzQuMywgNi4xLCA2LjRdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIE1hdGguZmxvb3IobnVtKTsgfSk7XG4gICAqIC8vID0+IHsgJzQnOiAxLCAnNic6IDIgfVxuICAgKlxuICAgKiBfLmNvdW50QnkoWzQuMywgNi4xLCA2LjRdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIHRoaXMuZmxvb3IobnVtKTsgfSwgTWF0aCk7XG4gICAqIC8vID0+IHsgJzQnOiAxLCAnNic6IDIgfVxuICAgKlxuICAgKiBfLmNvdW50QnkoWydvbmUnLCAndHdvJywgJ3RocmVlJ10sICdsZW5ndGgnKTtcbiAgICogLy8gPT4geyAnMyc6IDIsICc1JzogMSB9XG4gICAqL1xuICBmdW5jdGlvbiBjb3VudEJ5KGNvbGxlY3Rpb24sIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuXG4gICAgZm9yRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgICBrZXkgPSBjYWxsYmFjayh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSArICcnO1xuICAgICAgKGhhc093blByb3BlcnR5LmNhbGwocmVzdWx0LCBrZXkpID8gcmVzdWx0W2tleV0rKyA6IHJlc3VsdFtrZXldID0gMSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGBjYWxsYmFja2AgcmV0dXJucyBhIHRydXRoeSB2YWx1ZSBmb3IgKiphbGwqKiBlbGVtZW50cyBvZiBhXG4gICAqIGBjb2xsZWN0aW9uYC4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWVcbiAgICogYXJndW1lbnRzOyAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGFsbFxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFsbCBlbGVtZW50cyBwYXNzIHRoZSBjYWxsYmFjayBjaGVjayxcbiAgICogIGVsc2UgYGZhbHNlYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5ldmVyeShbdHJ1ZSwgMSwgbnVsbCwgJ3llcyddLCBCb29sZWFuKTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICpcbiAgICogdmFyIHN0b29nZXMgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSxcbiAgICogICB7ICduYW1lJzogJ2xhcnJ5JywgJ2FnZSc6IDUwIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uZXZlcnkoc3Rvb2dlcywgJ2FnZScpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy53aGVyZVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLmV2ZXJ5KHN0b29nZXMsIHsgJ2FnZSc6IDUwIH0pO1xuICAgKiAvLyA9PiBmYWxzZVxuICAgKi9cbiAgZnVuY3Rpb24gZXZlcnkoY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgcmVzdWx0ID0gdHJ1ZTtcbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcblxuICAgIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgaWYgKCEocmVzdWx0ID0gISFjYWxsYmFjayhjb2xsZWN0aW9uW2luZGV4XSwgaW5kZXgsIGNvbGxlY3Rpb24pKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiAocmVzdWx0ID0gISFjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEV4YW1pbmVzIGVhY2ggZWxlbWVudCBpbiBhIGBjb2xsZWN0aW9uYCwgcmV0dXJuaW5nIGFuIGFycmF5IG9mIGFsbCBlbGVtZW50c1xuICAgKiB0aGUgYGNhbGxiYWNrYCByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmRcbiAgICogaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyBzZWxlY3RcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBlbGVtZW50cyB0aGF0IHBhc3NlZCB0aGUgY2FsbGJhY2sgY2hlY2suXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBldmVucyA9IF8uZmlsdGVyKFsxLCAyLCAzLCA0LCA1LCA2XSwgZnVuY3Rpb24obnVtKSB7IHJldHVybiBudW0gJSAyID09IDA7IH0pO1xuICAgKiAvLyA9PiBbMiwgNCwgNl1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdhcHBsZScsICAnb3JnYW5pYyc6IGZhbHNlLCAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2NhcnJvdCcsICdvcmdhbmljJzogdHJ1ZSwgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5maWx0ZXIoZm9vZCwgJ29yZ2FuaWMnKTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnY2Fycm90JywgJ29yZ2FuaWMnOiB0cnVlLCAndHlwZSc6ICd2ZWdldGFibGUnIH1dXG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy53aGVyZVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLmZpbHRlcihmb29kLCB7ICd0eXBlJzogJ2ZydWl0JyB9KTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnYXBwbGUnLCAnb3JnYW5pYyc6IGZhbHNlLCAndHlwZSc6ICdmcnVpdCcgfV1cbiAgICovXG4gIGZ1bmN0aW9uIGZpbHRlcihjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcblxuICAgIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gY29sbGVjdGlvbltpbmRleF07XG4gICAgICAgIGlmIChjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGFtaW5lcyBlYWNoIGVsZW1lbnQgaW4gYSBgY29sbGVjdGlvbmAsIHJldHVybmluZyB0aGUgZmlyc3QgdGhhdCB0aGUgYGNhbGxiYWNrYFxuICAgKiByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gICAqIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyBkZXRlY3RcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgZWxlbWVudCB0aGF0IHBhc3NlZCB0aGUgY2FsbGJhY2sgY2hlY2ssXG4gICAqICBlbHNlIGB1bmRlZmluZWRgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgZXZlbiA9IF8uZmluZChbMSwgMiwgMywgNCwgNSwgNl0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gbnVtICUgMiA9PSAwOyB9KTtcbiAgICogLy8gPT4gMlxuICAgKlxuICAgKiB2YXIgZm9vZCA9IFtcbiAgICogICB7ICduYW1lJzogJ2FwcGxlJywgICdvcmdhbmljJzogZmFsc2UsICd0eXBlJzogJ2ZydWl0JyB9LFxuICAgKiAgIHsgJ25hbWUnOiAnYmFuYW5hJywgJ29yZ2FuaWMnOiB0cnVlLCAgJ3R5cGUnOiAnZnJ1aXQnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdiZWV0JywgICAnb3JnYW5pYyc6IGZhbHNlLCAndHlwZSc6ICd2ZWdldGFibGUnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUsICAndHlwZSc6ICd2ZWdldGFibGUnIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLndoZXJlXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIHZhciB2ZWdnaWUgPSBfLmZpbmQoZm9vZCwgeyAndHlwZSc6ICd2ZWdldGFibGUnIH0pO1xuICAgKiAvLyA9PiB7ICduYW1lJzogJ2JlZXQnLCAnb3JnYW5pYyc6IGZhbHNlLCAndHlwZSc6ICd2ZWdldGFibGUnIH1cbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIHZhciBoZWFsdGh5ID0gXy5maW5kKGZvb2QsICdvcmdhbmljJyk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnYmFuYW5hJywgJ29yZ2FuaWMnOiB0cnVlLCAndHlwZSc6ICdmcnVpdCcgfVxuICAgKi9cbiAgZnVuY3Rpb24gZmluZChjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciByZXN1bHQ7XG4gICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG5cbiAgICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgaWYgKGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIG92ZXIgYSBgY29sbGVjdGlvbmAsIGV4ZWN1dGluZyB0aGUgYGNhbGxiYWNrYCBmb3IgZWFjaCBlbGVtZW50IGluXG4gICAqIHRoZSBgY29sbGVjdGlvbmAuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlXG4gICAqIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLiBDYWxsYmFja3MgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5XG4gICAqIGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGVhY2hcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R8U3RyaW5nfSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXyhbMSwgMiwgM10pLmZvckVhY2goYWxlcnQpLmpvaW4oJywnKTtcbiAgICogLy8gPT4gYWxlcnRzIGVhY2ggbnVtYmVyIGFuZCByZXR1cm5zICcxLDIsMydcbiAgICpcbiAgICogXy5mb3JFYWNoKHsgJ29uZSc6IDEsICd0d28nOiAyLCAndGhyZWUnOiAzIH0sIGFsZXJ0KTtcbiAgICogLy8gPT4gYWxlcnRzIGVhY2ggbnVtYmVyIHZhbHVlIChvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAgICovXG4gIGZ1bmN0aW9uIGZvckVhY2goY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBpZiAoY2FsbGJhY2sgJiYgdHlwZW9mIHRoaXNBcmcgPT0gJ3VuZGVmaW5lZCcgJiYgaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayhjb2xsZWN0aW9uW2luZGV4XSwgaW5kZXgsIGNvbGxlY3Rpb24pID09PSBmYWxzZSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVhY2goY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZiBrZXlzIHJldHVybmVkIGZyb20gcnVubmluZyBlYWNoIGVsZW1lbnQgb2YgdGhlXG4gICAqIGBjb2xsZWN0aW9uYCB0aHJvdWdoIHRoZSBgY2FsbGJhY2tgLiBUaGUgY29ycmVzcG9uZGluZyB2YWx1ZSBvZiBlYWNoIGtleSBpc1xuICAgKiBhbiBhcnJheSBvZiBlbGVtZW50cyBwYXNzZWQgdG8gYGNhbGxiYWNrYCB0aGF0IHJldHVybmVkIHRoZSBrZXkuIFRoZSBgY2FsbGJhY2tgXG4gICAqIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbXBvc2VkIGFnZ3JlZ2F0ZSBvYmplY3QuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZ3JvdXBCeShbNC4yLCA2LjEsIDYuNF0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gTWF0aC5mbG9vcihudW0pOyB9KTtcbiAgICogLy8gPT4geyAnNCc6IFs0LjJdLCAnNic6IFs2LjEsIDYuNF0gfVxuICAgKlxuICAgKiBfLmdyb3VwQnkoWzQuMiwgNi4xLCA2LjRdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIHRoaXMuZmxvb3IobnVtKTsgfSwgTWF0aCk7XG4gICAqIC8vID0+IHsgJzQnOiBbNC4yXSwgJzYnOiBbNi4xLCA2LjRdIH1cbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uZ3JvdXBCeShbJ29uZScsICd0d28nLCAndGhyZWUnXSwgJ2xlbmd0aCcpO1xuICAgKiAvLyA9PiB7ICczJzogWydvbmUnLCAndHdvJ10sICc1JzogWyd0aHJlZSddIH1cbiAgICovXG4gIGZ1bmN0aW9uIGdyb3VwQnkoY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG5cbiAgICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICAgIGtleSA9IGNhbGxiYWNrKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pICsgJyc7XG4gICAgICAoaGFzT3duUHJvcGVydHkuY2FsbChyZXN1bHQsIGtleSkgPyByZXN1bHRba2V5XSA6IHJlc3VsdFtrZXldID0gW10pLnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogSW52b2tlcyB0aGUgbWV0aG9kIG5hbWVkIGJ5IGBtZXRob2ROYW1lYCBvbiBlYWNoIGVsZW1lbnQgaW4gdGhlIGBjb2xsZWN0aW9uYCxcbiAgICogcmV0dXJuaW5nIGFuIGFycmF5IG9mIHRoZSByZXN1bHRzIG9mIGVhY2ggaW52b2tlZCBtZXRob2QuIEFkZGl0aW9uYWwgYXJndW1lbnRzXG4gICAqIHdpbGwgYmUgcGFzc2VkIHRvIGVhY2ggaW52b2tlZCBtZXRob2QuIElmIGBtZXRob2ROYW1lYCBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsXG4gICAqIGJlIGludm9rZWQgZm9yLCBhbmQgYHRoaXNgIGJvdW5kIHRvLCBlYWNoIGVsZW1lbnQgaW4gdGhlIGBjb2xsZWN0aW9uYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IG1ldGhvZE5hbWUgVGhlIG5hbWUgb2YgdGhlIG1ldGhvZCB0byBpbnZva2Ugb3JcbiAgICogIHRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFthcmcxLCBhcmcyLCAuLi5dIEFyZ3VtZW50cyB0byBpbnZva2UgdGhlIG1ldGhvZCB3aXRoLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgdGhlIHJlc3VsdHMgb2YgZWFjaCBpbnZva2VkIG1ldGhvZC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pbnZva2UoW1s1LCAxLCA3XSwgWzMsIDIsIDFdXSwgJ3NvcnQnKTtcbiAgICogLy8gPT4gW1sxLCA1LCA3XSwgWzEsIDIsIDNdXVxuICAgKlxuICAgKiBfLmludm9rZShbMTIzLCA0NTZdLCBTdHJpbmcucHJvdG90eXBlLnNwbGl0LCAnJyk7XG4gICAqIC8vID0+IFtbJzEnLCAnMicsICczJ10sIFsnNCcsICc1JywgJzYnXV1cbiAgICovXG4gIGZ1bmN0aW9uIGludm9rZShjb2xsZWN0aW9uLCBtZXRob2ROYW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBzbGljZShhcmd1bWVudHMsIDIpLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBpc0Z1bmMgPSB0eXBlb2YgbWV0aG9kTmFtZSA9PSAnZnVuY3Rpb24nLFxuICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSBBcnJheSh0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInID8gbGVuZ3RoIDogMCk7XG5cbiAgICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXN1bHRbKytpbmRleF0gPSAoaXNGdW5jID8gbWV0aG9kTmFtZSA6IHZhbHVlW21ldGhvZE5hbWVdKS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIHZhbHVlcyBieSBydW5uaW5nIGVhY2ggZWxlbWVudCBpbiB0aGUgYGNvbGxlY3Rpb25gXG4gICAqIHRocm91Z2ggdGhlIGBjYWxsYmFja2AuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoXG4gICAqIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyBjb2xsZWN0XG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxTdHJpbmd9IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXJcbiAgICogIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGVcbiAgICogIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgYXJyYXkgb2YgdGhlIHJlc3VsdHMgb2YgZWFjaCBgY2FsbGJhY2tgIGV4ZWN1dGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5tYXAoWzEsIDIsIDNdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIG51bSAqIDM7IH0pO1xuICAgKiAvLyA9PiBbMywgNiwgOV1cbiAgICpcbiAgICogXy5tYXAoeyAnb25lJzogMSwgJ3R3byc6IDIsICd0aHJlZSc6IDMgfSwgZnVuY3Rpb24obnVtKSB7IHJldHVybiBudW0gKiAzOyB9KTtcbiAgICogLy8gPT4gWzMsIDYsIDldIChvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAgICpcbiAgICogdmFyIHN0b29nZXMgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSxcbiAgICogICB7ICduYW1lJzogJ2xhcnJ5JywgJ2FnZSc6IDUwIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8ubWFwKHN0b29nZXMsICduYW1lJyk7XG4gICAqIC8vID0+IFsnbW9lJywgJ2xhcnJ5J11cbiAgICovXG4gIGZ1bmN0aW9uIG1hcChjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSBBcnJheSh0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInID8gbGVuZ3RoIDogMCk7XG5cbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IGNhbGxiYWNrKGNvbGxlY3Rpb25baW5kZXhdLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgICAgICByZXN1bHRbKytpbmRleF0gPSBjYWxsYmFjayh2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgbWF4aW11bSB2YWx1ZSBvZiBhbiBgYXJyYXlgLiBJZiBgY2FsbGJhY2tgIGlzIHBhc3NlZCxcbiAgICogaXQgd2lsbCBiZSBleGVjdXRlZCBmb3IgZWFjaCB2YWx1ZSBpbiB0aGUgYGFycmF5YCB0byBnZW5lcmF0ZSB0aGVcbiAgICogY3JpdGVyaW9uIGJ5IHdoaWNoIHRoZSB2YWx1ZSBpcyByYW5rZWQuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvXG4gICAqIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtNaXhlZH0gUmV0dXJucyB0aGUgbWF4aW11bSB2YWx1ZS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5tYXgoWzQsIDIsIDgsIDZdKTtcbiAgICogLy8gPT4gOFxuICAgKlxuICAgKiB2YXIgc3Rvb2dlcyA9IFtcbiAgICogICB7ICduYW1lJzogJ21vZScsICdhZ2UnOiA0MCB9LFxuICAgKiAgIHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfVxuICAgKiBdO1xuICAgKlxuICAgKiBfLm1heChzdG9vZ2VzLCBmdW5jdGlvbihzdG9vZ2UpIHsgcmV0dXJuIHN0b29nZS5hZ2U7IH0pO1xuICAgKiAvLyA9PiB7ICduYW1lJzogJ2xhcnJ5JywgJ2FnZSc6IDUwIH07XG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy5wbHVja1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLm1heChzdG9vZ2VzLCAnYWdlJyk7XG4gICAqIC8vID0+IHsgJ25hbWUnOiAnbGFycnknLCAnYWdlJzogNTAgfTtcbiAgICovXG4gIGZ1bmN0aW9uIG1heChjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciBjb21wdXRlZCA9IC1JbmZpbml0eSxcbiAgICAgICAgcmVzdWx0ID0gY29tcHV0ZWQ7XG5cbiAgICBpZiAoIWNhbGxiYWNrICYmIGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBjb2xsZWN0aW9uW2luZGV4XTtcbiAgICAgICAgaWYgKHZhbHVlID4gcmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sgPSAhY2FsbGJhY2sgJiYgaXNTdHJpbmcoY29sbGVjdGlvbilcbiAgICAgICAgPyBjaGFyQXRDYWxsYmFja1xuICAgICAgICA6IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcblxuICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgICAgICBpZiAoY3VycmVudCA+IGNvbXB1dGVkKSB7XG4gICAgICAgICAgY29tcHV0ZWQgPSBjdXJyZW50O1xuICAgICAgICAgIHJlc3VsdCA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIG1pbmltdW0gdmFsdWUgb2YgYW4gYGFycmF5YC4gSWYgYGNhbGxiYWNrYCBpcyBwYXNzZWQsXG4gICAqIGl0IHdpbGwgYmUgZXhlY3V0ZWQgZm9yIGVhY2ggdmFsdWUgaW4gdGhlIGBhcnJheWAgdG8gZ2VuZXJhdGUgdGhlXG4gICAqIGNyaXRlcmlvbiBieSB3aGljaCB0aGUgdmFsdWUgaXMgcmFua2VkLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2BcbiAgICogYW5kIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxTdHJpbmd9IFtjYWxsYmFjaz1pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXJcbiAgICogIGl0ZXJhdGlvbi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGVcbiAgICogIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIG1pbmltdW0gdmFsdWUuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ubWluKFs0LCAyLCA4LCA2XSk7XG4gICAqIC8vID0+IDJcbiAgICpcbiAgICogdmFyIHN0b29nZXMgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSxcbiAgICogICB7ICduYW1lJzogJ2xhcnJ5JywgJ2FnZSc6IDUwIH1cbiAgICogXTtcbiAgICpcbiAgICogXy5taW4oc3Rvb2dlcywgZnVuY3Rpb24oc3Rvb2dlKSB7IHJldHVybiBzdG9vZ2UuYWdlOyB9KTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8ubWluKHN0b29nZXMsICdhZ2UnKTtcbiAgICogLy8gPT4geyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfTtcbiAgICovXG4gIGZ1bmN0aW9uIG1pbihjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciBjb21wdXRlZCA9IEluZmluaXR5LFxuICAgICAgICByZXN1bHQgPSBjb21wdXRlZDtcblxuICAgIGlmICghY2FsbGJhY2sgJiYgaXNBcnJheShjb2xsZWN0aW9uKSkge1xuICAgICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGg7XG5cbiAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGNvbGxlY3Rpb25baW5kZXhdO1xuICAgICAgICBpZiAodmFsdWUgPCByZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayA9ICFjYWxsYmFjayAmJiBpc1N0cmluZyhjb2xsZWN0aW9uKVxuICAgICAgICA/IGNoYXJBdENhbGxiYWNrXG4gICAgICAgIDogY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuXG4gICAgICBlYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgICB2YXIgY3VycmVudCA9IGNhbGxiYWNrKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbik7XG4gICAgICAgIGlmIChjdXJyZW50IDwgY29tcHV0ZWQpIHtcbiAgICAgICAgICBjb21wdXRlZCA9IGN1cnJlbnQ7XG4gICAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHJpZXZlcyB0aGUgdmFsdWUgb2YgYSBzcGVjaWZpZWQgcHJvcGVydHkgZnJvbSBhbGwgZWxlbWVudHMgaW4gdGhlIGBjb2xsZWN0aW9uYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAdHlwZSBGdW5jdGlvblxuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IFRoZSBwcm9wZXJ0eSB0byBwbHVjay5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHByb3BlcnR5IHZhbHVlcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIHN0b29nZXMgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSxcbiAgICogICB7ICduYW1lJzogJ2xhcnJ5JywgJ2FnZSc6IDUwIH1cbiAgICogXTtcbiAgICpcbiAgICogXy5wbHVjayhzdG9vZ2VzLCAnbmFtZScpO1xuICAgKiAvLyA9PiBbJ21vZScsICdsYXJyeSddXG4gICAqL1xuICB2YXIgcGx1Y2sgPSBtYXA7XG5cbiAgLyoqXG4gICAqIFJlZHVjZXMgYSBgY29sbGVjdGlvbmAgdG8gYSB2YWx1ZSB0aGF0IGlzIHRoZSBhY2N1bXVsYXRlZCByZXN1bHQgb2YgcnVubmluZ1xuICAgKiBlYWNoIGVsZW1lbnQgaW4gdGhlIGBjb2xsZWN0aW9uYCB0aHJvdWdoIHRoZSBgY2FsbGJhY2tgLCB3aGVyZSBlYWNoIHN1Y2Nlc3NpdmVcbiAgICogYGNhbGxiYWNrYCBleGVjdXRpb24gY29uc3VtZXMgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgcHJldmlvdXMgZXhlY3V0aW9uLlxuICAgKiBJZiBgYWNjdW11bGF0b3JgIGlzIG5vdCBwYXNzZWQsIHRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSBgY29sbGVjdGlvbmAgd2lsbCBiZVxuICAgKiB1c2VkIGFzIHRoZSBpbml0aWFsIGBhY2N1bXVsYXRvcmAgdmFsdWUuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYFxuICAgKiBhbmQgaW52b2tlZCB3aXRoIGZvdXIgYXJndW1lbnRzOyAoYWNjdW11bGF0b3IsIHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyBmb2xkbCwgaW5qZWN0XG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtIHtNaXhlZH0gW2FjY3VtdWxhdG9yXSBJbml0aWFsIHZhbHVlIG9mIHRoZSBhY2N1bXVsYXRvci5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgc3VtID0gXy5yZWR1Y2UoWzEsIDIsIDNdLCBmdW5jdGlvbihzdW0sIG51bSkge1xuICAgKiAgIHJldHVybiBzdW0gKyBudW07XG4gICAqIH0pO1xuICAgKiAvLyA9PiA2XG4gICAqXG4gICAqIHZhciBtYXBwZWQgPSBfLnJlZHVjZSh7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfSwgZnVuY3Rpb24ocmVzdWx0LCBudW0sIGtleSkge1xuICAgKiAgIHJlc3VsdFtrZXldID0gbnVtICogMztcbiAgICogICByZXR1cm4gcmVzdWx0O1xuICAgKiB9LCB7fSk7XG4gICAqIC8vID0+IHsgJ2EnOiAzLCAnYic6IDYsICdjJzogOSB9XG4gICAqL1xuICBmdW5jdGlvbiByZWR1Y2UoY29sbGVjdGlvbiwgY2FsbGJhY2ssIGFjY3VtdWxhdG9yLCB0aGlzQXJnKSB7XG4gICAgdmFyIG5vYWNjdW0gPSBhcmd1bWVudHMubGVuZ3RoIDwgMztcbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnLCA0KTtcblxuICAgIGlmIChpc0FycmF5KGNvbGxlY3Rpb24pKSB7XG4gICAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aDtcblxuICAgICAgaWYgKG5vYWNjdW0pIHtcbiAgICAgICAgYWNjdW11bGF0b3IgPSBjb2xsZWN0aW9uWysraW5kZXhdO1xuICAgICAgfVxuICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgYWNjdW11bGF0b3IgPSBjYWxsYmFjayhhY2N1bXVsYXRvciwgY29sbGVjdGlvbltpbmRleF0sIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgYWNjdW11bGF0b3IgPSBub2FjY3VtXG4gICAgICAgICAgPyAobm9hY2N1bSA9IGZhbHNlLCB2YWx1ZSlcbiAgICAgICAgICA6IGNhbGxiYWNrKGFjY3VtdWxhdG9yLCB2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY3VtdWxhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGlzIHNpbWlsYXIgdG8gYF8ucmVkdWNlYCwgZXhjZXB0IHRoYXQgaXQgaXRlcmF0ZXMgb3ZlciBhXG4gICAqIGBjb2xsZWN0aW9uYCBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGZvbGRyXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICogQHBhcmFtIHtNaXhlZH0gW2FjY3VtdWxhdG9yXSBJbml0aWFsIHZhbHVlIG9mIHRoZSBhY2N1bXVsYXRvci5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgbGlzdCA9IFtbMCwgMV0sIFsyLCAzXSwgWzQsIDVdXTtcbiAgICogdmFyIGZsYXQgPSBfLnJlZHVjZVJpZ2h0KGxpc3QsIGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIGEuY29uY2F0KGIpOyB9LCBbXSk7XG4gICAqIC8vID0+IFs0LCA1LCAyLCAzLCAwLCAxXVxuICAgKi9cbiAgZnVuY3Rpb24gcmVkdWNlUmlnaHQoY29sbGVjdGlvbiwgY2FsbGJhY2ssIGFjY3VtdWxhdG9yLCB0aGlzQXJnKSB7XG4gICAgdmFyIGl0ZXJhYmxlID0gY29sbGVjdGlvbixcbiAgICAgICAgbGVuZ3RoID0gY29sbGVjdGlvbiA/IGNvbGxlY3Rpb24ubGVuZ3RoIDogMCxcbiAgICAgICAgbm9hY2N1bSA9IGFyZ3VtZW50cy5sZW5ndGggPCAzO1xuXG4gICAgaWYgKHR5cGVvZiBsZW5ndGggIT0gJ251bWJlcicpIHtcbiAgICAgIHZhciBwcm9wcyA9IGtleXMoY29sbGVjdGlvbik7XG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG4gICAgfSBlbHNlIGlmIChub0NoYXJCeUluZGV4ICYmIGlzU3RyaW5nKGNvbGxlY3Rpb24pKSB7XG4gICAgICBpdGVyYWJsZSA9IGNvbGxlY3Rpb24uc3BsaXQoJycpO1xuICAgIH1cbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnLCA0KTtcbiAgICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgaW5kZXggPSBwcm9wcyA/IHByb3BzWy0tbGVuZ3RoXSA6IC0tbGVuZ3RoO1xuICAgICAgYWNjdW11bGF0b3IgPSBub2FjY3VtXG4gICAgICAgID8gKG5vYWNjdW0gPSBmYWxzZSwgaXRlcmFibGVbaW5kZXhdKVxuICAgICAgICA6IGNhbGxiYWNrKGFjY3VtdWxhdG9yLCBpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBjb2xsZWN0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogVGhlIG9wcG9zaXRlIG9mIGBfLmZpbHRlcmAsIHRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGVsZW1lbnRzIG9mIGFcbiAgICogYGNvbGxlY3Rpb25gIHRoYXQgYGNhbGxiYWNrYCBkb2VzICoqbm90KiogcmV0dXJuIHRydXRoeSBmb3IuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBlbGVtZW50cyB0aGF0IGRpZCAqKm5vdCoqIHBhc3MgdGhlXG4gICAqICBjYWxsYmFjayBjaGVjay5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIG9kZHMgPSBfLnJlamVjdChbMSwgMiwgMywgNCwgNSwgNl0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gbnVtICUgMiA9PSAwOyB9KTtcbiAgICogLy8gPT4gWzEsIDMsIDVdXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYXBwbGUnLCAgJ29yZ2FuaWMnOiBmYWxzZSwgJ3R5cGUnOiAnZnJ1aXQnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUsICAndHlwZSc6ICd2ZWdldGFibGUnIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8ucmVqZWN0KGZvb2QsICdvcmdhbmljJyk7XG4gICAqIC8vID0+IFt7ICduYW1lJzogJ2FwcGxlJywgJ29yZ2FuaWMnOiBmYWxzZSwgJ3R5cGUnOiAnZnJ1aXQnIH1dXG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy53aGVyZVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLnJlamVjdChmb29kLCB7ICd0eXBlJzogJ2ZydWl0JyB9KTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnY2Fycm90JywgJ29yZ2FuaWMnOiB0cnVlLCAndHlwZSc6ICd2ZWdldGFibGUnIH1dXG4gICAqL1xuICBmdW5jdGlvbiByZWplY3QoY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICByZXR1cm4gZmlsdGVyKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgICAgcmV0dXJuICFjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygc2h1ZmZsZWQgYGFycmF5YCB2YWx1ZXMsIHVzaW5nIGEgdmVyc2lvbiBvZiB0aGVcbiAgICogRmlzaGVyLVlhdGVzIHNodWZmbGUuIFNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Zpc2hlci1ZYXRlc19zaHVmZmxlLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gc2h1ZmZsZS5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IHNodWZmbGVkIGNvbGxlY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uc2h1ZmZsZShbMSwgMiwgMywgNCwgNSwgNl0pO1xuICAgKiAvLyA9PiBbNCwgMSwgNiwgMywgNSwgMl1cbiAgICovXG4gIGZ1bmN0aW9uIHNodWZmbGUoY29sbGVjdGlvbikge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSBBcnJheSh0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInID8gbGVuZ3RoIDogMCk7XG5cbiAgICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgcmFuZCA9IGZsb29yKG5hdGl2ZVJhbmRvbSgpICogKCsraW5kZXggKyAxKSk7XG4gICAgICByZXN1bHRbaW5kZXhdID0gcmVzdWx0W3JhbmRdO1xuICAgICAgcmVzdWx0W3JhbmRdID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzaXplIG9mIHRoZSBgY29sbGVjdGlvbmAgYnkgcmV0dXJuaW5nIGBjb2xsZWN0aW9uLmxlbmd0aGAgZm9yIGFycmF5c1xuICAgKiBhbmQgYXJyYXktbGlrZSBvYmplY3RzIG9yIHRoZSBudW1iZXIgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydGllcyBmb3Igb2JqZWN0cy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGluc3BlY3QuXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgYGNvbGxlY3Rpb24ubGVuZ3RoYCBvciBudW1iZXIgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5zaXplKFsxLCAyXSk7XG4gICAqIC8vID0+IDJcbiAgICpcbiAgICogXy5zaXplKHsgJ29uZSc6IDEsICd0d28nOiAyLCAndGhyZWUnOiAzIH0pO1xuICAgKiAvLyA9PiAzXG4gICAqXG4gICAqIF8uc2l6ZSgnY3VybHknKTtcbiAgICogLy8gPT4gNVxuICAgKi9cbiAgZnVuY3Rpb24gc2l6ZShjb2xsZWN0aW9uKSB7XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24gPyBjb2xsZWN0aW9uLmxlbmd0aCA6IDA7XG4gICAgcmV0dXJuIHR5cGVvZiBsZW5ndGggPT0gJ251bWJlcicgPyBsZW5ndGggOiBrZXlzKGNvbGxlY3Rpb24pLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGBjYWxsYmFja2AgcmV0dXJucyBhIHRydXRoeSB2YWx1ZSBmb3IgKiphbnkqKiBlbGVtZW50IG9mIGFcbiAgICogYGNvbGxlY3Rpb25gLiBUaGUgZnVuY3Rpb24gcmV0dXJucyBhcyBzb29uIGFzIGl0IGZpbmRzIHBhc3NpbmcgdmFsdWUsIGFuZFxuICAgKiBkb2VzIG5vdCBpdGVyYXRlIG92ZXIgdGhlIGVudGlyZSBgY29sbGVjdGlvbmAuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvXG4gICAqIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyBhbnlcbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIGNhbGxiYWNrIGNoZWNrLFxuICAgKiAgZWxzZSBgZmFsc2VgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnNvbWUoW251bGwsIDAsICd5ZXMnLCBmYWxzZV0sIEJvb2xlYW4pO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYXBwbGUnLCAgJ29yZ2FuaWMnOiBmYWxzZSwgJ3R5cGUnOiAnZnJ1aXQnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUsICAndHlwZSc6ICd2ZWdldGFibGUnIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uc29tZShmb29kLCAnb3JnYW5pYycpO1xuICAgKiAvLyA9PiB0cnVlXG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy53aGVyZVwiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLnNvbWUoZm9vZCwgeyAndHlwZSc6ICdtZWF0JyB9KTtcbiAgICogLy8gPT4gZmFsc2VcbiAgICovXG4gIGZ1bmN0aW9uIHNvbWUoY29sbGVjdGlvbiwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuXG4gICAgaWYgKGlzQXJyYXkoY29sbGVjdGlvbikpIHtcbiAgICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICBpZiAoKHJlc3VsdCA9IGNhbGxiYWNrKGNvbGxlY3Rpb25baW5kZXhdLCBpbmRleCwgY29sbGVjdGlvbikpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuICEocmVzdWx0ID0gY2FsbGJhY2sodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICEhcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgZWxlbWVudHMsIHNvcnRlZCBpbiBhc2NlbmRpbmcgb3JkZXIgYnkgdGhlIHJlc3VsdHMgb2ZcbiAgICogcnVubmluZyBlYWNoIGVsZW1lbnQgaW4gdGhlIGBjb2xsZWN0aW9uYCB0aHJvdWdoIHRoZSBgY2FsbGJhY2tgLiBUaGlzIG1ldGhvZFxuICAgKiBwZXJmb3JtcyBhIHN0YWJsZSBzb3J0LCB0aGF0IGlzLCBpdCB3aWxsIHByZXNlcnZlIHRoZSBvcmlnaW5hbCBzb3J0IG9yZGVyIG9mXG4gICAqIGVxdWFsIGVsZW1lbnRzLiBUaGUgYGNhbGxiYWNrYCBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZVxuICAgKiBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ29sbGVjdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheXxPYmplY3R8U3RyaW5nfSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgbmV3IGFycmF5IG9mIHNvcnRlZCBlbGVtZW50cy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5zb3J0QnkoWzEsIDIsIDNdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIE1hdGguc2luKG51bSk7IH0pO1xuICAgKiAvLyA9PiBbMywgMSwgMl1cbiAgICpcbiAgICogXy5zb3J0QnkoWzEsIDIsIDNdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIHRoaXMuc2luKG51bSk7IH0sIE1hdGgpO1xuICAgKiAvLyA9PiBbMywgMSwgMl1cbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uc29ydEJ5KFsnYmFuYW5hJywgJ3N0cmF3YmVycnknLCAnYXBwbGUnXSwgJ2xlbmd0aCcpO1xuICAgKiAvLyA9PiBbJ2FwcGxlJywgJ2JhbmFuYScsICdzdHJhd2JlcnJ5J11cbiAgICovXG4gIGZ1bmN0aW9uIHNvcnRCeShjb2xsZWN0aW9uLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBjb2xsZWN0aW9uID8gY29sbGVjdGlvbi5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSBBcnJheSh0eXBlb2YgbGVuZ3RoID09ICdudW1iZXInID8gbGVuZ3RoIDogMCk7XG5cbiAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICBmb3JFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pIHtcbiAgICAgIHJlc3VsdFsrK2luZGV4XSA9IHtcbiAgICAgICAgJ2NyaXRlcmlhJzogY2FsbGJhY2sodmFsdWUsIGtleSwgY29sbGVjdGlvbiksXG4gICAgICAgICdpbmRleCc6IGluZGV4LFxuICAgICAgICAndmFsdWUnOiB2YWx1ZVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG4gICAgcmVzdWx0LnNvcnQoY29tcGFyZUFzY2VuZGluZyk7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICByZXN1bHRbbGVuZ3RoXSA9IHJlc3VsdFtsZW5ndGhdLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIHRoZSBgY29sbGVjdGlvbmAgdG8gYW4gYXJyYXkuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IENvbGxlY3Rpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fFN0cmluZ30gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBjb252ZXJ0LlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBjb252ZXJ0ZWQgYXJyYXkuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIChmdW5jdGlvbigpIHsgcmV0dXJuIF8udG9BcnJheShhcmd1bWVudHMpLnNsaWNlKDEpOyB9KSgxLCAyLCAzLCA0KTtcbiAgICogLy8gPT4gWzIsIDMsIDRdXG4gICAqL1xuICBmdW5jdGlvbiB0b0FycmF5KGNvbGxlY3Rpb24pIHtcbiAgICBpZiAoY29sbGVjdGlvbiAmJiB0eXBlb2YgY29sbGVjdGlvbi5sZW5ndGggPT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBub0NoYXJCeUluZGV4ICYmIGlzU3RyaW5nKGNvbGxlY3Rpb24pXG4gICAgICAgID8gY29sbGVjdGlvbi5zcGxpdCgnJylcbiAgICAgICAgOiBzbGljZShjb2xsZWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcyhjb2xsZWN0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGFtaW5lcyBlYWNoIGVsZW1lbnQgaW4gYSBgY29sbGVjdGlvbmAsIHJldHVybmluZyBhbiBhcnJheSBvZiBhbGwgZWxlbWVudHNcbiAgICogdGhhdCBoYXZlIHRoZSBnaXZlbiBgcHJvcGVydGllc2AuIFdoZW4gY2hlY2tpbmcgYHByb3BlcnRpZXNgLCB0aGlzIG1ldGhvZFxuICAgKiBwZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudFxuICAgKiB0byBlYWNoIG90aGVyLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEB0eXBlIEZ1bmN0aW9uXG4gICAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fE9iamVjdHxTdHJpbmd9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJvcGVydGllcyBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBmaWx0ZXIgYnkuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIGdpdmVuIGBwcm9wZXJ0aWVzYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIHN0b29nZXMgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdtb2UnLCAnYWdlJzogNDAgfSxcbiAgICogICB7ICduYW1lJzogJ2xhcnJ5JywgJ2FnZSc6IDUwIH1cbiAgICogXTtcbiAgICpcbiAgICogXy53aGVyZShzdG9vZ2VzLCB7ICdhZ2UnOiA0MCB9KTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnbW9lJywgJ2FnZSc6IDQwIH1dXG4gICAqL1xuICB2YXIgd2hlcmUgPSBmaWx0ZXI7XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgd2l0aCBhbGwgZmFsc2V5IHZhbHVlcyBvZiBgYXJyYXlgIHJlbW92ZWQuIFRoZSB2YWx1ZXNcbiAgICogYGZhbHNlYCwgYG51bGxgLCBgMGAsIGBcIlwiYCwgYHVuZGVmaW5lZGAgYW5kIGBOYU5gIGFyZSBhbGwgZmFsc2V5LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhY3QuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5jb21wYWN0KFswLCAxLCBmYWxzZSwgMiwgJycsIDNdKTtcbiAgICogLy8gPT4gWzEsIDIsIDNdXG4gICAqL1xuICBmdW5jdGlvbiBjb21wYWN0KGFycmF5KSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgcmVzdWx0ID0gW107XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIGBhcnJheWAgZWxlbWVudHMgbm90IHByZXNlbnQgaW4gdGhlIG90aGVyIGFycmF5c1xuICAgKiB1c2luZyBzdHJpY3QgZXF1YWxpdHkgZm9yIGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHByb2Nlc3MuXG4gICAqIEBwYXJhbSB7QXJyYXl9IFthcnJheTEsIGFycmF5MiwgLi4uXSBBcnJheXMgdG8gY2hlY2suXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBgYXJyYXlgIGVsZW1lbnRzIG5vdCBwcmVzZW50IGluIHRoZVxuICAgKiAgb3RoZXIgYXJyYXlzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmRpZmZlcmVuY2UoWzEsIDIsIDMsIDQsIDVdLCBbNSwgMiwgMTBdKTtcbiAgICogLy8gPT4gWzEsIDMsIDRdXG4gICAqL1xuICBmdW5jdGlvbiBkaWZmZXJlbmNlKGFycmF5KSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMCxcbiAgICAgICAgZmxhdHRlbmVkID0gY29uY2F0LmFwcGx5KGFycmF5UmVmLCBhcmd1bWVudHMpLFxuICAgICAgICBjb250YWlucyA9IGNhY2hlZENvbnRhaW5zKGZsYXR0ZW5lZCwgbGVuZ3RoKSxcbiAgICAgICAgcmVzdWx0ID0gW107XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgICAgaWYgKCFjb250YWlucyh2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGZpcnN0IGVsZW1lbnQgb2YgdGhlIGBhcnJheWAuIElmIGEgbnVtYmVyIGBuYCBpcyBwYXNzZWQsIHRoZSBmaXJzdFxuICAgKiBgbmAgZWxlbWVudHMgb2YgdGhlIGBhcnJheWAgYXJlIHJldHVybmVkLiBJZiBhIGBjYWxsYmFja2AgZnVuY3Rpb24gaXMgcGFzc2VkLFxuICAgKiB0aGUgZmlyc3QgZWxlbWVudHMgdGhlIGBjYWxsYmFja2AgcmV0dXJucyB0cnV0aHkgZm9yIGFyZSByZXR1cm5lZC4gVGhlIGBjYWxsYmFja2BcbiAgICogaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIGhlYWQsIHRha2VcbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fE51bWJlcnxTdHJpbmd9IFtjYWxsYmFja3xuXSBUaGUgZnVuY3Rpb24gY2FsbGVkXG4gICAqICBwZXIgZWxlbWVudCBvciB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJldHVybi4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yXG4gICAqICBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCJcbiAgICogIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSBmaXJzdCBlbGVtZW50KHMpIG9mIGBhcnJheWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZmlyc3QoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gMVxuICAgKlxuICAgKiBfLmZpcnN0KFsxLCAyLCAzXSwgMik7XG4gICAqIC8vID0+IFsxLCAyXVxuICAgKlxuICAgKiBfLmZpcnN0KFsxLCAyLCAzXSwgZnVuY3Rpb24obnVtKSB7XG4gICAqICAgcmV0dXJuIG51bSA8IDM7XG4gICAqIH0pO1xuICAgKiAvLyA9PiBbMSwgMl1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdiYW5hbmEnLCAnb3JnYW5pYyc6IHRydWUgfSxcbiAgICogICB7ICduYW1lJzogJ2JlZXQnLCAgICdvcmdhbmljJzogZmFsc2UgfSxcbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uZmlyc3QoZm9vZCwgJ29yZ2FuaWMnKTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnYmFuYW5hJywgJ29yZ2FuaWMnOiB0cnVlIH1dXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYXBwbGUnLCAgJ3R5cGUnOiAnZnJ1aXQnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdiYW5hbmEnLCAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2JlZXQnLCAgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ud2hlcmVcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5maXJzdChmb29kLCB7ICd0eXBlJzogJ2ZydWl0JyB9KTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnYXBwbGUnLCAndHlwZSc6ICdmcnVpdCcgfSwgeyAnbmFtZSc6ICdiYW5hbmEnLCAndHlwZSc6ICdmcnVpdCcgfV1cbiAgICovXG4gIGZ1bmN0aW9uIGZpcnN0KGFycmF5LCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGlmIChhcnJheSkge1xuICAgICAgdmFyIG4gPSAwLFxuICAgICAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPSAnbnVtYmVyJyAmJiBjYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGggJiYgY2FsbGJhY2soYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICAgICAgbisrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuID0gY2FsbGJhY2s7XG4gICAgICAgIGlmIChuID09IG51bGwgfHwgdGhpc0FyZykge1xuICAgICAgICAgIHJldHVybiBhcnJheVswXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNsaWNlKGFycmF5LCAwLCBuYXRpdmVNaW4obmF0aXZlTWF4KDAsIG4pLCBsZW5ndGgpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmxhdHRlbnMgYSBuZXN0ZWQgYXJyYXkgKHRoZSBuZXN0aW5nIGNhbiBiZSB0byBhbnkgZGVwdGgpLiBJZiBgc2hhbGxvd2AgaXNcbiAgICogdHJ1dGh5LCBgYXJyYXlgIHdpbGwgb25seSBiZSBmbGF0dGVuZWQgYSBzaW5nbGUgbGV2ZWwuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY29tcGFjdC5cbiAgICogQHBhcmFtIHtCb29sZWFufSBzaGFsbG93IEEgZmxhZyB0byBpbmRpY2F0ZSBvbmx5IGZsYXR0ZW5pbmcgYSBzaW5nbGUgbGV2ZWwuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8uZmxhdHRlbihbMSwgWzJdLCBbMywgW1s0XV1dXSk7XG4gICAqIC8vID0+IFsxLCAyLCAzLCA0XTtcbiAgICpcbiAgICogXy5mbGF0dGVuKFsxLCBbMl0sIFszLCBbWzRdXV1dLCB0cnVlKTtcbiAgICogLy8gPT4gWzEsIDIsIDMsIFtbNF1dXTtcbiAgICovXG4gIGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXksIHNoYWxsb3cpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSBbXTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG5cbiAgICAgIC8vIHJlY3Vyc2l2ZWx5IGZsYXR0ZW4gYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cylcbiAgICAgIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICBwdXNoLmFwcGx5KHJlc3VsdCwgc2hhbGxvdyA/IHZhbHVlIDogZmxhdHRlbih2YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGB2YWx1ZWAgaXMgZm91bmQgdXNpbmdcbiAgICogc3RyaWN0IGVxdWFsaXR5IGZvciBjb21wYXJpc29ucywgaS5lLiBgPT09YC4gSWYgdGhlIGBhcnJheWAgaXMgYWxyZWFkeVxuICAgKiBzb3J0ZWQsIHBhc3NpbmcgYHRydWVgIGZvciBgZnJvbUluZGV4YCB3aWxsIHJ1biBhIGZhc3RlciBiaW5hcnkgc2VhcmNoLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbnxOdW1iZXJ9IFtmcm9tSW5kZXg9MF0gVGhlIGluZGV4IHRvIHNlYXJjaCBmcm9tIG9yIGB0cnVlYCB0b1xuICAgKiAgcGVyZm9ybSBhIGJpbmFyeSBzZWFyY2ggb24gYSBzb3J0ZWQgYGFycmF5YC5cbiAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUgb3IgYC0xYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pbmRleE9mKFsxLCAyLCAzLCAxLCAyLCAzXSwgMik7XG4gICAqIC8vID0+IDFcbiAgICpcbiAgICogXy5pbmRleE9mKFsxLCAyLCAzLCAxLCAyLCAzXSwgMiwgMyk7XG4gICAqIC8vID0+IDRcbiAgICpcbiAgICogXy5pbmRleE9mKFsxLCAxLCAyLCAyLCAzLCAzXSwgMiwgdHJ1ZSk7XG4gICAqIC8vID0+IDJcbiAgICovXG4gIGZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gICAgaWYgKHR5cGVvZiBmcm9tSW5kZXggPT0gJ251bWJlcicpIHtcbiAgICAgIGluZGV4ID0gKGZyb21JbmRleCA8IDAgPyBuYXRpdmVNYXgoMCwgbGVuZ3RoICsgZnJvbUluZGV4KSA6IGZyb21JbmRleCB8fCAwKSAtIDE7XG4gICAgfSBlbHNlIGlmIChmcm9tSW5kZXgpIHtcbiAgICAgIGluZGV4ID0gc29ydGVkSW5kZXgoYXJyYXksIHZhbHVlKTtcbiAgICAgIHJldHVybiBhcnJheVtpbmRleF0gPT09IHZhbHVlID8gaW5kZXggOiAtMTtcbiAgICB9XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIGJ1dCB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuIElmIGEgbnVtYmVyIGBuYCBpcyBwYXNzZWQsIHRoZVxuICAgKiBsYXN0IGBuYCBlbGVtZW50cyBhcmUgZXhjbHVkZWQgZnJvbSB0aGUgcmVzdWx0LiBJZiBhIGBjYWxsYmFja2AgZnVuY3Rpb25cbiAgICogaXMgcGFzc2VkLCB0aGUgbGFzdCBlbGVtZW50cyB0aGUgYGNhbGxiYWNrYCByZXR1cm5zIHRydXRoeSBmb3IgYXJlIGV4Y2x1ZGVkXG4gICAqIGZyb20gdGhlIHJlc3VsdC4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWVcbiAgICogYXJndW1lbnRzOyAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fE51bWJlcnxTdHJpbmd9IFtjYWxsYmFja3xuPTFdIFRoZSBmdW5jdGlvbiBjYWxsZWRcbiAgICogIHBlciBlbGVtZW50IG9yIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gZXhjbHVkZS4gSWYgYSBwcm9wZXJ0eSBuYW1lIG9yXG4gICAqICBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIGEgXCJfLnBsdWNrXCIgb3IgXCJfLndoZXJlXCJcbiAgICogIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGEgc2xpY2Ugb2YgYGFycmF5YC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5pbml0aWFsKFsxLCAyLCAzXSk7XG4gICAqIC8vID0+IFsxLCAyXVxuICAgKlxuICAgKiBfLmluaXRpYWwoWzEsIDIsIDNdLCAyKTtcbiAgICogLy8gPT4gWzFdXG4gICAqXG4gICAqIF8uaW5pdGlhbChbMSwgMiwgM10sIGZ1bmN0aW9uKG51bSkge1xuICAgKiAgIHJldHVybiBudW0gPiAxO1xuICAgKiB9KTtcbiAgICogLy8gPT4gWzFdXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYmVldCcsICAgJ29yZ2FuaWMnOiBmYWxzZSB9LFxuICAgKiAgIHsgJ25hbWUnOiAnY2Fycm90JywgJ29yZ2FuaWMnOiB0cnVlIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uaW5pdGlhbChmb29kLCAnb3JnYW5pYycpO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdiZWV0JywgICAnb3JnYW5pYyc6IGZhbHNlIH1dXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYmFuYW5hJywgJ3R5cGUnOiAnZnJ1aXQnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdiZWV0JywgICAndHlwZSc6ICd2ZWdldGFibGUnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdjYXJyb3QnLCAndHlwZSc6ICd2ZWdldGFibGUnIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLndoZXJlXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8uaW5pdGlhbChmb29kLCB7ICd0eXBlJzogJ3ZlZ2V0YWJsZScgfSk7XG4gICAqIC8vID0+IFt7ICduYW1lJzogJ2JhbmFuYScsICd0eXBlJzogJ2ZydWl0JyB9XVxuICAgKi9cbiAgZnVuY3Rpb24gaW5pdGlhbChhcnJheSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBpZiAoIWFycmF5KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIHZhciBuID0gMCxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPSAnbnVtYmVyJyAmJiBjYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICB2YXIgaW5kZXggPSBsZW5ndGg7XG4gICAgICBjYWxsYmFjayA9IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnKTtcbiAgICAgIHdoaWxlIChpbmRleC0tICYmIGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgICBuKys7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG4gPSAoY2FsbGJhY2sgPT0gbnVsbCB8fCB0aGlzQXJnKSA/IDEgOiBjYWxsYmFjayB8fCBuO1xuICAgIH1cbiAgICByZXR1cm4gc2xpY2UoYXJyYXksIDAsIG5hdGl2ZU1pbihuYXRpdmVNYXgoMCwgbGVuZ3RoIC0gbiksIGxlbmd0aCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBpbnRlcnNlY3Rpb24gb2YgYWxsIHRoZSBwYXNzZWQtaW4gYXJyYXlzIHVzaW5nIHN0cmljdCBlcXVhbGl0eVxuICAgKiBmb3IgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBbYXJyYXkxLCBhcnJheTIsIC4uLl0gQXJyYXlzIHRvIHByb2Nlc3MuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiB1bmlxdWUgZWxlbWVudHMgdGhhdCBhcmUgcHJlc2VudFxuICAgKiAgaW4gKiphbGwqKiBvZiB0aGUgYXJyYXlzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmludGVyc2VjdGlvbihbMSwgMiwgM10sIFsxMDEsIDIsIDEsIDEwXSwgWzIsIDFdKTtcbiAgICogLy8gPT4gWzEsIDJdXG4gICAqL1xuICBmdW5jdGlvbiBpbnRlcnNlY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgYXJnc0xlbmd0aCA9IGFyZ3MubGVuZ3RoLFxuICAgICAgICBjYWNoZSA9IHsgJzAnOiB7fSB9LFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICAgIGlzTGFyZ2UgPSBsZW5ndGggPj0gMTAwLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICAgIG91dGVyOlxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICBpZiAoaXNMYXJnZSkge1xuICAgICAgICB2YXIga2V5ID0gdmFsdWUgKyAnJztcbiAgICAgICAgdmFyIGluaXRlZCA9IGhhc093blByb3BlcnR5LmNhbGwoY2FjaGVbMF0sIGtleSlcbiAgICAgICAgICA/ICEoc2VlbiA9IGNhY2hlWzBdW2tleV0pXG4gICAgICAgICAgOiAoc2VlbiA9IGNhY2hlWzBdW2tleV0gPSBbXSk7XG4gICAgICB9XG4gICAgICBpZiAoaW5pdGVkIHx8IGluZGV4T2Yoc2VlbiwgdmFsdWUpIDwgMCkge1xuICAgICAgICBpZiAoaXNMYXJnZSkge1xuICAgICAgICAgIHNlZW4ucHVzaCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyZ3NJbmRleCA9IGFyZ3NMZW5ndGg7XG4gICAgICAgIHdoaWxlICgtLWFyZ3NJbmRleCkge1xuICAgICAgICAgIGlmICghKGNhY2hlW2FyZ3NJbmRleF0gfHwgKGNhY2hlW2FyZ3NJbmRleF0gPSBjYWNoZWRDb250YWlucyhhcmdzW2FyZ3NJbmRleF0sIDAsIDEwMCkpKSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBgYXJyYXlgLiBJZiBhIG51bWJlciBgbmAgaXMgcGFzc2VkLCB0aGUgbGFzdFxuICAgKiBgbmAgZWxlbWVudHMgb2YgdGhlIGBhcnJheWAgYXJlIHJldHVybmVkLiBJZiBhIGBjYWxsYmFja2AgZnVuY3Rpb24gaXMgcGFzc2VkLFxuICAgKiB0aGUgbGFzdCBlbGVtZW50cyB0aGUgYGNhbGxiYWNrYCByZXR1cm5zIHRydXRoeSBmb3IgYXJlIHJldHVybmVkLiBUaGUgYGNhbGxiYWNrYFxuICAgKiBpcyBib3VuZCB0byBgdGhpc0FyZ2AgYW5kIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM7ICh2YWx1ZSwgaW5kZXgsIGFycmF5KS5cbiAgICpcbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBxdWVyeS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8TnVtYmVyfFN0cmluZ30gW2NhbGxiYWNrfG5dIFRoZSBmdW5jdGlvbiBjYWxsZWRcbiAgICogIHBlciBlbGVtZW50IG9yIHRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gcmV0dXJuLiBJZiBhIHByb3BlcnR5IG5hbWUgb3JcbiAgICogIG9iamVjdCBpcyBwYXNzZWQsIGl0IHdpbGwgYmUgdXNlZCB0byBjcmVhdGUgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIlxuICAgKiAgc3R5bGUgY2FsbGJhY2ssIHJlc3BlY3RpdmVseS5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3RoaXNBcmddIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgY2FsbGJhY2tgLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIGxhc3QgZWxlbWVudChzKSBvZiBgYXJyYXlgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLmxhc3QoWzEsIDIsIDNdKTtcbiAgICogLy8gPT4gM1xuICAgKlxuICAgKiBfLmxhc3QoWzEsIDIsIDNdLCAyKTtcbiAgICogLy8gPT4gWzIsIDNdXG4gICAqXG4gICAqIF8ubGFzdChbMSwgMiwgM10sIGZ1bmN0aW9uKG51bSkge1xuICAgKiAgIHJldHVybiBudW0gPiAxO1xuICAgKiB9KTtcbiAgICogLy8gPT4gWzIsIDNdXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYmVldCcsICAgJ29yZ2FuaWMnOiBmYWxzZSB9LFxuICAgKiAgIHsgJ25hbWUnOiAnY2Fycm90JywgJ29yZ2FuaWMnOiB0cnVlIH1cbiAgICogXTtcbiAgICpcbiAgICogLy8gdXNpbmcgXCJfLnBsdWNrXCIgY2FsbGJhY2sgc2hvcnRoYW5kXG4gICAqIF8ubGFzdChmb29kLCAnb3JnYW5pYycpO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdjYXJyb3QnLCAnb3JnYW5pYyc6IHRydWUgfV1cbiAgICpcbiAgICogdmFyIGZvb2QgPSBbXG4gICAqICAgeyAnbmFtZSc6ICdiYW5hbmEnLCAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2JlZXQnLCAgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfSxcbiAgICogICB7ICduYW1lJzogJ2NhcnJvdCcsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ud2hlcmVcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5sYXN0KGZvb2QsIHsgJ3R5cGUnOiAndmVnZXRhYmxlJyB9KTtcbiAgICogLy8gPT4gW3sgJ25hbWUnOiAnYmVldCcsICd0eXBlJzogJ3ZlZ2V0YWJsZScgfSwgeyAnbmFtZSc6ICdjYXJyb3QnLCAndHlwZSc6ICd2ZWdldGFibGUnIH1dXG4gICAqL1xuICBmdW5jdGlvbiBsYXN0KGFycmF5LCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGlmIChhcnJheSkge1xuICAgICAgdmFyIG4gPSAwLFxuICAgICAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPSAnbnVtYmVyJyAmJiBjYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGxlbmd0aDtcbiAgICAgICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICAgIHdoaWxlIChpbmRleC0tICYmIGNhbGxiYWNrKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgICAgIG4rKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbiA9IGNhbGxiYWNrO1xuICAgICAgICBpZiAobiA9PSBudWxsIHx8IHRoaXNBcmcpIHtcbiAgICAgICAgICByZXR1cm4gYXJyYXlbbGVuZ3RoIC0gMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzbGljZShhcnJheSwgbmF0aXZlTWF4KDAsIGxlbmd0aCAtIG4pKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGxhc3Qgb2NjdXJyZW5jZSBvZiBgdmFsdWVgIGlzIGZvdW5kIHVzaW5nIHN0cmljdFxuICAgKiBlcXVhbGl0eSBmb3IgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuIElmIGBmcm9tSW5kZXhgIGlzIG5lZ2F0aXZlLCBpdCBpcyB1c2VkXG4gICAqIGFzIHRoZSBvZmZzZXQgZnJvbSB0aGUgZW5kIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNlYXJjaC5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbZnJvbUluZGV4PWFycmF5Lmxlbmd0aC0xXSBUaGUgaW5kZXggdG8gc2VhcmNoIGZyb20uXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlIG9yIGAtMWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ubGFzdEluZGV4T2YoWzEsIDIsIDMsIDEsIDIsIDNdLCAyKTtcbiAgICogLy8gPT4gNFxuICAgKlxuICAgKiBfLmxhc3RJbmRleE9mKFsxLCAyLCAzLCAxLCAyLCAzXSwgMiwgMyk7XG4gICAqIC8vID0+IDFcbiAgICovXG4gIGZ1bmN0aW9uIGxhc3RJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gICAgdmFyIGluZGV4ID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuICAgIGlmICh0eXBlb2YgZnJvbUluZGV4ID09ICdudW1iZXInKSB7XG4gICAgICBpbmRleCA9IChmcm9tSW5kZXggPCAwID8gbmF0aXZlTWF4KDAsIGluZGV4ICsgZnJvbUluZGV4KSA6IG5hdGl2ZU1pbihmcm9tSW5kZXgsIGluZGV4IC0gMSkpICsgMTtcbiAgICB9XG4gICAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIGZyb20gYXJyYXlzIG9mIGBrZXlzYCBhbmQgYHZhbHVlc2AuIFBhc3MgZWl0aGVyXG4gICAqIGEgc2luZ2xlIHR3byBkaW1lbnNpb25hbCBhcnJheSwgaS5lLiBgW1trZXkxLCB2YWx1ZTFdLCBba2V5MiwgdmFsdWUyXV1gLCBvclxuICAgKiB0d28gYXJyYXlzLCBvbmUgb2YgYGtleXNgIGFuZCBvbmUgb2YgY29ycmVzcG9uZGluZyBgdmFsdWVzYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGtleXMgVGhlIGFycmF5IG9mIGtleXMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXM9W11dIFRoZSBhcnJheSBvZiB2YWx1ZXMuXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBnaXZlbiBrZXlzIGFuZFxuICAgKiAgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ub2JqZWN0KFsnbW9lJywgJ2xhcnJ5J10sIFszMCwgNDBdKTtcbiAgICogLy8gPT4geyAnbW9lJzogMzAsICdsYXJyeSc6IDQwIH1cbiAgICovXG4gIGZ1bmN0aW9uIG9iamVjdChrZXlzLCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0ga2V5cyA/IGtleXMubGVuZ3RoIDogMCxcbiAgICAgICAgcmVzdWx0ID0ge307XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgaWYgKHZhbHVlcykge1xuICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlc1tpbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHRba2V5WzBdXSA9IGtleVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFycmF5IG9mIG51bWJlcnMgKHBvc2l0aXZlIGFuZC9vciBuZWdhdGl2ZSkgcHJvZ3Jlc3NpbmcgZnJvbVxuICAgKiBgc3RhcnRgIHVwIHRvIGJ1dCBub3QgaW5jbHVkaW5nIGBlbmRgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgb2YgdGhlIHJhbmdlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gZW5kIFRoZSBlbmQgb2YgdGhlIHJhbmdlLlxuICAgKiBAcGFyYW0ge051bWJlcn0gW3N0ZXA9MV0gVGhlIHZhbHVlIHRvIGluY3JlbWVudCBvciBkZXNjcmVtZW50IGJ5LlxuICAgKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYSBuZXcgcmFuZ2UgYXJyYXkuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ucmFuZ2UoMTApO1xuICAgKiAvLyA9PiBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOV1cbiAgICpcbiAgICogXy5yYW5nZSgxLCAxMSk7XG4gICAqIC8vID0+IFsxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMF1cbiAgICpcbiAgICogXy5yYW5nZSgwLCAzMCwgNSk7XG4gICAqIC8vID0+IFswLCA1LCAxMCwgMTUsIDIwLCAyNV1cbiAgICpcbiAgICogXy5yYW5nZSgwLCAtMTAsIC0xKTtcbiAgICogLy8gPT4gWzAsIC0xLCAtMiwgLTMsIC00LCAtNSwgLTYsIC03LCAtOCwgLTldXG4gICAqXG4gICAqIF8ucmFuZ2UoMCk7XG4gICAqIC8vID0+IFtdXG4gICAqL1xuICBmdW5jdGlvbiByYW5nZShzdGFydCwgZW5kLCBzdGVwKSB7XG4gICAgc3RhcnQgPSArc3RhcnQgfHwgMDtcbiAgICBzdGVwID0gK3N0ZXAgfHwgMTtcblxuICAgIGlmIChlbmQgPT0gbnVsbCkge1xuICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IDA7XG4gICAgfVxuICAgIC8vIHVzZSBgQXJyYXkobGVuZ3RoKWAgc28gVjggd2lsbCBhdm9pZCB0aGUgc2xvd2VyIFwiZGljdGlvbmFyeVwiIG1vZGVcbiAgICAvLyBodHRwOi8veW91dHUuYmUvWEFxSXBHVThaWmsjdD0xN20yNXNcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KDAsIGNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSxcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gc3RhcnQ7XG4gICAgICBzdGFydCArPSBzdGVwO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvcHBvc2l0ZSBvZiBgXy5pbml0aWFsYCwgdGhpcyBtZXRob2QgZ2V0cyBhbGwgYnV0IHRoZSBmaXJzdCB2YWx1ZSBvZiBgYXJyYXlgLlxuICAgKiBJZiBhIG51bWJlciBgbmAgaXMgcGFzc2VkLCB0aGUgZmlyc3QgYG5gIHZhbHVlcyBhcmUgZXhjbHVkZWQgZnJvbSB0aGUgcmVzdWx0LlxuICAgKiBJZiBhIGBjYWxsYmFja2AgZnVuY3Rpb24gaXMgcGFzc2VkLCB0aGUgZmlyc3QgZWxlbWVudHMgdGhlIGBjYWxsYmFja2AgcmV0dXJuc1xuICAgKiB0cnV0aHkgZm9yIGFyZSBleGNsdWRlZCBmcm9tIHRoZSByZXN1bHQuIFRoZSBgY2FsbGJhY2tgIGlzIGJvdW5kIHRvIGB0aGlzQXJnYFxuICAgKiBhbmQgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czsgKHZhbHVlLCBpbmRleCwgYXJyYXkpLlxuICAgKlxuICAgKiBJZiBhIHByb3BlcnR5IG5hbWUgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ucGx1Y2tcIiBzdHlsZVxuICAgKiBjYWxsYmFjayB3aWxsIHJldHVybiB0aGUgcHJvcGVydHkgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQuXG4gICAqXG4gICAqIElmIGFuIG9iamVjdCBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrXG4gICAqIHdpbGwgcmV0dXJuIGB0cnVlYCBmb3IgZWxlbWVudHMgdGhhdCBoYXZlIHRoZSBwcm9wZXRpZXMgb2YgdGhlIGdpdmVuIG9iamVjdCxcbiAgICogZWxzZSBgZmFsc2VgLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyBkcm9wLCB0YWlsXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufE9iamVjdHxOdW1iZXJ8U3RyaW5nfSBbY2FsbGJhY2t8bj0xXSBUaGUgZnVuY3Rpb24gY2FsbGVkXG4gICAqICBwZXIgZWxlbWVudCBvciB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIGV4Y2x1ZGUuIElmIGEgcHJvcGVydHkgbmFtZSBvclxuICAgKiAgb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiXG4gICAqICBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIHNsaWNlIG9mIGBhcnJheWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8ucmVzdChbMSwgMiwgM10pO1xuICAgKiAvLyA9PiBbMiwgM11cbiAgICpcbiAgICogXy5yZXN0KFsxLCAyLCAzXSwgMik7XG4gICAqIC8vID0+IFszXVxuICAgKlxuICAgKiBfLnJlc3QoWzEsIDIsIDNdLCBmdW5jdGlvbihudW0pIHtcbiAgICogICByZXR1cm4gbnVtIDwgMztcbiAgICogfSk7XG4gICAqIC8vID0+IFszXVxuICAgKlxuICAgKiB2YXIgZm9vZCA9IFtcbiAgICogICB7ICduYW1lJzogJ2JhbmFuYScsICdvcmdhbmljJzogdHJ1ZSB9LFxuICAgKiAgIHsgJ25hbWUnOiAnYmVldCcsICAgJ29yZ2FuaWMnOiBmYWxzZSB9LFxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5yZXN0KGZvb2QsICdvcmdhbmljJyk7XG4gICAqIC8vID0+IFt7ICduYW1lJzogJ2JlZXQnLCAnb3JnYW5pYyc6IGZhbHNlIH1dXG4gICAqXG4gICAqIHZhciBmb29kID0gW1xuICAgKiAgIHsgJ25hbWUnOiAnYXBwbGUnLCAgJ3R5cGUnOiAnZnJ1aXQnIH0sXG4gICAqICAgeyAnbmFtZSc6ICdiYW5hbmEnLCAndHlwZSc6ICdmcnVpdCcgfSxcbiAgICogICB7ICduYW1lJzogJ2JlZXQnLCAgICd0eXBlJzogJ3ZlZ2V0YWJsZScgfVxuICAgKiBdO1xuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ud2hlcmVcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy5yZXN0KGZvb2QsIHsgJ3R5cGUnOiAnZnJ1aXQnIH0pO1xuICAgKiAvLyA9PiBbeyAnbmFtZSc6ICdiZWV0JywgJ3R5cGUnOiAndmVnZXRhYmxlJyB9XVxuICAgKi9cbiAgZnVuY3Rpb24gcmVzdChhcnJheSwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9ICdudW1iZXInICYmIGNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgIHZhciBuID0gMCxcbiAgICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICAgICAgY2FsbGJhY2sgPSBjcmVhdGVDYWxsYmFjayhjYWxsYmFjaywgdGhpc0FyZyk7XG4gICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCAmJiBjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgICAgbisrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuID0gKGNhbGxiYWNrID09IG51bGwgfHwgdGhpc0FyZykgPyAxIDogbmF0aXZlTWF4KDAsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIHNsaWNlKGFycmF5LCBuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVc2VzIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoIHRoZSBgdmFsdWVgXG4gICAqIHNob3VsZCBiZSBpbnNlcnRlZCBpbnRvIGBhcnJheWAgaW4gb3JkZXIgdG8gbWFpbnRhaW4gdGhlIHNvcnQgb3JkZXIgb2YgdGhlXG4gICAqIHNvcnRlZCBgYXJyYXlgLiBJZiBgY2FsbGJhY2tgIGlzIHBhc3NlZCwgaXQgd2lsbCBiZSBleGVjdXRlZCBmb3IgYHZhbHVlYCBhbmRcbiAgICogZWFjaCBlbGVtZW50IGluIGBhcnJheWAgdG8gY29tcHV0ZSB0aGVpciBzb3J0IHJhbmtpbmcuIFRoZSBgY2FsbGJhY2tgIGlzXG4gICAqIGJvdW5kIHRvIGB0aGlzQXJnYCBhbmQgaW52b2tlZCB3aXRoIG9uZSBhcmd1bWVudDsgKHZhbHVlKS5cbiAgICpcbiAgICogSWYgYSBwcm9wZXJ0eSBuYW1lIGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLnBsdWNrXCIgc3R5bGVcbiAgICogY2FsbGJhY2sgd2lsbCByZXR1cm4gdGhlIHByb3BlcnR5IHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50LlxuICAgKlxuICAgKiBJZiBhbiBvYmplY3QgaXMgcGFzc2VkIGZvciBgY2FsbGJhY2tgLCB0aGUgY3JlYXRlZCBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFja1xuICAgKiB3aWxsIHJldHVybiBgdHJ1ZWAgZm9yIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgcHJvcGV0aWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsXG4gICAqIGVsc2UgYGZhbHNlYC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byBldmFsdWF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R8U3RyaW5nfSBbY2FsbGJhY2s9aWRlbnRpdHldIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyXG4gICAqICBpdGVyYXRpb24uIElmIGEgcHJvcGVydHkgbmFtZSBvciBvYmplY3QgaXMgcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlXG4gICAqICBhIFwiXy5wbHVja1wiIG9yIFwiXy53aGVyZVwiIHN0eWxlIGNhbGxiYWNrLCByZXNwZWN0aXZlbHkuXG4gICAqIEBwYXJhbSB7TWl4ZWR9IFt0aGlzQXJnXSBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGNhbGxiYWNrYC5cbiAgICogQHJldHVybnMge051bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIHZhbHVlIHNob3VsZCBiZSBpbnNlcnRlZFxuICAgKiAgaW50byBgYXJyYXlgLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnNvcnRlZEluZGV4KFsyMCwgMzAsIDUwXSwgNDApO1xuICAgKiAvLyA9PiAyXG4gICAqXG4gICAqIC8vIHVzaW5nIFwiXy5wbHVja1wiIGNhbGxiYWNrIHNob3J0aGFuZFxuICAgKiBfLnNvcnRlZEluZGV4KFt7ICd4JzogMjAgfSwgeyAneCc6IDMwIH0sIHsgJ3gnOiA1MCB9XSwgeyAneCc6IDQwIH0sICd4Jyk7XG4gICAqIC8vID0+IDJcbiAgICpcbiAgICogdmFyIGRpY3QgPSB7XG4gICAqICAgJ3dvcmRUb051bWJlcic6IHsgJ3R3ZW50eSc6IDIwLCAndGhpcnR5JzogMzAsICdmb3VydHknOiA0MCwgJ2ZpZnR5JzogNTAgfVxuICAgKiB9O1xuICAgKlxuICAgKiBfLnNvcnRlZEluZGV4KFsndHdlbnR5JywgJ3RoaXJ0eScsICdmaWZ0eSddLCAnZm91cnR5JywgZnVuY3Rpb24od29yZCkge1xuICAgKiAgIHJldHVybiBkaWN0LndvcmRUb051bWJlclt3b3JkXTtcbiAgICogfSk7XG4gICAqIC8vID0+IDJcbiAgICpcbiAgICogXy5zb3J0ZWRJbmRleChbJ3R3ZW50eScsICd0aGlydHknLCAnZmlmdHknXSwgJ2ZvdXJ0eScsIGZ1bmN0aW9uKHdvcmQpIHtcbiAgICogICByZXR1cm4gdGhpcy53b3JkVG9OdW1iZXJbd29yZF07XG4gICAqIH0sIGRpY3QpO1xuICAgKiAvLyA9PiAyXG4gICAqL1xuICBmdW5jdGlvbiBzb3J0ZWRJbmRleChhcnJheSwgdmFsdWUsIGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIGxvdyA9IDAsXG4gICAgICAgIGhpZ2ggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IGxvdztcblxuICAgIC8vIGV4cGxpY2l0bHkgcmVmZXJlbmNlIGBpZGVudGl0eWAgZm9yIGJldHRlciBpbmxpbmluZyBpbiBGaXJlZm94XG4gICAgY2FsbGJhY2sgPSBjYWxsYmFjayA/IGNyZWF0ZUNhbGxiYWNrKGNhbGxiYWNrLCB0aGlzQXJnLCAxKSA6IGlkZW50aXR5O1xuICAgIHZhbHVlID0gY2FsbGJhY2sodmFsdWUpO1xuXG4gICAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICAgIHZhciBtaWQgPSAobG93ICsgaGlnaCkgPj4+IDE7XG4gICAgICBjYWxsYmFjayhhcnJheVttaWRdKSA8IHZhbHVlXG4gICAgICAgID8gbG93ID0gbWlkICsgMVxuICAgICAgICA6IGhpZ2ggPSBtaWQ7XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIHVuaW9uIG9mIHRoZSBwYXNzZWQtaW4gYXJyYXlzIHVzaW5nIHN0cmljdCBlcXVhbGl0eSBmb3JcbiAgICogY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBbYXJyYXkxLCBhcnJheTIsIC4uLl0gQXJyYXlzIHRvIHByb2Nlc3MuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiB1bmlxdWUgdmFsdWVzLCBpbiBvcmRlciwgdGhhdCBhcmVcbiAgICogIHByZXNlbnQgaW4gb25lIG9yIG1vcmUgb2YgdGhlIGFycmF5cy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy51bmlvbihbMSwgMiwgM10sIFsxMDEsIDIsIDEsIDEwXSwgWzIsIDFdKTtcbiAgICogLy8gPT4gWzEsIDIsIDMsIDEwMSwgMTBdXG4gICAqL1xuICBmdW5jdGlvbiB1bmlvbigpIHtcbiAgICByZXR1cm4gdW5pcShjb25jYXQuYXBwbHkoYXJyYXlSZWYsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkdXBsaWNhdGUtdmFsdWUtZnJlZSB2ZXJzaW9uIG9mIHRoZSBgYXJyYXlgIHVzaW5nIHN0cmljdCBlcXVhbGl0eVxuICAgKiBmb3IgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuIElmIHRoZSBgYXJyYXlgIGlzIGFscmVhZHkgc29ydGVkLCBwYXNzaW5nIGB0cnVlYFxuICAgKiBmb3IgYGlzU29ydGVkYCB3aWxsIHJ1biBhIGZhc3RlciBhbGdvcml0aG0uIElmIGBjYWxsYmFja2AgaXMgcGFzc2VkLCBlYWNoXG4gICAqIGVsZW1lbnQgb2YgYGFycmF5YCBpcyBwYXNzZWQgdGhyb3VnaCBhIGNhbGxiYWNrYCBiZWZvcmUgdW5pcXVlbmVzcyBpcyBjb21wdXRlZC5cbiAgICogVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOyAodmFsdWUsIGluZGV4LCBhcnJheSkuXG4gICAqXG4gICAqIElmIGEgcHJvcGVydHkgbmFtZSBpcyBwYXNzZWQgZm9yIGBjYWxsYmFja2AsIHRoZSBjcmVhdGVkIFwiXy5wbHVja1wiIHN0eWxlXG4gICAqIGNhbGxiYWNrIHdpbGwgcmV0dXJuIHRoZSBwcm9wZXJ0eSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gZWxlbWVudC5cbiAgICpcbiAgICogSWYgYW4gb2JqZWN0IGlzIHBhc3NlZCBmb3IgYGNhbGxiYWNrYCwgdGhlIGNyZWF0ZWQgXCJfLndoZXJlXCIgc3R5bGUgY2FsbGJhY2tcbiAgICogd2lsbCByZXR1cm4gYHRydWVgIGZvciBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHByb3BldGllcyBvZiB0aGUgZ2l2ZW4gb2JqZWN0LFxuICAgKiBlbHNlIGBmYWxzZWAuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGFsaWFzIHVuaXF1ZVxuICAgKiBAY2F0ZWdvcnkgQXJyYXlzXG4gICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBwcm9jZXNzLlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpc1NvcnRlZD1mYWxzZV0gQSBmbGFnIHRvIGluZGljYXRlIHRoYXQgdGhlIGBhcnJheWAgaXMgYWxyZWFkeSBzb3J0ZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fFN0cmluZ30gW2NhbGxiYWNrPWlkZW50aXR5XSBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlclxuICAgKiAgaXRlcmF0aW9uLiBJZiBhIHByb3BlcnR5IG5hbWUgb3Igb2JqZWN0IGlzIHBhc3NlZCwgaXQgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZVxuICAgKiAgYSBcIl8ucGx1Y2tcIiBvciBcIl8ud2hlcmVcIiBzdHlsZSBjYWxsYmFjaywgcmVzcGVjdGl2ZWx5LlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIGR1cGxpY2F0ZS12YWx1ZS1mcmVlIGFycmF5LlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnVuaXEoWzEsIDIsIDEsIDMsIDFdKTtcbiAgICogLy8gPT4gWzEsIDIsIDNdXG4gICAqXG4gICAqIF8udW5pcShbMSwgMSwgMiwgMiwgM10sIHRydWUpO1xuICAgKiAvLyA9PiBbMSwgMiwgM11cbiAgICpcbiAgICogXy51bmlxKFsxLCAyLCAxLjUsIDMsIDIuNV0sIGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gTWF0aC5mbG9vcihudW0pOyB9KTtcbiAgICogLy8gPT4gWzEsIDIsIDNdXG4gICAqXG4gICAqIF8udW5pcShbMSwgMiwgMS41LCAzLCAyLjVdLCBmdW5jdGlvbihudW0pIHsgcmV0dXJuIHRoaXMuZmxvb3IobnVtKTsgfSwgTWF0aCk7XG4gICAqIC8vID0+IFsxLCAyLCAzXVxuICAgKlxuICAgKiAvLyB1c2luZyBcIl8ucGx1Y2tcIiBjYWxsYmFjayBzaG9ydGhhbmRcbiAgICogXy51bmlxKFt7ICd4JzogMSB9LCB7ICd4JzogMiB9LCB7ICd4JzogMSB9XSwgJ3gnKTtcbiAgICogLy8gPT4gW3sgJ3gnOiAxIH0sIHsgJ3gnOiAyIH1dXG4gICAqL1xuICBmdW5jdGlvbiB1bmlxKGFycmF5LCBpc1NvcnRlZCwgY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwLFxuICAgICAgICByZXN1bHQgPSBbXSxcbiAgICAgICAgc2VlbiA9IHJlc3VsdDtcblxuICAgIC8vIGp1Z2dsZSBhcmd1bWVudHNcbiAgICBpZiAodHlwZW9mIGlzU29ydGVkID09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXNBcmcgPSBjYWxsYmFjaztcbiAgICAgIGNhbGxiYWNrID0gaXNTb3J0ZWQ7XG4gICAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBpbml0IHZhbHVlIGNhY2hlIGZvciBsYXJnZSBhcnJheXNcbiAgICB2YXIgaXNMYXJnZSA9ICFpc1NvcnRlZCAmJiBsZW5ndGggPj0gNzU7XG4gICAgaWYgKGlzTGFyZ2UpIHtcbiAgICAgIHZhciBjYWNoZSA9IHt9O1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHNlZW4gPSBbXTtcbiAgICAgIGNhbGxiYWNrID0gY3JlYXRlQ2FsbGJhY2soY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgIH1cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIGNvbXB1dGVkID0gY2FsbGJhY2sgPyBjYWxsYmFjayh2YWx1ZSwgaW5kZXgsIGFycmF5KSA6IHZhbHVlO1xuXG4gICAgICBpZiAoaXNMYXJnZSkge1xuICAgICAgICB2YXIga2V5ID0gY29tcHV0ZWQgKyAnJztcbiAgICAgICAgdmFyIGluaXRlZCA9IGhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGtleSlcbiAgICAgICAgICA/ICEoc2VlbiA9IGNhY2hlW2tleV0pXG4gICAgICAgICAgOiAoc2VlbiA9IGNhY2hlW2tleV0gPSBbXSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNTb3J0ZWRcbiAgICAgICAgICAgID8gIWluZGV4IHx8IHNlZW5bc2Vlbi5sZW5ndGggLSAxXSAhPT0gY29tcHV0ZWRcbiAgICAgICAgICAgIDogaW5pdGVkIHx8IGluZGV4T2Yoc2VlbiwgY29tcHV0ZWQpIDwgMFxuICAgICAgICAgICkge1xuICAgICAgICBpZiAoY2FsbGJhY2sgfHwgaXNMYXJnZSkge1xuICAgICAgICAgIHNlZW4ucHVzaChjb21wdXRlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gYXJyYXkgd2l0aCBhbGwgb2NjdXJyZW5jZXMgb2YgdGhlIHBhc3NlZCB2YWx1ZXMgcmVtb3ZlZCB1c2luZ1xuICAgKiBzdHJpY3QgZXF1YWxpdHkgZm9yIGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBBcnJheXNcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGZpbHRlci5cbiAgICogQHBhcmFtIHtNaXhlZH0gW3ZhbHVlMSwgdmFsdWUyLCAuLi5dIFZhbHVlcyB0byByZW1vdmUuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy53aXRob3V0KFsxLCAyLCAxLCAwLCAzLCAxLCA0XSwgMCwgMSk7XG4gICAqIC8vID0+IFsyLCAzLCA0XVxuICAgKi9cbiAgZnVuY3Rpb24gd2l0aG91dChhcnJheSkge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDAsXG4gICAgICAgIGNvbnRhaW5zID0gY2FjaGVkQ29udGFpbnMoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgcmVzdWx0ID0gW107XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuICAgICAgaWYgKCFjb250YWlucyh2YWx1ZSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdyb3VwcyB0aGUgZWxlbWVudHMgb2YgZWFjaCBhcnJheSBhdCB0aGVpciBjb3JyZXNwb25kaW5nIGluZGV4ZXMuIFVzZWZ1bCBmb3JcbiAgICogc2VwYXJhdGUgZGF0YSBzb3VyY2VzIHRoYXQgYXJlIGNvb3JkaW5hdGVkIHRocm91Z2ggbWF0Y2hpbmcgYXJyYXkgaW5kZXhlcy5cbiAgICogRm9yIGEgbWF0cml4IG9mIG5lc3RlZCBhcnJheXMsIGBfLnppcC5hcHBseSguLi4pYCBjYW4gdHJhbnNwb3NlIHRoZSBtYXRyaXhcbiAgICogaW4gYSBzaW1pbGFyIGZhc2hpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEFycmF5c1xuICAgKiBAcGFyYW0ge0FycmF5fSBbYXJyYXkxLCBhcnJheTIsIC4uLl0gQXJyYXlzIHRvIHByb2Nlc3MuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiBncm91cGVkIGVsZW1lbnRzLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfLnppcChbJ21vZScsICdsYXJyeSddLCBbMzAsIDQwXSwgW3RydWUsIGZhbHNlXSk7XG4gICAqIC8vID0+IFtbJ21vZScsIDMwLCB0cnVlXSwgWydsYXJyeScsIDQwLCBmYWxzZV1dXG4gICAqL1xuICBmdW5jdGlvbiB6aXAoYXJyYXkpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gYXJyYXkgPyBtYXgocGx1Y2soYXJndW1lbnRzLCAnbGVuZ3RoJykpIDogMCxcbiAgICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICByZXN1bHRbaW5kZXhdID0gcGx1Y2soYXJndW1lbnRzLCBpbmRleCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgcmVzdHJpY3RlZCB0byBleGVjdXRpbmcgYGZ1bmNgIG9ubHkgYWZ0ZXIgaXQgaXNcbiAgICogY2FsbGVkIGBuYCB0aW1lcy4gVGhlIGBmdW5jYCBpcyBleGVjdXRlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGVcbiAgICogY3JlYXRlZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdGhlIGZ1bmN0aW9uIG11c3QgYmUgY2FsbGVkIGJlZm9yZVxuICAgKiBpdCBpcyBleGVjdXRlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHJlc3RyaWN0ZWQgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciByZW5kZXJOb3RlcyA9IF8uYWZ0ZXIobm90ZXMubGVuZ3RoLCByZW5kZXIpO1xuICAgKiBfLmZvckVhY2gobm90ZXMsIGZ1bmN0aW9uKG5vdGUpIHtcbiAgICogICBub3RlLmFzeW5jU2F2ZSh7ICdzdWNjZXNzJzogcmVuZGVyTm90ZXMgfSk7XG4gICAqIH0pO1xuICAgKiAvLyBgcmVuZGVyTm90ZXNgIGlzIHJ1biBvbmNlLCBhZnRlciBhbGwgbm90ZXMgaGF2ZSBzYXZlZFxuICAgKi9cbiAgZnVuY3Rpb24gYWZ0ZXIobiwgZnVuYykge1xuICAgIGlmIChuIDwgMSkge1xuICAgICAgcmV0dXJuIGZ1bmMoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKC0tbiA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCwgaW52b2tlcyBgZnVuY2Agd2l0aCB0aGUgYHRoaXNgXG4gICAqIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCBwcmVwZW5kcyBhbnkgYWRkaXRpb25hbCBgYmluZGAgYXJndW1lbnRzIHRvIHRob3NlXG4gICAqIHBhc3NlZCB0byB0aGUgYm91bmQgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBiaW5kLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAgICogQHBhcmFtIHtNaXhlZH0gW2FyZzEsIGFyZzIsIC4uLl0gQXJndW1lbnRzIHRvIGJlIHBhcnRpYWxseSBhcHBsaWVkLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBib3VuZCBmdW5jdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGZ1bmMgPSBmdW5jdGlvbihncmVldGluZykge1xuICAgKiAgIHJldHVybiBncmVldGluZyArICcgJyArIHRoaXMubmFtZTtcbiAgICogfTtcbiAgICpcbiAgICogZnVuYyA9IF8uYmluZChmdW5jLCB7ICduYW1lJzogJ21vZScgfSwgJ2hpJyk7XG4gICAqIGZ1bmMoKTtcbiAgICogLy8gPT4gJ2hpIG1vZSdcbiAgICovXG4gIGZ1bmN0aW9uIGJpbmQoZnVuYywgdGhpc0FyZykge1xuICAgIC8vIHVzZSBgRnVuY3Rpb24jYmluZGAgaWYgaXQgZXhpc3RzIGFuZCBpcyBmYXN0XG4gICAgLy8gKGluIFY4IGBGdW5jdGlvbiNiaW5kYCBpcyBzbG93ZXIgZXhjZXB0IHdoZW4gcGFydGlhbGx5IGFwcGxpZWQpXG4gICAgcmV0dXJuIGlzQmluZEZhc3QgfHwgKG5hdGl2ZUJpbmQgJiYgYXJndW1lbnRzLmxlbmd0aCA+IDIpXG4gICAgICA/IG5hdGl2ZUJpbmQuY2FsbC5hcHBseShuYXRpdmVCaW5kLCBhcmd1bWVudHMpXG4gICAgICA6IGNyZWF0ZUJvdW5kKGZ1bmMsIHRoaXNBcmcsIHNsaWNlKGFyZ3VtZW50cywgMikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmRzIG1ldGhvZHMgb24gYG9iamVjdGAgdG8gYG9iamVjdGAsIG92ZXJ3cml0aW5nIHRoZSBleGlzdGluZyBtZXRob2QuXG4gICAqIE1ldGhvZCBuYW1lcyBtYXkgYmUgc3BlY2lmaWVkIGFzIGluZGl2aWR1YWwgYXJndW1lbnRzIG9yIGFzIGFycmF5cyBvZiBtZXRob2RcbiAgICogbmFtZXMuIElmIG5vIG1ldGhvZCBuYW1lcyBhcmUgcHJvdmlkZWQsIGFsbCB0aGUgZnVuY3Rpb24gcHJvcGVydGllcyBvZiBgb2JqZWN0YFxuICAgKiB3aWxsIGJlIGJvdW5kLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBGdW5jdGlvbnNcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGJpbmQgYW5kIGFzc2lnbiB0aGUgYm91bmQgbWV0aG9kcyB0by5cbiAgICogQHBhcmFtIHtTdHJpbmd9IFttZXRob2ROYW1lMSwgbWV0aG9kTmFtZTIsIC4uLl0gTWV0aG9kIG5hbWVzIG9uIHRoZSBvYmplY3QgdG8gYmluZC5cbiAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIHZpZXcgPSB7XG4gICAqICAnbGFiZWwnOiAnZG9jcycsXG4gICAqICAnb25DbGljayc6IGZ1bmN0aW9uKCkgeyBhbGVydCgnY2xpY2tlZCAnICsgdGhpcy5sYWJlbCk7IH1cbiAgICogfTtcbiAgICpcbiAgICogXy5iaW5kQWxsKHZpZXcpO1xuICAgKiBqUXVlcnkoJyNkb2NzJykub24oJ2NsaWNrJywgdmlldy5vbkNsaWNrKTtcbiAgICogLy8gPT4gYWxlcnRzICdjbGlja2VkIGRvY3MnLCB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZFxuICAgKi9cbiAgZnVuY3Rpb24gYmluZEFsbChvYmplY3QpIHtcbiAgICB2YXIgZnVuY3MgPSBjb25jYXQuYXBwbHkoYXJyYXlSZWYsIGFyZ3VtZW50cyksXG4gICAgICAgIGluZGV4ID0gZnVuY3MubGVuZ3RoID4gMSA/IDAgOiAoZnVuY3MgPSBmdW5jdGlvbnMob2JqZWN0KSwgLTEpLFxuICAgICAgICBsZW5ndGggPSBmdW5jcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIGtleSA9IGZ1bmNzW2luZGV4XTtcbiAgICAgIG9iamVjdFtrZXldID0gYmluZChvYmplY3Rba2V5XSwgb2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsIGludm9rZXMgdGhlIG1ldGhvZCBhdCBgb2JqZWN0W2tleV1gXG4gICAqIGFuZCBwcmVwZW5kcyBhbnkgYWRkaXRpb25hbCBgYmluZEtleWAgYXJndW1lbnRzIHRvIHRob3NlIHBhc3NlZCB0byB0aGUgYm91bmRcbiAgICogZnVuY3Rpb24uIFRoaXMgbWV0aG9kIGRpZmZlcnMgZnJvbSBgXy5iaW5kYCBieSBhbGxvd2luZyBib3VuZCBmdW5jdGlvbnMgdG9cbiAgICogcmVmZXJlbmNlIG1ldGhvZHMgdGhhdCB3aWxsIGJlIHJlZGVmaW5lZCBvciBkb24ndCB5ZXQgZXhpc3QuXG4gICAqIFNlZSBodHRwOi8vbWljaGF1eC5jYS9hcnRpY2xlcy9sYXp5LWZ1bmN0aW9uLWRlZmluaXRpb24tcGF0dGVybi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0aGUgbWV0aG9kIGJlbG9uZ3MgdG8uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYXJnMSwgYXJnMiwgLi4uXSBBcmd1bWVudHMgdG8gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJvdW5kIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgb2JqZWN0ID0ge1xuICAgKiAgICduYW1lJzogJ21vZScsXG4gICAqICAgJ2dyZWV0JzogZnVuY3Rpb24oZ3JlZXRpbmcpIHtcbiAgICogICAgIHJldHVybiBncmVldGluZyArICcgJyArIHRoaXMubmFtZTtcbiAgICogICB9XG4gICAqIH07XG4gICAqXG4gICAqIHZhciBmdW5jID0gXy5iaW5kS2V5KG9iamVjdCwgJ2dyZWV0JywgJ2hpJyk7XG4gICAqIGZ1bmMoKTtcbiAgICogLy8gPT4gJ2hpIG1vZSdcbiAgICpcbiAgICogb2JqZWN0LmdyZWV0ID0gZnVuY3Rpb24oZ3JlZXRpbmcpIHtcbiAgICogICByZXR1cm4gZ3JlZXRpbmcgKyAnLCAnICsgdGhpcy5uYW1lICsgJyEnO1xuICAgKiB9O1xuICAgKlxuICAgKiBmdW5jKCk7XG4gICAqIC8vID0+ICdoaSwgbW9lISdcbiAgICovXG4gIGZ1bmN0aW9uIGJpbmRLZXkob2JqZWN0LCBrZXkpIHtcbiAgICByZXR1cm4gY3JlYXRlQm91bmQob2JqZWN0LCBrZXksIHNsaWNlKGFyZ3VtZW50cywgMikpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGlzIHRoZSBjb21wb3NpdGlvbiBvZiB0aGUgcGFzc2VkIGZ1bmN0aW9ucyxcbiAgICogd2hlcmUgZWFjaCBmdW5jdGlvbiBjb25zdW1lcyB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoZSBmdW5jdGlvbiB0aGF0IGZvbGxvd3MuXG4gICAqIEZvciBleGFtcGxlLCBjb21wb3NpbmcgdGhlIGZ1bmN0aW9ucyBgZigpYCwgYGcoKWAsIGFuZCBgaCgpYCBwcm9kdWNlcyBgZihnKGgoKSkpYC5cbiAgICogRWFjaCBmdW5jdGlvbiBpcyBleGVjdXRlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY29tcG9zZWQgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZnVuYzEsIGZ1bmMyLCAuLi5dIEZ1bmN0aW9ucyB0byBjb21wb3NlLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb21wb3NlZCBmdW5jdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGdyZWV0ID0gZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gJ2hpICcgKyBuYW1lOyB9O1xuICAgKiB2YXIgZXhjbGFpbSA9IGZ1bmN0aW9uKHN0YXRlbWVudCkgeyByZXR1cm4gc3RhdGVtZW50ICsgJyEnOyB9O1xuICAgKiB2YXIgd2VsY29tZSA9IF8uY29tcG9zZShleGNsYWltLCBncmVldCk7XG4gICAqIHdlbGNvbWUoJ21vZScpO1xuICAgKiAvLyA9PiAnaGkgbW9lISdcbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gICAgdmFyIGZ1bmNzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgIGxlbmd0aCA9IGZ1bmNzLmxlbmd0aDtcblxuICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIGFyZ3MgPSBbZnVuY3NbbGVuZ3RoXS5hcHBseSh0aGlzLCBhcmdzKV07XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJnc1swXTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgZGVsYXkgdGhlIGV4ZWN1dGlvbiBvZiBgZnVuY2AgdW50aWwgYWZ0ZXJcbiAgICogYHdhaXRgIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSBpdCB3YXMgaW52b2tlZC4gUGFzc1xuICAgKiBgdHJ1ZWAgZm9yIGBpbW1lZGlhdGVgIHRvIGNhdXNlIGRlYm91bmNlIHRvIGludm9rZSBgZnVuY2Agb24gdGhlIGxlYWRpbmcsXG4gICAqIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLCBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gU3Vic2VxdWVudCBjYWxscyB0b1xuICAgKiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGNhbGwuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaW1tZWRpYXRlIEEgZmxhZyB0byBpbmRpY2F0ZSBleGVjdXRpb24gaXMgb24gdGhlIGxlYWRpbmdcbiAgICogIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGxhenlMYXlvdXQgPSBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMzAwKTtcbiAgICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIGxhenlMYXlvdXQpO1xuICAgKi9cbiAgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIGFyZ3MsXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgdGhpc0FyZyxcbiAgICAgICAgdGltZW91dElkO1xuXG4gICAgZnVuY3Rpb24gZGVsYXllZCgpIHtcbiAgICAgIHRpbWVvdXRJZCA9IG51bGw7XG4gICAgICBpZiAoIWltbWVkaWF0ZSkge1xuICAgICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXNJbW1lZGlhdGUgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXRJZDtcbiAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB0aGlzQXJnID0gdGhpcztcblxuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICB0aW1lb3V0SWQgPSBzZXRUaW1lb3V0KGRlbGF5ZWQsIHdhaXQpO1xuXG4gICAgICBpZiAoaXNJbW1lZGlhdGUpIHtcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgYGZ1bmNgIGZ1bmN0aW9uIGFmdGVyIGB3YWl0YCBtaWxsaXNlY29uZHMuIEFkZGl0aW9uYWwgYXJndW1lbnRzXG4gICAqIHdpbGwgYmUgcGFzc2VkIHRvIGBmdW5jYCB3aGVuIGl0IGlzIGludm9rZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWxheS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgZXhlY3V0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYXJnMSwgYXJnMiwgLi4uXSBBcmd1bWVudHMgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBgc2V0VGltZW91dGAgdGltZW91dCBpZC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGxvZyA9IF8uYmluZChjb25zb2xlLmxvZywgY29uc29sZSk7XG4gICAqIF8uZGVsYXkobG9nLCAxMDAwLCAnbG9nZ2VkIGxhdGVyJyk7XG4gICAqIC8vID0+ICdsb2dnZWQgbGF0ZXInIChBcHBlYXJzIGFmdGVyIG9uZSBzZWNvbmQuKVxuICAgKi9cbiAgZnVuY3Rpb24gZGVsYXkoZnVuYywgd2FpdCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UoYXJndW1lbnRzLCAyKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpOyB9LCB3YWl0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZlcnMgZXhlY3V0aW5nIHRoZSBgZnVuY2AgZnVuY3Rpb24gdW50aWwgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXMgY2xlYXJlZC5cbiAgICogQWRkaXRpb25hbCBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gYGZ1bmNgIHdoZW4gaXQgaXMgaW52b2tlZC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlZmVyLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYXJnMSwgYXJnMiwgLi4uXSBBcmd1bWVudHMgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIHRoZSBgc2V0VGltZW91dGAgdGltZW91dCBpZC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5kZWZlcihmdW5jdGlvbigpIHsgYWxlcnQoJ2RlZmVycmVkJyk7IH0pO1xuICAgKiAvLyByZXR1cm5zIGZyb20gdGhlIGZ1bmN0aW9uIGJlZm9yZSBgYWxlcnRgIGlzIGNhbGxlZFxuICAgKi9cbiAgZnVuY3Rpb24gZGVmZXIoZnVuYykge1xuICAgIHZhciBhcmdzID0gc2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHsgZnVuYy5hcHBseSh1bmRlZmluZWQsIGFyZ3MpOyB9LCAxKTtcbiAgfVxuICAvLyB1c2UgYHNldEltbWVkaWF0ZWAgaWYgaXQncyBhdmFpbGFibGUgaW4gTm9kZS5qc1xuICBpZiAoaXNWOCAmJiBmcmVlTW9kdWxlICYmIHR5cGVvZiBzZXRJbW1lZGlhdGUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGRlZmVyID0gYmluZChzZXRJbW1lZGlhdGUsIHdpbmRvdyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAgICogcGFzc2VkLCBpdCB3aWxsIGJlIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdFxuICAgKiBiYXNlZCBvbiB0aGUgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdFxuICAgKiBhcmd1bWVudCBwYXNzZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIGNhY2hlIGtleS4gVGhlIGBmdW5jYFxuICAgKiBpcyBleGVjdXRlZCB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gQSBmdW5jdGlvbiB1c2VkIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbWVtb2l6aW5nIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgZmlib25hY2NpID0gXy5tZW1vaXplKGZ1bmN0aW9uKG4pIHtcbiAgICogICByZXR1cm4gbiA8IDIgPyBuIDogZmlib25hY2NpKG4gLSAxKSArIGZpYm9uYWNjaShuIC0gMik7XG4gICAqIH0pO1xuICAgKi9cbiAgZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICAgIHZhciBjYWNoZSA9IHt9O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBrZXkgPSAocmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogYXJndW1lbnRzWzBdKSArICcnO1xuICAgICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoY2FjaGUsIGtleSlcbiAgICAgICAgPyBjYWNoZVtrZXldXG4gICAgICAgIDogKGNhY2hlW2tleV0gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgcmVzdHJpY3RlZCB0byBleGVjdXRlIGBmdW5jYCBvbmNlLiBSZXBlYXQgY2FsbHMgdG9cbiAgICogdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSB2YWx1ZSBvZiB0aGUgZmlyc3QgY2FsbC4gVGhlIGBmdW5jYCBpcyBleGVjdXRlZFxuICAgKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByZXN0cmljdGVkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgaW5pdGlhbGl6ZSA9IF8ub25jZShjcmVhdGVBcHBsaWNhdGlvbik7XG4gICAqIGluaXRpYWxpemUoKTtcbiAgICogaW5pdGlhbGl6ZSgpO1xuICAgKiAvLyBgaW5pdGlhbGl6ZWAgZXhlY3V0ZXMgYGNyZWF0ZUFwcGxpY2F0aW9uYCBvbmNlXG4gICAqL1xuICBmdW5jdGlvbiBvbmNlKGZ1bmMpIHtcbiAgICB2YXIgcmFuLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocmFuKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICByYW4gPSB0cnVlO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAvLyBjbGVhciB0aGUgYGZ1bmNgIHZhcmlhYmxlIHNvIHRoZSBmdW5jdGlvbiBtYXkgYmUgZ2FyYmFnZSBjb2xsZWN0ZWRcbiAgICAgIGZ1bmMgPSBudWxsO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCwgaW52b2tlcyBgZnVuY2Agd2l0aCBhbnkgYWRkaXRpb25hbFxuICAgKiBgcGFydGlhbGAgYXJndW1lbnRzIHByZXBlbmRlZCB0byB0aG9zZSBwYXNzZWQgdG8gdGhlIG5ldyBmdW5jdGlvbi4gVGhpc1xuICAgKiBtZXRob2QgaXMgc2ltaWxhciB0byBgXy5iaW5kYCwgZXhjZXB0IGl0IGRvZXMgKipub3QqKiBhbHRlciB0aGUgYHRoaXNgIGJpbmRpbmcuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwYXJ0aWFsbHkgYXBwbHkgYXJndW1lbnRzIHRvLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYXJnMSwgYXJnMiwgLi4uXSBBcmd1bWVudHMgdG8gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHBhcnRpYWxseSBhcHBsaWVkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgZ3JlZXQgPSBmdW5jdGlvbihncmVldGluZywgbmFtZSkgeyByZXR1cm4gZ3JlZXRpbmcgKyAnICcgKyBuYW1lOyB9O1xuICAgKiB2YXIgaGkgPSBfLnBhcnRpYWwoZ3JlZXQsICdoaScpO1xuICAgKiBoaSgnbW9lJyk7XG4gICAqIC8vID0+ICdoaSBtb2UnXG4gICAqL1xuICBmdW5jdGlvbiBwYXJ0aWFsKGZ1bmMpIHtcbiAgICByZXR1cm4gY3JlYXRlQm91bmQoZnVuYywgc2xpY2UoYXJndW1lbnRzLCAxKSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBtZXRob2QgaXMgc2ltaWxhciB0byBgXy5wYXJ0aWFsYCwgZXhjZXB0IHRoYXQgYHBhcnRpYWxgIGFyZ3VtZW50cyBhcmVcbiAgICogYXBwZW5kZWQgdG8gdGhvc2UgcGFzc2VkIHRvIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwYXJ0aWFsbHkgYXBwbHkgYXJndW1lbnRzIHRvLlxuICAgKiBAcGFyYW0ge01peGVkfSBbYXJnMSwgYXJnMiwgLi4uXSBBcmd1bWVudHMgdG8gYmUgcGFydGlhbGx5IGFwcGxpZWQuXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHBhcnRpYWxseSBhcHBsaWVkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgZGVmYXVsdHNEZWVwID0gXy5wYXJ0aWFsUmlnaHQoXy5tZXJnZSwgXy5kZWZhdWx0cyk7XG4gICAqXG4gICAqIHZhciBvcHRpb25zID0ge1xuICAgKiAgICd2YXJpYWJsZSc6ICdkYXRhJyxcbiAgICogICAnaW1wb3J0cyc6IHsgJ2pxJzogJCB9XG4gICAqIH07XG4gICAqXG4gICAqIGRlZmF1bHRzRGVlcChvcHRpb25zLCBfLnRlbXBsYXRlU2V0dGluZ3MpO1xuICAgKlxuICAgKiBvcHRpb25zLnZhcmlhYmxlXG4gICAqIC8vID0+ICdkYXRhJ1xuICAgKlxuICAgKiBvcHRpb25zLmltcG9ydHNcbiAgICogLy8gPT4geyAnXyc6IF8sICdqcSc6ICQgfVxuICAgKi9cbiAgZnVuY3Rpb24gcGFydGlhbFJpZ2h0KGZ1bmMpIHtcbiAgICByZXR1cm4gY3JlYXRlQm91bmQoZnVuYywgc2xpY2UoYXJndW1lbnRzLCAxKSwgbnVsbCwgaW5kaWNhdG9yT2JqZWN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBleGVjdXRlZCwgd2lsbCBvbmx5IGNhbGwgdGhlIGBmdW5jYFxuICAgKiBmdW5jdGlvbiBhdCBtb3N0IG9uY2UgcGVyIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuIElmIHRoZSB0aHJvdHRsZWRcbiAgICogZnVuY3Rpb24gaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LCBgZnVuY2Agd2lsbFxuICAgKiBhbHNvIGJlIGNhbGxlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC4gU3Vic2VxdWVudCBjYWxscyB0byB0aGVcbiAgICogdGhyb3R0bGVkIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGNhbGwuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IEZ1bmN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHdhaXQgVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgZXhlY3V0aW9ucyB0by5cbiAgICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKTtcbiAgICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIHRocm90dGxlZCk7XG4gICAqL1xuICBmdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG4gICAgdmFyIGFyZ3MsXG4gICAgICAgIHJlc3VsdCxcbiAgICAgICAgdGhpc0FyZyxcbiAgICAgICAgdGltZW91dElkLFxuICAgICAgICBsYXN0Q2FsbGVkID0gMDtcblxuICAgIGZ1bmN0aW9uIHRyYWlsaW5nQ2FsbCgpIHtcbiAgICAgIGxhc3RDYWxsZWQgPSBuZXcgRGF0ZTtcbiAgICAgIHRpbWVvdXRJZCA9IG51bGw7XG4gICAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbm93ID0gbmV3IERhdGUsXG4gICAgICAgICAgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBsYXN0Q2FsbGVkKTtcblxuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHRoaXNBcmcgPSB0aGlzO1xuXG4gICAgICBpZiAocmVtYWluaW5nIDw9IDApIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJZCk7XG4gICAgICAgIHRpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgIGxhc3RDYWxsZWQgPSBub3c7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghdGltZW91dElkKSB7XG4gICAgICAgIHRpbWVvdXRJZCA9IHNldFRpbWVvdXQodHJhaWxpbmdDYWxsLCByZW1haW5pbmcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHBhc3NlcyBgdmFsdWVgIHRvIHRoZSBgd3JhcHBlcmAgZnVuY3Rpb24gYXMgaXRzXG4gICAqIGZpcnN0IGFyZ3VtZW50LiBBZGRpdGlvbmFsIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uIGFyZSBhcHBlbmRlZFxuICAgKiB0byB0aG9zZSBwYXNzZWQgdG8gdGhlIGB3cmFwcGVyYCBmdW5jdGlvbi4gVGhlIGB3cmFwcGVyYCBpcyBleGVjdXRlZCB3aXRoXG4gICAqIHRoZSBgdGhpc2AgYmluZGluZyBvZiB0aGUgY3JlYXRlZCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25zXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIFRoZSB2YWx1ZSB0byB3cmFwLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB3cmFwcGVyIFRoZSB3cmFwcGVyIGZ1bmN0aW9uLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogdmFyIGhlbGxvID0gZnVuY3Rpb24obmFtZSkgeyByZXR1cm4gJ2hlbGxvICcgKyBuYW1lOyB9O1xuICAgKiBoZWxsbyA9IF8ud3JhcChoZWxsbywgZnVuY3Rpb24oZnVuYykge1xuICAgKiAgIHJldHVybiAnYmVmb3JlLCAnICsgZnVuYygnbW9lJykgKyAnLCBhZnRlcic7XG4gICAqIH0pO1xuICAgKiBoZWxsbygpO1xuICAgKiAvLyA9PiAnYmVmb3JlLCBoZWxsbyBtb2UsIGFmdGVyJ1xuICAgKi9cbiAgZnVuY3Rpb24gd3JhcCh2YWx1ZSwgd3JhcHBlcikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gW3ZhbHVlXTtcbiAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB3cmFwcGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvKipcbiAgICogQ29udmVydHMgdGhlIGNoYXJhY3RlcnMgYCZgLCBgPGAsIGA+YCwgYFwiYCwgYW5kIGAnYCBpbiBgc3RyaW5nYCB0byB0aGVpclxuICAgKiBjb3JyZXNwb25kaW5nIEhUTUwgZW50aXRpZXMuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IFV0aWxpdGllc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gZXNjYXBlLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHRoZSBlc2NhcGVkIHN0cmluZy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5lc2NhcGUoJ01vZSwgTGFycnkgJiBDdXJseScpO1xuICAgKiAvLyA9PiAnTW9lLCBMYXJyeSAmYW1wOyBDdXJseSdcbiAgICovXG4gIGZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nID09IG51bGwgPyAnJyA6IChzdHJpbmcgKyAnJykucmVwbGFjZShyZVVuZXNjYXBlZEh0bWwsIGVzY2FwZUh0bWxDaGFyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IHBhc3NlZCB0byBpdC5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlIEFueSB2YWx1ZS5cbiAgICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIGB2YWx1ZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBtb2UgPSB7ICduYW1lJzogJ21vZScgfTtcbiAgICogbW9lID09PSBfLmlkZW50aXR5KG1vZSk7XG4gICAqIC8vID0+IHRydWVcbiAgICovXG4gIGZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgZnVuY3Rpb25zIHByb3BlcnRpZXMgb2YgYG9iamVjdGAgdG8gdGhlIGBsb2Rhc2hgIGZ1bmN0aW9uIGFuZCBjaGFpbmFibGVcbiAgICogd3JhcHBlci5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCBvZiBmdW5jdGlvbiBwcm9wZXJ0aWVzIHRvIGFkZCB0byBgbG9kYXNoYC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5taXhpbih7XG4gICAqICAgJ2NhcGl0YWxpemUnOiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICogICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICogICB9XG4gICAqIH0pO1xuICAgKlxuICAgKiBfLmNhcGl0YWxpemUoJ21vZScpO1xuICAgKiAvLyA9PiAnTW9lJ1xuICAgKlxuICAgKiBfKCdtb2UnKS5jYXBpdGFsaXplKCk7XG4gICAqIC8vID0+ICdNb2UnXG4gICAqL1xuICBmdW5jdGlvbiBtaXhpbihvYmplY3QpIHtcbiAgICBmb3JFYWNoKGZ1bmN0aW9ucyhvYmplY3QpLCBmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgICB2YXIgZnVuYyA9IGxvZGFzaFttZXRob2ROYW1lXSA9IG9iamVjdFttZXRob2ROYW1lXTtcblxuICAgICAgbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IFt0aGlzLl9fd3JhcHBlZF9fXTtcbiAgICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gbmV3IGxvZGFzaChmdW5jLmFwcGx5KGxvZGFzaCwgYXJncykpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZlcnRzIHRoZSAnXycgdmFyaWFibGUgdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvXG4gICAqIHRoZSBgbG9kYXNoYCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgYGxvZGFzaGAgZnVuY3Rpb24uXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIHZhciBsb2Rhc2ggPSBfLm5vQ29uZmxpY3QoKTtcbiAgICovXG4gIGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgd2luZG93Ll8gPSBvbGREYXNoO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2R1Y2VzIGEgcmFuZG9tIG51bWJlciBiZXR3ZWVuIGBtaW5gIGFuZCBgbWF4YCAoaW5jbHVzaXZlKS4gSWYgb25seSBvbmVcbiAgICogYXJndW1lbnQgaXMgcGFzc2VkLCBhIG51bWJlciBiZXR3ZWVuIGAwYCBhbmQgdGhlIGdpdmVuIG51bWJlciB3aWxsIGJlIHJldHVybmVkLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFttaW49MF0gVGhlIG1pbmltdW0gcG9zc2libGUgdmFsdWUuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbWF4PTFdIFRoZSBtYXhpbXVtIHBvc3NpYmxlIHZhbHVlLlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBSZXR1cm5zIGEgcmFuZG9tIG51bWJlci5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy5yYW5kb20oMCwgNSk7XG4gICAqIC8vID0+IGEgbnVtYmVyIGJldHdlZW4gMCBhbmQgNVxuICAgKlxuICAgKiBfLnJhbmRvbSg1KTtcbiAgICogLy8gPT4gYWxzbyBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDVcbiAgICovXG4gIGZ1bmN0aW9uIHJhbmRvbShtaW4sIG1heCkge1xuICAgIGlmIChtaW4gPT0gbnVsbCAmJiBtYXggPT0gbnVsbCkge1xuICAgICAgbWF4ID0gMTtcbiAgICB9XG4gICAgbWluID0gK21pbiB8fCAwO1xuICAgIGlmIChtYXggPT0gbnVsbCkge1xuICAgICAgbWF4ID0gbWluO1xuICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIGZsb29yKG5hdGl2ZVJhbmRvbSgpICogKCgrbWF4IHx8IDApIC0gbWluICsgMSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSB2YWx1ZSBvZiBgcHJvcGVydHlgIG9uIGBvYmplY3RgLiBJZiBgcHJvcGVydHlgIGlzIGEgZnVuY3Rpb24sXG4gICAqIGl0IHdpbGwgYmUgaW52b2tlZCBhbmQgaXRzIHJlc3VsdCByZXR1cm5lZCwgZWxzZSB0aGUgcHJvcGVydHkgdmFsdWUgaXNcbiAgICogcmV0dXJuZWQuIElmIGBvYmplY3RgIGlzIGZhbHNleSwgdGhlbiBgbnVsbGAgaXMgcmV0dXJuZWQuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQGNhdGVnb3J5IFV0aWxpdGllc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5IFRoZSBwcm9wZXJ0eSB0byBnZXQgdGhlIHZhbHVlIG9mLlxuICAgKiBAcmV0dXJucyB7TWl4ZWR9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgb2JqZWN0ID0ge1xuICAgKiAgICdjaGVlc2UnOiAnY3J1bXBldHMnLFxuICAgKiAgICdzdHVmZic6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuICdub25zZW5zZSc7XG4gICAqICAgfVxuICAgKiB9O1xuICAgKlxuICAgKiBfLnJlc3VsdChvYmplY3QsICdjaGVlc2UnKTtcbiAgICogLy8gPT4gJ2NydW1wZXRzJ1xuICAgKlxuICAgKiBfLnJlc3VsdChvYmplY3QsICdzdHVmZicpO1xuICAgKiAvLyA9PiAnbm9uc2Vuc2UnXG4gICAqL1xuICBmdW5jdGlvbiByZXN1bHQob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIHZhciB2YWx1ZSA9IG9iamVjdCA/IG9iamVjdFtwcm9wZXJ0eV0gOiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGlzRnVuY3Rpb24odmFsdWUpID8gb2JqZWN0W3Byb3BlcnR5XSgpIDogdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogQSBtaWNyby10ZW1wbGF0aW5nIG1ldGhvZCB0aGF0IGhhbmRsZXMgYXJiaXRyYXJ5IGRlbGltaXRlcnMsIHByZXNlcnZlc1xuICAgKiB3aGl0ZXNwYWNlLCBhbmQgY29ycmVjdGx5IGVzY2FwZXMgcXVvdGVzIHdpdGhpbiBpbnRlcnBvbGF0ZWQgY29kZS5cbiAgICpcbiAgICogTm90ZTogSW4gdGhlIGRldmVsb3BtZW50IGJ1aWxkLCBgXy50ZW1wbGF0ZWAgdXRpbGl6ZXMgc291cmNlVVJMcyBmb3IgZWFzaWVyXG4gICAqIGRlYnVnZ2luZy4gU2VlIGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL2RldmVsb3BlcnRvb2xzL3NvdXJjZW1hcHMvI3RvYy1zb3VyY2V1cmxcbiAgICpcbiAgICogTm90ZTogTG8tRGFzaCBtYXkgYmUgdXNlZCBpbiBDaHJvbWUgZXh0ZW5zaW9ucyBieSBlaXRoZXIgY3JlYXRpbmcgYSBgbG9kYXNoIGNzcGBcbiAgICogYnVpbGQgYW5kIHVzaW5nIHByZWNvbXBpbGVkIHRlbXBsYXRlcywgb3IgbG9hZGluZyBMby1EYXNoIGluIGEgc2FuZGJveC5cbiAgICpcbiAgICogRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gcHJlY29tcGlsaW5nIHRlbXBsYXRlcyBzZWU6XG4gICAqIGh0dHA6Ly9sb2Rhc2guY29tLyNjdXN0b20tYnVpbGRzXG4gICAqXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIENocm9tZSBleHRlbnNpb24gc2FuZGJveGVzIHNlZTpcbiAgICogaHR0cDovL2RldmVsb3Blci5jaHJvbWUuY29tL3N0YWJsZS9leHRlbnNpb25zL3NhbmRib3hpbmdFdmFsLmh0bWxcbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IFRoZSB0ZW1wbGF0ZSB0ZXh0LlxuICAgKiBAcGFyYW0ge09iZWN0fSBkYXRhIFRoZSBkYXRhIG9iamVjdCB1c2VkIHRvIHBvcHVsYXRlIHRoZSB0ZXh0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqICBlc2NhcGUgLSBUaGUgXCJlc2NhcGVcIiBkZWxpbWl0ZXIgcmVnZXhwLlxuICAgKiAgZXZhbHVhdGUgLSBUaGUgXCJldmFsdWF0ZVwiIGRlbGltaXRlciByZWdleHAuXG4gICAqICBpbnRlcnBvbGF0ZSAtIFRoZSBcImludGVycG9sYXRlXCIgZGVsaW1pdGVyIHJlZ2V4cC5cbiAgICogIHNvdXJjZVVSTCAtIFRoZSBzb3VyY2VVUkwgb2YgdGhlIHRlbXBsYXRlJ3MgY29tcGlsZWQgc291cmNlLlxuICAgKiAgdmFyaWFibGUgLSBUaGUgZGF0YSBvYmplY3QgdmFyaWFibGUgbmFtZS5cbiAgICpcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufFN0cmluZ30gUmV0dXJucyBhIGNvbXBpbGVkIGZ1bmN0aW9uIHdoZW4gbm8gYGRhdGFgIG9iamVjdFxuICAgKiAgaXMgZ2l2ZW4sIGVsc2UgaXQgcmV0dXJucyB0aGUgaW50ZXJwb2xhdGVkIHRleHQuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIC8vIHVzaW5nIGEgY29tcGlsZWQgdGVtcGxhdGVcbiAgICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8gPCU9IG5hbWUgJT4nKTtcbiAgICogY29tcGlsZWQoeyAnbmFtZSc6ICdtb2UnIH0pO1xuICAgKiAvLyA9PiAnaGVsbG8gbW9lJ1xuICAgKlxuICAgKiB2YXIgbGlzdCA9ICc8JSBfLmZvckVhY2gocGVvcGxlLCBmdW5jdGlvbihuYW1lKSB7ICU+PGxpPjwlPSBuYW1lICU+PC9saT48JSB9KTsgJT4nO1xuICAgKiBfLnRlbXBsYXRlKGxpc3QsIHsgJ3Blb3BsZSc6IFsnbW9lJywgJ2xhcnJ5J10gfSk7XG4gICAqIC8vID0+ICc8bGk+bW9lPC9saT48bGk+bGFycnk8L2xpPidcbiAgICpcbiAgICogLy8gdXNpbmcgdGhlIFwiZXNjYXBlXCIgZGVsaW1pdGVyIHRvIGVzY2FwZSBIVE1MIGluIGRhdGEgcHJvcGVydHkgdmFsdWVzXG4gICAqIF8udGVtcGxhdGUoJzxiPjwlLSB2YWx1ZSAlPjwvYj4nLCB7ICd2YWx1ZSc6ICc8c2NyaXB0PicgfSk7XG4gICAqIC8vID0+ICc8Yj4mbHQ7c2NyaXB0Jmd0OzwvYj4nXG4gICAqXG4gICAqIC8vIHVzaW5nIHRoZSBFUzYgZGVsaW1pdGVyIGFzIGFuIGFsdGVybmF0aXZlIHRvIHRoZSBkZWZhdWx0IFwiaW50ZXJwb2xhdGVcIiBkZWxpbWl0ZXJcbiAgICogXy50ZW1wbGF0ZSgnaGVsbG8gJHsgbmFtZSB9JywgeyAnbmFtZSc6ICdjdXJseScgfSk7XG4gICAqIC8vID0+ICdoZWxsbyBjdXJseSdcbiAgICpcbiAgICogLy8gdXNpbmcgdGhlIGludGVybmFsIGBwcmludGAgZnVuY3Rpb24gaW4gXCJldmFsdWF0ZVwiIGRlbGltaXRlcnNcbiAgICogXy50ZW1wbGF0ZSgnPCUgcHJpbnQoXCJoZWxsbyBcIiArIGVwaXRoZXQpOyAlPiEnLCB7ICdlcGl0aGV0JzogJ3N0b29nZScgfSk7XG4gICAqIC8vID0+ICdoZWxsbyBzdG9vZ2UhJ1xuICAgKlxuICAgKiAvLyB1c2luZyBjdXN0b20gdGVtcGxhdGUgZGVsaW1pdGVyc1xuICAgKiBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAqICAgJ2ludGVycG9sYXRlJzogL3t7KFtcXHNcXFNdKz8pfX0vZ1xuICAgKiB9O1xuICAgKlxuICAgKiBfLnRlbXBsYXRlKCdoZWxsbyB7eyBuYW1lIH19IScsIHsgJ25hbWUnOiAnbXVzdGFjaGUnIH0pO1xuICAgKiAvLyA9PiAnaGVsbG8gbXVzdGFjaGUhJ1xuICAgKlxuICAgKiAvLyB1c2luZyB0aGUgYHNvdXJjZVVSTGAgb3B0aW9uIHRvIHNwZWNpZnkgYSBjdXN0b20gc291cmNlVVJMIGZvciB0aGUgdGVtcGxhdGVcbiAgICogdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgnaGVsbG8gPCU9IG5hbWUgJT4nLCBudWxsLCB7ICdzb3VyY2VVUkwnOiAnL2Jhc2ljL2dyZWV0aW5nLmpzdCcgfSk7XG4gICAqIGNvbXBpbGVkKGRhdGEpO1xuICAgKiAvLyA9PiBmaW5kIHRoZSBzb3VyY2Ugb2YgXCJncmVldGluZy5qc3RcIiB1bmRlciB0aGUgU291cmNlcyB0YWIgb3IgUmVzb3VyY2VzIHBhbmVsIG9mIHRoZSB3ZWIgaW5zcGVjdG9yXG4gICAqXG4gICAqIC8vIHVzaW5nIHRoZSBgdmFyaWFibGVgIG9wdGlvbiB0byBlbnN1cmUgYSB3aXRoLXN0YXRlbWVudCBpc24ndCB1c2VkIGluIHRoZSBjb21waWxlZCB0ZW1wbGF0ZVxuICAgKiB2YXIgY29tcGlsZWQgPSBfLnRlbXBsYXRlKCdoaSA8JT0gZGF0YS5uYW1lICU+IScsIG51bGwsIHsgJ3ZhcmlhYmxlJzogJ2RhdGEnIH0pO1xuICAgKiBjb21waWxlZC5zb3VyY2U7XG4gICAqIC8vID0+IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICogICB2YXIgX190LCBfX3AgPSAnJywgX19lID0gXy5lc2NhcGU7XG4gICAqICAgX19wICs9ICdoaSAnICsgKChfX3QgPSAoIGRhdGEubmFtZSApKSA9PSBudWxsID8gJycgOiBfX3QpICsgJyEnO1xuICAgKiAgIHJldHVybiBfX3A7XG4gICAqIH1cbiAgICpcbiAgICogLy8gdXNpbmcgdGhlIGBzb3VyY2VgIHByb3BlcnR5IHRvIGlubGluZSBjb21waWxlZCB0ZW1wbGF0ZXMgZm9yIG1lYW5pbmdmdWxcbiAgICogLy8gbGluZSBudW1iZXJzIGluIGVycm9yIG1lc3NhZ2VzIGFuZCBhIHN0YWNrIHRyYWNlXG4gICAqIGZzLndyaXRlRmlsZVN5bmMocGF0aC5qb2luKGN3ZCwgJ2pzdC5qcycpLCAnXFxcbiAgICogICB2YXIgSlNUID0ge1xcXG4gICAqICAgICBcIm1haW5cIjogJyArIF8udGVtcGxhdGUobWFpblRleHQpLnNvdXJjZSArICdcXFxuICAgKiAgIH07XFxcbiAgICogJyk7XG4gICAqL1xuICBmdW5jdGlvbiB0ZW1wbGF0ZSh0ZXh0LCBkYXRhLCBvcHRpb25zKSB7XG4gICAgLy8gYmFzZWQgb24gSm9obiBSZXNpZydzIGB0bXBsYCBpbXBsZW1lbnRhdGlvblxuICAgIC8vIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9qYXZhc2NyaXB0LW1pY3JvLXRlbXBsYXRpbmcvXG4gICAgLy8gYW5kIExhdXJhIERva3Rvcm92YSdzIGRvVC5qc1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9vbGFkby9kb1RcbiAgICB2YXIgc2V0dGluZ3MgPSBsb2Rhc2gudGVtcGxhdGVTZXR0aW5ncztcbiAgICB0ZXh0IHx8ICh0ZXh0ID0gJycpO1xuXG4gICAgLy8gYXZvaWQgbWlzc2luZyBkZXBlbmRlbmNpZXMgd2hlbiBgaXRlcmF0b3JUZW1wbGF0ZWAgaXMgbm90IGRlZmluZWRcbiAgICBvcHRpb25zID0gZGVmYXVsdHMoe30sIG9wdGlvbnMsIHNldHRpbmdzKTtcblxuICAgIHZhciBpbXBvcnRzID0gZGVmYXVsdHMoe30sIG9wdGlvbnMuaW1wb3J0cywgc2V0dGluZ3MuaW1wb3J0cyksXG4gICAgICAgIGltcG9ydHNLZXlzID0ga2V5cyhpbXBvcnRzKSxcbiAgICAgICAgaW1wb3J0c1ZhbHVlcyA9IHZhbHVlcyhpbXBvcnRzKTtcblxuICAgIHZhciBpc0V2YWx1YXRpbmcsXG4gICAgICAgIGluZGV4ID0gMCxcbiAgICAgICAgaW50ZXJwb2xhdGUgPSBvcHRpb25zLmludGVycG9sYXRlIHx8IHJlTm9NYXRjaCxcbiAgICAgICAgc291cmNlID0gXCJfX3AgKz0gJ1wiO1xuXG4gICAgLy8gY29tcGlsZSByZWdleHAgdG8gbWF0Y2ggZWFjaCBkZWxpbWl0ZXJcbiAgICB2YXIgcmVEZWxpbWl0ZXJzID0gUmVnRXhwKFxuICAgICAgKG9wdGlvbnMuZXNjYXBlIHx8IHJlTm9NYXRjaCkuc291cmNlICsgJ3wnICtcbiAgICAgIGludGVycG9sYXRlLnNvdXJjZSArICd8JyArXG4gICAgICAoaW50ZXJwb2xhdGUgPT09IHJlSW50ZXJwb2xhdGUgPyByZUVzVGVtcGxhdGUgOiByZU5vTWF0Y2gpLnNvdXJjZSArICd8JyArXG4gICAgICAob3B0aW9ucy5ldmFsdWF0ZSB8fCByZU5vTWF0Y2gpLnNvdXJjZSArICd8JCdcbiAgICAsICdnJyk7XG5cbiAgICB0ZXh0LnJlcGxhY2UocmVEZWxpbWl0ZXJzLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlVmFsdWUsIGludGVycG9sYXRlVmFsdWUsIGVzVGVtcGxhdGVWYWx1ZSwgZXZhbHVhdGVWYWx1ZSwgb2Zmc2V0KSB7XG4gICAgICBpbnRlcnBvbGF0ZVZhbHVlIHx8IChpbnRlcnBvbGF0ZVZhbHVlID0gZXNUZW1wbGF0ZVZhbHVlKTtcblxuICAgICAgLy8gZXNjYXBlIGNoYXJhY3RlcnMgdGhhdCBjYW5ub3QgYmUgaW5jbHVkZWQgaW4gc3RyaW5nIGxpdGVyYWxzXG4gICAgICBzb3VyY2UgKz0gdGV4dC5zbGljZShpbmRleCwgb2Zmc2V0KS5yZXBsYWNlKHJlVW5lc2NhcGVkU3RyaW5nLCBlc2NhcGVTdHJpbmdDaGFyKTtcblxuICAgICAgLy8gcmVwbGFjZSBkZWxpbWl0ZXJzIHdpdGggc25pcHBldHNcbiAgICAgIGlmIChlc2NhcGVWYWx1ZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInICtcXG5fX2UoXCIgKyBlc2NhcGVWYWx1ZSArIFwiKSArXFxuJ1wiO1xuICAgICAgfVxuICAgICAgaWYgKGV2YWx1YXRlVmFsdWUpIHtcbiAgICAgICAgaXNFdmFsdWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgc291cmNlICs9IFwiJztcXG5cIiArIGV2YWx1YXRlVmFsdWUgKyBcIjtcXG5fX3AgKz0gJ1wiO1xuICAgICAgfVxuICAgICAgaWYgKGludGVycG9sYXRlVmFsdWUpIHtcbiAgICAgICAgc291cmNlICs9IFwiJyArXFxuKChfX3QgPSAoXCIgKyBpbnRlcnBvbGF0ZVZhbHVlICsgXCIpKSA9PSBudWxsID8gJycgOiBfX3QpICtcXG4nXCI7XG4gICAgICB9XG4gICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgLy8gdGhlIEpTIGVuZ2luZSBlbWJlZGRlZCBpbiBBZG9iZSBwcm9kdWN0cyByZXF1aXJlcyByZXR1cm5pbmcgdGhlIGBtYXRjaGBcbiAgICAgIC8vIHN0cmluZyBpbiBvcmRlciB0byBwcm9kdWNlIHRoZSBjb3JyZWN0IGBvZmZzZXRgIHZhbHVlXG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gICAgLy8gaWYgYHZhcmlhYmxlYCBpcyBub3Qgc3BlY2lmaWVkIGFuZCB0aGUgdGVtcGxhdGUgY29udGFpbnMgXCJldmFsdWF0ZVwiXG4gICAgLy8gZGVsaW1pdGVycywgd3JhcCBhIHdpdGgtc3RhdGVtZW50IGFyb3VuZCB0aGUgZ2VuZXJhdGVkIGNvZGUgdG8gYWRkIHRoZVxuICAgIC8vIGRhdGEgb2JqZWN0IHRvIHRoZSB0b3Agb2YgdGhlIHNjb3BlIGNoYWluXG4gICAgdmFyIHZhcmlhYmxlID0gb3B0aW9ucy52YXJpYWJsZSxcbiAgICAgICAgaGFzVmFyaWFibGUgPSB2YXJpYWJsZTtcblxuICAgIGlmICghaGFzVmFyaWFibGUpIHtcbiAgICAgIHZhcmlhYmxlID0gJ29iaic7XG4gICAgICBzb3VyY2UgPSAnd2l0aCAoJyArIHZhcmlhYmxlICsgJykge1xcbicgKyBzb3VyY2UgKyAnXFxufVxcbic7XG4gICAgfVxuICAgIC8vIGNsZWFudXAgY29kZSBieSBzdHJpcHBpbmcgZW1wdHkgc3RyaW5nc1xuICAgIHNvdXJjZSA9IChpc0V2YWx1YXRpbmcgPyBzb3VyY2UucmVwbGFjZShyZUVtcHR5U3RyaW5nTGVhZGluZywgJycpIDogc291cmNlKVxuICAgICAgLnJlcGxhY2UocmVFbXB0eVN0cmluZ01pZGRsZSwgJyQxJylcbiAgICAgIC5yZXBsYWNlKHJlRW1wdHlTdHJpbmdUcmFpbGluZywgJyQxOycpO1xuXG4gICAgLy8gZnJhbWUgY29kZSBhcyB0aGUgZnVuY3Rpb24gYm9keVxuICAgIHNvdXJjZSA9ICdmdW5jdGlvbignICsgdmFyaWFibGUgKyAnKSB7XFxuJyArXG4gICAgICAoaGFzVmFyaWFibGUgPyAnJyA6IHZhcmlhYmxlICsgJyB8fCAoJyArIHZhcmlhYmxlICsgJyA9IHt9KTtcXG4nKSArXG4gICAgICBcInZhciBfX3QsIF9fcCA9ICcnLCBfX2UgPSBfLmVzY2FwZVwiICtcbiAgICAgIChpc0V2YWx1YXRpbmdcbiAgICAgICAgPyAnLCBfX2ogPSBBcnJheS5wcm90b3R5cGUuam9pbjtcXG4nICtcbiAgICAgICAgICBcImZ1bmN0aW9uIHByaW50KCkgeyBfX3AgKz0gX19qLmNhbGwoYXJndW1lbnRzLCAnJykgfVxcblwiXG4gICAgICAgIDogJztcXG4nXG4gICAgICApICtcbiAgICAgIHNvdXJjZSArXG4gICAgICAncmV0dXJuIF9fcFxcbn0nO1xuXG4gICAgLy8gVXNlIGEgc291cmNlVVJMIGZvciBlYXNpZXIgZGVidWdnaW5nIGFuZCB3cmFwIGluIGEgbXVsdGktbGluZSBjb21tZW50IHRvXG4gICAgLy8gYXZvaWQgaXNzdWVzIHdpdGggTmFyd2hhbCwgSUUgY29uZGl0aW9uYWwgY29tcGlsYXRpb24sIGFuZCB0aGUgSlMgZW5naW5lXG4gICAgLy8gZW1iZWRkZWQgaW4gQWRvYmUgcHJvZHVjdHMuXG4gICAgLy8gaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvZGV2ZWxvcGVydG9vbHMvc291cmNlbWFwcy8jdG9jLXNvdXJjZXVybFxuICAgIHZhciBzb3VyY2VVUkwgPSAnXFxuLypcXG4vL0Agc291cmNlVVJMPScgKyAob3B0aW9ucy5zb3VyY2VVUkwgfHwgJy9sb2Rhc2gvdGVtcGxhdGUvc291cmNlWycgKyAodGVtcGxhdGVDb3VudGVyKyspICsgJ10nKSArICdcXG4qLyc7XG5cbiAgICB0cnkge1xuICAgICAgdmFyIHJlc3VsdCA9IEZ1bmN0aW9uKGltcG9ydHNLZXlzLCAncmV0dXJuICcgKyBzb3VyY2UgKyBzb3VyY2VVUkwpLmFwcGx5KHVuZGVmaW5lZCwgaW1wb3J0c1ZhbHVlcyk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICAgIGlmIChkYXRhKSB7XG4gICAgICByZXR1cm4gcmVzdWx0KGRhdGEpO1xuICAgIH1cbiAgICAvLyBwcm92aWRlIHRoZSBjb21waWxlZCBmdW5jdGlvbidzIHNvdXJjZSB2aWEgaXRzIGB0b1N0cmluZ2AgbWV0aG9kLCBpblxuICAgIC8vIHN1cHBvcnRlZCBlbnZpcm9ubWVudHMsIG9yIHRoZSBgc291cmNlYCBwcm9wZXJ0eSBhcyBhIGNvbnZlbmllbmNlIGZvclxuICAgIC8vIGlubGluaW5nIGNvbXBpbGVkIHRlbXBsYXRlcyBkdXJpbmcgdGhlIGJ1aWxkIHByb2Nlc3NcbiAgICByZXN1bHQuc291cmNlID0gc291cmNlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogRXhlY3V0ZXMgdGhlIGBjYWxsYmFja2AgZnVuY3Rpb24gYG5gIHRpbWVzLCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgdGhlIHJlc3VsdHNcbiAgICogb2YgZWFjaCBgY2FsbGJhY2tgIGV4ZWN1dGlvbi4gVGhlIGBjYWxsYmFja2AgaXMgYm91bmQgdG8gYHRoaXNBcmdgIGFuZCBpbnZva2VkXG4gICAqIHdpdGggb25lIGFyZ3VtZW50OyAoaW5kZXgpLlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBleGVjdXRlIHRoZSBjYWxsYmFjay5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIGNhbGxlZCBwZXIgaXRlcmF0aW9uLlxuICAgKiBAcGFyYW0ge01peGVkfSBbdGhpc0FyZ10gVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBjYWxsYmFja2AuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBhIG5ldyBhcnJheSBvZiB0aGUgcmVzdWx0cyBvZiBlYWNoIGBjYWxsYmFja2AgZXhlY3V0aW9uLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiB2YXIgZGljZVJvbGxzID0gXy50aW1lcygzLCBfLnBhcnRpYWwoXy5yYW5kb20sIDEsIDYpKTtcbiAgICogLy8gPT4gWzMsIDYsIDRdXG4gICAqXG4gICAqIF8udGltZXMoMywgZnVuY3Rpb24obikgeyBtYWdlLmNhc3RTcGVsbChuKTsgfSk7XG4gICAqIC8vID0+IGNhbGxzIGBtYWdlLmNhc3RTcGVsbChuKWAgdGhyZWUgdGltZXMsIHBhc3NpbmcgYG5gIG9mIGAwYCwgYDFgLCBhbmQgYDJgIHJlc3BlY3RpdmVseVxuICAgKlxuICAgKiBfLnRpbWVzKDMsIGZ1bmN0aW9uKG4pIHsgdGhpcy5jYXN0KG4pOyB9LCBtYWdlKTtcbiAgICogLy8gPT4gYWxzbyBjYWxscyBgbWFnZS5jYXN0U3BlbGwobilgIHRocmVlIHRpbWVzXG4gICAqL1xuICBmdW5jdGlvbiB0aW1lcyhuLCBjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIG4gPSArbiB8fCAwO1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IGNhbGxiYWNrLmNhbGwodGhpc0FyZywgaW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBvcHBvc2l0ZSBvZiBgXy5lc2NhcGVgLCB0aGlzIG1ldGhvZCBjb252ZXJ0cyB0aGUgSFRNTCBlbnRpdGllc1xuICAgKiBgJmFtcDtgLCBgJmx0O2AsIGAmZ3Q7YCwgYCZxdW90O2AsIGFuZCBgJiMzOTtgIGluIGBzdHJpbmdgIHRvIHRoZWlyXG4gICAqIGNvcnJlc3BvbmRpbmcgY2hhcmFjdGVycy5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgVXRpbGl0aWVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byB1bmVzY2FwZS5cbiAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgdW5lc2NhcGVkIHN0cmluZy5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy51bmVzY2FwZSgnTW9lLCBMYXJyeSAmYW1wOyBDdXJseScpO1xuICAgKiAvLyA9PiAnTW9lLCBMYXJyeSAmIEN1cmx5J1xuICAgKi9cbiAgZnVuY3Rpb24gdW5lc2NhcGUoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZyA9PSBudWxsID8gJycgOiAoc3RyaW5nICsgJycpLnJlcGxhY2UocmVFc2NhcGVkSHRtbCwgdW5lc2NhcGVIdG1sQ2hhcik7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgdW5pcXVlIElELiBJZiBgcHJlZml4YCBpcyBwYXNzZWQsIHRoZSBJRCB3aWxsIGJlIGFwcGVuZGVkIHRvIGl0LlxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBjYXRlZ29yeSBVdGlsaXRpZXNcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtwcmVmaXhdIFRoZSB2YWx1ZSB0byBwcmVmaXggdGhlIElEIHdpdGguXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IFJldHVybnMgdGhlIHVuaXF1ZSBJRC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXy51bmlxdWVJZCgnY29udGFjdF8nKTtcbiAgICogLy8gPT4gJ2NvbnRhY3RfMTA0J1xuICAgKlxuICAgKiBfLnVuaXF1ZUlkKCk7XG4gICAqIC8vID0+ICcxMDUnXG4gICAqL1xuICBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcbiAgICB2YXIgaWQgPSArK2lkQ291bnRlcjtcbiAgICByZXR1cm4gKHByZWZpeCA9PSBudWxsID8gJycgOiBwcmVmaXggKyAnJykgKyBpZDtcbiAgfVxuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBJbnZva2VzIGBpbnRlcmNlcHRvcmAgd2l0aCB0aGUgYHZhbHVlYCBhcyB0aGUgZmlyc3QgYXJndW1lbnQsIGFuZCB0aGVuXG4gICAqIHJldHVybnMgYHZhbHVlYC4gVGhlIHB1cnBvc2Ugb2YgdGhpcyBtZXRob2QgaXMgdG8gXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluLFxuICAgKiBpbiBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cbiAgICpcbiAgICogQHN0YXRpY1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ2hhaW5pbmdcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgVGhlIHZhbHVlIHRvIHBhc3MgdG8gYGludGVyY2VwdG9yYC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gaW50ZXJjZXB0b3IgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAgICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIGB2YWx1ZWAuXG4gICAqIEBleGFtcGxlXG4gICAqXG4gICAqIF8oWzEsIDIsIDMsIDRdKVxuICAgKiAgLmZpbHRlcihmdW5jdGlvbihudW0pIHsgcmV0dXJuIG51bSAlIDIgPT0gMDsgfSlcbiAgICogIC50YXAoYWxlcnQpXG4gICAqICAubWFwKGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gbnVtICogbnVtOyB9KVxuICAgKiAgLnZhbHVlKCk7XG4gICAqIC8vID0+IC8vIFsyLCA0XSAoYWxlcnRlZClcbiAgICogLy8gPT4gWzQsIDE2XVxuICAgKi9cbiAgZnVuY3Rpb24gdGFwKHZhbHVlLCBpbnRlcmNlcHRvcikge1xuICAgIGludGVyY2VwdG9yKHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICAvKipcbiAgICogUHJvZHVjZXMgdGhlIGB0b1N0cmluZ2AgcmVzdWx0IG9mIHRoZSB3cmFwcGVkIHZhbHVlLlxuICAgKlxuICAgKiBAbmFtZSB0b1N0cmluZ1xuICAgKiBAbWVtYmVyT2YgX1xuICAgKiBAY2F0ZWdvcnkgQ2hhaW5pbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nIHJlc3VsdC5cbiAgICogQGV4YW1wbGVcbiAgICpcbiAgICogXyhbMSwgMiwgM10pLnRvU3RyaW5nKCk7XG4gICAqIC8vID0+ICcxLDIsMydcbiAgICovXG4gIGZ1bmN0aW9uIHdyYXBwZXJUb1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3dyYXBwZWRfXyArICcnO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIHRoZSB3cmFwcGVkIHZhbHVlLlxuICAgKlxuICAgKiBAbmFtZSB2YWx1ZU9mXG4gICAqIEBtZW1iZXJPZiBfXG4gICAqIEBhbGlhcyB2YWx1ZVxuICAgKiBAY2F0ZWdvcnkgQ2hhaW5pbmdcbiAgICogQHJldHVybnMge01peGVkfSBSZXR1cm5zIHRoZSB3cmFwcGVkIHZhbHVlLlxuICAgKiBAZXhhbXBsZVxuICAgKlxuICAgKiBfKFsxLCAyLCAzXSkudmFsdWVPZigpO1xuICAgKiAvLyA9PiBbMSwgMiwgM11cbiAgICovXG4gIGZ1bmN0aW9uIHdyYXBwZXJWYWx1ZU9mKCkge1xuICAgIHJldHVybiB0aGlzLl9fd3JhcHBlZF9fO1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLy8gYWRkIGZ1bmN0aW9ucyB0aGF0IHJldHVybiB3cmFwcGVkIHZhbHVlcyB3aGVuIGNoYWluaW5nXG4gIGxvZGFzaC5hZnRlciA9IGFmdGVyO1xuICBsb2Rhc2guYXNzaWduID0gYXNzaWduO1xuICBsb2Rhc2guYXQgPSBhdDtcbiAgbG9kYXNoLmJpbmQgPSBiaW5kO1xuICBsb2Rhc2guYmluZEFsbCA9IGJpbmRBbGw7XG4gIGxvZGFzaC5iaW5kS2V5ID0gYmluZEtleTtcbiAgbG9kYXNoLmNvbXBhY3QgPSBjb21wYWN0O1xuICBsb2Rhc2guY29tcG9zZSA9IGNvbXBvc2U7XG4gIGxvZGFzaC5jb3VudEJ5ID0gY291bnRCeTtcbiAgbG9kYXNoLmRlYm91bmNlID0gZGVib3VuY2U7XG4gIGxvZGFzaC5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICBsb2Rhc2guZGVmZXIgPSBkZWZlcjtcbiAgbG9kYXNoLmRlbGF5ID0gZGVsYXk7XG4gIGxvZGFzaC5kaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcbiAgbG9kYXNoLmZpbHRlciA9IGZpbHRlcjtcbiAgbG9kYXNoLmZsYXR0ZW4gPSBmbGF0dGVuO1xuICBsb2Rhc2guZm9yRWFjaCA9IGZvckVhY2g7XG4gIGxvZGFzaC5mb3JJbiA9IGZvckluO1xuICBsb2Rhc2guZm9yT3duID0gZm9yT3duO1xuICBsb2Rhc2guZnVuY3Rpb25zID0gZnVuY3Rpb25zO1xuICBsb2Rhc2guZ3JvdXBCeSA9IGdyb3VwQnk7XG4gIGxvZGFzaC5pbml0aWFsID0gaW5pdGlhbDtcbiAgbG9kYXNoLmludGVyc2VjdGlvbiA9IGludGVyc2VjdGlvbjtcbiAgbG9kYXNoLmludmVydCA9IGludmVydDtcbiAgbG9kYXNoLmludm9rZSA9IGludm9rZTtcbiAgbG9kYXNoLmtleXMgPSBrZXlzO1xuICBsb2Rhc2gubWFwID0gbWFwO1xuICBsb2Rhc2gubWF4ID0gbWF4O1xuICBsb2Rhc2gubWVtb2l6ZSA9IG1lbW9pemU7XG4gIGxvZGFzaC5tZXJnZSA9IG1lcmdlO1xuICBsb2Rhc2gubWluID0gbWluO1xuICBsb2Rhc2gub2JqZWN0ID0gb2JqZWN0O1xuICBsb2Rhc2gub21pdCA9IG9taXQ7XG4gIGxvZGFzaC5vbmNlID0gb25jZTtcbiAgbG9kYXNoLnBhaXJzID0gcGFpcnM7XG4gIGxvZGFzaC5wYXJ0aWFsID0gcGFydGlhbDtcbiAgbG9kYXNoLnBhcnRpYWxSaWdodCA9IHBhcnRpYWxSaWdodDtcbiAgbG9kYXNoLnBpY2sgPSBwaWNrO1xuICBsb2Rhc2gucGx1Y2sgPSBwbHVjaztcbiAgbG9kYXNoLnJhbmdlID0gcmFuZ2U7XG4gIGxvZGFzaC5yZWplY3QgPSByZWplY3Q7XG4gIGxvZGFzaC5yZXN0ID0gcmVzdDtcbiAgbG9kYXNoLnNodWZmbGUgPSBzaHVmZmxlO1xuICBsb2Rhc2guc29ydEJ5ID0gc29ydEJ5O1xuICBsb2Rhc2gudGFwID0gdGFwO1xuICBsb2Rhc2gudGhyb3R0bGUgPSB0aHJvdHRsZTtcbiAgbG9kYXNoLnRpbWVzID0gdGltZXM7XG4gIGxvZGFzaC50b0FycmF5ID0gdG9BcnJheTtcbiAgbG9kYXNoLnVuaW9uID0gdW5pb247XG4gIGxvZGFzaC51bmlxID0gdW5pcTtcbiAgbG9kYXNoLnZhbHVlcyA9IHZhbHVlcztcbiAgbG9kYXNoLndoZXJlID0gd2hlcmU7XG4gIGxvZGFzaC53aXRob3V0ID0gd2l0aG91dDtcbiAgbG9kYXNoLndyYXAgPSB3cmFwO1xuICBsb2Rhc2guemlwID0gemlwO1xuXG4gIC8vIGFkZCBhbGlhc2VzXG4gIGxvZGFzaC5jb2xsZWN0ID0gbWFwO1xuICBsb2Rhc2guZHJvcCA9IHJlc3Q7XG4gIGxvZGFzaC5lYWNoID0gZm9yRWFjaDtcbiAgbG9kYXNoLmV4dGVuZCA9IGFzc2lnbjtcbiAgbG9kYXNoLm1ldGhvZHMgPSBmdW5jdGlvbnM7XG4gIGxvZGFzaC5zZWxlY3QgPSBmaWx0ZXI7XG4gIGxvZGFzaC50YWlsID0gcmVzdDtcbiAgbG9kYXNoLnVuaXF1ZSA9IHVuaXE7XG5cbiAgLy8gYWRkIGZ1bmN0aW9ucyB0byBgbG9kYXNoLnByb3RvdHlwZWBcbiAgbWl4aW4obG9kYXNoKTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvLyBhZGQgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIHVud3JhcHBlZCB2YWx1ZXMgd2hlbiBjaGFpbmluZ1xuICBsb2Rhc2guY2xvbmUgPSBjbG9uZTtcbiAgbG9kYXNoLmNsb25lRGVlcCA9IGNsb25lRGVlcDtcbiAgbG9kYXNoLmNvbnRhaW5zID0gY29udGFpbnM7XG4gIGxvZGFzaC5lc2NhcGUgPSBlc2NhcGU7XG4gIGxvZGFzaC5ldmVyeSA9IGV2ZXJ5O1xuICBsb2Rhc2guZmluZCA9IGZpbmQ7XG4gIGxvZGFzaC5oYXMgPSBoYXM7XG4gIGxvZGFzaC5pZGVudGl0eSA9IGlkZW50aXR5O1xuICBsb2Rhc2guaW5kZXhPZiA9IGluZGV4T2Y7XG4gIGxvZGFzaC5pc0FyZ3VtZW50cyA9IGlzQXJndW1lbnRzO1xuICBsb2Rhc2guaXNBcnJheSA9IGlzQXJyYXk7XG4gIGxvZGFzaC5pc0Jvb2xlYW4gPSBpc0Jvb2xlYW47XG4gIGxvZGFzaC5pc0RhdGUgPSBpc0RhdGU7XG4gIGxvZGFzaC5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG4gIGxvZGFzaC5pc0VtcHR5ID0gaXNFbXB0eTtcbiAgbG9kYXNoLmlzRXF1YWwgPSBpc0VxdWFsO1xuICBsb2Rhc2guaXNGaW5pdGUgPSBpc0Zpbml0ZTtcbiAgbG9kYXNoLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuICBsb2Rhc2guaXNOYU4gPSBpc05hTjtcbiAgbG9kYXNoLmlzTnVsbCA9IGlzTnVsbDtcbiAgbG9kYXNoLmlzTnVtYmVyID0gaXNOdW1iZXI7XG4gIGxvZGFzaC5pc09iamVjdCA9IGlzT2JqZWN0O1xuICBsb2Rhc2guaXNQbGFpbk9iamVjdCA9IGlzUGxhaW5PYmplY3Q7XG4gIGxvZGFzaC5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuICBsb2Rhc2guaXNTdHJpbmcgPSBpc1N0cmluZztcbiAgbG9kYXNoLmlzVW5kZWZpbmVkID0gaXNVbmRlZmluZWQ7XG4gIGxvZGFzaC5sYXN0SW5kZXhPZiA9IGxhc3RJbmRleE9mO1xuICBsb2Rhc2gubWl4aW4gPSBtaXhpbjtcbiAgbG9kYXNoLm5vQ29uZmxpY3QgPSBub0NvbmZsaWN0O1xuICBsb2Rhc2gucmFuZG9tID0gcmFuZG9tO1xuICBsb2Rhc2gucmVkdWNlID0gcmVkdWNlO1xuICBsb2Rhc2gucmVkdWNlUmlnaHQgPSByZWR1Y2VSaWdodDtcbiAgbG9kYXNoLnJlc3VsdCA9IHJlc3VsdDtcbiAgbG9kYXNoLnNpemUgPSBzaXplO1xuICBsb2Rhc2guc29tZSA9IHNvbWU7XG4gIGxvZGFzaC5zb3J0ZWRJbmRleCA9IHNvcnRlZEluZGV4O1xuICBsb2Rhc2gudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgbG9kYXNoLnVuZXNjYXBlID0gdW5lc2NhcGU7XG4gIGxvZGFzaC51bmlxdWVJZCA9IHVuaXF1ZUlkO1xuXG4gIC8vIGFkZCBhbGlhc2VzXG4gIGxvZGFzaC5hbGwgPSBldmVyeTtcbiAgbG9kYXNoLmFueSA9IHNvbWU7XG4gIGxvZGFzaC5kZXRlY3QgPSBmaW5kO1xuICBsb2Rhc2guZm9sZGwgPSByZWR1Y2U7XG4gIGxvZGFzaC5mb2xkciA9IHJlZHVjZVJpZ2h0O1xuICBsb2Rhc2guaW5jbHVkZSA9IGNvbnRhaW5zO1xuICBsb2Rhc2guaW5qZWN0ID0gcmVkdWNlO1xuXG4gIGZvck93bihsb2Rhc2gsIGZ1bmN0aW9uKGZ1bmMsIG1ldGhvZE5hbWUpIHtcbiAgICBpZiAoIWxvZGFzaC5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICAgIGxvZGFzaC5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbdGhpcy5fX3dyYXBwZWRfX107XG4gICAgICAgIHB1c2guYXBwbHkoYXJncywgYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkobG9kYXNoLCBhcmdzKTtcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAvLyBhZGQgZnVuY3Rpb25zIGNhcGFibGUgb2YgcmV0dXJuaW5nIHdyYXBwZWQgYW5kIHVud3JhcHBlZCB2YWx1ZXMgd2hlbiBjaGFpbmluZ1xuICBsb2Rhc2guZmlyc3QgPSBmaXJzdDtcbiAgbG9kYXNoLmxhc3QgPSBsYXN0O1xuXG4gIC8vIGFkZCBhbGlhc2VzXG4gIGxvZGFzaC50YWtlID0gZmlyc3Q7XG4gIGxvZGFzaC5oZWFkID0gZmlyc3Q7XG5cbiAgZm9yT3duKGxvZGFzaCwgZnVuY3Rpb24oZnVuYywgbWV0aG9kTmFtZSkge1xuICAgIGlmICghbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgICAgbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXT0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZ1bmModGhpcy5fX3dyYXBwZWRfXywgY2FsbGJhY2ssIHRoaXNBcmcpO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sgPT0gbnVsbCB8fCAodGhpc0FyZyAmJiB0eXBlb2YgY2FsbGJhY2sgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICA/IHJlc3VsdFxuICAgICAgICAgIDogbmV3IGxvZGFzaChyZXN1bHQpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gIC8qKlxuICAgKiBUaGUgc2VtYW50aWMgdmVyc2lvbiBudW1iZXIuXG4gICAqXG4gICAqIEBzdGF0aWNcbiAgICogQG1lbWJlck9mIF9cbiAgICogQHR5cGUgU3RyaW5nXG4gICAqL1xuICBsb2Rhc2guVkVSU0lPTiA9ICcxLjAuMic7XG5cbiAgLy8gYWRkIFwiQ2hhaW5pbmdcIiBmdW5jdGlvbnMgdG8gdGhlIHdyYXBwZXJcbiAgbG9kYXNoLnByb3RvdHlwZS50b1N0cmluZyA9IHdyYXBwZXJUb1N0cmluZztcbiAgbG9kYXNoLnByb3RvdHlwZS52YWx1ZSA9IHdyYXBwZXJWYWx1ZU9mO1xuICBsb2Rhc2gucHJvdG90eXBlLnZhbHVlT2YgPSB3cmFwcGVyVmFsdWVPZjtcblxuICAvLyBhZGQgYEFycmF5YCBmdW5jdGlvbnMgdGhhdCByZXR1cm4gdW53cmFwcGVkIHZhbHVlc1xuICBlYWNoKFsnam9pbicsICdwb3AnLCAnc2hpZnQnXSwgZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgIHZhciBmdW5jID0gYXJyYXlSZWZbbWV0aG9kTmFtZV07XG4gICAgbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcy5fX3dyYXBwZWRfXywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9KTtcblxuICAvLyBhZGQgYEFycmF5YCBmdW5jdGlvbnMgdGhhdCByZXR1cm4gdGhlIHdyYXBwZWQgdmFsdWVcbiAgZWFjaChbJ3B1c2gnLCAncmV2ZXJzZScsICdzb3J0JywgJ3Vuc2hpZnQnXSwgZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgIHZhciBmdW5jID0gYXJyYXlSZWZbbWV0aG9kTmFtZV07XG4gICAgbG9kYXNoLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgZnVuYy5hcHBseSh0aGlzLl9fd3JhcHBlZF9fLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gYWRkIGBBcnJheWAgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIG5ldyB3cmFwcGVkIHZhbHVlc1xuICBlYWNoKFsnY29uY2F0JywgJ3NsaWNlJywgJ3NwbGljZSddLCBmdW5jdGlvbihtZXRob2ROYW1lKSB7XG4gICAgdmFyIGZ1bmMgPSBhcnJheVJlZlttZXRob2ROYW1lXTtcbiAgICBsb2Rhc2gucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IGxvZGFzaChmdW5jLmFwcGx5KHRoaXMuX193cmFwcGVkX18sIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIGF2b2lkIGFycmF5LWxpa2Ugb2JqZWN0IGJ1Z3Mgd2l0aCBgQXJyYXkjc2hpZnRgIGFuZCBgQXJyYXkjc3BsaWNlYFxuICAvLyBpbiBGaXJlZm94IDwgMTAgYW5kIElFIDwgOVxuICBpZiAoaGFzT2JqZWN0U3BsaWNlQnVnKSB7XG4gICAgZWFjaChbJ3BvcCcsICdzaGlmdCcsICdzcGxpY2UnXSwgZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgICAgdmFyIGZ1bmMgPSBhcnJheVJlZlttZXRob2ROYW1lXSxcbiAgICAgICAgICBpc1NwbGljZSA9IG1ldGhvZE5hbWUgPT0gJ3NwbGljZSc7XG5cbiAgICAgIGxvZGFzaC5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5fX3dyYXBwZWRfXyxcbiAgICAgICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodmFsdWUsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGRlbGV0ZSB2YWx1ZVswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNTcGxpY2UgPyBuZXcgbG9kYXNoKHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgLy8gZXhwb3NlIExvLURhc2hcbiAgLy8gc29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zIGxpa2UgdGhlIGZvbGxvd2luZzpcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gRXhwb3NlIExvLURhc2ggdG8gdGhlIGdsb2JhbCBvYmplY3QgZXZlbiB3aGVuIGFuIEFNRCBsb2FkZXIgaXMgcHJlc2VudCBpblxuICAgIC8vIGNhc2UgTG8tRGFzaCB3YXMgaW5qZWN0ZWQgYnkgYSB0aGlyZC1wYXJ0eSBzY3JpcHQgYW5kIG5vdCBpbnRlbmRlZCB0byBiZVxuICAgIC8vIGxvYWRlZCBhcyBhIG1vZHVsZS4gVGhlIGdsb2JhbCBhc3NpZ25tZW50IGNhbiBiZSByZXZlcnRlZCBpbiB0aGUgTG8tRGFzaFxuICAgIC8vIG1vZHVsZSB2aWEgaXRzIGBub0NvbmZsaWN0KClgIG1ldGhvZC5cbiAgICB3aW5kb3cuXyA9IGxvZGFzaDtcblxuICAgIC8vIGRlZmluZSBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlIHNvLCB0aHJvdWdoIHBhdGggbWFwcGluZywgaXQgY2FuIGJlXG4gICAgLy8gcmVmZXJlbmNlZCBhcyB0aGUgXCJ1bmRlcnNjb3JlXCIgbW9kdWxlXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGxvZGFzaDtcbiAgICB9KTtcbiAgfVxuICAvLyBjaGVjayBmb3IgYGV4cG9ydHNgIGFmdGVyIGBkZWZpbmVgIGluIGNhc2UgYSBidWlsZCBvcHRpbWl6ZXIgYWRkcyBhbiBgZXhwb3J0c2Agb2JqZWN0XG4gIGVsc2UgaWYgKGZyZWVFeHBvcnRzKSB7XG4gICAgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcbiAgICBpZiAoZnJlZU1vZHVsZSkge1xuICAgICAgKGZyZWVNb2R1bGUuZXhwb3J0cyA9IGxvZGFzaCkuXyA9IGxvZGFzaDtcbiAgICB9XG4gICAgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cbiAgICBlbHNlIHtcbiAgICAgIGZyZWVFeHBvcnRzLl8gPSBsb2Rhc2g7XG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIC8vIGluIGEgYnJvd3NlciBvciBSaGlub1xuICAgIHdpbmRvdy5fID0gbG9kYXNoO1xuICB9XG59KHRoaXMpKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2xvZGFzaC9kaXN0L2xvZGFzaC5jb21wYXQuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3dlYnBhY2svYnVpbGRpbi9tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgbmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzL2Jyb3dzZXIuanMnKS5uZXh0VGljaztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpbW1lZGlhdGVJZHMgPSB7fTtcbnZhciBuZXh0SW1tZWRpYXRlSWQgPSAwO1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkgeyB0aW1lb3V0LmNsb3NlKCk7IH07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gVGhhdCdzIG5vdCBob3cgbm9kZS5qcyBpbXBsZW1lbnRzIGl0IGJ1dCB0aGUgZXhwb3NlZCBhcGkgaXMgdGhlIHNhbWUuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IGZ1bmN0aW9uKGZuKSB7XG4gIHZhciBpZCA9IG5leHRJbW1lZGlhdGVJZCsrO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZmFsc2UgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgaW1tZWRpYXRlSWRzW2lkXSA9IHRydWU7XG5cbiAgbmV4dFRpY2soZnVuY3Rpb24gb25OZXh0VGljaygpIHtcbiAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xuICAgICAgLy8gZm4uY2FsbCgpIGlzIGZhc3RlciBzbyB3ZSBvcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiB1c2UtY2FzZVxuICAgICAgLy8gQHNlZSBodHRwOi8vanNwZXJmLmNvbS9jYWxsLWFwcGx5LXNlZ3VcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uY2FsbChudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIFByZXZlbnQgaWRzIGZyb20gbGVha2luZ1xuICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaWQ7XG59O1xuXG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XG4gIGRlbGV0ZSBpbW1lZGlhdGVJZHNbaWRdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIEM6L1dlYkRldi9hbmd1bGFyLWQzcGxvdHMvfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICB9XG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBDOi9XZWJEZXYvYW5ndWxhci1kM3Bsb3RzL34vcHJvY2Vzcy9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==