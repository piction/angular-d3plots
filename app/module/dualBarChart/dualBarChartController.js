(function() {
    'use strict';

    function constructor($scope, CONFIG,toastr,dualBarChartService){
        var vm = this;
        
      vm.updateData = function () {
           if ( vm.model.jsonData == undefined) {
               vm.model.jsonData = JSON.stringify(vm.model.data, null, "\t");
           }
           vm.model.data = JSON.parse(vm.model.jsonData);
       }
       
       vm.model = {};       
       vm.model.graphHeight = 500;
       vm.model.data = {};
       vm.model.jsonData = undefined;
       vm.model.graphWidth = 500;
       vm.model.maxBarWidth = 40;
       
       function loadTestData() {
                function onSuccess(response) {
                    vm.model.data = response.data;
                    vm.model.graphWidth = 0.8 * window.innerWidth;
                    vm.updateData();
                }
                function onFail(response) {
                    toastr.error("Fail loading testdata");
                }
                dualBarChartService.getData().then(onSuccess, onFail);

        }       
        loadTestData();
    }

    var declaration = ['$scope','CONFIG', 'toastr','dualBarChartService', constructor];
    angular.module('app').controller('dualBarChartController', declaration);
}());