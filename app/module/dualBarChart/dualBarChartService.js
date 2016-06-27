(function() {
    'use strict';

    function implementation($http) {

        function getData(foundqueryString) {
            var promise = $http({
                method: 'GET',
                url:'/testData/dualBarChartTestData.json'
            });
            return promise;
        }
        return {
            getData: getData
        } 
    }

    var declaration = ['$http', implementation];
    angular.module('app').factory('dualBarChartService', declaration);
}());