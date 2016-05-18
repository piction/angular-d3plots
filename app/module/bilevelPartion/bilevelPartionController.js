(function() {
    'use strict';

    function constructor($scope, CONFIG,toastr,bilevelPartionService){
        var vm = this;
        
      vm.updateData = function () {
           if ( vm.model.jsonData == undefined) {
               vm.model.jsonData = JSON.stringify(vm.model.data, null, "\t");
           }
           vm.model.data = JSON.parse(vm.model.jsonData);
       }
       
       vm.model = {};       
       vm.model.strokeSize =100;  
       vm.model.graphHeight = 500;
       vm.model.data = {};
       vm.model.jsonData = undefined;
       
       function loadTestData() {
                function onSuccess(response) {
                    vm.model.data = response.data;
                    vm.updateData();
                }
                function onFail(response) {
                    toastr.error("Fail loading testdata");
                }
                bilevelPartionService.getData().then(onSuccess, onFail);
        }       
        loadTestData();
        

    }

    var declaration = ['$scope','CONFIG', 'toastr','bilevelPartionService', constructor];
    angular.module('app').controller('bilevelPartionController', declaration);
}());