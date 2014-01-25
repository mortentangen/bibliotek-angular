'use strict';

var bokApp = angular.module('bibliotekAngularApp');

bokApp.controller('MainCtrl', ['$scope', 'bokService', function($scope, bokService) {
    $scope.boker = bokService.boker();
}]);

bokApp.controller('NyBokCtrl', ['$scope', 'bokService', function($scope, bokService) {
    $scope.bok = {};
    $scope.lagreBok = bokService.lagreBok($scope.bok);
}]);

// SERVICES
bokApp.service('bokService', function() {
    var boker = [{tittel:'Frost', forfatter:'Jan Banan'},
                 {tittel:'The Hobbit', forfatter:'Per Persen'},
                 {tittel:'Lone Survivor', forfatter:'Ola Normann'},
                 {tittel:'The Hunger Games: Catching Fire', forfatter:'Hans Hansen'}
                 ];

    return {
        boker:function () {
            return boker;
        },
        lagreBok:function(bok) {
            boker.push(bok);
        }
    };
});