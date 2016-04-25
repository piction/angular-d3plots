(function() {
    'use strict';

    function constructor($scope, CONFIG,toastr){
        var vm = this;
        
        vm.model = {};   
        vm.model.data = [
             {  value:400,  label:"STATUS_1",   color:"#FFA000" , extra:"description 1"} ,
             {  value:100,  label:"STATUS_2",   color:"#FFC107" , extra:"description 2"} ,
             {  value:20,   label:"STATUS_3",   color:"#536DFE" , extra:"description 3"} ,
             {  value:600,  label:"STATUS_4",   color:"#607D8B" , extra:"description 4"} ,
             {  value:40,   label:"STATUS_5",   color:"#388E3C" , extra:"description 5"} ,
             {  value:250,  label:"STATUS_6",   color:"#FF5722" , extra:"description 6"} ,
             {  value:120,  label:"STATUS_7",   color:"#D32F2F" , extra:"description 7"} ,
             {  value:7,    label:"STATUS_8",   color:"#7C4DFF" , extra:"description 8"}         
        ];
       vm.model.graphHeight = 500;
       vm.model.minSegmentPercentage = 4;
       vm.model.donutRatio = 0;
       
       vm.tooltip ={};
       vm.tooltip.show =false;
       vm.createTooltip = function (val,event) {
           vm.tooltip.show = true;
           vm.tooltip.x= event.clientX + 20 ;
           vm.tooltip.y= event.clientY;
           vm.tooltip.data = val;
          
       }
   
    }

    var declaration = ['$scope','CONFIG', 'toastr', constructor];
    angular.module('app').controller('pieChartController', declaration);
}());