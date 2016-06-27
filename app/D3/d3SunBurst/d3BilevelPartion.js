(function() {
    'use strict';

    // InputParamters : 
    // ...
    
    function implementation(d3,d3BilevelPartionService) {
        return {
            restrict: 'E',
            scope: {
                data: '=',
                height: '@?',   
                width: '@?',   
                strokeRatio:'@?',   // [0-100] 
                fontScale :'@?'
            },
            link: function(scope, iElement, iAttrs) {
                var svg = d3.select(iElement[0]).append('svg');

                // **** define render (=drawing) function **** 
                scope.render = function(dataIn) {
                   d3BilevelPartionService.render (svg,dataIn, parseInt(scope.height), parseInt(scope.width), parseInt(scope.strokeRatio) , parseFloat(scope.fontScale) )
                }
                // make sure to render first time
                scope.render(scope.data);

                // **** Functions that makes the visualisation resoponsive **** 

                var refresh = function () {scope.render(scope.data)};
                // watch for data changes and re-render
                var logWatchesOn = false;
                scope.$watch('data', function(newVals, oldVals) {
                    if(logWatchesOn) console.log('On Bilevel Partion data refresh');
                     return refresh();
                }, true);
                scope.$watch('height', function() {
                    if (logWatchesOn) console.log('On Bilevel Partion graph heigth changed');
                    return refresh();
                });
                 scope.$watch('width', function() {
                    if (logWatchesOn) console.log('On Bilevel Partion graph width changed');
                    return refresh();
                });
                

            }
        };
    }

    var declaration = [ 'd3','d3BilevelPartionService', implementation];
    angular.module('d3').directive('d3BilevelPartion', declaration);
}());

