(function() {
    'use strict';

    // InputParamters : 
    // Data : [
    //    { value:__    [REQUIRED] , 
    //      color: __   [OPTIONAL] ,
    //      label:__    [OPTIONAL] },{...}
    // ]
    // Height: ___ [OPTIONAL]  // height of graph
    // Width:  ___ [OPTIONAL]  // width of graph
    // showLabel: true/false [OPTIONAL]  // enable/disable showing label
    
    function implementation(d3,d3PieChartService) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                minSegmentPercentage:'@?',
                minSegmentName:'@?',
                height: '@?',   
                width: '@?',   
                showLabel: '=?',
                onClickedSegment: '&?',
               donutRadiusPortion:'@?'
            },
            link: function(scope, iElement, iAttrs) {
                var svg = d3.select(iElement[0]).append('svg');

                // **** define render (=drawing) function **** 
                scope.render = function(dataIn) {
                    if (!dataIn ) return;
                    
                    // Reformat data 
                    var allSegments = d3PieChartService.joinSmallSegments(dataIn, parseInt(scope.minSegmentPercentage) || 2);
                    var data = allSegments.segments;
                    var joinedSegments = allSegments.joinedSegments;
                                  
                    var height = parseInt(scope.height) || 500 , 
                        width= parseInt(scope.width) || height ;

                    // remove all previous items before render and create svg element
                    svg.selectAll('*').remove();
                    svg.attr('width', width).attr('height', height);         

                    // If colors are provided in the data use them
                    var arbitrairyColor  = d3.scale.category20();
                    arbitrairyColor.domain([0,data.length +1]);
                    var getColorByVal = function(d,i) {return (d.color) ? d.color : arbitrairyColor(i);};      
                                                   
                    var labelCircleR =6;
                    var backgroundColor = $(iElement[0]).css('backgroundColor'); 
                    var minSegmentLabel =  scope.minSegmentName ||  "other";
                    
                    var legend = svg.append('g');
                    var label = legend.selectAll('.label').data(data).enter();
         
                    
                    var labelEl = label.append('g');
                    labelEl.append('text')
                        .attr('class','d3piechartlabel')
                        .attr('transform', 'translate(' + (labelCircleR*2 + 3) + ',0)')
                        .text( function(d,i) {return d.label == "__other__" ? minSegmentLabel:  d.label;});
                    
                     labelEl.append('circle')
                        .attr('r',labelCircleR)
                        .attr('transform', 'translate('+labelCircleR + ',' + -labelCircleR + ')')
                        .attr('stroke', function(d,i) { return getColorByVal(d,i); })
                        .attr('stroke-width', (labelCircleR/3))
                        .attr('fill', function(d,i) {return getColorByVal(d,i);})
                        
                    // Make labels clickable to hide segements
                    // labelEl
                    //     .attr('cursor','pointer')
                    //     .on('click', function(d) { 
                    //         d.isHidden = !d.isHidden;
                    //         d3.select(this).select('circle').attr('fill', function (d,i) {return d.isHidden ? backgroundColor : getColorByVal(d,i);}) 
                    //     })
       
                    
                    var labelIndexWidth =5, labelIndexHeight = 0 , horizontalLabelPadding=20;     
                    labelEl.each(function(d, i) {    
                        d.color =     getColorByVal(d,i);
                        var el = d3.select(this);
                        var bbox = el.node().getBBox();                           
                        labelIndexHeight = labelIndexHeight === 0 ? bbox.height : labelIndexHeight ;                                
                        if(labelIndexWidth + bbox.width > width)  {
                            labelIndexHeight += Math.max(labelCircleR,bbox.height) + 5;   
                            labelIndexWidth =5;
                        }
                        
                        el.attr('transform', 'translate(' + (labelIndexWidth)  + ',' + labelIndexHeight + ')');
                        //el.select('text').attr('fill', function(d) { return getColorByVal(d,i); });
                        labelIndexWidth += bbox.width + horizontalLabelPadding;
                        
                    });
                    
                    // Get the size of the containing box of the legend 
                    var labelsBBox = legend.node().getBBox(); 
                    var pieHeight = height - labelsBBox.height -10;
                    legend.attr('transform', 'translate(0,' + pieHeight + ')');
                    
                   
                    var radius = Math.min(width, pieHeight) / 2 - 10; 
                    var innerR = 0;
                    // If DONUT , set the inner radaius
                    if( scope.donutRadiusPortion != undefined && scope.donutRadiusPortion != 0 ) {
                         if ( scope.donutRadiusPortion > 1.05) {
                         innerR = radius/ scope.donutRadiusPortion ;
                         } else {
                             console.error("The donutRadiusPortion should be bigger than 1.05 for the piechart ")
                         }
                    }
                    
                 
                                   
                    // Calculation of segments size
                    var layout = d3.layout.pie().value(function(d) {return d.value; });
                    var arc = d3.svg.arc().outerRadius(radius*0.95).innerRadius(innerR);
                    var arcFocus = d3.svg.arc().outerRadius(radius).innerRadius(innerR);
                    
                    // toggle to selected
                    var toggleArc = function(p){
                        p.state = !p.state;
                         d3.select(this).select("path").transition()
                        .duration(200)
                        .attr("d",  p.state ? arcFocus : arc);
                    };
                    
                    var groupPie = svg.append('g')
                        .attr('transform', 'translate(' + width / 2 + ',' + pieHeight / 2 + ')');
                    // Set data on arc
                    var g = groupPie.selectAll('.arc')
                        .data(layout(data))
                        .enter()
                        .append('g')
                        .on('mouseover', toggleArc)
                        .on('mouseout', toggleArc)
                        .attr('class', 'arc');
                    // draw segments
                    g.append('path')
                        .attr('d', arc)
                        .attr('fill', function(d,i) { return  getColorByVal(d.data,i); })
                        .on('click', function(d) { 
                            if (typeof scope.onClickedSegment() !== 'undefined') {
                                var val=[];
                                if(d.data.label == "__other__") {
                                    val = joinedSegments;
                                } else {
                                    val.push(d.data);
                                }
                                scope.onClickedSegment()(val,event); // use of a function reference that is invoked
                                scope.$apply();
                            }
                        });                      
          
                }
                // make sure to render first time
                scope.render(scope.data);

                // **** Functions that makes the visualisation resoponsive **** 

                var refresh = function () {scope.render(scope.data)};
                // watch for data changes and re-render
                var logWatchesOn = false;
                scope.$watch('data', function(newVals, oldVals) {
                    if(logWatchesOn) console.log('On Pie graph data refresh');
                     return refresh();
                }, true);
                scope.$watch('height', function() {
                    if (logWatchesOn) console.log('On Pie graph heigth changed');
                    return refresh();
                });
                 scope.$watch('width', function() {
                    if (logWatchesOn) console.log('On progrPieess graph width changed');
                    return refresh();
                });
                

            }
        };
    }

    var declaration = [ 'd3','d3PieChartService', implementation];
    angular.module('d3').directive('d3PieChart', declaration);
}());

