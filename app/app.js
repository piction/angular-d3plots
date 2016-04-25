(function () {
    'use strict';
    var app = angular.module('app', [
        'ngRoute', 
        'd3', 'angularSpinner','colorpicker.module']);

    app.constant('toastr', toastr);
    app.constant('d3', d3);
    app.constant('CONFIG', {
        messages: {
            pageIsBusyRequest: 'pageIsBusyRequest',
            pageIsNotBusyRequest: 'pageIsNotBusyRequest'
        },
        toasts: {
            canNotLeavePage: 'You can not leave this page',
            failedToSaveData: 'Failed to save data',
            internalServerError: 'Internal server error'
        }
    });  
    
 }());
