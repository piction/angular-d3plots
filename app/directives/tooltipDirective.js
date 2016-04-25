(function() {
    'use strict';
    function implementation() {
        return function(scope, element, attrs){
        attrs.$observe('tipX', function(value) {
            element.css({'position': 'absolute'});
            element.css({'left': value + 'px'});
        });
    };
    }
    var declaration = [ implementation];
    angular.module('app').directive('tipX', declaration);
}());

(function() {
    'use strict';
    function implementation() {
        return function(scope, element, attrs){
        attrs.$observe('tipY', function(value) {
            element.css({'top': value + 'px'});
            element.css({'position': 'absolute'});
        });
    };
    }
    var declaration = [ implementation];
    angular.module('app').directive('tipY', declaration);
}());