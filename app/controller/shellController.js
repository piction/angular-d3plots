(function() {
    'use strict'
    function constructor($rootscope, $route,$location){
        var vm = this;
        $location.path('/');
        
        vm.model={};
        vm.model.moduleItems = [
            { name: "roundProgressbar" , label:"Round progress bar" },
            { name: "pieChart" , label:"Pie chart" },
            { name: "bilevelPartion" , label:"Bilevel partion" },
            { name: "dualBarChart" , label:"Dual bar chart" }

        ]
        
        
    }
    
    var declaration = ['$rootScope', '$route','$location', constructor];
    angular.module('app').controller('shellController', declaration);
}());