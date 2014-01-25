'use strict';

var bokApp = angular.module('bibliotekAngularApp');

bokApp.controller('MainCtrl', function ($scope) {
    $scope.books = [
      'Frost',
      'The Hobbit',
      'Lone Survivor',
      'The Hunger Games: Catching Fire'
    ];
});

bokApp.controller('NyBokCtrl', ['$scope', 'bokService', function($scope, bokService) {
    $scope.bok = {};
    $scope.lagreBok = function(){

    };
}]);

// SERVICES
bokApp.service('bokService', function() {
    var boker = [];

    return {
        boker:function () {
            return boker;
        },
        lagreBok:function(bok) {
            boker.push(bok);
        }
    };
});