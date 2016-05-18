(function() {
    'use strict'
    angular.module('app').config([
        '$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                    controller: 'bilevelPartionController',
                    controllerAs: 'vm',
                    templateUrl: 'app/module/bilevelPartion/bilevelPartionView.html'
                })
                .when('/roundProgressbar', {
                    controller: 'roundProgressController',
                    controllerAs: 'vm',
                    templateUrl: 'app/module/roundProgress/roundProgressView.html'
                })
                .when('/pieChart', {
                    controller: 'pieChartController',
                    controllerAs: 'vm',
                    templateUrl: 'app/module/pieChart/pieChartView.html'
                })
                 .when('/bilevelPartion', {
                    controller: 'bilevelPartionController',
                    controllerAs: 'vm',
                    templateUrl: 'app/module/bilevelPartion/bilevelPartionView.html'
                })
                
        }
    ]);
}());