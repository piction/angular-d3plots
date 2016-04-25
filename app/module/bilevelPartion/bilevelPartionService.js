(function() {
    'use strict';

    function implementation($http) {

        function getData(foundqueryString) {
            var promise = $http({
                method: 'GET',
                url:'/testData/bilevelPartionTestData.json'
            });
            return promise;
        }
        return {
            getData: getData
        }
    }

    var declaration = ['$http', implementation];
    angular.module('app').factory('bilevelPartionService', declaration);
}());