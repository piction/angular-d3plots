(function() {
    'use strict';

    // InputParamters : 
    // Data : {
    //      barData:[{value1:___,value2:___,label :____},....]          [REQUIRED] ,  
    //      color2: __                                      [OPTIONAL] ,
    //      color1: __                                      [OPTIONAL] ,
    // }
    // Height: ___ [OPTIONAL]  // height of graph
    // Width:  ___ [OPTIONAL]  // width of graph
    // showLabel: true/false [OPTIONAL]  // enable/disable showing label
    
    function implementation(d3,d3UtilitiesService) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                height: '@?',   
                width: '@?', 
                maxBarWidth :'@?'  
            },
            link: function(scope, iElement, iAttrs) {
                var svg = d3.select(iElement[0]).append('svg');

                // **** define render (=drawing) function **** 
                scope.render = function(dataIn) {
                    if (!dataIn ) return;
                    if (typeof dataIn.barData == 'undefined') return;

                    var margin = 5 ;
                    var height = parseInt(scope.height) || 500 , width= parseInt(scope.width) || height ;
                    var graphHeigt = height - margin *2;
                    var graphWidth = width - margin *2;
                    var maxBarWidth = parseInt(scope.maxBarWidth) || 50;

                    var labelFontSize = 12;

                    var minBarSpacing = 2; 
                    var color1 = ( typeof dataIn.color1 == 'undefined') ? "#ee981a" : dataIn.color1;
                    var color2 = ( typeof dataIn.color1 == 'undefined') ? "#007dbe" : dataIn.color2;
                   
                    var maxVal1 =  0, maxVal2 = 0 ;
                    dataIn.barData.forEach(function(d) {
                        maxVal1 = (maxVal1 > d.value1) ? maxVal1 : d.value1;
                        maxVal2 = (maxVal2 > d.value2) ? maxVal2 : d.value2; 
                    });
                    var dualBarWidth = graphWidth / dataIn.barData.length;

                    // SHOULD LABEL ROTATE ? 
                    var rotateAngleDegree = 40;
                    var labelPx = d3UtilitiesService.getMaxWidthOfTexts($.map(dataIn.barData, function (d) { return d.label; }), labelFontSize);
                    var rotateLabel = ((dualBarWidth * 0.8) < labelPx) ? true : false;
                    var extraBottomMargin = (rotateLabel===true) ? Math.cos(Math.PI * rotateAngleDegree / 180) * labelPx : labelFontSize * 1.2;
                    graphHeigt = graphHeigt - extraBottomMargin;

                    var y1 = d3.scale.linear().range([graphHeigt, 0]).domain([0, maxVal1]);
                    var y2 = d3.scale.linear().range([graphHeigt, 0]).domain([0, maxVal2]);
;
                    
                    var barsOffset = 0;
                    var singleBarWidth = (dualBarWidth - minBarSpacing)/2;
                    if( maxBarWidth * 2 < dualBarWidth ) {                        
                        barsOffset = (dualBarWidth - maxBarWidth * 2 ) /2;
                        singleBarWidth = maxBarWidth;
                    }
                    // remove all previous items before render and create svg element
                    svg.selectAll('*').remove();
                    svg.attr('width', width).attr('height', height);        

                   var group = svg.append('g')
                        .attr('transform', 'translate(' + margin + ',' + (margin) + ')'); 

                    var dualBars = group.selectAll("g")
                        .data(dataIn.barData)
                        .enter().append("g")
                        .attr("transform", function(d, i) { return "translate(" + i * dualBarWidth + ",0)"; });
                    
                    // first bar
                    dualBars.append("rect")
                        .attr("y", function(d) { return y1(d.value1); })
                        .attr("height", function(d) { return graphHeigt - y1(d.value1); })
                        .attr("x", barsOffset + 0)
                        .attr("width", singleBarWidth)                         
                        .style('fill', color1);

                    // second bar
                    dualBars.append("rect")
                        .attr("y", function(d) { return y2(d.value2); })
                        .attr("height", function(d) { return graphHeigt - y2(d.value2); })
                        .attr("x", barsOffset + singleBarWidth)
                        .attr("width", singleBarWidth) 
                        .style('fill', color2);

                    // labels (todo rotate and not hide)
                    dualBars.append("text")
                        .attr("x", dualBarWidth / 2)
                        .attr("y", graphHeigt + labelFontSize )
                        .attr('font-size', labelFontSize + "px")
                        .style('text-anchor', function() { return rotateLabel ? 'end' : 'middle';})
                        .text(function(d) { return rotateLabel ? 0 : d.label; }) ;
                }
                // make sure to render first time
                scope.render(scope.data);

                // **** Functions that makes the visualisation resoponsive ****                
                var refresh = function () {scope.render(scope.data)};
                // watch for data changes and re-render
                var logWatchesOn = false;
                scope.$watch('data', function(newVals, oldVals) {
                    if(logWatchesOn) console.log('On dual bar graph data refresh');
                     return refresh();
                }, true);
               
               scope.$watch('height', function(newVal, oldVal) {
                    if (scope.height && newVal != oldVal) {
                        if (logWatchesOn) console.log('On dual bar graph height changed to ' + scope.height);
                        return refresh();
                    }
                });
                scope.$watch('width', function(newVal, oldVal) {
                    if (scope.width && newVal != oldVal) {
                        if (logWatchesOn) console.log('On dual bar graph width changed to ' + scope.width);
                        return refresh();
                    }
                });

            }
        };
    }

    var declaration = [ 'd3','d3UtilitiesService', implementation];
    angular.module('d3').directive('d3DualBarChart', declaration);
}());

