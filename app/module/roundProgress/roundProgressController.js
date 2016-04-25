(function() {
    'use strict';

    function constructor($scope, CONFIG,toastr){
        var vm = this;
        
        vm.model ={};
        vm.model.data = 78.5;
        vm.model.progressBaseData = 99.5;
        vm.model.graphHeight =400;
        vm.model.progressColor ="orange";
        vm.model.progressOffsetAngleDegree =0;
        vm.model.progressBgColor="#ddd";
        vm.model.progressOverflowColor="blue";
        vm.model.extraFontScale = 1.5;
        vm.model.baseStrokeThickness = 2;
        
        
   
    }

    var declaration = ['$scope','CONFIG', 'toastr', constructor];
    angular.module('app').controller('roundProgressController', declaration);
}());