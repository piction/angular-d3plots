(function() {
    'use strict';

    function implementation(d3) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                baseData:'=?',
                color: '@?',             
                overflowColor: '@?',
                bgcolor: '@?',
                height: '@?',
                offsetAngleDegree :'@?',
                fontScale :'@?',
                baseStrokeThickness :'@?',           
                showLabel: '=?'
            },
            link: function(scope, iElement, iAttrs) {

                var svg = d3.select(iElement[0])
                    .append('svg');

                // **** define render (=drawing) function **** 
                scope.render = function(data, baseData) {
                    if (!data ) return;

                    var extra =0;   
                    if (data > 100) {
                        extra = data - 100;
                        data = 100;
                    }
                    
                    baseData = baseData > 100 ? 100 : (baseData < 0 ? 0 : baseData ) ;
                    var offsetAngle = -(parseInt(scope.offsetAngleDegree)* Math.PI) /180|| 0;
                    var extraFontScale  = parseFloat(scope.fontScale) || 1 ;
                    var baseStrokeThickness  = parseFloat(scope.baseStrokeThickness) || 1 ;
                    var height = parseInt(scope.height) || 500 , width= height;
                    var radius = Math.min(width, height) / 2 - 10;
                    svg.selectAll('*').remove();

                    svg.attr('width', width).attr('height', height);
                    var group = svg.append('g')
                        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

                    var strokeSize = 0.15;
                    var arc = d3.svg.arc()
                        .outerRadius(radius * 1)
                        .innerRadius(radius * (1-strokeSize))
                        .startAngle(offsetAngle);
                    
                    var arcBase = d3.svg.arc()
                        .outerRadius(radius * 1)
                        .innerRadius(radius * (1-baseStrokeThickness*strokeSize))
                        .startAngle(offsetAngle);
                        
                    // Add the background arc, from 0 to 100% (τ).
                    var background = group.append('path')
                        .datum({ endAngle:  -(baseData /100) * 2 * Math.PI })
                        .style('fill', scope.bgcolor || '#ddd')
                        .attr('d', arcBase);


                    var foreground = group.append('path')
                        .datum({ endAngle:0 })
                        .style('fill', scope.color || 'orange')
                        .attr('d', arc)              
                            .transition()
                        .duration(700)
                        .call(arcTween, arc, offsetAngle -  (data / 100) * (2 * Math.PI));
                        
            

                    if (extra > 0) {                        
                        var arcExtra = d3.svg.arc()
                        .outerRadius(radius * 0.85)
                        .innerRadius(radius * 0.75)
                        .startAngle(offsetAngle);
                        
                        var foregroundExtra = group.append('path')
                            .datum({ endAngle: 0 })
                            .style('fill', scope.overflowColor || '#a1499c')
                            .attr('d', arcExtra)
                            .transition()
                            .duration(600)
                            .call( arcTween, arcExtra, offsetAngle - (extra / 100) * (2 * Math.PI));
                    }

                    if (scope.showLabel && scope.showLabel == true) {
                        var pxSize = extraFontScale *  radius / 2.5;
                        group.append('text')
                            .style('font-size', pxSize + 'px')
                            .attr({ x: 0, y: pxSize / 4, "text-anchor": 'middle' })
                            .text(data+extra + ' %');
                    }
                    
                    function arcTween(transition, arcGenerator , newAngle) {
                        transition.attrTween('d', function (d) {

                            var interpolate = d3.interpolate(d.endAngle, newAngle);
                            return function (t) {
                                d.endAngle = interpolate(t);
                                return arcGenerator(d);
                            };
                        });
                    }
              
                };

                // make sure to render first time
                scope.render(scope.data, scope.baseData || 100);

                // **** Functions that makes the visualisation resoponsive **** 

                var refresh = function () {scope.render(scope.data,scope.baseData)};
                // watch for data changes and re-render
                var logWatchesOn = false;
                scope.$watch('data', function(newVals, oldVals) {
                    if(logWatchesOn) console.log('On progress graph data refresh');
                     return refresh();
                }, true);
                
                 scope.$watch('baseData', function(newVals, oldVals) {
                    if(logWatchesOn) console.log('On progress graph base data refresh');
                             return refresh();
                }, true);
                

                scope.$watch('progressHeight', function() {
                    if (logWatchesOn) console.log('On progress graph heigth changed');
                    return refresh();
                });
                

            }
        };
    }

    var declaration = [ 'd3', implementation];
    angular.module('d3').directive('d3RoundProgress', declaration);
}());

