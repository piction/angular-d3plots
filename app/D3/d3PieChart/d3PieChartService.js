(function() {
    'use strict'
    var declaration = ['d3' , implementation];
    angular.module('app').factory('d3PieChartService',declaration);
    
    function implementation(d3) {
        /**
         * Adds two numbers
         * @param {Object} dataIn data objects containing the values, label and colors
         * @param {Number} minSegmentPercentage the minimum % of a segement to not be joined
         */
         function joinSmallSegments(dataIn, minSegmentPercentage) {
            var totalVal  = 0;
            var data = dataIn.map(function(d) {
                totalVal += d.value;
                return { value:d.value,   label:d.label, color:d.color, isHidden:false }
            });
            // sort data from small segments to big segements 
            data.sort(function(a,b) {return a.value - b.value;});
            var deleteIndx = -1 , 
                joinedData =[], 
                subTotal =0;
            // search latest index to join and keep a subtotal of the to join segements    
            for(var i=0; i < data.length ; i++)
            {       
                if(data[i].value / totalVal > minSegmentPercentage/100) {
                    break;
                } else {
                    subTotal += data[i].value; 
                    joinedData.push(data[i]);
                    deleteIndx = i
                }               
            }
            // replace too small segements with one gray segement 
            if(deleteIndx >= 0) {
                data  = data.slice(deleteIndx+1);
                data.push( { value : subTotal, color:"#727272", label: "__other__" , isHidden:false})
            }
            return {
                segments: data,
                joinedSegments: joinedData
            }
        }
                    
                    
        return {
            joinSmallSegments:joinSmallSegments
        }
    }
    
}());